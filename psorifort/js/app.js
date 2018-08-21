$(document).ready(function(){
  // console.log('ready');

//cлайдер
(function(){
  var reviewsWrap = $('.reviews')[0];
  
  $('.reviews-box__button').click(function(e){
    $(reviewsWrap).animate({
      opacity: 0.3
    }, 250, function(){
      changeSlide(e);
    });
    $(reviewsWrap).animate({opacity: 1}, 250);
    
  });
  function changeSlide(e){
    var reviewsList = $('.reviews-list')
    var reviewsListItems = reviewsList.children();
    var direction = $(e.target).hasClass('reviews-box__button_right');
    if (!direction) {
      reviewsList.prepend( reviewsListItems[reviewsListItems.length - 1] );
    }else{
      reviewsList.append( reviewsListItems[0] )
    }
    setSliderHeight();
  }
  function setSliderHeight(){
    var reviewBox = $('#reviews-box_1');
    var reviews = $(reviewBox.find('.reviews')[0]);
    var currentRevueTextBox = $(reviewBox.find('.review-item__text')[1]);
    var newSliderBoxHeight = reviews.height() + currentRevueTextBox.height();
    reviewBox.height(newSliderBoxHeight);
  }
  $(window).resize(function(){
     setSliderHeight();
  });
  setSliderHeight();
})();

//drop_down
(function(){
    //.restricting-block -- класс для блоков в которые будут увеличиватся тем самым показывать полностю весь внутренний блок
    // .hidden-block -- тот самый внутренний блок который частично скрыт
    // .read-more -- клас для кнопки
    // елемент с классом .restricting-block и .read-more должны лежать в общем родительском блоке
  var speed = 500; //скорость анимации
  var arr = $('.restricting-block');
  for (var i = 0; i < arr.length; i++) { //сохраним начальные высоты всех необходимых блоков
    var current = $(arr[i]);
    current.attr('data-height', current.height() );
  }
  
  var buttons = $('.read-more');

  buttons.click(function(e){
    var currentButton = this;
    var currentBox = $(currentButton).parent();
    var restrictingBlock = $(currentBox.children('.restricting-block')[0]);

    if ( !$(currentButton).hasClass('read-more_false') ) {
      
      var requiredHeight = $(restrictingBlock.children('.hidden-block')[0]).height();
      
      restrictingBlock.animate({height: requiredHeight}, speed);
      $(currentButton).addClass('read-more_false');

    }else{
      var currentHeight = restrictingBlock.attr('data-height');
      restrictingBlock.animate({height: currentHeight}, speed);
      $(currentButton).removeClass('read-more_false');
    }
    
  });
})()

});

