#! /usr/bin/env node

const express = require('express');
const session = require('express-session');
const PORT = process.env.PORT || 3000;
// const mongoose = require('mongoose');
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
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/books', books);
app.use('/api/user', user);
app.use('/api', api);

// async function start(PORT, HostDB) {
//   try {
//     await mongoose.connect(HostDB);
//     app.listen(PORT);
//   } catch (e) {
//     console.log(e);
//   }
// }

// const HostDB = 'mongodb://localhost:27017/books'; //  process.env.HostDB

// start(PORT, HostDB);

app.use(error404);
app.listen(PORT);

