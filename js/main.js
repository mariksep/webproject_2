'use strict';

const getCat = async () => {
  const response = await fetch('./catinfo');
  const json = await response.json();
  document.querySelector('h2').innerHTML = json.name;
  document.querySelector('p:nth-of-type(1)').innerHTML = `Age: ${json.age}`;
  document.querySelector('p:nth-of-type(2)').innerHTML = `Weight: ${json.weight}kg`;
};

getCat();