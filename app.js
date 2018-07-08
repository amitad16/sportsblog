require('./server/config/config');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');

const {mongoose} = require('./server/db/mongoose');
const Category = require('./models/category.model');

// Mongoose Connect
// mongoose.connect('mongodb://localhost/sportsblog');
// const db = mongoose.connection;

const indexRoute = require('./routes/index');
const articlesRoute = require('./routes/articles');
const manageRoute = require('./routes/manage');
const categoriesRoute = require('./routes/categories');

const app = express();
const port = process.env.PORT;

// View Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Moment
app.locals.moment = require('moment');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// Express messages
app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use('/', indexRoute);
app.use('/articles', articlesRoute);
app.use('/manage', manageRoute);
app.use('/categories', categoriesRoute);

app.listen(port, () => console.log(`Listening to port ${port}`));
