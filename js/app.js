
// TODO List:

// Feature 0: Refactor
// x improvements from in-class review

// Feature 1: Pages:  paginate images
// x create a page-2.JSON
// x get page-2 through constructor (new ajax)
// x add page key to each HornObject's to say displayPage
// - add class attributes to each HTML section
// - add button
// - add eventListener for button
// - hide/show based off of button selection
// - only show keywords for group in the dropdown list

// Feature 2: mustache for templating
// - template from body to head in HTML
// - use mustache within render prototype function

// Feature 3: flexbox for styling
// - remove all floats
// - add in flexbox

// Feature 4: ability for user to sort images
// - sort by horns number
// - alphabetically title



'use strict';
$().ready();

const array = [];
let selectionList = [];


$.ajax('./data/page-1.json', { method: 'GET', dataType: 'JSON' })
  .then(hornInfo => {
    hornInfo.forEach(horn => {
      let beast = new Horn(horn);
      beast.animalGroup = 1;
      beast.render();
    })


    $(`section[class = 1]`).show();
    $(`section[class = 2]`).hide();
  })
  .then(() => Horn.dropDown());


$.ajax('./data/page-2.json', { method: 'GET', dataType: 'JSON' })
  .then(hornInfo => {
    hornInfo.forEach(horn => {
      let beast = new Horn(horn);
      beast.animalGroup = 2;
      beast.render();
    })
    $(`section[class = '1']`).show();
    $(`section[class = '2']`).hide();
  })
  .then(() => Horn.dropDown());




function Horn(object) {
  this.image_url = object.image_url;
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;
  array.push(this);
}


Horn.prototype.render = function () {
  const myTemplate = $('#photo-template').html();
  const $newSection = $(`<section class="${this.animalGroup}" id="${this.keyword}">${myTemplate}</section>`);
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('p').text(`${this.description}. The number of horns is ${this.horns}.`);
  $('main').append($newSection);
}

Horn.dropDown = () => {
  array.forEach(value => {
    if (!selectionList.includes(value.keyword.toLowerCase())) {
      selectionList.push(value.keyword.toLowerCase());
    }
  });
  selectionList.sort();
  selectionList.forEach(value => {
    const $newOptionTag = $(`<option value="${value}">${value}</option>`);
    $('select').append($newOptionTag);
  });
};


function handler(event) {
  $('section').hide();
  $(`section[id = ${event.keyword}]`).show();
}

$('select').on('change', handler);



function handlerAnimalGroup(event) {
  $('section').toggle(500);
}



$('button').on('click', handlerAnimalGroup);
