const express = require('express');
const router = express.Router();

router
  .route('/login')
  .get((req, res) => {
    res.status(201);
    res.json('страница с формой входа / регистрации');
  })
  .post((req, res) => {
    res.status(201);
    const loginObj = {
      id: 1,
      mail: 'test@mail.ru',
    };
    res.json(loginObj);
  });
router
  .route('/me')
  .get((req, res) => {
    res.status(201);
    res.json('страница профиля');
  });
router
  .route('/signup')
  .post((req, res) => {
    res.status(201);
    res.json('signup');
  });

module.exports = router;
