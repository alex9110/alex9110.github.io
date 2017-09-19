'use strict';
$(document).ready(function () {
  ///////////////////////preloader/////////////////////////////
  $(function () {
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
  });
  ///////////////////////preloader/////////////////////////////
  ////////////////// плавный скрол ///////////////////////////
  $('a[href^="#"]').click(function(){
    var elementClick = $(this).attr('href');
    var destination = $(elementClick).offset().top;  //узнаем место назначения 
    $('html, body').animate({scrollTop: destination}, 1000);  //двигаем к ниму
    return false;                     
  });
  ////////////////// плавный скрол ///////////////////////////
  ////////////////////////перевернуть плашку//////////////////////////////////
  $('#to-main-but, #authorization-button').on('click',function(){
    $('#plate').toggleClass('plate-front');
  });
////////////////////////////перевернуть плашку////////////////////////////
//////////////////////////код страницы блога/////////////////////////////////
  (function(){
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
  })();
  
  //////////////////////////код страницы блога/////////////////////////////////

  ///////////////////////start portfolio header///////////////////////////
  (function(){
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
  })();
  ///////////////////////end portfolio header///////////////////////////

   /////////////////////////////анимирования текста в слайдере///////////////////////////////
   
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
   /////////////////////////////конец анимирования текста в слайдере///////////////////////////////

  /////////////////////////start slider/////////////////////////////////
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
  
   ////////////////////////end slider/////////////////////////////////

   ///////////////////////////psrallax//////////////////////////
  (function () {
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
  })();  
  ///////////////////////////psrallax//////////////////////////

//////////////////////////skills//////////////////////////
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
  //////////////////////////skills//////////////////////////

  /////////////////////////pop_up//////////////////////////
  function popUp(message, time){
    if (time == undefined) {time = 5000;}
    $('#pop_up-content').html(message);
    $('#pop_up').addClass('show');
    setTimeout(function(){
      $('#pop_up').removeClass('show');
    }, time);
  }

  (function(){
    $('#pop_up-button').on('click', function(){
      $('#pop_up').removeClass('show');
    });
  })();

  /////////////////////////pop_up//////////////////////////

  //берёт данные с формы полученой в качестве параметра и сформируем двух уровевый массив дднных для отправки на сервер
  function getData(form){
    var
      formId = form.attr('id'),
      inputs = form.find('input, textarea'),
      data = [['formId', formId]];
    inputs.each(function(){
      var that = $(this), curentData = [that.attr('id'), that.val().trim()];
      data[data.length] = curentData;
    });
    return data;
  }

  function clear(form){
    var inputs = form.find('input, textarea');

    inputs.each(function(){
      $(this).val('');
    });
  }

  /////////////////////////form of communication////////////////

  (function(){
    var formBox = $('#contact-form-box');
    if (formBox.length < 1) {return;}
    var
      form = formBox.find('#contact-form'),
      buttons = formBox.find('.contact-form__buttons');

    buttons.on('click', function(evt){
      if ( $(evt.target).attr('id') === 'send-message' ) {
        var data = getData(form);
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
            popUp('УСПЕШНО ОТПРАВЛЕНО!', 3000);
            clear(form);
          }

        }else{popUp(errors);}
        
      }else if($(evt.target).attr('id') === 'reset'){
        clear(form);
      }
    });
  })();


  /////////////////////////form of communication////////////////

  ////////////////////////////admin////////////////////////////

  (function(){
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
    
  })();
  ////////////////////////////admin////////////////////////////

