// create web server and listen on port 3000
// npm install express
// npm install body-parser
// npm install mysql
// npm install cors

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'comment'
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to database');
        return;
    }
    console.log('Connection to database established');
});

app.get('/comments', (req, res) => {
    const sql = 'SELECT * FROM comments';
    connection.query(sql, (err, result) => {
        if (err) {
            console.log('Error retrieving comments');
            res.status(500).json({ error: 'Error retrieving comments' });
            return;
        }
        res.json(result);
    });
});

app.post('/comments', (req, res) => {
    const comment = req.body.comment;
    const sql = 'INSERT INTO comments (comment) VALUES (?)';
    connection.query(sql, [comment], (err, result) => {
        if (err) {
            console.log('Error inserting comment');
            res.status(500).json({ error: 'Error inserting comment' });
            return;
        }
        res.status(201).json({ message: 'Comment inserted' });
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});