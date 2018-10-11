'use strict';

$(document).ready(function () {

  $('.owl-carousel').owlCarousel({
    items: 1,
    autoHeight: true,
    nav: true,
    pagination: false,
    dots: false,
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut'
  });
  $('#feedback-close').click(function(e){
    e.preventDefault();
    $('.feedback').fadeOut(500);
  });
  $('.feedback-show').click(function(){
    console.log('click');
    $('.feedback').fadeIn(500);
  });

//Прелоадер
  (function () {
    var imgs = [];
    $.each($('*'), function () {
      var $this = $(this),
        background = $this.css('background-image'),
        img = $this.is('img');
      if (background != 'none') {
        var path = background.replace('url("', '').replace('")', '');

        imgs.push(path);
      }
      if (img) {
        path = $this.attr('src');
        imgs.push(path);
      }
    });
    var percents = 1;
    for (var i = 0; i < imgs.length; i++) {
      var image = $('<img>', {
        attr: {
          src : imgs[i]
        }
      });
      image.on('load',function () {
        isLoaded(imgs.length, percents);
        percents++;
      });
      image.on('error',function () {
        isLoaded(imgs.length, percents);
        percents++;
      });
    }
    //ЕСЛИ КАРТИНОК НЕТ 
    if(imgs.length === 0){
      isLoaded(1,1);
    }
    function isLoaded(total, current) {
      var percent = Math.ceil(current / total * 100);
      if (percent >= 100) {
        function hidePreloader(){
          $('.preloader').fadeOut(1500, function(){
          });
        }
        setTimeout(hidePreloader, 2000);
      }
    }
  })();

});