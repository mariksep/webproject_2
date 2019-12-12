'use strict';
const {validationResult} = require('express-validator');
const picModel = require('../models/picModel');
const resize = require('../utils/resize');

const pic_list_get = async (req, res) => {
  const pics = await picModel.getAllPics();
  await res.json(pics);
};

const pic_get = async (req, res) => {
  const pic = await picModel.getPic(req.params.id);
  await res.json(pic[0]);
  console.log('id'+ pic[0]);
};


const pic_search_by_theme = async (req, res) => {
  console.log('cotroller teemat:', req.params.teemat);
  const params = [req.params.teemat];
  const pics = await picModel.getSearchedPics(params);
  await res.json(pics);
};

const pic_get_tag = async (req, res) => {
  console.log('cotroller tags:', req.params.tags);
  const pics = await picModel.getPicT(req.params.tags);
  await res.json(pics);

};
const pic_get_user = async (req, res) => {
  console.log('cotroller user:', req.params.username);
  const user = await picModel.getPicU([req.params.username]);
  await res.json(user);

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
  console.log('update in piccontroller');
  const errors = validationResult(req);


  if (!errors.isEmpty()) {
    res.send(errors.array());
  } else {
    const params = [
      req.body.description,
      req.body.tags,
      req.body.id,
    ];
    console.log('update these', params);
    const result = await picModel.updatePic(params);
    await res.json(result);
  }
  };

const pic_delete = async (req, res) => {

  console.log('pic delete controller');
  const params = [req.params.id];
  console.log('delete', params);
  const result = await picModel.deletePic(params);
  await res.json(result);
};


module.exports = {
  pic_get_user,
  pic_list_get,
  pic_get,
  pic_get_tag,
  pic_search_by_theme,
  pic_create_post,
  pic_update_put,
  pic_delete,
};