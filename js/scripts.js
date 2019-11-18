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

  if (username === 'kokeilu' && password === '123') {
    console.log('toimii');
    form_box.style.display = 'none';

  }
  else {
    console.log('oophs');
    alert('The username and password you entered dont match');
  }
}

// SLIDESHOW
var slideIndex = 0;
showSlides();

// Move between slides
function showSlides() {
  var i;
  var slides = document.getElementsByClassName("carousel_slide");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}

  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 2 seconds


}

