require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const db = require('./db');
const cors = require('cors');
const playerRoutes = require('./routes/playerRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoute = require('./routes/dashboardRoute');

// Create an Express application
const app = express();

app.use(cors({
  origin: (origin, callback) => {
    // Allow Vite dev server (host) and Docker Compose client service
    if (
      !origin ||
      origin === 'http://localhost:5173' ||
      origin.startsWith('http://127.0.0.1')
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// API routes
app.use('/api/v1/', playerRoutes);
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoute);

// Define the port number the server will listen on
const port = process.env.PORT || 3000;

// Define a route handler for the root URL ("/")
app.get('/', (req, res) => {
    res.send('Hello everybody from the server side! This is KMELO.');
});

// Start the server and make it listen on the defined port (3000)
// Once the server is running, log a message to the console
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});