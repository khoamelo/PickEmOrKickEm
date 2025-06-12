const db = require('../db');

// GET /dashboard
exports.getDashboard = async (req, res) => {
    try {
        // res.json(req.user);
        // Fetch the user's name from the database using the user ID from the request
        const user = await db.query(
            `SELECT user_name FROM users
             WHERE user_id = $1`,
            [req.user.id]
        );

        res.json(user.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};