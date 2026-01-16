const express = require('express');
const router = express.Router();
const { supabase } = require('../config/database');
const { isAuthenticated } = require('../middleware/auth');

router.use(isAuthenticated);

// Trang client
router.get('/', async (req, res) => {
    try {
        const user_id = req.session.user_id;
        const current_page = Math.max(1, parseInt(req.query.page) || 1);
        const per_page = 30;
        const offset = (current_page - 1) * per_page;

        // Lấy emotions
        const { data: emotions, error: emotionsError } = await supabase
            .from('emotions')
            .select('*')
            .eq('user_id', user_id)
            .eq('del', 0)
            .order('date', { ascending: false })
            .order('created_at', { ascending: false })
            .range(offset, offset + per_page - 1);

        if (emotionsError) throw emotionsError;

        // Đếm tổng số
        const { count, error: countError } = await supabase
            .from('emotions')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user_id)
            .eq('del', 0);

        if (countError) throw countError;

        const total_items = count || 0;
        const total_pages = Math.ceil(total_items / per_page);

        res.render('client', {
            fullname: req.session.fullname,
            emotions: emotions || [],
            pagination: {
                current_page,
                total_pages,
                total_items
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Có lỗi xảy ra: ' + error.message);
    }
});

module.exports = router;
