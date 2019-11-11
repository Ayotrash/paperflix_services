require('dotenv').config()
var express      = require('express');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');
var createError  = require('http-errors')

var mongoConnection = require('./config/mongodb-connection')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

console.log(process.env.ENVIRONMENT)
mongoConnection(process.env.ENVIRONMENT)

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
    next(createError(404, 'Recources not found.'))
})

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500)
    res.json({
        message: err.message,
        error: err
    })
})

module.exports = app;
