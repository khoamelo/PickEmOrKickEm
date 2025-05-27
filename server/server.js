require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const db = require('./db');

// Create an Express application
const app = express();

app.use(express.json());

//API routes

// Getting all teams
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

// Getting one team
app.get('/teams/:id', async (req, res) => {
    try {
        const results = await db.query(
            'SELECT * FROM teams WHERE team_id = $1',
            [req.params.id]
        );
        console.log(results);
        res.status(200).json({
            status: 'success',
            data: {
                team: results.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// Adding a new team
app.post('/addTeam', async (req, res) => {

    try {
        const results = await db.query(
            'INSERT INTO teams (name, abbreviation, conference) values ($1, $2, $3) returning *',
            [req.body.name, req.body.abbreviation, req.body.conference]
        );
        console.log(results);
        res.status(200).json({
            status: 'success',
            data: {
                team: results.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// Updating a team
app.put('/updateTeam/:id', async (req, res) => {
    try {
        const results = await db.query(
            'UPDATE teams SET name = $1, abbreviation = $2 WHERE team_id = $3 returning *',
            [req.body.name, req.body.abbreviation, req.params.id]
        );
        console.log(results);
        res.status(200).json({
            status: 'success',
            data: {
                team: results.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// Deleting a team
app.delete('/deleteTeam/:id', async (req, res) => {
    try {
        const results = await db.query(
            'DELETE FROM teams WHERE team_id = $1 returning *',
            [req.params.id]
        );
        console.log(results);
        res.status(200).json({
            status: 'success',
            data: {
                team: results.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
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