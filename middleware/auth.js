const { sql } = require('../config/database');

// Kiểm tra đăng nhập
exports.isAuthenticated = async (req, res, next) => {
    try {
        let userId = req.session.user_id;

        // Nếu không có session, kiểm tra cookie
        if (!userId && req.cookies.user_id) {
            userId = req.cookies.user_id;
            
            const users = await sql`
                SELECT * FROM users 
                WHERE del = 0 AND id = ${userId}
            `;

            if (users.length > 0) {
                const user = users[0];
                req.session.username = user.username;
                req.session.role = user.role;
                req.session.user_id = user.id;
                req.session.fullname = user.fullname;
            } else {
                res.clearCookie('username');
                res.clearCookie('role');
                res.clearCookie('user_id');
                res.clearCookie('fullname');
                return res.redirect('/');
            }
        }

        if (!req.session.user_id) {
            return res.redirect('/');
        }

        next();
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
};

// Kiểm tra quyền admin
exports.isAdmin = (req, res, next) => {
    if (req.session.role !== 'admin') {
        res.clearCookie('username');
        res.clearCookie('role');
        res.clearCookie('user_id');
        res.clearCookie('fullname');
        return res.redirect('/');
    }
    next();
};
