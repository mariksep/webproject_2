'use strict';
const url = 'http://localhost:8000'; // change url when uploading to server

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
const cardContainer_user = document.querySelector('#card-container');
const usernameMyPage = document.querySelector('#user-name-mypage');
const modForm = document.querySelector('#modify_form');
const buttonS = document.getElementById('search-form');
const inputS = document.querySelector('#search-input');


// CREATE MULTIPLE CARDS
const createPicCards = (pics) => {
  // clear cardcontainer
  cardContainer.innerHTML = '';
  console.log('täällä ollaan');

  pics.forEach((pic) => {

    // Haetaan tietokannasta kuvat, joista käyttäjä on tykännyt
    const get_likes = async () => {
      const user = sessionStorage.getItem('username');
      const params = [user, pic.pic_id];

      console.log('params', params);

      try {
        const options = {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          },
        };

        const response = await fetch(url + '/like/' + params, options);
        const allLikes = await response.json();
        console.log('vastaus', allLikes);

        addHearts(allLikes);
      } catch (e) {
        console.log(e.message);
      }
    };

    // Luodaan kuvakortit
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

      modalP.innerHTML = pic.username + ' ' + pic.description;
    });

    const p = document.createElement('p');
    const heart_liked = document.createElement('i');
    const heart_unliked = document.createElement('i');
    heart_liked.setAttribute('data-picid', pic.pic_id);
    heart_unliked.setAttribute('data-picid', pic.pic_id);
    heart_liked.setAttribute('data-likes', pic.likes);
    heart_unliked.setAttribute('data-likes', pic.likes);

    console.log('ei ole tykatty');
    // käyttäjä ei ole vielä tykännyt kuvasta
    heart_liked.classList.add('like', 'fas', 'fa-heart');
    heart_unliked.classList.add('hide', 'unlike', 'fas', 'fa-heart');

    p.appendChild(heart_liked);
    p.appendChild(heart_unliked);

    const span1 = document.createElement('span');
    if (pic.likes === 0) {
      span1.style.display = 'none';
    } else if (pic.likes === 1) {
      span1.innerHTML += pic.likes + ' like ';
    } else {
      span1.innerHTML += pic.likes + ' likes ';
    }

    span1.classList.add('textlike');

    const span2 = document.createElement('span');
    span2.innerHTML = pic.description;
    span2.classList.add('description');

    p.appendChild(span1);
    p.appendChild(span2);
    cardDiv.appendChild(img);
    cardDiv.appendChild(p);
    cardContainer.appendChild(cardDiv);

    get_likes();

  });
};

// CREATING USERS OWN PICS
const createPicCards_user = (pics) => {
  // clear cardcontainer
  cardContainer_user.innerHTML = '';
  console.log('täällä ollaan');

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

    //Modify post, add select values to form

    const buttonM = document.createElement('button');
    const modify = document.querySelector('#Modify_pic');
    const mypageC = document.querySelector('#myPage');
    buttonM.innerHTML = 'Modify';
    buttonM.addEventListener('click', () => {
      console.log('creating button modify and seting values');
      modify.style.display = 'block';  // avaa modify kortin
      mypageC.style.display = 'none'; // sulkee takana olevan mypage

      const inputs = modForm.querySelectorAll('input');
      inputs[0].value = pic.description;
      inputs[1].value = pic.tags;
      inputs[2].value = pic.pic_id;

    });

    //delete post
    const buttonD = document.createElement('button');
    buttonD.innerHTML = 'Delete';
    buttonD.addEventListener('click', async () => {
      console.log('Click delete, backendmain');
      const fetchOptions = {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      try {
        const response = await fetch(url + '/pic/' + pic.pic_id, fetchOptions);
        const pics = await response.json();
        console.log('delete response', pics);
        search_users_pics();
        getPic();

      } catch (e) {
        console.log(e);
      }

    });

    p.appendChild(heart);
    p.innerHTML += pic.description;
    cardDiv.appendChild(img);
    cardDiv.appendChild(p);
    cardDiv.appendChild(buttonM);
    cardDiv.appendChild(buttonD);
    cardContainer_user.appendChild(cardDiv);

  });
};

// GET PICS
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

// GET USERS PIC
const getPicU = async () => {
  console.log('getPic   token ', sessionStorage.getItem('token'));
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/pic', options);
    const pics = await response.json();
    createPicCards_user(pics);
  } catch (e) {
    console.log(e.message);
  }
};

// SEARCH WITH TAG
const searchtags = async (evt) => {
  evt.preventDefault();

  var tag = inputS.value;
  console.log(tag);
  if (tag != null) {
    tag = inputS.value;
  } else {
    tag = ' ';
  }
  console.log('getPic   token ', sessionStorage.getItem('token'));
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/pic/tag/' + tag, options);
    const pics = await response.json();
    createPicCards(pics);
  } catch (e) {
    console.log(e.message);
  }
};
buttonS.addEventListener('submit', searchtags);

