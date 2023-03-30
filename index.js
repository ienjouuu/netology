#! /usr/bin/env node

const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

// middleware
const logger = require('./middleware/logger');
const error404 = require('./middleware/err-404');


// routes
const books = require('./routes/books');
const user = require('./routes/user');


app.use(logger);
app.use(express.json());
    
app.use('/api/books', books);
app.use('/api/user', user);




app.use(error404);
app.listen(PORT);