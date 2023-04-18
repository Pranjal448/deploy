const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '4477',
  database: 'myapp'
});

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/signup');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
  connection.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      res.send('Error signing up. Please try again.');
    } else {
      res.redirect('/login');
    }
  });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
  connection.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      res.send('Error logging in. Please try again.');
    } else if (result.length === 0) {
      res.send('Incorrect username or password.');
    } else {
      res.redirect('/index');
    }
  });
});

app.get('/index', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
