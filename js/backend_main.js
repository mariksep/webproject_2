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
const searchThemeButton = document.querySelector('#search-theme-button');
const searchThemeInput = document.querySelector('#search-theme-input');
const searchTagButton = document.querySelector('#search-tag-button');
const searchTagInput = document.querySelector('#search-tag-input');

// CREATE MULTIPLE CARDS
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

      modalP.innerHTML = 'Description: ' + pic.description + ' Tags: ' +
          pic.tags + 'Username: ' + pic.username;
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

// CREATE ONE CARD
const createOneCard = (pic) => {

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

    modalP.innerHTML = 'Description: ' + pic.description + ' Tags: ' +
        pic.tags + 'Username: ' + pic.username;
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
  } catch (e) {
    console.log(e.message);
  }
};

// LOGIN
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
  } else {    // Käyttäjä löytyi, salasana ok
    // save token and username
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('username', json.user.username);

    // Hide login and show front page
    header.style.display = 'none';
    main.style.display = 'flex';
    navbar.style.display = 'flex';
    userInfo.innerHTML = `${json.user.username}`;   // Lisätään käyttäjänimi naviin
    loginForm.reset();    // tyhjennä formin input-arvot

    await getPic();
  }
});

// LOGOUT
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
  } catch (e) {
    console.log(e.message);
  }
});


// SUBMIT REGISTER FORM
registerForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(registerForm);

  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url + '/auth/register', fetchOptions);
    const json = await response.json();

    alert(json[0].msg);

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
  } catch (e) {
    console.log(e.message);
  }

});

// KUN SIVUA PÄIVITETÄÄN -> tarkistetaan onko token ja pysytään frontpagella
if (sessionStorage.getItem('token')) {
  const username = sessionStorage.getItem('username');
  header.style.display = 'none';
  main.style.display = 'flex';
  navbar.style.display = 'flex';
  userInfo.innerHTML = username;    // Lisätään käyttäjänimi naviin
  getPic();
}


// SUBMIT ADD PHOTO FORM
addPhoto.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  let teema = '';
  const inputElements = document.querySelectorAll(
      'input[type=checkbox][name=themes]');

  for (let i = 0; i < inputElements.length; i++) {
    if (inputElements[i].checked) {
      teema += inputElements[i].value + ' ';
    }
  }
  console.log('arvot', teema);

  const user_id = sessionStorage.getItem('username');
  let fdObject = new FormData(addPhoto);
  fdObject.append('username', user_id);
  fdObject.append('theme', teema);
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

/* HUONO, HAKEE VAIN JOS ON  YKSI TEEMA, EI LÖYDÄ JOS ON USEITA
// SEARCH PICS WITH CHOSEN THEME
searchThemeButton.addEventListener('click', async (evt) => {

  let teemat = searchThemeInput.value;
  console.log('löydetty teema', teemat);
  console.log('search themes token', sessionStorage.getItem('token'));

  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };

    const response = await fetch(url + '/pic/' + teemat, options);
    const pics = await response.json();
    createPicCards(pics);
  }
  catch (e) {
    console.log(e.message);
  }

});
*/

// LUODAAN KUVAKORTIT HAETULLA TAGILLA
const createTagPicCards = (pics, tags) => {
  //clear cardcontainer
  cardContainer.innerHTML = '';

  pics.forEach((pic) => {
    console.log('tagit: ', pic.tags);
    const kuvanTagit = pic.tags;

    // jaetaan kuvaan liittyvät tietokannassa olevat tagit yksittäisiksi stringeiksi(array) hastagin kohdalta -> hastag poistuu ja jää pelkkä sana
    const tagi = kuvanTagit.split('#');
    console.log('jaettuina', tagi);

    // Käydään kaikki kuvan tagit läpi
    for (let i = 0; i < tagi.length; i++) {

      // Jos joku kuvan tageista on sama kuin haettu tageista -> luodaan kortti
      if (tagi[i] === tags) {
        createOneCard(pic);
      }
    }

    console.log('eka', tagi[0]);
  });


};

// HAE KUVIA HALUTULLA TAGILLA
searchTagButton.addEventListener('click', async (evt) => {
  evt.preventDefault();

  // Haetaan käyttäjän syöttämä tagin nimi
  let tagi = searchTagInput.value;
  console.log('löydetty tagi', tagi);

  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };

    const response = await fetch(url + '/pic', options);
    const pics = await response.json();

    // Luodaan kortit
    createTagPicCards(pics, tagi);
  } catch (e) {
    console.log(e.message);
  }

});
