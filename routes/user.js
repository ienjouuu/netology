const express = require('express');
const router = express.Router();
const passport = require('passport');

router
  .route('/login')
  .get((req, res) => {
    res.render('passport/login');
  })
  .post(
    passport.authenticate('local', {failureRedirect: '/api/user/login'}),
    (req, res) => {
      console.log('req.user: ', req.user);
      res.redirect('/');
    });
router
  .route('/me')
  .get(
    (req, res, next) => {
      if (!req.isAuthenticated()) {
        return res.redirect('/api/user/login');
      }
      next();
    },
    (req, res) => {
      res.render('passport/profile', {user: req.user});
    },
  );
router
  .route('/signup')
  .get((req, res) => {
    res.render('passport/signup');
  })
  .post((req, res) => {
    res.status(201);
    res.json('Пользователь зарегистрирован ...частично :)');
  });
router
  .route('/logout')
  .get((req, res) => {
    req.logout(function(err) {
      if (err) {
        return err;
      }
    });
    res.redirect('/');
  });


module.exports = router;
