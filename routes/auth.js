const express = require('express');
const router = express.Router();
const { supabase } = require('../config/database');

// Trang đăng nhập
router.get('/', (req, res) => {
    if (req.session.username) {
        if (req.session.role === 'admin') {
            return res.redirect('/admin');
        } else {
            return res.redirect('/client');
        }
    }

    if (req.cookies.username && req.cookies.role) {
        req.session.username = req.cookies.username;
        req.session.role = req.cookies.role;
        req.session.user_id = req.cookies.user_id;
        req.session.fullname = req.cookies.fullname;

        if (req.session.role === 'admin') {
            return res.redirect('/admin');
        } else {
            return res.redirect('/client');
        }
    }

    res.render('index', { error: '' });
});

// Xử lý đăng nhập
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('=== LOGIN ATTEMPT ===');
        console.log('Username:', username);

        // Query users với Supabase
        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .eq('del', 0)
            .eq('username', username);

        if (error) {
            console.error('❌ Database error:', error);
            return res.render('index', { error: 'Có lỗi xảy ra: ' + error.message });
        }

        console.log('Query result:', users.length, 'users found');

        if (users.length === 0 || password !== users[0].password) {
            console.log('❌ Login failed: Invalid credentials');
            return res.render('index', { error: 'Sai tên người dùng hoặc mật khẩu!' });
        }

        const user = users[0];
        console.log('✅ Login successful for:', user.username);

        // Lưu session
        req.session.username = user.username;
        req.session.role = user.role;
        req.session.user_id = user.id;
        req.session.fullname = user.fullname;

        // Lưu cookie
        res.cookie('username', user.username, { maxAge: 365 * 24 * 60 * 60 * 1000 });
        res.cookie('role', user.role, { maxAge: 365 * 24 * 60 * 60 * 1000 });
        res.cookie('user_id', user.id, { maxAge: 365 * 24 * 60 * 60 * 1000 });
        res.cookie('fullname', user.fullname, { maxAge: 365 * 24 * 60 * 60 * 1000 });

        if (user.role === 'admin') {
            res.redirect('/admin');
        } else {
            res.redirect('/client');
        }
    } catch (error) {
        console.error('❌ LOGIN ERROR:', error);
        res.render('index', { error: 'Có lỗi xảy ra: ' + error.message });
    }
});

// Đăng xuất
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('username');
    res.clearCookie('role');
    res.clearCookie('user_id');
    res.clearCookie('fullname');
    res.redirect('/');
});

module.exports = router;
