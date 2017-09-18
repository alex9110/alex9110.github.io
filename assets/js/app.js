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
      //удалим обработчик
      buttons.off();
      slider(evt);
      setTimeout(function(){
        //вернём обработчик
        buttons.on('click', function(evt){slider(evt);});
      },timeout*2); 
    });
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
    $('#pop_up').removeClass('hidden');
    setTimeout(function(){
      $('#pop_up').addClass('hidden');
    }, time);
  }

  (function(){
    $('#pop_up-button').on('click', function(){
      $('#pop_up').addClass('hidden');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vcHJlbG9hZGVyLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnLmFib3V0LXdyYXBwZXIsIC5ibG9nLXdyYXBwZXIsIC5pbmRleC13cmFwcGVyLCAud29ya3Mtd3JhcHBlciwgLmFkbWluLXdyYXBwZXInKS5jc3MoeydkaXNwbGF5Jzonbm9uZSd9KTtcbiAgICB2YXIgaW1ncyA9IFtdO1xuICAgICQuZWFjaCgkKCcqJyksIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgIGJhY2tncm91bmQgPSAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKSxcbiAgICAgICAgaW1nID0gJHRoaXMuaXMoJ2ltZycpO1xuICAgICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKSB7XG4gICAgICAgIHZhciBwYXRoID0gYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInLCAnJykucmVwbGFjZSgnXCIpJywgJycpO1xuXG4gICAgICAgIGltZ3MucHVzaChwYXRoKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbWcpIHtcbiAgICAgICAgcGF0aCA9ICR0aGlzLmF0dHIoJ3NyYycpO1xuICAgICAgICBpbWdzLnB1c2gocGF0aCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdmFyIHBlcmNlbnRzID0gMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpbWFnZSA9ICQoJzxpbWc+Jywge1xuICAgICAgICBhdHRyOiB7XG4gICAgICAgICAgc3JjIDogaW1nc1tpXVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGltYWdlLmxvYWQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRQZXJjZW50cyhpbWdzLmxlbmd0aCwgcGVyY2VudHMpO1xuICAgICAgICBwZXJjZW50cysrO1xuICAgICAgfSk7XG4gICAgICBpbWFnZS5lcnJvcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldFBlcmNlbnRzKGltZ3MubGVuZ3RoLCBwZXJjZW50cyk7XG4gICAgICAgIHBlcmNlbnRzKys7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy/QldCh0JvQmCDQmtCQ0KDQotCY0J3QntCaINCd0JXQoiBcbiAgICBpZihpbWdzLmxlbmd0aCA9PT0gMCl7XG4gICAgICBzZXRQZXJjZW50cygxLDEpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRQZXJjZW50cyh0b3RhbCwgY3VycmVudCkge1xuICAgICAgdmFyIHBlcmNlbnQgPSBNYXRoLmNlaWwoY3VycmVudCAvIHRvdGFsICogMTAwKTtcbiAgICAgIGlmIChwZXJjZW50ID49IDEwMCkge1xuICAgICAgICAkKCcuYWJvdXQtd3JhcHBlciwgLmJsb2ctd3JhcHBlciwgLmluZGV4LXdyYXBwZXIsIC53b3Jrcy13cmFwcGVyLCAuYWRtaW4td3JhcHBlcicpLmNzcyh7J2Rpc3BsYXknOidibG9jayd9KTtcbiAgICAgICAgJCgnLnBsYXRlLWZyb250JykuYWRkQ2xhc3MoJ2FuaW1hdGVfcGxhdGUnKTtcbiAgICAgICAgJCgnLmxvYWRlci13cmFwcGVyJykuZmFkZU91dCgxNTAwLCBmdW5jdGlvbigpe1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJy5wbGF0ZS1mcm9udCcpLnJlbW92ZUNsYXNzKCdhbmltYXRlX3BsYXRlJyk7XG4gICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgJCgnLmxvYWRlcl9fcGVyY2VudCcpLnRleHQocGVyY2VudCArICclJyk7XG4gICAgfVxuICB9KTtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9wcmVsb2FkZXIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLy8vLy8vLy8vLy8vLy8vLy8g0L/Qu9Cw0LLQvdGL0Lkg0YHQutGA0L7QuyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgJCgnYVtocmVmXj1cIiNcIl0nKS5jbGljayhmdW5jdGlvbigpe1xuICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICB2YXIgZGVzdGluYXRpb24gPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wOyAgLy/Rg9C30L3QsNC10Lwg0LzQtdGB0YLQviDQvdCw0LfQvdCw0YfQtdC90LjRjyBcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBkZXN0aW5hdGlvbn0sIDEwMDApOyAgLy/QtNCy0LjQs9Cw0LXQvCDQuiDQvdC40LzRg1xuICAgIHJldHVybiBmYWxzZTsgICAgICAgICAgICAgICAgICAgICBcbiAgfSk7XG4gIC8vLy8vLy8vLy8vLy8vLy8vLyDQv9C70LDQstC90YvQuSDRgdC60YDQvtC7IC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/Qv9C10YDQtdCy0LXRgNC90YPRgtGMINC/0LvQsNGI0LrRgy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgJCgnI3RvLW1haW4tYnV0LCAjYXV0aG9yaXphdGlvbi1idXR0b24nKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgJCgnI3BsYXRlJykudG9nZ2xlQ2xhc3MoJ3BsYXRlLWZyb250Jyk7XG4gIH0pO1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9C/0LXRgNC10LLQtdGA0L3Rg9GC0Ywg0L/Qu9Cw0YjQutGDLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/QutC+0LQg0YHRgtGA0LDQvdC40YbRiyDQsdC70L7Qs9CwLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIChmdW5jdGlvbigpe1xuICAgIHZhclxuICAgICAgbm90X2ZpeGVkID0gdHJ1ZSxcbiAgICAgIGFycm93X25vbmUgPSB0cnVlLFxuICAgICAgdGFyZ2V0ID0gJCgnI3NlY3Rpb24tYXJ0aWNsZXMnKSxcbiAgICAgIGFydGljbGVzID0gJCgnLmFydGljbGUnKSxcbiAgICAgIGFzaWRlSXRlbSA9ICQoJy5ibG9nX2FzaWRlX19pdGVtJyksXG4gICAgICBhc2lkZUxpc3QgPSAkKCcuYmxvZ19hc2lkZV9fbGlzdCcpLFxuICAgICAgYXNpZGUgPSAkKCcuYmxvZ19hc2lkZScpLFxuICAgICAgYXNpZGVMb2lzdEJ1dHRvbiA9IGFzaWRlTGlzdC5maW5kKCcjYmxvZ19hc2lkZV9fbGlzdF9idXR0b24nKSxcbiAgICAgIHdpbkhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKSxcbiAgICAgIHdpblNjcm9sbFRvcCA9ICcnO1xuICAgICAgXG4gICAgaWYgKHRhcmdldC5sZW5ndGggPiAwKSB7XG4gICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHdpblNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgZml4ZXRfbmF2KCk7XG4gICAgICAgIGluV2luZG93KGFydGljbGVzLCBhc2lkZUl0ZW0pO1xuICAgICAgICBzaG93QXJyb3coKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvL9C/0L7Qt9GL0YbRi9C+0L3QuNGA0L7QstCw0L3QuNC1INC90LDQstC40LPQsNGG0LjQuFxuICAgIGZ1bmN0aW9uIGZpeGV0X25hdigpe1xuICAgICBcbiAgICAgIHZhciB0YXJnZXRQb3MgPSB0YXJnZXQub2Zmc2V0KCkudG9wO1xuXG4gICAgICBpZih3aW5TY3JvbGxUb3AgPj0gdGFyZ2V0UG9zICYmIG5vdF9maXhlZCl7XG4gICAgICAgIHZhciB0b3AgPSAkKGFzaWRlTGlzdCkucG9zaXRpb24oKS50b3A7XG4gICAgICAgIHZhciBsZWZ0ID0gJChhc2lkZUxpc3QpLm9mZnNldCgpLmxlZnQ7XG4gICAgICAgICQoYXNpZGVMaXN0KS5jc3Moeydwb3NpdGlvbic6J2ZpeGVkJywgJ3RvcCc6IHRvcCsncHgnLCAnbGVmdCc6IGxlZnQrJ3B4J30pO1xuICAgICAgICBub3RfZml4ZWQgPSBmYWxzZTtcbiAgICAgIH1lbHNlIGlmKHdpblNjcm9sbFRvcCA8IHRhcmdldFBvcyAmJiAhbm90X2ZpeGVkKSB7XG4gICAgICAgICQoYXNpZGVMaXN0KS5jc3Moeydwb3NpdGlvbic6J3N0YXRpYyd9KTtcbiAgICAgICAgbm90X2ZpeGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vL2fQv9C+0LrQsNC30LDRgtGMINGB0LrRgNGL0YLRjCDQsdC+0LrQvtCy0L7QtSDQvNC10L3Rji8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgYXNpZGVMb2lzdEJ1dHRvbi5jbGljayhmdW5jdGlvbigpe1xuICAgICAgdmFyIGxlZnQgPSBwYXJzZUludCggYXNpZGUuY3NzKCdsZWZ0JykgKTtcbiAgICAgIGlmIChsZWZ0PDApIHtcbiAgICAgICAgYXNpZGVMaXN0LmNzcyh7J2xlZnQnOicwcHgnfSk7XG4gICAgICAgIGFzaWRlLmNzcyh7J2xlZnQnOiAnMCd9KTtcbiAgICAgIH1lbHNle1xuICAgICAgICBhc2lkZUxpc3QuY3NzKHsnbGVmdCc6Jy0zMDBweCd9KTtcbiAgICAgICAgYXNpZGUuY3NzKHsnbGVmdCc6ICctMzAwcHgnfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vL2fQv9C+0LrQsNC30LDRgtGMINGB0LrRgNGL0YLRjCDQsdC+0LrQvtCy0L7QtSDQvNC10L3Rji8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvL9C/0L7QutCw0LfQsNGC0Ywg0YHQutGA0YvRgtGMINGB0YLRgNC10LvQutGDINCy0LLQtdGA0YVcbiAgICBmdW5jdGlvbiBzaG93QXJyb3coKXtcbiAgICAgIGlmICh3aW5IZWlnaHQgPD0gd2luU2Nyb2xsVG9wICYmIGFycm93X25vbmUpIHtcbiAgICAgICAgJCgnLmFycm93LXRvcCcpLmNzcyh7J2Rpc3BsYXknOidibG9jayd9KTtcbiAgICAgICAgYXJyb3dfbm9uZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZih3aW5IZWlnaHQgPiB3aW5TY3JvbGxUb3AgJiYgIWFycm93X25vbmUpe1xuICAgICAgICAkKCcuYXJyb3ctdG9wJykuY3NzKHsnZGlzcGxheSc6J25vbmUnfSk7XG4gICAgICAgIGFycm93X25vbmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICAvL9C/0L7QutGA0LDRgdC40YIg0LXQu9C10LzQtdC90YIg0L3QsNCy0LjQs9Cw0YbQuNC+0L3QvdC+0LPQviDQvNC10L3RjiDQutC+0YLQvtGA0YvQuSDRgdC+0YLQstC10YLRgdGC0LLRg9C10YIg0YLQtdC60YPRidC10Lkg0YHRgtCw0YLQuFxuICAgIHZhciBzYXZlZEluZGV4TnVtYmVyID0gMCwgY3VycmVudEluZGV4TnVtYmVyID0gMDtcbiAgICBmdW5jdGlvbiBpbldpbmRvdyhhcnRpY2xlcywgYXNpZGVJdGVtKXtcbiAgICAgIHZhclxuICAgICAgICBpbmRlbnQgPSBwYXJzZUludCggJChhcnRpY2xlc1swXSkuY3NzKCdtYXJnaW4tYm90dG9tJykgKSxcbiAgICAgICAgY3VycmVudEVscyA9ICQoYXJ0aWNsZXMpLFxuICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgb2Zmc2V0VG9wO1xuXG4gICAgICBjdXJyZW50RWxzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSAkKHRoaXMpO1xuICAgICAgICBvZmZzZXRUb3AgPSBlbGVtZW50Lm9mZnNldCgpLnRvcDtcbiAgICAgICAgb2Zmc2V0VG9wID0gcGFyc2VJbnQob2Zmc2V0VG9wKTtcbiAgICAgICAgaWYoIHdpblNjcm9sbFRvcCtpbmRlbnQqMiA+IG9mZnNldFRvcCApe1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMpO1xuICAgICAgICAgIGN1cnJlbnRJbmRleE51bWJlciA9IHJlc3VsdC5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICggc2F2ZWRJbmRleE51bWJlciAhPT0gY3VycmVudEluZGV4TnVtYmVyKSB7XG4gICAgICAgIHNhdmVkSW5kZXhOdW1iZXIgPSBjdXJyZW50SW5kZXhOdW1iZXI7XG4gICAgICAgICQoYXNpZGVJdGVtKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICQoYXNpZGVJdGVtW2N1cnJlbnRJbmRleE51bWJlcl0pLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pKCk7XG4gIFxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9C60L7QtCDRgdGC0YDQsNC90LjRhtGLINCx0LvQvtCz0LAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vL3N0YXJ0IHBvcnRmb2xpbyBoZWFkZXIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgKGZ1bmN0aW9uKCl7XG4gICAgdmFyXG4gICAgICB0cmFuc2l0aW9uID0gMzAwLFxuICAgICAgbWVudUJ1dHRvbiA9ICQoJyNtZW51LWJ1dHRvbicpO1xuXG4gICAgbWVudUJ1dHRvbi5jbGljayhmdW5jdGlvbigpe1xuICAgICAgdmFyIGNsb3NlID0gJCgnLmN1cnRhaW4tbGVmdCcpLmhhc0NsYXNzKCdjbG9zZUN1cnRhaW5zTCcpO1xuICAgICAgaWYoY2xvc2Upe1xuICAgICAgICBjbG9zZV9tZW51KCk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgc2hvd19tZW51KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gY2xvc2VfbWVudSgpe1xuICAgICAgbWVudUJ1dHRvbi5yZW1vdmVDbGFzcygnbWVudS1idXR0b24tY2xvc2UnKTtcbiAgICAgICQoJy5jdXJ0YWluLWxlZnQsIC5jdXJ0YWluLXJpZ2h0LCAjbWFpbi1uYXYnKS5jc3MoeydvcGFjaXR5JzowfSk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJy5jdXJ0YWluLWxlZnQnKS5yZW1vdmVDbGFzcygnY2xvc2VDdXJ0YWluc0wnKTtcbiAgICAgICAgJCgnLmN1cnRhaW4tcmlnaHQnKS5yZW1vdmVDbGFzcygnY2xvc2VDdXJ0YWluc1InKTtcbiAgICAgICAgJCgnI21haW4tbmF2JykucmVtb3ZlQ2xhc3MoJ2Jsb2NrJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKCcuY3VydGFpbi1sZWZ0LCAuY3VydGFpbi1yaWdodCwgI21haW4tbmF2JykuY3NzKHsnb3BhY2l0eSc6MX0pO1xuICAgICAgICB9LCB0cmFuc2l0aW9uKTsgXG4gICAgICB9LCB0cmFuc2l0aW9uKTtcbiAgICB9XG4gICAgdmFyXG4gICAgICBhcnIgPSAkKCcubWFpbi1uYXYtbGlzdC1pdGVtJyksXG4gICAgICBhcnJfbGVuZ3RoID0gYXJyLmxlbmd0aDtcblxuICAgIGZ1bmN0aW9uIHNob3dfbWVudSgpe1xuICAgICAgbWVudUJ1dHRvbi5hZGRDbGFzcygnbWVudS1idXR0b24tY2xvc2UnKTtcbiAgICAgICQoYXJyKS5maW5kKCdhJykuY3NzKHsndHJhbnNmb3JtJzogJ3NjYWxlKDApJywgJ3RyYW5zaXRpb24tZHVyYXRpb24nOnRyYW5zaXRpb24rJ21zJ30pO1xuICAgICAgdmFyIGN1cnJlbnQgPSAwO1xuICAgICAgJCgnLmN1cnRhaW4tbGVmdCcpLmFkZENsYXNzKCdjbG9zZUN1cnRhaW5zTCcpO1xuICAgICAgJCgnLmN1cnRhaW4tcmlnaHQnKS5hZGRDbGFzcygnY2xvc2VDdXJ0YWluc1InKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnI21haW4tbmF2JykuYWRkQ2xhc3MoJ2Jsb2NrJyk7XG4gICAgICAgIHZhciB0aW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiAgICAgICAgICB2YXIgYSA9ICQoYXJyW2N1cnJlbnRdKS5maW5kKCdhJyk7XG4gICAgICAgICAgYS5jc3Moeyd0cmFuc2Zvcm0nOidzY2FsZSgxKSd9KTtcbiAgICAgICAgICBpZiAoY3VycmVudCA+PSBhcnJfbGVuZ3RoLTEpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudCsrO1xuICAgICAgICB9LCB0cmFuc2l0aW9uLzIpOyBcblxuICAgICAgfSwgdHJhbnNpdGlvbik7XG4gICAgfVxuICB9KSgpO1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vL2VuZCBwb3J0Zm9saW8gaGVhZGVyLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v0LDQvdC40LzQuNGA0L7QstCw0L3QuNGPINGC0LXQutGB0YLQsCDQsiDRgdC70LDQudC00LXRgNC1Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgXG4gIHZhciB0aW1lb3V0ID0gNjAwO1xuICAoZnVuY3Rpb24oKXtcbiAgICB2YXJcbiAgICAgIGRlc2NyaXB0aW9ucyA9ICQoJy5zbGlkZXJfX2ltYWdlLWRlc2NyaXB0aW9uJyksXG4gICAgICB0aXRsZXMgPSBkZXNjcmlwdGlvbnMuZmluZCgnaDInKSxcbiAgICAgIHRlY2hub2xvZ2lzdHMgPSBkZXNjcmlwdGlvbnMuZmluZCgncCcpO1xuICAgICAgLy/RhNGD0L3QutGG0LjRjyDQv9C+0LTQs9C+0YLQvtCy0LjRgiDRgtC10LrRgdGCINC6INCw0L3QuNC80LDRhtC40Lgg0L/QvtGA0YPQsdCw0LXRgiDQvdCwINC+0YLQtNC10LvRjNC90YvQtSDQsdGD0LrQstGLINCy0YHQtSDRh9GC0L4g0L3QsNC00L5cbiAgICBmdW5jdGlvbiBmcmFjdGlvbihlKXtcbiAgICAgIGUuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgaXRlbS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdmFyXG4gICAgICAgICAgICB0aGF0ID0gJCh0aGlzKSxcbiAgICAgICAgICAgIHN0cmluZyA9IHRoYXQudGV4dCgpO1xuICAgICAgICAgIHRoYXQuaHRtbChzdHJpbmcucmVwbGFjZSgvLi9nLCAnPHNwYW4gY2xhc3M9XCJsZXR0ZXJcIj4kJjwvc3Bhbj4nKSk7XG4gICAgICAgICAgLy/Qv9GA0LjRgdCy0L7QtdC8INC60LDQttC00L7QuSDQsdGD0LrQstC1INC90LXQvtCx0YXQvtC00LjQvNGD0Y4g0LfQsNC00LXRgNC20LrRgyDQv9C10YDQtdC0INCw0L3QuNC80LDRhtC40LXQuVxuICAgICAgICAgIHZhclxuICAgICAgICAgICAgbGV0dGVycyA9IHRoYXQuZmluZCgnc3BhbicpLFxuICAgICAgICAgICAgZGVhbHkgPSAwO1xuICAgICAgICAgIGxldHRlcnMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgIHRoYXQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICBsZXRlckxlbmd0aCA9IGxldHRlcnMubGVuZ3RoO1xuICAgICAgICAgICAgdGhhdC5jc3MoeydhbmltYXRpb24tZGVsYXknOmRlYWx5Kydtcyd9KTtcbiAgICAgICAgICAgIGRlYWx5ICs9IHBhcnNlSW50KHRpbWVvdXQgLyBsZXRlckxlbmd0aCwgMTApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pOyBcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZnJhY3Rpb24oW3RpdGxlcywgdGVjaG5vbG9naXN0c10pO1xuICB9KSgpO1xuICBcbiAgZnVuY3Rpb24gdGV4dEFuaW1hdGUodGhhdCl7XG4gICAgdmFyXG4gICAgICBsZXR0ZXJMaXN0ID0gdGhhdC5maW5kKCcubGV0dGVyJyksXG4gICAgICBsaXN0TGVuZ3RoID0gbGV0dGVyTGlzdC5sZW5ndGgsXG4gICAgICBpID0gMDtcblxuICAgIChmdW5jdGlvbiBzaG93TGV0dGVyKCl7XG4gICAgICB2YXIgY3VycmVudExldHRlciA9ICQobGV0dGVyTGlzdFtpXSkuaHRtbCgpO1xuICAgICAvL9C10YHQu9C4INGN0YLQviDQv9GA0L7QsdC10Lsg0LfQsNC00LDQtNC40Lwg0LXQvNGDINGE0LjQutGB0LjRgNC+0LLQsNC90L3Rg9GOINGI0LjRgNC40L3RgyDQuNC90LDRh9C1INC/0L7RgtC+0Lwg0L7QvSDRgdC/0LvRjtGJ0LjRgtGM0YHRjyBcbiAgICAgIGlmIChjdXJyZW50TGV0dGVyID09PSAnICcpIHtcbiAgICAgICAgdmFyIGxldHRlcldpZHRoID0gJChsZXR0ZXJMaXN0W2ldKS53aWR0aCgpO1xuICAgICAgLy/QtdGB0LvQuCDRiNC40YDQuNC90LAg0L/RgNC+0LHQtdC70LAgPSAwLCDQt9C90LDRh9C40YIg0Y3RgtC+INC60L7QvdC10YYg0YHRgtGA0L7QutC4INC4INC90YPQttC90L4g0LLRgdGC0LDQstC40YLRjCDQtdC70LXQvNC10L3RgiDQv9C10YDQtdC90L7RgdCwINGB0YLRgNC+0LrQuFxuICAgICAgICBpZiAobGV0dGVyV2lkdGggPT0gMCkge1xuICAgICAgICAgICQobGV0dGVyTGlzdFtpXSkuYWZ0ZXIoJzxicj4nKTtcbiAgICAgICAgfVxuICAgICAgICAkKGxldHRlckxpc3RbaV0pLndpZHRoKGxldHRlcldpZHRoKTtcbiAgICAgIH1cbiAgICAgIGkrKztcbiAgICAgIChmdW5jdGlvbigpe1xuICAgICAgICBpZiAoaSA8IGxpc3RMZW5ndGgpIHtcbiAgICAgICAgICBzaG93TGV0dGVyKCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGxldHRlckxpc3QuYWRkQ2xhc3MoJ3Nob3dMZXR0ZXInKTtcbiAgICAgICAgfVxuICAgICAgfSkoKTtcbiAgICB9KSgpO1xuICB9XG4gICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9C60L7QvdC10YYg0LDQvdC40LzQuNGA0L7QstCw0L3QuNGPINGC0LXQutGB0YLQsCDQsiDRgdC70LDQudC00LXRgNC1Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9zdGFydCBzbGlkZXIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgKGZ1bmN0aW9uKCl7XG4gICAgJCgnLnNsaWRlcl9fYm90dG9tLXByZXZpZXcgbGksIC5zbGlkZXJfX3RvcC1wcmV2aWV3IGxpLCAuc2xpZGVyX19pbWFnZXMtbGlzdCcpLmNzcyh7J3RyYW5zaXRpb24tZHVyYXRpb24nOnRpbWVvdXQrJ21zJ30pO1xuICAgICQoJy5zbGlkZXJfX2ltYWdlcy1saXN0JykuY3NzKHsgJ3RyYW5zaXRpb24tZHVyYXRpb24nOnRpbWVvdXQvMisnbXMnfSk7XG4gICAgdmFyIGJ1dHRvbnMgPSAkKCcuc2xpZGVyX19idXR0b25zLWJvdHRvbSwgLnNsaWRlcl9fYnV0dG9ucy10b3AnKTtcbiAgICBidXR0b25zLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2dCl7XG4gICAgICAvL9GD0LTQsNC70LjQvCDQvtCx0YDQsNCx0L7RgtGH0LjQulxuICAgICAgYnV0dG9ucy5vZmYoKTtcbiAgICAgIHNsaWRlcihldnQpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAvL9Cy0LXRgNC90ZHQvCDQvtCx0YDQsNCx0L7RgtGH0LjQulxuICAgICAgICBidXR0b25zLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2dCl7c2xpZGVyKGV2dCk7fSk7XG4gICAgICB9LHRpbWVvdXQqMik7IFxuICAgIH0pO1xuICAgIGZ1bmN0aW9uIGNoYW5nZURlc2NyaXB0aW9uKGkpe1xuICAgICAgdmFyXG4gICAgICAgIGRlc2MgPSAkKCcuc2xpZGVyX19pbWFnZS1kZXNjcmlwdGlvbicpLmNsb25lKCksXG4gICAgICAgIHRpdGxlID0gJChkZXNjW2ldKS5maW5kKCdoMicpLmFkZENsYXNzKCdhbmltYXRlVGV4dCcpLFxuICAgICAgICB0ZWNobm9sb2dpZXMgPSAkKGRlc2NbaV0pLmZpbmQoJ3AnKS5hZGRDbGFzcygnYW5pbWF0ZVRleHQnKSxcbiAgICAgICAgbGluayA9ICQoZGVzY1tpXSkuZmluZCgnYScpO1xuXG4gICAgICAkKCcud29yay1kZXNjcmlwdGlvbl9fdGl0bGUgaDInKS5yZXBsYWNlV2l0aCh0aXRsZSk7XG4gICAgICAkKCcud29yay1kZXNjcmlwdGlvbl9fdGVjaG5vbG9naWVzIHAnKS5yZXBsYWNlV2l0aCh0ZWNobm9sb2dpZXMpO1xuICAgICAgJCgnLndvcmstZGVzY3JpcHRpb25fX2JvdHRvbiBhJykucmVwbGFjZVdpdGgobGluayk7XG4gICAgICB0ZXh0QW5pbWF0ZSgkKCcuYW5pbWF0ZVRleHQnKSk7XG4gICAgfVxuICAgIC8v0YPRgdGC0LDQstC40Lwg0L7Qv9C40YHQsNC90LjQtSDRgtC10LrRg9GJ0LXQuSDRgNCw0LHQvtGC0YtcbiAgICBjaGFuZ2VEZXNjcmlwdGlvbigwKTtcbiAgICB2YXIgaW1hZ2VMaXN0ICA9ICQoJy5zbGlkZXJfX2ltYWdlcy1saXN0Jyk7XG4gICAgZnVuY3Rpb24gc2xpZGVyKGV2dCl7XG4gICAgICB2YXIgaW1hZ2VzLCBhcnJMZW5naHQsIGJvdHRvbiwgcHJldiwgcHJldkxlZnQsIHByZXZSaWdodCwgcHJldjFMZWZ0LHByZXYyTGVmdCxcbiAgICAgICAgcHJldjFSaWdodCwgcHJldjJSaWdodCwgY3VycmVudExlZnRMaSwgbmV4dExlZnRMaSwgY3VycmVudFJpZ2h0TGksIG5leHRSaWdodExpO1xuXG4gICAgICBpbWFnZXMgICAgID0gaW1hZ2VMaXN0LmZpbmQoJ2xpJyk7XG4gICAgICBhcnJMZW5naHQgID0gaW1hZ2VzLmxlbmd0aDtcbiAgICAgIGJvdHRvbiAgICAgPSAkKGV2dC5jdXJyZW50VGFyZ2V0KS5hdHRyKCdjbGFzcycpO1xuICAgICAgcHJldiAgICAgICA9ICQoJy5zbGlkZXJfX2J1dHRvbnMnKTtcbiAgICAgIHByZXZMZWZ0ICAgPSBwcmV2LmZpbmQoJy5zbGlkZXJfX2JvdHRvbS1wcmV2aWV3IGxpJyk7XG4gICAgICBwcmV2UmlnaHQgID0gcHJldi5maW5kKCcuc2xpZGVyX190b3AtcHJldmlldyBsaScpO1xuICAgICAgcHJldjFMZWZ0ICA9ICQocHJldkxlZnRbMV0pO1xuICAgICAgcHJldjJMZWZ0ICA9ICQocHJldkxlZnRbMF0pO1xuICAgICAgcHJldjFSaWdodCA9ICQocHJldlJpZ2h0WzFdKTtcbiAgICAgIHByZXYyUmlnaHQgPSAkKHByZXZSaWdodFswXSk7XG4gICAgICAgIFxuICAgICAgLy/Rg9C30L3QsNC10Lwg0YLQtdC60YPRidC40Lkg0Lgg0YHQu9C10LTRg9GO0YnQuNC5INC10LvQtdC80LXQvdGC0Ysg0L/RgNC10LLRjNGO0YUsINGC0LXQutGD0YnQuNC5INGC0L7RgiDRh9GC0L4g0LLQuNC00LjQvCwg0LAg0YHQu9C10LTRg9GO0YnQuNC50LXQu9C10LzQtdC90YIg0YLQvtGCINGH0YLQviDQv9C+0LrQsCDRh9GC0L4g0YHQutGA0YvRgiBcbiAgICAgIGlmIChwcmV2MUxlZnQucG9zaXRpb24oKS50b3AgPiBwcmV2MkxlZnQucG9zaXRpb24oKS50b3ApIHtcbiAgICAgICAgY3VycmVudExlZnRMaSA9IHByZXYxTGVmdDtcbiAgICAgICAgbmV4dExlZnRMaSA9IHByZXYyTGVmdDtcbiAgICAgIH1lbHNle1xuICAgICAgICBjdXJyZW50TGVmdExpID0gcHJldjJMZWZ0O1xuICAgICAgICBuZXh0TGVmdExpID0gcHJldjFMZWZ0O1xuICAgICAgfVxuICAgICAgLy/QodC70LXQtNGD0Y7RidC40Lkg0LXQu9C10LzQtdC90YIg0YEg0LvQtdCy0LAg0LfQvdCw0YfQtdC90LjQtSDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxuICAgICAgbmV4dExlZnRMaSA9IG5ld1NyYyhuZXh0TGVmdExpLCBpbWFnZXNbYXJyTGVuZ2h0LTJdKTtcbiAgICAgIC8v0LXRgdC70Lgg0L3QsNC20LDQuyDQutC90L7Qv9C60YMg0L3QsNC30LDQtCDQvtC90LAg0LbQtSDQsiDQvdC40LdcbiAgICAgIGZ1bmN0aW9uIGJhY2soKXtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgIC8v0L/QtdGA0LXQutC40L3QtdC8INC40LfQvtCx0YDQsNC20LXQvdC40LUg0YEg0LrQvtC90LAg0LIg0L3QsNGH0LDQu9C+XG4gICAgICAgICAgaW1hZ2VMaXN0LnByZXBlbmQoaW1hZ2VzW2FyckxlbmdodC0xXSk7XG4gICAgICAgICAgaW1hZ2VMaXN0LnRvZ2dsZUNsYXNzKCdvcGFjaXR5Jyk7XG4gICAgICAgIH0sIHRpbWVvdXQvMik7XG4gICAgICAgIGNoYW5nZVByZXZpZXcoY3VycmVudExlZnRMaSwgbmV4dExlZnRMaSwgJ2JvdHRvbScsIGltYWdlc1thcnJMZW5naHQtM10pO1xuICAgICAgfVxuICAgICAgLy/Rg9C30L3QsNC10Lwg0YLQtdC60YPRidC40Lkg0Lgg0YHQu9C10LTRg9GO0YnQuNC5INC10LvQtdC80LXQvdGC0Ysg0L/RgNC10LLRjNGO0YUsINGC0LXQutGD0YnQuNC5INGC0L7RgiDRh9GC0L4g0LLQuNC00LjQvCwg0LAg0YHQu9C10LTRg1xuICAgICAgLy/Rg9C30L3QsNC10Lwg0YLQtdC60YPRidC40Lkg0Lgg0YHQu9C10LTRg9GO0YnQuNC5INC10LvQtdC80LXQvdGC0Ysg0L/RgNC10LLRjNGO0YUsINGC0LXQutGD0YnQuNC5INGC0L7RgiDQutC+0YLQvtGA0YvQuSDQvdCwINCy0LjQtNGDLCDQsCDRgdC70LXQtNGD0Y7RidC40LnQtdC70LXQvNC10L3RgiDRgtC+0YIg0YfRgtC+INC/0L7QutCwINGH0YLQviDRgdC60YDRi9GCXG4gICAgICBpZiAocHJldjFSaWdodC5wb3NpdGlvbigpLnRvcCA8IHByZXYyUmlnaHQucG9zaXRpb24oKS50b3ApIHtcbiAgICAgICAgY3VycmVudFJpZ2h0TGkgPSBwcmV2MVJpZ2h0O1xuICAgICAgICBuZXh0UmlnaHRMaSA9IHByZXYyUmlnaHQ7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgY3VycmVudFJpZ2h0TGkgPSBwcmV2MlJpZ2h0O1xuICAgICAgICBuZXh0UmlnaHRMaSA9IHByZXYxUmlnaHQ7XG4gICAgICB9XG4gICAgICAvL9Ch0LvQtdC00YPRjtGJ0LjQuSDQtdC70LXQvNC10L3RgiDRgSDQv9GA0LDQstCwINC30L3QsNGH0LXQvdC40LUg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cbiAgICAgIG5leHRSaWdodExpID0gbmV3U3JjKG5leHRSaWdodExpLCBpbWFnZXNbMl0pO1xuICAgICAgLy/QtdGB0LvQuCDQvdCw0LbQsNC7INCy0L/QtdGR0LQg0L7QvdCwINC20LUg0LLQstC10YDRhVxuICAgICAgZnVuY3Rpb24gZm9yd2FyZCgpe1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgLy/Qv9C10YDQtdC60LjQvdC10Lwg0LjQt9C+0LHRgNCw0LbQtdC90LjQtSDRgSDQvdCw0YfQsNC70LAg0LIg0LrQvtC90LXRhlxuICAgICAgICAgIGltYWdlTGlzdC5hcHBlbmQoaW1hZ2VzWzBdKTtcbiAgICAgICAgICBpbWFnZUxpc3QudG9nZ2xlQ2xhc3MoJ29wYWNpdHknKTtcbiAgICAgICAgfSwgdGltZW91dC8yKTtcbiAgICAgICAgY2hhbmdlUHJldmlldyhjdXJyZW50UmlnaHRMaSwgbmV4dFJpZ2h0TGksICd0b3AnLCBpbWFnZXNbM10pO1xuICAgICAgfSAgIFxuICAvL9C80LXQvdGP0LXQvCDQs9C70LDQstC90L7QtSDQuNC30L7QsdGA0LDQttC10L3QuNC1XG4gICAgICBmdW5jdGlvbiBjaGFuZ2VNYWluSW1hZ2UoKXtcbiAgICAgICAgaW1hZ2VMaXN0LnRvZ2dsZUNsYXNzKCdvcGFjaXR5Jyk7XG4gICAgICAgIGlmIChib3R0b24gPT0gJ3NsaWRlcl9fYnV0dG9ucy1ib3R0b20nKSB7XG4gICAgICAgICAgYmFjaygpO1xuICAgICAgICAgIGNoYW5nZURlc2NyaXB0aW9uKGFyckxlbmdodC0xKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgZm9yd2FyZCgpO1xuICAgICAgICAgIGNoYW5nZURlc2NyaXB0aW9uKDEpO1xuICAgICAgICB9IFxuICAgICAgfSAgXG4gIC8v0LzQtdC90Y/QvCDQv9GA0LXQstGO0YXRgyDQv9Cw0YDQsNC80LXRgtGA0Ys6INGC0LXQutGD0YnQsNGPINC70LgsINGB0LvQtdC00YPRjtGJ0LDRjyDRgtCwINC90LAg0LrQvtGC0L7RgNGD0Y4g0YHQtdGH0LDRgSDQt9Cw0LzQtdC90LXRgtGB0Y8g0YLQtdC60YPRidCw0Y8sINC90LDQv9GA0LDQstC70LXQvdC40LUg0LTQstC40LbQtdC90LjRjyDQsNC90LjQvNCw0YbRi9C4LFxuICAvL9C90L7QstCw0Y8g0LvQuCDRgtC+0LXRgdGC0Ywg0YEg0L3QvtCy0YvQvCDQuNC30L7QsdGA0LDQttC10L3QuNC10Lwg0Lgg0LLQvtC30LzQvtC20L3QviDQvtC/0LjRgdCw0L3QuNC10Lwg0L7QvdCwINC30LDQvNC10L3QtdGCINGC0YMg0LvQuCDQutC+0YLQvtGA0YPRjiDQvNGLINGB0LTQstC40L3QuNC8INC40Lcg0LfQvtC90Ysg0LLQuNC00LjQvNC+0YHRgtC4XG4gICAgICBmdW5jdGlvbiBjaGFuZ2VQcmV2aWV3KGN1cnJlbnRMaSwgbmV4dExpLCBkaXJlY3Rpb24sIG5ld0xpKXsgIFxuICAgICAgICBpZiAoZGlyZWN0aW9uID09ICdib3R0b20nKSB7XG4gICAgICAgICAgbW92ZSgnYm90Jyk7XG4gICAgICAgICAgcHJld0JhY2soJ2xlZnQnKTtcbiAgICAgICAgICAgLy8g0LrQu9C40LrQvdGD0LvQuCDQv9C+INC70LXQstC+0Lkg0LrQvdC+0L/QutC1INC30L3QsNGH0LjRgiDQvNC10L3Rj9C10Lwg0LfQvdCw0YfQtdC90LjRjyDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDQtNC70Y8g0YHQu9C10LTRg9GO0YnQuNCz0L4g0LXQu9C10LzQtdC90YLQsCDQv9GA0LDQstC+0Lkg0LrQvdC+0L/QutC1XG4gICAgICAgICAgbmV4dFJpZ2h0TGkgPSBuZXdTcmMobmV4dFJpZ2h0TGksIGltYWdlc1swXSk7XG4gICAgICAgICAgbW92ZSgndG9wJywgY3VycmVudFJpZ2h0TGksIG5leHRSaWdodExpKTtcbiAgICAgICAgICBwcmV3QmFjaygncmlnaHQnLCBjdXJyZW50UmlnaHRMaSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSAndG9wJykge1xuICAgICAgICAgIG1vdmUoJ3RvcCcpO1xuICAgICAgICAgIHByZXdCYWNrKCdyaWdodCcpO1xuICAgICAgICAgIC8vINC60LvQuNC60L3Rg9C70Lgg0L/QviDQv9GA0LDQstC+0Lkg0LrQvdC+0L/QutC1INC30L3QsNGH0LjRgiDQvNC10L3Rj9C10Lwg0LfQvdCw0YfQtdC90LjRjyDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDQtNC70Y8g0YHQu9C10LTRg9GO0YnQuNCz0L4g0LXQu9C10LzQtdC90YLQsCDQvdCwINC70LXQstC+0Lkg0LrQvdC+0L/QutC1XG4gICAgICAgICAgbmV4dExlZnRMaSA9IG5ld1NyYyhuZXh0TGVmdExpLCBpbWFnZXNbMF0pO1xuICAgICAgICAgIG1vdmUoJ2JvdCcsIGN1cnJlbnRMZWZ0TGksIG5leHRMZWZ0TGkpO1xuICAgICAgICAgIHByZXdCYWNrKCdsZWZ0JywgY3VycmVudExlZnRMaSk7XG4gICAgICAgIH1cbiAgICAgICAgLy/QstC+0LfQstGA0LLRidCw0LXRgiDRgdC60YDRi9GC0L7QtSDQv9GA0LXQstGOINC90LAg0YHRgtCw0YDRgtC+0LLQvtGOINC/0L7Qt9C40YbRi9GOLCDQv9Cw0YDQsNC80LXRgtGA0Ysg0LrQsNC60L7QtSDQv9GA0LXQstGM0Y4g0LvQtdCy0L7QtSDQuNC70Lgg0L/RgNCw0LLQvtC1LCDQuCDQvdC1INC+0LHQtdC30LDRgtC10LvRjNC90YvQuSDRgtC10LrRg9GJ0LjQudGN0LvQtdC80L3RglxuICAgICAgICBmdW5jdGlvbiBwcmV3QmFjayhwcmV2LCBjdXJyZW50RWxlbWVudCl7XG4gICAgICAgICAgaWYgKGN1cnJlbnRFbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gY3VycmVudExpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYgKHByZXYgPT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gbmV3U3JjKGN1cnJlbnRFbGVtZW50LCBuZXdMaSk7XG4gICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LmNzcyh7J3RyYW5zaXRpb24tZHVyYXRpb24nOicwbXMnLCAndHJhbnNmb3JtJzondHJhbnNsYXRlWSgwKSd9KTtcbiAgICAgICAgICAgIH1lbHNlIGlmIChwcmV2ID09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSBuZXdTcmMoY3VycmVudEVsZW1lbnQsIG5ld0xpKTtcbiAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQuY3NzKHsndHJhbnNpdGlvbi1kdXJhdGlvbic6JzBtcycsICd0cmFuc2Zvcm0nOid0cmFuc2xhdGVZKDEwMCUpJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG1vdmUoZGlyZWN0aW9uLCBjdXJyZW50RWxlbWVudCwgbmV4dEVsZW1lbnQpe1xuICAgICAgICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gdW5kZWZpbmVkIHx8IG5leHRFbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gY3VycmVudExpO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBuZXh0TGk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG5leHRFbGVtZW50LmNzcyh7J3RyYW5zaXRpb24tZHVyYXRpb24nOnRpbWVvdXQrJ21zJ30pO1xuICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT0gJ2JvdCcpIHtcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LmNzcyh7J3RyYW5zZm9ybSc6J3RyYW5zbGF0ZVkoMjAwJSknfSk7XG4gICAgICAgICAgICBuZXh0RWxlbWVudC5jc3Moeyd0cmFuc2Zvcm0nOid0cmFuc2xhdGVZKDEwMCUpJ30pO1xuICAgICAgICAgIH1lbHNlIGlmKGRpcmVjdGlvbiA9PSAndG9wJyl7XG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudC5jc3Moeyd0cmFuc2Zvcm0nOid0cmFuc2xhdGVZKC0xMDAlKSd9KTtcbiAgICAgICAgICAgIG5leHRFbGVtZW50LmNzcyh7J3RyYW5zZm9ybSc6J3RyYW5zbGF0ZVkoMCknfSk7ICBcbiAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgICB9XG4gIC8v0YTRg9C90LrRhtC40Y8g0LzQtdC90Y/QtdGCINC60LDRgtGA0LjQvdC60YMg0LggaDEg0LIgbGkg0Y3Qu9C10LzQtdC90YLRgtC1XG4gICAgICBmdW5jdGlvbiBuZXdTcmMob2xkTGksIG5ld0xpKXtcbiAgICAgICAgdmFyXG4gICAgICAgICAgdG1wU3JjID0gJChuZXdMaSkuZmluZCgnaW1nJykuYXR0cignc3JjJyksXG4gICAgICAgICAgdG1wSDEgPSAkKG5ld0xpKS5maW5kKCdoMScpLmh0bWwoKTtcbiAgICAgICAgLy/Qt9Cw0LzQtdC90LjQvCDQsNC00YDQtdGBINC6INC60LDRgNGC0LjQvdC60LVcbiAgICAgICAgb2xkTGkuZmluZCgnaW1nJykuYXR0cih7J3NyYyc6dG1wU3JjfSk7XG4gICAgICAgIC8v0LfQsNC80LXQvdC40Lwg0LrQvtC90YLQtdC90YIg0LIgaDFcbiAgICAgICAgb2xkTGkuZmluZCgnaDEnKS5odG1sKHRtcEgxKTtcbiAgICAgICAgcmV0dXJuIG9sZExpO1xuICAgICAgfVxuICAgICAgY2hhbmdlTWFpbkltYWdlKCk7XG4gICAgfVxuICB9KSgpO1xuICBcbiAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL2VuZCBzbGlkZXIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vcHNyYWxsYXgvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAoZnVuY3Rpb24gKCkge1xuICAgIHZhclxuICAgICAgbGF5ZXIgPSAkKCcucGFyYWxsYXgnKS5maW5kKCcucGFyYWxsYXhfX2xheWVyJyksXG4gICAgICBsYXllclNjcm9sbCA9ICQoJy5wYXJhbGxheF9zY3JvbGwnKS5maW5kKCcucGFyYWxsYXhfX2xheWVyJyk7XG4gICAgJCh3aW5kb3cpLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkgeyBcbiAgICAgIHZhclxuICAgICAgICBtb3VzZV9keCA9IChlLnBhZ2VYKSwgLy8g0KPQt9C90LDQtdC8INC/0L7Qu9C+0LbQtdC90LjQtSDQvNGL0YjQutC4INC/0L4gWFxuICAgICAgICBtb3VzZV9keSA9IChlLnBhZ2VZKSwgLy8g0KPQt9C90LDQtdC8INC/0L7Qu9C+0LbQtdC90LjQtSDQvNGL0YjQutC4INC/0L4gWVxuICAgICAgICB3ID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgLSBtb3VzZV9keCwgLy8g0JLRi9GH0LjRgdC70Y/QtdC8INC00LvRjyB4INC/0LXRgNC10LzQtdGJ0LXQvdC40Y9cbiAgICAgICAgaCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIG1vdXNlX2R5OyAvLyDQktGL0YfQuNGB0LvRj9C10Lwg0LTQu9GPIHkg0L/QtdGA0LXQvNC10YnQtdC90LjRj1xuXG4gICAgICBsYXllci5tYXAoZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgd2lkdGhQb3NpdGlvbiA9IHcgKiAoa2V5IC8gMTAwKSwgLy8g0JLRi9GH0LjRgdC70Y/QtdC8INC60L7QvtGE0LjRhtC10L3RgiDRgdC80LXRiNC10L3QuNGPINC/0L4gWFxuICAgICAgICAgIGhlaWdodFBvc2l0aW9uID0gaCAqIChrZXkgLyAxMDApOyAvLyDQktGL0YfQuNGB0LvRj9C10Lwg0LrQvtC+0YTQuNGG0LXQvdGCINGB0LzQtdGI0LXQvdC40Y8g0L/QviBZXG5cbiAgICAgICAgJCh2YWx1ZSkuY3NzKHtcbiAgICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcgKyB3aWR0aFBvc2l0aW9uICsgJ3B4LCAnICsgaGVpZ2h0UG9zaXRpb24gKyAncHgsIDApJ1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZhciB3aW5kb3dIZWlndGggPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIHdpblNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgIGlmICh3aW5kb3dIZWlndGggPiB3aW5TY3JvbGxUb3ApIHtcbiAgICAgICAgbGF5ZXJTY3JvbGwubWFwKGZ1bmN0aW9uIChrZXksIHZhbHVlKXtcbiAgICAgICAgICB2YXIgYmlhcyA9IHdpblNjcm9sbFRvcCAqIChrZXkvMjApO1xuICAgICAgICAgICQodmFsdWUpLmNzcyh7XG4gICAgICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKDAsICcgKyAtYmlhcyArJ3B4LCAwKSdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2V7cmV0dXJuO31cbiAgICB9KTtcbiAgfSkoKTsgIFxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9wc3JhbGxheC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vc2tpbGxzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgKGZ1bmN0aW9uKCl7XG4gICAgdmFyXG4gICAgICB0YXJnZXQgPSAkKCcubXktc2tpbGxzLWJveC1jZWVudGVyJyksXG4gICAgICB3aW5kb3dIZWlndGggPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG5cbiAgICBpZih0YXJnZXQubGVuZ3RoID4gMCkge1xuICAgICAgdmFyXG4gICAgICAgIHNraWxscyA9ICQoJy5teS1za2lsbHNfX2l0ZW0nKSxcbiAgICAgICAgZGF0YTtcblxuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lm9mZnNldCgpLnRvcDtcbiAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHdpblNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgaWYgKHdpblNjcm9sbFRvcCt3aW5kb3dIZWlndGgvMTAqNyA+IHRhcmdldCkge1xuICAgICAgICAgIHNraWxscy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgZGF0YSA9ICR0aGlzLmF0dHIoJ2RhdGEtc2tpbGwnKTtcbiAgICAgICAgICAgIGlmIChkYXRhID09IDApIHtkYXRhID0gMTt9XG4gICAgICAgICAgICBkYXRhID0gIHBhcnNlSW50KCA3MjIqKGRhdGEvMTAwKSApO1xuICAgICAgICAgICAgJHRoaXMuZmluZCgnLnNlY3RvcicpLmNzcyh7J3N0cm9rZS1kYXNoYXJyYXknOmRhdGErJyA3MjInfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgfSkoKTtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9za2lsbHMvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9wb3BfdXAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICBmdW5jdGlvbiBwb3BVcChtZXNzYWdlLCB0aW1lKXtcbiAgICBpZiAodGltZSA9PSB1bmRlZmluZWQpIHt0aW1lID0gNTAwMDt9XG4gICAgJCgnI3BvcF91cC1jb250ZW50JykuaHRtbChtZXNzYWdlKTtcbiAgICAkKCcjcG9wX3VwJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICQoJyNwb3BfdXAnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgfSwgdGltZSk7XG4gIH1cblxuICAoZnVuY3Rpb24oKXtcbiAgICAkKCcjcG9wX3VwLWJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAkKCcjcG9wX3VwJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH0pO1xuICB9KSgpO1xuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9wb3BfdXAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gIC8v0LHQtdGA0ZHRgiDQtNCw0L3QvdGL0LUg0YEg0YTQvtGA0LzRiyDQv9C+0LvRg9GH0LXQvdC+0Lkg0LIg0LrQsNGH0LXRgdGC0LLQtSDQv9Cw0YDQsNC80LXRgtGA0LAg0Lgg0YHRhNC+0YDQvNC40YDRg9C10Lwg0LTQstGD0YUg0YPRgNC+0LLQtdCy0YvQuSDQvNCw0YHRgdC40LIg0LTQtNC90L3Ri9GFINC00LvRjyDQvtGC0L/RgNCw0LLQutC4INC90LAg0YHQtdGA0LLQtdGAXG4gIGZ1bmN0aW9uIGdldERhdGEoZm9ybSl7XG4gICAgdmFyXG4gICAgICBmb3JtSWQgPSBmb3JtLmF0dHIoJ2lkJyksXG4gICAgICBpbnB1dHMgPSBmb3JtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYScpLFxuICAgICAgZGF0YSA9IFtbJ2Zvcm1JZCcsIGZvcm1JZF1dO1xuICAgIGlucHV0cy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdGhhdCA9ICQodGhpcyksIGN1cmVudERhdGEgPSBbdGhhdC5hdHRyKCdpZCcpLCB0aGF0LnZhbCgpLnRyaW0oKV07XG4gICAgICBkYXRhW2RhdGEubGVuZ3RoXSA9IGN1cmVudERhdGE7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhcihmb3JtKXtcbiAgICB2YXIgaW5wdXRzID0gZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEnKTtcblxuICAgIGlucHV0cy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLnZhbCgnJyk7XG4gICAgfSk7XG4gIH1cblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vZm9ybSBvZiBjb21tdW5pY2F0aW9uLy8vLy8vLy8vLy8vLy8vL1xuXG4gIChmdW5jdGlvbigpe1xuICAgIHZhciBmb3JtQm94ID0gJCgnI2NvbnRhY3QtZm9ybS1ib3gnKTtcbiAgICBpZiAoZm9ybUJveC5sZW5ndGggPCAxKSB7cmV0dXJuO31cbiAgICB2YXJcbiAgICAgIGZvcm0gPSBmb3JtQm94LmZpbmQoJyNjb250YWN0LWZvcm0nKSxcbiAgICAgIGJ1dHRvbnMgPSBmb3JtQm94LmZpbmQoJy5jb250YWN0LWZvcm1fX2J1dHRvbnMnKTtcblxuICAgIGJ1dHRvbnMub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZ0KXtcbiAgICAgIGlmICggJChldnQudGFyZ2V0KS5hdHRyKCdpZCcpID09PSAnc2VuZC1tZXNzYWdlJyApIHtcbiAgICAgICAgdmFyIGRhdGEgPSBnZXREYXRhKGZvcm0pO1xuICAgICAgICAvL9C/0YDQvtC50LTQtdC80YHRjyDQv9C+INC40LzQv9GD0YLQsNC8INC90L4g0L/RgNC+0L/Rg9GB0YLQuNC8IGlkINGC0LXQutGD0YnQtdC5INGE0L7RgNC80YtcbiAgICAgICAgdmFyXG4gICAgICAgICAgZXJyb3JzID0gW10sXG4gICAgICAgICAgbWFpbCA9ICcnO1xuICAgICAgICBmb3IodmFyIGk9MTsgaTxkYXRhLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICB2YXJcbiAgICAgICAgICAgIGN1cnJlbklkID0gZGF0YVtpXVswXSxcbiAgICAgICAgICAgIGN1cnJlbnREYXRhID0gZGF0YVtpXVsxXTtcblxuICAgICAgICAgIGlmIChjdXJyZW5JZCA9PSAnbWFpbCcpIHttYWlsID0gY3VycmVudERhdGE7fVxuXG4gICAgICAgICAgaWYgKGN1cnJlbnREYXRhLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHZhciBtYXNzZWdlID0gWyBbJ25hbWUnLCfQmNC80Y8nXSwgWydtYWlsJywgJ0VtYWlsJ10sIFsnbWVzc2FnZScsICfQodC+0L7QsdGJ0LXQvdC40LUnXSBdO1xuICAgICAgICAgICAgdmFyIGN1cnJlbklucHV0ID0gJyc7XG4gICAgICAgICAgICAvL9C/0L7RgdC80L7RgtGA0LjQvCDRgdGB0L7QsdGJ0LXQvdC40Y8g0YEg0L7RgiDQuNC80LXQvdC4INC60LDQutC+0LPQviDQv9C+0LvRjyDQvdGD0LbQvdC+INCy0YvQstC10YHRgtC4XG4gICAgICAgICAgICBtYXNzZWdlLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgICAgICAgICAgIGlmIChjdXJyZW5JZCA9PT0gZWxlbWVudFswXSkge2N1cnJlbklucHV0ID0gZWxlbWVudFsxXTt9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVycm9yc1tlcnJvcnMubGVuZ3RoXSA9IGN1cnJlbklucHV0Kycg0L3QtSDQvNC+0LbQtdGCINCx0YvRgtGMINC/0YPRgdGC0YvQvCEgPGJyPic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciByID0gL15cXHcrQFxcdytcXC5cXHd7Miw0fSQvaTtcbiAgICAgICAgaWYgKGVycm9ycy5sZW5ndGggPCAxICYmICFyLnRlc3QobWFpbCkgKXtcbiAgICAgICAgICBlcnJvcnNbZXJyb3JzLmxlbmd0aF0gPSAn0J3QtSDQutC+0YDQtdC60YLQvdGL0LkgZS1tYWlsISc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9ycy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgdmFyIGFuc3dlciA9IHRydWU7XG4gICAgICAgICAgLy/QtdGB0LvQuCDQvtGI0YLQsdC+0Log0L3QtdGCINC+0YLRgNCw0LLQuNC8INC30LDQv9GA0L7RgSDQvdCwINGB0LXRgNCy0LXRgFxuXG4gICAgICAgICAgLy/QtdGB0LvQuCDQvtGCINGB0LXRgNCy0LXRgNCwINC/0YDQuNC50LTQtdGCINC/0L7Qu9C+0LbQuNGC0LXQu9GM0L3Ri9C5INC+0YLQstC10YJcbiAgICAgICAgICBpZiAoYW5zd2VyID09PSB0cnVlKSB7XG4gICAgICAgICAgICBwb3BVcCgn0KPQodCf0JXQqNCd0J4g0J7QotCf0KDQkNCS0JvQldCd0J4hJywgMzAwMCk7XG4gICAgICAgICAgICBjbGVhcihmb3JtKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfWVsc2V7cG9wVXAoZXJyb3JzKTt9XG4gICAgICAgIFxuICAgICAgfWVsc2UgaWYoJChldnQudGFyZ2V0KS5hdHRyKCdpZCcpID09PSAncmVzZXQnKXtcbiAgICAgICAgY2xlYXIoZm9ybSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pKCk7XG5cblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vZm9ybSBvZiBjb21tdW5pY2F0aW9uLy8vLy8vLy8vLy8vLy8vL1xuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9hZG1pbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAoZnVuY3Rpb24oKXtcbiAgICB2YXIgXG4gICAgICBhZG1pbkZvcm1zID0gJCgnLmFkbWluLWZvcm0nKSxcbiAgICAgIG1lbkxpc3QgPSAkKCcuYWRtaW4tbmF2X19pdGVtJyk7XG5cbiAgICBtZW5MaXN0LmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJCh0aGF0KS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfWVsc2V7XG4gICAgICAgICQodGhhdCkuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICQodGhhdCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBzaG93Rm9ybSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgXG4gICAgZnVuY3Rpb24gc2hvd0Zvcm0oKXtcbiAgICAgIHZhciBjb3VudCA9IDA7XG4gICAgICAvL9GE0YPQvdC60YbRi9GPINC/0L7QutCw0LbQtdGCINC90YPQttC90YPRjiDRhNC+0YDQvNGDINC4INGB0LrRgNC+0LXRgiDQvdC1INC90YPQttC90YPRjiDRgNC10YjQtdC90LjRjyDQv9GA0LjQvdC40LzQsNC10YLRjNGB0Y8g0L3QsCDQvtGB0L3QvtCy0LUg0LDQutGC0LjQstC90L7Qs9C+INC10LvQtdC80LXQvdGC0LAg0LzQtdC90Y5cbiAgICAgIG1lbkxpc3QuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIGlmICggJCh0aGF0KS5oYXNDbGFzcygnYWN0aXZlJykgKSB7XG4gICAgICAgICAgJChhZG1pbkZvcm1zW2NvdW50XSkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICQoYWRtaW5Gb3Jtc1tjb3VudF0pLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgIH1cbiAgICAgICAgY291bnQrKzsgIFxuICAgICAgfSk7XG4gICAgfVxuICAgIGFkbWluRm9ybXMuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICBzaG93Rm9ybSgpO1xuICAgIFxuICB9KSgpO1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vYWRtaW4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9GE0L7RgNC80LAg0LLRhdC+0LTQsC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAoZnVuY3Rpb24oKXtcbiAgICB2YXIgbG9naW5EYXRhID0ge307XG4gICAgJCgnI2xvZ2luLW5hdl9fZW50ZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgdmFyXG4gICAgICAgIGxvZ2luRm9ybSA9ICQoJyNsb2dpbi1mb3JtJyksXG4gICAgICAgIGVycm9ycyA9IFtdO1xuXG4gICAgICBsb2dpbkRhdGEubG9naW4gPSBsb2dpbkZvcm0uZmluZCgnI2xvZ2luJykudmFsKCkudHJpbSgpLFxuICAgICAgbG9naW5EYXRhLnBhc3MgPSBsb2dpbkZvcm0uZmluZCgnI3Bhc3N3b3JkJykudmFsKCkudHJpbSgpLFxuICAgICAgbG9naW5EYXRhLmh1bWFuID0gbG9naW5Gb3JtLmZpbmQoJyNsb2dpbmZvcm1fY2hlY2snKS5wcm9wKCdjaGVja2VkJyksXG4gICAgICBsb2dpbkRhdGEuZXhhY3RseUh1bWFuID0gbG9naW5Gb3JtLmZpbmQoJyNyYWRpb195ZXMnKS5wcm9wKCdjaGVja2VkJyk7XG4gICAgICAgIFxuICAgICAgZm9yKHZhciBwcm9wZXJ0eSBpbiBsb2dpbkRhdGEpe1xuICAgICAgICB2YXIgcHJvcExhbHVlID0gbG9naW5EYXRhW3Byb3BlcnR5XTtcbiAgICAgICAgaWYgKCBwcm9wTGFsdWUgPT09IGZhbHNlIHx8IHByb3BMYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8v0LfQvdCw0YfQtdGCINGN0YLQviDRh9C10LrQsdC+0LrRgdGLXG4gICAgICAgICAgaWYgKHByb3BMYWx1ZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgZXJyb3JzWzFdID0gJ9Cf0L7QttC+0LbQtSDRh9GC0L4g0LLRiyDRgNC+0LHQvtGCITxicj4nO1xuICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgLy/Qt9C90LDRh9C10YIg0Y3RgtC+INGB0YLRgNC+0LrQuFxuICAgICAgICAgIHZhciBzdHJMZW5ndGggPSBwcm9wTGFsdWUubGVuZ3RoO1xuICAgICAgICAgIGlmIChzdHJMZW5ndGggPCA0IHx8IHN0ckxlbmd0aCA+IDE0KSB7XG4gICAgICAgICAgICBlcnJvcnNbMF0gPSAn0JTQu9C40L3QvdCwINC70L7Qs9C40L3QsCDQuCDQv9Cw0YDQvtC70Y8g0LTQvtC70LbQvdCwINCx0YvRgtGMINC+0YIgNCDQtNC+IDE0INGB0LjQvNCy0L7Qu9C+0LIhPGJyPic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgZXJyb3JzLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgbWVzc2FnZSArPSAoaXRlbSkgPyBpdGVtKydcXG4nOicgJztcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcG9wVXAobWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8v0LTQsNC70LUg0YDQsNCx0L7RgtCwINC30LAg0YHQtdGA0LLQtdGA0L7QvFxuICAgIH0pO1xuICB9KSgpO1xuICAvL9GD0LTQsNC70LjQuiDRhNGA0LXQudC8INGBINC60LDRgNGC0L7QuSDQvdCwINC80L7QsdC40LvRjNC90YvRhVxuICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDE2KSB7XG4gICAgJCgnLnNlY3Rpb24tY29udGFjdHMgaWZyYW1lJykucmVtb3ZlKCk7XG4gIH1cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v0YTQvtGA0LzQsCDQstGF0L7QtNCwLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/QkNC00LzQuNC9Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgKGZ1bmN0aW9uKCl7XG4gICAgaWYgKCQoJy5hZG1pbi1mb3JtJykubGVuZ3RoIDwgMSl7cmV0dXJuO31cbiAgICAvL9C40LfQvNC10L3QuNC8INGG0LLQtdGCIHBvcFVwINC00LvRjyDQsNC00LzQuNC90LrQuFxuICAgICQoJyNwb3BfdXAnKS5jc3MoeydiYWNrZ3JvdW5kLWNvbG9yJzonIzAwQTc4RSd9KTtcbiAgICB2YXJcbiAgICAgIGZvcm1BYm91dE1lID0gJCgnI2FkbWluLWFib3V0LW1lJyksXG4gICAgICBmb3JtQmxvZyA9ICQoJyNhZG1pbi1ibG9nJyksXG4gICAgICBmb3JtV29ya3MgPSAkKCcjYWRtaW4td29ya3MnKTsgIFxuICAgIC8v0L/RgNC+0LLQtdGA0Y/QtdC8INCy0LLQvtC00LjRgtGB0Y8g0LvQuCDQsiBpbnB1dCDRh9C40YHQu9C+INC10YHQu9C4INC90LXRgiDRh9C40YHRgtC40Lwg0LXQs9C+XG4gICAgZm9ybUFib3V0TWUuZmluZCgnaW5wdXQnKS5vbignaW5wdXQnLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIHZhbHVlID0gcGFyc2VJbnQoICQodGhpcykudmFsKCkgKTtcbiAgICAgIGlmICggaXNOYU4odmFsdWUpICkgeyQodGhpcykudmFsKCcnKTt9XG4gICAgfSk7XG4gICAgXG4gICAgZm9ybUFib3V0TWUuZmluZCgnI2FkbWluLWFib3V0LW1lX19zYXZlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBlcnJvcnMgPSBbXTtcbiAgICAgIGlmIChlcnJvcnMubGVuZ3RoPDEpIHtcbiAgICAgICAgcG9wVXAoJ9GB0L7RhdGA0LDQvdC10L3QvicsIDE1MDApO1xuICAgICAgfWVsc2V7cG9wVXAoZXJyb3JzKTt9XG4gICAgICB2YXIgZGF0YSA9IGdldERhdGEoZm9ybUFib3V0TWUpO1xuXG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICB9KTtcbiAgICBmb3JtQmxvZy5maW5kKCcjYWRtaW4tYmxvZ19fc2F2ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgZXJyb3JzID0gW107XG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aDwxKSB7XG4gICAgICAgIHBvcFVwKCfRgdC+0YXRgNCw0L3QtdC90L4nLCAxNTAwKTtcbiAgICAgIH1lbHNle3BvcFVwKGVycm9ycyk7fVxuICAgICAgdmFyIGRhdGEgPSBnZXREYXRhKGZvcm1CbG9nKTtcblxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgfSk7XG4gICAgZm9ybVdvcmtzLmZpbmQoJyNhZG1pbi13b3Jrc19fc2F2ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgZXJyb3JzID0gW107XG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aDwxKSB7XG4gICAgICAgIHBvcFVwKCfRgdC+0YXRgNCw0L3QtdC90L4nLCAxNTAwKTtcbiAgICAgIH1lbHNle3BvcFVwKGVycm9ycyk7fVxuICAgICAgdmFyIGRhdGEgPSBnZXREYXRhKGZvcm1Xb3Jrcyk7XG5cbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgfSk7XG4gIH0pKCk7XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/QkNC00LzQuNC9Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
