'use strict';
const express = require('express');
const router = express.Router();
const {body, sanitizeBody} = require('express-validator');
const multer = require('multer');   // Tarvitaan tiedostojen uploadaukseen
const upload = multer({dest: 'uploads/'});
const picController = require('../controllers/picController');

//hae kuva/t
router.get('/', picController.pic_list_get);
router.get('/tag/:tags', picController.pic_get_tag);
router.get('/:id', picController.pic_get);
router.get('/user/:username', picController.pic_get_user);


// UPLOAD pic JA TIEDOSTO
router.post('/', upload.single('filename'), (req, res, next) => {
  console.log('pic post file', req.file);

  if (req.file === undefined) {
    res.json({
      error: 'No file',
    });
  } else if (!req.file.mimetype.includes('image')){
    res.json({
      error: 'Not an image',
    });
  } else {
    //tiedostonnimi bodyyn
    req.body.filename = req.file.filename;
    next();
  }

});

// Lisää pic
router.post('/', picController.pic_create_post);

// Muokkaa pic
router.put('/',
    [
      body('description', 'cannot be empty').isLength({min: 1}),
      body('tags', 'cannot be empty').isLength({min: 1}),  // lisää vielä maksimi
      body('id', 'must be number').isNumeric().isLength({min: 1}),
    ],
    picController.pic_update_put
);


//poista pic
router.delete('/:id', picController.pic_delete);



module.exports = router;