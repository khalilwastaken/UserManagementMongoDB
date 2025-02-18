require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.static(path.join(__dirname, 'public')));

// Database connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error('Database connection error:', error));
db.once('open', () => console.log('Connected to the database!'));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'my secret key',
    saveUninitialized: true,
    resave: false,
}));

// Middleware for session messages
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

// Set template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route prefix
app.use('', require('./routes/routes'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
