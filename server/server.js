const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello everybody from the server side! This is KMELO.')
});

app.get('/boolymon', (req, res) => {
    res.send('This is for Boolymon, the greatest producer ever!')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});