// create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// create database connection
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'comments'
});
connection.connect();

// create table if not exist
var createTableSql = 'CREATE TABLE IF NOT EXISTS `comments` (' +
    '`id` int(11) NOT NULL AUTO_INCREMENT,' +
    '`name` varchar(255) NOT NULL,' +
    '`content` text NOT NULL,' +
    '`createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,' +
    'PRIMARY KEY (`id`)' +
    ') ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;';
connection.query(createTableSql, function (err) {
    if (err) {
        console.log('create table error: ' + err.message);
    }
});

// display comments
app.get('/', function (req, res) {
    var selectCommentsSql = 'SELECT * FROM comments';
    connection.query(selectCommentsSql, function (err, rs) {
        if (err) {
            console.log('select comments error: ' + err.message);
            return;
        }
        res.render('index.ejs', {
            comments: rs
        });
    });
});

// add comments
app.post('/add', function (req, res) {
    // get name and content
    var name = req.body.name;
    var content = req.body.content;
    var addCommentSql = 'INSERT INTO comments(name, content) VALUES(?, ?)';
    connection.query(addCommentSql, [name, content], function (err) {
        if (err) {
            console.log('insert comment error: ' + err.message);
            return;
        }
        // redirect to homepage
        res.redirect('/');
    });
});

app.listen(3000, function () {
    console.log('listening on port 3000');
});