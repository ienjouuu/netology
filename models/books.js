const {Schema, model} = require('mongoose');

const BooksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    authors: {
      type: String,
      default: '',
    },
    favorite: {
      type: String,
      default: '',
    },
    fileCover: {
      type: String,
      default: '',
    },
    fileName: {
      type: String,
      default: '',
    },
    dateAdded: {
      type: Date,
      default: Date.now,
    },
  },
);

module.exports = model('Books', BooksSchema);
