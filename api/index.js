require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Session configuration - use default secret if not set
const sessionSecret = process.env.SESSION_SECRET || 'your-secret-key-change-this-in-production';
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 365 * 24 * 60 * 60 * 1000, // 1 năm
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' // HTTPS only in production
    }
}));

// Static files
app.use('/public', express.static(path.join(__dirname, '../public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Routes
app.use('/', require('../routes/auth'));
app.use('/admin', require('../routes/admin'));
app.use('/admin/users', require('../routes/users'));
app.use('/client', require('../routes/client'));
app.use('/api', require('../routes/api'));

module.exports = app;
