const express = require('express');
const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.render('passport/home', {user: req.user});
  });


module.exports = router;
