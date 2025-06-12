module.exports = (req, res, next) => {
    const { email, name, password } = req.body;

    function validEmail(userEmail) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);
    }


    if (req.path === '/registerUser') {
        if (![email, name, password].every(Boolean)) {
            return res.status(401).json({ status: 'error', message: 'Missing credentials' });
        } else if (!validEmail(email)) {
            return res.status(401).json({ status: 'error', message: 'Invalid email' });
        }
    } else if (req.path === '/loginUser') {
        if (![email, password].every(Boolean)) {
            return res.status(401).json({ status: 'error', message: 'Missing credentials' });
        } else if (!validEmail(email)) {
            return res.status(401).json({ status: 'error', message: 'Invalid email' });
        }
    }
    next();
}