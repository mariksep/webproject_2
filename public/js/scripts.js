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



// REPLACING THE DEFAULT VALIDATION MESSAGES ON REGISTRATION FORM
const registerUsername = document.querySelector('#register-username');
const registerEmail = document.querySelector('#register-email');
const registerPass1 = document.querySelector('#register-password1');
const registerPass2 = document.querySelector('#register-password2');

registerUsername.oninvalid = function(event) {
  event.target.setCustomValidity('Username has to have at least 3 characters');
};

registerUsername.onchange = (e) => {
  e.target.setCustomValidity('');
};

registerEmail.oninvalid = function(event) {
  event.target.setCustomValidity('Check that email-address is valid');
};

registerEmail.onchange = (e) => {
  e.target.setCustomValidity('');
};

registerPass1.oninvalid = function(event) {
  event.target.setCustomValidity('Password must contain at least one upper case');
};

registerPass1.onchange = (e) => {
  e.target.setCustomValidity('');
};

registerPass2.oninvalid = function(event) {
  event.target.setCustomValidity('Password must contain at least one upper case and they have to match');
};

registerPass2.onchange = (e) => {
  e.target.setCustomValidity('');
};

