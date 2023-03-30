const express = require('express');
let router = express.Router();
const upload = require('../middleware/upload');

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
    book: []
};

router
    .route('/')
    .get((req, res) => {
        const { book } = stor;
        if (book.length === 0) {
            res.json('А библиотека пуста.');
        } else {
            const { book } = stor;
            res.json(book);
        }
    })
    .post((req, res) => {
        const { book } = stor;
        const { title, desc, authors, favorite, fileCover, fileName } = req.body;

        const newBook = new Book(title, desc, authors, favorite, fileCover, fileName);
        book.push(newBook);

        res.status(201);
        res.json(newBook);
    });

router
    .route('/:id')
    .get((req, res) => {
        const { book } = stor;
        const { id } = req.params;
        const idx = book.findIndex(el => el.id === id);

        if (idx !== -1) {
            res.json(book[idx]);
        } else {
            res.status(404);
            res.json('404 | книга не найдена');
        }

    })
    .put((req, res) => {
        const { book } = stor;
        const { title, desc, authors, favorite, fileCover, fileName } = req.body;
        const { id } = req.params;
        const idx = book.findIndex(el => el.id === id);

        if (idx !== -1) {
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
    })
    .delete((req, res) => {
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

router
    .post('/upload', 
    upload.single('book'),
    (req, res) => {
        if(req.file){
            const {path} = req.file;
            res.json({path});
        } else
        res.send("Ошибка при загрузке файла");
    });

module.exports = router;

