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
    const [rows] = await promisePool.query('SELECT * FROM pp_pics WHERE pic_id = ?', id);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const getPicT = async (tags) => {
  try {
  console.log('in getpict');
    const [rows] = await promisePool.query('SELECT * FROM pp_pics WHERE tags = ?', tags);
    return rows;
  }
     catch (e) {
      console.log('error haussa', e.message);
    }

};

const getPicU = async (username) => {
  try {
    console.log('in getpicU');
    const [rows] = await promisePool.query('SELECT * FROM pp_pics Where username = ?', username);
    console.log('end of getpicu');
    return rows;
  }
  catch (e) {
    console.log('error haussa', e.message);
  }


};


const getSearchedPics = async (params) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM pp_pics WHERE theme = ?', params);
    return rows;
  } catch (e) {
    console.log('error haussa', e.message);
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
  console.log(params +' picModel, updatePIC');
  try {
    const [rows] = await promisePool.execute(
        'UPDATE pp_pics SET description= ?, tags=? WHERE pic_id=?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e);
  }
};



const deletePic = async (id) => {
  console.log(id + 'delete this pic ');
  try {
    const [rows] = await promisePool.execute(
        'DELETE FROM pp_pics WHERE pic_id = ?;',
        id);
    return rows;
  }
  catch (e) {
    console.log('error', e.message);
  }
};
//ilkan versiossa id aneettan sql pyynnöss [id] --> ei toimi pitää olla id



module.exports = {
  getPicU,
  getPicT,
  getSearchedPics,
  getAllPics,
  getPic,
  addPic,
  updatePic,
  deletePic,
};
