'use strict';
const express = require('express');
const router = express.Router();
const {body, check, sanitizeBody} = require('express-validator');
const authController = require('../controllers/authController');

router.post('/login', authController.login);  // Kirjaudutaan sisään
router.get('/logout', authController.logout);   // Kirjaudutaan ulos
router.post('/register',
    [
      body('username', 'minimum 3 characters').isLength({min: 3}),
      body('email', 'email is not valid').isEmail(),
      body('password', 'at least one upper case letter').matches('(?=.*[A-Z]).{8,}'),
      sanitizeBody('username').escape(),
    ],
    authController.user_create_post,  // Rekisteröidään käyttäjä
    authController.login, // kun ollaan rekisteröidytty, mennään automaattisesti loginiin ja kirjaudutaan sisään automaattisesti
);

module.exports = router;

/* check("passwordMatch", "invalid password")
      .custom((value,{req, loc, path}) => {
        if (value !== req.body.passwordFirst) {
          // trow error if passwords do not match
          throw new Error("Passwords don't match");
        } else {
          return value;
        }
      }),*/
//body('passwordFirst', 'passwords must be the same').equals('passwordMatch'