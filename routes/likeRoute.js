'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');   // Tarvitaan tiedostojen uploadaukseen
const upload = multer({dest: 'uploads/'});
const likeController = require('../controllers/likeController');

//Hae kuvan tykkäykset
router.get('/:params', likeController.like_get_likes);

// Lisää
router.post('/:addlike', likeController.like_add_likes);

//Päivitä
router.put('/:upd', likeController.like_update_likes);

//Poista
router.delete('/:deletelike', likeController.like_delete_like);


module.exports = router;