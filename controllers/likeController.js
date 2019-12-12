'use strict';
const {validationResult} = require('express-validator');
const likeModel = require('../models/likeModel');


const like_get_likes = async (req, res) => {
  //console.log('controller hae liket', req.params);
  const parametrit = req.params.params;
  const splitattu = parametrit.split(',');
  const username = splitattu[0];
  const pic_id = splitattu[1];

  console.log(username, pic_id);

  const params = [
    username,
    pic_id,
  ];

  const result = await likeModel.getLikes(params);
  await res.json(result);
};


const like_add_likes = async (req, res) => {
  console.log('cont lisaa', req.params.addlike);
  const arvot = req.params.addlike;
  const jaettuna = arvot.split(',');
  const username = jaettuna[0];
  const pic_id = jaettuna[1];
  console.log('arvot', username, pic_id);

  const params = [
    pic_id,
    username,
  ];

  const result = await likeModel.addLikes(params);
  await res.json(result);

};

const like_update_likes = async (req, res) => {
  console.log('updat morelike', req.params.upd);

  const arvot = req.params.upd;
  const jaettuna = arvot.split(',');
  const pic_id = jaettuna[0];
  const luokka = jaettuna[1];

  console.log('arvot', pic_id, luokka);
  const id = [pic_id];

  if (luokka === 'like') {
    console.log('luokka like');
    const result = await likeModel.updateMoreLikes(id);
    await res.json(result);
  } else if (luokka === 'unlike') {
    console.log('luokka unlike');
    const result = await likeModel.updateLessLikes(id);
    await res.json(result);
  } else {
    console.log('error updatessa');
    return false;
  }

};

const like_delete_like = async (req, res) => {
  const arvot = req.params.deletelike;
  const jaettuna = arvot.split(',');
  const username = jaettuna[0];
  const pic_id = jaettuna[1];
  console.log('arvot poistoon', username, pic_id);

  const params = [
    pic_id,
    username,
  ];

  const result = await likeModel.deleteLike(params);
  await res.json(result);
};


module.exports = {
  like_get_likes,
  like_add_likes,
  like_update_likes,
  like_delete_like,
};