'use strict';

// CHOOSE LOG IN OR REGISTRATION FORM
let login_form = document.getElementById('login-form');
let register_form = document.getElementById('register-form');
let log_button = document.getElementById('switchFormButton');

function move_register() {
  login_form.style.left = '-400px';
  register_form.style.left = '50px';
  log_button.style.left = '110px';
}

function move_login() {
  login_form.style.left = '50px';
  register_form.style.left = '450px';
  log_button.style.left = '0px';
}

// CHECK LOG IN VALUES
function check_values() {
  let username = document.getElementById('username').value;
  let password = document.getElementById('passwd').value;
  const form_box = document.getElementById('form-box');
  const hero = document.getElementById('hero');
  const main = document.getElementById('content');
  const header = document.getElementById('header');

  if (username === 'kokeilu' && password === '123') {
    form_box.style.display = 'none';
    header.style.display='none';
    main.style.display='flex ';
  }
  else {
    alert('The username and password you entered dont match');
  }
}

// SLIDESHOW

let slideIndex = 0;
showSlides();

// Move between slides
function showSlides() {
  let slides = document.getElementsByClassName("carousel_slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}

  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 7000); // Change image every 7 seconds
}

// CLOSING AND OPENING MODAL

function open_modal() {
const x= document.getElementById("modal");
x.style.display="flex";
  console.log("open modal");
}

let modal = document.getElementById('modal');
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
    console.log("closing modal");
  }
};

// HAMBURGER MENU MOVEMENT

const wrapperMenu = document.querySelector('.hamburger-menu');

wrapperMenu.addEventListener('click', function(){
  wrapperMenu.classList.toggle('open');
});