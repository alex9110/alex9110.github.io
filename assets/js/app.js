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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vcHJlbG9hZGVyLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnLmFib3V0LXdyYXBwZXIsIC5ibG9nLXdyYXBwZXIsIC5pbmRleC13cmFwcGVyLCAud29ya3Mtd3JhcHBlciwgLmFkbWluLXdyYXBwZXInKS5jc3MoeydkaXNwbGF5Jzonbm9uZSd9KTtcbiAgICB2YXIgaW1ncyA9IFtdO1xuICAgICQuZWFjaCgkKCcqJyksIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgIGJhY2tncm91bmQgPSAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKSxcbiAgICAgICAgaW1nID0gJHRoaXMuaXMoJ2ltZycpO1xuICAgICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKSB7XG4gICAgICAgIHZhciBwYXRoID0gYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInLCAnJykucmVwbGFjZSgnXCIpJywgJycpO1xuXG4gICAgICAgIGltZ3MucHVzaChwYXRoKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbWcpIHtcbiAgICAgICAgcGF0aCA9ICR0aGlzLmF0dHIoJ3NyYycpO1xuICAgICAgICBpbWdzLnB1c2gocGF0aCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdmFyIHBlcmNlbnRzID0gMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpbWFnZSA9ICQoJzxpbWc+Jywge1xuICAgICAgICBhdHRyOiB7XG4gICAgICAgICAgc3JjIDogaW1nc1tpXVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGltYWdlLmxvYWQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRQZXJjZW50cyhpbWdzLmxlbmd0aCwgcGVyY2VudHMpO1xuICAgICAgICBwZXJjZW50cysrO1xuICAgICAgfSk7XG4gICAgICBpbWFnZS5lcnJvcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldFBlcmNlbnRzKGltZ3MubGVuZ3RoLCBwZXJjZW50cyk7XG4gICAgICAgIHBlcmNlbnRzKys7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy/QldCh0JvQmCDQmtCQ0KDQotCY0J3QntCaINCd0JXQoiBcbiAgICBpZihpbWdzLmxlbmd0aCA9PT0gMCl7XG4gICAgICBzZXRQZXJjZW50cygxLDEpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRQZXJjZW50cyh0b3RhbCwgY3VycmVudCkge1xuICAgICAgdmFyIHBlcmNlbnQgPSBNYXRoLmNlaWwoY3VycmVudCAvIHRvdGFsICogMTAwKTtcbiAgICAgIGlmIChwZXJjZW50ID49IDEwMCkge1xuICAgICAgICAkKCcuYWJvdXQtd3JhcHBlciwgLmJsb2ctd3JhcHBlciwgLmluZGV4LXdyYXBwZXIsIC53b3Jrcy13cmFwcGVyLCAuYWRtaW4td3JhcHBlcicpLmNzcyh7J2Rpc3BsYXknOidibG9jayd9KTtcbiAgICAgICAgJCgnLnBsYXRlLWZyb250JykuYWRkQ2xhc3MoJ2FuaW1hdGVfcGxhdGUnKTtcbiAgICAgICAgJCgnLmxvYWRlci13cmFwcGVyJykuZmFkZU91dCgxNTAwLCBmdW5jdGlvbigpe1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJy5wbGF0ZS1mcm9udCcpLnJlbW92ZUNsYXNzKCdhbmltYXRlX3BsYXRlJyk7XG4gICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgJCgnLmxvYWRlcl9fcGVyY2VudCcpLnRleHQocGVyY2VudCArICclJyk7XG4gICAgfVxuICB9KTtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9wcmVsb2FkZXIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLy8vLy8vLy8vLy8vLy8vLy8g0L/Qu9Cw0LLQvdGL0Lkg0YHQutGA0L7QuyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgJCgnYVtocmVmXj1cIiNcIl0nKS5jbGljayhmdW5jdGlvbigpe1xuICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICB2YXIgZGVzdGluYXRpb24gPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wOyAgLy/Rg9C30L3QsNC10Lwg0LzQtdGB0YLQviDQvdCw0LfQvdCw0YfQtdC90LjRjyBcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBkZXN0aW5hdGlvbn0sIDEwMDApOyAgLy/QtNCy0LjQs9Cw0LXQvCDQuiDQvdC40LzRg1xuICAgIHJldHVybiBmYWxzZTsgICAgICAgICAgICAgICAgICAgICBcbiAgfSk7XG4gIC8vLy8vLy8vLy8vLy8vLy8vLyDQv9C70LDQstC90YvQuSDRgdC60YDQvtC7IC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/Qv9C10YDQtdCy0LXRgNC90YPRgtGMINC/0LvQsNGI0LrRgy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgJCgnI3RvLW1haW4tYnV0LCAjYXV0aG9yaXphdGlvbi1idXR0b24nKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgJCgnI3BsYXRlJykudG9nZ2xlQ2xhc3MoJ3BsYXRlLWZyb250Jyk7XG4gIH0pO1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9C/0LXRgNC10LLQtdGA0L3Rg9GC0Ywg0L/Qu9Cw0YjQutGDLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/QutC+0LQg0YHRgtGA0LDQvdC40YbRiyDQsdC70L7Qs9CwLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIChmdW5jdGlvbigpe1xuICAgIHZhclxuICAgICAgbm90X2ZpeGVkID0gdHJ1ZSxcbiAgICAgIGFycm93X25vbmUgPSB0cnVlLFxuICAgICAgdGFyZ2V0ID0gJCgnI3NlY3Rpb24tYXJ0aWNsZXMnKSxcbiAgICAgIGFydGljbGVzID0gJCgnLmFydGljbGUnKSxcbiAgICAgIGFzaWRlSXRlbSA9ICQoJy5ibG9nX2FzaWRlX19pdGVtJyksXG4gICAgICBhc2lkZUxpc3QgPSAkKCcuYmxvZ19hc2lkZV9fbGlzdCcpLFxuICAgICAgYXNpZGUgPSAkKCcuYmxvZ19hc2lkZScpLFxuICAgICAgYXNpZGVMb2lzdEJ1dHRvbiA9IGFzaWRlTGlzdC5maW5kKCcjYmxvZ19hc2lkZV9fbGlzdF9idXR0b24nKSxcbiAgICAgIHdpbkhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKSxcbiAgICAgIHdpblNjcm9sbFRvcCA9ICcnO1xuICAgICAgXG4gICAgaWYgKHRhcmdldC5sZW5ndGggPiAwKSB7XG4gICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHdpblNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgZml4ZXRfbmF2KCk7XG4gICAgICAgIGluV2luZG93KGFydGljbGVzLCBhc2lkZUl0ZW0pO1xuICAgICAgICBzaG93QXJyb3coKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvL9C/0L7Qt9GL0YbRi9C+0L3QuNGA0L7QstCw0L3QuNC1INC90LDQstC40LPQsNGG0LjQuFxuICAgIGZ1bmN0aW9uIGZpeGV0X25hdigpe1xuICAgICBcbiAgICAgIHZhciB0YXJnZXRQb3MgPSB0YXJnZXQub2Zmc2V0KCkudG9wO1xuXG4gICAgICBpZih3aW5TY3JvbGxUb3AgPj0gdGFyZ2V0UG9zICYmIG5vdF9maXhlZCl7XG4gICAgICAgIHZhciB0b3AgPSAkKGFzaWRlTGlzdCkucG9zaXRpb24oKS50b3A7XG4gICAgICAgIHZhciBsZWZ0ID0gJChhc2lkZUxpc3QpLm9mZnNldCgpLmxlZnQ7XG4gICAgICAgICQoYXNpZGVMaXN0KS5jc3Moeydwb3NpdGlvbic6J2ZpeGVkJywgJ3RvcCc6IHRvcCsncHgnLCAnbGVmdCc6IGxlZnQrJ3B4J30pO1xuICAgICAgICBub3RfZml4ZWQgPSBmYWxzZTtcbiAgICAgIH1lbHNlIGlmKHdpblNjcm9sbFRvcCA8IHRhcmdldFBvcyAmJiAhbm90X2ZpeGVkKSB7XG4gICAgICAgICQoYXNpZGVMaXN0KS5jc3Moeydwb3NpdGlvbic6J3N0YXRpYyd9KTtcbiAgICAgICAgbm90X2ZpeGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vL2fQv9C+0LrQsNC30LDRgtGMINGB0LrRgNGL0YLRjCDQsdC+0LrQvtCy0L7QtSDQvNC10L3Rji8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgYXNpZGVMb2lzdEJ1dHRvbi5jbGljayhmdW5jdGlvbigpe1xuICAgICAgdmFyIGxlZnQgPSBwYXJzZUludCggYXNpZGUuY3NzKCdsZWZ0JykgKTtcbiAgICAgIGlmIChsZWZ0PDApIHtcbiAgICAgICAgYXNpZGVMaXN0LmNzcyh7J2xlZnQnOicwcHgnfSk7XG4gICAgICAgIGFzaWRlLmNzcyh7J2xlZnQnOiAnMCd9KTtcbiAgICAgIH1lbHNle1xuICAgICAgICBhc2lkZUxpc3QuY3NzKHsnbGVmdCc6Jy0zMDBweCd9KTtcbiAgICAgICAgYXNpZGUuY3NzKHsnbGVmdCc6ICctMzAwcHgnfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vL2fQv9C+0LrQsNC30LDRgtGMINGB0LrRgNGL0YLRjCDQsdC+0LrQvtCy0L7QtSDQvNC10L3Rji8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvL9C/0L7QutCw0LfQsNGC0Ywg0YHQutGA0YvRgtGMINGB0YLRgNC10LvQutGDINCy0LLQtdGA0YVcbiAgICBmdW5jdGlvbiBzaG93QXJyb3coKXtcbiAgICAgIGlmICh3aW5IZWlnaHQgPD0gd2luU2Nyb2xsVG9wICYmIGFycm93X25vbmUpIHtcbiAgICAgICAgJCgnLmFycm93LXRvcCcpLmNzcyh7J2Rpc3BsYXknOidibG9jayd9KTtcbiAgICAgICAgYXJyb3dfbm9uZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZih3aW5IZWlnaHQgPiB3aW5TY3JvbGxUb3AgJiYgIWFycm93X25vbmUpe1xuICAgICAgICAkKCcuYXJyb3ctdG9wJykuY3NzKHsnZGlzcGxheSc6J25vbmUnfSk7XG4gICAgICAgIGFycm93X25vbmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICAvL9C/0L7QutGA0LDRgdC40YIg0LXQu9C10LzQtdC90YIg0L3QsNCy0LjQs9Cw0YbQuNC+0L3QvdC+0LPQviDQvNC10L3RjiDQutC+0YLQvtGA0YvQuSDRgdC+0YLQstC10YLRgdGC0LLRg9C10YIg0YLQtdC60YPRidC10Lkg0YHRgtCw0YLQuFxuICAgIHZhciBzYXZlZEluZGV4TnVtYmVyID0gMCwgY3VycmVudEluZGV4TnVtYmVyID0gMDtcbiAgICBmdW5jdGlvbiBpbldpbmRvdyhhcnRpY2xlcywgYXNpZGVJdGVtKXtcbiAgICAgIHZhclxuICAgICAgICBpbmRlbnQgPSBwYXJzZUludCggJChhcnRpY2xlc1swXSkuY3NzKCdtYXJnaW4tYm90dG9tJykgKSxcbiAgICAgICAgY3VycmVudEVscyA9ICQoYXJ0aWNsZXMpLFxuICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgb2Zmc2V0VG9wO1xuXG4gICAgICBjdXJyZW50RWxzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSAkKHRoaXMpO1xuICAgICAgICBvZmZzZXRUb3AgPSBlbGVtZW50Lm9mZnNldCgpLnRvcDtcbiAgICAgICAgb2Zmc2V0VG9wID0gcGFyc2VJbnQob2Zmc2V0VG9wKTtcbiAgICAgICAgaWYoIHdpblNjcm9sbFRvcCtpbmRlbnQqMiA+IG9mZnNldFRvcCApe1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMpO1xuICAgICAgICAgIGN1cnJlbnRJbmRleE51bWJlciA9IHJlc3VsdC5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICggc2F2ZWRJbmRleE51bWJlciAhPT0gY3VycmVudEluZGV4TnVtYmVyKSB7XG4gICAgICAgIHNhdmVkSW5kZXhOdW1iZXIgPSBjdXJyZW50SW5kZXhOdW1iZXI7XG4gICAgICAgICQoYXNpZGVJdGVtKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICQoYXNpZGVJdGVtW2N1cnJlbnRJbmRleE51bWJlcl0pLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pKCk7XG4gIFxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9C60L7QtCDRgdGC0YDQsNC90LjRhtGLINCx0LvQvtCz0LAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vL3N0YXJ0IHBvcnRmb2xpbyBoZWFkZXIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgKGZ1bmN0aW9uKCl7XG4gICAgdmFyXG4gICAgICB0cmFuc2l0aW9uID0gMzAwLFxuICAgICAgbWVudUJ1dHRvbiA9ICQoJyNtZW51LWJ1dHRvbicpO1xuXG4gICAgbWVudUJ1dHRvbi5jbGljayhmdW5jdGlvbigpe1xuICAgICAgdmFyIGNsb3NlID0gJCgnLmN1cnRhaW4tbGVmdCcpLmhhc0NsYXNzKCdjbG9zZUN1cnRhaW5zTCcpO1xuICAgICAgaWYoY2xvc2Upe1xuICAgICAgICBjbG9zZV9tZW51KCk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgc2hvd19tZW51KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gY2xvc2VfbWVudSgpe1xuICAgICAgbWVudUJ1dHRvbi5yZW1vdmVDbGFzcygnbWVudS1idXR0b24tY2xvc2UnKTtcbiAgICAgICQoJy5jdXJ0YWluLWxlZnQsIC5jdXJ0YWluLXJpZ2h0LCAjbWFpbi1uYXYnKS5jc3MoeydvcGFjaXR5JzowfSk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJy5jdXJ0YWluLWxlZnQnKS5yZW1vdmVDbGFzcygnY2xvc2VDdXJ0YWluc0wnKTtcbiAgICAgICAgJCgnLmN1cnRhaW4tcmlnaHQnKS5yZW1vdmVDbGFzcygnY2xvc2VDdXJ0YWluc1InKTtcbiAgICAgICAgJCgnI21haW4tbmF2JykucmVtb3ZlQ2xhc3MoJ2Jsb2NrJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKCcuY3VydGFpbi1sZWZ0LCAuY3VydGFpbi1yaWdodCwgI21haW4tbmF2JykuY3NzKHsnb3BhY2l0eSc6MX0pO1xuICAgICAgICB9LCB0cmFuc2l0aW9uKTsgXG4gICAgICB9LCB0cmFuc2l0aW9uKTtcbiAgICB9XG4gICAgdmFyXG4gICAgICBhcnIgPSAkKCcubWFpbi1uYXYtbGlzdC1pdGVtJyksXG4gICAgICBhcnJfbGVuZ3RoID0gYXJyLmxlbmd0aCxcbiAgICAgIGZvbnRTaXplID0gJChhcnJbMF0pLmNzcygnZm9udC1zaXplJyk7XG5cbiAgICBmdW5jdGlvbiBzaG93X21lbnUoKXtcbiAgICAgIG1lbnVCdXR0b24uYWRkQ2xhc3MoJ21lbnUtYnV0dG9uLWNsb3NlJyk7XG4gICAgICAkKGFycikuZmluZCgnYScpLmNzcygnZm9udC1zaXplJywgJzAnKTtcbiAgICAgIHZhciBjdXJyZW50ID0gMDtcbiAgICAgICQoJy5jdXJ0YWluLWxlZnQnKS5hZGRDbGFzcygnY2xvc2VDdXJ0YWluc0wnKTtcbiAgICAgICQoJy5jdXJ0YWluLXJpZ2h0JykuYWRkQ2xhc3MoJ2Nsb3NlQ3VydGFpbnNSJyk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJyNtYWluLW5hdicpLmFkZENsYXNzKCdibG9jaycpO1xuICAgICAgICB2YXIgdGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdmFyIGEgPSAkKGFycltjdXJyZW50XSkuZmluZCgnYScpO1xuICAgICAgICAgIGEuYW5pbWF0ZSh7J2ZvbnQtc2l6ZSc6Zm9udFNpemV9LCB7XG4gICAgICAgICAgICBkdXJhdGlvbjp0cmFuc2l0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGN1cnJlbnQgPj0gYXJyX2xlbmd0aC0xKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnQrKztcbiAgICAgICAgfSwgdHJhbnNpdGlvbi8yKTsgXG5cbiAgICAgIH0sIHRyYW5zaXRpb24pO1xuICAgIH1cbiAgfSkoKTtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9lbmQgcG9ydGZvbGlvIGhlYWRlci8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9Cw0L3QuNC80LjRgNC+0LLQsNC90LjRjyDRgtC10LrRgdGC0LAg0LIg0YHQu9Cw0LnQtNC10YDQtS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgIFxuICB2YXIgdGltZW91dCA9IDYwMDtcbiAgKGZ1bmN0aW9uKCl7XG4gICAgdmFyXG4gICAgICBkZXNjcmlwdGlvbnMgPSAkKCcuc2xpZGVyX19pbWFnZS1kZXNjcmlwdGlvbicpLFxuICAgICAgdGl0bGVzID0gZGVzY3JpcHRpb25zLmZpbmQoJ2gyJyksXG4gICAgICB0ZWNobm9sb2dpc3RzID0gZGVzY3JpcHRpb25zLmZpbmQoJ3AnKTtcbiAgICAgIC8v0YTRg9C90LrRhtC40Y8g0L/QvtC00LPQvtGC0L7QstC40YIg0YLQtdC60YHRgiDQuiDQsNC90LjQvNCw0YbQuNC4INC/0L7RgNGD0LHQsNC10YIg0L3QsCDQvtGC0LTQtdC70YzQvdGL0LUg0LHRg9C60LLRiyDQstGB0LUg0YfRgtC+INC90LDQtNC+XG4gICAgZnVuY3Rpb24gZnJhY3Rpb24oZSl7XG4gICAgICBlLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgIGl0ZW0uZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgIHZhclxuICAgICAgICAgICAgdGhhdCA9ICQodGhpcyksXG4gICAgICAgICAgICBzdHJpbmcgPSB0aGF0LnRleHQoKTtcbiAgICAgICAgICB0aGF0Lmh0bWwoc3RyaW5nLnJlcGxhY2UoLy4vZywgJzxzcGFuIGNsYXNzPVwibGV0dGVyXCI+JCY8L3NwYW4+JykpO1xuICAgICAgICAgIC8v0L/RgNC40YHQstC+0LXQvCDQutCw0LbQtNC+0Lkg0LHRg9C60LLQtSDQvdC10L7QsdGF0L7QtNC40LzRg9GOINC30LDQtNC10YDQttC60YMg0L/QtdGA0LXQtCDQsNC90LjQvNCw0YbQuNC10LlcbiAgICAgICAgICB2YXJcbiAgICAgICAgICAgIGxldHRlcnMgPSB0aGF0LmZpbmQoJ3NwYW4nKSxcbiAgICAgICAgICAgIGRlYWx5ID0gMDtcbiAgICAgICAgICBsZXR0ZXJzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICB0aGF0ID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgbGV0ZXJMZW5ndGggPSBsZXR0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIHRoYXQuY3NzKHsnYW5pbWF0aW9uLWRlbGF5JzpkZWFseSsnbXMnfSk7XG4gICAgICAgICAgICBkZWFseSArPSBwYXJzZUludCh0aW1lb3V0IC8gbGV0ZXJMZW5ndGgsIDEwKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTsgXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZyYWN0aW9uKFt0aXRsZXMsIHRlY2hub2xvZ2lzdHNdKTtcbiAgfSkoKTtcbiAgXG4gIGZ1bmN0aW9uIHRleHRBbmltYXRlKHRoYXQpe1xuICAgIHZhclxuICAgICAgbGV0dGVyTGlzdCA9IHRoYXQuZmluZCgnLmxldHRlcicpLFxuICAgICAgbGlzdExlbmd0aCA9IGxldHRlckxpc3QubGVuZ3RoLFxuICAgICAgaSA9IDA7XG5cbiAgICAoZnVuY3Rpb24gc2hvd0xldHRlcigpe1xuICAgICAgdmFyIGN1cnJlbnRMZXR0ZXIgPSAkKGxldHRlckxpc3RbaV0pLmh0bWwoKTtcbiAgICAgLy/QtdGB0LvQuCDRjdGC0L4g0L/RgNC+0LHQtdC7INC30LDQtNCw0LTQuNC8INC10LzRgyDRhNC40LrRgdC40YDQvtCy0LDQvdC90YPRjiDRiNC40YDQuNC90YMg0LjQvdCw0YfQtSDQv9C+0YLQvtC8INC+0L0g0YHQv9C70Y7RidC40YLRjNGB0Y8gXG4gICAgICBpZiAoY3VycmVudExldHRlciA9PT0gJyAnKSB7XG4gICAgICAgIHZhciBsZXR0ZXJXaWR0aCA9ICQobGV0dGVyTGlzdFtpXSkud2lkdGgoKTtcbiAgICAgIC8v0LXRgdC70Lgg0YjQuNGA0LjQvdCwINC/0YDQvtCx0LXQu9CwID0gMCwg0LfQvdCw0YfQuNGCINGN0YLQviDQutC+0L3QtdGGINGB0YLRgNC+0LrQuCDQuCDQvdGD0LbQvdC+INCy0YHRgtCw0LLQuNGC0Ywg0LXQu9C10LzQtdC90YIg0L/QtdGA0LXQvdC+0YHQsCDRgdGC0YDQvtC60LhcbiAgICAgICAgaWYgKGxldHRlcldpZHRoID09IDApIHtcbiAgICAgICAgICAkKGxldHRlckxpc3RbaV0pLmFmdGVyKCc8YnI+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgJChsZXR0ZXJMaXN0W2ldKS53aWR0aChsZXR0ZXJXaWR0aCk7XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgICAoZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKGkgPCBsaXN0TGVuZ3RoKSB7XG4gICAgICAgICAgc2hvd0xldHRlcigpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBsZXR0ZXJMaXN0LmFkZENsYXNzKCdzaG93TGV0dGVyJyk7XG4gICAgICAgIH1cbiAgICAgIH0pKCk7XG4gICAgfSkoKTtcbiAgfVxuICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/QutC+0L3QtdGGINCw0L3QuNC80LjRgNC+0LLQsNC90LjRjyDRgtC10LrRgdGC0LAg0LIg0YHQu9Cw0LnQtNC10YDQtS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vc3RhcnQgc2xpZGVyLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIChmdW5jdGlvbigpe1xuICAgICQoJy5zbGlkZXJfX2JvdHRvbS1wcmV2aWV3IGxpLCAuc2xpZGVyX190b3AtcHJldmlldyBsaSwgLnNsaWRlcl9faW1hZ2VzLWxpc3QnKS5jc3Moeyd0cmFuc2l0aW9uLWR1cmF0aW9uJzp0aW1lb3V0Kydtcyd9KTtcbiAgICAkKCcuc2xpZGVyX19pbWFnZXMtbGlzdCcpLmNzcyh7ICd0cmFuc2l0aW9uLWR1cmF0aW9uJzp0aW1lb3V0LzIrJ21zJ30pO1xuICAgIHZhciBidXR0b25zID0gJCgnLnNsaWRlcl9fYnV0dG9ucy1ib3R0b20sIC5zbGlkZXJfX2J1dHRvbnMtdG9wJyk7XG4gICAgYnV0dG9ucy5vbignY2xpY2snLCBmdW5jdGlvbihldnQpe1xuICAgICAgLy/Rg9C00LDQu9C40Lwg0L7QsdGA0LDQsdC+0YLRh9C40LpcbiAgICAgIGJ1dHRvbnMub2ZmKCk7XG4gICAgICBzbGlkZXIoZXZ0KTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgLy/QstC10YDQvdGR0Lwg0L7QsdGA0LDQsdC+0YLRh9C40LpcbiAgICAgICAgYnV0dG9ucy5vbignY2xpY2snLCBmdW5jdGlvbihldnQpe3NsaWRlcihldnQpO30pO1xuICAgICAgfSx0aW1lb3V0KjIpOyBcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBjaGFuZ2VEZXNjcmlwdGlvbihpKXtcbiAgICAgIHZhclxuICAgICAgICBkZXNjID0gJCgnLnNsaWRlcl9faW1hZ2UtZGVzY3JpcHRpb24nKS5jbG9uZSgpLFxuICAgICAgICB0aXRsZSA9ICQoZGVzY1tpXSkuZmluZCgnaDInKS5hZGRDbGFzcygnYW5pbWF0ZVRleHQnKSxcbiAgICAgICAgdGVjaG5vbG9naWVzID0gJChkZXNjW2ldKS5maW5kKCdwJykuYWRkQ2xhc3MoJ2FuaW1hdGVUZXh0Jyk7XG5cbiAgICAgICQoJy53b3JrLWRlc2NyaXB0aW9uX190aXRsZSBoMicpLnJlcGxhY2VXaXRoKHRpdGxlKTtcbiAgICAgICQoJy53b3JrLWRlc2NyaXB0aW9uX190ZWNobm9sb2dpZXMgcCcpLnJlcGxhY2VXaXRoKHRlY2hub2xvZ2llcyk7XG4gICAgICB0ZXh0QW5pbWF0ZSgkKCcuYW5pbWF0ZVRleHQnKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNsaWRlcihldnQpe1xuICAgICAgdmFyIGltYWdlTGlzdCwgaW1hZ2VzLCBhcnJMZW5naHQsIGJvdHRvbiwgcHJldiwgcHJldkxlZnQsIHByZXZSaWdodCwgcHJldjFMZWZ0LHByZXYyTGVmdCwgcHJldjFSaWdodCwgcHJldjJSaWdodCwgY3VycmVudExlZnRMaSwgbmV4dExlZnRMaSwgY3VycmVudFJpZ2h0TGksIG5leHRSaWdodExpO1xuXG4gICAgICBpbWFnZUxpc3QgID0gJCgnLnNsaWRlcl9faW1hZ2VzLWxpc3QnKTtcbiAgICAgIGltYWdlcyAgICAgPSBpbWFnZUxpc3QuZmluZCgnbGknKTtcbiAgICAgIGFyckxlbmdodCAgPSBpbWFnZXMubGVuZ3RoO1xuICAgICAgYm90dG9uICAgICA9ICQoZXZ0LmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2NsYXNzJyk7XG4gICAgICBwcmV2ICAgICAgID0gJCgnLnNsaWRlcl9fYnV0dG9ucycpO1xuICAgICAgcHJldkxlZnQgICA9IHByZXYuZmluZCgnLnNsaWRlcl9fYm90dG9tLXByZXZpZXcgbGknKTtcbiAgICAgIHByZXZSaWdodCAgPSBwcmV2LmZpbmQoJy5zbGlkZXJfX3RvcC1wcmV2aWV3IGxpJyk7XG4gICAgICBwcmV2MUxlZnQgID0gJChwcmV2TGVmdFsxXSk7XG4gICAgICBwcmV2MkxlZnQgID0gJChwcmV2TGVmdFswXSk7XG4gICAgICBwcmV2MVJpZ2h0ID0gJChwcmV2UmlnaHRbMV0pO1xuICAgICAgcHJldjJSaWdodCA9ICQocHJldlJpZ2h0WzBdKTtcbiAgICAgICAgXG4gICAgICAvL9GD0LfQvdCw0LXQvCDRgtC10LrRg9GJ0LjQuSDQuCDRgdC70LXQtNGD0Y7RidC40Lkg0LXQu9C10LzQtdC90YLRiyDQv9GA0LXQstGM0Y7RhSwg0YLQtdC60YPRidC40Lkg0YLQvtGCINGH0YLQviDQstC40LTQuNC8LCDQsCDRgdC70LXQtNGD0Y7RidC40LnQtdC70LXQvNC10L3RgiDRgtC+0YIg0YfRgtC+INC/0L7QutCwINGH0YLQviDRgdC60YDRi9GCIFxuICAgICAgaWYgKCBwYXJzZUludChwcmV2MUxlZnQuY3NzKCd0b3AnKSkgPiBwYXJzZUludChwcmV2MkxlZnQuY3NzKCd0b3AnKSkpIHtcbiAgICAgICAgY3VycmVudExlZnRMaSA9IHByZXYxTGVmdDtcbiAgICAgICAgbmV4dExlZnRMaSA9IHByZXYyTGVmdDtcbiAgICAgIH1lbHNle1xuICAgICAgICBjdXJyZW50TGVmdExpID0gcHJldjJMZWZ0O1xuICAgICAgICBuZXh0TGVmdExpID0gcHJldjFMZWZ0O1xuICAgICAgfVxuICAgICAgLy/QodC70LXQtNGD0Y7RidC40Lkg0LXQu9C10LzQtdC90YIg0YEg0LvQtdCy0LAg0LfQvdCw0YfQtdC90LjQtSDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxuICAgICAgbmV4dExlZnRMaSA9IG5ld1NyYyhuZXh0TGVmdExpLCBpbWFnZXNbYXJyTGVuZ2h0LTJdKTtcbiAgICAgIC8v0LXRgdC70Lgg0L3QsNC20LDQuyDQutC90L7Qv9C60YMg0L3QsNC30LDQtCDQvtC90LAg0LbQtSDQsiDQvdC40LdcbiAgICAgIGZ1bmN0aW9uIGJhY2soKXtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgIC8v0L/QtdGA0LXQutC40L3QtdC8INC40LfQvtCx0YDQsNC20LXQvdC40LUg0YEg0LrQvtC90LAg0LIg0L3QsNGH0LDQu9C+XG4gICAgICAgICAgaW1hZ2VMaXN0LnByZXBlbmQoaW1hZ2VzW2FyckxlbmdodC0xXSk7XG4gICAgICAgICAgaW1hZ2VMaXN0LnRvZ2dsZUNsYXNzKCdvcGFjaXR5Jyk7XG4gICAgICAgIH0sIHRpbWVvdXQvMik7XG4gICAgICAgIGNoYW5nZVByZXZpZXcoY3VycmVudExlZnRMaSwgbmV4dExlZnRMaSwgJ2JvdHRvbScsIGltYWdlc1thcnJMZW5naHQtM10pO1xuICAgICAgfVxuICAgICAgLy/Rg9C30L3QsNC10Lwg0YLQtdC60YPRidC40Lkg0Lgg0YHQu9C10LTRg9GO0YnQuNC5INC10LvQtdC80LXQvdGC0Ysg0L/RgNC10LLRjNGO0YUsINGC0LXQutGD0YnQuNC5INGC0L7RgiDQutC+0YLQvtGA0YvQuSDQvdCwINCy0LjQtNGDLCDQsCDRgdC70LXQtNGD0Y7RidC40LnQtdC70LXQvNC10L3RgiDRgtC+0YIg0YfRgtC+INC/0L7QutCwINGH0YLQviDRgdC60YDRi9GCXG4gICAgICBpZiAocGFyc2VJbnQocHJldjFSaWdodC5jc3MoJ3RvcCcpKSA8IHBhcnNlSW50KHByZXYyUmlnaHQuY3NzKCd0b3AnKSkpIHtcbiAgICAgICAgY3VycmVudFJpZ2h0TGkgPSBwcmV2MVJpZ2h0O1xuICAgICAgICBuZXh0UmlnaHRMaSA9IHByZXYyUmlnaHQ7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgY3VycmVudFJpZ2h0TGkgPSBwcmV2MlJpZ2h0O1xuICAgICAgICBuZXh0UmlnaHRMaSA9IHByZXYxUmlnaHQ7XG4gICAgICB9XG4gICAgICAvL9Ch0LvQtdC00YPRjtGJ0LjQuSDQtdC70LXQvNC10L3RgiDRgSDQv9GA0LDQstCwINC30L3QsNGH0LXQvdC40LUg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cbiAgICAgIG5leHRSaWdodExpID0gbmV3U3JjKG5leHRSaWdodExpLCBpbWFnZXNbMl0pO1xuICAgICAgLy/QtdGB0LvQuCDQvdCw0LbQsNC7INCy0L/QtdGR0LQg0L7QvdCwINC20LUg0LLQstC10YDRhVxuICAgICAgZnVuY3Rpb24gZm9yd2FyZCgpe1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgLy/Qv9C10YDQtdC60LjQvdC10Lwg0LjQt9C+0LHRgNCw0LbQtdC90LjQtSDRgSDQvdCw0YfQsNC70LAg0LIg0LrQvtC90LXRhlxuICAgICAgICAgIGltYWdlTGlzdC5hcHBlbmQoaW1hZ2VzWzBdKTtcbiAgICAgICAgICBpbWFnZUxpc3QudG9nZ2xlQ2xhc3MoJ29wYWNpdHknKTtcbiAgICAgICAgfSwgdGltZW91dC8yKTtcbiAgICAgICAgY2hhbmdlUHJldmlldyhjdXJyZW50UmlnaHRMaSwgbmV4dFJpZ2h0TGksICd0b3AnLCBpbWFnZXNbM10pO1xuICAgICAgfSAgIFxuICAvL9C80LXQvdGP0LXQvCDQs9C70LDQstC90L7QtSDQuNC30L7QsdGA0LDQttC10L3QuNC1XG4gICAgICBmdW5jdGlvbiBjaGFuZ2VNYWluSW1hZ2UoKXtcbiAgICAgICAgaW1hZ2VMaXN0LnRvZ2dsZUNsYXNzKCdvcGFjaXR5Jyk7XG4gICAgICAgIGlmIChib3R0b24gPT0gJ3NsaWRlcl9fYnV0dG9ucy1ib3R0b20nKSB7XG4gICAgICAgICAgYmFjaygpO1xuICAgICAgICAgIGNoYW5nZURlc2NyaXB0aW9uKGFyckxlbmdodC0xKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgZm9yd2FyZCgpO1xuICAgICAgICAgIGNoYW5nZURlc2NyaXB0aW9uKDEpO1xuICAgICAgICB9IFxuICAgICAgfSAgXG4gIC8v0LzQtdC90Y/QvCDQv9GA0LXQstGO0YXRgyDQv9Cw0YDQsNC80LXRgtGA0Ys6INGC0LXQutGD0YnQsNGPINC70LgsINGB0LvQtdC00YPRjtGJ0LDRjyDRgtCwINC90LAg0LrQvtGC0L7RgNGD0Y4g0YHQtdGH0LDRgSDQt9Cw0LzQtdC90LXRgtGB0Y8g0YLQtdC60YPRidCw0Y8sINC90LDQv9GA0LDQstC70LXQvdC40LUg0LTQstC40LbQtdC90LjRjyDQsNC90LjQvNCw0YbRi9C4LFxuICAvL9C90L7QstCw0Y8g0LvQuCDRgtC+0LXRgdGC0Ywg0YEg0L3QvtCy0YvQvCDQuNC30L7QsdGA0LDQttC10L3QuNC10Lwg0Lgg0LLQvtC30LzQvtC20L3QviDQvtC/0LjRgdCw0L3QuNC10Lwg0L7QvdCwINC30LDQvNC10L3QtdGCINGC0YMg0LvQuCDQutC+0YLQvtGA0YPRjiDQvNGLINGB0LTQstC40L3QuNC8INC40Lcg0LfQvtC90Ysg0LLQuNC00LjQvNC+0YHRgtC4XG4gICAgICBmdW5jdGlvbiBjaGFuZ2VQcmV2aWV3KGN1cnJlbnRMaSwgbmV4dExpLCBkaXJlY3Rpb24sIG5ld0xpKXsgIFxuICAgICAgICBpZiAoZGlyZWN0aW9uID09ICdib3R0b20nKSB7XG4gICAgICAgICAgbW92ZSgnYm90Jyk7XG4gICAgICAgICAgcHJld0JhY2soJ2xlZnQnKTtcbiAgICAgICAgICAgLy8g0LrQu9C40LrQvdGD0LvQuCDQv9C+INC70LXQstC+0Lkg0LrQvdC+0L/QutC1INC30L3QsNGH0LjRgiDQvNC10L3Rj9C10Lwg0LfQvdCw0YfQtdC90LjRjyDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDQtNC70Y8g0YHQu9C10LTRg9GO0YnQuNCz0L4g0LXQu9C10LzQtdC90YLQsCDQv9GA0LDQstC+0Lkg0LrQvdC+0L/QutC1XG4gICAgICAgICAgbmV4dFJpZ2h0TGkgPSBuZXdTcmMobmV4dFJpZ2h0TGksIGltYWdlc1swXSk7XG4gICAgICAgICAgbW92ZSgndG9wJywgY3VycmVudFJpZ2h0TGksIG5leHRSaWdodExpKTtcbiAgICAgICAgICBwcmV3QmFjaygncmlnaHQnLCBjdXJyZW50UmlnaHRMaSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSAndG9wJykge1xuICAgICAgICAgIG1vdmUoJ3RvcCcpO1xuICAgICAgICAgIHByZXdCYWNrKCdyaWdodCcpO1xuICAgICAgICAgIC8vINC60LvQuNC60L3Rg9C70Lgg0L/QviDQv9GA0LDQstC+0Lkg0LrQvdC+0L/QutC1INC30L3QsNGH0LjRgiDQvNC10L3Rj9C10Lwg0LfQvdCw0YfQtdC90LjRjyDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDQtNC70Y8g0YHQu9C10LTRg9GO0YnQuNCz0L4g0LXQu9C10LzQtdC90YLQsCDQvdCwINC70LXQstC+0Lkg0LrQvdC+0L/QutC1XG4gICAgICAgICAgbmV4dExlZnRMaSA9IG5ld1NyYyhuZXh0TGVmdExpLCBpbWFnZXNbMF0pO1xuICAgICAgICAgIG1vdmUoJ2JvdCcsIGN1cnJlbnRMZWZ0TGksIG5leHRMZWZ0TGkpO1xuICAgICAgICAgIHByZXdCYWNrKCdsZWZ0JywgY3VycmVudExlZnRMaSk7XG4gICAgICAgIH1cbiAgICAgICAgLy/QstC+0LfQstGA0LLRidCw0LXRgiDRgdC60YDRi9GC0L7QtSDQv9GA0LXQstGOINC90LAg0YHRgtCw0YDRgtC+0LLQvtGOINC/0L7Qt9C40YbRi9GOLCDQv9Cw0YDQsNC80LXRgtGA0Ysg0LrQsNC60L7QtSDQv9GA0LXQstGM0Y4g0LvQtdCy0L7QtSDQuNC70Lgg0L/RgNCw0LLQvtC1LCDQuCDQvdC1INC+0LHQtdC30LDRgtC10LvRjNC90YvQuSDRgtC10LrRg9GJ0LjQudGN0LvQtdC80L3RglxuICAgICAgICBmdW5jdGlvbiBwcmV3QmFjayhwcmV2LCBjdXJyZW50RWxlbWVudCl7XG4gICAgICAgICAgaWYgKGN1cnJlbnRFbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gY3VycmVudExpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYgKHByZXYgPT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gbmV3U3JjKGN1cnJlbnRFbGVtZW50LCBuZXdMaSk7XG4gICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LmNzcyh7J3RyYW5zaXRpb24tZHVyYXRpb24nOicwbXMnLCAndG9wJzonMCd9KTtcbiAgICAgICAgICAgIH1lbHNlIGlmIChwcmV2ID09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSBuZXdTcmMoY3VycmVudEVsZW1lbnQsIG5ld0xpKTtcbiAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQuY3NzKHsndHJhbnNpdGlvbi1kdXJhdGlvbic6JzBtcycsICd0b3AnOicxMDAlJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG1vdmUoZGlyZWN0aW9uLCBjdXJyZW50RWxlbWVudCwgbmV4dEVsZW1lbnQpe1xuICAgICAgICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gdW5kZWZpbmVkIHx8IG5leHRFbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gY3VycmVudExpO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBuZXh0TGk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG5leHRFbGVtZW50LmNzcyh7J3RyYW5zaXRpb24tZHVyYXRpb24nOnRpbWVvdXQrJ21zJ30pO1xuICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT0gJ2JvdCcpIHtcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LmNzcyh7J3RvcCc6JzIwMCUnfSk7XG4gICAgICAgICAgICBuZXh0RWxlbWVudC5jc3Moeyd0b3AnOicxMDAlJ30pO1xuICAgICAgICAgIH1lbHNlIGlmKGRpcmVjdGlvbiA9PSAndG9wJyl7XG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudC5jc3Moeyd0b3AnOiAnLTEwMCUnfSk7XG4gICAgICAgICAgICBuZXh0RWxlbWVudC5jc3Moeyd0b3AnOicwJ30pOyAgXG4gICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgICAgfVxuICAvL9GE0YPQvdC60YbQuNGPINC80LXQvdGP0LXRgiDQutCw0YLRgNC40L3QutGDINC4IGgxINCyIGxpINGN0LvQtdC80LXQvdGC0YLQtVxuICAgICAgZnVuY3Rpb24gbmV3U3JjKG9sZExpLCBuZXdMaSl7XG4gICAgICAgIHZhclxuICAgICAgICAgIHRtcFNyYyA9ICQobmV3TGkpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpLFxuICAgICAgICAgIHRtcEgxID0gJChuZXdMaSkuZmluZCgnaDEnKS5odG1sKCk7XG4gICAgICAgIC8v0LfQsNC80LXQvdC40Lwg0LDQtNGA0LXRgSDQuiDQutCw0YDRgtC40L3QutC1XG4gICAgICAgIG9sZExpLmZpbmQoJ2ltZycpLmF0dHIoeydzcmMnOnRtcFNyY30pO1xuICAgICAgICAvL9C30LDQvNC10L3QuNC8INC60L7QvdGC0LXQvdGCINCyIGgxXG4gICAgICAgIG9sZExpLmZpbmQoJ2gxJykuaHRtbCh0bXBIMSk7XG4gICAgICAgIHJldHVybiBvbGRMaTtcbiAgICAgIH1cbiAgICAgIGNoYW5nZU1haW5JbWFnZSgpO1xuICAgIH1cbiAgfSkoKTtcbiAgXG4gICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9lbmQgc2xpZGVyLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL3BzcmFsbGF4Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXJcbiAgICAgIGxheWVyID0gJCgnLnBhcmFsbGF4JykuZmluZCgnLnBhcmFsbGF4X19sYXllcicpLFxuICAgICAgbGF5ZXJTY3JvbGwgPSAkKCcucGFyYWxsYXhfc2Nyb2xsJykuZmluZCgnLnBhcmFsbGF4X19sYXllcicpO1xuICAgICQod2luZG93KS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHsgXG4gICAgICB2YXJcbiAgICAgICAgbW91c2VfZHggPSAoZS5wYWdlWCksIC8vINCj0LfQvdCw0LXQvCDQv9C+0LvQvtC20LXQvdC40LUg0LzRi9GI0LrQuCDQv9C+IFhcbiAgICAgICAgbW91c2VfZHkgPSAoZS5wYWdlWSksIC8vINCj0LfQvdCw0LXQvCDQv9C+0LvQvtC20LXQvdC40LUg0LzRi9GI0LrQuCDQv9C+IFlcbiAgICAgICAgdyA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gbW91c2VfZHgsIC8vINCS0YvRh9C40YHQu9GP0LXQvCDQtNC70Y8geCDQv9C10YDQtdC80LXRidC10L3QuNGPXG4gICAgICAgIGggPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBtb3VzZV9keTsgLy8g0JLRi9GH0LjRgdC70Y/QtdC8INC00LvRjyB5INC/0LXRgNC10LzQtdGJ0LXQvdC40Y9cblxuICAgICAgbGF5ZXIubWFwKGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgIHdpZHRoUG9zaXRpb24gPSB3ICogKGtleSAvIDEwMCksIC8vINCS0YvRh9C40YHQu9GP0LXQvCDQutC+0L7RhNC40YbQtdC90YIg0YHQvNC10YjQtdC90LjRjyDQv9C+IFhcbiAgICAgICAgICBoZWlnaHRQb3NpdGlvbiA9IGggKiAoa2V5IC8gMTAwKTsgLy8g0JLRi9GH0LjRgdC70Y/QtdC8INC60L7QvtGE0LjRhtC10L3RgiDRgdC80LXRiNC10L3QuNGPINC/0L4gWVxuXG4gICAgICAgICQodmFsdWUpLmNzcyh7XG4gICAgICAgICAgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGUzZCgnICsgd2lkdGhQb3NpdGlvbiArICdweCwgJyArIGhlaWdodFBvc2l0aW9uICsgJ3B4LCAwKSdcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB2YXIgd2luZG93SGVpZ3RoID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciB3aW5TY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICBpZiAod2luZG93SGVpZ3RoID4gd2luU2Nyb2xsVG9wKSB7XG4gICAgICAgIGxheWVyU2Nyb2xsLm1hcChmdW5jdGlvbiAoa2V5LCB2YWx1ZSl7XG4gICAgICAgICAgdmFyIGJpYXMgPSB3aW5TY3JvbGxUb3AgKiAoa2V5LzIwKTtcbiAgICAgICAgICAkKHZhbHVlKS5jc3Moe1xuICAgICAgICAgICAgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGUzZCgwLCAnICsgLWJpYXMgKydweCwgMCknXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNle3JldHVybjt9XG4gICAgfSk7XG4gIH0pKCk7ICBcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vcHNyYWxsYXgvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL3NraWxscy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIChmdW5jdGlvbigpe1xuICAgIHZhclxuICAgICAgdGFyZ2V0ID0gJCgnLm15LXNraWxscy1ib3gtY2VlbnRlcicpLFxuICAgICAgd2luZG93SGVpZ3RoID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuXG4gICAgaWYodGFyZ2V0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHZhclxuICAgICAgICBza2lsbHMgPSAkKCcubXktc2tpbGxzX19pdGVtJyksXG4gICAgICAgIGRhdGE7XG5cbiAgICAgIHRhcmdldCA9IHRhcmdldC5vZmZzZXQoKS50b3A7XG4gICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB3aW5TY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIGlmICh3aW5TY3JvbGxUb3Ard2luZG93SGVpZ3RoLzEwKjcgPiB0YXJnZXQpIHtcbiAgICAgICAgICBza2lsbHMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgIGRhdGEgPSAkdGhpcy5hdHRyKCdkYXRhLXNraWxsJyk7XG4gICAgICAgICAgICBpZiAoZGF0YSA9PSAwKSB7ZGF0YSA9IDE7fVxuICAgICAgICAgICAgZGF0YSA9ICBwYXJzZUludCggNzIyKihkYXRhLzEwMCkgKTtcbiAgICAgICAgICAgICR0aGlzLmZpbmQoJy5zZWN0b3InKS5jc3MoeydzdHJva2UtZGFzaGFycmF5JzpkYXRhKycgNzIyJ30pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gIH0pKCk7XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vc2tpbGxzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vYWRtaW4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgKGZ1bmN0aW9uKCl7XG4gICAgdmFyIFxuICAgICAgYWRtaW5Gb3JtcyA9ICQoJy5hZG1pbi1mb3JtJyksXG4gICAgICBtZW5MaXN0ID0gJCgnLmFkbWluLW5hdl9faXRlbScpO1xuXG4gICAgbWVuTGlzdC5jbGljayhmdW5jdGlvbigpe1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQodGhhdCkuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1lbHNle1xuICAgICAgICAkKHRoYXQpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkKHRoYXQpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgc2hvd0Zvcm0oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgIFxuICAgIGZ1bmN0aW9uIHNob3dGb3JtKCl7XG4gICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgLy/RhNGD0L3QutGG0YvRjyDQv9C+0LrQsNC20LXRgiDQvdGD0LbQvdGD0Y4g0YTQvtGA0LzRgyDQuCDRgdC60YDQvtC10YIg0L3QtSDQvdGD0LbQvdGD0Y4g0YDQtdGI0LXQvdC40Y8g0L/RgNC40L3QuNC80LDQtdGC0YzRgdGPINC90LAg0L7RgdC90L7QstC1INCw0LrRgtC40LLQvdC+0LPQviDQtdC70LXQvNC10L3RgtCwINC80LXQvdGOXG4gICAgICBtZW5MaXN0LmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICBpZiAoICQodGhhdCkuaGFzQ2xhc3MoJ2FjdGl2ZScpICkge1xuICAgICAgICAgICQoYWRtaW5Gb3Jtc1tjb3VudF0pLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAkKGFkbWluRm9ybXNbY291bnRdKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9XG4gICAgICAgIGNvdW50Kys7ICBcbiAgICAgIH0pO1xuICAgIH1cbiAgICBhZG1pbkZvcm1zLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgc2hvd0Zvcm0oKTtcbiAgICBcbiAgfSkoKTtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL2FkbWluLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/RhNC+0YDQvNCwINCy0YXQvtC00LAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgKGZ1bmN0aW9uKCl7XG4gICAgdmFyIGxvZ2luRGF0YSA9IHt9O1xuICAgICQoJyNsb2dpbi1uYXZfX2VudGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhclxuICAgICAgICBsb2dpbkZvcm0gPSAkKCcjbG9naW4tZm9ybScpLFxuICAgICAgICBlcnJvcnMgPSBbXTtcblxuICAgICAgbG9naW5EYXRhLmxvZ2luID0gbG9naW5Gb3JtLmZpbmQoJyNsb2dpbicpLnZhbCgpLnRyaW0oKSxcbiAgICAgIGxvZ2luRGF0YS5wYXNzID0gbG9naW5Gb3JtLmZpbmQoJyNwYXNzd29yZCcpLnZhbCgpLnRyaW0oKSxcbiAgICAgIGxvZ2luRGF0YS5odW1hbiA9IGxvZ2luRm9ybS5maW5kKCcjbG9naW5mb3JtX2NoZWNrJykucHJvcCgnY2hlY2tlZCcpLFxuICAgICAgbG9naW5EYXRhLmV4YWN0bHlIdW1hbiA9IGxvZ2luRm9ybS5maW5kKCcjcmFkaW9feWVzJykucHJvcCgnY2hlY2tlZCcpO1xuICAgICAgICBcbiAgICAgIGZvcih2YXIgcHJvcGVydHkgaW4gbG9naW5EYXRhKXtcbiAgICAgICAgdmFyIHByb3BMYWx1ZSA9IGxvZ2luRGF0YVtwcm9wZXJ0eV07XG4gICAgICAgIGlmICggcHJvcExhbHVlID09PSBmYWxzZSB8fCBwcm9wTGFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAvL9C30L3QsNGH0LXRgiDRjdGC0L4g0YfQtdC60LHQvtC60YHRi1xuICAgICAgICAgIGlmIChwcm9wTGFsdWUgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGVycm9yc1sxXSA9ICfQn9C+0LbQvtC20LUg0YfRgtC+INCy0Ysg0YDQvtCx0L7Rgi4nO1xuICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgLy/Qt9C90LDRh9C10YIg0Y3RgtC+INGB0YLRgNC+0LrQuFxuICAgICAgICAgIHZhciBzdHJMZW5ndGggPSBwcm9wTGFsdWUubGVuZ3RoO1xuICAgICAgICAgIGlmIChzdHJMZW5ndGggPCA0IHx8IHN0ckxlbmd0aCA+IDE0KSB7XG4gICAgICAgICAgICBlcnJvcnNbMF0gPSAn0JTQu9C40L3QvdCwINC70L7Qs9C40L3QsCDQuCDQv9Cw0YDQvtC70Y8g0LTQvtC70LbQvdCwINCx0YvRgtGMINC+0YIgNCDQtNC+IDE0INGB0LjQvNCy0L7Qu9C+0LIuJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgbWVzc2FnZSA9ICfQn9GA0Lgg0LfQsNC/0L7Qu9C90LXQvdC40Lgg0YTQvtGA0LzRiyDQvtCx0L3QsNGA0YPQttC10L3RiyDRgdC70LXQtNGD0Y7RidC40LUg0L7RiNC40LHQutC4Llxcbic7XG4gICAgICAgIGVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICAgIG1lc3NhZ2UgKz0gKGl0ZW0pID8gaXRlbSsnXFxuJzonICc7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFsZXJ0KG1lc3NhZ2UpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvL9C00LDQu9C1INGA0LDQsdC+0YLQsCDQt9CwINGB0LXRgNCy0LXRgNC+0LxcbiAgICB9KTtcbiAgfSkoKTtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v0YTQvtGA0LzQsCDQstGF0L7QtNCwLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/QkNC00LzQuNC9Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgKGZ1bmN0aW9uKCl7XG4gICAgdmFyXG4gICAgICBmb3JtQWJvdXRNZSA9ICQoJyNhZG1pbi1hYm91dC1tZScpLFxuICAgICAgZm9ybUJsb2cgPSAkKCcjYWRtaW4tYmxvZycpLFxuICAgICAgZm9ybVdvcmtzID0gJCgnI2FkbWluLXdvcmtzJyk7ICBcbiAgICAvL9C/0YDQvtCy0LXRgNGP0LXQvCDQstCy0L7QtNC40YLRgdGPINC70Lgg0LIgaW5wdXQg0YfQuNGB0LvQviDQtdGB0LvQuCDQvdC10YIg0YfQuNGB0YLQuNC8INC10LPQvlxuICAgIGZvcm1BYm91dE1lLmZpbmQoJ2lucHV0Jykub24oJ2lucHV0JywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciB2YWx1ZSA9IHBhcnNlSW50KCAkKHRoaXMpLnZhbCgpICk7XG4gICAgICBpZiAoIGlzTmFOKHZhbHVlKSApIHskKHRoaXMpLnZhbCgnJyk7fVxuICAgIH0pO1xuICAgIC8v0LHQtdGA0ZHRgiDQtNCw0L3QvdGL0LUg0YEg0YTQvtGA0LzRiyDQv9C+0LvRg9GH0LXQvdC+0Lkg0LIg0LrQsNGH0LXRgdGC0LLQtSDQv9Cw0YDQsNC80LXRgtGA0LAg0Lgg0YHRhNC+0YDQvNC40YDRg9C10Lwg0LTQstGD0YUg0YPRgNC+0LLQtdCy0YvQuSDQvNCw0YHRgdC40LIg0LTQtNC90L3Ri9GFINC00LvRjyDQvtGC0L/RgNCw0LLQutC4INC90LAg0YHQtdGA0LLQtdGAXG4gICAgZnVuY3Rpb24gZ2V0RGF0YShmb3JtKXtcbiAgICAgIHZhclxuICAgICAgICBmb3JtSWQgPSBmb3JtLmF0dHIoJ2lkJyksXG4gICAgICAgIGlucHV0cyA9IGZvcm0uZmluZCgnaW5wdXQsIHRleHRhcmVhJyksXG4gICAgICAgIGRhdGEgPSBbWydmb3JtSWQnLCBmb3JtSWRdXTtcbiAgICAgIGlucHV0cy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKSwgY3VyZW50RGF0YSA9IFt0aGF0LmF0dHIoJ2lkJyksIHRoYXQudmFsKCldO1xuICAgICAgICBkYXRhW2RhdGEubGVuZ3RoXSA9IGN1cmVudERhdGE7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBcbiAgICBmb3JtQWJvdXRNZS5maW5kKCcjYWRtaW4tYWJvdXQtbWVfX3NhdmUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIGRhdGEgPSBnZXREYXRhKGZvcm1BYm91dE1lKTtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH0pO1xuICAgIGZvcm1CbG9nLmZpbmQoJyNhZG1pbi1ibG9nX19zYXZlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBkYXRhID0gZ2V0RGF0YShmb3JtQmxvZyk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICB9KTtcbiAgICBmb3JtV29ya3MuZmluZCgnI2FkbWluLXdvcmtzX19zYXZlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBkYXRhID0gZ2V0RGF0YShmb3JtV29ya3MpO1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICB9KTtcbiAgfSkoKTtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9CQ0LTQvNC40L0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
