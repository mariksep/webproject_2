'use strict';

// FIND FORM PARTS FOR THE MOVEMENT
let login_form = document.getElementById('login-form');
let register_form = document.getElementById('register-form');
let log_button = document.getElementById('switchFormButton');

// CHOOSE REGISTER FORM
const move_reg_button = document.getElementById('move-register-btn');

const move_register = () => {
  login_form.style.left = '-400px';
  register_form.style.left = '50px';
  log_button.style.left = '110px';
};

move_reg_button.addEventListener('click', move_register);

// CHOOSE LOG IN FORM
const move_log_button = document.getElementById('move-login-btn');

const move_login = () => {
  login_form.style.left = '50px';
  register_form.style.left = '450px';
  log_button.style.left = '0px';
};

move_log_button.addEventListener('click', move_login);


// CHECK LOG IN VALUES
const log_submit_btn = document.getElementById('submit-log-btn');

const check_values = () => {
  let username = document.getElementById('username').value;
  let password = document.getElementById('passwd').value;
  const form_box = document.getElementById('form-box');
  const main = document.getElementById('main-content');
  const header = document.getElementById('header');
  const navbar = document.getElementById('navi');

  if (username === 'kokeilu' && password === '123') {
    form_box.style.display = 'none';
    header.style.display='none';
    main.style.display='flex';
    navbar.style.display = 'flex';
  }
  else {
    alert('The username and password you entered dont match');
  }
};

log_submit_btn.addEventListener('click', check_values);


// SLIDESHOW
let slideIndex = 0;

// Move between slides
const showSlides = () => {
  let slides = document.getElementsByClassName("carousel_slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}

  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 7000); // Change image every 5 seconds
};

showSlides();


// OPENING CARD-MODAL
const card_modal= document.getElementById("modal");

const open_modal = () => {
  card_modal.style.display="flex";
  console.log("open modal");
};

const check_if_card_modal = (e) => {
  let target = e.target;
  if (target.className === 'card_img') {
    open_modal();
  }
};

document.body.addEventListener('click', check_if_card_modal);

// OPENING MODAL ADDING PIC
const plus_icon = document.getElementById('plus-icon');
const add_pic_modal = document.getElementById('adding_pic');

const open_modal_add = () => {
  add_pic_modal.style.display = 'flex';
  console.log('open modal adding pic');
};

plus_icon.addEventListener('click', open_modal_add);


// CLOSING CARD-MODAL AND ADD-PIC-MODAL BY CLICKING WINDOW
const close_modal = (event) => {
  if (event.target === card_modal ||event.target ===  add_pic_modal) {
    card_modal.style.display = "none";
    add_pic_modal.style.display = "none";
    console.log("closing modal either pic modal or adding pic modal");
  }
};

window.onclick = close_modal;


// LOADING IMAGE IN ADDING PIC-MODAL
/*
var input= document.getElementById('file-upload');
const infoArea= document.getElementById('file-upload-filename');

const showFilename= (event) =>{
 const input = event.srcElement;
  const filename= input.files[0].name;
  infoArea.textContent= "File name:" + filename;
};
input.addEventListener('change', showFilename);
*/
const infoArea= document.getElementById('file-upload-filename');
var input= document.getElementById('file-upload');

const showFilename= (event) =>{
  const input = event.srcElement;
  const filename= input.files[0].name;
  infoArea.textContent= "File name:" + filename;
};
input.addEventListener('change', showFilename);
/*
document.getElementById("file-upload").onchange = function () {

  let reader = new FileReader();

  reader.onload = function (e) {
    // get loaded data and render thumbnail.
    document.getElementById("image").src = e.target.result;
  };

  // read the image file as a data URL.
  reader.readAsDataURL(this.files[0]);
};
*/




// HAMBURGER MENU MOVEMENT
const wrapperMenu = document.querySelector('.hamburger-menu');
const toggle_hamburger = () => wrapperMenu.classList.toggle('open');
wrapperMenu.addEventListener('click', toggle_hamburger);


// LIKE ICON COLOR CHANGE



const heart_color= (x) => {
  x.style.color = " #faaca8";
};

/*
ÄLÄ POISTA VIELÄ

const heart= document.getElementById('heart');

const color_heart= () => {
  heart.style.color=" #faaca8";
  console.log('heart color change');

};
heart.addEventListener('click', color_heart);


const heart = document.getElementById('heart');
console.log('heart found');

const heart_color = () =>{
  console.log('in heart color');

  heart.style.color="blue";
  console.log('heart color change');
};
heart.addEventListener('click', heart_color);
*/






