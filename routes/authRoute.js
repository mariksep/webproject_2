'use strict';
const express = require('express');
const router = express.Router();
const {body, sanitizeBody} = require('express-validator');
const authController = require('../controllers/authController');

router.post('/login', authController.login);  // Kirjaudutaan sisään
router.get('/logout', authController.logout);   // Kirjaudutaan ulos
router.post('/register',
    [
      body('username', 'minimum 3 characters').isLength({min: 3}),
      body('email', 'email is not valid').isEmail(),
      body('password', 'at least one upper case letter').
          matches('(?=.*[A-Z]).{8,}'),
      sanitizeBody('username').escape(),
    ],
    authController.user_create_post,  // Rekisteröidään käyttäjä
    authController.login, // kun ollaan rekisteröidytty, mennään automaattisesti loginiin ja kirjaudutaan sisään automaattisesti
);

module.exports = router;
