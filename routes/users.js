const express = require('express');
const router = express.Router();
const { supabase } = require('../config/database');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

router.use(isAuthenticated, isAdmin);

// Trang quản lý user
router.get('/', async (req, res) => {
    try {
        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .eq('del', 0)
            .order('id');

        if (error) throw error;
        
        res.render('user_management', {
            users: users || [],
            notification: null
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Có lỗi xảy ra: ' + error.message);
    }
});

// Thêm user
router.post('/add', async (req, res) => {
    try {
        const { username, password, fullname, role } = req.body;

        const { data: existing, error: checkError } = await supabase
            .from('users')
            .select('id')
            .eq('username', username);

        if (checkError) throw checkError;
        
        if (existing && existing.length > 0) {
            const { data: users } = await supabase
                .from('users')
                .select('*')
                .eq('del', 0)
                .order('id');

            return res.render('user_management', {
                users: users || [],
                notification: { status: 'error', message: 'Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.' }
            });
        }

        const { error: insertError } = await supabase
            .from('users')
            .insert({ username, password, fullname, role });

        if (insertError) throw insertError;

        res.redirect('/admin/users?success=add');
    } catch (error) {
        console.error(error);
        res.status(500).send('Có lỗi xảy ra: ' + error.message);
    }
});

// Trang sửa user
router.get('/edit/:id', async (req, res) => {
    try {
        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .eq('del', 0)
            .eq('id', req.params.id);

        if (error) throw error;
        
        if (!users || users.length === 0) {
            return res.redirect('/admin/users');
        }

        res.render('edit_user', {
            user: users[0],
            notification: null
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Có lỗi xảy ra: ' + error.message);
    }
});

// Cập nhật user
router.post('/update/:id', async (req, res) => {
    try {
        const { password, fullname, role } = req.body;
        const id = req.params.id;

        const { error } = await supabase
            .from('users')
            .update({ password, fullname, role })
            .eq('id', id);

        if (error) throw error;

        res.redirect('/admin/users?success=update');
    } catch (error) {
        console.error(error);
        res.status(500).send('Có lỗi xảy ra: ' + error.message);
    }
});

// Xóa user
router.post('/delete', async (req, res) => {
    try {
        const { user_id } = req.body;

        const { error } = await supabase
            .from('users')
            .update({ del: 1 })
            .eq('id', user_id);

        if (error) throw error;

        res.redirect('/admin/users?success=delete');
    } catch (error) {
        console.error(error);
        res.status(500).send('Có lỗi xảy ra: ' + error.message);
    }
});

module.exports = router;
