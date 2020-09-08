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
    console.log($newSection);
    $newSection.find('img').attr('src', this.image_url);
    $('main').append($newSection);
}


// {
//     "image_url": "http://3.bp.blogspot.com/_DBYF1AdFaHw/TE-f0cDQ24I/AAAAAAAACZg/l-FdTZ6M7z8/s1600/Unicorn_and_Narwhal_by_dinglehopper.jpg",
//     "title": "UniWhal",
//     "description": "A unicorn and a narwhal nuzzling their horns",
//     "keyword": "narwhal",
//     "horns": 1
//   },