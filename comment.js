// Create web server
// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'comment'
});
connection.connect();

app.use(express.static('public'));

// Get all comments
app.get('/getComments', function(req, res) {
    connection.query('SELECT * FROM comments', function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });
});

// Post a comment
app.post('/postComment', urlencodedParser, function(req, res) {
    var comment = req.body.comment;
    var user = req.body.user;
    connection.query('INSERT INTO comments (user, comment) VALUES (?, ?)', [user, comment], function(err, result) {
        if (err) throw err;
        res.send('Comment posted successfully!');
    });
});

// Update a comment
app.post('/updateComment', urlencodedParser, function(req, res) {
    var id = req.body.id;
    var comment = req.body.comment;
    connection.query('UPDATE comments SET comment = ? WHERE id = ?', [comment, id], function(err, result) {
        if (err) throw err;
        res.send('Comment updated successfully!');
    });
});

// Delete a comment
app.post('/deleteComment', urlencodedParser, function(req, res) {
    var id = req.body.id;
    connection.query('DELETE FROM comments WHERE id = ?', [id], function(err, result) {
        if (err) throw err;
        res.send('Comment deleted successfully!');
    });
});

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});