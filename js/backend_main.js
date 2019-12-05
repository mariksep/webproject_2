'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// select needed html elements
const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');
const logOut = document.getElementById('logout-button');
const main = document.getElementById('main-content');
const header = document.getElementById('header');
const navbar = document.getElementById('navi');
const navContent = document.querySelector('.navi-content');
const userInfo = document.querySelector('#user-info');
const addPhoto = document.querySelector('#adding_form');
const cardContainer = document.querySelector('#card_container');
const modalImage = document.querySelector('.modal-content img');
const modalP = document.querySelector('.modal-content p');

// login
loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(loginForm);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + '/auth/login', fetchOptions);
  const json = await response.json();
  console.log('login response', json);

  if (!json.user) {
    alert(json.message);
  }
  else {    // Käyttäjä löytyi, salasana ok
    // save token and username
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('username', json.user.username);

    // Hide login and show front page
    header.style.display = 'none';
    main.style.display = 'flex';
    navbar.style.display = 'flex';
    userInfo.innerHTML = `${json.user.username}`;   // Lisätään käyttäjänimi naviin
    loginForm.reset();    // tyhjennä formin input-arvot
  }
});


// logout
logOut.addEventListener('click', async (evt) => {
  evt.preventDefault();
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/auth/logout', options);
    const json = await response.json();
    console.log(json);
    // remove token and username
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    alert('You have logged out');

    // Hide frontpage and show login
    main.style.display = 'none';
    navbar.style.display = 'none';
    header.style.display = 'unset';
    navContent.classList.toggle('show');
    wrapperMenu.classList.toggle('open');
  }
  catch (e) {
    console.log(e.message);
  }
});


// submit register form
registerForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(registerForm);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + '/auth/register', fetchOptions);
  const json = await response.json();
  console.log('user add response', json);

  // save token and username
  sessionStorage.setItem('token', json.token);
  sessionStorage.setItem('username', json.user.username);
  // Hide login and show frontpage
  userInfo.innerHTML = `${json.user.username}`;   // Lisätään käyttäjänimi naviin
  header.style.display = 'none';
  main.style.display = 'flex';
  navbar.style.display = 'flex';
  registerForm.reset();   // Tyhjennä formin input-arvot
});


// Kun sivua päivitetään -> tarkistetaan onko token ja pysytään frontpagella
if (sessionStorage.getItem('token')) {
  const username = sessionStorage.getItem('username');
  header.style.display = 'none';
  main.style.display = 'flex';
  navbar.style.display = 'flex';
  userInfo.innerHTML = username;    // Lisätään käyttäjänimi naviin
}

// CREATE CARDS
const createPicCards = (pics) => {
  // clear cardcontainer
  cardContainer.innerHTML = '';

  pics.forEach((pic) => {

    const cardDiv = document.createElement('div');
   cardDiv.classList.add('card');

    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + pic.filename;
    img.alt = pic.description;
    img.classList.add('card_img');

    // open larger image when clicking image, show description and tags
    img.addEventListener('click', () => {
      modalImage.src = url + '/' + pic.filename;
      modalImage.alt = pic.description;

      modalP.innerHTML = 'Description: ' + pic.description + ' Tags: ' + pic.tags + 'Username: ' + pic.username;
    });

    const p = document.createElement('p');
    const heart = document.createElement('i');
    heart.classList.add('fas');
    heart.classList.add('fa-heart');

    p.appendChild(heart);
    p.innerHTML += pic.description;

    cardDiv.appendChild(img);
    cardDiv.appendChild(p);
    cardContainer.appendChild(cardDiv);
  });
};


// GET PIC
const getPic = async () => {
  console.log('getPic   token ', sessionStorage.getItem('token'));
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/pic', options);
    const pics = await response.json();
    createPicCards(pics);
  }
  catch (e) {
    console.log(e.message);
  }
};


// SUBMIT ADD PHOTO FORM
addPhoto.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const user_id = sessionStorage.getItem('username');
  let fdObject = new FormData(addPhoto);
  fdObject.append('username', user_id);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: fdObject,
  };
  const response = await fetch(url + '/pic/', fetchOptions);
  const json = await response.json();
  console.log('add response', json);
  await getPic();
});
