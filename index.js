#! /usr/bin/env node

const express = require('express');
const session = require('express-session');
const PORT = process.env.PORT || 3000;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');
// middleware
const error404 = require('./middleware/err-404');
// routes
const indexRouter = require('./routes/index');
const books = require('./routes/books');
const user = require('./routes/user');
const api = require('./routes/api');

const verify = (username, password, done) => {
  db.users.findByUsername(username, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    if ( !db.users.verifyPassword(user, password)) {
      return done(null, false);
    }

    return done(null, user);
  });
};

const options = {
  usernameField: 'username',
  passwordField: 'password',
};

passport.use('local', new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser( (id, cb) => {
  db.users.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded());
app.use(session({secret: 'SECRET'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/books', books);
app.use('/api/user', user);
app.use('/api', api);


app.use(error404);
app.listen(PORT);

