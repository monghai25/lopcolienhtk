const express = require('express');
const router = express.Router();
const { supabase } = require('../config/database');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

router.use(isAuthenticated, isAdmin);

// Trang admin
router.get('/', async (req, res) => {
    try {
        const from_date = req.query.from_date || new Date().toISOString().split('T')[0];
        const to_date = req.query.to_date || new Date().toISOString().split('T')[0];
        const fullname = req.query.fullname || '';
        const emotion = req.query.emotion || '';

        // Thống kê cảm xúc
        const emotionOptions = ['Vui vẻ', 'Buồn chán', 'Hoang mang', 'Tức giận', 'Bình thường'];
        const emotionStats = {};

        for (const option of emotionOptions) {
            let query = supabase
                .from('emotions')
                .select('id', { count: 'exact', head: true })
                .eq('del', 0)
                .eq('emotion', option)
                .gte('date', from_date)
                .lte('date', to_date);

            if (fullname) {
                // Join với users để filter theo fullname
                const { data: userIds } = await supabase
                    .from('users')
                    .select('id')
                    .eq('del', 0)
                    .ilike('fullname', `%${fullname}%`);
                
                if (userIds && userIds.length > 0) {
                    const ids = userIds.map(u => u.id);
                    query = query.in('user_id', ids);
                } else {
                    emotionStats[option] = 0;
                    continue;
                }
            }

            const { count } = await query;
            emotionStats[option] = count || 0;
        }

        // Lấy dữ liệu bảng với JOIN
        let emotionQuery = supabase
            .from('emotions')
            .select(`
                date,
                situation,
                emotion,
                reaction,
                result,
                content,
                users!inner (
                    fullname
                )
            `)
            .eq('del', 0)
            .eq('users.del', 0)
            .gte('date', from_date)
            .lte('date', to_date);

        if (fullname) {
            emotionQuery = emotionQuery.ilike('users.fullname', `%${fullname}%`);
        }
        if (emotion) {
            emotionQuery = emotionQuery.eq('emotion', emotion);
        }

        const { data: emotionDataRaw, error: emotionError } = await emotionQuery
            .order('users(fullname)')
            .order('date', { ascending: false })
            .order('emotion');

        if (emotionError) throw emotionError;

        // Format data
        const emotionData = (emotionDataRaw || []).map(row => ({
            date: row.date,
            fullname: row.users.fullname,
            situation: row.situation,
            emotion: row.emotion,
            reaction: row.reaction,
            result: row.result,
            content: row.content
        }));

        // Tính ngày thiếu
        let usersQuery = supabase
            .from('users')
            .select('id, fullname')
            .eq('del', 0)
            .neq('role', 'admin');

        if (fullname) {
            usersQuery = usersQuery.ilike('fullname', `%${fullname}%`);
        }

        const { data: users, error: usersError } = await usersQuery;
        if (usersError) throw usersError;

        // Lấy các entry đã có
        let existingQuery = supabase
            .from('emotions')
            .select(`
                user_id,
                date,
                users!inner (
                    id
                )
            `)
            .gte('date', from_date)
            .lte('date', to_date)
            .eq('del', 0)
            .eq('users.del', 0);

        if (fullname) {
            existingQuery = existingQuery.ilike('users.fullname', `%${fullname}%`);
        }

        const { data: existingEntries, error: existingError } = await existingQuery;
        if (existingError) throw existingError;

        const userEntries = {};
        (existingEntries || []).forEach(entry => {
            if (!userEntries[entry.user_id]) userEntries[entry.user_id] = [];
            const dateStr = entry.date.split('T')[0];
            if (!userEntries[entry.user_id].includes(dateStr)) {
                userEntries[entry.user_id].push(dateStr);
            }
        });

        const allDates = [];
        const start = new Date(from_date);
        const end = new Date(to_date);
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            allDates.push(d.toISOString().split('T')[0]);
        }

        const missingDatesData = [];
        (users || []).forEach(user => {
            const existing = userEntries[user.id] || [];
            const missing = allDates.filter(date => !existing.includes(date));
            
            if (missing.length > 0) {
                const formattedDates = missing.map(date => {
                    const d = new Date(date);
                    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
                });
                
                missingDatesData.push({
                    fullname: user.fullname,
                    count: missing.length,
                    formatted_dates: formattedDates
                });
            }
        });

        missingDatesData.sort((a, b) => b.count - a.count);

        res.render('admin', {
            fullname: req.session.fullname,
            emotionStats,
            emotionData,
            missingDatesData,
            filters: { from_date, to_date, fullname, emotion },
            emotionOptions
        });
    } catch (error) {
        console.error('Admin error:', error);
        res.status(500).send('Có lỗi xảy ra: ' + error.message);
    }
});

// Xuất CSV
router.get('/export', async (req, res) => {
    try {
        const from_date = req.query.from_date || new Date().toISOString().split('T')[0];
        const to_date = req.query.to_date || new Date().toISOString().split('T')[0];
        const fullname = req.query.fullname || '';
        const emotion = req.query.emotion || '';

        let query = supabase
            .from('emotions')
            .select(`
                date,
                situation,
                emotion,
                reaction,
                result,
                content,
                users!inner (
                    fullname
                )
            `)
            .eq('del', 0)
            .eq('users.del', 0)
            .gte('date', from_date)
            .lte('date', to_date);

        if (fullname) {
            query = query.ilike('users.fullname', `%${fullname}%`);
        }
        if (emotion) {
            query = query.eq('emotion', emotion);
        }

        const { data: result, error } = await query
            .order('users(fullname)')
            .order('date', { ascending: false })
            .order('emotion');

        if (error) throw error;

        const csv = [
            '\uFEFF',
            'Ngày,Họ tên,Tình huống,Cảm xúc,Phản ứng,Kết quả,Bài học\n',
            ...(result || []).map(row => 
                `"${row.date}","${row.users.fullname}","${row.situation}","${row.emotion}","${row.reaction}","${row.result}","${row.content}"\n`
            )
        ].join('');

        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename=emotion_data_${Date.now()}.csv`);
        res.send(csv);
    } catch (error) {
        console.error(error);
        res.status(500).send('Có lỗi xảy ra: ' + error.message);
    }
});

module.exports = router;
