require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const db = require('./db');

// Create an Express application
const app = express();

app.use(express.json());

//API routes
app.get('/teams', async (req, res) => {

    try {
        const results = await db.query('SELECT * FROM teams');
        console.log(results);
        res.status(200).json({
            status: 'success',
            results: results.rowCount.length,
            data: {
                teams: results.rows
            }
        })
    } catch (err) {
        console.log(err);
    }
});

app.post('/addPlayers', (req, res) => {
    console.log("You have added a new player");
    console.log(req.body);
});

// Define the port number the server will listen on
const port = process.env.PORT || 3000;

// Define a route handler for the root URL ("/")
// When a GET request is made to "/", send a response back to the client
app.get('/', (req, res) => {
    res.send('Hello everybody from the server side! This is KMELO.');
});

// Start the server and make it listen on the defined port (3000)
// Once the server is running, log a message to the console
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});