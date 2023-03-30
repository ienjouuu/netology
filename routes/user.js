const express = require('express');
let router = express.Router();

router
    .route('/login')
    .post((req, res) => {
        res.status(201);
        const loginObj = {
        id: 1, 
        mail: "test@mail.ru" 
        };
        res.json(loginObj);
    });

module.exports = router;