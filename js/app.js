



'use strict';
$().ready();

const array = [];
let selectionList = [];
let animalGroupToDisplay = 1;

// ************* AJAX DATA *************
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
  // .then(() => Horn.dropDown());

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

// ************* FUNCTION/METHOD DECLARATIONS *************
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
  let html = Mustache.render(myTemplate,this);
  $('main').append(html);
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

// ************* FUNCTION HANDLER DECLARATIONS *************
function handler(event) {
  $('section').hide();
  array.forEach((object) => {
    if(this.value === object.keyword) {
      $(`section[id = ${object.keyword}]`).show();
    }
  });
}

function handlerAnimalGroup() {
  $('section').hide(500);

  if (animalGroupToDisplay === 1) {
    animalGroupToDisplay = 2 ;
  } else {
    animalGroupToDisplay = 1;
  }

  array.forEach((object) => {
    if(animalGroupToDisplay === object.animalGroup) {
      $(`section[class = ${animalGroupToDisplay}]`).show(500);
    }
  });
}

// ************* EVENT LISTENERS *************
$('select').on('change', handler);

$('button').on('click', handlerAnimalGroup);