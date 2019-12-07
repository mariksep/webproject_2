'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');   // Tarvitaan tiedostojen uploadaukseen
const upload = multer({dest: 'uploads/'});
const picController = require('../controllers/picController');

//hae kuva/t
router.get('/', picController.pic_list_get);
router.get('/:teemat', picController.pic_search_by_theme);
router.get('/:id', picController.pic_get);



// UPLOAD KISSA JA TIEDOSTO
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
    //tiedostonnimi bodyyn, jos haluaa ei pakollinen
    req.body.filename = req.file.filename;
    next();
  }

});

// Lisää kissa
router.post('/', picController.pic_create_post);

// Muokkaa kissaa
router.put('/', picController.pic_update_put);

//poista kissa
router.delete('/:id', picController.pic_delete);


module.exports = router;