////////////////////////форма входа//////////////////////////////
  (function(){
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
        popUp(message);
        return false;
      }
      //дале работа за сервером
    });
  })();
  //удалик фрейм с картой на мобильных
  if ($(window).width() <= 416) {
    $('.section-contacts iframe').remove();
  }
  ////////////////////////форма входа//////////////////////////////
  /////////////////////////Админ//////////////////////////
  (function(){
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
        popUp('сохранено', 1500);
      }else{popUp(errors);}
      var data = getData(formAboutMe);

      console.log(data);
    });
    formBlog.find('#admin-blog__save').on('click', function(){
      var errors = [];
      if (errors.length<1) {
        popUp('сохранено', 1500);
      }else{popUp(errors);}
      var data = getData(formBlog);

      console.log(data);
    });
    formWorks.find('#admin-works__save').on('click', function(){
      var errors = [];
      if (errors.length<1) {
        popUp('сохранено', 1500);
      }else{popUp(errors);}
      var data = getData(formWorks);

      console.log(data);

    });
  })();
  /////////////////////////Админ//////////////////////////

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vcHJlbG9hZGVyLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnLmFib3V0LXdyYXBwZXIsIC5ibG9nLXdyYXBwZXIsIC5pbmRleC13cmFwcGVyLCAud29ya3Mtd3JhcHBlciwgLmFkbWluLXdyYXBwZXInKS5jc3MoeydkaXNwbGF5Jzonbm9uZSd9KTtcbiAgICB2YXIgaW1ncyA9IFtdO1xuICAgICQuZWFjaCgkKCcqJyksIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgIGJhY2tncm91bmQgPSAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKSxcbiAgICAgICAgaW1nID0gJHRoaXMuaXMoJ2ltZycpO1xuICAgICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKSB7XG4gICAgICAgIHZhciBwYXRoID0gYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInLCAnJykucmVwbGFjZSgnXCIpJywgJycpO1xuXG4gICAgICAgIGltZ3MucHVzaChwYXRoKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbWcpIHtcbiAgICAgICAgcGF0aCA9ICR0aGlzLmF0dHIoJ3NyYycpO1xuICAgICAgICBpbWdzLnB1c2gocGF0aCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdmFyIHBlcmNlbnRzID0gMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpbWFnZSA9ICQoJzxpbWc+Jywge1xuICAgICAgICBhdHRyOiB7XG4gICAgICAgICAgc3JjIDogaW1nc1tpXVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGltYWdlLmxvYWQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRQZXJjZW50cyhpbWdzLmxlbmd0aCwgcGVyY2VudHMpO1xuICAgICAgICBwZXJjZW50cysrO1xuICAgICAgfSk7XG4gICAgICBpbWFnZS5lcnJvcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldFBlcmNlbnRzKGltZ3MubGVuZ3RoLCBwZXJjZW50cyk7XG4gICAgICAgIHBlcmNlbnRzKys7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy/QldCh0JvQmCDQmtCQ0KDQotCY0J3QntCaINCd0JXQoiBcbiAgICBpZihpbWdzLmxlbmd0aCA9PT0gMCl7XG4gICAgICBzZXRQZXJjZW50cygxLDEpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRQZXJjZW50cyh0b3RhbCwgY3VycmVudCkge1xuICAgICAgdmFyIHBlcmNlbnQgPSBNYXRoLmNlaWwoY3VycmVudCAvIHRvdGFsICogMTAwKTtcbiAgICAgIGlmIChwZXJjZW50ID49IDEwMCkge1xuICAgICAgICAkKCcuYWJvdXQtd3JhcHBlciwgLmJsb2ctd3JhcHBlciwgLmluZGV4LXdyYXBwZXIsIC53b3Jrcy13cmFwcGVyLCAuYWRtaW4td3JhcHBlcicpLmNzcyh7J2Rpc3BsYXknOidibG9jayd9KTtcbiAgICAgICAgJCgnLnBsYXRlLWZyb250JykuYWRkQ2xhc3MoJ2FuaW1hdGVfcGxhdGUnKTtcbiAgICAgICAgJCgnLmxvYWRlci13cmFwcGVyJykuZmFkZU91dCgxNTAwLCBmdW5jdGlvbigpe1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJy5wbGF0ZS1mcm9udCcpLnJlbW92ZUNsYXNzKCdhbmltYXRlX3BsYXRlJyk7XG4gICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgJCgnLmxvYWRlcl9fcGVyY2VudCcpLnRleHQocGVyY2VudCArICclJyk7XG4gICAgfVxuICB9KTtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9wcmVsb2FkZXIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLy8vLy8vLy8vLy8vLy8vLy8g0L/Qu9Cw0LLQvdGL0Lkg0YHQutGA0L7QuyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgJCgnYVtocmVmXj1cIiNcIl0nKS5jbGljayhmdW5jdGlvbigpe1xuICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICB2YXIgZGVzdGluYXRpb24gPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wOyAgLy/Rg9C30L3QsNC10Lwg0LzQtdGB0YLQviDQvdCw0LfQvdCw0YfQtdC90LjRjyBcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBkZXN0aW5hdGlvbn0sIDEwMDApOyAgLy/QtNCy0LjQs9Cw0LXQvCDQuiDQvdC40LzRg1xuICAgIHJldHVybiBmYWxzZTsgICAgICAgICAgICAgICAgICAgICBcbiAgfSk7XG4gIC8vLy8vLy8vLy8vLy8vLy8vLyDQv9C70LDQstC90YvQuSDRgdC60YDQvtC7IC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/Qv9C10YDQtdCy0LXRgNC90YPRgtGMINC/0LvQsNGI0LrRgy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgJCgnI3RvLW1haW4tYnV0LCAjYXV0aG9yaXphdGlvbi1idXR0b24nKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgJCgnI3BsYXRlJykudG9nZ2xlQ2xhc3MoJ3BsYXRlLWZyb250Jyk7XG4gIH0pO1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9C/0LXRgNC10LLQtdGA0L3Rg9GC0Ywg0L/Qu9Cw0YjQutGDLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/QutC+0LQg0YHRgtGA0LDQvdC40YbRiyDQsdC70L7Qs9CwLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIChmdW5jdGlvbigpe1xuICAgIHZhclxuICAgICAgbm90X2ZpeGVkID0gdHJ1ZSxcbiAgICAgIGFycm93X25vbmUgPSB0cnVlLFxuICAgICAgdGFyZ2V0ID0gJCgnI3NlY3Rpb24tYXJ0aWNsZXMnKSxcbiAgICAgIGFydGljbGVzID0gJCgnLmFydGljbGUnKSxcbiAgICAgIGFzaWRlSXRlbSA9ICQoJy5ibG9nX2FzaWRlX19pdGVtJyksXG4gICAgICBhc2lkZUxpc3QgPSAkKCcuYmxvZ19hc2lkZV9fbGlzdCcpLFxuICAgICAgYXNpZGUgPSAkKCcuYmxvZ19hc2lkZScpLFxuICAgICAgYXNpZGVMb2lzdEJ1dHRvbiA9IGFzaWRlTGlzdC5maW5kKCcjYmxvZ19hc2lkZV9fbGlzdF9idXR0b24nKSxcbiAgICAgIHdpbkhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKSxcbiAgICAgIHdpblNjcm9sbFRvcCA9ICcnO1xuICAgICAgXG4gICAgaWYgKHRhcmdldC5sZW5ndGggPiAwKSB7XG4gICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHdpblNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgZml4ZXRfbmF2KCk7XG4gICAgICAgIGluV2luZG93KGFydGljbGVzLCBhc2lkZUl0ZW0pO1xuICAgICAgICBzaG93QXJyb3coKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvL9C/0L7Qt9GL0YbRi9C+0L3QuNGA0L7QstCw0L3QuNC1INC90LDQstC40LPQsNGG0LjQuFxuICAgIGZ1bmN0aW9uIGZpeGV0X25hdigpe1xuICAgICBcbiAgICAgIHZhciB0YXJnZXRQb3MgPSB0YXJnZXQub2Zmc2V0KCkudG9wO1xuXG4gICAgICBpZih3aW5TY3JvbGxUb3AgPj0gdGFyZ2V0UG9zICYmIG5vdF9maXhlZCl7XG4gICAgICAgIHZhciB0b3AgPSAkKGFzaWRlTGlzdCkucG9zaXRpb24oKS50b3A7XG4gICAgICAgIHZhciBsZWZ0ID0gJChhc2lkZUxpc3QpLm9mZnNldCgpLmxlZnQ7XG4gICAgICAgICQoYXNpZGVMaXN0KS5jc3Moeydwb3NpdGlvbic6J2ZpeGVkJywgJ3RvcCc6IHRvcCsncHgnLCAnbGVmdCc6IGxlZnQrJ3B4J30pO1xuICAgICAgICBub3RfZml4ZWQgPSBmYWxzZTtcbiAgICAgIH1lbHNlIGlmKHdpblNjcm9sbFRvcCA8IHRhcmdldFBvcyAmJiAhbm90X2ZpeGVkKSB7XG4gICAgICAgICQoYXNpZGVMaXN0KS5jc3Moeydwb3NpdGlvbic6J3N0YXRpYyd9KTtcbiAgICAgICAgbm90X2ZpeGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vL2fQv9C+0LrQsNC30LDRgtGMINGB0LrRgNGL0YLRjCDQsdC+0LrQvtCy0L7QtSDQvNC10L3Rji8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgYXNpZGVMb2lzdEJ1dHRvbi5jbGljayhmdW5jdGlvbigpe1xuICAgICAgdmFyIGxlZnQgPSBwYXJzZUludCggYXNpZGUuY3NzKCdsZWZ0JykgKTtcbiAgICAgIGlmIChsZWZ0PDApIHtcbiAgICAgICAgYXNpZGVMaXN0LmNzcyh7J2xlZnQnOicwcHgnfSk7XG4gICAgICAgIGFzaWRlLmNzcyh7J2xlZnQnOiAnMCd9KTtcbiAgICAgIH1lbHNle1xuICAgICAgICBhc2lkZUxpc3QuY3NzKHsnbGVmdCc6Jy0zMDBweCd9KTtcbiAgICAgICAgYXNpZGUuY3NzKHsnbGVmdCc6ICctMzAwcHgnfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vL2fQv9C+0LrQsNC30LDRgtGMINGB0LrRgNGL0YLRjCDQsdC+0LrQvtCy0L7QtSDQvNC10L3Rji8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvL9C/0L7QutCw0LfQsNGC0Ywg0YHQutGA0YvRgtGMINGB0YLRgNC10LvQutGDINCy0LLQtdGA0YVcbiAgICBmdW5jdGlvbiBzaG93QXJyb3coKXtcbiAgICAgIGlmICh3aW5IZWlnaHQgPD0gd2luU2Nyb2xsVG9wICYmIGFycm93X25vbmUpIHtcbiAgICAgICAgJCgnLmFycm93LXRvcCcpLmNzcyh7J2Rpc3BsYXknOidibG9jayd9KTtcbiAgICAgICAgYXJyb3dfbm9uZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZih3aW5IZWlnaHQgPiB3aW5TY3JvbGxUb3AgJiYgIWFycm93X25vbmUpe1xuICAgICAgICAkKCcuYXJyb3ctdG9wJykuY3NzKHsnZGlzcGxheSc6J25vbmUnfSk7XG4gICAgICAgIGFycm93X25vbmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICAvL9C/0L7QutGA0LDRgdC40YIg0LXQu9C10LzQtdC90YIg0L3QsNCy0LjQs9Cw0YbQuNC+0L3QvdC+0LPQviDQvNC10L3RjiDQutC+0YLQvtGA0YvQuSDRgdC+0YLQstC10YLRgdGC0LLRg9C10YIg0YLQtdC60YPRidC10Lkg0YHRgtCw0YLQuFxuICAgIHZhciBzYXZlZEluZGV4TnVtYmVyID0gMCwgY3VycmVudEluZGV4TnVtYmVyID0gMDtcbiAgICBmdW5jdGlvbiBpbldpbmRvdyhhcnRpY2xlcywgYXNpZGVJdGVtKXtcbiAgICAgIHZhclxuICAgICAgICBpbmRlbnQgPSBwYXJzZUludCggJChhcnRpY2xlc1swXSkuY3NzKCdtYXJnaW4tYm90dG9tJykgKSxcbiAgICAgICAgY3VycmVudEVscyA9ICQoYXJ0aWNsZXMpLFxuICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgb2Zmc2V0VG9wO1xuXG4gICAgICBjdXJyZW50RWxzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSAkKHRoaXMpO1xuICAgICAgICBvZmZzZXRUb3AgPSBlbGVtZW50Lm9mZnNldCgpLnRvcDtcbiAgICAgICAgb2Zmc2V0VG9wID0gcGFyc2VJbnQob2Zmc2V0VG9wKTtcbiAgICAgICAgaWYoIHdpblNjcm9sbFRvcCtpbmRlbnQqMiA+IG9mZnNldFRvcCApe1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMpO1xuICAgICAgICAgIGN1cnJlbnRJbmRleE51bWJlciA9IHJlc3VsdC5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICggc2F2ZWRJbmRleE51bWJlciAhPT0gY3VycmVudEluZGV4TnVtYmVyKSB7XG4gICAgICAgIHNhdmVkSW5kZXhOdW1iZXIgPSBjdXJyZW50SW5kZXhOdW1iZXI7XG4gICAgICAgICQoYXNpZGVJdGVtKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICQoYXNpZGVJdGVtW2N1cnJlbnRJbmRleE51bWJlcl0pLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pKCk7XG4gIFxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9C60L7QtCDRgdGC0YDQsNC90LjRhtGLINCx0LvQvtCz0LAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vL3N0YXJ0IHBvcnRmb2xpbyBoZWFkZXIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgKGZ1bmN0aW9uKCl7XG4gICAgdmFyXG4gICAgICB0cmFuc2l0aW9uID0gMzAwLFxuICAgICAgbWVudUJ1dHRvbiA9ICQoJyNtZW51LWJ1dHRvbicpO1xuXG4gICAgbWVudUJ1dHRvbi5jbGljayhmdW5jdGlvbigpe1xuICAgICAgdmFyIGNsb3NlID0gJCgnLmN1cnRhaW4tbGVmdCcpLmhhc0NsYXNzKCdjbG9zZUN1cnRhaW5zTCcpO1xuICAgICAgaWYoY2xvc2Upe1xuICAgICAgICBjbG9zZV9tZW51KCk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgc2hvd19tZW51KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gY2xvc2VfbWVudSgpe1xuICAgICAgbWVudUJ1dHRvbi5yZW1vdmVDbGFzcygnbWVudS1idXR0b24tY2xvc2UnKTtcbiAgICAgICQoJy5jdXJ0YWluLWxlZnQsIC5jdXJ0YWluLXJpZ2h0LCAjbWFpbi1uYXYnKS5jc3MoeydvcGFjaXR5JzowfSk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJy5jdXJ0YWluLWxlZnQnKS5yZW1vdmVDbGFzcygnY2xvc2VDdXJ0YWluc0wnKTtcbiAgICAgICAgJCgnLmN1cnRhaW4tcmlnaHQnKS5yZW1vdmVDbGFzcygnY2xvc2VDdXJ0YWluc1InKTtcbiAgICAgICAgJCgnI21haW4tbmF2JykucmVtb3ZlQ2xhc3MoJ2Jsb2NrJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKCcuY3VydGFpbi1sZWZ0LCAuY3VydGFpbi1yaWdodCwgI21haW4tbmF2JykuY3NzKHsnb3BhY2l0eSc6MX0pO1xuICAgICAgICB9LCB0cmFuc2l0aW9uKTsgXG4gICAgICB9LCB0cmFuc2l0aW9uKTtcbiAgICB9XG4gICAgdmFyXG4gICAgICBhcnIgPSAkKCcubWFpbi1uYXYtbGlzdC1pdGVtJyksXG4gICAgICBhcnJfbGVuZ3RoID0gYXJyLmxlbmd0aDtcblxuICAgIGZ1bmN0aW9uIHNob3dfbWVudSgpe1xuICAgICAgbWVudUJ1dHRvbi5hZGRDbGFzcygnbWVudS1idXR0b24tY2xvc2UnKTtcbiAgICAgICQoYXJyKS5maW5kKCdhJykuY3NzKHsndHJhbnNmb3JtJzogJ3NjYWxlKDApJywgJ3RyYW5zaXRpb24tZHVyYXRpb24nOnRyYW5zaXRpb24rJ21zJ30pO1xuICAgICAgdmFyIGN1cnJlbnQgPSAwO1xuICAgICAgJCgnLmN1cnRhaW4tbGVmdCcpLmFkZENsYXNzKCdjbG9zZUN1cnRhaW5zTCcpO1xuICAgICAgJCgnLmN1cnRhaW4tcmlnaHQnKS5hZGRDbGFzcygnY2xvc2VDdXJ0YWluc1InKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnI21haW4tbmF2JykuYWRkQ2xhc3MoJ2Jsb2NrJyk7XG4gICAgICAgIHZhciB0aW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiAgICAgICAgICB2YXIgYSA9ICQoYXJyW2N1cnJlbnRdKS5maW5kKCdhJyk7XG4gICAgICAgICAgYS5jc3Moeyd0cmFuc2Zvcm0nOidzY2FsZSgxKSd9KTtcbiAgICAgICAgICBpZiAoY3VycmVudCA+PSBhcnJfbGVuZ3RoLTEpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudCsrO1xuICAgICAgICB9LCB0cmFuc2l0aW9uLzIpOyBcblxuICAgICAgfSwgdHJhbnNpdGlvbik7XG4gICAgfVxuICB9KSgpO1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vL2VuZCBwb3J0Zm9saW8gaGVhZGVyLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v0LDQvdC40LzQuNGA0L7QstCw0L3QuNGPINGC0LXQutGB0YLQsCDQsiDRgdC70LDQudC00LXRgNC1Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgXG4gIHZhciB0aW1lb3V0ID0gNjAwO1xuICAoZnVuY3Rpb24oKXtcbiAgICB2YXJcbiAgICAgIGRlc2NyaXB0aW9ucyA9ICQoJy5zbGlkZXJfX2ltYWdlLWRlc2NyaXB0aW9uJyksXG4gICAgICB0aXRsZXMgPSBkZXNjcmlwdGlvbnMuZmluZCgnaDInKSxcbiAgICAgIHRlY2hub2xvZ2lzdHMgPSBkZXNjcmlwdGlvbnMuZmluZCgncCcpO1xuICAgICAgLy/RhNGD0L3QutGG0LjRjyDQv9C+0LTQs9C+0YLQvtCy0LjRgiDRgtC10LrRgdGCINC6INCw0L3QuNC80LDRhtC40Lgg0L/QvtGA0YPQsdCw0LXRgiDQvdCwINC+0YLQtNC10LvRjNC90YvQtSDQsdGD0LrQstGLINCy0YHQtSDRh9GC0L4g0L3QsNC00L5cbiAgICBmdW5jdGlvbiBmcmFjdGlvbihlKXtcbiAgICAgIGUuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgaXRlbS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdmFyXG4gICAgICAgICAgICB0aGF0ID0gJCh0aGlzKSxcbiAgICAgICAgICAgIHN0cmluZyA9IHRoYXQudGV4dCgpO1xuICAgICAgICAgIHRoYXQuaHRtbChzdHJpbmcucmVwbGFjZSgvLi9nLCAnPHNwYW4gY2xhc3M9XCJsZXR0ZXJcIj4kJjwvc3Bhbj4nKSk7XG4gICAgICAgICAgLy/Qv9GA0LjRgdCy0L7QtdC8INC60LDQttC00L7QuSDQsdGD0LrQstC1INC90LXQvtCx0YXQvtC00LjQvNGD0Y4g0LfQsNC00LXRgNC20LrRgyDQv9C10YDQtdC0INCw0L3QuNC80LDRhtC40LXQuVxuICAgICAgICAgIHZhclxuICAgICAgICAgICAgbGV0dGVycyA9IHRoYXQuZmluZCgnc3BhbicpLFxuICAgICAgICAgICAgZGVhbHkgPSAwO1xuICAgICAgICAgIGxldHRlcnMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgIHRoYXQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICBsZXRlckxlbmd0aCA9IGxldHRlcnMubGVuZ3RoO1xuICAgICAgICAgICAgdGhhdC5jc3MoeydhbmltYXRpb24tZGVsYXknOmRlYWx5Kydtcyd9KTtcbiAgICAgICAgICAgIGRlYWx5ICs9IHBhcnNlSW50KHRpbWVvdXQgLyBsZXRlckxlbmd0aCwgMTApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pOyBcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZnJhY3Rpb24oW3RpdGxlcywgdGVjaG5vbG9naXN0c10pO1xuICB9KSgpO1xuICBcbiAgZnVuY3Rpb24gdGV4dEFuaW1hdGUodGhhdCl7XG4gICAgdmFyXG4gICAgICBsZXR0ZXJMaXN0ID0gdGhhdC5maW5kKCcubGV0dGVyJyksXG4gICAgICBsaXN0TGVuZ3RoID0gbGV0dGVyTGlzdC5sZW5ndGgsXG4gICAgICBpID0gMDtcblxuICAgIChmdW5jdGlvbiBzaG93TGV0dGVyKCl7XG4gICAgICB2YXIgY3VycmVudExldHRlciA9ICQobGV0dGVyTGlzdFtpXSkuaHRtbCgpO1xuICAgICAvL9C10YHQu9C4INGN0YLQviDQv9GA0L7QsdC10Lsg0LfQsNC00LDQtNC40Lwg0LXQvNGDINGE0LjQutGB0LjRgNC+0LLQsNC90L3Rg9GOINGI0LjRgNC40L3RgyDQuNC90LDRh9C1INC/0L7RgtC+0Lwg0L7QvSDRgdC/0LvRjtGJ0LjRgtGM0YHRjyBcbiAgICAgIGlmIChjdXJyZW50TGV0dGVyID09PSAnICcpIHtcbiAgICAgICAgdmFyIGxldHRlcldpZHRoID0gJChsZXR0ZXJMaXN0W2ldKS53aWR0aCgpO1xuICAgICAgLy/QtdGB0LvQuCDRiNC40YDQuNC90LAg0L/RgNC+0LHQtdC70LAgPSAwLCDQt9C90LDRh9C40YIg0Y3RgtC+INC60L7QvdC10YYg0YHRgtGA0L7QutC4INC4INC90YPQttC90L4g0LLRgdGC0LDQstC40YLRjCDQtdC70LXQvNC10L3RgiDQv9C10YDQtdC90L7RgdCwINGB0YLRgNC+0LrQuFxuICAgICAgICBpZiAobGV0dGVyV2lkdGggPT0gMCkge1xuICAgICAgICAgICQobGV0dGVyTGlzdFtpXSkuYWZ0ZXIoJzxicj4nKTtcbiAgICAgICAgfVxuICAgICAgICAkKGxldHRlckxpc3RbaV0pLndpZHRoKGxldHRlcldpZHRoKTtcbiAgICAgIH1cbiAgICAgIGkrKztcbiAgICAgIChmdW5jdGlvbigpe1xuICAgICAgICBpZiAoaSA8IGxpc3RMZW5ndGgpIHtcbiAgICAgICAgICBzaG93TGV0dGVyKCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGxldHRlckxpc3QuYWRkQ2xhc3MoJ3Nob3dMZXR0ZXInKTtcbiAgICAgICAgfVxuICAgICAgfSkoKTtcbiAgICB9KSgpO1xuICB9XG4gICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9C60L7QvdC10YYg0LDQvdC40LzQuNGA0L7QstCw0L3QuNGPINGC0LXQutGB0YLQsCDQsiDRgdC70LDQudC00LXRgNC1Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9zdGFydCBzbGlkZXIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgKGZ1bmN0aW9uKCl7XG4gICAgJCgnLnNsaWRlcl9fYm90dG9tLXByZXZpZXcgbGksIC5zbGlkZXJfX3RvcC1wcmV2aWV3IGxpLCAuc2xpZGVyX19pbWFnZXMtbGlzdCcpLmNzcyh7J3RyYW5zaXRpb24tZHVyYXRpb24nOnRpbWVvdXQrJ21zJ30pO1xuICAgICQoJy5zbGlkZXJfX2ltYWdlcy1saXN0JykuY3NzKHsgJ3RyYW5zaXRpb24tZHVyYXRpb24nOnRpbWVvdXQvMisnbXMnfSk7XG4gICAgdmFyIGJ1dHRvbnMgPSAkKCcuc2xpZGVyX19idXR0b25zLWJvdHRvbSwgLnNsaWRlcl9fYnV0dG9ucy10b3AnKTtcbiAgICBidXR0b25zLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2dCl7XG4gICAgICBjYWxsU2xpZGVyKGV2dCk7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gY2FsbFNsaWRlcihldnQpe1xuICAgICAgLy/Rg9C00LDQu9C40Lwg0L7QsdGA0LDQsdC+0YLRh9C40LpcbiAgICAgIGJ1dHRvbnMub2ZmKCk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIC8v0LLQtdGA0L3RkdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6XG4gICAgICAgIGJ1dHRvbnMub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZ0KXtjYWxsU2xpZGVyKGV2dCk7fSk7XG4gICAgICB9LHRpbWVvdXQqMS41KTtcbiAgICAgIHNsaWRlcihldnQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGFuZ2VEZXNjcmlwdGlvbihpKXtcbiAgICAgIHZhclxuICAgICAgICBkZXNjID0gJCgnLnNsaWRlcl9faW1hZ2UtZGVzY3JpcHRpb24nKS5jbG9uZSgpLFxuICAgICAgICB0aXRsZSA9ICQoZGVzY1tpXSkuZmluZCgnaDInKS5hZGRDbGFzcygnYW5pbWF0ZVRleHQnKSxcbiAgICAgICAgdGVjaG5vbG9naWVzID0gJChkZXNjW2ldKS5maW5kKCdwJykuYWRkQ2xhc3MoJ2FuaW1hdGVUZXh0JyksXG4gICAgICAgIGxpbmsgPSAkKGRlc2NbaV0pLmZpbmQoJ2EnKTtcblxuICAgICAgJCgnLndvcmstZGVzY3JpcHRpb25fX3RpdGxlIGgyJykucmVwbGFjZVdpdGgodGl0bGUpO1xuICAgICAgJCgnLndvcmstZGVzY3JpcHRpb25fX3RlY2hub2xvZ2llcyBwJykucmVwbGFjZVdpdGgodGVjaG5vbG9naWVzKTtcbiAgICAgICQoJy53b3JrLWRlc2NyaXB0aW9uX19ib3R0b24gYScpLnJlcGxhY2VXaXRoKGxpbmspO1xuICAgICAgdGV4dEFuaW1hdGUoJCgnLmFuaW1hdGVUZXh0JykpO1xuICAgIH1cbiAgICAvL9GD0YHRgtCw0LLQuNC8INC+0L/QuNGB0LDQvdC40LUg0YLQtdC60YPRidC10Lkg0YDQsNCx0L7RgtGLXG4gICAgY2hhbmdlRGVzY3JpcHRpb24oMCk7XG4gICAgdmFyIGltYWdlTGlzdCAgPSAkKCcuc2xpZGVyX19pbWFnZXMtbGlzdCcpO1xuICAgIGZ1bmN0aW9uIHNsaWRlcihldnQpe1xuICAgICAgdmFyIGltYWdlcywgYXJyTGVuZ2h0LCBib3R0b24sIHByZXYsIHByZXZMZWZ0LCBwcmV2UmlnaHQsIHByZXYxTGVmdCxwcmV2MkxlZnQsXG4gICAgICAgIHByZXYxUmlnaHQsIHByZXYyUmlnaHQsIGN1cnJlbnRMZWZ0TGksIG5leHRMZWZ0TGksIGN1cnJlbnRSaWdodExpLCBuZXh0UmlnaHRMaTtcblxuICAgICAgaW1hZ2VzICAgICA9IGltYWdlTGlzdC5maW5kKCdsaScpO1xuICAgICAgYXJyTGVuZ2h0ICA9IGltYWdlcy5sZW5ndGg7XG4gICAgICBib3R0b24gICAgID0gJChldnQuY3VycmVudFRhcmdldCkuYXR0cignY2xhc3MnKTtcbiAgICAgIHByZXYgICAgICAgPSAkKCcuc2xpZGVyX19idXR0b25zJyk7XG4gICAgICBwcmV2TGVmdCAgID0gcHJldi5maW5kKCcuc2xpZGVyX19ib3R0b20tcHJldmlldyBsaScpO1xuICAgICAgcHJldlJpZ2h0ICA9IHByZXYuZmluZCgnLnNsaWRlcl9fdG9wLXByZXZpZXcgbGknKTtcbiAgICAgIHByZXYxTGVmdCAgPSAkKHByZXZMZWZ0WzFdKTtcbiAgICAgIHByZXYyTGVmdCAgPSAkKHByZXZMZWZ0WzBdKTtcbiAgICAgIHByZXYxUmlnaHQgPSAkKHByZXZSaWdodFsxXSk7XG4gICAgICBwcmV2MlJpZ2h0ID0gJChwcmV2UmlnaHRbMF0pO1xuICAgICAgICBcbiAgICAgIC8v0YPQt9C90LDQtdC8INGC0LXQutGD0YnQuNC5INC4INGB0LvQtdC00YPRjtGJ0LjQuSDQtdC70LXQvNC10L3RgtGLINC/0YDQtdCy0YzRjtGFLCDRgtC10LrRg9GJ0LjQuSDRgtC+0YIg0YfRgtC+INCy0LjQtNC40LwsINCwINGB0LvQtdC00YPRjtGJ0LjQudC10LvQtdC80LXQvdGCINGC0L7RgiDRh9GC0L4g0L/QvtC60LAg0YfRgtC+INGB0LrRgNGL0YIgXG4gICAgICBpZiAocHJldjFMZWZ0LnBvc2l0aW9uKCkudG9wID4gcHJldjJMZWZ0LnBvc2l0aW9uKCkudG9wKSB7XG4gICAgICAgIGN1cnJlbnRMZWZ0TGkgPSBwcmV2MUxlZnQ7XG4gICAgICAgIG5leHRMZWZ0TGkgPSBwcmV2MkxlZnQ7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgY3VycmVudExlZnRMaSA9IHByZXYyTGVmdDtcbiAgICAgICAgbmV4dExlZnRMaSA9IHByZXYxTGVmdDtcbiAgICAgIH1cbiAgICAgIC8v0KHQu9C10LTRg9GO0YnQuNC5INC10LvQtdC80LXQvdGCINGBINC70LXQstCwINC30L3QsNGH0LXQvdC40LUg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cbiAgICAgIG5leHRMZWZ0TGkgPSBuZXdTcmMobmV4dExlZnRMaSwgaW1hZ2VzW2FyckxlbmdodC0yXSk7XG4gICAgICAvL9C10YHQu9C4INC90LDQttCw0Lsg0LrQvdC+0L/QutGDINC90LDQt9Cw0LQg0L7QvdCwINC20LUg0LIg0L3QuNC3XG4gICAgICBmdW5jdGlvbiBiYWNrKCl7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAvL9C/0LXRgNC10LrQuNC90LXQvCDQuNC30L7QsdGA0LDQttC10L3QuNC1INGBINC60L7QvdCwINCyINC90LDRh9Cw0LvQvlxuICAgICAgICAgIGltYWdlTGlzdC5wcmVwZW5kKGltYWdlc1thcnJMZW5naHQtMV0pO1xuICAgICAgICAgIGltYWdlTGlzdC50b2dnbGVDbGFzcygnb3BhY2l0eScpO1xuICAgICAgICB9LCB0aW1lb3V0LzIpO1xuICAgICAgICBjaGFuZ2VQcmV2aWV3KGN1cnJlbnRMZWZ0TGksIG5leHRMZWZ0TGksICdib3R0b20nLCBpbWFnZXNbYXJyTGVuZ2h0LTNdKTtcbiAgICAgIH1cbiAgICAgIC8v0YPQt9C90LDQtdC8INGC0LXQutGD0YnQuNC5INC4INGB0LvQtdC00YPRjtGJ0LjQuSDQtdC70LXQvNC10L3RgtGLINC/0YDQtdCy0YzRjtGFLCDRgtC10LrRg9GJ0LjQuSDRgtC+0YIg0YfRgtC+INCy0LjQtNC40LwsINCwINGB0LvQtdC00YNcbiAgICAgIC8v0YPQt9C90LDQtdC8INGC0LXQutGD0YnQuNC5INC4INGB0LvQtdC00YPRjtGJ0LjQuSDQtdC70LXQvNC10L3RgtGLINC/0YDQtdCy0YzRjtGFLCDRgtC10LrRg9GJ0LjQuSDRgtC+0YIg0LrQvtGC0L7RgNGL0Lkg0L3QsCDQstC40LTRgywg0LAg0YHQu9C10LTRg9GO0YnQuNC50LXQu9C10LzQtdC90YIg0YLQvtGCINGH0YLQviDQv9C+0LrQsCDRh9GC0L4g0YHQutGA0YvRglxuICAgICAgaWYgKHByZXYxUmlnaHQucG9zaXRpb24oKS50b3AgPCBwcmV2MlJpZ2h0LnBvc2l0aW9uKCkudG9wKSB7XG4gICAgICAgIGN1cnJlbnRSaWdodExpID0gcHJldjFSaWdodDtcbiAgICAgICAgbmV4dFJpZ2h0TGkgPSBwcmV2MlJpZ2h0O1xuICAgICAgfWVsc2V7XG4gICAgICAgIGN1cnJlbnRSaWdodExpID0gcHJldjJSaWdodDtcbiAgICAgICAgbmV4dFJpZ2h0TGkgPSBwcmV2MVJpZ2h0O1xuICAgICAgfVxuICAgICAgLy/QodC70LXQtNGD0Y7RidC40Lkg0LXQu9C10LzQtdC90YIg0YEg0L/RgNCw0LLQsCDQt9C90LDRh9C10L3QuNC1INC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXG4gICAgICBuZXh0UmlnaHRMaSA9IG5ld1NyYyhuZXh0UmlnaHRMaSwgaW1hZ2VzWzJdKTtcbiAgICAgIC8v0LXRgdC70Lgg0L3QsNC20LDQuyDQstC/0LXRkdC0INC+0L3QsCDQttC1INCy0LLQtdGA0YVcbiAgICAgIGZ1bmN0aW9uIGZvcndhcmQoKXtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgIC8v0L/QtdGA0LXQutC40L3QtdC8INC40LfQvtCx0YDQsNC20LXQvdC40LUg0YEg0L3QsNGH0LDQu9CwINCyINC60L7QvdC10YZcbiAgICAgICAgICBpbWFnZUxpc3QuYXBwZW5kKGltYWdlc1swXSk7XG4gICAgICAgICAgaW1hZ2VMaXN0LnRvZ2dsZUNsYXNzKCdvcGFjaXR5Jyk7XG4gICAgICAgIH0sIHRpbWVvdXQvMik7XG4gICAgICAgIGNoYW5nZVByZXZpZXcoY3VycmVudFJpZ2h0TGksIG5leHRSaWdodExpLCAndG9wJywgaW1hZ2VzWzNdKTtcbiAgICAgIH0gICBcbiAgLy/QvNC10L3Rj9C10Lwg0LPQu9Cw0LLQvdC+0LUg0LjQt9C+0LHRgNCw0LbQtdC90LjQtVxuICAgICAgZnVuY3Rpb24gY2hhbmdlTWFpbkltYWdlKCl7XG4gICAgICAgIGltYWdlTGlzdC50b2dnbGVDbGFzcygnb3BhY2l0eScpO1xuICAgICAgICBpZiAoYm90dG9uID09ICdzbGlkZXJfX2J1dHRvbnMtYm90dG9tJykge1xuICAgICAgICAgIGJhY2soKTtcbiAgICAgICAgICBjaGFuZ2VEZXNjcmlwdGlvbihhcnJMZW5naHQtMSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGZvcndhcmQoKTtcbiAgICAgICAgICBjaGFuZ2VEZXNjcmlwdGlvbigxKTtcbiAgICAgICAgfSBcbiAgICAgIH0gIFxuICAvL9C80LXQvdGP0Lwg0L/RgNC10LLRjtGF0YMg0L/QsNGA0LDQvNC10YLRgNGLOiDRgtC10LrRg9GJ0LDRjyDQu9C4LCDRgdC70LXQtNGD0Y7RidCw0Y8g0YLQsCDQvdCwINC60L7RgtC+0YDRg9GOINGB0LXRh9Cw0YEg0LfQsNC80LXQvdC10YLRgdGPINGC0LXQutGD0YnQsNGPLCDQvdCw0L/RgNCw0LLQu9C10L3QuNC1INC00LLQuNC20LXQvdC40Y8g0LDQvdC40LzQsNGG0YvQuCxcbiAgLy/QvdC+0LLQsNGPINC70Lgg0YLQvtC10YHRgtGMINGBINC90L7QstGL0Lwg0LjQt9C+0LHRgNCw0LbQtdC90LjQtdC8INC4INCy0L7Qt9C80L7QttC90L4g0L7Qv9C40YHQsNC90LjQtdC8INC+0L3QsCDQt9Cw0LzQtdC90LXRgiDRgtGDINC70Lgg0LrQvtGC0L7RgNGD0Y4g0LzRiyDRgdC00LLQuNC90LjQvCDQuNC3INC30L7QvdGLINCy0LjQtNC40LzQvtGB0YLQuFxuICAgICAgZnVuY3Rpb24gY2hhbmdlUHJldmlldyhjdXJyZW50TGksIG5leHRMaSwgZGlyZWN0aW9uLCBuZXdMaSl7ICBcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSAnYm90dG9tJykge1xuICAgICAgICAgIG1vdmUoJ2JvdCcpO1xuICAgICAgICAgIHByZXdCYWNrKCdsZWZ0Jyk7XG4gICAgICAgICAgIC8vINC60LvQuNC60L3Rg9C70Lgg0L/QviDQu9C10LLQvtC5INC60L3QvtC/0LrQtSDQt9C90LDRh9C40YIg0LzQtdC90Y/QtdC8INC30L3QsNGH0LXQvdC40Y8g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0LTQu9GPINGB0LvQtdC00YPRjtGJ0LjQs9C+INC10LvQtdC80LXQvdGC0LAg0L/RgNCw0LLQvtC5INC60L3QvtC/0LrQtVxuICAgICAgICAgIG5leHRSaWdodExpID0gbmV3U3JjKG5leHRSaWdodExpLCBpbWFnZXNbMF0pO1xuICAgICAgICAgIG1vdmUoJ3RvcCcsIGN1cnJlbnRSaWdodExpLCBuZXh0UmlnaHRMaSk7XG4gICAgICAgICAgcHJld0JhY2soJ3JpZ2h0JywgY3VycmVudFJpZ2h0TGkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT0gJ3RvcCcpIHtcbiAgICAgICAgICBtb3ZlKCd0b3AnKTtcbiAgICAgICAgICBwcmV3QmFjaygncmlnaHQnKTtcbiAgICAgICAgICAvLyDQutC70LjQutC90YPQu9C4INC/0L4g0L/RgNCw0LLQvtC5INC60L3QvtC/0LrQtSDQt9C90LDRh9C40YIg0LzQtdC90Y/QtdC8INC30L3QsNGH0LXQvdC40Y8g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0LTQu9GPINGB0LvQtdC00YPRjtGJ0LjQs9C+INC10LvQtdC80LXQvdGC0LAg0L3QsCDQu9C10LLQvtC5INC60L3QvtC/0LrQtVxuICAgICAgICAgIG5leHRMZWZ0TGkgPSBuZXdTcmMobmV4dExlZnRMaSwgaW1hZ2VzWzBdKTtcbiAgICAgICAgICBtb3ZlKCdib3QnLCBjdXJyZW50TGVmdExpLCBuZXh0TGVmdExpKTtcbiAgICAgICAgICBwcmV3QmFjaygnbGVmdCcsIGN1cnJlbnRMZWZ0TGkpO1xuICAgICAgICB9XG4gICAgICAgIC8v0LLQvtC30LLRgNCy0YnQsNC10YIg0YHQutGA0YvRgtC+0LUg0L/RgNC10LLRjiDQvdCwINGB0YLQsNGA0YLQvtCy0L7RjiDQv9C+0LfQuNGG0YvRjiwg0L/QsNGA0LDQvNC10YLRgNGLINC60LDQutC+0LUg0L/RgNC10LLRjNGOINC70LXQstC+0LUg0LjQu9C4INC/0YDQsNCy0L7QtSwg0Lgg0L3QtSDQvtCx0LXQt9Cw0YLQtdC70YzQvdGL0Lkg0YLQtdC60YPRidC40LnRjdC70LXQvNC90YJcbiAgICAgICAgZnVuY3Rpb24gcHJld0JhY2socHJldiwgY3VycmVudEVsZW1lbnQpe1xuICAgICAgICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRMaTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmIChwcmV2ID09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IG5ld1NyYyhjdXJyZW50RWxlbWVudCwgbmV3TGkpO1xuICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudC5jc3Moeyd0cmFuc2l0aW9uLWR1cmF0aW9uJzonMG1zJywgJ3RyYW5zZm9ybSc6J3RyYW5zbGF0ZVkoMCknfSk7XG4gICAgICAgICAgICB9ZWxzZSBpZiAocHJldiA9PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gbmV3U3JjKGN1cnJlbnRFbGVtZW50LCBuZXdMaSk7XG4gICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LmNzcyh7J3RyYW5zaXRpb24tZHVyYXRpb24nOicwbXMnLCAndHJhbnNmb3JtJzondHJhbnNsYXRlWSgxMDAlKSd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBtb3ZlKGRpcmVjdGlvbiwgY3VycmVudEVsZW1lbnQsIG5leHRFbGVtZW50KXtcbiAgICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQgPT09IHVuZGVmaW5lZCB8fCBuZXh0RWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRMaTtcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gbmV4dExpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBuZXh0RWxlbWVudC5jc3Moeyd0cmFuc2l0aW9uLWR1cmF0aW9uJzp0aW1lb3V0Kydtcyd9KTtcbiAgICAgICAgICBpZiAoZGlyZWN0aW9uID09ICdib3QnKSB7XG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudC5jc3Moeyd0cmFuc2Zvcm0nOid0cmFuc2xhdGVZKDIwMCUpJ30pO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQuY3NzKHsndHJhbnNmb3JtJzondHJhbnNsYXRlWSgxMDAlKSd9KTtcbiAgICAgICAgICB9ZWxzZSBpZihkaXJlY3Rpb24gPT0gJ3RvcCcpe1xuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQuY3NzKHsndHJhbnNmb3JtJzondHJhbnNsYXRlWSgtMTAwJSknfSk7XG4gICAgICAgICAgICBuZXh0RWxlbWVudC5jc3Moeyd0cmFuc2Zvcm0nOid0cmFuc2xhdGVZKDApJ30pOyAgXG4gICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgICAgfVxuICAvL9GE0YPQvdC60YbQuNGPINC80LXQvdGP0LXRgiDQutCw0YLRgNC40L3QutGDINC4IGgxINCyIGxpINGN0LvQtdC80LXQvdGC0YLQtVxuICAgICAgZnVuY3Rpb24gbmV3U3JjKG9sZExpLCBuZXdMaSl7XG4gICAgICAgIHZhclxuICAgICAgICAgIHRtcFNyYyA9ICQobmV3TGkpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpLFxuICAgICAgICAgIHRtcEgxID0gJChuZXdMaSkuZmluZCgnaDEnKS5odG1sKCk7XG4gICAgICAgIC8v0LfQsNC80LXQvdC40Lwg0LDQtNGA0LXRgSDQuiDQutCw0YDRgtC40L3QutC1XG4gICAgICAgIG9sZExpLmZpbmQoJ2ltZycpLmF0dHIoeydzcmMnOnRtcFNyY30pO1xuICAgICAgICAvL9C30LDQvNC10L3QuNC8INC60L7QvdGC0LXQvdGCINCyIGgxXG4gICAgICAgIG9sZExpLmZpbmQoJ2gxJykuaHRtbCh0bXBIMSk7XG4gICAgICAgIHJldHVybiBvbGRMaTtcbiAgICAgIH1cbiAgICAgIGNoYW5nZU1haW5JbWFnZSgpO1xuICAgIH1cbiAgfSkoKTtcbiAgXG4gICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9lbmQgc2xpZGVyLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL3BzcmFsbGF4Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXJcbiAgICAgIGxheWVyID0gJCgnLnBhcmFsbGF4JykuZmluZCgnLnBhcmFsbGF4X19sYXllcicpLFxuICAgICAgbGF5ZXJTY3JvbGwgPSAkKCcucGFyYWxsYXhfc2Nyb2xsJykuZmluZCgnLnBhcmFsbGF4X19sYXllcicpO1xuICAgICQod2luZG93KS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHsgXG4gICAgICB2YXJcbiAgICAgICAgbW91c2VfZHggPSAoZS5wYWdlWCksIC8vINCj0LfQvdCw0LXQvCDQv9C+0LvQvtC20LXQvdC40LUg0LzRi9GI0LrQuCDQv9C+IFhcbiAgICAgICAgbW91c2VfZHkgPSAoZS5wYWdlWSksIC8vINCj0LfQvdCw0LXQvCDQv9C+0LvQvtC20LXQvdC40LUg0LzRi9GI0LrQuCDQv9C+IFlcbiAgICAgICAgdyA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gbW91c2VfZHgsIC8vINCS0YvRh9C40YHQu9GP0LXQvCDQtNC70Y8geCDQv9C10YDQtdC80LXRidC10L3QuNGPXG4gICAgICAgIGggPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBtb3VzZV9keTsgLy8g0JLRi9GH0LjRgdC70Y/QtdC8INC00LvRjyB5INC/0LXRgNC10LzQtdGJ0LXQvdC40Y9cblxuICAgICAgbGF5ZXIubWFwKGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgIHdpZHRoUG9zaXRpb24gPSB3ICogKGtleSAvIDEwMCksIC8vINCS0YvRh9C40YHQu9GP0LXQvCDQutC+0L7RhNC40YbQtdC90YIg0YHQvNC10YjQtdC90LjRjyDQv9C+IFhcbiAgICAgICAgICBoZWlnaHRQb3NpdGlvbiA9IGggKiAoa2V5IC8gMTAwKTsgLy8g0JLRi9GH0LjRgdC70Y/QtdC8INC60L7QvtGE0LjRhtC10L3RgiDRgdC80LXRiNC10L3QuNGPINC/0L4gWVxuXG4gICAgICAgICQodmFsdWUpLmNzcyh7XG4gICAgICAgICAgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGUzZCgnICsgd2lkdGhQb3NpdGlvbiArICdweCwgJyArIGhlaWdodFBvc2l0aW9uICsgJ3B4LCAwKSdcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB2YXIgd2luZG93SGVpZ3RoID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciB3aW5TY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICBpZiAod2luZG93SGVpZ3RoID4gd2luU2Nyb2xsVG9wKSB7XG4gICAgICAgIGxheWVyU2Nyb2xsLm1hcChmdW5jdGlvbiAoa2V5LCB2YWx1ZSl7XG4gICAgICAgICAgdmFyIGJpYXMgPSB3aW5TY3JvbGxUb3AgKiAoa2V5LzIwKTtcbiAgICAgICAgICAkKHZhbHVlKS5jc3Moe1xuICAgICAgICAgICAgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGUzZCgwLCAnICsgLWJpYXMgKydweCwgMCknXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNle3JldHVybjt9XG4gICAgfSk7XG4gIH0pKCk7ICBcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vcHNyYWxsYXgvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL3NraWxscy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIChmdW5jdGlvbigpe1xuICAgIHZhclxuICAgICAgdGFyZ2V0ID0gJCgnLm15LXNraWxscy1ib3gtY2VlbnRlcicpLFxuICAgICAgd2luZG93SGVpZ3RoID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuXG4gICAgaWYodGFyZ2V0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHZhclxuICAgICAgICBza2lsbHMgPSAkKCcubXktc2tpbGxzX19pdGVtJyksXG4gICAgICAgIGRhdGE7XG5cbiAgICAgIHRhcmdldCA9IHRhcmdldC5vZmZzZXQoKS50b3A7XG4gICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB3aW5TY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIGlmICh3aW5TY3JvbGxUb3Ard2luZG93SGVpZ3RoLzEwKjcgPiB0YXJnZXQpIHtcbiAgICAgICAgICBza2lsbHMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgIGRhdGEgPSAkdGhpcy5hdHRyKCdkYXRhLXNraWxsJyk7XG4gICAgICAgICAgICBpZiAoZGF0YSA9PSAwKSB7ZGF0YSA9IDE7fVxuICAgICAgICAgICAgZGF0YSA9ICBwYXJzZUludCggNzIyKihkYXRhLzEwMCkgKTtcbiAgICAgICAgICAgICR0aGlzLmZpbmQoJy5zZWN0b3InKS5jc3MoeydzdHJva2UtZGFzaGFycmF5JzpkYXRhKycgNzIyJ30pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gIH0pKCk7XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vc2tpbGxzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vcG9wX3VwLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgZnVuY3Rpb24gcG9wVXAobWVzc2FnZSwgdGltZSl7XG4gICAgaWYgKHRpbWUgPT0gdW5kZWZpbmVkKSB7dGltZSA9IDUwMDA7fVxuICAgICQoJyNwb3BfdXAtY29udGVudCcpLmh0bWwobWVzc2FnZSk7XG4gICAgJCgnI3BvcF91cCcpLmFkZENsYXNzKCdzaG93Jyk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgJCgnI3BvcF91cCcpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgfSwgdGltZSk7XG4gIH1cblxuICAoZnVuY3Rpb24oKXtcbiAgICAkKCcjcG9wX3VwLWJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAkKCcjcG9wX3VwJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgICB9KTtcbiAgfSkoKTtcblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vcG9wX3VwLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAvL9Cx0LXRgNGR0YIg0LTQsNC90L3Ri9C1INGBINGE0L7RgNC80Ysg0L/QvtC70YPRh9C10L3QvtC5INCyINC60LDRh9C10YHRgtCy0LUg0L/QsNGA0LDQvNC10YLRgNCwINC4INGB0YTQvtGA0LzQuNGA0YPQtdC8INC00LLRg9GFINGD0YDQvtCy0LXQstGL0Lkg0LzQsNGB0YHQuNCyINC00LTQvdC90YvRhSDQtNC70Y8g0L7RgtC/0YDQsNCy0LrQuCDQvdCwINGB0LXRgNCy0LXRgFxuICBmdW5jdGlvbiBnZXREYXRhKGZvcm0pe1xuICAgIHZhclxuICAgICAgZm9ybUlkID0gZm9ybS5hdHRyKCdpZCcpLFxuICAgICAgaW5wdXRzID0gZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEnKSxcbiAgICAgIGRhdGEgPSBbWydmb3JtSWQnLCBmb3JtSWRdXTtcbiAgICBpbnB1dHMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgdmFyIHRoYXQgPSAkKHRoaXMpLCBjdXJlbnREYXRhID0gW3RoYXQuYXR0cignaWQnKSwgdGhhdC52YWwoKS50cmltKCldO1xuICAgICAgZGF0YVtkYXRhLmxlbmd0aF0gPSBjdXJlbnREYXRhO1xuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXIoZm9ybSl7XG4gICAgdmFyIGlucHV0cyA9IGZvcm0uZmluZCgnaW5wdXQsIHRleHRhcmVhJyk7XG5cbiAgICBpbnB1dHMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgJCh0aGlzKS52YWwoJycpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL2Zvcm0gb2YgY29tbXVuaWNhdGlvbi8vLy8vLy8vLy8vLy8vLy9cblxuICAoZnVuY3Rpb24oKXtcbiAgICB2YXIgZm9ybUJveCA9ICQoJyNjb250YWN0LWZvcm0tYm94Jyk7XG4gICAgaWYgKGZvcm1Cb3gubGVuZ3RoIDwgMSkge3JldHVybjt9XG4gICAgdmFyXG4gICAgICBmb3JtID0gZm9ybUJveC5maW5kKCcjY29udGFjdC1mb3JtJyksXG4gICAgICBidXR0b25zID0gZm9ybUJveC5maW5kKCcuY29udGFjdC1mb3JtX19idXR0b25zJyk7XG5cbiAgICBidXR0b25zLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2dCl7XG4gICAgICBpZiAoICQoZXZ0LnRhcmdldCkuYXR0cignaWQnKSA9PT0gJ3NlbmQtbWVzc2FnZScgKSB7XG4gICAgICAgIHZhciBkYXRhID0gZ2V0RGF0YShmb3JtKTtcbiAgICAgICAgLy/Qv9GA0L7QudC00LXQvNGB0Y8g0L/QviDQuNC80L/Rg9GC0LDQvCDQvdC+INC/0YDQvtC/0YPRgdGC0LjQvCBpZCDRgtC10LrRg9GJ0LXQuSDRhNC+0YDQvNGLXG4gICAgICAgIHZhclxuICAgICAgICAgIGVycm9ycyA9IFtdLFxuICAgICAgICAgIG1haWwgPSAnJztcbiAgICAgICAgZm9yKHZhciBpPTE7IGk8ZGF0YS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgdmFyXG4gICAgICAgICAgICBjdXJyZW5JZCA9IGRhdGFbaV1bMF0sXG4gICAgICAgICAgICBjdXJyZW50RGF0YSA9IGRhdGFbaV1bMV07XG5cbiAgICAgICAgICBpZiAoY3VycmVuSWQgPT0gJ21haWwnKSB7bWFpbCA9IGN1cnJlbnREYXRhO31cblxuICAgICAgICAgIGlmIChjdXJyZW50RGF0YS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICB2YXIgbWFzc2VnZSA9IFsgWyduYW1lJywn0JjQvNGPJ10sIFsnbWFpbCcsICdFbWFpbCddLCBbJ21lc3NhZ2UnLCAn0KHQvtC+0LHRidC10L3QuNC1J10gXTtcbiAgICAgICAgICAgIHZhciBjdXJyZW5JbnB1dCA9ICcnO1xuICAgICAgICAgICAgLy/Qv9C+0YHQvNC+0YLRgNC40Lwg0YHRgdC+0LHRidC10L3QuNGPINGBINC+0YIg0LjQvNC10L3QuCDQutCw0LrQvtCz0L4g0L/QvtC70Y8g0L3Rg9C20L3QviDQstGL0LLQtdGB0YLQuFxuICAgICAgICAgICAgbWFzc2VnZS5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgICAgICAgICAgICBpZiAoY3VycmVuSWQgPT09IGVsZW1lbnRbMF0pIHtjdXJyZW5JbnB1dCA9IGVsZW1lbnRbMV07fVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlcnJvcnNbZXJyb3JzLmxlbmd0aF0gPSBjdXJyZW5JbnB1dCsnINC90LUg0LzQvtC20LXRgiDQsdGL0YLRjCDQv9GD0YHRgtGL0LwhIDxicj4nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgciA9IC9eXFx3K0BcXHcrXFwuXFx3ezIsNH0kL2k7XG4gICAgICAgIGlmIChlcnJvcnMubGVuZ3RoIDwgMSAmJiAhci50ZXN0KG1haWwpICl7XG4gICAgICAgICAgZXJyb3JzW2Vycm9ycy5sZW5ndGhdID0gJ9Cd0LUg0LrQvtGA0LXQutGC0L3Ri9C5IGUtbWFpbCEnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvcnMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgIHZhciBhbnN3ZXIgPSB0cnVlO1xuICAgICAgICAgIC8v0LXRgdC70Lgg0L7RiNGC0LHQvtC6INC90LXRgiDQvtGC0YDQsNCy0LjQvCDQt9Cw0L/RgNC+0YEg0L3QsCDRgdC10YDQstC10YBcblxuICAgICAgICAgIC8v0LXRgdC70Lgg0L7RgiDRgdC10YDQstC10YDQsCDQv9GA0LjQudC00LXRgiDQv9C+0LvQvtC20LjRgtC10LvRjNC90YvQuSDQvtGC0LLQtdGCXG4gICAgICAgICAgaWYgKGFuc3dlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcG9wVXAoJ9Cj0KHQn9CV0KjQndCeINCe0KLQn9Cg0JDQktCb0JXQndCeIScsIDMwMDApO1xuICAgICAgICAgICAgY2xlYXIoZm9ybSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1lbHNle3BvcFVwKGVycm9ycyk7fVxuICAgICAgICBcbiAgICAgIH1lbHNlIGlmKCQoZXZ0LnRhcmdldCkuYXR0cignaWQnKSA9PT0gJ3Jlc2V0Jyl7XG4gICAgICAgIGNsZWFyKGZvcm0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KSgpO1xuXG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL2Zvcm0gb2YgY29tbXVuaWNhdGlvbi8vLy8vLy8vLy8vLy8vLy9cblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vYWRtaW4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgKGZ1bmN0aW9uKCl7XG4gICAgdmFyIFxuICAgICAgYWRtaW5Gb3JtcyA9ICQoJy5hZG1pbi1mb3JtJyksXG4gICAgICBtZW5MaXN0ID0gJCgnLmFkbWluLW5hdl9faXRlbScpO1xuXG4gICAgbWVuTGlzdC5jbGljayhmdW5jdGlvbigpe1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQodGhhdCkuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1lbHNle1xuICAgICAgICAkKHRoYXQpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkKHRoYXQpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgc2hvd0Zvcm0oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgIFxuICAgIGZ1bmN0aW9uIHNob3dGb3JtKCl7XG4gICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgLy/RhNGD0L3QutGG0YvRjyDQv9C+0LrQsNC20LXRgiDQvdGD0LbQvdGD0Y4g0YTQvtGA0LzRgyDQuCDRgdC60YDQvtC10YIg0L3QtSDQvdGD0LbQvdGD0Y4g0YDQtdGI0LXQvdC40Y8g0L/RgNC40L3QuNC80LDQtdGC0YzRgdGPINC90LAg0L7RgdC90L7QstC1INCw0LrRgtC40LLQvdC+0LPQviDQtdC70LXQvNC10L3RgtCwINC80LXQvdGOXG4gICAgICBtZW5MaXN0LmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICBpZiAoICQodGhhdCkuaGFzQ2xhc3MoJ2FjdGl2ZScpICkge1xuICAgICAgICAgICQoYWRtaW5Gb3Jtc1tjb3VudF0pLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAkKGFkbWluRm9ybXNbY291bnRdKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9XG4gICAgICAgIGNvdW50Kys7ICBcbiAgICAgIH0pO1xuICAgIH1cbiAgICBhZG1pbkZvcm1zLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgc2hvd0Zvcm0oKTtcbiAgICBcbiAgfSkoKTtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL2FkbWluLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/RhNC+0YDQvNCwINCy0YXQvtC00LAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgKGZ1bmN0aW9uKCl7XG4gICAgdmFyIGxvZ2luRGF0YSA9IHt9O1xuICAgICQoJyNsb2dpbi1uYXZfX2VudGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhclxuICAgICAgICBsb2dpbkZvcm0gPSAkKCcjbG9naW4tZm9ybScpLFxuICAgICAgICBlcnJvcnMgPSBbXTtcblxuICAgICAgbG9naW5EYXRhLmxvZ2luID0gbG9naW5Gb3JtLmZpbmQoJyNsb2dpbicpLnZhbCgpLnRyaW0oKSxcbiAgICAgIGxvZ2luRGF0YS5wYXNzID0gbG9naW5Gb3JtLmZpbmQoJyNwYXNzd29yZCcpLnZhbCgpLnRyaW0oKSxcbiAgICAgIGxvZ2luRGF0YS5odW1hbiA9IGxvZ2luRm9ybS5maW5kKCcjbG9naW5mb3JtX2NoZWNrJykucHJvcCgnY2hlY2tlZCcpLFxuICAgICAgbG9naW5EYXRhLmV4YWN0bHlIdW1hbiA9IGxvZ2luRm9ybS5maW5kKCcjcmFkaW9feWVzJykucHJvcCgnY2hlY2tlZCcpO1xuICAgICAgICBcbiAgICAgIGZvcih2YXIgcHJvcGVydHkgaW4gbG9naW5EYXRhKXtcbiAgICAgICAgdmFyIHByb3BMYWx1ZSA9IGxvZ2luRGF0YVtwcm9wZXJ0eV07XG4gICAgICAgIGlmICggcHJvcExhbHVlID09PSBmYWxzZSB8fCBwcm9wTGFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAvL9C30L3QsNGH0LXRgiDRjdGC0L4g0YfQtdC60LHQvtC60YHRi1xuICAgICAgICAgIGlmIChwcm9wTGFsdWUgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGVycm9yc1sxXSA9ICfQn9C+0LbQvtC20LUg0YfRgtC+INCy0Ysg0YDQvtCx0L7RgiE8YnI+JztcbiAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIC8v0LfQvdCw0YfQtdGCINGN0YLQviDRgdGC0YDQvtC60LhcbiAgICAgICAgICB2YXIgc3RyTGVuZ3RoID0gcHJvcExhbHVlLmxlbmd0aDtcbiAgICAgICAgICBpZiAoc3RyTGVuZ3RoIDwgNCB8fCBzdHJMZW5ndGggPiAxNCkge1xuICAgICAgICAgICAgZXJyb3JzWzBdID0gJ9CU0LvQuNC90L3QsCDQu9C+0LPQuNC90LAg0Lgg0L/QsNGA0L7Qu9GPINC00L7Qu9C20L3QsCDQsdGL0YLRjCDQvtGCIDQg0LTQviAxNCDRgdC40LzQstC+0LvQvtCyITxicj4nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICAgIGVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICAgIG1lc3NhZ2UgKz0gKGl0ZW0pID8gaXRlbSsnXFxuJzonICc7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHBvcFVwKG1lc3NhZ2UpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvL9C00LDQu9C1INGA0LDQsdC+0YLQsCDQt9CwINGB0LXRgNCy0LXRgNC+0LxcbiAgICB9KTtcbiAgfSkoKTtcbiAgLy/Rg9C00LDQu9C40Log0YTRgNC10LnQvCDRgSDQutCw0YDRgtC+0Lkg0L3QsCDQvNC+0LHQuNC70YzQvdGL0YVcbiAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQxNikge1xuICAgICQoJy5zZWN0aW9uLWNvbnRhY3RzIGlmcmFtZScpLnJlbW92ZSgpO1xuICB9XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9GE0L7RgNC80LAg0LLRhdC+0LTQsC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v0JDQtNC80LjQvS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIChmdW5jdGlvbigpe1xuICAgIGlmICgkKCcuYWRtaW4tZm9ybScpLmxlbmd0aCA8IDEpe3JldHVybjt9XG4gICAgLy/QuNC30LzQtdC90LjQvCDRhtCy0LXRgiBwb3BVcCDQtNC70Y8g0LDQtNC80LjQvdC60LhcbiAgICAkKCcjcG9wX3VwJykuY3NzKHsnYmFja2dyb3VuZC1jb2xvcic6JyMwMEE3OEUnfSk7XG4gICAgdmFyXG4gICAgICBmb3JtQWJvdXRNZSA9ICQoJyNhZG1pbi1hYm91dC1tZScpLFxuICAgICAgZm9ybUJsb2cgPSAkKCcjYWRtaW4tYmxvZycpLFxuICAgICAgZm9ybVdvcmtzID0gJCgnI2FkbWluLXdvcmtzJyk7ICBcbiAgICAvL9C/0YDQvtCy0LXRgNGP0LXQvCDQstCy0L7QtNC40YLRgdGPINC70Lgg0LIgaW5wdXQg0YfQuNGB0LvQviDQtdGB0LvQuCDQvdC10YIg0YfQuNGB0YLQuNC8INC10LPQvlxuICAgIGZvcm1BYm91dE1lLmZpbmQoJ2lucHV0Jykub24oJ2lucHV0JywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciB2YWx1ZSA9IHBhcnNlSW50KCAkKHRoaXMpLnZhbCgpICk7XG4gICAgICBpZiAoIGlzTmFOKHZhbHVlKSApIHskKHRoaXMpLnZhbCgnJyk7fVxuICAgIH0pO1xuICAgIFxuICAgIGZvcm1BYm91dE1lLmZpbmQoJyNhZG1pbi1hYm91dC1tZV9fc2F2ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgZXJyb3JzID0gW107XG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aDwxKSB7XG4gICAgICAgIHBvcFVwKCfRgdC+0YXRgNCw0L3QtdC90L4nLCAxNTAwKTtcbiAgICAgIH1lbHNle3BvcFVwKGVycm9ycyk7fVxuICAgICAgdmFyIGRhdGEgPSBnZXREYXRhKGZvcm1BYm91dE1lKTtcblxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgfSk7XG4gICAgZm9ybUJsb2cuZmluZCgnI2FkbWluLWJsb2dfX3NhdmUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIGVycm9ycyA9IFtdO1xuICAgICAgaWYgKGVycm9ycy5sZW5ndGg8MSkge1xuICAgICAgICBwb3BVcCgn0YHQvtGF0YDQsNC90LXQvdC+JywgMTUwMCk7XG4gICAgICB9ZWxzZXtwb3BVcChlcnJvcnMpO31cbiAgICAgIHZhciBkYXRhID0gZ2V0RGF0YShmb3JtQmxvZyk7XG5cbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH0pO1xuICAgIGZvcm1Xb3Jrcy5maW5kKCcjYWRtaW4td29ya3NfX3NhdmUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIGVycm9ycyA9IFtdO1xuICAgICAgaWYgKGVycm9ycy5sZW5ndGg8MSkge1xuICAgICAgICBwb3BVcCgn0YHQvtGF0YDQsNC90LXQvdC+JywgMTUwMCk7XG4gICAgICB9ZWxzZXtwb3BVcChlcnJvcnMpO31cbiAgICAgIHZhciBkYXRhID0gZ2V0RGF0YShmb3JtV29ya3MpO1xuXG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcblxuICAgIH0pO1xuICB9KSgpO1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v0JDQtNC80LjQvS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
