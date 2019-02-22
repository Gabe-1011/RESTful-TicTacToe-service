var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser')
var logger = require('morgan');
var engines = require('consolidate');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;

// configuration ===============================================================
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true}); // connect to our database

// required for passport
//app.use(session({ secret: 'tictactoetictactoe' })); // session secret
//app.use(passport.initialize());
//app.use(passport.session()); // persistent login sessions
//app.use(flash()); // use connect-flash for flash messages stored in session

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'codeworkrsecret',
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_mesages = req.flash('success')
  res.locals.error_messages = req.flash('error')
  next()
})
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.json());
//bodyParser.urlencoded({extended: false});
app.use(cookieParser());
app.use(express.static(path.join(__dirname + '/public')));
//app.use(express.static(path.join(__dirname), 'client', 'build'));

//app.use(express.static(path.join(__dirname, 'client', 'build')));
//app.use('/static', express.static(path.join(__dirname, 'client/build')));

//app.get('/ttt', function(req, res) {
  //res.sendFile(path.join(__dirname, 'client',  'build', 'index.html'));
//});

// create the login get and post routes
app.get('/adduser', (req, res) => {
  res.render('adduser.html');
})
app.get('/login', (req, res) => {
  console.log('Inside GET /login callback function')
  console.log(req.sessionID)
  res.send(`You got the login page!\n`)
})

app.post('/login', (req, res) => {
  console.log('Inside POST /login callback function')
  console.log(req.body)
  res.send(`You posted to the login page!\n`)
})

app.post('/ttt', (req, res, next) => {
  var date = new Date();
  var name = req.body.name;
  var message = 'Hello ' + name + ', ' + date;
  res.render('play.html', { name: req.body.name, date: date});
});

app.post('/ttt/play', (req, res, next) => {
  var grid = req.body.grid;
  if (grid[0] == 'X' && grid[1] == 'X' && grid[2] == 'X')
        {
          res.send({
            grid: grid,
            winner: 'X' 
          });
        }
    else if (grid[3] == 'X' && grid[4] == 'X' && grid[5] == 'X')
        {
          res.send({
            grid: grid,
            winner: 'X' 
          });
        }
    else if (grid[6] == 'X' && grid[7] == 'X' && grid[8] == 'X')
        {
          res.send({
            grid: grid,
            winner: 'X' 
          });
        }
    else if (grid[0] == 'X' && grid[3] == 'X' && grid[6] == 'X')
        {
          res.send({
            grid: grid,
            winner: 'X' 
          });
        }
    else if (grid[1] == 'X' && grid[4] == 'X' && grid[7] == 'X')
        {
          res.send({
            grid: grid,
            winner: 'X' 
          });
        }
    else if (grid[2] == 'X' && grid[5] == 'X' && grid[8] == 'X')
        {
          res.send({
            grid: grid,
            winner: 'X' 
          });
        }
    else if (grid[0] == 'X' && grid[4] == 'X' && grid[8] == 'X')
        {
          res.send({
            grid: grid,
            winner: 'X' 
          });
        }
    else if (grid[2] == 'X' && grid[4] == 'X' && grid[6] == 'X')
        {
          res.send({
            grid: grid,
            winner: 'X' 
          });
        }


    else if (grid[0] == 'O' && grid[1] == 'O' && grid[2] == 'O')
        {
          res.send({
            grid: grid,
            winner: 'O' 
          });
        }
    else if (grid[3] == 'O' && grid[4] == 'O' && grid[5] == 'O')
        {
          res.send({
            grid: grid,
            winner: 'O' 
          });
        }
    else if (grid[6] == 'O' && grid[7] == 'O' && grid[8] == 'O')
        {
          res.send({
            grid: grid,
            winner: 'O' 
          });
        }
    else if (grid[0] == 'O' && grid[3] == 'O' && grid[6] == 'O')
        {
          res.send({
            grid: grid,
            winner: 'O' 
          });
        }
    else if (grid[1] == 'O' && grid[4] == 'O' && grid[7] == 'O')
        {
          res.send({
            grid: grid,
            winner: 'O' 
          });
        }
    else if (grid[2] == 'O' && grid[5] == 'O' && grid[8] == 'O')
        {
          res.send({
            grid: grid,
            winner: 'O' 
          });
        }
    else if (grid[0] == 'O' && grid[4] == 'O' && grid[8] == 'O')
        {
          res.send({
            grid: grid,
            winner: 'O' 
          });
        }
    else if (grid[2] == 'O' && grid[4] == 'O' && grid[6] == 'O')
        {
          res.send({
            grid: grid,
            winner: 'O' 
          });
        }
    else
        {
          res.send({
            grid: grid,
            winner: '' 
          });
        }

});

app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

// app.use('/express_backend', indexRouter);

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.use('/users', usersRouter);

//app.get('*', (req, res) => {
  //res.sendFile('./client/build/index.html', { root: global });
//});

app.get('/ttt', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
