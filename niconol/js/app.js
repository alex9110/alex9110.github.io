$(document).ready(function(){
   // console.log('ready');

  $(".doctor-article2__box-scroll").niceScroll(
    {
      cursorcolor: "#84C336",
      cursorwidth: "6px",
      cursoropacitymin: 0.7,
      // emulatetouch: true,
      cursoropacitymax: 1,
      cursorborderradius: "3px",
      cursorborder: "1px solid #84C336",
      railalign: "left",
      railoffset: true,
      railpadding: { top: 0, right: 3, left: 0, bottom: 0 },
      cursorminheight: 20
    }
  );

//интерактивный состав
  (function(){
    var points = $('.interactive-points__item');
    var compositions = $('.composition__item');

    function change(currentData){
      $(compositions).removeClass('composition__item_active');
      points.removeClass('interactive-points__item_active');
      points.removeClass('interactive-points__item_line');

      $('.interactive-points__item[data-item = '+currentData+']').addClass('interactive-points__item_active');
      $('.composition__item[data-item = '+currentData+']').addClass('composition__item_active');
    }
    points.click(function(){
      var currentData = $(this).attr('data-item');
      change(currentData);
    });
    compositions.click(function(){

      var currentData = $(this).attr('data-item');
      change(currentData);

    })
  })();

//slider rew
  (function(){
    var textContainer = $($('#reviews-slider-text__current-review')[0]);
    var slides = $('.reviews-slider-author__item');
    var photos = $('.reviews-slider-author__photo span');
    var buttonPrewSlide = $('.reviews-slider-button_left');
    var buttonNetSlide = $('.reviews-slider-button_right');

    //меняет слайд
    function changeSlide(){
      var newSlideContent = $($('.reviews-slider-author__item_active .reviews-slider-author__text div')[0]).clone();
      textContainer.html(newSlideContent);
      // console.log(newSlideContent);
    }

    //меняет классы, подготавливает слайдер к изменению слйда
    function changeClass(data, e){

      var currentSlide = $('.reviews-slider-author__item_active');
      var next = (data==='next');
      var nextSlide = (next)? currentSlide.next():currentSlide.prev();

      slides.removeClass('reviews-slider-author__item_active');

      //если кликнуле не по кнопке а по слайду
      if (data === 'slide') {
        $(e.currentTarget).addClass('reviews-slider-author__item_active');;
        changeSlide();
      }else if(data==='next' || data==='prev'){
        if(nextSlide[0]){
          // console.log(nextSlide);
          $(nextSlide).addClass('reviews-slider-author__item_active');
        }else if(next){
          // console.log('дальше пусто');
          $(slides[0]).addClass('reviews-slider-author__item_active');
        }else{
          $(slides[slides.length-1]).addClass('reviews-slider-author__item_active');
        }
      }
      changeSlide();
    }

    buttonPrewSlide.click(function(){changeClass('prev');});
    buttonNetSlide.click(function(){changeClass('next');});
    slides.click(function(e){changeClass('slide', e)})
    changeSlide();
  })();

});


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgLy8gY29uc29sZS5sb2coJ3JlYWR5Jyk7XHJcblxyXG4gICQoXCIuZG9jdG9yLWFydGljbGUyX19ib3gtc2Nyb2xsXCIpLm5pY2VTY3JvbGwoXHJcbiAgICB7XHJcbiAgICAgIGN1cnNvcmNvbG9yOiBcIiM4NEMzMzZcIixcclxuICAgICAgY3Vyc29yd2lkdGg6IFwiNnB4XCIsXHJcbiAgICAgIGN1cnNvcm9wYWNpdHltaW46IDAuNyxcclxuICAgICAgLy8gZW11bGF0ZXRvdWNoOiB0cnVlLFxyXG4gICAgICBjdXJzb3JvcGFjaXR5bWF4OiAxLFxyXG4gICAgICBjdXJzb3Jib3JkZXJyYWRpdXM6IFwiM3B4XCIsXHJcbiAgICAgIGN1cnNvcmJvcmRlcjogXCIxcHggc29saWQgIzg0QzMzNlwiLFxyXG4gICAgICByYWlsYWxpZ246IFwibGVmdFwiLFxyXG4gICAgICByYWlsb2Zmc2V0OiB0cnVlLFxyXG4gICAgICByYWlscGFkZGluZzogeyB0b3A6IDAsIHJpZ2h0OiAzLCBsZWZ0OiAwLCBib3R0b206IDAgfSxcclxuICAgICAgY3Vyc29ybWluaGVpZ2h0OiAyMFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4vL9C40L3RgtC10YDQsNC60YLQuNCy0L3Ri9C5INGB0L7RgdGC0LDQslxyXG4gIChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHBvaW50cyA9ICQoJy5pbnRlcmFjdGl2ZS1wb2ludHNfX2l0ZW0nKTtcclxuICAgIHZhciBjb21wb3NpdGlvbnMgPSAkKCcuY29tcG9zaXRpb25fX2l0ZW0nKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjaGFuZ2UoY3VycmVudERhdGEpe1xyXG4gICAgICAkKGNvbXBvc2l0aW9ucykucmVtb3ZlQ2xhc3MoJ2NvbXBvc2l0aW9uX19pdGVtX2FjdGl2ZScpO1xyXG4gICAgICBwb2ludHMucmVtb3ZlQ2xhc3MoJ2ludGVyYWN0aXZlLXBvaW50c19faXRlbV9hY3RpdmUnKTtcclxuICAgICAgcG9pbnRzLnJlbW92ZUNsYXNzKCdpbnRlcmFjdGl2ZS1wb2ludHNfX2l0ZW1fbGluZScpO1xyXG5cclxuICAgICAgJCgnLmludGVyYWN0aXZlLXBvaW50c19faXRlbVtkYXRhLWl0ZW0gPSAnK2N1cnJlbnREYXRhKyddJykuYWRkQ2xhc3MoJ2ludGVyYWN0aXZlLXBvaW50c19faXRlbV9hY3RpdmUnKTtcclxuICAgICAgJCgnLmNvbXBvc2l0aW9uX19pdGVtW2RhdGEtaXRlbSA9ICcrY3VycmVudERhdGErJ10nKS5hZGRDbGFzcygnY29tcG9zaXRpb25fX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICB9XHJcbiAgICBwb2ludHMuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIGN1cnJlbnREYXRhID0gJCh0aGlzKS5hdHRyKCdkYXRhLWl0ZW0nKTtcclxuICAgICAgY2hhbmdlKGN1cnJlbnREYXRhKTtcclxuICAgIH0pO1xyXG4gICAgY29tcG9zaXRpb25zLmNsaWNrKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICB2YXIgY3VycmVudERhdGEgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaXRlbScpO1xyXG4gICAgICBjaGFuZ2UoY3VycmVudERhdGEpO1xyXG5cclxuICAgIH0pXHJcbiAgfSkoKTtcclxuXHJcbi8vc2xpZGVyIHJld1xyXG4gIChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHRleHRDb250YWluZXIgPSAkKCQoJyNyZXZpZXdzLXNsaWRlci10ZXh0X19jdXJyZW50LXJldmlldycpWzBdKTtcclxuICAgIHZhciBzbGlkZXMgPSAkKCcucmV2aWV3cy1zbGlkZXItYXV0aG9yX19pdGVtJyk7XHJcbiAgICB2YXIgcGhvdG9zID0gJCgnLnJldmlld3Mtc2xpZGVyLWF1dGhvcl9fcGhvdG8gc3BhbicpO1xyXG4gICAgdmFyIGJ1dHRvblByZXdTbGlkZSA9ICQoJy5yZXZpZXdzLXNsaWRlci1idXR0b25fbGVmdCcpO1xyXG4gICAgdmFyIGJ1dHRvbk5ldFNsaWRlID0gJCgnLnJldmlld3Mtc2xpZGVyLWJ1dHRvbl9yaWdodCcpO1xyXG5cclxuICAgIC8v0LzQtdC90Y/QtdGCINGB0LvQsNC50LRcclxuICAgIGZ1bmN0aW9uIGNoYW5nZVNsaWRlKCl7XHJcbiAgICAgIHZhciBuZXdTbGlkZUNvbnRlbnQgPSAkKCQoJy5yZXZpZXdzLXNsaWRlci1hdXRob3JfX2l0ZW1fYWN0aXZlIC5yZXZpZXdzLXNsaWRlci1hdXRob3JfX3RleHQgZGl2JylbMF0pLmNsb25lKCk7XHJcbiAgICAgIHRleHRDb250YWluZXIuaHRtbChuZXdTbGlkZUNvbnRlbnQpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhuZXdTbGlkZUNvbnRlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v0LzQtdC90Y/QtdGCINC60LvQsNGB0YHRiywg0L/QvtC00LPQvtGC0LDQstC70LjQstCw0LXRgiDRgdC70LDQudC00LXRgCDQuiDQuNC30LzQtdC90LXQvdC40Y4g0YHQu9C50LTQsFxyXG4gICAgZnVuY3Rpb24gY2hhbmdlQ2xhc3MoZGF0YSwgZSl7XHJcblxyXG4gICAgICB2YXIgY3VycmVudFNsaWRlID0gJCgnLnJldmlld3Mtc2xpZGVyLWF1dGhvcl9faXRlbV9hY3RpdmUnKTtcclxuICAgICAgdmFyIG5leHQgPSAoZGF0YT09PSduZXh0Jyk7XHJcbiAgICAgIHZhciBuZXh0U2xpZGUgPSAobmV4dCk/IGN1cnJlbnRTbGlkZS5uZXh0KCk6Y3VycmVudFNsaWRlLnByZXYoKTtcclxuXHJcbiAgICAgIHNsaWRlcy5yZW1vdmVDbGFzcygncmV2aWV3cy1zbGlkZXItYXV0aG9yX19pdGVtX2FjdGl2ZScpO1xyXG5cclxuICAgICAgLy/QtdGB0LvQuCDQutC70LjQutC90YPQu9C1INC90LUg0L/QviDQutC90L7Qv9C60LUg0LAg0L/QviDRgdC70LDQudC00YNcclxuICAgICAgaWYgKGRhdGEgPT09ICdzbGlkZScpIHtcclxuICAgICAgICAkKGUuY3VycmVudFRhcmdldCkuYWRkQ2xhc3MoJ3Jldmlld3Mtc2xpZGVyLWF1dGhvcl9faXRlbV9hY3RpdmUnKTs7XHJcbiAgICAgICAgY2hhbmdlU2xpZGUoKTtcclxuICAgICAgfWVsc2UgaWYoZGF0YT09PSduZXh0JyB8fCBkYXRhPT09J3ByZXYnKXtcclxuICAgICAgICBpZihuZXh0U2xpZGVbMF0pe1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2cobmV4dFNsaWRlKTtcclxuICAgICAgICAgICQobmV4dFNsaWRlKS5hZGRDbGFzcygncmV2aWV3cy1zbGlkZXItYXV0aG9yX19pdGVtX2FjdGl2ZScpO1xyXG4gICAgICAgIH1lbHNlIGlmKG5leHQpe1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ9C00LDQu9GM0YjQtSDQv9GD0YHRgtC+Jyk7XHJcbiAgICAgICAgICAkKHNsaWRlc1swXSkuYWRkQ2xhc3MoJ3Jldmlld3Mtc2xpZGVyLWF1dGhvcl9faXRlbV9hY3RpdmUnKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICQoc2xpZGVzW3NsaWRlcy5sZW5ndGgtMV0pLmFkZENsYXNzKCdyZXZpZXdzLXNsaWRlci1hdXRob3JfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNoYW5nZVNsaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYnV0dG9uUHJld1NsaWRlLmNsaWNrKGZ1bmN0aW9uKCl7Y2hhbmdlQ2xhc3MoJ3ByZXYnKTt9KTtcclxuICAgIGJ1dHRvbk5ldFNsaWRlLmNsaWNrKGZ1bmN0aW9uKCl7Y2hhbmdlQ2xhc3MoJ25leHQnKTt9KTtcclxuICAgIHNsaWRlcy5jbGljayhmdW5jdGlvbihlKXtjaGFuZ2VDbGFzcygnc2xpZGUnLCBlKX0pXHJcbiAgICBjaGFuZ2VTbGlkZSgpO1xyXG4gIH0pKCk7XHJcblxyXG59KTtcclxuXHJcbiJdLCJmaWxlIjoiYXBwLmpzIn0=
