'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPics = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM pp_pics');
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const getPic = async (id) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM pp_pic WHERE post_id = ?', id);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const addPic = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO pp_pics (username, description, tags, filename) VALUES (?, ?, ?, ?);', params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const updatePic = async (params) => {
  console.log(params);
  try {
    const [rows] = await promisePool.execute(
        'UPDATE pp_post SET username = ?, category_id = ?, caption_text = ?, hastags = ?, recipe_id = ? WHERE post_id = ?;', params); //tai wop_cat.cat_id
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const deletePic = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'DELETE FROM pp_post WHERE post_id = ?;',
        id);
    return rows;
  }
  catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getAllPics,
  getPic,
  addPic,
  updatePic,
  deletePic,
};
