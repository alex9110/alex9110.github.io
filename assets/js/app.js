(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
$(document).ready(function () {

  require('./modules/slider.js')();
  require('./modules/blog_page/blog.js')();
  require('./modules/show_hide_menu.js')();
  require('./modules/paralax.js')();
  require('./modules/communication_form.js')();
  require('./modules/admin_scripts/login_form.js')();
  require('./modules/admin_scripts/admin_menu.js')();
  require('./modules/admin_scripts/admin_form_processing.js')();
  require('./modules/preloader.js')();


// плавный скрол
  $('a[href^="#"]').click(function(){
    var elementClick = $(this).attr('href');
    var destination = $(elementClick).offset().top;  //узнаем место назначения 
    $('html, body').animate({scrollTop: destination}, 1000);  //двигаем к ниму
    return false;                     
  });


//перевернуть плашку
  $('#to-main-but, #authorization-button').on('click',function(){
    $('#plate').toggleClass('plate-front');
  });


//skills persent
  (function(){
    var
      target = $('.my-skills-box-ceenter'),
      windowHeigth = $(window).height();

    if(target.length > 0) {
      var
        skills = $('.my-skills__item'),
        data;

      target = target.offset().top;
      $(window).on('scroll', function(){
        var winScrollTop = $(window).scrollTop();
        if (winScrollTop+windowHeigth/10*7 > target) {
          skills.each(function(){
            var $this = $(this);
            data = $this.attr('data-skill');
            if (data == 0) {data = 1;}
            data =  parseInt( 722*(data/100) );
            $this.find('.sector').css({'stroke-dasharray':data+' 722'});
          });
        }
      });
    }
  })();


//pop_up
  window.hm = {};
  window.hm.popUp = function popUp(message, time){
    if (time == undefined) {time = 5000;}
    $('#pop_up-content').html(message);
    $('#pop_up').addClass('show');
    setTimeout(function(){
      $('#pop_up').removeClass('show');
    }, time);
  };

  (function(){
    $('#pop_up-button').on('click', function(){
      $('#pop_up').removeClass('show');
    });
  })();


//удалик фрейм с картой на мобильных
  if ($(window).width() <= 416) {
    $('.section-contacts iframe').remove();
  }


/*
берёт данные с формы полученой в качестве параметра и сформируем двух 
уровевый массив дднных для дальнейшей обработки или отправки на сервер
*/
  window.hm.getData = function getData(form){
    var
      formId = form.attr('id'),
      inputs = form.find('input, textarea'),
      data = [['formId', formId]];
    inputs.each(function(){
      var that = $(this), curentData = [that.attr('id'), that.val().trim()];
      data[data.length] = curentData;
    });
    return data;
  };


});
},{"./modules/admin_scripts/admin_form_processing.js":2,"./modules/admin_scripts/admin_menu.js":3,"./modules/admin_scripts/login_form.js":4,"./modules/blog_page/blog.js":5,"./modules/communication_form.js":6,"./modules/paralax.js":7,"./modules/preloader.js":8,"./modules/show_hide_menu.js":9,"./modules/slider.js":10}],2:[function(require,module,exports){
module.exports = function(){
  if ($('.admin-form').length < 1){return;}
  //изменим цвет popUp для админки
  $('#pop_up').css({'background-color':'#00A78E'});
  var
    formAboutMe = $('#admin-about-me'),
    formBlog = $('#admin-blog'),
    formWorks = $('#admin-works');  
  //проверяем вводится ли в input число если нет чистим его
  formAboutMe.find('input').on('input', function(){
    var value = parseInt( $(this).val() );
    if ( isNaN(value) ) {$(this).val('');}
  });
  
  formAboutMe.find('#admin-about-me__save').on('click', function(){
    var errors = [];
    if (errors.length<1) {
      window.hm.popUp('сохранено', 1500);
    }else{window.hm.popUp(errors);}
    var data = window.hm.getData(formAboutMe);

    console.log(data);
  });
  formBlog.find('#admin-blog__save').on('click', function(){
    var errors = [];
    if (errors.length<1) {
      window.hm.popUp('сохранено', 1500);
    }else{window.hm.popUp(errors);}
    var data = window.hm.getData(formBlog);

    console.log(data);
  });
  formWorks.find('#admin-works__save').on('click', function(){
    var errors = [];
    if (errors.length<1) {
      window.hm.popUp('сохранено', 1500);
    }else{window.hm.popUp(errors);}
    var data = window.hm.getData(formWorks);

    console.log(data);

  });
};
},{}],3:[function(require,module,exports){
module.exports =  function(){
  var 
    adminForms = $('.admin-form'),
    menList = $('.admin-nav__item');

  menList.click(function(){
    var that = this;
    if ($(that).hasClass('active')) {
      return;
    }else{
      $(that).siblings().removeClass('active');
      $(that).addClass('active');
      showForm();
    }
  });
 
  function showForm(){
    var count = 0;
    //функцыя покажет нужную форму и скроет не нужную решения принимаеться на основе активного елемента меню
    menList.each(function(){
      var that = this;
      if ( $(that).hasClass('active') ) {
        $(adminForms[count]).css('display', 'block');
      }else{
        $(adminForms[count]).css('display', 'none');
      }
      count++;  
    });
  }
  adminForms.css('display', 'none');
  showForm();
  
};
},{}],4:[function(require,module,exports){
module.exports = function(){
  var loginData = {};
  $('#login-nav__enter').on('click', function(){
    var
      loginForm = $('#login-form'),
      errors = [];

    loginData.login = loginForm.find('#login').val().trim(),
    loginData.pass = loginForm.find('#password').val().trim(),
    loginData.human = loginForm.find('#loginform_check').prop('checked'),
    loginData.exactlyHuman = loginForm.find('#radio_yes').prop('checked');
      
    for(var property in loginData){
      var propLalue = loginData[property];
      if ( propLalue === false || propLalue === true) {
        //значет это чекбоксы
        if (propLalue == false) {
          errors[1] = 'Пожоже что вы робот!<br>';
        }
      }else{
        //значет это строки
        var strLength = propLalue.length;
        if (strLength < 4 || strLength > 14) {
          errors[0] = 'Длинна логина и пароля должна быть от 4 до 14 символов!<br>';
        }
      }
    }
    if (errors.length > 0) {
      var message = '';
      errors.forEach(function(item){
        message += (item) ? item+'\n':' ';
        //console.log(item);
      });
      window.hm.popUp(message);
      return false;
    }
    //дале работа за сервером
  });
};
},{}],5:[function(require,module,exports){
module.exports = function(){
  var
    not_fixed = true,
    arrow_none = true,
    target = $('#section-articles'),
    articles = $('.article'),
    asideItem = $('.blog_aside__item'),
    asideList = $('.blog_aside__list'),
    aside = $('.blog_aside'),
    asideLoistButton = asideList.find('#blog_aside__list_button'),
    winHeight = $(window).height(),
    winScrollTop = '';
    
  if (target.length > 0) {
    $(window).on('scroll', function(){
      winScrollTop = $(window).scrollTop();
      fixet_nav();
      inWindow(articles, asideItem);
      showArrow();
    });
  }
  //позыцыонирование навигации
  function fixet_nav(){
   
    var targetPos = target.offset().top;

    if(winScrollTop >= targetPos && not_fixed){
      var top = $(asideList).position().top;
      var left = $(asideList).offset().left;
      $(asideList).css({'position':'fixed', 'top': top+'px', 'left': left+'px'});
      not_fixed = false;
    }else if(winScrollTop < targetPos && !not_fixed) {
      $(asideList).css({'position':'static'});
      not_fixed = true;
    }
  }
  ///////////////////gпоказать скрыть боковое меню/////////////////////////////
  asideLoistButton.click(function(){
    var left = parseInt( aside.css('left') );
    if (left<0) {
      asideList.css({'left':'0px'});
      aside.css({'left': '0'});
    }else{
      asideList.css({'left':'-300px'});
      aside.css({'left': '-300px'});
    }
  });
  ///////////////////gпоказать скрыть боковое меню/////////////////////////////

  //показать скрыть стрелку вверх
  function showArrow(){
    if (winHeight <= winScrollTop && arrow_none) {
      $('.arrow-top').css({'display':'block'});
      arrow_none = false;
    }
    else if(winHeight > winScrollTop && !arrow_none){
      $('.arrow-top').css({'display':'none'});
      arrow_none = true;
    }
  }
  //покрасит елемент навигационного меню который сответствует текущей стати
  var savedIndexNumber = 0, currentIndexNumber = 0;
  function inWindow(articles, asideItem){
    var
      indent = parseInt( $(articles[0]).css('margin-bottom') ),
      currentEls = $(articles),
      result = [],
      offsetTop;

    currentEls.each(function(){
      var element = $(this);
      offsetTop = element.offset().top;
      offsetTop = parseInt(offsetTop);
      if( winScrollTop+indent*2 > offsetTop ){
        result.push(this);
        currentIndexNumber = result.length - 1;
      }
    });
    if ( savedIndexNumber !== currentIndexNumber) {
      savedIndexNumber = currentIndexNumber;
      $(asideItem).removeClass('active');
      $(asideItem[currentIndexNumber]).addClass('active');
    }
  }
};
},{}],6:[function(require,module,exports){
module.exports = function(){
  //очистка формы, параметр форма в виде jquery обьект
  function clear(form){
    var inputs = form.find('input, textarea');

    inputs.each(function(){
      $(this).val('');
    });
  }
  
  var formBox = $('#contact-form-box');
  if (formBox.length < 1) {return;}
  var
    form = formBox.find('#contact-form'),
    buttons = formBox.find('.contact-form__buttons');

  buttons.on('click', function(evt){
    if ( $(evt.target).attr('id') === 'send-message' ) {
      var data = window.hm.getData(form);
      //пройдемся по импутам но пропустим id текущей формы
      var
        errors = [],
        mail = '';
      for(var i=1; i<data.length; i++){
        var
          currenId = data[i][0],
          currentData = data[i][1];

        if (currenId == 'mail') {mail = currentData;}

        if (currentData.length < 1) {
          var massege = [ ['name','Имя'], ['mail', 'Email'], ['message', 'Сообщение'] ];
          var currenInput = '';
          //посмотрим ссобщения с от имени какого поля нужно вывести
          massege.forEach(function(element){
            if (currenId === element[0]) {currenInput = element[1];}
          });
          errors[errors.length] = currenInput+' не может быть пустым! <br>';
        }
      }
      var r = /^\w+@\w+\.\w{2,4}$/i;
      if (errors.length < 1 && !r.test(mail) ){
        errors[errors.length] = 'Не коректный e-mail!';
      }
      if (errors.length < 1) {
        var answer = true;
        //если оштбок нет отравим запрос на сервер

        //если от сервера прийдет положительный ответ
        if (answer === true) {
          window.hm.popUp('УСПЕШНО ОТПРАВЛЕНО!', 3000);
          clear(form);
        }

      }else{window.hm.popUp(errors);}
      
    }else if($(evt.target).attr('id') === 'reset'){
      clear(form);
    }
  });
};
},{}],7:[function(require,module,exports){
module.exports = function () {
  var
    layer = $('.parallax').find('.parallax__layer'),
    layerScroll = $('.parallax_scroll').find('.parallax__layer');
  $(window).on('mousemove', function (e) { 
    var
      mouse_dx = (e.pageX), // Узнаем положение мышки по X
      mouse_dy = (e.pageY), // Узнаем положение мышки по Y
      w = (window.innerWidth / 2) - mouse_dx, // Вычисляем для x перемещения
      h = (window.innerHeight / 2) - mouse_dy; // Вычисляем для y перемещения

    layer.map(function (key, value) {
      var
        widthPosition = w * (key / 100), // Вычисляем коофицент смешения по X
        heightPosition = h * (key / 100); // Вычисляем коофицент смешения по Y

      $(value).css({
        'transform': 'translate3d(' + widthPosition + 'px, ' + heightPosition + 'px, 0)'
      });
    });
  });
  var windowHeigth = $(window).height();
  $(window).on('scroll', function(){
    var winScrollTop = $(window).scrollTop();
    if (windowHeigth > winScrollTop) {
      layerScroll.map(function (key, value){
        var bias = winScrollTop * (key/20);
        $(value).css({
          'transform': 'translate3d(0, ' + -bias +'px, 0)'
        });
      });
    } else{return;}
  });
};  
},{}],8:[function(require,module,exports){
module.exports = function () {
  $('.about-wrapper, .blog-wrapper, .index-wrapper, .works-wrapper, .admin-wrapper').css({'display':'none'});
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
    image.load(function () {
      setPercents(imgs.length, percents);
      percents++;
    });
    image.error(function () {
      setPercents(imgs.length, percents);
      percents++;
    });
  }
  //ЕСЛИ КАРТИНОК НЕТ 
  if(imgs.length === 0){
    setPercents(1,1);
  }
  function setPercents(total, current) {
    var percent = Math.ceil(current / total * 100);
    if (percent >= 100) {
      $('.about-wrapper, .blog-wrapper, .index-wrapper, .works-wrapper, .admin-wrapper').css({'display':'block'});
      $('.plate-front').addClass('animate_plate');
      $('.loader-wrapper').fadeOut(1500, function(){
        setTimeout(function(){
          $('.plate-front').removeClass('animate_plate');
        }, 2000);
      });
    }
    $('.loader__percent').text(percent + '%');
  }
};
},{}],9:[function(require,module,exports){
module.exports = function(){
  var
    transition = 300,
    menuButton = $('#menu-button');

  menuButton.click(function(){
    var close = $('.curtain-left').hasClass('closeCurtainsL');
    if(close){
      close_menu();
    }else{
      show_menu();
    }
  });
  function close_menu(){
    menuButton.removeClass('menu-button-close');
    $('.curtain-left, .curtain-right, #main-nav').css({'opacity':0});
    setTimeout(function(){
      $('.curtain-left').removeClass('closeCurtainsL');
      $('.curtain-right').removeClass('closeCurtainsR');
      $('#main-nav').removeClass('block');
      setTimeout(function(){
        $('.curtain-left, .curtain-right, #main-nav').css({'opacity':1});
      }, transition); 
    }, transition);
  }
  var
    arr = $('.main-nav-list-item'),
    arr_length = arr.length;

  function show_menu(){
    menuButton.addClass('menu-button-close');
    $(arr).find('a').css({'transform': 'scale(0)', 'transition-duration':transition+'ms'});
    var current = 0;
    $('.curtain-left').addClass('closeCurtainsL');
    $('.curtain-right').addClass('closeCurtainsR');
    setTimeout(function(){
      $('#main-nav').addClass('block');
      var timerId = setInterval(function(){
        var a = $(arr[current]).find('a');
        a.css({'transform':'scale(1)'});
        if (current >= arr_length-1) {
          clearTimeout(timerId);
        }
        current++;
      }, transition/2); 

    }, transition);
  }
}
},{}],10:[function(require,module,exports){
//анимирования текста в слайдере
module.exports = function(){
  var timeout = 600;
  (function(){
    var
      descriptions = $('.slider__image-description'),
      titles = descriptions.find('h2'),
      technologists = descriptions.find('p');
      //функция подготовит текст к анимации порубает на отдельные буквы все что надо
    function fraction(e){
      e.forEach(function(item){
        item.each(function(){
          var
            that = $(this),
            string = that.text();
          that.html(string.replace(/./g, '<span class="letter">$&</span>'));
          //присвоем каждой букве необходимую задержку перед анимацией
          var
            letters = that.find('span'),
            dealy = 0;
          letters.each(function(){
            var
              that = $(this),
              leterLength = letters.length;
            that.css({'animation-delay':dealy+'ms'});
            dealy += parseInt(timeout / leterLength, 10);
          });
        });
      }); 
      return;
    }
    fraction([titles, technologists]);
  })();
  
  function textAnimate(that){
    var
      letterList = that.find('.letter'),
      listLength = letterList.length,
      i = 0;

    (function showLetter(){
      var currentLetter = $(letterList[i]).html();
     //если это пробел зададим ему фиксированную ширину иначе потом он сплющиться 
      if (currentLetter === ' ') {
        var letterWidth = $(letterList[i]).width();
      //если ширина пробела = 0, значит это конец строки и нужно вставить елемент переноса строки
        if (letterWidth == 0) {
          $(letterList[i]).after('<br>');
        }
        $(letterList[i]).width(letterWidth);
      }
      i++;
      (function(){
        if (i < listLength) {
          showLetter();
        }else{
          letterList.addClass('showLetter');
        }
      })();
    })();
  }
//конец анимирования текста в слайдере

//смена изображений и описания в слайдере
  (function(){
    $('.slider__bottom-preview li, .slider__top-preview li, .slider__images-list').css({'transition-duration':timeout+'ms'});
    $('.slider__images-list').css({ 'transition-duration':timeout/2+'ms'});
    var buttons = $('.slider__buttons-bottom, .slider__buttons-top');
    buttons.on('click', function(evt){
      callSlider(evt);
    });
    function callSlider(evt){
      //удалим обработчик
      buttons.off();
      setTimeout(function(){
        //вернём обработчик
        buttons.on('click', function(evt){callSlider(evt);});
      },timeout*1.5);
      slider(evt);
    }
    function changeDescription(i){
      var
        desc = $('.slider__image-description').clone(),
        title = $(desc[i]).find('h2').addClass('animateText'),
        technologies = $(desc[i]).find('p').addClass('animateText'),
        link = $(desc[i]).find('a');

      $('.work-description__title h2').replaceWith(title);
      $('.work-description__technologies p').replaceWith(technologies);
      $('.work-description__botton a').replaceWith(link);
      textAnimate($('.animateText'));
    }
    //уставим описание текущей работы
    changeDescription(0);
    var imageList  = $('.slider__images-list');
    function slider(evt){
      var images, arrLenght, botton, prev, prevLeft, prevRight, prev1Left,prev2Left,
        prev1Right, prev2Right, currentLeftLi, nextLeftLi, currentRightLi, nextRightLi;

      images     = imageList.find('li');
      arrLenght  = images.length;
      botton     = $(evt.currentTarget).attr('class');
      prev       = $('.slider__buttons');
      prevLeft   = prev.find('.slider__bottom-preview li');
      prevRight  = prev.find('.slider__top-preview li');
      prev1Left  = $(prevLeft[1]);
      prev2Left  = $(prevLeft[0]);
      prev1Right = $(prevRight[1]);
      prev2Right = $(prevRight[0]);
        
      //узнаем текущий и следующий елементы превьюх, текущий тот что видим, а следующийелемент тот что пока что скрыт 
      if (prev1Left.position().top > prev2Left.position().top) {
        currentLeftLi = prev1Left;
        nextLeftLi = prev2Left;
      }else{
        currentLeftLi = prev2Left;
        nextLeftLi = prev1Left;
      }
      //Следующий елемент с лева значение по умолчанию
      nextLeftLi = newSrc(nextLeftLi, images[arrLenght-2]);
      //если нажал кнопку назад она же в низ
      function back(){
        setTimeout(function(){
          //перекинем изображение с кона в начало
          imageList.prepend(images[arrLenght-1]);
          imageList.toggleClass('opacity');
        }, timeout/2);
        changePreview(currentLeftLi, nextLeftLi, 'bottom', images[arrLenght-3]);
      }
      //узнаем текущий и следующий елементы превьюх, текущий тот что видим, а следу
      //узнаем текущий и следующий елементы превьюх, текущий тот который на виду, а следующийелемент тот что пока что скрыт
      if (prev1Right.position().top < prev2Right.position().top) {
        currentRightLi = prev1Right;
        nextRightLi = prev2Right;
      }else{
        currentRightLi = prev2Right;
        nextRightLi = prev1Right;
      }
      //Следующий елемент с права значение по умолчанию
      nextRightLi = newSrc(nextRightLi, images[2]);
      //если нажал впеёд она же вверх
      function forward(){
        setTimeout(function(){
          //перекинем изображение с начала в конец
          imageList.append(images[0]);
          imageList.toggleClass('opacity');
        }, timeout/2);
        changePreview(currentRightLi, nextRightLi, 'top', images[3]);
      }   
  //меняем главное изображение
      function changeMainImage(){
        imageList.toggleClass('opacity');
        if (botton == 'slider__buttons-bottom') {
          back();
          changeDescription(arrLenght-1);
        }else{
          forward();
          changeDescription(1);
        } 
      }  
  //меням превюху параметры: текущая ли, следующая та на которую сечас заменется текущая, направление движения анимацыи,
  //новая ли тоесть с новым изображением и возможно описанием она заменет ту ли которую мы сдвиним из зоны видимости
      function changePreview(currentLi, nextLi, direction, newLi){  
        if (direction == 'bottom') {
          move('bot');
          prewBack('left');
           // кликнули по левой кнопке значит меняем значения по умолчанию для следующиго елемента правой кнопке
          nextRightLi = newSrc(nextRightLi, images[0]);
          move('top', currentRightLi, nextRightLi);
          prewBack('right', currentRightLi);
        }
        if (direction == 'top') {
          move('top');
          prewBack('right');
          // кликнули по правой кнопке значит меняем значения по умолчанию для следующиго елемента на левой кнопке
          nextLeftLi = newSrc(nextLeftLi, images[0]);
          move('bot', currentLeftLi, nextLeftLi);
          prewBack('left', currentLeftLi);
        }
        //возврвщает скрытое превю на стартовою позицыю, параметры какое превью левое или правое, и не обезательный текущийэлемнт
        function prewBack(prev, currentElement){
          if (currentElement === undefined) {
            currentElement = currentLi;
          }
          setTimeout( function(){
            if (prev == 'left') {
              currentElement = newSrc(currentElement, newLi);
              currentElement.css({'transition-duration':'0ms', 'transform':'translateY(0)'});
            }else if (prev == 'right') {
              currentElement = newSrc(currentElement, newLi);
              currentElement.css({'transition-duration':'0ms', 'transform':'translateY(100%)'});
            }
          }, timeout);
        }
        function move(direction, currentElement, nextElement){
          if (currentElement === undefined || nextElement === undefined) {
            currentElement = currentLi;
            nextElement = nextLi;
          }
          nextElement.css({'transition-duration':timeout+'ms'});
          if (direction == 'bot') {
            currentElement.css({'transform':'translateY(200%)'});
            nextElement.css({'transform':'translateY(100%)'});
          }else if(direction == 'top'){
            currentElement.css({'transform':'translateY(-100%)'});
            nextElement.css({'transform':'translateY(0)'});  
          } 
        }
      }
  //функция меняет катринку и h1 в li элементте
      function newSrc(oldLi, newLi){
        var
          tmpSrc = $(newLi).find('img').attr('src'),
          tmpH1 = $(newLi).find('h1').html();
        //заменим адрес к картинке
        oldLi.find('img').attr({'src':tmpSrc});
        //заменим контент в h1
        oldLi.find('h1').html(tmpH1);
        return oldLi;
      }
      changeMainImage();
    }
  })();
};
},{}]},{},[1]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gIHJlcXVpcmUoJy4vbW9kdWxlcy9zbGlkZXIuanMnKSgpO1xuICByZXF1aXJlKCcuL21vZHVsZXMvYmxvZ19wYWdlL2Jsb2cuanMnKSgpO1xuICByZXF1aXJlKCcuL21vZHVsZXMvc2hvd19oaWRlX21lbnUuanMnKSgpO1xuICByZXF1aXJlKCcuL21vZHVsZXMvcGFyYWxheC5qcycpKCk7XG4gIHJlcXVpcmUoJy4vbW9kdWxlcy9jb21tdW5pY2F0aW9uX2Zvcm0uanMnKSgpO1xuICByZXF1aXJlKCcuL21vZHVsZXMvYWRtaW5fc2NyaXB0cy9sb2dpbl9mb3JtLmpzJykoKTtcbiAgcmVxdWlyZSgnLi9tb2R1bGVzL2FkbWluX3NjcmlwdHMvYWRtaW5fbWVudS5qcycpKCk7XG4gIHJlcXVpcmUoJy4vbW9kdWxlcy9hZG1pbl9zY3JpcHRzL2FkbWluX2Zvcm1fcHJvY2Vzc2luZy5qcycpKCk7XG4gIHJlcXVpcmUoJy4vbW9kdWxlcy9wcmVsb2FkZXIuanMnKSgpO1xuXG5cbi8vINC/0LvQsNCy0L3Ri9C5INGB0LrRgNC+0LtcbiAgJCgnYVtocmVmXj1cIiNcIl0nKS5jbGljayhmdW5jdGlvbigpe1xuICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICB2YXIgZGVzdGluYXRpb24gPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wOyAgLy/Rg9C30L3QsNC10Lwg0LzQtdGB0YLQviDQvdCw0LfQvdCw0YfQtdC90LjRjyBcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBkZXN0aW5hdGlvbn0sIDEwMDApOyAgLy/QtNCy0LjQs9Cw0LXQvCDQuiDQvdC40LzRg1xuICAgIHJldHVybiBmYWxzZTsgICAgICAgICAgICAgICAgICAgICBcbiAgfSk7XG5cblxuLy/Qv9C10YDQtdCy0LXRgNC90YPRgtGMINC/0LvQsNGI0LrRg1xuICAkKCcjdG8tbWFpbi1idXQsICNhdXRob3JpemF0aW9uLWJ1dHRvbicpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAkKCcjcGxhdGUnKS50b2dnbGVDbGFzcygncGxhdGUtZnJvbnQnKTtcbiAgfSk7XG5cblxuLy9za2lsbHMgcGVyc2VudFxuICAoZnVuY3Rpb24oKXtcbiAgICB2YXJcbiAgICAgIHRhcmdldCA9ICQoJy5teS1za2lsbHMtYm94LWNlZW50ZXInKSxcbiAgICAgIHdpbmRvd0hlaWd0aCA9ICQod2luZG93KS5oZWlnaHQoKTtcblxuICAgIGlmKHRhcmdldC5sZW5ndGggPiAwKSB7XG4gICAgICB2YXJcbiAgICAgICAgc2tpbGxzID0gJCgnLm15LXNraWxsc19faXRlbScpLFxuICAgICAgICBkYXRhO1xuXG4gICAgICB0YXJnZXQgPSB0YXJnZXQub2Zmc2V0KCkudG9wO1xuICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd2luU2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICBpZiAod2luU2Nyb2xsVG9wK3dpbmRvd0hlaWd0aC8xMCo3ID4gdGFyZ2V0KSB7XG4gICAgICAgICAgc2tpbGxzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICBkYXRhID0gJHRoaXMuYXR0cignZGF0YS1za2lsbCcpO1xuICAgICAgICAgICAgaWYgKGRhdGEgPT0gMCkge2RhdGEgPSAxO31cbiAgICAgICAgICAgIGRhdGEgPSAgcGFyc2VJbnQoIDcyMiooZGF0YS8xMDApICk7XG4gICAgICAgICAgICAkdGhpcy5maW5kKCcuc2VjdG9yJykuY3NzKHsnc3Ryb2tlLWRhc2hhcnJheSc6ZGF0YSsnIDcyMid9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KSgpO1xuXG5cbi8vcG9wX3VwXG4gIHdpbmRvdy5obSA9IHt9O1xuICB3aW5kb3cuaG0ucG9wVXAgPSBmdW5jdGlvbiBwb3BVcChtZXNzYWdlLCB0aW1lKXtcbiAgICBpZiAodGltZSA9PSB1bmRlZmluZWQpIHt0aW1lID0gNTAwMDt9XG4gICAgJCgnI3BvcF91cC1jb250ZW50JykuaHRtbChtZXNzYWdlKTtcbiAgICAkKCcjcG9wX3VwJykuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAkKCcjcG9wX3VwJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgICB9LCB0aW1lKTtcbiAgfTtcblxuICAoZnVuY3Rpb24oKXtcbiAgICAkKCcjcG9wX3VwLWJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAkKCcjcG9wX3VwJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgICB9KTtcbiAgfSkoKTtcblxuXG4vL9GD0LTQsNC70LjQuiDRhNGA0LXQudC8INGBINC60LDRgNGC0L7QuSDQvdCwINC80L7QsdC40LvRjNC90YvRhVxuICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDE2KSB7XG4gICAgJCgnLnNlY3Rpb24tY29udGFjdHMgaWZyYW1lJykucmVtb3ZlKCk7XG4gIH1cblxuXG4vKlxu0LHQtdGA0ZHRgiDQtNCw0L3QvdGL0LUg0YEg0YTQvtGA0LzRiyDQv9C+0LvRg9GH0LXQvdC+0Lkg0LIg0LrQsNGH0LXRgdGC0LLQtSDQv9Cw0YDQsNC80LXRgtGA0LAg0Lgg0YHRhNC+0YDQvNC40YDRg9C10Lwg0LTQstGD0YUgXG7Rg9GA0L7QstC10LLRi9C5INC80LDRgdGB0LjQsiDQtNC00L3QvdGL0YUg0LTQu9GPINC00LDQu9GM0L3QtdC50YjQtdC5INC+0LHRgNCw0LHQvtGC0LrQuCDQuNC70Lgg0L7RgtC/0YDQsNCy0LrQuCDQvdCwINGB0LXRgNCy0LXRgFxuKi9cbiAgd2luZG93LmhtLmdldERhdGEgPSBmdW5jdGlvbiBnZXREYXRhKGZvcm0pe1xuICAgIHZhclxuICAgICAgZm9ybUlkID0gZm9ybS5hdHRyKCdpZCcpLFxuICAgICAgaW5wdXRzID0gZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEnKSxcbiAgICAgIGRhdGEgPSBbWydmb3JtSWQnLCBmb3JtSWRdXTtcbiAgICBpbnB1dHMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgdmFyIHRoYXQgPSAkKHRoaXMpLCBjdXJlbnREYXRhID0gW3RoYXQuYXR0cignaWQnKSwgdGhhdC52YWwoKS50cmltKCldO1xuICAgICAgZGF0YVtkYXRhLmxlbmd0aF0gPSBjdXJlbnREYXRhO1xuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG5cbn0pO1xufSx7XCIuL21vZHVsZXMvYWRtaW5fc2NyaXB0cy9hZG1pbl9mb3JtX3Byb2Nlc3NpbmcuanNcIjoyLFwiLi9tb2R1bGVzL2FkbWluX3NjcmlwdHMvYWRtaW5fbWVudS5qc1wiOjMsXCIuL21vZHVsZXMvYWRtaW5fc2NyaXB0cy9sb2dpbl9mb3JtLmpzXCI6NCxcIi4vbW9kdWxlcy9ibG9nX3BhZ2UvYmxvZy5qc1wiOjUsXCIuL21vZHVsZXMvY29tbXVuaWNhdGlvbl9mb3JtLmpzXCI6NixcIi4vbW9kdWxlcy9wYXJhbGF4LmpzXCI6NyxcIi4vbW9kdWxlcy9wcmVsb2FkZXIuanNcIjo4LFwiLi9tb2R1bGVzL3Nob3dfaGlkZV9tZW51LmpzXCI6OSxcIi4vbW9kdWxlcy9zbGlkZXIuanNcIjoxMH1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xyXG4gIGlmICgkKCcuYWRtaW4tZm9ybScpLmxlbmd0aCA8IDEpe3JldHVybjt9XHJcbiAgLy/QuNC30LzQtdC90LjQvCDRhtCy0LXRgiBwb3BVcCDQtNC70Y8g0LDQtNC80LjQvdC60LhcclxuICAkKCcjcG9wX3VwJykuY3NzKHsnYmFja2dyb3VuZC1jb2xvcic6JyMwMEE3OEUnfSk7XHJcbiAgdmFyXHJcbiAgICBmb3JtQWJvdXRNZSA9ICQoJyNhZG1pbi1hYm91dC1tZScpLFxyXG4gICAgZm9ybUJsb2cgPSAkKCcjYWRtaW4tYmxvZycpLFxyXG4gICAgZm9ybVdvcmtzID0gJCgnI2FkbWluLXdvcmtzJyk7ICBcclxuICAvL9C/0YDQvtCy0LXRgNGP0LXQvCDQstCy0L7QtNC40YLRgdGPINC70Lgg0LIgaW5wdXQg0YfQuNGB0LvQviDQtdGB0LvQuCDQvdC10YIg0YfQuNGB0YLQuNC8INC10LPQvlxyXG4gIGZvcm1BYm91dE1lLmZpbmQoJ2lucHV0Jykub24oJ2lucHV0JywgZnVuY3Rpb24oKXtcclxuICAgIHZhciB2YWx1ZSA9IHBhcnNlSW50KCAkKHRoaXMpLnZhbCgpICk7XHJcbiAgICBpZiAoIGlzTmFOKHZhbHVlKSApIHskKHRoaXMpLnZhbCgnJyk7fVxyXG4gIH0pO1xyXG4gIFxyXG4gIGZvcm1BYm91dE1lLmZpbmQoJyNhZG1pbi1hYm91dC1tZV9fc2F2ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgZXJyb3JzID0gW107XHJcbiAgICBpZiAoZXJyb3JzLmxlbmd0aDwxKSB7XHJcbiAgICAgIHdpbmRvdy5obS5wb3BVcCgn0YHQvtGF0YDQsNC90LXQvdC+JywgMTUwMCk7XHJcbiAgICB9ZWxzZXt3aW5kb3cuaG0ucG9wVXAoZXJyb3JzKTt9XHJcbiAgICB2YXIgZGF0YSA9IHdpbmRvdy5obS5nZXREYXRhKGZvcm1BYm91dE1lKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICB9KTtcclxuICBmb3JtQmxvZy5maW5kKCcjYWRtaW4tYmxvZ19fc2F2ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgZXJyb3JzID0gW107XHJcbiAgICBpZiAoZXJyb3JzLmxlbmd0aDwxKSB7XHJcbiAgICAgIHdpbmRvdy5obS5wb3BVcCgn0YHQvtGF0YDQsNC90LXQvdC+JywgMTUwMCk7XHJcbiAgICB9ZWxzZXt3aW5kb3cuaG0ucG9wVXAoZXJyb3JzKTt9XHJcbiAgICB2YXIgZGF0YSA9IHdpbmRvdy5obS5nZXREYXRhKGZvcm1CbG9nKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICB9KTtcclxuICBmb3JtV29ya3MuZmluZCgnI2FkbWluLXdvcmtzX19zYXZlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIHZhciBlcnJvcnMgPSBbXTtcclxuICAgIGlmIChlcnJvcnMubGVuZ3RoPDEpIHtcclxuICAgICAgd2luZG93LmhtLnBvcFVwKCfRgdC+0YXRgNCw0L3QtdC90L4nLCAxNTAwKTtcclxuICAgIH1lbHNle3dpbmRvdy5obS5wb3BVcChlcnJvcnMpO31cclxuICAgIHZhciBkYXRhID0gd2luZG93LmhtLmdldERhdGEoZm9ybVdvcmtzKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgfSk7XHJcbn07XG59LHt9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gIGZ1bmN0aW9uKCl7XHJcbiAgdmFyIFxyXG4gICAgYWRtaW5Gb3JtcyA9ICQoJy5hZG1pbi1mb3JtJyksXHJcbiAgICBtZW5MaXN0ID0gJCgnLmFkbWluLW5hdl9faXRlbScpO1xyXG5cclxuICBtZW5MaXN0LmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICBpZiAoJCh0aGF0KS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICQodGhhdCkuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICQodGhhdCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICBzaG93Rm9ybSgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gXHJcbiAgZnVuY3Rpb24gc2hvd0Zvcm0oKXtcclxuICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAvL9GE0YPQvdC60YbRi9GPINC/0L7QutCw0LbQtdGCINC90YPQttC90YPRjiDRhNC+0YDQvNGDINC4INGB0LrRgNC+0LXRgiDQvdC1INC90YPQttC90YPRjiDRgNC10YjQtdC90LjRjyDQv9GA0LjQvdC40LzQsNC10YLRjNGB0Y8g0L3QsCDQvtGB0L3QvtCy0LUg0LDQutGC0LjQstC90L7Qs9C+INC10LvQtdC80LXQvdGC0LAg0LzQtdC90Y5cclxuICAgIG1lbkxpc3QuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGlmICggJCh0aGF0KS5oYXNDbGFzcygnYWN0aXZlJykgKSB7XHJcbiAgICAgICAgJChhZG1pbkZvcm1zW2NvdW50XSkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgICQoYWRtaW5Gb3Jtc1tjb3VudF0pLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgIH1cclxuICAgICAgY291bnQrKzsgIFxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGFkbWluRm9ybXMuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICBzaG93Rm9ybSgpO1xyXG4gIFxyXG59O1xufSx7fV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGxvZ2luRGF0YSA9IHt9O1xyXG4gICQoJyNsb2dpbi1uYXZfX2VudGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIHZhclxyXG4gICAgICBsb2dpbkZvcm0gPSAkKCcjbG9naW4tZm9ybScpLFxyXG4gICAgICBlcnJvcnMgPSBbXTtcclxuXHJcbiAgICBsb2dpbkRhdGEubG9naW4gPSBsb2dpbkZvcm0uZmluZCgnI2xvZ2luJykudmFsKCkudHJpbSgpLFxyXG4gICAgbG9naW5EYXRhLnBhc3MgPSBsb2dpbkZvcm0uZmluZCgnI3Bhc3N3b3JkJykudmFsKCkudHJpbSgpLFxyXG4gICAgbG9naW5EYXRhLmh1bWFuID0gbG9naW5Gb3JtLmZpbmQoJyNsb2dpbmZvcm1fY2hlY2snKS5wcm9wKCdjaGVja2VkJyksXHJcbiAgICBsb2dpbkRhdGEuZXhhY3RseUh1bWFuID0gbG9naW5Gb3JtLmZpbmQoJyNyYWRpb195ZXMnKS5wcm9wKCdjaGVja2VkJyk7XHJcbiAgICAgIFxyXG4gICAgZm9yKHZhciBwcm9wZXJ0eSBpbiBsb2dpbkRhdGEpe1xyXG4gICAgICB2YXIgcHJvcExhbHVlID0gbG9naW5EYXRhW3Byb3BlcnR5XTtcclxuICAgICAgaWYgKCBwcm9wTGFsdWUgPT09IGZhbHNlIHx8IHByb3BMYWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIC8v0LfQvdCw0YfQtdGCINGN0YLQviDRh9C10LrQsdC+0LrRgdGLXHJcbiAgICAgICAgaWYgKHByb3BMYWx1ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgZXJyb3JzWzFdID0gJ9Cf0L7QttC+0LbQtSDRh9GC0L4g0LLRiyDRgNC+0LHQvtGCITxicj4nO1xyXG4gICAgICAgIH1cclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgLy/Qt9C90LDRh9C10YIg0Y3RgtC+INGB0YLRgNC+0LrQuFxyXG4gICAgICAgIHZhciBzdHJMZW5ndGggPSBwcm9wTGFsdWUubGVuZ3RoO1xyXG4gICAgICAgIGlmIChzdHJMZW5ndGggPCA0IHx8IHN0ckxlbmd0aCA+IDE0KSB7XHJcbiAgICAgICAgICBlcnJvcnNbMF0gPSAn0JTQu9C40L3QvdCwINC70L7Qs9C40L3QsCDQuCDQv9Cw0YDQvtC70Y8g0LTQvtC70LbQvdCwINCx0YvRgtGMINC+0YIgNCDQtNC+IDE0INGB0LjQvNCy0L7Qu9C+0LIhPGJyPic7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcclxuICAgICAgZXJyb3JzLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgbWVzc2FnZSArPSAoaXRlbSkgPyBpdGVtKydcXG4nOicgJztcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGl0ZW0pO1xyXG4gICAgICB9KTtcclxuICAgICAgd2luZG93LmhtLnBvcFVwKG1lc3NhZ2UpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvL9C00LDQu9C1INGA0LDQsdC+0YLQsCDQt9CwINGB0LXRgNCy0LXRgNC+0LxcclxuICB9KTtcclxufTtcbn0se31dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xyXG4gIHZhclxyXG4gICAgbm90X2ZpeGVkID0gdHJ1ZSxcclxuICAgIGFycm93X25vbmUgPSB0cnVlLFxyXG4gICAgdGFyZ2V0ID0gJCgnI3NlY3Rpb24tYXJ0aWNsZXMnKSxcclxuICAgIGFydGljbGVzID0gJCgnLmFydGljbGUnKSxcclxuICAgIGFzaWRlSXRlbSA9ICQoJy5ibG9nX2FzaWRlX19pdGVtJyksXHJcbiAgICBhc2lkZUxpc3QgPSAkKCcuYmxvZ19hc2lkZV9fbGlzdCcpLFxyXG4gICAgYXNpZGUgPSAkKCcuYmxvZ19hc2lkZScpLFxyXG4gICAgYXNpZGVMb2lzdEJ1dHRvbiA9IGFzaWRlTGlzdC5maW5kKCcjYmxvZ19hc2lkZV9fbGlzdF9idXR0b24nKSxcclxuICAgIHdpbkhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKSxcclxuICAgIHdpblNjcm9sbFRvcCA9ICcnO1xyXG4gICAgXHJcbiAgaWYgKHRhcmdldC5sZW5ndGggPiAwKSB7XHJcbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIHdpblNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgZml4ZXRfbmF2KCk7XHJcbiAgICAgIGluV2luZG93KGFydGljbGVzLCBhc2lkZUl0ZW0pO1xyXG4gICAgICBzaG93QXJyb3coKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICAvL9C/0L7Qt9GL0YbRi9C+0L3QuNGA0L7QstCw0L3QuNC1INC90LDQstC40LPQsNGG0LjQuFxyXG4gIGZ1bmN0aW9uIGZpeGV0X25hdigpe1xyXG4gICBcclxuICAgIHZhciB0YXJnZXRQb3MgPSB0YXJnZXQub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgIGlmKHdpblNjcm9sbFRvcCA+PSB0YXJnZXRQb3MgJiYgbm90X2ZpeGVkKXtcclxuICAgICAgdmFyIHRvcCA9ICQoYXNpZGVMaXN0KS5wb3NpdGlvbigpLnRvcDtcclxuICAgICAgdmFyIGxlZnQgPSAkKGFzaWRlTGlzdCkub2Zmc2V0KCkubGVmdDtcclxuICAgICAgJChhc2lkZUxpc3QpLmNzcyh7J3Bvc2l0aW9uJzonZml4ZWQnLCAndG9wJzogdG9wKydweCcsICdsZWZ0JzogbGVmdCsncHgnfSk7XHJcbiAgICAgIG5vdF9maXhlZCA9IGZhbHNlO1xyXG4gICAgfWVsc2UgaWYod2luU2Nyb2xsVG9wIDwgdGFyZ2V0UG9zICYmICFub3RfZml4ZWQpIHtcclxuICAgICAgJChhc2lkZUxpc3QpLmNzcyh7J3Bvc2l0aW9uJzonc3RhdGljJ30pO1xyXG4gICAgICBub3RfZml4ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vZ9C/0L7QutCw0LfQsNGC0Ywg0YHQutGA0YvRgtGMINCx0L7QutC+0LLQvtC1INC80LXQvdGOLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBhc2lkZUxvaXN0QnV0dG9uLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgbGVmdCA9IHBhcnNlSW50KCBhc2lkZS5jc3MoJ2xlZnQnKSApO1xyXG4gICAgaWYgKGxlZnQ8MCkge1xyXG4gICAgICBhc2lkZUxpc3QuY3NzKHsnbGVmdCc6JzBweCd9KTtcclxuICAgICAgYXNpZGUuY3NzKHsnbGVmdCc6ICcwJ30pO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIGFzaWRlTGlzdC5jc3MoeydsZWZ0JzonLTMwMHB4J30pO1xyXG4gICAgICBhc2lkZS5jc3MoeydsZWZ0JzogJy0zMDBweCd9KTtcclxuICAgIH1cclxuICB9KTtcclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vZ9C/0L7QutCw0LfQsNGC0Ywg0YHQutGA0YvRgtGMINCx0L7QutC+0LLQvtC1INC80LXQvdGOLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgLy/Qv9C+0LrQsNC30LDRgtGMINGB0LrRgNGL0YLRjCDRgdGC0YDQtdC70LrRgyDQstCy0LXRgNGFXHJcbiAgZnVuY3Rpb24gc2hvd0Fycm93KCl7XHJcbiAgICBpZiAod2luSGVpZ2h0IDw9IHdpblNjcm9sbFRvcCAmJiBhcnJvd19ub25lKSB7XHJcbiAgICAgICQoJy5hcnJvdy10b3AnKS5jc3MoeydkaXNwbGF5JzonYmxvY2snfSk7XHJcbiAgICAgIGFycm93X25vbmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYod2luSGVpZ2h0ID4gd2luU2Nyb2xsVG9wICYmICFhcnJvd19ub25lKXtcclxuICAgICAgJCgnLmFycm93LXRvcCcpLmNzcyh7J2Rpc3BsYXknOidub25lJ30pO1xyXG4gICAgICBhcnJvd19ub25lID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbiAgLy/Qv9C+0LrRgNCw0YHQuNGCINC10LvQtdC80LXQvdGCINC90LDQstC40LPQsNGG0LjQvtC90L3QvtCz0L4g0LzQtdC90Y4g0LrQvtGC0L7RgNGL0Lkg0YHQvtGC0LLQtdGC0YHRgtCy0YPQtdGCINGC0LXQutGD0YnQtdC5INGB0YLQsNGC0LhcclxuICB2YXIgc2F2ZWRJbmRleE51bWJlciA9IDAsIGN1cnJlbnRJbmRleE51bWJlciA9IDA7XHJcbiAgZnVuY3Rpb24gaW5XaW5kb3coYXJ0aWNsZXMsIGFzaWRlSXRlbSl7XHJcbiAgICB2YXJcclxuICAgICAgaW5kZW50ID0gcGFyc2VJbnQoICQoYXJ0aWNsZXNbMF0pLmNzcygnbWFyZ2luLWJvdHRvbScpICksXHJcbiAgICAgIGN1cnJlbnRFbHMgPSAkKGFydGljbGVzKSxcclxuICAgICAgcmVzdWx0ID0gW10sXHJcbiAgICAgIG9mZnNldFRvcDtcclxuXHJcbiAgICBjdXJyZW50RWxzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIGVsZW1lbnQgPSAkKHRoaXMpO1xyXG4gICAgICBvZmZzZXRUb3AgPSBlbGVtZW50Lm9mZnNldCgpLnRvcDtcclxuICAgICAgb2Zmc2V0VG9wID0gcGFyc2VJbnQob2Zmc2V0VG9wKTtcclxuICAgICAgaWYoIHdpblNjcm9sbFRvcCtpbmRlbnQqMiA+IG9mZnNldFRvcCApe1xyXG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMpO1xyXG4gICAgICAgIGN1cnJlbnRJbmRleE51bWJlciA9IHJlc3VsdC5sZW5ndGggLSAxO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmICggc2F2ZWRJbmRleE51bWJlciAhPT0gY3VycmVudEluZGV4TnVtYmVyKSB7XHJcbiAgICAgIHNhdmVkSW5kZXhOdW1iZXIgPSBjdXJyZW50SW5kZXhOdW1iZXI7XHJcbiAgICAgICQoYXNpZGVJdGVtKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICQoYXNpZGVJdGVtW2N1cnJlbnRJbmRleE51bWJlcl0pLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgIH1cclxuICB9XHJcbn07XG59LHt9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcclxuICAvL9C+0YfQuNGB0YLQutCwINGE0L7RgNC80YssINC/0LDRgNCw0LzQtdGC0YAg0YTQvtGA0LzQsCDQsiDQstC40LTQtSBqcXVlcnkg0L7QsdGM0LXQutGCXHJcbiAgZnVuY3Rpb24gY2xlYXIoZm9ybSl7XHJcbiAgICB2YXIgaW5wdXRzID0gZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEnKTtcclxuXHJcbiAgICBpbnB1dHMuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAkKHRoaXMpLnZhbCgnJyk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgXHJcbiAgdmFyIGZvcm1Cb3ggPSAkKCcjY29udGFjdC1mb3JtLWJveCcpO1xyXG4gIGlmIChmb3JtQm94Lmxlbmd0aCA8IDEpIHtyZXR1cm47fVxyXG4gIHZhclxyXG4gICAgZm9ybSA9IGZvcm1Cb3guZmluZCgnI2NvbnRhY3QtZm9ybScpLFxyXG4gICAgYnV0dG9ucyA9IGZvcm1Cb3guZmluZCgnLmNvbnRhY3QtZm9ybV9fYnV0dG9ucycpO1xyXG5cclxuICBidXR0b25zLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2dCl7XHJcbiAgICBpZiAoICQoZXZ0LnRhcmdldCkuYXR0cignaWQnKSA9PT0gJ3NlbmQtbWVzc2FnZScgKSB7XHJcbiAgICAgIHZhciBkYXRhID0gd2luZG93LmhtLmdldERhdGEoZm9ybSk7XHJcbiAgICAgIC8v0L/RgNC+0LnQtNC10LzRgdGPINC/0L4g0LjQvNC/0YPRgtCw0Lwg0L3QviDQv9GA0L7Qv9GD0YHRgtC40LwgaWQg0YLQtdC60YPRidC10Lkg0YTQvtGA0LzRi1xyXG4gICAgICB2YXJcclxuICAgICAgICBlcnJvcnMgPSBbXSxcclxuICAgICAgICBtYWlsID0gJyc7XHJcbiAgICAgIGZvcih2YXIgaT0xOyBpPGRhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgICAgY3VycmVuSWQgPSBkYXRhW2ldWzBdLFxyXG4gICAgICAgICAgY3VycmVudERhdGEgPSBkYXRhW2ldWzFdO1xyXG5cclxuICAgICAgICBpZiAoY3VycmVuSWQgPT0gJ21haWwnKSB7bWFpbCA9IGN1cnJlbnREYXRhO31cclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnREYXRhLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgIHZhciBtYXNzZWdlID0gWyBbJ25hbWUnLCfQmNC80Y8nXSwgWydtYWlsJywgJ0VtYWlsJ10sIFsnbWVzc2FnZScsICfQodC+0L7QsdGJ0LXQvdC40LUnXSBdO1xyXG4gICAgICAgICAgdmFyIGN1cnJlbklucHV0ID0gJyc7XHJcbiAgICAgICAgICAvL9C/0L7RgdC80L7RgtGA0LjQvCDRgdGB0L7QsdGJ0LXQvdC40Y8g0YEg0L7RgiDQuNC80LXQvdC4INC60LDQutC+0LPQviDQv9C+0LvRjyDQvdGD0LbQvdC+INCy0YvQstC10YHRgtC4XHJcbiAgICAgICAgICBtYXNzZWdlLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW5JZCA9PT0gZWxlbWVudFswXSkge2N1cnJlbklucHV0ID0gZWxlbWVudFsxXTt9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGVycm9yc1tlcnJvcnMubGVuZ3RoXSA9IGN1cnJlbklucHV0Kycg0L3QtSDQvNC+0LbQtdGCINCx0YvRgtGMINC/0YPRgdGC0YvQvCEgPGJyPic7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHZhciByID0gL15cXHcrQFxcdytcXC5cXHd7Miw0fSQvaTtcclxuICAgICAgaWYgKGVycm9ycy5sZW5ndGggPCAxICYmICFyLnRlc3QobWFpbCkgKXtcclxuICAgICAgICBlcnJvcnNbZXJyb3JzLmxlbmd0aF0gPSAn0J3QtSDQutC+0YDQtdC60YLQvdGL0LkgZS1tYWlsISc7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVycm9ycy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgdmFyIGFuc3dlciA9IHRydWU7XHJcbiAgICAgICAgLy/QtdGB0LvQuCDQvtGI0YLQsdC+0Log0L3QtdGCINC+0YLRgNCw0LLQuNC8INC30LDQv9GA0L7RgSDQvdCwINGB0LXRgNCy0LXRgFxyXG5cclxuICAgICAgICAvL9C10YHQu9C4INC+0YIg0YHQtdGA0LLQtdGA0LAg0L/RgNC40LnQtNC10YIg0L/QvtC70L7QttC40YLQtdC70YzQvdGL0Lkg0L7RgtCy0LXRglxyXG4gICAgICAgIGlmIChhbnN3ZXIgPT09IHRydWUpIHtcclxuICAgICAgICAgIHdpbmRvdy5obS5wb3BVcCgn0KPQodCf0JXQqNCd0J4g0J7QotCf0KDQkNCS0JvQldCd0J4hJywgMzAwMCk7XHJcbiAgICAgICAgICBjbGVhcihmb3JtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9ZWxzZXt3aW5kb3cuaG0ucG9wVXAoZXJyb3JzKTt9XHJcbiAgICAgIFxyXG4gICAgfWVsc2UgaWYoJChldnQudGFyZ2V0KS5hdHRyKCdpZCcpID09PSAncmVzZXQnKXtcclxuICAgICAgY2xlYXIoZm9ybSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XG59LHt9XSw3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xyXG4gIHZhclxyXG4gICAgbGF5ZXIgPSAkKCcucGFyYWxsYXgnKS5maW5kKCcucGFyYWxsYXhfX2xheWVyJyksXHJcbiAgICBsYXllclNjcm9sbCA9ICQoJy5wYXJhbGxheF9zY3JvbGwnKS5maW5kKCcucGFyYWxsYXhfX2xheWVyJyk7XHJcbiAgJCh3aW5kb3cpLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkgeyBcclxuICAgIHZhclxyXG4gICAgICBtb3VzZV9keCA9IChlLnBhZ2VYKSwgLy8g0KPQt9C90LDQtdC8INC/0L7Qu9C+0LbQtdC90LjQtSDQvNGL0YjQutC4INC/0L4gWFxyXG4gICAgICBtb3VzZV9keSA9IChlLnBhZ2VZKSwgLy8g0KPQt9C90LDQtdC8INC/0L7Qu9C+0LbQtdC90LjQtSDQvNGL0YjQutC4INC/0L4gWVxyXG4gICAgICB3ID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgLSBtb3VzZV9keCwgLy8g0JLRi9GH0LjRgdC70Y/QtdC8INC00LvRjyB4INC/0LXRgNC10LzQtdGJ0LXQvdC40Y9cclxuICAgICAgaCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIG1vdXNlX2R5OyAvLyDQktGL0YfQuNGB0LvRj9C10Lwg0LTQu9GPIHkg0L/QtdGA0LXQvNC10YnQtdC90LjRj1xyXG5cclxuICAgIGxheWVyLm1hcChmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICB2YXJcclxuICAgICAgICB3aWR0aFBvc2l0aW9uID0gdyAqIChrZXkgLyAxMDApLCAvLyDQktGL0YfQuNGB0LvRj9C10Lwg0LrQvtC+0YTQuNGG0LXQvdGCINGB0LzQtdGI0LXQvdC40Y8g0L/QviBYXHJcbiAgICAgICAgaGVpZ2h0UG9zaXRpb24gPSBoICogKGtleSAvIDEwMCk7IC8vINCS0YvRh9C40YHQu9GP0LXQvCDQutC+0L7RhNC40YbQtdC90YIg0YHQvNC10YjQtdC90LjRjyDQv9C+IFlcclxuXHJcbiAgICAgICQodmFsdWUpLmNzcyh7XHJcbiAgICAgICAgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGUzZCgnICsgd2lkdGhQb3NpdGlvbiArICdweCwgJyArIGhlaWdodFBvc2l0aW9uICsgJ3B4LCAwKSdcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICB2YXIgd2luZG93SGVpZ3RoID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKXtcclxuICAgIHZhciB3aW5TY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICBpZiAod2luZG93SGVpZ3RoID4gd2luU2Nyb2xsVG9wKSB7XHJcbiAgICAgIGxheWVyU2Nyb2xsLm1hcChmdW5jdGlvbiAoa2V5LCB2YWx1ZSl7XHJcbiAgICAgICAgdmFyIGJpYXMgPSB3aW5TY3JvbGxUb3AgKiAoa2V5LzIwKTtcclxuICAgICAgICAkKHZhbHVlKS5jc3Moe1xyXG4gICAgICAgICAgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGUzZCgwLCAnICsgLWJpYXMgKydweCwgMCknXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNle3JldHVybjt9XHJcbiAgfSk7XHJcbn07ICBcbn0se31dLDg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgJCgnLmFib3V0LXdyYXBwZXIsIC5ibG9nLXdyYXBwZXIsIC5pbmRleC13cmFwcGVyLCAud29ya3Mtd3JhcHBlciwgLmFkbWluLXdyYXBwZXInKS5jc3MoeydkaXNwbGF5Jzonbm9uZSd9KTtcclxuICB2YXIgaW1ncyA9IFtdO1xyXG4gICQuZWFjaCgkKCcqJyksIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgIGJhY2tncm91bmQgPSAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKSxcclxuICAgICAgaW1nID0gJHRoaXMuaXMoJ2ltZycpO1xyXG4gICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKSB7XHJcbiAgICAgIHZhciBwYXRoID0gYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInLCAnJykucmVwbGFjZSgnXCIpJywgJycpO1xyXG5cclxuICAgICAgaW1ncy5wdXNoKHBhdGgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGltZykge1xyXG4gICAgICBwYXRoID0gJHRoaXMuYXR0cignc3JjJyk7XHJcbiAgICAgIGltZ3MucHVzaChwYXRoKTtcclxuICAgIH1cclxuICB9KTtcclxuICB2YXIgcGVyY2VudHMgPSAxO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW1ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGltYWdlID0gJCgnPGltZz4nLCB7XHJcbiAgICAgIGF0dHI6IHtcclxuICAgICAgICBzcmMgOiBpbWdzW2ldXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaW1hZ2UubG9hZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHNldFBlcmNlbnRzKGltZ3MubGVuZ3RoLCBwZXJjZW50cyk7XHJcbiAgICAgIHBlcmNlbnRzKys7XHJcbiAgICB9KTtcclxuICAgIGltYWdlLmVycm9yKGZ1bmN0aW9uICgpIHtcclxuICAgICAgc2V0UGVyY2VudHMoaW1ncy5sZW5ndGgsIHBlcmNlbnRzKTtcclxuICAgICAgcGVyY2VudHMrKztcclxuICAgIH0pO1xyXG4gIH1cclxuICAvL9CV0KHQm9CYINCa0JDQoNCi0JjQndCe0Jog0J3QldCiIFxyXG4gIGlmKGltZ3MubGVuZ3RoID09PSAwKXtcclxuICAgIHNldFBlcmNlbnRzKDEsMSk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHNldFBlcmNlbnRzKHRvdGFsLCBjdXJyZW50KSB7XHJcbiAgICB2YXIgcGVyY2VudCA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xyXG4gICAgaWYgKHBlcmNlbnQgPj0gMTAwKSB7XHJcbiAgICAgICQoJy5hYm91dC13cmFwcGVyLCAuYmxvZy13cmFwcGVyLCAuaW5kZXgtd3JhcHBlciwgLndvcmtzLXdyYXBwZXIsIC5hZG1pbi13cmFwcGVyJykuY3NzKHsnZGlzcGxheSc6J2Jsb2NrJ30pO1xyXG4gICAgICAkKCcucGxhdGUtZnJvbnQnKS5hZGRDbGFzcygnYW5pbWF0ZV9wbGF0ZScpO1xyXG4gICAgICAkKCcubG9hZGVyLXdyYXBwZXInKS5mYWRlT3V0KDE1MDAsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgJCgnLnBsYXRlLWZyb250JykucmVtb3ZlQ2xhc3MoJ2FuaW1hdGVfcGxhdGUnKTtcclxuICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAkKCcubG9hZGVyX19wZXJjZW50JykudGV4dChwZXJjZW50ICsgJyUnKTtcclxuICB9XHJcbn07XG59LHt9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcclxuICB2YXJcclxuICAgIHRyYW5zaXRpb24gPSAzMDAsXHJcbiAgICBtZW51QnV0dG9uID0gJCgnI21lbnUtYnV0dG9uJyk7XHJcblxyXG4gIG1lbnVCdXR0b24uY2xpY2soZnVuY3Rpb24oKXtcclxuICAgIHZhciBjbG9zZSA9ICQoJy5jdXJ0YWluLWxlZnQnKS5oYXNDbGFzcygnY2xvc2VDdXJ0YWluc0wnKTtcclxuICAgIGlmKGNsb3NlKXtcclxuICAgICAgY2xvc2VfbWVudSgpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHNob3dfbWVudSgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGZ1bmN0aW9uIGNsb3NlX21lbnUoKXtcclxuICAgIG1lbnVCdXR0b24ucmVtb3ZlQ2xhc3MoJ21lbnUtYnV0dG9uLWNsb3NlJyk7XHJcbiAgICAkKCcuY3VydGFpbi1sZWZ0LCAuY3VydGFpbi1yaWdodCwgI21haW4tbmF2JykuY3NzKHsnb3BhY2l0eSc6MH0pO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAkKCcuY3VydGFpbi1sZWZ0JykucmVtb3ZlQ2xhc3MoJ2Nsb3NlQ3VydGFpbnNMJyk7XHJcbiAgICAgICQoJy5jdXJ0YWluLXJpZ2h0JykucmVtb3ZlQ2xhc3MoJ2Nsb3NlQ3VydGFpbnNSJyk7XHJcbiAgICAgICQoJyNtYWluLW5hdicpLnJlbW92ZUNsYXNzKCdibG9jaycpO1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnLmN1cnRhaW4tbGVmdCwgLmN1cnRhaW4tcmlnaHQsICNtYWluLW5hdicpLmNzcyh7J29wYWNpdHknOjF9KTtcclxuICAgICAgfSwgdHJhbnNpdGlvbik7IFxyXG4gICAgfSwgdHJhbnNpdGlvbik7XHJcbiAgfVxyXG4gIHZhclxyXG4gICAgYXJyID0gJCgnLm1haW4tbmF2LWxpc3QtaXRlbScpLFxyXG4gICAgYXJyX2xlbmd0aCA9IGFyci5sZW5ndGg7XHJcblxyXG4gIGZ1bmN0aW9uIHNob3dfbWVudSgpe1xyXG4gICAgbWVudUJ1dHRvbi5hZGRDbGFzcygnbWVudS1idXR0b24tY2xvc2UnKTtcclxuICAgICQoYXJyKS5maW5kKCdhJykuY3NzKHsndHJhbnNmb3JtJzogJ3NjYWxlKDApJywgJ3RyYW5zaXRpb24tZHVyYXRpb24nOnRyYW5zaXRpb24rJ21zJ30pO1xyXG4gICAgdmFyIGN1cnJlbnQgPSAwO1xyXG4gICAgJCgnLmN1cnRhaW4tbGVmdCcpLmFkZENsYXNzKCdjbG9zZUN1cnRhaW5zTCcpO1xyXG4gICAgJCgnLmN1cnRhaW4tcmlnaHQnKS5hZGRDbGFzcygnY2xvc2VDdXJ0YWluc1InKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgJCgnI21haW4tbmF2JykuYWRkQ2xhc3MoJ2Jsb2NrJyk7XHJcbiAgICAgIHZhciB0aW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgYSA9ICQoYXJyW2N1cnJlbnRdKS5maW5kKCdhJyk7XHJcbiAgICAgICAgYS5jc3Moeyd0cmFuc2Zvcm0nOidzY2FsZSgxKSd9KTtcclxuICAgICAgICBpZiAoY3VycmVudCA+PSBhcnJfbGVuZ3RoLTEpIHtcclxuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3VycmVudCsrO1xyXG4gICAgICB9LCB0cmFuc2l0aW9uLzIpOyBcclxuXHJcbiAgICB9LCB0cmFuc2l0aW9uKTtcclxuICB9XHJcbn1cbn0se31dLDEwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8v0LDQvdC40LzQuNGA0L7QstCw0L3QuNGPINGC0LXQutGB0YLQsCDQsiDRgdC70LDQudC00LXRgNC1XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcclxuICB2YXIgdGltZW91dCA9IDYwMDtcclxuICAoZnVuY3Rpb24oKXtcclxuICAgIHZhclxyXG4gICAgICBkZXNjcmlwdGlvbnMgPSAkKCcuc2xpZGVyX19pbWFnZS1kZXNjcmlwdGlvbicpLFxyXG4gICAgICB0aXRsZXMgPSBkZXNjcmlwdGlvbnMuZmluZCgnaDInKSxcclxuICAgICAgdGVjaG5vbG9naXN0cyA9IGRlc2NyaXB0aW9ucy5maW5kKCdwJyk7XHJcbiAgICAgIC8v0YTRg9C90LrRhtC40Y8g0L/QvtC00LPQvtGC0L7QstC40YIg0YLQtdC60YHRgiDQuiDQsNC90LjQvNCw0YbQuNC4INC/0L7RgNGD0LHQsNC10YIg0L3QsCDQvtGC0LTQtdC70YzQvdGL0LUg0LHRg9C60LLRiyDQstGB0LUg0YfRgtC+INC90LDQtNC+XHJcbiAgICBmdW5jdGlvbiBmcmFjdGlvbihlKXtcclxuICAgICAgZS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgIGl0ZW0uZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyXHJcbiAgICAgICAgICAgIHRoYXQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBzdHJpbmcgPSB0aGF0LnRleHQoKTtcclxuICAgICAgICAgIHRoYXQuaHRtbChzdHJpbmcucmVwbGFjZSgvLi9nLCAnPHNwYW4gY2xhc3M9XCJsZXR0ZXJcIj4kJjwvc3Bhbj4nKSk7XHJcbiAgICAgICAgICAvL9C/0YDQuNGB0LLQvtC10Lwg0LrQsNC20LTQvtC5INCx0YPQutCy0LUg0L3QtdC+0LHRhdC+0LTQuNC80YPRjiDQt9Cw0LTQtdGA0LbQutGDINC/0LXRgNC10LQg0LDQvdC40LzQsNGG0LjQtdC5XHJcbiAgICAgICAgICB2YXJcclxuICAgICAgICAgICAgbGV0dGVycyA9IHRoYXQuZmluZCgnc3BhbicpLFxyXG4gICAgICAgICAgICBkZWFseSA9IDA7XHJcbiAgICAgICAgICBsZXR0ZXJzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICAgdGhhdCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgbGV0ZXJMZW5ndGggPSBsZXR0ZXJzLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhhdC5jc3MoeydhbmltYXRpb24tZGVsYXknOmRlYWx5Kydtcyd9KTtcclxuICAgICAgICAgICAgZGVhbHkgKz0gcGFyc2VJbnQodGltZW91dCAvIGxldGVyTGVuZ3RoLCAxMCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7IFxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBmcmFjdGlvbihbdGl0bGVzLCB0ZWNobm9sb2dpc3RzXSk7XHJcbiAgfSkoKTtcclxuICBcclxuICBmdW5jdGlvbiB0ZXh0QW5pbWF0ZSh0aGF0KXtcclxuICAgIHZhclxyXG4gICAgICBsZXR0ZXJMaXN0ID0gdGhhdC5maW5kKCcubGV0dGVyJyksXHJcbiAgICAgIGxpc3RMZW5ndGggPSBsZXR0ZXJMaXN0Lmxlbmd0aCxcclxuICAgICAgaSA9IDA7XHJcblxyXG4gICAgKGZ1bmN0aW9uIHNob3dMZXR0ZXIoKXtcclxuICAgICAgdmFyIGN1cnJlbnRMZXR0ZXIgPSAkKGxldHRlckxpc3RbaV0pLmh0bWwoKTtcclxuICAgICAvL9C10YHQu9C4INGN0YLQviDQv9GA0L7QsdC10Lsg0LfQsNC00LDQtNC40Lwg0LXQvNGDINGE0LjQutGB0LjRgNC+0LLQsNC90L3Rg9GOINGI0LjRgNC40L3RgyDQuNC90LDRh9C1INC/0L7RgtC+0Lwg0L7QvSDRgdC/0LvRjtGJ0LjRgtGM0YHRjyBcclxuICAgICAgaWYgKGN1cnJlbnRMZXR0ZXIgPT09ICcgJykge1xyXG4gICAgICAgIHZhciBsZXR0ZXJXaWR0aCA9ICQobGV0dGVyTGlzdFtpXSkud2lkdGgoKTtcclxuICAgICAgLy/QtdGB0LvQuCDRiNC40YDQuNC90LAg0L/RgNC+0LHQtdC70LAgPSAwLCDQt9C90LDRh9C40YIg0Y3RgtC+INC60L7QvdC10YYg0YHRgtGA0L7QutC4INC4INC90YPQttC90L4g0LLRgdGC0LDQstC40YLRjCDQtdC70LXQvNC10L3RgiDQv9C10YDQtdC90L7RgdCwINGB0YLRgNC+0LrQuFxyXG4gICAgICAgIGlmIChsZXR0ZXJXaWR0aCA9PSAwKSB7XHJcbiAgICAgICAgICAkKGxldHRlckxpc3RbaV0pLmFmdGVyKCc8YnI+Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQobGV0dGVyTGlzdFtpXSkud2lkdGgobGV0dGVyV2lkdGgpO1xyXG4gICAgICB9XHJcbiAgICAgIGkrKztcclxuICAgICAgKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYgKGkgPCBsaXN0TGVuZ3RoKSB7XHJcbiAgICAgICAgICBzaG93TGV0dGVyKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBsZXR0ZXJMaXN0LmFkZENsYXNzKCdzaG93TGV0dGVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KSgpO1xyXG4gICAgfSkoKTtcclxuICB9XHJcbi8v0LrQvtC90LXRhiDQsNC90LjQvNC40YDQvtCy0LDQvdC40Y8g0YLQtdC60YHRgtCwINCyINGB0LvQsNC50LTQtdGA0LVcclxuXHJcbi8v0YHQvNC10L3QsCDQuNC30L7QsdGA0LDQttC10L3QuNC5INC4INC+0L/QuNGB0LDQvdC40Y8g0LIg0YHQu9Cw0LnQtNC10YDQtVxyXG4gIChmdW5jdGlvbigpe1xyXG4gICAgJCgnLnNsaWRlcl9fYm90dG9tLXByZXZpZXcgbGksIC5zbGlkZXJfX3RvcC1wcmV2aWV3IGxpLCAuc2xpZGVyX19pbWFnZXMtbGlzdCcpLmNzcyh7J3RyYW5zaXRpb24tZHVyYXRpb24nOnRpbWVvdXQrJ21zJ30pO1xyXG4gICAgJCgnLnNsaWRlcl9faW1hZ2VzLWxpc3QnKS5jc3MoeyAndHJhbnNpdGlvbi1kdXJhdGlvbic6dGltZW91dC8yKydtcyd9KTtcclxuICAgIHZhciBidXR0b25zID0gJCgnLnNsaWRlcl9fYnV0dG9ucy1ib3R0b20sIC5zbGlkZXJfX2J1dHRvbnMtdG9wJyk7XHJcbiAgICBidXR0b25zLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2dCl7XHJcbiAgICAgIGNhbGxTbGlkZXIoZXZ0KTtcclxuICAgIH0pO1xyXG4gICAgZnVuY3Rpb24gY2FsbFNsaWRlcihldnQpe1xyXG4gICAgICAvL9GD0LTQsNC70LjQvCDQvtCx0YDQsNCx0L7RgtGH0LjQulxyXG4gICAgICBidXR0b25zLm9mZigpO1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy/QstC10YDQvdGR0Lwg0L7QsdGA0LDQsdC+0YLRh9C40LpcclxuICAgICAgICBidXR0b25zLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2dCl7Y2FsbFNsaWRlcihldnQpO30pO1xyXG4gICAgICB9LHRpbWVvdXQqMS41KTtcclxuICAgICAgc2xpZGVyKGV2dCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjaGFuZ2VEZXNjcmlwdGlvbihpKXtcclxuICAgICAgdmFyXHJcbiAgICAgICAgZGVzYyA9ICQoJy5zbGlkZXJfX2ltYWdlLWRlc2NyaXB0aW9uJykuY2xvbmUoKSxcclxuICAgICAgICB0aXRsZSA9ICQoZGVzY1tpXSkuZmluZCgnaDInKS5hZGRDbGFzcygnYW5pbWF0ZVRleHQnKSxcclxuICAgICAgICB0ZWNobm9sb2dpZXMgPSAkKGRlc2NbaV0pLmZpbmQoJ3AnKS5hZGRDbGFzcygnYW5pbWF0ZVRleHQnKSxcclxuICAgICAgICBsaW5rID0gJChkZXNjW2ldKS5maW5kKCdhJyk7XHJcblxyXG4gICAgICAkKCcud29yay1kZXNjcmlwdGlvbl9fdGl0bGUgaDInKS5yZXBsYWNlV2l0aCh0aXRsZSk7XHJcbiAgICAgICQoJy53b3JrLWRlc2NyaXB0aW9uX190ZWNobm9sb2dpZXMgcCcpLnJlcGxhY2VXaXRoKHRlY2hub2xvZ2llcyk7XHJcbiAgICAgICQoJy53b3JrLWRlc2NyaXB0aW9uX19ib3R0b24gYScpLnJlcGxhY2VXaXRoKGxpbmspO1xyXG4gICAgICB0ZXh0QW5pbWF0ZSgkKCcuYW5pbWF0ZVRleHQnKSk7XHJcbiAgICB9XHJcbiAgICAvL9GD0YHRgtCw0LLQuNC8INC+0L/QuNGB0LDQvdC40LUg0YLQtdC60YPRidC10Lkg0YDQsNCx0L7RgtGLXHJcbiAgICBjaGFuZ2VEZXNjcmlwdGlvbigwKTtcclxuICAgIHZhciBpbWFnZUxpc3QgID0gJCgnLnNsaWRlcl9faW1hZ2VzLWxpc3QnKTtcclxuICAgIGZ1bmN0aW9uIHNsaWRlcihldnQpe1xyXG4gICAgICB2YXIgaW1hZ2VzLCBhcnJMZW5naHQsIGJvdHRvbiwgcHJldiwgcHJldkxlZnQsIHByZXZSaWdodCwgcHJldjFMZWZ0LHByZXYyTGVmdCxcclxuICAgICAgICBwcmV2MVJpZ2h0LCBwcmV2MlJpZ2h0LCBjdXJyZW50TGVmdExpLCBuZXh0TGVmdExpLCBjdXJyZW50UmlnaHRMaSwgbmV4dFJpZ2h0TGk7XHJcblxyXG4gICAgICBpbWFnZXMgICAgID0gaW1hZ2VMaXN0LmZpbmQoJ2xpJyk7XHJcbiAgICAgIGFyckxlbmdodCAgPSBpbWFnZXMubGVuZ3RoO1xyXG4gICAgICBib3R0b24gICAgID0gJChldnQuY3VycmVudFRhcmdldCkuYXR0cignY2xhc3MnKTtcclxuICAgICAgcHJldiAgICAgICA9ICQoJy5zbGlkZXJfX2J1dHRvbnMnKTtcclxuICAgICAgcHJldkxlZnQgICA9IHByZXYuZmluZCgnLnNsaWRlcl9fYm90dG9tLXByZXZpZXcgbGknKTtcclxuICAgICAgcHJldlJpZ2h0ICA9IHByZXYuZmluZCgnLnNsaWRlcl9fdG9wLXByZXZpZXcgbGknKTtcclxuICAgICAgcHJldjFMZWZ0ICA9ICQocHJldkxlZnRbMV0pO1xyXG4gICAgICBwcmV2MkxlZnQgID0gJChwcmV2TGVmdFswXSk7XHJcbiAgICAgIHByZXYxUmlnaHQgPSAkKHByZXZSaWdodFsxXSk7XHJcbiAgICAgIHByZXYyUmlnaHQgPSAkKHByZXZSaWdodFswXSk7XHJcbiAgICAgICAgXHJcbiAgICAgIC8v0YPQt9C90LDQtdC8INGC0LXQutGD0YnQuNC5INC4INGB0LvQtdC00YPRjtGJ0LjQuSDQtdC70LXQvNC10L3RgtGLINC/0YDQtdCy0YzRjtGFLCDRgtC10LrRg9GJ0LjQuSDRgtC+0YIg0YfRgtC+INCy0LjQtNC40LwsINCwINGB0LvQtdC00YPRjtGJ0LjQudC10LvQtdC80LXQvdGCINGC0L7RgiDRh9GC0L4g0L/QvtC60LAg0YfRgtC+INGB0LrRgNGL0YIgXHJcbiAgICAgIGlmIChwcmV2MUxlZnQucG9zaXRpb24oKS50b3AgPiBwcmV2MkxlZnQucG9zaXRpb24oKS50b3ApIHtcclxuICAgICAgICBjdXJyZW50TGVmdExpID0gcHJldjFMZWZ0O1xyXG4gICAgICAgIG5leHRMZWZ0TGkgPSBwcmV2MkxlZnQ7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIGN1cnJlbnRMZWZ0TGkgPSBwcmV2MkxlZnQ7XHJcbiAgICAgICAgbmV4dExlZnRMaSA9IHByZXYxTGVmdDtcclxuICAgICAgfVxyXG4gICAgICAvL9Ch0LvQtdC00YPRjtGJ0LjQuSDQtdC70LXQvNC10L3RgiDRgSDQu9C10LLQsCDQt9C90LDRh9C10L3QuNC1INC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXHJcbiAgICAgIG5leHRMZWZ0TGkgPSBuZXdTcmMobmV4dExlZnRMaSwgaW1hZ2VzW2FyckxlbmdodC0yXSk7XHJcbiAgICAgIC8v0LXRgdC70Lgg0L3QsNC20LDQuyDQutC90L7Qv9C60YMg0L3QsNC30LDQtCDQvtC90LAg0LbQtSDQsiDQvdC40LdcclxuICAgICAgZnVuY3Rpb24gYmFjaygpe1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIC8v0L/QtdGA0LXQutC40L3QtdC8INC40LfQvtCx0YDQsNC20LXQvdC40LUg0YEg0LrQvtC90LAg0LIg0L3QsNGH0LDQu9C+XHJcbiAgICAgICAgICBpbWFnZUxpc3QucHJlcGVuZChpbWFnZXNbYXJyTGVuZ2h0LTFdKTtcclxuICAgICAgICAgIGltYWdlTGlzdC50b2dnbGVDbGFzcygnb3BhY2l0eScpO1xyXG4gICAgICAgIH0sIHRpbWVvdXQvMik7XHJcbiAgICAgICAgY2hhbmdlUHJldmlldyhjdXJyZW50TGVmdExpLCBuZXh0TGVmdExpLCAnYm90dG9tJywgaW1hZ2VzW2FyckxlbmdodC0zXSk7XHJcbiAgICAgIH1cclxuICAgICAgLy/Rg9C30L3QsNC10Lwg0YLQtdC60YPRidC40Lkg0Lgg0YHQu9C10LTRg9GO0YnQuNC5INC10LvQtdC80LXQvdGC0Ysg0L/RgNC10LLRjNGO0YUsINGC0LXQutGD0YnQuNC5INGC0L7RgiDRh9GC0L4g0LLQuNC00LjQvCwg0LAg0YHQu9C10LTRg1xyXG4gICAgICAvL9GD0LfQvdCw0LXQvCDRgtC10LrRg9GJ0LjQuSDQuCDRgdC70LXQtNGD0Y7RidC40Lkg0LXQu9C10LzQtdC90YLRiyDQv9GA0LXQstGM0Y7RhSwg0YLQtdC60YPRidC40Lkg0YLQvtGCINC60L7RgtC+0YDRi9C5INC90LAg0LLQuNC00YMsINCwINGB0LvQtdC00YPRjtGJ0LjQudC10LvQtdC80LXQvdGCINGC0L7RgiDRh9GC0L4g0L/QvtC60LAg0YfRgtC+INGB0LrRgNGL0YJcclxuICAgICAgaWYgKHByZXYxUmlnaHQucG9zaXRpb24oKS50b3AgPCBwcmV2MlJpZ2h0LnBvc2l0aW9uKCkudG9wKSB7XHJcbiAgICAgICAgY3VycmVudFJpZ2h0TGkgPSBwcmV2MVJpZ2h0O1xyXG4gICAgICAgIG5leHRSaWdodExpID0gcHJldjJSaWdodDtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgY3VycmVudFJpZ2h0TGkgPSBwcmV2MlJpZ2h0O1xyXG4gICAgICAgIG5leHRSaWdodExpID0gcHJldjFSaWdodDtcclxuICAgICAgfVxyXG4gICAgICAvL9Ch0LvQtdC00YPRjtGJ0LjQuSDQtdC70LXQvNC10L3RgiDRgSDQv9GA0LDQstCwINC30L3QsNGH0LXQvdC40LUg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cclxuICAgICAgbmV4dFJpZ2h0TGkgPSBuZXdTcmMobmV4dFJpZ2h0TGksIGltYWdlc1syXSk7XHJcbiAgICAgIC8v0LXRgdC70Lgg0L3QsNC20LDQuyDQstC/0LXRkdC0INC+0L3QsCDQttC1INCy0LLQtdGA0YVcclxuICAgICAgZnVuY3Rpb24gZm9yd2FyZCgpe1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIC8v0L/QtdGA0LXQutC40L3QtdC8INC40LfQvtCx0YDQsNC20LXQvdC40LUg0YEg0L3QsNGH0LDQu9CwINCyINC60L7QvdC10YZcclxuICAgICAgICAgIGltYWdlTGlzdC5hcHBlbmQoaW1hZ2VzWzBdKTtcclxuICAgICAgICAgIGltYWdlTGlzdC50b2dnbGVDbGFzcygnb3BhY2l0eScpO1xyXG4gICAgICAgIH0sIHRpbWVvdXQvMik7XHJcbiAgICAgICAgY2hhbmdlUHJldmlldyhjdXJyZW50UmlnaHRMaSwgbmV4dFJpZ2h0TGksICd0b3AnLCBpbWFnZXNbM10pO1xyXG4gICAgICB9ICAgXHJcbiAgLy/QvNC10L3Rj9C10Lwg0LPQu9Cw0LLQvdC+0LUg0LjQt9C+0LHRgNCw0LbQtdC90LjQtVxyXG4gICAgICBmdW5jdGlvbiBjaGFuZ2VNYWluSW1hZ2UoKXtcclxuICAgICAgICBpbWFnZUxpc3QudG9nZ2xlQ2xhc3MoJ29wYWNpdHknKTtcclxuICAgICAgICBpZiAoYm90dG9uID09ICdzbGlkZXJfX2J1dHRvbnMtYm90dG9tJykge1xyXG4gICAgICAgICAgYmFjaygpO1xyXG4gICAgICAgICAgY2hhbmdlRGVzY3JpcHRpb24oYXJyTGVuZ2h0LTEpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgZm9yd2FyZCgpO1xyXG4gICAgICAgICAgY2hhbmdlRGVzY3JpcHRpb24oMSk7XHJcbiAgICAgICAgfSBcclxuICAgICAgfSAgXHJcbiAgLy/QvNC10L3Rj9C8INC/0YDQtdCy0Y7RhdGDINC/0LDRgNCw0LzQtdGC0YDRizog0YLQtdC60YPRidCw0Y8g0LvQuCwg0YHQu9C10LTRg9GO0YnQsNGPINGC0LAg0L3QsCDQutC+0YLQvtGA0YPRjiDRgdC10YfQsNGBINC30LDQvNC10L3QtdGC0YHRjyDRgtC10LrRg9GJ0LDRjywg0L3QsNC/0YDQsNCy0LvQtdC90LjQtSDQtNCy0LjQttC10L3QuNGPINCw0L3QuNC80LDRhtGL0LgsXHJcbiAgLy/QvdC+0LLQsNGPINC70Lgg0YLQvtC10YHRgtGMINGBINC90L7QstGL0Lwg0LjQt9C+0LHRgNCw0LbQtdC90LjQtdC8INC4INCy0L7Qt9C80L7QttC90L4g0L7Qv9C40YHQsNC90LjQtdC8INC+0L3QsCDQt9Cw0LzQtdC90LXRgiDRgtGDINC70Lgg0LrQvtGC0L7RgNGD0Y4g0LzRiyDRgdC00LLQuNC90LjQvCDQuNC3INC30L7QvdGLINCy0LjQtNC40LzQvtGB0YLQuFxyXG4gICAgICBmdW5jdGlvbiBjaGFuZ2VQcmV2aWV3KGN1cnJlbnRMaSwgbmV4dExpLCBkaXJlY3Rpb24sIG5ld0xpKXsgIFxyXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT0gJ2JvdHRvbScpIHtcclxuICAgICAgICAgIG1vdmUoJ2JvdCcpO1xyXG4gICAgICAgICAgcHJld0JhY2soJ2xlZnQnKTtcclxuICAgICAgICAgICAvLyDQutC70LjQutC90YPQu9C4INC/0L4g0LvQtdCy0L7QuSDQutC90L7Qv9C60LUg0LfQvdCw0YfQuNGCINC80LXQvdGP0LXQvCDQt9C90LDRh9C10L3QuNGPINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC00LvRjyDRgdC70LXQtNGD0Y7RidC40LPQviDQtdC70LXQvNC10L3RgtCwINC/0YDQsNCy0L7QuSDQutC90L7Qv9C60LVcclxuICAgICAgICAgIG5leHRSaWdodExpID0gbmV3U3JjKG5leHRSaWdodExpLCBpbWFnZXNbMF0pO1xyXG4gICAgICAgICAgbW92ZSgndG9wJywgY3VycmVudFJpZ2h0TGksIG5leHRSaWdodExpKTtcclxuICAgICAgICAgIHByZXdCYWNrKCdyaWdodCcsIGN1cnJlbnRSaWdodExpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSAndG9wJykge1xyXG4gICAgICAgICAgbW92ZSgndG9wJyk7XHJcbiAgICAgICAgICBwcmV3QmFjaygncmlnaHQnKTtcclxuICAgICAgICAgIC8vINC60LvQuNC60L3Rg9C70Lgg0L/QviDQv9GA0LDQstC+0Lkg0LrQvdC+0L/QutC1INC30L3QsNGH0LjRgiDQvNC10L3Rj9C10Lwg0LfQvdCw0YfQtdC90LjRjyDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDQtNC70Y8g0YHQu9C10LTRg9GO0YnQuNCz0L4g0LXQu9C10LzQtdC90YLQsCDQvdCwINC70LXQstC+0Lkg0LrQvdC+0L/QutC1XHJcbiAgICAgICAgICBuZXh0TGVmdExpID0gbmV3U3JjKG5leHRMZWZ0TGksIGltYWdlc1swXSk7XHJcbiAgICAgICAgICBtb3ZlKCdib3QnLCBjdXJyZW50TGVmdExpLCBuZXh0TGVmdExpKTtcclxuICAgICAgICAgIHByZXdCYWNrKCdsZWZ0JywgY3VycmVudExlZnRMaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v0LLQvtC30LLRgNCy0YnQsNC10YIg0YHQutGA0YvRgtC+0LUg0L/RgNC10LLRjiDQvdCwINGB0YLQsNGA0YLQvtCy0L7RjiDQv9C+0LfQuNGG0YvRjiwg0L/QsNGA0LDQvNC10YLRgNGLINC60LDQutC+0LUg0L/RgNC10LLRjNGOINC70LXQstC+0LUg0LjQu9C4INC/0YDQsNCy0L7QtSwg0Lgg0L3QtSDQvtCx0LXQt9Cw0YLQtdC70YzQvdGL0Lkg0YLQtdC60YPRidC40LnRjdC70LXQvNC90YJcclxuICAgICAgICBmdW5jdGlvbiBwcmV3QmFjayhwcmV2LCBjdXJyZW50RWxlbWVudCl7XHJcbiAgICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRMaTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmIChwcmV2ID09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gbmV3U3JjKGN1cnJlbnRFbGVtZW50LCBuZXdMaSk7XHJcbiAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQuY3NzKHsndHJhbnNpdGlvbi1kdXJhdGlvbic6JzBtcycsICd0cmFuc2Zvcm0nOid0cmFuc2xhdGVZKDApJ30pO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZiAocHJldiA9PSAncmlnaHQnKSB7XHJcbiAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSBuZXdTcmMoY3VycmVudEVsZW1lbnQsIG5ld0xpKTtcclxuICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudC5jc3Moeyd0cmFuc2l0aW9uLWR1cmF0aW9uJzonMG1zJywgJ3RyYW5zZm9ybSc6J3RyYW5zbGF0ZVkoMTAwJSknfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sIHRpbWVvdXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBtb3ZlKGRpcmVjdGlvbiwgY3VycmVudEVsZW1lbnQsIG5leHRFbGVtZW50KXtcclxuICAgICAgICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gdW5kZWZpbmVkIHx8IG5leHRFbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50TGk7XHJcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gbmV4dExpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbmV4dEVsZW1lbnQuY3NzKHsndHJhbnNpdGlvbi1kdXJhdGlvbic6dGltZW91dCsnbXMnfSk7XHJcbiAgICAgICAgICBpZiAoZGlyZWN0aW9uID09ICdib3QnKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LmNzcyh7J3RyYW5zZm9ybSc6J3RyYW5zbGF0ZVkoMjAwJSknfSk7XHJcbiAgICAgICAgICAgIG5leHRFbGVtZW50LmNzcyh7J3RyYW5zZm9ybSc6J3RyYW5zbGF0ZVkoMTAwJSknfSk7XHJcbiAgICAgICAgICB9ZWxzZSBpZihkaXJlY3Rpb24gPT0gJ3RvcCcpe1xyXG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudC5jc3Moeyd0cmFuc2Zvcm0nOid0cmFuc2xhdGVZKC0xMDAlKSd9KTtcclxuICAgICAgICAgICAgbmV4dEVsZW1lbnQuY3NzKHsndHJhbnNmb3JtJzondHJhbnNsYXRlWSgwKSd9KTsgIFxyXG4gICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAvL9GE0YPQvdC60YbQuNGPINC80LXQvdGP0LXRgiDQutCw0YLRgNC40L3QutGDINC4IGgxINCyIGxpINGN0LvQtdC80LXQvdGC0YLQtVxyXG4gICAgICBmdW5jdGlvbiBuZXdTcmMob2xkTGksIG5ld0xpKXtcclxuICAgICAgICB2YXJcclxuICAgICAgICAgIHRtcFNyYyA9ICQobmV3TGkpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpLFxyXG4gICAgICAgICAgdG1wSDEgPSAkKG5ld0xpKS5maW5kKCdoMScpLmh0bWwoKTtcclxuICAgICAgICAvL9C30LDQvNC10L3QuNC8INCw0LTRgNC10YEg0Log0LrQsNGA0YLQuNC90LrQtVxyXG4gICAgICAgIG9sZExpLmZpbmQoJ2ltZycpLmF0dHIoeydzcmMnOnRtcFNyY30pO1xyXG4gICAgICAgIC8v0LfQsNC80LXQvdC40Lwg0LrQvtC90YLQtdC90YIg0LIgaDFcclxuICAgICAgICBvbGRMaS5maW5kKCdoMScpLmh0bWwodG1wSDEpO1xyXG4gICAgICAgIHJldHVybiBvbGRMaTtcclxuICAgICAgfVxyXG4gICAgICBjaGFuZ2VNYWluSW1hZ2UoKTtcclxuICAgIH1cclxuICB9KSgpO1xyXG59O1xufSx7fV19LHt9LFsxXSk7XG4iXSwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
