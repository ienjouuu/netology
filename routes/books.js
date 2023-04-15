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
      res.render('books/index', {
        title: 'Книги',
        book: book,
      });
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
    .route('/create')
    .get((req, res) => {
      res.render('books/create', {
        title: 'Book | create',
        book: {},
      });
    })
    .post((req, res) => {
      const {book} = stor;
      const {title, desc, authors} = req.body;

      const newBook = new Book(title, desc, authors);
      book.push(newBook);
      res.redirect('/books');
    });

router
    . route('/update/:id')
    .get((req, res) => {
      const {book} = stor;
      const {id} = req.params;
      const idx = book.findIndex((el) => el.id === id);

      if (idx === -1) {
        res.redirect('/404');
      }

      res.render('books/update', {
        title: 'Books | view',
        book: book[idx],
      });
    })
    .post((req, res) => {
      const {book} = stor;
      const {id} = req.params;
      const {title, desc, authors} = req.body;
      const idx = book.findIndex((el) => el.id === id);

      if (idx === -1) {
        res.redirect('/404');
      }

      book[idx] = {
        ...book[idx],
        title,
        desc,
        authors,
      };
      res.redirect(`/books/${id}`);
    });

router
    .route('/delete/:id')
    .post( (req, res) => {
      const {book} = stor;
      const {id} = req.params;
      const idx = book.findIndex((el) => el.id === id);

      if (idx === -1) {
        res.redirect('/404');
      }

      book.splice(idx, 1);
      res.redirect(`/books`);
    });


router
    .route('/:id')
    .get((req, res) => {
      const {book} = stor;
      const {id} = req.params;
      const idx = book.findIndex((el) => el.id === id);

      if (idx === -1) {
        res.redirect('/404');
      } else {
        res.render('books/view', {
          title: 'Книга: ' + book[idx].title,
          book: book[idx],
        });
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

