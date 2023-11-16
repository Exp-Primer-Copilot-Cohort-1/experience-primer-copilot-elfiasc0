// Create web server
// 1. Create a web server object
// 2. Listen on a port
// 3. Handle GET requests
// 4. Handle POST requests
// 5. Serve static files
// 6. Create a 404 page
// 7. Handle POST requests with JSON

// 1. Create a web server object
const express = require('express');
const app = express();

// 2. Listen on a port
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// 3. Handle GET requests
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 4. Handle POST requests
app.post('/', (req, res) => {
    res.send('Got a POST request');
});

// 5. Serve static files
app.use(express.static('public'));

// 6. Create a 404 page
app.use((req, res, next) => {
    res.status(404).send('Sorry, page not found');
});

// 7. Handle POST requests with JSON
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/comments', (req, res) => {
    const comment = req.body;
    console.log(comment);
    res.send(`${comment.author} said "${comment.text}"`);
});