// Dependencies
var express = require("express");
var mysql = require("mysql");

// Create instance of express app.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Gnocchi420*",
  database: "friends_db"
});

// Initiate MySQL Connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.get('/', function(req, res) {
    connection.query('SELECT * FROM movies', function(err, data) {
        if (err) throw err;
        res.redirect('/');
    });
});

app.post('/', function(req, res) {
    connection.query('INSERT INTO friends (friend) VALUES (?)', [req.body.friend], function(err, result) {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(PORT, function() {
    console.log('App is listening');
});