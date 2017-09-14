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
      arr_length = arr.length,
      fontSize = $(arr[0]).css('font-size');

    function show_menu(){
      menuButton.addClass('menu-button-close');
      $(arr).find('a').css('font-size', '0');
      var current = 0;
      $('.curtain-left').addClass('closeCurtainsL');
      $('.curtain-right').addClass('closeCurtainsR');
      setTimeout(function(){
        $('#main-nav').addClass('block');
        var timerId = setInterval(function(){
          var a = $(arr[current]).find('a');
          a.animate({'font-size':fontSize}, {
            duration:transition
          });
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
        technologies = $(desc[i]).find('p').addClass('animateText');

      $('.work-description__title h2').replaceWith(title);
      $('.work-description__technologies p').replaceWith(technologies);
      textAnimate($('.animateText'));
    }
    function slider(evt){
      var imageList, images, arrLenght, botton, prev, prevLeft, prevRight, prev1Left,prev2Left, prev1Right, prev2Right, currentLeftLi, nextLeftLi, currentRightLi, nextRightLi;

      imageList  = $('.slider__images-list');
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
      if ( parseInt(prev1Left.css('top')) > parseInt(prev2Left.css('top'))) {
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
      //узнаем текущий и следующий елементы превьюх, текущий тот который на виду, а следующийелемент тот что пока что скрыт
      if (parseInt(prev1Right.css('top')) < parseInt(prev2Right.css('top'))) {
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
              currentElement.css({'transition-duration':'0ms', 'top':'0'});
            }else if (prev == 'right') {
              currentElement = newSrc(currentElement, newLi);
              currentElement.css({'transition-duration':'0ms', 'top':'100%'});
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
            currentElement.css({'top':'200%'});
            nextElement.css({'top':'100%'});
          }else if(direction == 'top'){
            currentElement.css({'top': '-100%'});
            nextElement.css({'top':'0'});  
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
            errors[1] = 'Пожоже что вы робот.';
          }
        }else{
          //значет это строки
          var strLength = propLalue.length;
          if (strLength < 4 || strLength > 14) {
            errors[0] = 'Длинна логина и пароля должна быть от 4 до 14 символов.';
          }
        }
      }
      if (errors.length > 0) {
        var message = 'При заполнении формы обнаружены следующие ошибки.\n';
        errors.forEach(function(item){
          message += (item) ? item+'\n':' ';
          //console.log(item);
        });
        alert(message);
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
    var
      formAboutMe = $('#admin-about-me'),
      formBlog = $('#admin-blog'),
      formWorks = $('#admin-works');  
    //проверяем вводится ли в input число если нет чистим его
    formAboutMe.find('input').on('input', function(){
      var value = parseInt( $(this).val() );
      if ( isNaN(value) ) {$(this).val('');}
    });
    //берёт данные с формы полученой в качестве параметра и сформируем двух уровевый массив дднных для отправки на сервер
    function getData(form){
      var
        formId = form.attr('id'),
        inputs = form.find('input, textarea'),
        data = [['formId', formId]];
      inputs.each(function(){
        var that = $(this), curentData = [that.attr('id'), that.val()];
        data[data.length] = curentData;
      });
      return data;
    }
    
    formAboutMe.find('#admin-about-me__save').on('click', function(){
      var data = getData(formAboutMe);
      console.log(data);
    });
    formBlog.find('#admin-blog__save').on('click', function(){
      var data = getData(formBlog);
      console.log(data);
    });
    formWorks.find('#admin-works__save').on('click', function(){
      var data = getData(formWorks);
      console.log(data);

    });
  })();
  /////////////////////////Админ//////////////////////////
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9wcmVsb2FkZXIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAkKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcuYWJvdXQtd3JhcHBlciwgLmJsb2ctd3JhcHBlciwgLmluZGV4LXdyYXBwZXIsIC53b3Jrcy13cmFwcGVyLCAuYWRtaW4td3JhcHBlcicpLmNzcyh7J2Rpc3BsYXknOidub25lJ30pO1xuICAgIHZhciBpbWdzID0gW107XG4gICAgJC5lYWNoKCQoJyonKSwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgYmFja2dyb3VuZCA9ICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLFxuICAgICAgICBpbWcgPSAkdGhpcy5pcygnaW1nJyk7XG4gICAgICBpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpIHtcbiAgICAgICAgdmFyIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XG5cbiAgICAgICAgaW1ncy5wdXNoKHBhdGgpO1xuICAgICAgfVxuICAgICAgaWYgKGltZykge1xuICAgICAgICBwYXRoID0gJHRoaXMuYXR0cignc3JjJyk7XG4gICAgICAgIGltZ3MucHVzaChwYXRoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgcGVyY2VudHMgPSAxO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW1ncy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGltYWdlID0gJCgnPGltZz4nLCB7XG4gICAgICAgIGF0dHI6IHtcbiAgICAgICAgICBzcmMgOiBpbWdzW2ldXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaW1hZ2UubG9hZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldFBlcmNlbnRzKGltZ3MubGVuZ3RoLCBwZXJjZW50cyk7XG4gICAgICAgIHBlcmNlbnRzKys7XG4gICAgICB9KTtcbiAgICAgIGltYWdlLmVycm9yKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0UGVyY2VudHMoaW1ncy5sZW5ndGgsIHBlcmNlbnRzKTtcbiAgICAgICAgcGVyY2VudHMrKztcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvL9CV0KHQm9CYINCa0JDQoNCi0JjQndCe0Jog0J3QldCiIFxuICAgIGlmKGltZ3MubGVuZ3RoID09PSAwKXtcbiAgICAgIHNldFBlcmNlbnRzKDEsMSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFBlcmNlbnRzKHRvdGFsLCBjdXJyZW50KSB7XG4gICAgICB2YXIgcGVyY2VudCA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xuICAgICAgaWYgKHBlcmNlbnQgPj0gMTAwKSB7XG4gICAgICAgICQoJy5hYm91dC13cmFwcGVyLCAuYmxvZy13cmFwcGVyLCAuaW5kZXgtd3JhcHBlciwgLndvcmtzLXdyYXBwZXIsIC5hZG1pbi13cmFwcGVyJykuY3NzKHsnZGlzcGxheSc6J2Jsb2NrJ30pO1xuICAgICAgICAkKCcucGxhdGUtZnJvbnQnKS5hZGRDbGFzcygnYW5pbWF0ZV9wbGF0ZScpO1xuICAgICAgICAkKCcubG9hZGVyLXdyYXBwZXInKS5mYWRlT3V0KDE1MDAsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLnBsYXRlLWZyb250JykucmVtb3ZlQ2xhc3MoJ2FuaW1hdGVfcGxhdGUnKTtcbiAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAkKCcubG9hZGVyX19wZXJjZW50JykudGV4dChwZXJjZW50ICsgJyUnKTtcbiAgICB9XG4gIH0pO1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vL3ByZWxvYWRlci8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vLy8vLy8vLy8vLy8vLy8vLyDQv9C70LDQstC90YvQuSDRgdC60YDQvtC7IC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAkKCdhW2hyZWZePVwiI1wiXScpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7ICAvL9GD0LfQvdCw0LXQvCDQvNC10YHRgtC+INC90LDQt9C90LDRh9C10L3QuNGPIFxuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IGRlc3RpbmF0aW9ufSwgMTAwMCk7ICAvL9C00LLQuNCz0LDQtdC8INC6INC90LjQvNGDXG4gICAgcmV0dXJuIGZhbHNlOyAgICAgICAgICAgICAgICAgICAgIFxuICB9KTtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vINC/0LvQsNCy0L3Ri9C5INGB0LrRgNC+0LsgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9C/0LXRgNC10LLQtdGA0L3Rg9GC0Ywg0L/Qu9Cw0YjQutGDLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAkKCcjdG8tbWFpbi1idXQsICNhdXRob3JpemF0aW9uLWJ1dHRvbicpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAkKCcjcGxhdGUnKS50b2dnbGVDbGFzcygncGxhdGUtZnJvbnQnKTtcbiAgfSk7XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v0L/QtdGA0LXQstC10YDQvdGD0YLRjCDQv9C70LDRiNC60YMvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9C60L7QtCDRgdGC0YDQsNC90LjRhtGLINCx0LvQvtCz0LAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgKGZ1bmN0aW9uKCl7XG4gICAgdmFyXG4gICAgICBub3RfZml4ZWQgPSB0cnVlLFxuICAgICAgYXJyb3dfbm9uZSA9IHRydWUsXG4gICAgICB0YXJnZXQgPSAkKCcjc2VjdGlvbi1hcnRpY2xlcycpLFxuICAgICAgYXJ0aWNsZXMgPSAkKCcuYXJ0aWNsZScpLFxuICAgICAgYXNpZGVJdGVtID0gJCgnLmJsb2dfYXNpZGVfX2l0ZW0nKSxcbiAgICAgIGFzaWRlTGlzdCA9ICQoJy5ibG9nX2FzaWRlX19saXN0JyksXG4gICAgICBhc2lkZSA9ICQoJy5ibG9nX2FzaWRlJyksXG4gICAgICBhc2lkZUxvaXN0QnV0dG9uID0gYXNpZGVMaXN0LmZpbmQoJyNibG9nX2FzaWRlX19saXN0X2J1dHRvbicpLFxuICAgICAgd2luSGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpLFxuICAgICAgd2luU2Nyb2xsVG9wID0gJyc7XG4gICAgICBcbiAgICBpZiAodGFyZ2V0Lmxlbmd0aCA+IDApIHtcbiAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKXtcbiAgICAgICAgd2luU2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICBmaXhldF9uYXYoKTtcbiAgICAgICAgaW5XaW5kb3coYXJ0aWNsZXMsIGFzaWRlSXRlbSk7XG4gICAgICAgIHNob3dBcnJvdygpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8v0L/QvtC30YvRhtGL0L7QvdC40YDQvtCy0LDQvdC40LUg0L3QsNCy0LjQs9Cw0YbQuNC4XG4gICAgZnVuY3Rpb24gZml4ZXRfbmF2KCl7XG4gICAgIFxuICAgICAgdmFyIHRhcmdldFBvcyA9IHRhcmdldC5vZmZzZXQoKS50b3A7XG5cbiAgICAgIGlmKHdpblNjcm9sbFRvcCA+PSB0YXJnZXRQb3MgJiYgbm90X2ZpeGVkKXtcbiAgICAgICAgdmFyIHRvcCA9ICQoYXNpZGVMaXN0KS5wb3NpdGlvbigpLnRvcDtcbiAgICAgICAgdmFyIGxlZnQgPSAkKGFzaWRlTGlzdCkub2Zmc2V0KCkubGVmdDtcbiAgICAgICAgJChhc2lkZUxpc3QpLmNzcyh7J3Bvc2l0aW9uJzonZml4ZWQnLCAndG9wJzogdG9wKydweCcsICdsZWZ0JzogbGVmdCsncHgnfSk7XG4gICAgICAgIG5vdF9maXhlZCA9IGZhbHNlO1xuICAgICAgfWVsc2UgaWYod2luU2Nyb2xsVG9wIDwgdGFyZ2V0UG9zICYmICFub3RfZml4ZWQpIHtcbiAgICAgICAgJChhc2lkZUxpc3QpLmNzcyh7J3Bvc2l0aW9uJzonc3RhdGljJ30pO1xuICAgICAgICBub3RfZml4ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vZ9C/0L7QutCw0LfQsNGC0Ywg0YHQutGA0YvRgtGMINCx0L7QutC+0LLQvtC1INC80LXQvdGOLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBhc2lkZUxvaXN0QnV0dG9uLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgbGVmdCA9IHBhcnNlSW50KCBhc2lkZS5jc3MoJ2xlZnQnKSApO1xuICAgICAgaWYgKGxlZnQ8MCkge1xuICAgICAgICBhc2lkZUxpc3QuY3NzKHsnbGVmdCc6JzBweCd9KTtcbiAgICAgICAgYXNpZGUuY3NzKHsnbGVmdCc6ICcwJ30pO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGFzaWRlTGlzdC5jc3MoeydsZWZ0JzonLTMwMHB4J30pO1xuICAgICAgICBhc2lkZS5jc3MoeydsZWZ0JzogJy0zMDBweCd9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vZ9C/0L7QutCw0LfQsNGC0Ywg0YHQutGA0YvRgtGMINCx0L7QutC+0LLQvtC1INC80LXQvdGOLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8v0L/QvtC60LDQt9Cw0YLRjCDRgdC60YDRi9GC0Ywg0YHRgtGA0LXQu9C60YMg0LLQstC10YDRhVxuICAgIGZ1bmN0aW9uIHNob3dBcnJvdygpe1xuICAgICAgaWYgKHdpbkhlaWdodCA8PSB3aW5TY3JvbGxUb3AgJiYgYXJyb3dfbm9uZSkge1xuICAgICAgICAkKCcuYXJyb3ctdG9wJykuY3NzKHsnZGlzcGxheSc6J2Jsb2NrJ30pO1xuICAgICAgICBhcnJvd19ub25lID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBlbHNlIGlmKHdpbkhlaWdodCA+IHdpblNjcm9sbFRvcCAmJiAhYXJyb3dfbm9uZSl7XG4gICAgICAgICQoJy5hcnJvdy10b3AnKS5jc3MoeydkaXNwbGF5Jzonbm9uZSd9KTtcbiAgICAgICAgYXJyb3dfbm9uZSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIC8v0L/QvtC60YDQsNGB0LjRgiDQtdC70LXQvNC10L3RgiDQvdCw0LLQuNCz0LDRhtC40L7QvdC90L7Qs9C+INC80LXQvdGOINC60L7RgtC+0YDRi9C5INGB0L7RgtCy0LXRgtGB0YLQstGD0LXRgiDRgtC10LrRg9GJ0LXQuSDRgdGC0LDRgtC4XG4gICAgdmFyIHNhdmVkSW5kZXhOdW1iZXIgPSAwLCBjdXJyZW50SW5kZXhOdW1iZXIgPSAwO1xuICAgIGZ1bmN0aW9uIGluV2luZG93KGFydGljbGVzLCBhc2lkZUl0ZW0pe1xuICAgICAgdmFyXG4gICAgICAgIGluZGVudCA9IHBhcnNlSW50KCAkKGFydGljbGVzWzBdKS5jc3MoJ21hcmdpbi1ib3R0b20nKSApLFxuICAgICAgICBjdXJyZW50RWxzID0gJChhcnRpY2xlcyksXG4gICAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgICBvZmZzZXRUb3A7XG5cbiAgICAgIGN1cnJlbnRFbHMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZWxlbWVudCA9ICQodGhpcyk7XG4gICAgICAgIG9mZnNldFRvcCA9IGVsZW1lbnQub2Zmc2V0KCkudG9wO1xuICAgICAgICBvZmZzZXRUb3AgPSBwYXJzZUludChvZmZzZXRUb3ApO1xuICAgICAgICBpZiggd2luU2Nyb2xsVG9wK2luZGVudCoyID4gb2Zmc2V0VG9wICl7XG4gICAgICAgICAgcmVzdWx0LnB1c2godGhpcyk7XG4gICAgICAgICAgY3VycmVudEluZGV4TnVtYmVyID0gcmVzdWx0Lmxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKCBzYXZlZEluZGV4TnVtYmVyICE9PSBjdXJyZW50SW5kZXhOdW1iZXIpIHtcbiAgICAgICAgc2F2ZWRJbmRleE51bWJlciA9IGN1cnJlbnRJbmRleE51bWJlcjtcbiAgICAgICAgJChhc2lkZUl0ZW0pLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJChhc2lkZUl0ZW1bY3VycmVudEluZGV4TnVtYmVyXSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgIH1cbiAgfSkoKTtcbiAgXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v0LrQvtC0INGB0YLRgNCw0L3QuNGG0Ysg0LHQu9C+0LPQsC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vc3RhcnQgcG9ydGZvbGlvIGhlYWRlci8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAoZnVuY3Rpb24oKXtcbiAgICB2YXJcbiAgICAgIHRyYW5zaXRpb24gPSAzMDAsXG4gICAgICBtZW51QnV0dG9uID0gJCgnI21lbnUtYnV0dG9uJyk7XG5cbiAgICBtZW51QnV0dG9uLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgY2xvc2UgPSAkKCcuY3VydGFpbi1sZWZ0JykuaGFzQ2xhc3MoJ2Nsb3NlQ3VydGFpbnNMJyk7XG4gICAgICBpZihjbG9zZSl7XG4gICAgICAgIGNsb3NlX21lbnUoKTtcbiAgICAgIH1lbHNle1xuICAgICAgICBzaG93X21lbnUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBmdW5jdGlvbiBjbG9zZV9tZW51KCl7XG4gICAgICBtZW51QnV0dG9uLnJlbW92ZUNsYXNzKCdtZW51LWJ1dHRvbi1jbG9zZScpO1xuICAgICAgJCgnLmN1cnRhaW4tbGVmdCwgLmN1cnRhaW4tcmlnaHQsICNtYWluLW5hdicpLmNzcyh7J29wYWNpdHknOjB9KTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnLmN1cnRhaW4tbGVmdCcpLnJlbW92ZUNsYXNzKCdjbG9zZUN1cnRhaW5zTCcpO1xuICAgICAgICAkKCcuY3VydGFpbi1yaWdodCcpLnJlbW92ZUNsYXNzKCdjbG9zZUN1cnRhaW5zUicpO1xuICAgICAgICAkKCcjbWFpbi1uYXYnKS5yZW1vdmVDbGFzcygnYmxvY2snKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICQoJy5jdXJ0YWluLWxlZnQsIC5jdXJ0YWluLXJpZ2h0LCAjbWFpbi1uYXYnKS5jc3MoeydvcGFjaXR5JzoxfSk7XG4gICAgICAgIH0sIHRyYW5zaXRpb24pOyBcbiAgICAgIH0sIHRyYW5zaXRpb24pO1xuICAgIH1cbiAgICB2YXJcbiAgICAgIGFyciA9ICQoJy5tYWluLW5hdi1saXN0LWl0ZW0nKSxcbiAgICAgIGFycl9sZW5ndGggPSBhcnIubGVuZ3RoLFxuICAgICAgZm9udFNpemUgPSAkKGFyclswXSkuY3NzKCdmb250LXNpemUnKTtcblxuICAgIGZ1bmN0aW9uIHNob3dfbWVudSgpe1xuICAgICAgbWVudUJ1dHRvbi5hZGRDbGFzcygnbWVudS1idXR0b24tY2xvc2UnKTtcbiAgICAgICQoYXJyKS5maW5kKCdhJykuY3NzKCdmb250LXNpemUnLCAnMCcpO1xuICAgICAgdmFyIGN1cnJlbnQgPSAwO1xuICAgICAgJCgnLmN1cnRhaW4tbGVmdCcpLmFkZENsYXNzKCdjbG9zZUN1cnRhaW5zTCcpO1xuICAgICAgJCgnLmN1cnRhaW4tcmlnaHQnKS5hZGRDbGFzcygnY2xvc2VDdXJ0YWluc1InKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnI21haW4tbmF2JykuYWRkQ2xhc3MoJ2Jsb2NrJyk7XG4gICAgICAgIHZhciB0aW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiAgICAgICAgICB2YXIgYSA9ICQoYXJyW2N1cnJlbnRdKS5maW5kKCdhJyk7XG4gICAgICAgICAgYS5hbmltYXRlKHsnZm9udC1zaXplJzpmb250U2l6ZX0sIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOnRyYW5zaXRpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoY3VycmVudCA+PSBhcnJfbGVuZ3RoLTEpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudCsrO1xuICAgICAgICB9LCB0cmFuc2l0aW9uLzIpOyBcblxuICAgICAgfSwgdHJhbnNpdGlvbik7XG4gICAgfVxuICB9KSgpO1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vL2VuZCBwb3J0Zm9saW8gaGVhZGVyLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v0LDQvdC40LzQuNGA0L7QstCw0L3QuNGPINGC0LXQutGB0YLQsCDQsiDRgdC70LDQudC00LXRgNC1Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgXG4gIHZhciB0aW1lb3V0ID0gNjAwO1xuICAoZnVuY3Rpb24oKXtcbiAgICB2YXJcbiAgICAgIGRlc2NyaXB0aW9ucyA9ICQoJy5zbGlkZXJfX2ltYWdlLWRlc2NyaXB0aW9uJyksXG4gICAgICB0aXRsZXMgPSBkZXNjcmlwdGlvbnMuZmluZCgnaDInKSxcbiAgICAgIHRlY2hub2xvZ2lzdHMgPSBkZXNjcmlwdGlvbnMuZmluZCgncCcpO1xuICAgICAgLy/RhNGD0L3QutGG0LjRjyDQv9C+0LTQs9C+0YLQvtCy0LjRgiDRgtC10LrRgdGCINC6INCw0L3QuNC80LDRhtC40Lgg0L/QvtGA0YPQsdCw0LXRgiDQvdCwINC+0YLQtNC10LvRjNC90YvQtSDQsdGD0LrQstGLINCy0YHQtSDRh9GC0L4g0L3QsNC00L5cbiAgICBmdW5jdGlvbiBmcmFjdGlvbihlKXtcbiAgICAgIGUuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgaXRlbS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdmFyXG4gICAgICAgICAgICB0aGF0ID0gJCh0aGlzKSxcbiAgICAgICAgICAgIHN0cmluZyA9IHRoYXQudGV4dCgpO1xuICAgICAgICAgIHRoYXQuaHRtbChzdHJpbmcucmVwbGFjZSgvLi9nLCAnPHNwYW4gY2xhc3M9XCJsZXR0ZXJcIj4kJjwvc3Bhbj4nKSk7XG4gICAgICAgICAgLy/Qv9GA0LjRgdCy0L7QtdC8INC60LDQttC00L7QuSDQsdGD0LrQstC1INC90LXQvtCx0YXQvtC00LjQvNGD0Y4g0LfQsNC00LXRgNC20LrRgyDQv9C10YDQtdC0INCw0L3QuNC80LDRhtC40LXQuVxuICAgICAgICAgIHZhclxuICAgICAgICAgICAgbGV0dGVycyA9IHRoYXQuZmluZCgnc3BhbicpLFxuICAgICAgICAgICAgZGVhbHkgPSAwO1xuICAgICAgICAgIGxldHRlcnMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgIHRoYXQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICBsZXRlckxlbmd0aCA9IGxldHRlcnMubGVuZ3RoO1xuICAgICAgICAgICAgdGhhdC5jc3MoeydhbmltYXRpb24tZGVsYXknOmRlYWx5Kydtcyd9KTtcbiAgICAgICAgICAgIGRlYWx5ICs9IHBhcnNlSW50KHRpbWVvdXQgLyBsZXRlckxlbmd0aCwgMTApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pOyBcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZnJhY3Rpb24oW3RpdGxlcywgdGVjaG5vbG9naXN0c10pO1xuICB9KSgpO1xuICBcbiAgZnVuY3Rpb24gdGV4dEFuaW1hdGUodGhhdCl7XG4gICAgdmFyXG4gICAgICBsZXR0ZXJMaXN0ID0gdGhhdC5maW5kKCcubGV0dGVyJyksXG4gICAgICBsaXN0TGVuZ3RoID0gbGV0dGVyTGlzdC5sZW5ndGgsXG4gICAgICBpID0gMDtcblxuICAgIChmdW5jdGlvbiBzaG93TGV0dGVyKCl7XG4gICAgICB2YXIgY3VycmVudExldHRlciA9ICQobGV0dGVyTGlzdFtpXSkuaHRtbCgpO1xuICAgICAvL9C10YHQu9C4INGN0YLQviDQv9GA0L7QsdC10Lsg0LfQsNC00LDQtNC40Lwg0LXQvNGDINGE0LjQutGB0LjRgNC+0LLQsNC90L3Rg9GOINGI0LjRgNC40L3RgyDQuNC90LDRh9C1INC/0L7RgtC+0Lwg0L7QvSDRgdC/0LvRjtGJ0LjRgtGM0YHRjyBcbiAgICAgIGlmIChjdXJyZW50TGV0dGVyID09PSAnICcpIHtcbiAgICAgICAgdmFyIGxldHRlcldpZHRoID0gJChsZXR0ZXJMaXN0W2ldKS53aWR0aCgpO1xuICAgICAgLy/QtdGB0LvQuCDRiNC40YDQuNC90LAg0L/RgNC+0LHQtdC70LAgPSAwLCDQt9C90LDRh9C40YIg0Y3RgtC+INC60L7QvdC10YYg0YHRgtGA0L7QutC4INC4INC90YPQttC90L4g0LLRgdGC0LDQstC40YLRjCDQtdC70LXQvNC10L3RgiDQv9C10YDQtdC90L7RgdCwINGB0YLRgNC+0LrQuFxuICAgICAgICBpZiAobGV0dGVyV2lkdGggPT0gMCkge1xuICAgICAgICAgICQobGV0dGVyTGlzdFtpXSkuYWZ0ZXIoJzxicj4nKTtcbiAgICAgICAgfVxuICAgICAgICAkKGxldHRlckxpc3RbaV0pLndpZHRoKGxldHRlcldpZHRoKTtcbiAgICAgIH1cbiAgICAgIGkrKztcbiAgICAgIChmdW5jdGlvbigpe1xuICAgICAgICBpZiAoaSA8IGxpc3RMZW5ndGgpIHtcbiAgICAgICAgICBzaG93TGV0dGVyKCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGxldHRlckxpc3QuYWRkQ2xhc3MoJ3Nob3dMZXR0ZXInKTtcbiAgICAgICAgfVxuICAgICAgfSkoKTtcbiAgICB9KSgpO1xuICB9XG4gICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9C60L7QvdC10YYg0LDQvdC40LzQuNGA0L7QstCw0L3QuNGPINGC0LXQutGB0YLQsCDQsiDRgdC70LDQudC00LXRgNC1Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9zdGFydCBzbGlkZXIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgKGZ1bmN0aW9uKCl7XG4gICAgJCgnLnNsaWRlcl9fYm90dG9tLXByZXZpZXcgbGksIC5zbGlkZXJfX3RvcC1wcmV2aWV3IGxpLCAuc2xpZGVyX19pbWFnZXMtbGlzdCcpLmNzcyh7J3RyYW5zaXRpb24tZHVyYXRpb24nOnRpbWVvdXQrJ21zJ30pO1xuICAgICQoJy5zbGlkZXJfX2ltYWdlcy1saXN0JykuY3NzKHsgJ3RyYW5zaXRpb24tZHVyYXRpb24nOnRpbWVvdXQvMisnbXMnfSk7XG4gICAgdmFyIGJ1dHRvbnMgPSAkKCcuc2xpZGVyX19idXR0b25zLWJvdHRvbSwgLnNsaWRlcl9fYnV0dG9ucy10b3AnKTtcbiAgICBidXR0b25zLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2dCl7XG4gICAgICAvL9GD0LTQsNC70LjQvCDQvtCx0YDQsNCx0L7RgtGH0LjQulxuICAgICAgYnV0dG9ucy5vZmYoKTtcbiAgICAgIHNsaWRlcihldnQpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAvL9Cy0LXRgNC90ZHQvCDQvtCx0YDQsNCx0L7RgtGH0LjQulxuICAgICAgICBidXR0b25zLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2dCl7c2xpZGVyKGV2dCk7fSk7XG4gICAgICB9LHRpbWVvdXQqMik7IFxuICAgIH0pO1xuICAgIGZ1bmN0aW9uIGNoYW5nZURlc2NyaXB0aW9uKGkpe1xuICAgICAgdmFyXG4gICAgICAgIGRlc2MgPSAkKCcuc2xpZGVyX19pbWFnZS1kZXNjcmlwdGlvbicpLmNsb25lKCksXG4gICAgICAgIHRpdGxlID0gJChkZXNjW2ldKS5maW5kKCdoMicpLmFkZENsYXNzKCdhbmltYXRlVGV4dCcpLFxuICAgICAgICB0ZWNobm9sb2dpZXMgPSAkKGRlc2NbaV0pLmZpbmQoJ3AnKS5hZGRDbGFzcygnYW5pbWF0ZVRleHQnKTtcblxuICAgICAgJCgnLndvcmstZGVzY3JpcHRpb25fX3RpdGxlIGgyJykucmVwbGFjZVdpdGgodGl0bGUpO1xuICAgICAgJCgnLndvcmstZGVzY3JpcHRpb25fX3RlY2hub2xvZ2llcyBwJykucmVwbGFjZVdpdGgodGVjaG5vbG9naWVzKTtcbiAgICAgIHRleHRBbmltYXRlKCQoJy5hbmltYXRlVGV4dCcpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2xpZGVyKGV2dCl7XG4gICAgICB2YXIgaW1hZ2VMaXN0LCBpbWFnZXMsIGFyckxlbmdodCwgYm90dG9uLCBwcmV2LCBwcmV2TGVmdCwgcHJldlJpZ2h0LCBwcmV2MUxlZnQscHJldjJMZWZ0LCBwcmV2MVJpZ2h0LCBwcmV2MlJpZ2h0LCBjdXJyZW50TGVmdExpLCBuZXh0TGVmdExpLCBjdXJyZW50UmlnaHRMaSwgbmV4dFJpZ2h0TGk7XG5cbiAgICAgIGltYWdlTGlzdCAgPSAkKCcuc2xpZGVyX19pbWFnZXMtbGlzdCcpO1xuICAgICAgaW1hZ2VzICAgICA9IGltYWdlTGlzdC5maW5kKCdsaScpO1xuICAgICAgYXJyTGVuZ2h0ICA9IGltYWdlcy5sZW5ndGg7XG4gICAgICBib3R0b24gICAgID0gJChldnQuY3VycmVudFRhcmdldCkuYXR0cignY2xhc3MnKTtcbiAgICAgIHByZXYgICAgICAgPSAkKCcuc2xpZGVyX19idXR0b25zJyk7XG4gICAgICBwcmV2TGVmdCAgID0gcHJldi5maW5kKCcuc2xpZGVyX19ib3R0b20tcHJldmlldyBsaScpO1xuICAgICAgcHJldlJpZ2h0ICA9IHByZXYuZmluZCgnLnNsaWRlcl9fdG9wLXByZXZpZXcgbGknKTtcbiAgICAgIHByZXYxTGVmdCAgPSAkKHByZXZMZWZ0WzFdKTtcbiAgICAgIHByZXYyTGVmdCAgPSAkKHByZXZMZWZ0WzBdKTtcbiAgICAgIHByZXYxUmlnaHQgPSAkKHByZXZSaWdodFsxXSk7XG4gICAgICBwcmV2MlJpZ2h0ID0gJChwcmV2UmlnaHRbMF0pO1xuICAgICAgICBcbiAgICAgIC8v0YPQt9C90LDQtdC8INGC0LXQutGD0YnQuNC5INC4INGB0LvQtdC00YPRjtGJ0LjQuSDQtdC70LXQvNC10L3RgtGLINC/0YDQtdCy0YzRjtGFLCDRgtC10LrRg9GJ0LjQuSDRgtC+0YIg0YfRgtC+INCy0LjQtNC40LwsINCwINGB0LvQtdC00YPRjtGJ0LjQudC10LvQtdC80LXQvdGCINGC0L7RgiDRh9GC0L4g0L/QvtC60LAg0YfRgtC+INGB0LrRgNGL0YIgXG4gICAgICBpZiAoIHBhcnNlSW50KHByZXYxTGVmdC5jc3MoJ3RvcCcpKSA+IHBhcnNlSW50KHByZXYyTGVmdC5jc3MoJ3RvcCcpKSkge1xuICAgICAgICBjdXJyZW50TGVmdExpID0gcHJldjFMZWZ0O1xuICAgICAgICBuZXh0TGVmdExpID0gcHJldjJMZWZ0O1xuICAgICAgfWVsc2V7XG4gICAgICAgIGN1cnJlbnRMZWZ0TGkgPSBwcmV2MkxlZnQ7XG4gICAgICAgIG5leHRMZWZ0TGkgPSBwcmV2MUxlZnQ7XG4gICAgICB9XG4gICAgICAvL9Ch0LvQtdC00YPRjtGJ0LjQuSDQtdC70LXQvNC10L3RgiDRgSDQu9C10LLQsCDQt9C90LDRh9C10L3QuNC1INC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXG4gICAgICBuZXh0TGVmdExpID0gbmV3U3JjKG5leHRMZWZ0TGksIGltYWdlc1thcnJMZW5naHQtMl0pO1xuICAgICAgLy/QtdGB0LvQuCDQvdCw0LbQsNC7INC60L3QvtC/0LrRgyDQvdCw0LfQsNC0INC+0L3QsCDQttC1INCyINC90LjQt1xuICAgICAgZnVuY3Rpb24gYmFjaygpe1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgLy/Qv9C10YDQtdC60LjQvdC10Lwg0LjQt9C+0LHRgNCw0LbQtdC90LjQtSDRgSDQutC+0L3QsCDQsiDQvdCw0YfQsNC70L5cbiAgICAgICAgICBpbWFnZUxpc3QucHJlcGVuZChpbWFnZXNbYXJyTGVuZ2h0LTFdKTtcbiAgICAgICAgICBpbWFnZUxpc3QudG9nZ2xlQ2xhc3MoJ29wYWNpdHknKTtcbiAgICAgICAgfSwgdGltZW91dC8yKTtcbiAgICAgICAgY2hhbmdlUHJldmlldyhjdXJyZW50TGVmdExpLCBuZXh0TGVmdExpLCAnYm90dG9tJywgaW1hZ2VzW2FyckxlbmdodC0zXSk7XG4gICAgICB9XG4gICAgICAvL9GD0LfQvdCw0LXQvCDRgtC10LrRg9GJ0LjQuSDQuCDRgdC70LXQtNGD0Y7RidC40Lkg0LXQu9C10LzQtdC90YLRiyDQv9GA0LXQstGM0Y7RhSwg0YLQtdC60YPRidC40Lkg0YLQvtGCINC60L7RgtC+0YDRi9C5INC90LAg0LLQuNC00YMsINCwINGB0LvQtdC00YPRjtGJ0LjQudC10LvQtdC80LXQvdGCINGC0L7RgiDRh9GC0L4g0L/QvtC60LAg0YfRgtC+INGB0LrRgNGL0YJcbiAgICAgIGlmIChwYXJzZUludChwcmV2MVJpZ2h0LmNzcygndG9wJykpIDwgcGFyc2VJbnQocHJldjJSaWdodC5jc3MoJ3RvcCcpKSkge1xuICAgICAgICBjdXJyZW50UmlnaHRMaSA9IHByZXYxUmlnaHQ7XG4gICAgICAgIG5leHRSaWdodExpID0gcHJldjJSaWdodDtcbiAgICAgIH1lbHNle1xuICAgICAgICBjdXJyZW50UmlnaHRMaSA9IHByZXYyUmlnaHQ7XG4gICAgICAgIG5leHRSaWdodExpID0gcHJldjFSaWdodDtcbiAgICAgIH1cbiAgICAgIC8v0KHQu9C10LTRg9GO0YnQuNC5INC10LvQtdC80LXQvdGCINGBINC/0YDQsNCy0LAg0LfQvdCw0YfQtdC90LjQtSDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxuICAgICAgbmV4dFJpZ2h0TGkgPSBuZXdTcmMobmV4dFJpZ2h0TGksIGltYWdlc1syXSk7XG4gICAgICAvL9C10YHQu9C4INC90LDQttCw0Lsg0LLQv9C10ZHQtCDQvtC90LAg0LbQtSDQstCy0LXRgNGFXG4gICAgICBmdW5jdGlvbiBmb3J3YXJkKCl7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAvL9C/0LXRgNC10LrQuNC90LXQvCDQuNC30L7QsdGA0LDQttC10L3QuNC1INGBINC90LDRh9Cw0LvQsCDQsiDQutC+0L3QtdGGXG4gICAgICAgICAgaW1hZ2VMaXN0LmFwcGVuZChpbWFnZXNbMF0pO1xuICAgICAgICAgIGltYWdlTGlzdC50b2dnbGVDbGFzcygnb3BhY2l0eScpO1xuICAgICAgICB9LCB0aW1lb3V0LzIpO1xuICAgICAgICBjaGFuZ2VQcmV2aWV3KGN1cnJlbnRSaWdodExpLCBuZXh0UmlnaHRMaSwgJ3RvcCcsIGltYWdlc1szXSk7XG4gICAgICB9ICAgXG4gIC8v0LzQtdC90Y/QtdC8INCz0LvQsNCy0L3QvtC1INC40LfQvtCx0YDQsNC20LXQvdC40LVcbiAgICAgIGZ1bmN0aW9uIGNoYW5nZU1haW5JbWFnZSgpe1xuICAgICAgICBpbWFnZUxpc3QudG9nZ2xlQ2xhc3MoJ29wYWNpdHknKTtcbiAgICAgICAgaWYgKGJvdHRvbiA9PSAnc2xpZGVyX19idXR0b25zLWJvdHRvbScpIHtcbiAgICAgICAgICBiYWNrKCk7XG4gICAgICAgICAgY2hhbmdlRGVzY3JpcHRpb24oYXJyTGVuZ2h0LTEpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBmb3J3YXJkKCk7XG4gICAgICAgICAgY2hhbmdlRGVzY3JpcHRpb24oMSk7XG4gICAgICAgIH0gXG4gICAgICB9ICBcbiAgLy/QvNC10L3Rj9C8INC/0YDQtdCy0Y7RhdGDINC/0LDRgNCw0LzQtdGC0YDRizog0YLQtdC60YPRidCw0Y8g0LvQuCwg0YHQu9C10LTRg9GO0YnQsNGPINGC0LAg0L3QsCDQutC+0YLQvtGA0YPRjiDRgdC10YfQsNGBINC30LDQvNC10L3QtdGC0YHRjyDRgtC10LrRg9GJ0LDRjywg0L3QsNC/0YDQsNCy0LvQtdC90LjQtSDQtNCy0LjQttC10L3QuNGPINCw0L3QuNC80LDRhtGL0LgsXG4gIC8v0L3QvtCy0LDRjyDQu9C4INGC0L7QtdGB0YLRjCDRgSDQvdC+0LLRi9C8INC40LfQvtCx0YDQsNC20LXQvdC40LXQvCDQuCDQstC+0LfQvNC+0LbQvdC+INC+0L/QuNGB0LDQvdC40LXQvCDQvtC90LAg0LfQsNC80LXQvdC10YIg0YLRgyDQu9C4INC60L7RgtC+0YDRg9GOINC80Ysg0YHQtNCy0LjQvdC40Lwg0LjQtyDQt9C+0L3RiyDQstC40LTQuNC80L7RgdGC0LhcbiAgICAgIGZ1bmN0aW9uIGNoYW5nZVByZXZpZXcoY3VycmVudExpLCBuZXh0TGksIGRpcmVjdGlvbiwgbmV3TGkpeyAgXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICBtb3ZlKCdib3QnKTtcbiAgICAgICAgICBwcmV3QmFjaygnbGVmdCcpO1xuICAgICAgICAgICAvLyDQutC70LjQutC90YPQu9C4INC/0L4g0LvQtdCy0L7QuSDQutC90L7Qv9C60LUg0LfQvdCw0YfQuNGCINC80LXQvdGP0LXQvCDQt9C90LDRh9C10L3QuNGPINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC00LvRjyDRgdC70LXQtNGD0Y7RidC40LPQviDQtdC70LXQvNC10L3RgtCwINC/0YDQsNCy0L7QuSDQutC90L7Qv9C60LVcbiAgICAgICAgICBuZXh0UmlnaHRMaSA9IG5ld1NyYyhuZXh0UmlnaHRMaSwgaW1hZ2VzWzBdKTtcbiAgICAgICAgICBtb3ZlKCd0b3AnLCBjdXJyZW50UmlnaHRMaSwgbmV4dFJpZ2h0TGkpO1xuICAgICAgICAgIHByZXdCYWNrKCdyaWdodCcsIGN1cnJlbnRSaWdodExpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGlyZWN0aW9uID09ICd0b3AnKSB7XG4gICAgICAgICAgbW92ZSgndG9wJyk7XG4gICAgICAgICAgcHJld0JhY2soJ3JpZ2h0Jyk7XG4gICAgICAgICAgLy8g0LrQu9C40LrQvdGD0LvQuCDQv9C+INC/0YDQsNCy0L7QuSDQutC90L7Qv9C60LUg0LfQvdCw0YfQuNGCINC80LXQvdGP0LXQvCDQt9C90LDRh9C10L3QuNGPINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC00LvRjyDRgdC70LXQtNGD0Y7RidC40LPQviDQtdC70LXQvNC10L3RgtCwINC90LAg0LvQtdCy0L7QuSDQutC90L7Qv9C60LVcbiAgICAgICAgICBuZXh0TGVmdExpID0gbmV3U3JjKG5leHRMZWZ0TGksIGltYWdlc1swXSk7XG4gICAgICAgICAgbW92ZSgnYm90JywgY3VycmVudExlZnRMaSwgbmV4dExlZnRMaSk7XG4gICAgICAgICAgcHJld0JhY2soJ2xlZnQnLCBjdXJyZW50TGVmdExpKTtcbiAgICAgICAgfVxuICAgICAgICAvL9Cy0L7Qt9Cy0YDQstGJ0LDQtdGCINGB0LrRgNGL0YLQvtC1INC/0YDQtdCy0Y4g0L3QsCDRgdGC0LDRgNGC0L7QstC+0Y4g0L/QvtC30LjRhtGL0Y4sINC/0LDRgNCw0LzQtdGC0YDRiyDQutCw0LrQvtC1INC/0YDQtdCy0YzRjiDQu9C10LLQvtC1INC40LvQuCDQv9GA0LDQstC+0LUsINC4INC90LUg0L7QsdC10LfQsNGC0LXQu9GM0L3Ri9C5INGC0LXQutGD0YnQuNC50Y3Qu9C10LzQvdGCXG4gICAgICAgIGZ1bmN0aW9uIHByZXdCYWNrKHByZXYsIGN1cnJlbnRFbGVtZW50KXtcbiAgICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50TGk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZiAocHJldiA9PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSBuZXdTcmMoY3VycmVudEVsZW1lbnQsIG5ld0xpKTtcbiAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQuY3NzKHsndHJhbnNpdGlvbi1kdXJhdGlvbic6JzBtcycsICd0b3AnOicwJ30pO1xuICAgICAgICAgICAgfWVsc2UgaWYgKHByZXYgPT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IG5ld1NyYyhjdXJyZW50RWxlbWVudCwgbmV3TGkpO1xuICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudC5jc3Moeyd0cmFuc2l0aW9uLWR1cmF0aW9uJzonMG1zJywgJ3RvcCc6JzEwMCUnfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbW92ZShkaXJlY3Rpb24sIGN1cnJlbnRFbGVtZW50LCBuZXh0RWxlbWVudCl7XG4gICAgICAgICAgaWYgKGN1cnJlbnRFbGVtZW50ID09PSB1bmRlZmluZWQgfHwgbmV4dEVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50TGk7XG4gICAgICAgICAgICBuZXh0RWxlbWVudCA9IG5leHRMaTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbmV4dEVsZW1lbnQuY3NzKHsndHJhbnNpdGlvbi1kdXJhdGlvbic6dGltZW91dCsnbXMnfSk7XG4gICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSAnYm90Jykge1xuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQuY3NzKHsndG9wJzonMjAwJSd9KTtcbiAgICAgICAgICAgIG5leHRFbGVtZW50LmNzcyh7J3RvcCc6JzEwMCUnfSk7XG4gICAgICAgICAgfWVsc2UgaWYoZGlyZWN0aW9uID09ICd0b3AnKXtcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LmNzcyh7J3RvcCc6ICctMTAwJSd9KTtcbiAgICAgICAgICAgIG5leHRFbGVtZW50LmNzcyh7J3RvcCc6JzAnfSk7ICBcbiAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgICB9XG4gIC8v0YTRg9C90LrRhtC40Y8g0LzQtdC90Y/QtdGCINC60LDRgtGA0LjQvdC60YMg0LggaDEg0LIgbGkg0Y3Qu9C10LzQtdC90YLRgtC1XG4gICAgICBmdW5jdGlvbiBuZXdTcmMob2xkTGksIG5ld0xpKXtcbiAgICAgICAgdmFyXG4gICAgICAgICAgdG1wU3JjID0gJChuZXdMaSkuZmluZCgnaW1nJykuYXR0cignc3JjJyksXG4gICAgICAgICAgdG1wSDEgPSAkKG5ld0xpKS5maW5kKCdoMScpLmh0bWwoKTtcbiAgICAgICAgLy/Qt9Cw0LzQtdC90LjQvCDQsNC00YDQtdGBINC6INC60LDRgNGC0LjQvdC60LVcbiAgICAgICAgb2xkTGkuZmluZCgnaW1nJykuYXR0cih7J3NyYyc6dG1wU3JjfSk7XG4gICAgICAgIC8v0LfQsNC80LXQvdC40Lwg0LrQvtC90YLQtdC90YIg0LIgaDFcbiAgICAgICAgb2xkTGkuZmluZCgnaDEnKS5odG1sKHRtcEgxKTtcbiAgICAgICAgcmV0dXJuIG9sZExpO1xuICAgICAgfVxuICAgICAgY2hhbmdlTWFpbkltYWdlKCk7XG4gICAgfVxuICB9KSgpO1xuICBcbiAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL2VuZCBzbGlkZXIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vcHNyYWxsYXgvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAoZnVuY3Rpb24gKCkge1xuICAgIHZhclxuICAgICAgbGF5ZXIgPSAkKCcucGFyYWxsYXgnKS5maW5kKCcucGFyYWxsYXhfX2xheWVyJyksXG4gICAgICBsYXllclNjcm9sbCA9ICQoJy5wYXJhbGxheF9zY3JvbGwnKS5maW5kKCcucGFyYWxsYXhfX2xheWVyJyk7XG4gICAgJCh3aW5kb3cpLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkgeyBcbiAgICAgIHZhclxuICAgICAgICBtb3VzZV9keCA9IChlLnBhZ2VYKSwgLy8g0KPQt9C90LDQtdC8INC/0L7Qu9C+0LbQtdC90LjQtSDQvNGL0YjQutC4INC/0L4gWFxuICAgICAgICBtb3VzZV9keSA9IChlLnBhZ2VZKSwgLy8g0KPQt9C90LDQtdC8INC/0L7Qu9C+0LbQtdC90LjQtSDQvNGL0YjQutC4INC/0L4gWVxuICAgICAgICB3ID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgLSBtb3VzZV9keCwgLy8g0JLRi9GH0LjRgdC70Y/QtdC8INC00LvRjyB4INC/0LXRgNC10LzQtdGJ0LXQvdC40Y9cbiAgICAgICAgaCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIG1vdXNlX2R5OyAvLyDQktGL0YfQuNGB0LvRj9C10Lwg0LTQu9GPIHkg0L/QtdGA0LXQvNC10YnQtdC90LjRj1xuXG4gICAgICBsYXllci5tYXAoZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgd2lkdGhQb3NpdGlvbiA9IHcgKiAoa2V5IC8gMTAwKSwgLy8g0JLRi9GH0LjRgdC70Y/QtdC8INC60L7QvtGE0LjRhtC10L3RgiDRgdC80LXRiNC10L3QuNGPINC/0L4gWFxuICAgICAgICAgIGhlaWdodFBvc2l0aW9uID0gaCAqIChrZXkgLyAxMDApOyAvLyDQktGL0YfQuNGB0LvRj9C10Lwg0LrQvtC+0YTQuNGG0LXQvdGCINGB0LzQtdGI0LXQvdC40Y8g0L/QviBZXG5cbiAgICAgICAgJCh2YWx1ZSkuY3NzKHtcbiAgICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcgKyB3aWR0aFBvc2l0aW9uICsgJ3B4LCAnICsgaGVpZ2h0UG9zaXRpb24gKyAncHgsIDApJ1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZhciB3aW5kb3dIZWlndGggPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIHdpblNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgIGlmICh3aW5kb3dIZWlndGggPiB3aW5TY3JvbGxUb3ApIHtcbiAgICAgICAgbGF5ZXJTY3JvbGwubWFwKGZ1bmN0aW9uIChrZXksIHZhbHVlKXtcbiAgICAgICAgICB2YXIgYmlhcyA9IHdpblNjcm9sbFRvcCAqIChrZXkvMjApO1xuICAgICAgICAgICQodmFsdWUpLmNzcyh7XG4gICAgICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKDAsICcgKyAtYmlhcyArJ3B4LCAwKSdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2V7cmV0dXJuO31cbiAgICB9KTtcbiAgfSkoKTsgIFxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9wc3JhbGxheC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vc2tpbGxzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgKGZ1bmN0aW9uKCl7XG4gICAgdmFyXG4gICAgICB0YXJnZXQgPSAkKCcubXktc2tpbGxzLWJveC1jZWVudGVyJyksXG4gICAgICB3aW5kb3dIZWlndGggPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG5cbiAgICBpZih0YXJnZXQubGVuZ3RoID4gMCkge1xuICAgICAgdmFyXG4gICAgICAgIHNraWxscyA9ICQoJy5teS1za2lsbHNfX2l0ZW0nKSxcbiAgICAgICAgZGF0YTtcblxuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lm9mZnNldCgpLnRvcDtcbiAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHdpblNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgaWYgKHdpblNjcm9sbFRvcCt3aW5kb3dIZWlndGgvMTAqNyA+IHRhcmdldCkge1xuICAgICAgICAgIHNraWxscy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgZGF0YSA9ICR0aGlzLmF0dHIoJ2RhdGEtc2tpbGwnKTtcbiAgICAgICAgICAgIGlmIChkYXRhID09IDApIHtkYXRhID0gMTt9XG4gICAgICAgICAgICBkYXRhID0gIHBhcnNlSW50KCA3MjIqKGRhdGEvMTAwKSApO1xuICAgICAgICAgICAgJHRoaXMuZmluZCgnLnNlY3RvcicpLmNzcyh7J3N0cm9rZS1kYXNoYXJyYXknOmRhdGErJyA3MjInfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgfSkoKTtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9za2lsbHMvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9hZG1pbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAoZnVuY3Rpb24oKXtcbiAgICB2YXIgXG4gICAgICBhZG1pbkZvcm1zID0gJCgnLmFkbWluLWZvcm0nKSxcbiAgICAgIG1lbkxpc3QgPSAkKCcuYWRtaW4tbmF2X19pdGVtJyk7XG5cbiAgICBtZW5MaXN0LmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJCh0aGF0KS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfWVsc2V7XG4gICAgICAgICQodGhhdCkuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICQodGhhdCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBzaG93Rm9ybSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgXG4gICAgZnVuY3Rpb24gc2hvd0Zvcm0oKXtcbiAgICAgIHZhciBjb3VudCA9IDA7XG4gICAgICAvL9GE0YPQvdC60YbRi9GPINC/0L7QutCw0LbQtdGCINC90YPQttC90YPRjiDRhNC+0YDQvNGDINC4INGB0LrRgNC+0LXRgiDQvdC1INC90YPQttC90YPRjiDRgNC10YjQtdC90LjRjyDQv9GA0LjQvdC40LzQsNC10YLRjNGB0Y8g0L3QsCDQvtGB0L3QvtCy0LUg0LDQutGC0LjQstC90L7Qs9C+INC10LvQtdC80LXQvdGC0LAg0LzQtdC90Y5cbiAgICAgIG1lbkxpc3QuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIGlmICggJCh0aGF0KS5oYXNDbGFzcygnYWN0aXZlJykgKSB7XG4gICAgICAgICAgJChhZG1pbkZvcm1zW2NvdW50XSkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICQoYWRtaW5Gb3Jtc1tjb3VudF0pLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgIH1cbiAgICAgICAgY291bnQrKzsgIFxuICAgICAgfSk7XG4gICAgfVxuICAgIGFkbWluRm9ybXMuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICBzaG93Rm9ybSgpO1xuICAgIFxuICB9KSgpO1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vYWRtaW4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9GE0L7RgNC80LAg0LLRhdC+0LTQsC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAoZnVuY3Rpb24oKXtcbiAgICB2YXIgbG9naW5EYXRhID0ge307XG4gICAgJCgnI2xvZ2luLW5hdl9fZW50ZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgdmFyXG4gICAgICAgIGxvZ2luRm9ybSA9ICQoJyNsb2dpbi1mb3JtJyksXG4gICAgICAgIGVycm9ycyA9IFtdO1xuXG4gICAgICBsb2dpbkRhdGEubG9naW4gPSBsb2dpbkZvcm0uZmluZCgnI2xvZ2luJykudmFsKCkudHJpbSgpLFxuICAgICAgbG9naW5EYXRhLnBhc3MgPSBsb2dpbkZvcm0uZmluZCgnI3Bhc3N3b3JkJykudmFsKCkudHJpbSgpLFxuICAgICAgbG9naW5EYXRhLmh1bWFuID0gbG9naW5Gb3JtLmZpbmQoJyNsb2dpbmZvcm1fY2hlY2snKS5wcm9wKCdjaGVja2VkJyksXG4gICAgICBsb2dpbkRhdGEuZXhhY3RseUh1bWFuID0gbG9naW5Gb3JtLmZpbmQoJyNyYWRpb195ZXMnKS5wcm9wKCdjaGVja2VkJyk7XG4gICAgICAgIFxuICAgICAgZm9yKHZhciBwcm9wZXJ0eSBpbiBsb2dpbkRhdGEpe1xuICAgICAgICB2YXIgcHJvcExhbHVlID0gbG9naW5EYXRhW3Byb3BlcnR5XTtcbiAgICAgICAgaWYgKCBwcm9wTGFsdWUgPT09IGZhbHNlIHx8IHByb3BMYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8v0LfQvdCw0YfQtdGCINGN0YLQviDRh9C10LrQsdC+0LrRgdGLXG4gICAgICAgICAgaWYgKHByb3BMYWx1ZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgZXJyb3JzWzFdID0gJ9Cf0L7QttC+0LbQtSDRh9GC0L4g0LLRiyDRgNC+0LHQvtGCLic7XG4gICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAvL9C30L3QsNGH0LXRgiDRjdGC0L4g0YHRgtGA0L7QutC4XG4gICAgICAgICAgdmFyIHN0ckxlbmd0aCA9IHByb3BMYWx1ZS5sZW5ndGg7XG4gICAgICAgICAgaWYgKHN0ckxlbmd0aCA8IDQgfHwgc3RyTGVuZ3RoID4gMTQpIHtcbiAgICAgICAgICAgIGVycm9yc1swXSA9ICfQlNC70LjQvdC90LAg0LvQvtCz0LjQvdCwINC4INC/0LDRgNC+0LvRjyDQtNC+0LvQttC90LAg0LHRi9GC0Ywg0L7RgiA0INC00L4gMTQg0YHQuNC80LLQvtC70L7Qsi4nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gJ9Cf0YDQuCDQt9Cw0L/QvtC70L3QtdC90LjQuCDRhNC+0YDQvNGLINC+0LHQvdCw0YDRg9C20LXQvdGLINGB0LvQtdC00YPRjtGJ0LjQtSDQvtGI0LjQsdC60LguXFxuJztcbiAgICAgICAgZXJyb3JzLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgbWVzc2FnZSArPSAoaXRlbSkgPyBpdGVtKydcXG4nOicgJztcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgICAgYWxlcnQobWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8v0LTQsNC70LUg0YDQsNCx0L7RgtCwINC30LAg0YHQtdGA0LLQtdGA0L7QvFxuICAgIH0pO1xuICB9KSgpO1xuICAvL9GD0LTQsNC70LjQuiDRhNGA0LXQudC8INGBINC60LDRgNGC0L7QuSDQvdCwINC80L7QsdC40LvRjNC90YvRhVxuICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDE2KSB7XG4gICAgJCgnLnNlY3Rpb24tY29udGFjdHMgaWZyYW1lJykucmVtb3ZlKCk7XG4gIH1cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v0YTQvtGA0LzQsCDQstGF0L7QtNCwLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/QkNC00LzQuNC9Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgKGZ1bmN0aW9uKCl7XG4gICAgdmFyXG4gICAgICBmb3JtQWJvdXRNZSA9ICQoJyNhZG1pbi1hYm91dC1tZScpLFxuICAgICAgZm9ybUJsb2cgPSAkKCcjYWRtaW4tYmxvZycpLFxuICAgICAgZm9ybVdvcmtzID0gJCgnI2FkbWluLXdvcmtzJyk7ICBcbiAgICAvL9C/0YDQvtCy0LXRgNGP0LXQvCDQstCy0L7QtNC40YLRgdGPINC70Lgg0LIgaW5wdXQg0YfQuNGB0LvQviDQtdGB0LvQuCDQvdC10YIg0YfQuNGB0YLQuNC8INC10LPQvlxuICAgIGZvcm1BYm91dE1lLmZpbmQoJ2lucHV0Jykub24oJ2lucHV0JywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciB2YWx1ZSA9IHBhcnNlSW50KCAkKHRoaXMpLnZhbCgpICk7XG4gICAgICBpZiAoIGlzTmFOKHZhbHVlKSApIHskKHRoaXMpLnZhbCgnJyk7fVxuICAgIH0pO1xuICAgIC8v0LHQtdGA0ZHRgiDQtNCw0L3QvdGL0LUg0YEg0YTQvtGA0LzRiyDQv9C+0LvRg9GH0LXQvdC+0Lkg0LIg0LrQsNGH0LXRgdGC0LLQtSDQv9Cw0YDQsNC80LXRgtGA0LAg0Lgg0YHRhNC+0YDQvNC40YDRg9C10Lwg0LTQstGD0YUg0YPRgNC+0LLQtdCy0YvQuSDQvNCw0YHRgdC40LIg0LTQtNC90L3Ri9GFINC00LvRjyDQvtGC0L/RgNCw0LLQutC4INC90LAg0YHQtdGA0LLQtdGAXG4gICAgZnVuY3Rpb24gZ2V0RGF0YShmb3JtKXtcbiAgICAgIHZhclxuICAgICAgICBmb3JtSWQgPSBmb3JtLmF0dHIoJ2lkJyksXG4gICAgICAgIGlucHV0cyA9IGZvcm0uZmluZCgnaW5wdXQsIHRleHRhcmVhJyksXG4gICAgICAgIGRhdGEgPSBbWydmb3JtSWQnLCBmb3JtSWRdXTtcbiAgICAgIGlucHV0cy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKSwgY3VyZW50RGF0YSA9IFt0aGF0LmF0dHIoJ2lkJyksIHRoYXQudmFsKCldO1xuICAgICAgICBkYXRhW2RhdGEubGVuZ3RoXSA9IGN1cmVudERhdGE7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBcbiAgICBmb3JtQWJvdXRNZS5maW5kKCcjYWRtaW4tYWJvdXQtbWVfX3NhdmUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIGRhdGEgPSBnZXREYXRhKGZvcm1BYm91dE1lKTtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH0pO1xuICAgIGZvcm1CbG9nLmZpbmQoJyNhZG1pbi1ibG9nX19zYXZlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBkYXRhID0gZ2V0RGF0YShmb3JtQmxvZyk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICB9KTtcbiAgICBmb3JtV29ya3MuZmluZCgnI2FkbWluLXdvcmtzX19zYXZlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBkYXRhID0gZ2V0RGF0YShmb3JtV29ya3MpO1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICB9KTtcbiAgfSkoKTtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9CQ0LTQvNC40L0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
