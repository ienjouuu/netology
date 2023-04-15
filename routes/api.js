/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const fs = require('fs');

const {v4: uuid} = require('uuid');

class Book {
  constructor(title = '', desc = '', authors = '', favorite = '', fileCover = '', fileName = '', fileBook = '', id = uuid()) {
    this.title = title;
    this.desc = desc;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
    this.id = id;
  }
}

const stor = {
  book: [
    new Book('test1', 'test1', 'test1', 'test1', 'test1'),
    new Book('test2', 'test2', 'test2', 'test2', 'test2'),
  ],
};

router
    .route('/')
    .get((req, res) => {
      const {book} = stor;
      if (book.length === 0) {
        res.json('А библиотека пуста.');
      } else {
        const {book} = stor;
        res.json(book);
      }
    })
    .post(
        upload.single('book'),
        (req, res) => {
          if (req.file) {
            const {book} = stor;
            const filepath = req.file.path;
            fs.readFile(filepath, 'utf8',
                function(error, data) {
                  const dataa = JSON.parse(data);
                  const json = {
                    ...dataa,
                    fileBook: filepath,
                  };
                  const {title, desc, authors, favorite, fileCover, fileName, fileBook} = json;
                  const newBook = new Book(title, desc, authors, favorite, fileCover, fileName, fileBook);
                  book.push(newBook);
                  res.status(201);
                  res.json(newBook);
                  if (error) throw error; // если возникла ошибка
                });
          } else {
            res.send('Загрузите книгу в json формате');
          }
        })
;

router
    .route('/:id')
    .get((req, res) => {
      const {book} = stor;
      const {id} = req.params;
      const idx = book.findIndex((el) => el.id === id);

      if (idx !== -1) {
        res.json(book[idx]);
      } else {
        res.status(404);
        res.json('404 | книга не найдена');
      }
    })
    .put((req, res) => {
      const {book} = stor;
      const {title, desc, authors, favorite, fileCover, fileName, fileBook} = req.body;
      const {id} = req.params;
      const idx = book.findIndex((el) => el.id === id);

      if (idx !== -1) {
        book[idx] = {
          ...book[idx],
          title,
          desc,
          authors,
          favorite,
          fileCover,
          fileName,
          fileBook,
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
      const idx = book.findIndex((el) => el.id === id);

      if (idx !== -1) {
        book.splice(idx, 1);
        res.json('Ok');
      } else {
        res.status(404);
        res.json('404 | книга не найдена');
      }
    });

router
    .route('/:id/download')
    .get((req, res) => {
      const {book} = stor;
      const {id} = req.params;
      const idx = book.findIndex((el) => el.id === id);

      if (idx !== -1) {
        const filepath = (book[idx].fileBook);
        res.download(filepath, (err) => {
          if (err) {
            res.json(err);
          }
        });
      } else {
        res.status(404);
        res.json('404 | книга не найдена');
      }
    });

module.exports = router;
