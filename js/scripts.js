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


// SLIDESHOW
let slideIndex = 0;

// Move between slides
const showSlides = () => {
  let slides = document.getElementsByClassName('carousel_slide');
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = 'block';
  setTimeout(showSlides, 7000); // Change image every 5 seconds
};

showSlides();

// OPENING CARD-MODAL
const card_modal = document.getElementById('modal');

const open_modal = () => {
  card_modal.style.display = 'flex';
  console.log('open modal');
};

const check_class = (e) => {
  let target = e.target;
  if (target.className === 'card_img') {
    open_modal();
  }
};

window.addEventListener('click', check_class);

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
  if (event.target === card_modal || event.target === add_pic_modal) {
    card_modal.style.display = 'none';
    add_pic_modal.style.display = 'none';
    console.log('closing modal either pic modal or adding pic modal');
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
const infoArea = document.getElementById('file-upload-filename');
const input = document.getElementById('file-upload');

const showFilename = (event) => {
  const input = event.srcElement;
  const filename = input.files[0].name;
  infoArea.textContent = 'File name:' + filename;
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
const toggle_hamburger = () =>
    wrapperMenu.classList.toggle('open');

wrapperMenu.addEventListener('click', toggle_hamburger);


//NAVI OPEN AND CLOSE
const navigation = document.getElementById('navigation');
const content = document.querySelector('.navi-content');
const showNav = () => {
  content.classList.toggle('show');
  console.log('nav open ');
};
navigation.addEventListener('click', showNav);


// LIKE ICON COLOR CHANGE WHEN PRESSING THE HEART
const heart_color = (x) => {
  x.classList.toggle('liked');
};

document.body.addEventListener('click', event => {
  if (event.target.nodeName === 'I') {
    heart_color(event.target);
  }
});

/*

const color_heart= () => {
  heart.style.color=" #faaca8";
  console.log('heart color change');

};

heart.addEventListener('click', heart_color(this));
*/
/*
const check_if_heart_color = (e) => {
  let target = e.target;
  if (target.className === 'fa-heart') {
    heart_color();
  }
};
*/
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

// CHANGE IF 'RECIPE'-CHECKBOX IS CHOSEN, ADD RECIPE
const recipe_checkbox = document.querySelector("input[name=recipe]");
const recipe_form = document.getElementById('recipe-form');
const add_photo = document.getElementById('adding_form');

recipe_checkbox.addEventListener('change', event => {

  if(event.target.checked) {
    // Checkbox is checked
    add_photo.style.display = 'none';
    recipe_form.style.display = 'flex';
  }

  else {
    //Checkbox is not checked
    console.log('error');
  }
});

//CLOSE RECIPE-FORM
const recipe_apply_btn = document.getElementById('recipe-apply-btn');

const close_add_recipe = () => {
  recipe_form.style.display = 'none';
  add_photo.style.display = 'flex';
};

recipe_apply_btn.addEventListener('click', close_add_recipe);


// CHANGE IF 'LAPSET'-CHECKBOX IS CHOSEN, SHOW/HIDE CHILD-THEMES
const child_checkbox = document.querySelector("#lapset-cb");

child_checkbox.addEventListener('change', event => {

  const child_themes = document.getElementById('child-themes');
  const muut = document.querySelectorAll(
      'div#main-themes> div:not(:first-child)');

  if(event.target.checked) {
    // Checkbox is checked, open child-themes
    for (let i = 0; i < muut.length; i++) {
      muut[i].style.display = 'none';
    }
    child_themes.style.display = 'flex';
  }

  else {
    //Checkbox is not checked, close child-themes
    for (let i = 0; i < muut.length; i++) {
      muut[i].style.display = 'unset';
    }
    child_themes.style.display = 'none';
  }
});

/*
// GET THE VALUES OF THE CHECKBOXES
const get_values = () => {
  let values = '';
  let inputElements = document.querySelectorAll('input[type=checkbox][name=themes]');

  for (let i = 0; i < inputElements.length; i++) {
    if (inputElements[i].checked) {
      values += ' ' + inputElements[i].value;
    }
  }
  console.log('arvot', values);
};


// CHECK HOW MANY CHECKBOXES HAVE BEEN SELECTED, MIN 1 AND MAX 3
const addPhotoBtn = document.querySelector('#add-photo-button');

const count_checkedBoxes = () => {
  let checkBoxes = document.querySelectorAll('input[type=checkbox][name=themes]');
  let checkedThemes = 0;

  for (let i = 0; i < checkBoxes.length; i++) {
    if (checkBoxes[i].checked) {
      checkedThemes++;
    }

    if (checkedThemes === 0) {
      alert('Choose at least one theme');
      return;
    }
    if (checkedThemes > 3) {
      alert('You can select up to three themes');
      return;
    }
  }

  get_values();
};

addPhotoBtn.addEventListener('click', count_checkedBoxes);
*/
