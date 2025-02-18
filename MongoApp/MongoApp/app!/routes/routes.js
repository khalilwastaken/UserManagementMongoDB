const express = require('express');
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Image upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
}).single('image');

// Insert a user into the database route
router.post('/add', upload, async (req, res) => {
    if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).json({ message: 'No file uploaded', type: 'danger' });
    }

    const { name, email, phone } = req.body;

    // Validate input
    if (!name || !email || !phone) {
        console.error('All fields are required');
        return res.status(400).json({ message: 'All fields are required', type: 'danger' });
    }

    const user = new User({
        name: name,
        email: email,
        phone: phone,
        image: req.file.filename,
    });

    try {
        await user.save();
        req.session.message = {
            type: 'success',
            message: 'User added successfully!'
        };
        res.redirect('/');
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ message: err.message, type: 'danger' });
    }
});

// Get all users route
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('index', {
            title: 'Home Page',
            users: users
        });
    } catch (err) {
        res.json({ message: err.message });
    }
});

router.get('/add', (req, res) => {
    res.render('add_users', { title: 'Add Users' });
});

router.get('/edit/:id', async (req, res) => {
    let id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            res.redirect('/');
        } else {
            res.render('edit_users', {
                title: "Edit User",
                user: user
            });
        }
    } catch (err) {
        res.redirect('/');
    }
});

// Update user route
router.post('/update/:id', upload, async (req, res) => {
    let id = req.params.id;
    let new_image = '';

    if (req.file) {
        new_image = req.file.filename;
        try {
            fs.unlinkSync('./uploads/' + req.body.old_image);
        } catch (err) {
            console.log(err);
        }
    } else {
        new_image = req.body.old_image;
    }

    try {
        await User.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: new_image,
        });
        req.session.message = {
            type: 'success',
            message: 'User updated successfully!'
        };
        res.redirect('/');
    } catch (err) {
        res.json({ message: err.message, type: 'danger' });
    }
});

// Delete user route
router.get('/delete/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const result = await User.findByIdAndDelete(id);

        if (result && result.image) {
            try {
                fs.unlinkSync('./uploads/' + result.image);
            } catch (err) {
                console.log(err);
            }
        }

        req.session.message = {
            type: 'info',
            message: 'User deleted successfully!'
        };
        res.redirect('/');
    } catch (err) {
        res.json({ message: err.message });
    }
});

// About page route
router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Contact page route
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

module.exports = router;
