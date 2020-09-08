'use strict'
$().ready();

const array = [];

function Horn (object) {
    this.image_url = object.image_url;
    this.title = object.title;
    this.description = object.description;
    this.keyword = object.keyword;
    this.horns = object.horns;
    array.push(this);
}
console.log


$.ajax('/data/page-1.json', {method: 'GET', dataType: 'JSON'})
 .then(hornInfo => {
    hornInfo.forEach(horn => {
        new Horn(horn).render();
        
    });
});
// .then(() => { Horn.dropDown()});


Horn.prototype.render = function(){
    const myTemplate = $('#photo-template').html();
    const $newSection = $(`<section>${myTemplate}</section>`);
    $newSection.find('h2').text(this.title);
    $newSection.find('img').attr('src', this.image_url);
    $newSection.find('p').text(`${this.description}. The number of horns is ${this.horns}.`)
    $('main').append($newSection);
}

Horn.dropDown = () => {
    let tempArray = [];
    hornArray.forEach(value => {
      if (!tempArray.includes(value.keyword)) {
        tempArray.push(value.keyword);
      }
    })
    tempArray.forEach(value => {
      const $newOptionTag = $(`<option value="${value}">${value}</option>`);
      $('select').append($newOptionTag);
    })
  }
  $('select').on('change', handler);
  function handler(event) {
    $('section').hide();
    hornArray.forEach((object) => {
      if(event.target.value === object.keyword) {
        $(`section[id = ${object.keyword}]`).show();
      }
    });
  }
