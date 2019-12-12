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
 const add_photo_button =document.querySelector('#add-photo-button');


const open_modal_add = () => {
  add_pic_modal.style.display = 'flex';
  console.log('open modal adding pic');
};

plus_icon.addEventListener('click', open_modal_add);

// CLOSING CARD-MODAL AND ADD-PIC-MODAL BY CLICKING WINDOW
const close_modal = (event) => {
  if (event.target === card_modal || event.target === add_pic_modal ) {
    card_modal.style.display = 'none';
    add_pic_modal.style.display = 'none';
    console.log('closing modal pic modal or adding pic modal ');
  }
};
window.onclick = close_modal;

// closing add form by add button
const closing_add_photo= (event)=>{
  add_pic_modal.style.display='none';
};

add_photo_button.addEventListener('click', closing_add_photo);

// LOADING IMAGE IN ADDING PIC-MODAL

const infoArea = document.getElementById('file-upload-filename');
const input = document.getElementById('file-upload');

const showFilename = (event) => {
  const input = event.srcElement;
  const filename = input.files[0].name;
  infoArea.textContent = 'File name:' + filename;
};
input.addEventListener('change', showFilename);

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


//radio buttons


const type = document.getElementsByName("themes");
const radio = document.querySelector(".radio");


const check_radio=()=>{
  console.log('in check function');
  if(type[0].checked){
    document.getElementById("demo").value= "Halloween";
  }
  if (type[1].checked){
    document.getElementById("demo").value= "Christmas";
  }
  if (type[2].checked){
    document.getElementById("demo").value= "Birthday";
  }
  if (type[3].checked){
    document.getElementById("demo").value= "Brunch";
  }
  if (type[4].checked){
    document.getElementById("demo").value= "Wedding";

  }
  if (type[5].checked){
    document.getElementById("demo").value= "Easter";

  }
  if (type[6].checked){
    document.getElementById("demo").value= "Kids";

  }
  if (type[7].checked){
    document.getElementById("demo").value= "Graduation";

  }

};


//opening myPage

const lista = document.querySelector("#lista");
const myPage = document.querySelector("#myPage");
const maincont = document.querySelector('#main-content');
const exit = document.querySelector('#exit');


const opening_myPage = () =>{
  myPage.style.display="block";
  maincont.style.display= "none";
  console.log('my page opening');
};
lista.addEventListener('click',opening_myPage);
const closing_myPAge= ()=>{
  myPage.style.display="none";
  maincont.style.display= "flex";
  console.log('my page closing');

};
exit.addEventListener('click', closing_myPAge);

// CLOSING MODIFY CARD


const navContentS = document.querySelector('.navi-content');

const addM = document.querySelector('.modify-photo-button');
const modifyC = document.querySelector('#Modify_pic');

const closingModify =  ()=>{
  console.log('closing modify');
  myPage.style.display = "block";
  modifyC.style.display= "none";
};
addM.addEventListener('click', closingModify);









/*
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