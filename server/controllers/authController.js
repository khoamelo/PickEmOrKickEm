const db = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

// POST /registerUser
exports.registerUser = async (req, res) => {
    try {
        // Destructure the request body
        const { name, email, password } = req.body;
        const user = await db.query(
            `SELECT * FROM users
             WHERE user_email = $1
            `,
            [email]
        );

        // Check if user already exists
        if (user.rows.length !== 0) {
            return res.status(409).send("User already exists")
        }

        // If not, hash the password and insert the new user into the database
        const saltRounds = 10;
        const bcryptPassword = await bcrypt.hash(password, saltRounds);

        // Insert the new user into the database
        const newUser = await db.query(
            `INSERT INTO users (user_name, user_email, user_password)
             VALUES ($1, $2, $3)
             RETURNING *
            `,
            [name, email, bcryptPassword]
        );

        // Generate a JWT token for the new user
        const token = jwtGenerator(newUser.rows[0].user_id);

        // Respond with the generated token
        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Error adding user.' });
    }
};

// POST /loginUser
exports.loginUser = async (req, res) => {
    try {
        // Destructure the request body
        const { email, password } = req.body;

        const user = await db.query(
            `SELECT * FROM users
             WHERE user_email = $1
            `,
            [email]
        );

        // Check if user exists
        if (user.rows.length === 0) {
            return res.status(401).json({
                 status: 'error',
                 message: 'Password or email is incorrect' 
                });
        }

        // Check if the password is valid
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json({
                 status: 'error', 
                 message: 'Password or email is incorrect' 
                });
        }

        // If valid, generate a JWT token so the user can access protected routes
        const token = jwtGenerator(user.rows[0].user_id);

        // Respond with the generated token
        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Error logging in.' });
    }
};

// GET /verifyUser
exports.verifyUser = async (req, res) => {
    try {
        // If token is valid, respond with true
        res.json(true);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};