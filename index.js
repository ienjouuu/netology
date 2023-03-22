#! /usr/bin/env node

const express = require('express');
const { v4: uuid } = require('uuid');

class Book {
    constructor(title = "", desc = "", authors = "", favorite = "", fileCover = "", fileName = "", id = uuid()) {
        this.title = title;
        this.desc = desc;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.id = id;
    }
}

const stor = {
    book: [
         new Book(),
         new Book()
    ]
};

const app = express();
app.use(express.json());

app.get('/api/books', (req, res) => {
    const {book} = stor;
    if (book.length === 0) {
        res.json('А библиотека пуста.');
    } else {
        const {book} = stor;
        res.json(book);
    }

});

app.get('/api/books/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if(idx !== -1) {
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json('404 | книга не найдена');
    }

});

app.post('/api/books/', (req, res) => {
    const {book} = stor;
    const {title, desc, authors, favorite, fileCover, fileName} = req.body;

    const newBook = new Book(title, desc, authors, favorite, fileCover, fileName);
    book.push(newBook);

    res.status(201);
    res.json(newBook);
});

app.post('/api/user/login/', (req, res) => {
    res.status(201);
    const loginObj = {
    id: 1, 
    mail: "test@mail.ru" 
    };
    res.json(loginObj);
});

app.put('/api/books/:id', (req, res) => {
    const {book} = stor;
    const {title, desc, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1){
        book[idx] = {
            ...book[idx],
            title,
            desc,
            authors,
            favorite,
            fileCover,
            fileName
        };

        res.json(book[idx]);
    } else {
        res.status(404);
        res.json('404 | книга не найдена');
    }
});

app.delete('/api/books/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);
     
    if(idx !== -1){
        book.splice(idx, 1);
        res.json('Ok');
    } else {
        res.status(404);
        res.json('404 | книга не найдена');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);