#! /usr/bin/env node

const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

// middleware
// const logger = require('./middleware/logger');
const error404 = require('./middleware/err-404');


// routes
const indexRouter = require('./routes/index');
const books = require('./routes/books');
const user = require('./routes/user');
const api = require('./routes/api');

app.use(express.urlencoded());
app.set("view engine", "ejs");


// app.use(logger);
app.use(express.json());

app.use('/', indexRouter);
app.use('/books', books);
app.use('/user', user);
app.use('/api', api);




app.use(error404);
app.listen(PORT);