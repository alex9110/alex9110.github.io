'use strict';

$(document).ready(function () {
  $('.slider-offices__list').slick({
    autoplay: true,
    dots: false,
    speed: 2000,
    slidesToShow: 6,
    variableWidth: false,
    autoplaySpeed: 5000, 
    arrows: false,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
  $('.reviews-slider').slick({
    autoplay: true,
    dots: false,
    speed: 2000,
    slidesToShow: 5,
    variableWidth: false,
    autoplaySpeed: 5000, 
    arrows: false,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
  $('.slider-about').slick({
    autoplay: true,
    dots: false,
    speed: 2000,
    slidesToShow: 1,
    variableWidth: false,
    autoplaySpeed: 5000, 
    arrows: false
  });

  //показать скрыть меню
  (function () {
    $('.nav-button').on('click', function(){
      $('.main-nav').toggleClass('show');
      $('.bg-header').toggleClass('bg-resize');
    });
  })();
  
  //замена номера телефона после выбора города в селекте
  (function (){
    var phones = $('.phone'), data = {};

    for (var i = 0; phones.length>i; i++){
      var city =  $(phones[i]).attr('data'), phone = $(phones[i]).text();

      data[city] = phone;
    }

    $('.select-city').on('change ', function(){
      var currentCity = $('.select-city').val().toLowerCase();

      $('.main-phone').text(data[currentCity]); 
    });

  })();
  
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICQoJy5zbGlkZXItb2ZmaWNlc19fbGlzdCcpLnNsaWNrKHtcbiAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICBkb3RzOiBmYWxzZSxcbiAgICBzcGVlZDogMjAwMCxcbiAgICBzbGlkZXNUb1Nob3c6IDYsXG4gICAgdmFyaWFibGVXaWR0aDogZmFsc2UsXG4gICAgYXV0b3BsYXlTcGVlZDogNTAwMCwgXG4gICAgYXJyb3dzOiBmYWxzZSxcbiAgICByZXNwb25zaXZlOiBbXG4gICAgICB7XG4gICAgICAgIGJyZWFrcG9pbnQ6IDExMDAsXG4gICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgc2xpZGVzVG9TaG93OiAzXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcbiAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcbiAgICAgICAgfVxuICAgICAgfVxuICAgIF1cbiAgfSk7XG4gICQoJy5yZXZpZXdzLXNsaWRlcicpLnNsaWNrKHtcbiAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICBkb3RzOiBmYWxzZSxcbiAgICBzcGVlZDogMjAwMCxcbiAgICBzbGlkZXNUb1Nob3c6IDUsXG4gICAgdmFyaWFibGVXaWR0aDogZmFsc2UsXG4gICAgYXV0b3BsYXlTcGVlZDogNTAwMCwgXG4gICAgYXJyb3dzOiBmYWxzZSxcbiAgICByZXNwb25zaXZlOiBbXG4gICAgICB7XG4gICAgICAgIGJyZWFrcG9pbnQ6IDExMDAsXG4gICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgc2xpZGVzVG9TaG93OiAzXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcbiAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcbiAgICAgICAgfVxuICAgICAgfVxuICAgIF1cbiAgfSk7XG4gICQoJy5zbGlkZXItYWJvdXQnKS5zbGljayh7XG4gICAgYXV0b3BsYXk6IHRydWUsXG4gICAgZG90czogZmFsc2UsXG4gICAgc3BlZWQ6IDIwMDAsXG4gICAgc2xpZGVzVG9TaG93OiAxLFxuICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxuICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsIFxuICAgIGFycm93czogZmFsc2VcbiAgfSk7XG5cbiAgLy/Qv9C+0LrQsNC30LDRgtGMINGB0LrRgNGL0YLRjCDQvNC10L3RjlxuICAoZnVuY3Rpb24gKCkge1xuICAgICQoJy5uYXYtYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICQoJy5tYWluLW5hdicpLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XG4gICAgICAkKCcuYmctaGVhZGVyJykudG9nZ2xlQ2xhc3MoJ2JnLXJlc2l6ZScpO1xuICAgIH0pO1xuICB9KSgpO1xuICBcbiAgLy/Qt9Cw0LzQtdC90LAg0L3QvtC80LXRgNCwINGC0LXQu9C10YTQvtC90LAg0L/QvtGB0LvQtSDQstGL0LHQvtGA0LAg0LPQvtGA0L7QtNCwINCyINGB0LXQu9C10LrRgtC1XG4gIChmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGhvbmVzID0gJCgnLnBob25lJyksIGRhdGEgPSB7fTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBwaG9uZXMubGVuZ3RoPmk7IGkrKyl7XG4gICAgICB2YXIgY2l0eSA9ICAkKHBob25lc1tpXSkuYXR0cignZGF0YScpLCBwaG9uZSA9ICQocGhvbmVzW2ldKS50ZXh0KCk7XG5cbiAgICAgIGRhdGFbY2l0eV0gPSBwaG9uZTtcbiAgICB9XG5cbiAgICAkKCcuc2VsZWN0LWNpdHknKS5vbignY2hhbmdlICcsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgY3VycmVudENpdHkgPSAkKCcuc2VsZWN0LWNpdHknKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAkKCcubWFpbi1waG9uZScpLnRleHQoZGF0YVtjdXJyZW50Q2l0eV0pOyBcbiAgICB9KTtcblxuICB9KSgpO1xuICBcbn0pO1xuIl19
