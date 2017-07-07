var express = require('express');
var Debug = require('debug');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var lessMiddleware = require('less-middleware');
var methodOverride = require('method-override');

const passportSocketIo = require('passport.socketio');
const MongoStore = require('connect-mongo')(session);

/**
 * Load environment variables from .env file.
 */
require('dotenv').config({silent: true});

/**
 *  Create Express, Socket.io server.
 */
const app = express();
const debug = Debug('backend:app');

const server = require('http').Server(app);
const io = require('socket.io')(server);

/**
 *  Mongoose Connection.
 */
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, { useMongoClient: true })
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

// Port setup
app.set('port', process.env.PORT || 3001);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Init middleware
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Session configuration.
 */
 const sessionStore = new MongoStore({
   url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
   autoReconnect: true,
   clear_interval: 3600
 });

// session
app.use(session({
  key: 'connect.sid',
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  cookieParser: cookieParser
}));
// passport.socketio connect.
io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,
  key: 'connect.sid',
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  passport: passport,
  success: onAuthorizeSuccess,
  fail: onAuthorizeFail
}));
// error handling functions of passport.socketio module
function onAuthorizeFail(d, m, e, accept) {
  console.log('Connection Failed to socket.io ', e, m);
  accept(null, false);
}
function onAuthorizeSuccess(d, accept) {
  console.log('Successful connection to socket.io');
  accept(null, true);
}

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());


/**
 * Routers.
 */
const index = require('./routes/index');
const authRoute = require('./routes/auth');
app.use('/auth', authRoute);
app.use('/', index);

const socketIO = require('./routes/websockets')(io);


/**
 * Error Handlers.
 */

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err);
  process.exit(1);
});


/**
 * Start Express server.
 */
server.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:' + app.get('port')); 
});

export default app;
