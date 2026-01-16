const express = require('express');
const router = express.Router();
const { supabase } = require('../config/database');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// API lưu cảm xúc
router.post('/save-emotion', isAuthenticated, async (req, res) => {
    try {
        const user_id = req.session.user_id;
        const { action } = req.query;
        const data = req.body;

        if (action === 'insert') {
            const { error } = await supabase
                .from('emotions')
                .insert({
                    user_id,
                    emotion: data.emotion,
                    date: data.date,
                    content: data.content,
                    situation: data.situation,
                    reaction: data.reaction,
                    result: data.result
                });
            
            if (error) throw error;
        } else if (action === 'update') {
            const { error } = await supabase
                .from('emotions')
                .update({
                    emotion: data.emotion,
                    date: data.date,
                    content: data.content,
                    situation: data.situation,
                    reaction: data.reaction,
                    result: data.result
                })
                .eq('id', data.id)
                .eq('user_id', user_id);
            
            if (error) throw error;
        } else if (action === 'delete') {
            const { error } = await supabase
                .from('emotions')
                .update({ del: 1 })
                .eq('id', data.id)
                .eq('user_id', user_id);
            
            if (error) throw error;
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// API đổi mật khẩu
router.post('/change-password', isAuthenticated, async (req, res) => {
    try {
        const user_id = req.session.user_id;
        const { old_password, new_password } = req.body;

        const { data: users, error: selectError } = await supabase
            .from('users')
            .select('password')
            .eq('id', user_id);

        if (selectError) throw selectError;

        if (users[0].password !== old_password) {
            return res.status(400).json({ error: 'Mật khẩu cũ không chính xác' });
        }

        const { error: updateError } = await supabase
            .from('users')
            .update({ password: new_password })
            .eq('id', user_id);

        if (updateError) throw updateError;

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// API quản lý user (admin)
router.post('/users/add', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const { username, password, fullname, role } = req.body;

        const { data: existing, error: checkError } = await supabase
            .from('users')
            .select('id')
            .eq('username', username);

        if (checkError) throw checkError;
        
        if (existing && existing.length > 0) {
            return res.status(400).json({ error: 'Tên đăng nhập đã tồn tại' });
        }

        const { error: insertError } = await supabase
            .from('users')
            .insert({ username, password, fullname, role });

        if (insertError) throw insertError;

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/users/update', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const { user_id, password, fullname, role } = req.body;

        const { error } = await supabase
            .from('users')
            .update({ password, fullname, role })
            .eq('id', user_id);

        if (error) throw error;

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/users/delete', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const { user_id } = req.body;

        const { error } = await supabase
            .from('users')
            .update({ del: 1 })
            .eq('id', user_id);

        if (error) throw error;

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
