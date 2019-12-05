'use strict';
const {validationResult} = require('express-validator');
const picModel = require('../models/picModel');
const resize = require('../utils/resize');

const pic_list_get = async (req, res) => {
  const pics = await picModel.getAllPics();
  res.json(pics);
};

const pic_get = async (req, res) => {
  const pic = await picModel.getPic(req.params.id);
  await res.json(pic[0]);
};

const pic_create_post = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.send(errors.array());
  } else {
    try {
      // create thumbnail
      const thumb = await resize.makeThumbnail(req.file.path,
          'thumbnails/' + req.file.filename,
          {width: 500, height: 500});
      console.log('thumb', thumb);

      const params = [
        req.body.username,
        req.body.description,
        req.body.tags,
        req.body.filename, // req.body.filename if filename saved to body
      ];
      console.log('create', params);
      const pic = await picModel.addPic(params);
      await res.json({message: 'upload ok'});
    } catch (e) {
      console.log('exif error', e);
      res.status(400).json({message: 'error'});
    }
  }
};

const pic_update_put = async (req, res) => {
  console.log('muokkaa', req.body);

    const params = [
      req.body.name,
      req.body.age,
      req.body.weight,
      req.body.owner,
      req.body.id,
    ];
    const result = await picModel.updatePic(params);
    await res.json(result);
};

const pic_delete = async (req, res) => {
  const id = [req.params.id];
  const result = await picModel.deletePic(id);
  await res.json(result);
};


module.exports = {
  pic_list_get,
  pic_get,
  pic_create_post,
  pic_update_put,
  pic_delete,
};