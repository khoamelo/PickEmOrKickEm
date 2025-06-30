module.exports = (req, res, next) => {
    // Destructure email, name, and password from the request body
    const { email, name, password } = req.body;

    // Helper function to validate email format using RegEx
    function validEmail(userEmail) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);
    }

    // Validation for registration route
    if (req.path === '/registerUser') {
        // Check if all required fields are present
        if (![email, name, password].every(Boolean)) {
            return res.status(401).json({ status: 'error', message: 'Missing credentials' });
        // Check if the email is valid
        } else if (!validEmail(email)) {
            return res.status(401).json({ status: 'error', message: 'Invalid email' });
        }
    // Validation for login route    
    } else if (req.path === '/loginUser') {
        // Check if email and password are present
        if (![email, password].every(Boolean)) {
            return res.status(401).json({ status: 'error', message: 'Missing credentials' });
        // Check if the email is valid
        } else if (!validEmail(email)) {
            return res.status(401).json({ status: 'error', message: 'Invalid email' });
        }
    }
    
    // If all checks pass, proceed to the next middleware or route handler
    next();
}