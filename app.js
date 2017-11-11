const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var authRouter = require('./src/routes/authRoutes')();
var adminRouter = require('./src/routes/adminRoutes')();
var bookRouter = require('./src/routes/bookRoutes')();

app.set('views', './src/views');
app.set('view engine','ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/books', bookRouter);

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

//Run server
const port = process.env.PORT || 5000;
app.listen(port, (err) => {
    console.log('Running server on port ' + port);
});