// SUBMIT MODIFY
modForm.addEventListener('submit', async (evt) => {
  console.log('backend_main submit modify ');

  evt.preventDefault();
  const data = serializeJson(modForm);
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  };
  console.log('fetchoptions' + fetchOptions);
  const response = await fetch(url + '/pic', fetchOptions);
  const json = await response.json();
  console.log('modify response', json);
  search_users_pics();
  getPic();
  console.log('updating view');

});

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

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + '/auth/register', fetchOptions);
  const json = await response.json();

  // Jos ongelmia rekisteröinnissä, ilmoitetaan käyttäjälle alertilla
  if (json.status === '409') {
    alert(json.message);
  }

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
  await getPic();
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
  addPhoto.reset();
  await getPic();
});

// USERS OWN PICTURES SEARCH
const username_Mypage = sessionStorage.getItem('username');

const testi = document.querySelector('#testi');
usernameMyPage.innerHTML = username_Mypage;

const search_users_pics = async (evt) => {
  console.log('search_users_pics in');
  // evt.preventDefault();

  const username = sessionStorage.getItem('username');

  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/pic/user/' + username, options);
    const pics = await response.json();
    console.log('search_users_pics', pics);

    createPicCards_user(pics);
  } catch (e) {
    console.log(e.message);
  }
};
testi.addEventListener('click', search_users_pics);


// ADD LIKE
const addLikes = async (user, picid) => {

  const addlike = [user, picid];

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
  };

  const response = await fetch(url + '/like/' + addlike, fetchOptions);
  const json = await response.json();
  console.log('lisatty liket', json);

};

// DELETE LIKE
const deleteLikes = async (user, picid) => {

  console.log('user', user);
  console.log('id', picid);
  const deletelike = [user, picid];

  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
  };

  const response = await fetch(url + '/like/' + deletelike, fetchOptions);
  const json = await response.json();
  console.log('poistettu liket', json);

};

//  UPDATE LIKES
const updateLikes = async (luokka, picid) => {
  const upd = [picid, luokka];

  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
  };

  const response = await fetch(url + '/like/' + upd, fetchOptions);
  const json = await response.json();
  console.log('paivitetty lisaa liket', json);
};


// Uusien tykkäyksien teko/poisto kun käyttäjä on kirjautuneena
document.body.addEventListener('click', event => {

  // KUN EI OLLA VIELÄ TYKÄTTY KUVASTA
  if (event.target.nodeName === 'I' && event.target.className ===
      'like fas fa-heart') {
    const user = sessionStorage.getItem('username');
    const kuvaid = event.target.getAttribute('data-picid');
    let likes = event.target.getAttribute('data-likes');
    const luokka = 'like';
    likes++;

    // Muutokset tietokantaan
    addLikes(user, kuvaid);
    updateLikes(luokka, kuvaid);

    // Muutokset frontissa
    event.target.setAttribute('data-likes', likes);
    event.target.nextElementSibling.setAttribute('data-likes', likes);
    event.target.classList.add('hide');
    event.target.nextElementSibling.classList.remove('hide');
    const span = event.target.parentNode.childNodes[2];

    if (likes === 1) {
      span.style.display = 'unset';
      span.innerHTML = likes + ' like ';
    } else {
      span.innerHTML = likes + ' likes ';
    }

    span.style.marginLeft = '5px';
  }

  // KUN OLLAAN TYKÄTTY KUVASTA
  if (event.target.nodeName === 'I' && event.target.className ===
      'unlike fas fa-heart') {

    const user = sessionStorage.getItem('username');
    const kuvaid = event.target.getAttribute('data-picid');
    let likes = event.target.getAttribute('data-likes');
    const luokka = 'unlike';
    likes--;

    // Muutokset tietokantaan
    deleteLikes(user, kuvaid);
    updateLikes(luokka, kuvaid);

    // Muutokset frontissa
    event.target.setAttribute('data-likes', likes);
    event.target.previousElementSibling.setAttribute('data-likes', likes);
    event.target.classList.add('hide');
    event.target.previousElementSibling.classList.remove('hide');

    if (likes === 0) {
      event.target.nextElementSibling.style.display = 'none';
      event.target.nextElementSibling.innerHTML = '';
    } else if (likes === 1) {
      event.target.nextElementSibling.innerHTML = likes +' like ';
    } else {
      event.target.nextElementSibling.innerHTML = likes + ' likes ';
    }
  }
});

// Lisätään sydämet, jos käyttäjä on tykännyt kuvasta aikaisemmin (kun kirjaudutaan sisään, päivitetään ym)
const addHearts = (par) => {

  if (par.length > 0) {
    const picid = par[0].pic_id;
    console.log('id', picid);

    const elementti = document.querySelector('[data-picid=\'' + picid + '\']');
    elementti.classList.add('hide');
    elementti.nextElementSibling.classList.remove('hide');
  }

};