// $(document).click(function(e){
//   if ( $(e.target).parents('.order-form').length > 0 || $(e.target).hasClass('order-form') ) {
//      console.log('Попав');
//     return;
//   }else{
//     //шось робим
//     console.log('Мімо');
//   }
// });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICAvLyBjb25zb2xlLmxvZygncmVhZHknKTtcclxuXHJcbi8vY9C70LDQudC00LXRgFxyXG4oZnVuY3Rpb24oKXtcclxuICB2YXIgcmV2aWV3c1dyYXAgPSAkKCcucmV2aWV3cycpWzBdO1xyXG4gIFxyXG4gICQoJy5yZXZpZXdzLWJveF9fYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAkKHJldmlld3NXcmFwKS5hbmltYXRlKHtcclxuICAgICAgb3BhY2l0eTogMC4zXHJcbiAgICB9LCAyNTAsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIGNoYW5nZVNsaWRlKGUpO1xyXG4gICAgfSk7XHJcbiAgICAkKHJldmlld3NXcmFwKS5hbmltYXRlKHtvcGFjaXR5OiAxfSwgMjUwKTtcclxuICAgIFxyXG4gIH0pO1xyXG4gIGZ1bmN0aW9uIGNoYW5nZVNsaWRlKGUpe1xyXG4gICAgdmFyIHJldmlld3NMaXN0ID0gJCgnLnJldmlld3MtbGlzdCcpXHJcbiAgICB2YXIgcmV2aWV3c0xpc3RJdGVtcyA9IHJldmlld3NMaXN0LmNoaWxkcmVuKCk7XHJcbiAgICB2YXIgZGlyZWN0aW9uID0gJChlLnRhcmdldCkuaGFzQ2xhc3MoJ3Jldmlld3MtYm94X19idXR0b25fcmlnaHQnKTtcclxuICAgIGlmICghZGlyZWN0aW9uKSB7XHJcbiAgICAgIHJldmlld3NMaXN0LnByZXBlbmQoIHJldmlld3NMaXN0SXRlbXNbcmV2aWV3c0xpc3RJdGVtcy5sZW5ndGggLSAxXSApO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHJldmlld3NMaXN0LmFwcGVuZCggcmV2aWV3c0xpc3RJdGVtc1swXSApXHJcbiAgICB9XHJcbiAgICBzZXRTbGlkZXJIZWlnaHQoKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gc2V0U2xpZGVySGVpZ2h0KCl7XHJcbiAgICB2YXIgcmV2aWV3Qm94ID0gJCgnI3Jldmlld3MtYm94XzEnKTtcclxuICAgIHZhciByZXZpZXdzID0gJChyZXZpZXdCb3guZmluZCgnLnJldmlld3MnKVswXSk7XHJcbiAgICB2YXIgY3VycmVudFJldnVlVGV4dEJveCA9ICQocmV2aWV3Qm94LmZpbmQoJy5yZXZpZXctaXRlbV9fdGV4dCcpWzFdKTtcclxuICAgIHZhciBuZXdTbGlkZXJCb3hIZWlnaHQgPSByZXZpZXdzLmhlaWdodCgpICsgY3VycmVudFJldnVlVGV4dEJveC5oZWlnaHQoKTtcclxuICAgIHJldmlld0JveC5oZWlnaHQobmV3U2xpZGVyQm94SGVpZ2h0KTtcclxuICB9XHJcbiAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xyXG4gICAgIHNldFNsaWRlckhlaWdodCgpO1xyXG4gIH0pO1xyXG4gIHNldFNsaWRlckhlaWdodCgpO1xyXG59KSgpO1xyXG5cclxuLy9kcm9wX2Rvd25cclxuKGZ1bmN0aW9uKCl7XHJcbiAgICAvLy5yZXN0cmljdGluZy1ibG9jayAtLSDQutC70LDRgdGBINC00LvRjyDQsdC70L7QutC+0LIg0LIg0LrQvtGC0L7RgNGL0LUg0LHRg9C00YPRgiDRg9Cy0LXQu9C40YfQuNCy0LDRgtGB0Y8g0YLQtdC8INGB0LDQvNGL0Lwg0L/QvtC60LDQt9GL0LLQsNGC0Ywg0L/QvtC70L3QvtGB0YLRjiDQstC10YHRjCDQstC90YPRgtGA0LXQvdC90LjQuSDQsdC70L7QulxyXG4gICAgLy8gLmhpZGRlbi1ibG9jayAtLSDRgtC+0YIg0YHQsNC80YvQuSDQstC90YPRgtGA0LXQvdC90LjQuSDQsdC70L7QuiDQutC+0YLQvtGA0YvQuSDRh9Cw0YHRgtC40YfQvdC+INGB0LrRgNGL0YJcclxuICAgIC8vIC5yZWFkLW1vcmUgLS0g0LrQu9Cw0YEg0LTQu9GPINC60L3QvtC/0LrQuFxyXG4gICAgLy8g0LXQu9C10LzQtdC90YIg0YEg0LrQu9Cw0YHRgdC+0LwgLnJlc3RyaWN0aW5nLWJsb2NrINC4IC5yZWFkLW1vcmUg0LTQvtC70LbQvdGLINC70LXQttCw0YLRjCDQsiDQvtCx0YnQtdC8INGA0L7QtNC40YLQtdC70YzRgdC60L7QvCDQsdC70L7QutC1XHJcbiAgdmFyIHNwZWVkID0gNTAwOyAvL9GB0LrQvtGA0L7RgdGC0Ywg0LDQvdC40LzQsNGG0LjQuFxyXG4gIHZhciBhcnIgPSAkKCcucmVzdHJpY3RpbmctYmxvY2snKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyAvL9GB0L7RhdGA0LDQvdC40Lwg0L3QsNGH0LDQu9GM0L3Ri9C1INCy0YvRgdC+0YLRiyDQstGB0LXRhSDQvdC10L7QsdGF0L7QtNC40LzRi9GFINCx0LvQvtC60L7QslxyXG4gICAgdmFyIGN1cnJlbnQgPSAkKGFycltpXSk7XHJcbiAgICBjdXJyZW50LmF0dHIoJ2RhdGEtaGVpZ2h0JywgY3VycmVudC5oZWlnaHQoKSApO1xyXG4gIH1cclxuICBcclxuICB2YXIgYnV0dG9ucyA9ICQoJy5yZWFkLW1vcmUnKTtcclxuXHJcbiAgYnV0dG9ucy5jbGljayhmdW5jdGlvbihlKXtcclxuICAgIHZhciBjdXJyZW50QnV0dG9uID0gdGhpcztcclxuICAgIHZhciBjdXJyZW50Qm94ID0gJChjdXJyZW50QnV0dG9uKS5wYXJlbnQoKTtcclxuICAgIHZhciByZXN0cmljdGluZ0Jsb2NrID0gJChjdXJyZW50Qm94LmNoaWxkcmVuKCcucmVzdHJpY3RpbmctYmxvY2snKVswXSk7XHJcblxyXG4gICAgaWYgKCAhJChjdXJyZW50QnV0dG9uKS5oYXNDbGFzcygncmVhZC1tb3JlX2ZhbHNlJykgKSB7XHJcbiAgICAgIFxyXG4gICAgICB2YXIgcmVxdWlyZWRIZWlnaHQgPSAkKHJlc3RyaWN0aW5nQmxvY2suY2hpbGRyZW4oJy5oaWRkZW4tYmxvY2snKVswXSkuaGVpZ2h0KCk7XHJcbiAgICAgIFxyXG4gICAgICByZXN0cmljdGluZ0Jsb2NrLmFuaW1hdGUoe2hlaWdodDogcmVxdWlyZWRIZWlnaHR9LCBzcGVlZCk7XHJcbiAgICAgICQoY3VycmVudEJ1dHRvbikuYWRkQ2xhc3MoJ3JlYWQtbW9yZV9mYWxzZScpO1xyXG5cclxuICAgIH1lbHNle1xyXG4gICAgICB2YXIgY3VycmVudEhlaWdodCA9IHJlc3RyaWN0aW5nQmxvY2suYXR0cignZGF0YS1oZWlnaHQnKTtcclxuICAgICAgcmVzdHJpY3RpbmdCbG9jay5hbmltYXRlKHtoZWlnaHQ6IGN1cnJlbnRIZWlnaHR9LCBzcGVlZCk7XHJcbiAgICAgICQoY3VycmVudEJ1dHRvbikucmVtb3ZlQ2xhc3MoJ3JlYWQtbW9yZV9mYWxzZScpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgfSk7XHJcbn0pKClcclxuXHJcbn0pO1xyXG5cclxuLy8gJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZSl7XHJcbi8vICAgaWYgKCAkKGUudGFyZ2V0KS5wYXJlbnRzKCcub3JkZXItZm9ybScpLmxlbmd0aCA+IDAgfHwgJChlLnRhcmdldCkuaGFzQ2xhc3MoJ29yZGVyLWZvcm0nKSApIHtcclxuLy8gICAgICBjb25zb2xlLmxvZygn0J/QvtC/0LDQsicpO1xyXG4vLyAgICAgcmV0dXJuO1xyXG4vLyAgIH1lbHNle1xyXG4vLyAgICAgLy/RiNC+0YHRjCDRgNC+0LHQuNC8XHJcbi8vICAgICBjb25zb2xlLmxvZygn0JzRltC80L4nKTtcclxuLy8gICB9XHJcbi8vIH0pOyJdLCJmaWxlIjoiYXBwLmpzIn0=
