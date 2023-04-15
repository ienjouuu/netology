/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const Books = require('../models/books');

router
  .route('/books')
  .get(async (req, res) => {
    try {
      const book = await Books.find().select('-__v');
      res.json(book);
    } catch (e) {
      res.status(500).json(e);
    }
  })
  .post(async (req, res) => {
    const {title, desc, authors} = req.body;

    const newBook = new Books({
      title,
      desc,
      authors,
    });

    try {
      await newBook.save();
      res.json(newBook);
    } catch (e) {
      res.status(500).json(e);
    }
  })
;

router
  .route('/books/:id')
  .get(async (req, res) => {
    const {id} = req.params;

    try {
      const book = await Books.findById(id);
      res.json(book);
    } catch (e) {
      res.status(500).json(e);
    }
  })
  .put(async (req, res) => {
    const {id} = req.params;
    const {title, desc, authors} = req.body;

    try {
      await Books.findByIdAndUpdate(id, {title, desc, authors});
      res.redirect(`/api/books/${id}`);
    } catch (e) {
      res.status(500).json(e);
    }
  })
  .delete(async (req, res) => {
    const {id} = req.params;

    try {
      await Books.deleteOne({_id: id});
      res.json(true);
    } catch (e) {
      res.status(500).json(e);
    }
  })
;

module.exports = router;
