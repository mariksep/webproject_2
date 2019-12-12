'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();


const getLikes = async (params) => {
  console.log('model getlikes', params);
  try {
    const [rows] = await promisePool.query('SELECT * FROM pp_likes WHERE username = ? AND pic_id = ?;', params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};


const addLikes = async (params) => {
  console.log('model addlikes', params);
  try {
    const [rows] = await promisePool.execute('INSERT INTO pp_likes (pic_id, username) VALUES (?, ?);', params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const updateMoreLikes = async (picid) => {
  console.log('model morelike', picid);
  try {
    const [rows] = await promisePool.execute(
        'UPDATE pp_pics SET likes = (likes + 1) WHERE pic_id = ?;', picid);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const deleteLike= async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'DELETE FROM pp_likes WHERE pic_id = ? AND username = ?;',
        params);
    return rows;
  }
  catch (e) {
    console.log('error', e.message);
  }
};

const updateLessLikes = async (picid) => {
  console.log('model lesslike', picid);
  try {
    const [rows] = await promisePool.execute(
        'UPDATE pp_pics SET likes = (likes - 1) WHERE pic_id = ?;', picid);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getLikes,
  addLikes,
  updateMoreLikes,
  deleteLike,
  updateLessLikes,
};
