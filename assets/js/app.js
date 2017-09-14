'use strict';
$(window).ready(function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuJCh3aW5kb3cpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vINC/0LvQsNCy0L3Ri9C5INGB0LrRgNC+0LsgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICQoJ2FbaHJlZl49XCIjXCJdJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDsgIC8v0YPQt9C90LDQtdC8INC80LXRgdGC0L4g0L3QsNC30L3QsNGH0LXQvdC40Y8gXG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogZGVzdGluYXRpb259LCAxMDAwKTsgIC8v0LTQstC40LPQsNC10Lwg0Log0L3QuNC80YNcbiAgICByZXR1cm4gZmFsc2U7ICAgICAgICAgICAgICAgICAgICAgXG4gIH0pO1xuICAvLy8vLy8vLy8vLy8vLy8vLy8g0L/Qu9Cw0LLQvdGL0Lkg0YHQutGA0L7QuyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v0L/QtdGA0LXQstC10YDQvdGD0YLRjCDQv9C70LDRiNC60YMvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICQoJyN0by1tYWluLWJ1dCwgI2F1dGhvcml6YXRpb24tYnV0dG9uJykub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICQoJyNwbGF0ZScpLnRvZ2dsZUNsYXNzKCdwbGF0ZS1mcm9udCcpO1xuICB9KTtcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/Qv9C10YDQtdCy0LXRgNC90YPRgtGMINC/0LvQsNGI0LrRgy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v0LrQvtC0INGB0YLRgNCw0L3QuNGG0Ysg0LHQu9C+0LPQsC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAoZnVuY3Rpb24oKXtcbiAgICB2YXJcbiAgICAgIG5vdF9maXhlZCA9IHRydWUsXG4gICAgICBhcnJvd19ub25lID0gdHJ1ZSxcbiAgICAgIHRhcmdldCA9ICQoJyNzZWN0aW9uLWFydGljbGVzJyksXG4gICAgICBhcnRpY2xlcyA9ICQoJy5hcnRpY2xlJyksXG4gICAgICBhc2lkZUl0ZW0gPSAkKCcuYmxvZ19hc2lkZV9faXRlbScpLFxuICAgICAgYXNpZGVMaXN0ID0gJCgnLmJsb2dfYXNpZGVfX2xpc3QnKSxcbiAgICAgIGFzaWRlID0gJCgnLmJsb2dfYXNpZGUnKSxcbiAgICAgIGFzaWRlTG9pc3RCdXR0b24gPSBhc2lkZUxpc3QuZmluZCgnI2Jsb2dfYXNpZGVfX2xpc3RfYnV0dG9uJyksXG4gICAgICB3aW5IZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCksXG4gICAgICB3aW5TY3JvbGxUb3AgPSAnJztcbiAgICAgIFxuICAgIGlmICh0YXJnZXQubGVuZ3RoID4gMCkge1xuICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpe1xuICAgICAgICB3aW5TY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIGZpeGV0X25hdigpO1xuICAgICAgICBpbldpbmRvdyhhcnRpY2xlcywgYXNpZGVJdGVtKTtcbiAgICAgICAgc2hvd0Fycm93KCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy/Qv9C+0LfRi9GG0YvQvtC90LjRgNC+0LLQsNC90LjQtSDQvdCw0LLQuNCz0LDRhtC40LhcbiAgICBmdW5jdGlvbiBmaXhldF9uYXYoKXtcbiAgICAgXG4gICAgICB2YXIgdGFyZ2V0UG9zID0gdGFyZ2V0Lm9mZnNldCgpLnRvcDtcblxuICAgICAgaWYod2luU2Nyb2xsVG9wID49IHRhcmdldFBvcyAmJiBub3RfZml4ZWQpe1xuICAgICAgICB2YXIgdG9wID0gJChhc2lkZUxpc3QpLnBvc2l0aW9uKCkudG9wO1xuICAgICAgICB2YXIgbGVmdCA9ICQoYXNpZGVMaXN0KS5vZmZzZXQoKS5sZWZ0O1xuICAgICAgICAkKGFzaWRlTGlzdCkuY3NzKHsncG9zaXRpb24nOidmaXhlZCcsICd0b3AnOiB0b3ArJ3B4JywgJ2xlZnQnOiBsZWZ0KydweCd9KTtcbiAgICAgICAgbm90X2ZpeGVkID0gZmFsc2U7XG4gICAgICB9ZWxzZSBpZih3aW5TY3JvbGxUb3AgPCB0YXJnZXRQb3MgJiYgIW5vdF9maXhlZCkge1xuICAgICAgICAkKGFzaWRlTGlzdCkuY3NzKHsncG9zaXRpb24nOidzdGF0aWMnfSk7XG4gICAgICAgIG5vdF9maXhlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy9n0L/QvtC60LDQt9Cw0YLRjCDRgdC60YDRi9GC0Ywg0LHQvtC60L7QstC+0LUg0LzQtdC90Y4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGFzaWRlTG9pc3RCdXR0b24uY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgIHZhciBsZWZ0ID0gcGFyc2VJbnQoIGFzaWRlLmNzcygnbGVmdCcpICk7XG4gICAgICBpZiAobGVmdDwwKSB7XG4gICAgICAgIGFzaWRlTGlzdC5jc3MoeydsZWZ0JzonMHB4J30pO1xuICAgICAgICBhc2lkZS5jc3MoeydsZWZ0JzogJzAnfSk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgYXNpZGVMaXN0LmNzcyh7J2xlZnQnOictMzAwcHgnfSk7XG4gICAgICAgIGFzaWRlLmNzcyh7J2xlZnQnOiAnLTMwMHB4J30pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy9n0L/QvtC60LDQt9Cw0YLRjCDRgdC60YDRi9GC0Ywg0LHQvtC60L7QstC+0LUg0LzQtdC90Y4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLy/Qv9C+0LrQsNC30LDRgtGMINGB0LrRgNGL0YLRjCDRgdGC0YDQtdC70LrRgyDQstCy0LXRgNGFXG4gICAgZnVuY3Rpb24gc2hvd0Fycm93KCl7XG4gICAgICBpZiAod2luSGVpZ2h0IDw9IHdpblNjcm9sbFRvcCAmJiBhcnJvd19ub25lKSB7XG4gICAgICAgICQoJy5hcnJvdy10b3AnKS5jc3MoeydkaXNwbGF5JzonYmxvY2snfSk7XG4gICAgICAgIGFycm93X25vbmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYod2luSGVpZ2h0ID4gd2luU2Nyb2xsVG9wICYmICFhcnJvd19ub25lKXtcbiAgICAgICAgJCgnLmFycm93LXRvcCcpLmNzcyh7J2Rpc3BsYXknOidub25lJ30pO1xuICAgICAgICBhcnJvd19ub25lID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy/Qv9C+0LrRgNCw0YHQuNGCINC10LvQtdC80LXQvdGCINC90LDQstC40LPQsNGG0LjQvtC90L3QvtCz0L4g0LzQtdC90Y4g0LrQvtGC0L7RgNGL0Lkg0YHQvtGC0LLQtdGC0YHRgtCy0YPQtdGCINGC0LXQutGD0YnQtdC5INGB0YLQsNGC0LhcbiAgICB2YXIgc2F2ZWRJbmRleE51bWJlciA9IDAsIGN1cnJlbnRJbmRleE51bWJlciA9IDA7XG4gICAgZnVuY3Rpb24gaW5XaW5kb3coYXJ0aWNsZXMsIGFzaWRlSXRlbSl7XG4gICAgICB2YXJcbiAgICAgICAgaW5kZW50ID0gcGFyc2VJbnQoICQoYXJ0aWNsZXNbMF0pLmNzcygnbWFyZ2luLWJvdHRvbScpICksXG4gICAgICAgIGN1cnJlbnRFbHMgPSAkKGFydGljbGVzKSxcbiAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgIG9mZnNldFRvcDtcblxuICAgICAgY3VycmVudEVscy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBlbGVtZW50ID0gJCh0aGlzKTtcbiAgICAgICAgb2Zmc2V0VG9wID0gZWxlbWVudC5vZmZzZXQoKS50b3A7XG4gICAgICAgIG9mZnNldFRvcCA9IHBhcnNlSW50KG9mZnNldFRvcCk7XG4gICAgICAgIGlmKCB3aW5TY3JvbGxUb3AraW5kZW50KjIgPiBvZmZzZXRUb3AgKXtcbiAgICAgICAgICByZXN1bHQucHVzaCh0aGlzKTtcbiAgICAgICAgICBjdXJyZW50SW5kZXhOdW1iZXIgPSByZXN1bHQubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoIHNhdmVkSW5kZXhOdW1iZXIgIT09IGN1cnJlbnRJbmRleE51bWJlcikge1xuICAgICAgICBzYXZlZEluZGV4TnVtYmVyID0gY3VycmVudEluZGV4TnVtYmVyO1xuICAgICAgICAkKGFzaWRlSXRlbSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkKGFzaWRlSXRlbVtjdXJyZW50SW5kZXhOdW1iZXJdKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfVxuICB9KSgpO1xuICBcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/QutC+0LQg0YHRgtGA0LDQvdC40YbRiyDQsdC70L7Qs9CwLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9zdGFydCBwb3J0Zm9saW8gaGVhZGVyLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIChmdW5jdGlvbigpe1xuICAgIHZhclxuICAgICAgdHJhbnNpdGlvbiA9IDMwMCxcbiAgICAgIG1lbnVCdXR0b24gPSAkKCcjbWVudS1idXR0b24nKTtcblxuICAgIG1lbnVCdXR0b24uY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgIHZhciBjbG9zZSA9ICQoJy5jdXJ0YWluLWxlZnQnKS5oYXNDbGFzcygnY2xvc2VDdXJ0YWluc0wnKTtcbiAgICAgIGlmKGNsb3NlKXtcbiAgICAgICAgY2xvc2VfbWVudSgpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHNob3dfbWVudSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGZ1bmN0aW9uIGNsb3NlX21lbnUoKXtcbiAgICAgIG1lbnVCdXR0b24ucmVtb3ZlQ2xhc3MoJ21lbnUtYnV0dG9uLWNsb3NlJyk7XG4gICAgICAkKCcuY3VydGFpbi1sZWZ0LCAuY3VydGFpbi1yaWdodCwgI21haW4tbmF2JykuY3NzKHsnb3BhY2l0eSc6MH0pO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAkKCcuY3VydGFpbi1sZWZ0JykucmVtb3ZlQ2xhc3MoJ2Nsb3NlQ3VydGFpbnNMJyk7XG4gICAgICAgICQoJy5jdXJ0YWluLXJpZ2h0JykucmVtb3ZlQ2xhc3MoJ2Nsb3NlQ3VydGFpbnNSJyk7XG4gICAgICAgICQoJyNtYWluLW5hdicpLnJlbW92ZUNsYXNzKCdibG9jaycpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnLmN1cnRhaW4tbGVmdCwgLmN1cnRhaW4tcmlnaHQsICNtYWluLW5hdicpLmNzcyh7J29wYWNpdHknOjF9KTtcbiAgICAgICAgfSwgdHJhbnNpdGlvbik7IFxuICAgICAgfSwgdHJhbnNpdGlvbik7XG4gICAgfVxuICAgIHZhclxuICAgICAgYXJyID0gJCgnLm1haW4tbmF2LWxpc3QtaXRlbScpLFxuICAgICAgYXJyX2xlbmd0aCA9IGFyci5sZW5ndGgsXG4gICAgICBmb250U2l6ZSA9ICQoYXJyWzBdKS5jc3MoJ2ZvbnQtc2l6ZScpO1xuXG4gICAgZnVuY3Rpb24gc2hvd19tZW51KCl7XG4gICAgICBtZW51QnV0dG9uLmFkZENsYXNzKCdtZW51LWJ1dHRvbi1jbG9zZScpO1xuICAgICAgJChhcnIpLmZpbmQoJ2EnKS5jc3MoJ2ZvbnQtc2l6ZScsICcwJyk7XG4gICAgICB2YXIgY3VycmVudCA9IDA7XG4gICAgICAkKCcuY3VydGFpbi1sZWZ0JykuYWRkQ2xhc3MoJ2Nsb3NlQ3VydGFpbnNMJyk7XG4gICAgICAkKCcuY3VydGFpbi1yaWdodCcpLmFkZENsYXNzKCdjbG9zZUN1cnRhaW5zUicpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAkKCcjbWFpbi1uYXYnKS5hZGRDbGFzcygnYmxvY2snKTtcbiAgICAgICAgdmFyIHRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICAgICAgICAgIHZhciBhID0gJChhcnJbY3VycmVudF0pLmZpbmQoJ2EnKTtcbiAgICAgICAgICBhLmFuaW1hdGUoeydmb250LXNpemUnOmZvbnRTaXplfSwge1xuICAgICAgICAgICAgZHVyYXRpb246dHJhbnNpdGlvblxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChjdXJyZW50ID49IGFycl9sZW5ndGgtMSkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJyZW50Kys7XG4gICAgICAgIH0sIHRyYW5zaXRpb24vMik7IFxuXG4gICAgICB9LCB0cmFuc2l0aW9uKTtcbiAgICB9XG4gIH0pKCk7XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vZW5kIHBvcnRmb2xpbyBoZWFkZXIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/QsNC90LjQvNC40YDQvtCy0LDQvdC40Y8g0YLQtdC60YHRgtCwINCyINGB0LvQsNC50LTQtdGA0LUvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICBcbiAgdmFyIHRpbWVvdXQgPSA2MDA7XG4gIChmdW5jdGlvbigpe1xuICAgIHZhclxuICAgICAgZGVzY3JpcHRpb25zID0gJCgnLnNsaWRlcl9faW1hZ2UtZGVzY3JpcHRpb24nKSxcbiAgICAgIHRpdGxlcyA9IGRlc2NyaXB0aW9ucy5maW5kKCdoMicpLFxuICAgICAgdGVjaG5vbG9naXN0cyA9IGRlc2NyaXB0aW9ucy5maW5kKCdwJyk7XG4gICAgICAvL9GE0YPQvdC60YbQuNGPINC/0L7QtNCz0L7RgtC+0LLQuNGCINGC0LXQutGB0YIg0Log0LDQvdC40LzQsNGG0LjQuCDQv9C+0YDRg9Cx0LDQtdGCINC90LAg0L7RgtC00LXQu9GM0L3Ri9C1INCx0YPQutCy0Ysg0LLRgdC1INGH0YLQviDQvdCw0LTQvlxuICAgIGZ1bmN0aW9uIGZyYWN0aW9uKGUpe1xuICAgICAgZS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICBpdGVtLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICB2YXJcbiAgICAgICAgICAgIHRoYXQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgc3RyaW5nID0gdGhhdC50ZXh0KCk7XG4gICAgICAgICAgdGhhdC5odG1sKHN0cmluZy5yZXBsYWNlKC8uL2csICc8c3BhbiBjbGFzcz1cImxldHRlclwiPiQmPC9zcGFuPicpKTtcbiAgICAgICAgICAvL9C/0YDQuNGB0LLQvtC10Lwg0LrQsNC20LTQvtC5INCx0YPQutCy0LUg0L3QtdC+0LHRhdC+0LTQuNC80YPRjiDQt9Cw0LTQtdGA0LbQutGDINC/0LXRgNC10LQg0LDQvdC40LzQsNGG0LjQtdC5XG4gICAgICAgICAgdmFyXG4gICAgICAgICAgICBsZXR0ZXJzID0gdGhhdC5maW5kKCdzcGFuJyksXG4gICAgICAgICAgICBkZWFseSA9IDA7XG4gICAgICAgICAgbGV0dGVycy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgdGhhdCA9ICQodGhpcyksXG4gICAgICAgICAgICAgIGxldGVyTGVuZ3RoID0gbGV0dGVycy5sZW5ndGg7XG4gICAgICAgICAgICB0aGF0LmNzcyh7J2FuaW1hdGlvbi1kZWxheSc6ZGVhbHkrJ21zJ30pO1xuICAgICAgICAgICAgZGVhbHkgKz0gcGFyc2VJbnQodGltZW91dCAvIGxldGVyTGVuZ3RoLCAxMCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7IFxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmcmFjdGlvbihbdGl0bGVzLCB0ZWNobm9sb2dpc3RzXSk7XG4gIH0pKCk7XG4gIFxuICBmdW5jdGlvbiB0ZXh0QW5pbWF0ZSh0aGF0KXtcbiAgICB2YXJcbiAgICAgIGxldHRlckxpc3QgPSB0aGF0LmZpbmQoJy5sZXR0ZXInKSxcbiAgICAgIGxpc3RMZW5ndGggPSBsZXR0ZXJMaXN0Lmxlbmd0aCxcbiAgICAgIGkgPSAwO1xuXG4gICAgKGZ1bmN0aW9uIHNob3dMZXR0ZXIoKXtcbiAgICAgIHZhciBjdXJyZW50TGV0dGVyID0gJChsZXR0ZXJMaXN0W2ldKS5odG1sKCk7XG4gICAgIC8v0LXRgdC70Lgg0Y3RgtC+INC/0YDQvtCx0LXQuyDQt9Cw0LTQsNC00LjQvCDQtdC80YMg0YTQuNC60YHQuNGA0L7QstCw0L3QvdGD0Y4g0YjQuNGA0LjQvdGDINC40L3QsNGH0LUg0L/QvtGC0L7QvCDQvtC9INGB0L/Qu9GO0YnQuNGC0YzRgdGPIFxuICAgICAgaWYgKGN1cnJlbnRMZXR0ZXIgPT09ICcgJykge1xuICAgICAgICB2YXIgbGV0dGVyV2lkdGggPSAkKGxldHRlckxpc3RbaV0pLndpZHRoKCk7XG4gICAgICAvL9C10YHQu9C4INGI0LjRgNC40L3QsCDQv9GA0L7QsdC10LvQsCA9IDAsINC30L3QsNGH0LjRgiDRjdGC0L4g0LrQvtC90LXRhiDRgdGC0YDQvtC60Lgg0Lgg0L3Rg9C20L3QviDQstGB0YLQsNCy0LjRgtGMINC10LvQtdC80LXQvdGCINC/0LXRgNC10L3QvtGB0LAg0YHRgtGA0L7QutC4XG4gICAgICAgIGlmIChsZXR0ZXJXaWR0aCA9PSAwKSB7XG4gICAgICAgICAgJChsZXR0ZXJMaXN0W2ldKS5hZnRlcignPGJyPicpO1xuICAgICAgICB9XG4gICAgICAgICQobGV0dGVyTGlzdFtpXSkud2lkdGgobGV0dGVyV2lkdGgpO1xuICAgICAgfVxuICAgICAgaSsrO1xuICAgICAgKGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmIChpIDwgbGlzdExlbmd0aCkge1xuICAgICAgICAgIHNob3dMZXR0ZXIoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgbGV0dGVyTGlzdC5hZGRDbGFzcygnc2hvd0xldHRlcicpO1xuICAgICAgICB9XG4gICAgICB9KSgpO1xuICAgIH0pKCk7XG4gIH1cbiAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v0LrQvtC90LXRhiDQsNC90LjQvNC40YDQvtCy0LDQvdC40Y8g0YLQtdC60YHRgtCwINCyINGB0LvQsNC50LTQtdGA0LUvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL3N0YXJ0IHNsaWRlci8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAoZnVuY3Rpb24oKXtcbiAgICAkKCcuc2xpZGVyX19ib3R0b20tcHJldmlldyBsaSwgLnNsaWRlcl9fdG9wLXByZXZpZXcgbGksIC5zbGlkZXJfX2ltYWdlcy1saXN0JykuY3NzKHsndHJhbnNpdGlvbi1kdXJhdGlvbic6dGltZW91dCsnbXMnfSk7XG4gICAgJCgnLnNsaWRlcl9faW1hZ2VzLWxpc3QnKS5jc3MoeyAndHJhbnNpdGlvbi1kdXJhdGlvbic6dGltZW91dC8yKydtcyd9KTtcbiAgICB2YXIgYnV0dG9ucyA9ICQoJy5zbGlkZXJfX2J1dHRvbnMtYm90dG9tLCAuc2xpZGVyX19idXR0b25zLXRvcCcpO1xuICAgIGJ1dHRvbnMub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZ0KXtcbiAgICAgIC8v0YPQtNCw0LvQuNC8INC+0LHRgNCw0LHQvtGC0YfQuNC6XG4gICAgICBidXR0b25zLm9mZigpO1xuICAgICAgc2xpZGVyKGV2dCk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIC8v0LLQtdGA0L3RkdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6XG4gICAgICAgIGJ1dHRvbnMub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZ0KXtzbGlkZXIoZXZ0KTt9KTtcbiAgICAgIH0sdGltZW91dCoyKTsgXG4gICAgfSk7XG4gICAgZnVuY3Rpb24gY2hhbmdlRGVzY3JpcHRpb24oaSl7XG4gICAgICB2YXJcbiAgICAgICAgZGVzYyA9ICQoJy5zbGlkZXJfX2ltYWdlLWRlc2NyaXB0aW9uJykuY2xvbmUoKSxcbiAgICAgICAgdGl0bGUgPSAkKGRlc2NbaV0pLmZpbmQoJ2gyJykuYWRkQ2xhc3MoJ2FuaW1hdGVUZXh0JyksXG4gICAgICAgIHRlY2hub2xvZ2llcyA9ICQoZGVzY1tpXSkuZmluZCgncCcpLmFkZENsYXNzKCdhbmltYXRlVGV4dCcpO1xuXG4gICAgICAkKCcud29yay1kZXNjcmlwdGlvbl9fdGl0bGUgaDInKS5yZXBsYWNlV2l0aCh0aXRsZSk7XG4gICAgICAkKCcud29yay1kZXNjcmlwdGlvbl9fdGVjaG5vbG9naWVzIHAnKS5yZXBsYWNlV2l0aCh0ZWNobm9sb2dpZXMpO1xuICAgICAgdGV4dEFuaW1hdGUoJCgnLmFuaW1hdGVUZXh0JykpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzbGlkZXIoZXZ0KXtcbiAgICAgIHZhciBpbWFnZUxpc3QsIGltYWdlcywgYXJyTGVuZ2h0LCBib3R0b24sIHByZXYsIHByZXZMZWZ0LCBwcmV2UmlnaHQsIHByZXYxTGVmdCxwcmV2MkxlZnQsIHByZXYxUmlnaHQsIHByZXYyUmlnaHQsIGN1cnJlbnRMZWZ0TGksIG5leHRMZWZ0TGksIGN1cnJlbnRSaWdodExpLCBuZXh0UmlnaHRMaTtcblxuICAgICAgaW1hZ2VMaXN0ICA9ICQoJy5zbGlkZXJfX2ltYWdlcy1saXN0Jyk7XG4gICAgICBpbWFnZXMgICAgID0gaW1hZ2VMaXN0LmZpbmQoJ2xpJyk7XG4gICAgICBhcnJMZW5naHQgID0gaW1hZ2VzLmxlbmd0aDtcbiAgICAgIGJvdHRvbiAgICAgPSAkKGV2dC5jdXJyZW50VGFyZ2V0KS5hdHRyKCdjbGFzcycpO1xuICAgICAgcHJldiAgICAgICA9ICQoJy5zbGlkZXJfX2J1dHRvbnMnKTtcbiAgICAgIHByZXZMZWZ0ICAgPSBwcmV2LmZpbmQoJy5zbGlkZXJfX2JvdHRvbS1wcmV2aWV3IGxpJyk7XG4gICAgICBwcmV2UmlnaHQgID0gcHJldi5maW5kKCcuc2xpZGVyX190b3AtcHJldmlldyBsaScpO1xuICAgICAgcHJldjFMZWZ0ICA9ICQocHJldkxlZnRbMV0pO1xuICAgICAgcHJldjJMZWZ0ICA9ICQocHJldkxlZnRbMF0pO1xuICAgICAgcHJldjFSaWdodCA9ICQocHJldlJpZ2h0WzFdKTtcbiAgICAgIHByZXYyUmlnaHQgPSAkKHByZXZSaWdodFswXSk7XG4gICAgICAgIFxuICAgICAgLy/Rg9C30L3QsNC10Lwg0YLQtdC60YPRidC40Lkg0Lgg0YHQu9C10LTRg9GO0YnQuNC5INC10LvQtdC80LXQvdGC0Ysg0L/RgNC10LLRjNGO0YUsINGC0LXQutGD0YnQuNC5INGC0L7RgiDRh9GC0L4g0LLQuNC00LjQvCwg0LAg0YHQu9C10LTRg9GO0YnQuNC50LXQu9C10LzQtdC90YIg0YLQvtGCINGH0YLQviDQv9C+0LrQsCDRh9GC0L4g0YHQutGA0YvRgiBcbiAgICAgIGlmICggcGFyc2VJbnQocHJldjFMZWZ0LmNzcygndG9wJykpID4gcGFyc2VJbnQocHJldjJMZWZ0LmNzcygndG9wJykpKSB7XG4gICAgICAgIGN1cnJlbnRMZWZ0TGkgPSBwcmV2MUxlZnQ7XG4gICAgICAgIG5leHRMZWZ0TGkgPSBwcmV2MkxlZnQ7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgY3VycmVudExlZnRMaSA9IHByZXYyTGVmdDtcbiAgICAgICAgbmV4dExlZnRMaSA9IHByZXYxTGVmdDtcbiAgICAgIH1cbiAgICAgIC8v0KHQu9C10LTRg9GO0YnQuNC5INC10LvQtdC80LXQvdGCINGBINC70LXQstCwINC30L3QsNGH0LXQvdC40LUg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cbiAgICAgIG5leHRMZWZ0TGkgPSBuZXdTcmMobmV4dExlZnRMaSwgaW1hZ2VzW2FyckxlbmdodC0yXSk7XG4gICAgICAvL9C10YHQu9C4INC90LDQttCw0Lsg0LrQvdC+0L/QutGDINC90LDQt9Cw0LQg0L7QvdCwINC20LUg0LIg0L3QuNC3XG4gICAgICBmdW5jdGlvbiBiYWNrKCl7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAvL9C/0LXRgNC10LrQuNC90LXQvCDQuNC30L7QsdGA0LDQttC10L3QuNC1INGBINC60L7QvdCwINCyINC90LDRh9Cw0LvQvlxuICAgICAgICAgIGltYWdlTGlzdC5wcmVwZW5kKGltYWdlc1thcnJMZW5naHQtMV0pO1xuICAgICAgICAgIGltYWdlTGlzdC50b2dnbGVDbGFzcygnb3BhY2l0eScpO1xuICAgICAgICB9LCB0aW1lb3V0LzIpO1xuICAgICAgICBjaGFuZ2VQcmV2aWV3KGN1cnJlbnRMZWZ0TGksIG5leHRMZWZ0TGksICdib3R0b20nLCBpbWFnZXNbYXJyTGVuZ2h0LTNdKTtcbiAgICAgIH1cbiAgICAgIC8v0YPQt9C90LDQtdC8INGC0LXQutGD0YnQuNC5INC4INGB0LvQtdC00YPRjtGJ0LjQuSDQtdC70LXQvNC10L3RgtGLINC/0YDQtdCy0YzRjtGFLCDRgtC10LrRg9GJ0LjQuSDRgtC+0YIg0LrQvtGC0L7RgNGL0Lkg0L3QsCDQstC40LTRgywg0LAg0YHQu9C10LTRg9GO0YnQuNC50LXQu9C10LzQtdC90YIg0YLQvtGCINGH0YLQviDQv9C+0LrQsCDRh9GC0L4g0YHQutGA0YvRglxuICAgICAgaWYgKHBhcnNlSW50KHByZXYxUmlnaHQuY3NzKCd0b3AnKSkgPCBwYXJzZUludChwcmV2MlJpZ2h0LmNzcygndG9wJykpKSB7XG4gICAgICAgIGN1cnJlbnRSaWdodExpID0gcHJldjFSaWdodDtcbiAgICAgICAgbmV4dFJpZ2h0TGkgPSBwcmV2MlJpZ2h0O1xuICAgICAgfWVsc2V7XG4gICAgICAgIGN1cnJlbnRSaWdodExpID0gcHJldjJSaWdodDtcbiAgICAgICAgbmV4dFJpZ2h0TGkgPSBwcmV2MVJpZ2h0O1xuICAgICAgfVxuICAgICAgLy/QodC70LXQtNGD0Y7RidC40Lkg0LXQu9C10LzQtdC90YIg0YEg0L/RgNCw0LLQsCDQt9C90LDRh9C10L3QuNC1INC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXG4gICAgICBuZXh0UmlnaHRMaSA9IG5ld1NyYyhuZXh0UmlnaHRMaSwgaW1hZ2VzWzJdKTtcbiAgICAgIC8v0LXRgdC70Lgg0L3QsNC20LDQuyDQstC/0LXRkdC0INC+0L3QsCDQttC1INCy0LLQtdGA0YVcbiAgICAgIGZ1bmN0aW9uIGZvcndhcmQoKXtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgIC8v0L/QtdGA0LXQutC40L3QtdC8INC40LfQvtCx0YDQsNC20LXQvdC40LUg0YEg0L3QsNGH0LDQu9CwINCyINC60L7QvdC10YZcbiAgICAgICAgICBpbWFnZUxpc3QuYXBwZW5kKGltYWdlc1swXSk7XG4gICAgICAgICAgaW1hZ2VMaXN0LnRvZ2dsZUNsYXNzKCdvcGFjaXR5Jyk7XG4gICAgICAgIH0sIHRpbWVvdXQvMik7XG4gICAgICAgIGNoYW5nZVByZXZpZXcoY3VycmVudFJpZ2h0TGksIG5leHRSaWdodExpLCAndG9wJywgaW1hZ2VzWzNdKTtcbiAgICAgIH0gICBcbiAgLy/QvNC10L3Rj9C10Lwg0LPQu9Cw0LLQvdC+0LUg0LjQt9C+0LHRgNCw0LbQtdC90LjQtVxuICAgICAgZnVuY3Rpb24gY2hhbmdlTWFpbkltYWdlKCl7XG4gICAgICAgIGltYWdlTGlzdC50b2dnbGVDbGFzcygnb3BhY2l0eScpO1xuICAgICAgICBpZiAoYm90dG9uID09ICdzbGlkZXJfX2J1dHRvbnMtYm90dG9tJykge1xuICAgICAgICAgIGJhY2soKTtcbiAgICAgICAgICBjaGFuZ2VEZXNjcmlwdGlvbihhcnJMZW5naHQtMSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGZvcndhcmQoKTtcbiAgICAgICAgICBjaGFuZ2VEZXNjcmlwdGlvbigxKTtcbiAgICAgICAgfSBcbiAgICAgIH0gIFxuICAvL9C80LXQvdGP0Lwg0L/RgNC10LLRjtGF0YMg0L/QsNGA0LDQvNC10YLRgNGLOiDRgtC10LrRg9GJ0LDRjyDQu9C4LCDRgdC70LXQtNGD0Y7RidCw0Y8g0YLQsCDQvdCwINC60L7RgtC+0YDRg9GOINGB0LXRh9Cw0YEg0LfQsNC80LXQvdC10YLRgdGPINGC0LXQutGD0YnQsNGPLCDQvdCw0L/RgNCw0LLQu9C10L3QuNC1INC00LLQuNC20LXQvdC40Y8g0LDQvdC40LzQsNGG0YvQuCxcbiAgLy/QvdC+0LLQsNGPINC70Lgg0YLQvtC10YHRgtGMINGBINC90L7QstGL0Lwg0LjQt9C+0LHRgNCw0LbQtdC90LjQtdC8INC4INCy0L7Qt9C80L7QttC90L4g0L7Qv9C40YHQsNC90LjQtdC8INC+0L3QsCDQt9Cw0LzQtdC90LXRgiDRgtGDINC70Lgg0LrQvtGC0L7RgNGD0Y4g0LzRiyDRgdC00LLQuNC90LjQvCDQuNC3INC30L7QvdGLINCy0LjQtNC40LzQvtGB0YLQuFxuICAgICAgZnVuY3Rpb24gY2hhbmdlUHJldmlldyhjdXJyZW50TGksIG5leHRMaSwgZGlyZWN0aW9uLCBuZXdMaSl7ICBcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSAnYm90dG9tJykge1xuICAgICAgICAgIG1vdmUoJ2JvdCcpO1xuICAgICAgICAgIHByZXdCYWNrKCdsZWZ0Jyk7XG4gICAgICAgICAgIC8vINC60LvQuNC60L3Rg9C70Lgg0L/QviDQu9C10LLQvtC5INC60L3QvtC/0LrQtSDQt9C90LDRh9C40YIg0LzQtdC90Y/QtdC8INC30L3QsNGH0LXQvdC40Y8g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0LTQu9GPINGB0LvQtdC00YPRjtGJ0LjQs9C+INC10LvQtdC80LXQvdGC0LAg0L/RgNCw0LLQvtC5INC60L3QvtC/0LrQtVxuICAgICAgICAgIG5leHRSaWdodExpID0gbmV3U3JjKG5leHRSaWdodExpLCBpbWFnZXNbMF0pO1xuICAgICAgICAgIG1vdmUoJ3RvcCcsIGN1cnJlbnRSaWdodExpLCBuZXh0UmlnaHRMaSk7XG4gICAgICAgICAgcHJld0JhY2soJ3JpZ2h0JywgY3VycmVudFJpZ2h0TGkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT0gJ3RvcCcpIHtcbiAgICAgICAgICBtb3ZlKCd0b3AnKTtcbiAgICAgICAgICBwcmV3QmFjaygncmlnaHQnKTtcbiAgICAgICAgICAvLyDQutC70LjQutC90YPQu9C4INC/0L4g0L/RgNCw0LLQvtC5INC60L3QvtC/0LrQtSDQt9C90LDRh9C40YIg0LzQtdC90Y/QtdC8INC30L3QsNGH0LXQvdC40Y8g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0LTQu9GPINGB0LvQtdC00YPRjtGJ0LjQs9C+INC10LvQtdC80LXQvdGC0LAg0L3QsCDQu9C10LLQvtC5INC60L3QvtC/0LrQtVxuICAgICAgICAgIG5leHRMZWZ0TGkgPSBuZXdTcmMobmV4dExlZnRMaSwgaW1hZ2VzWzBdKTtcbiAgICAgICAgICBtb3ZlKCdib3QnLCBjdXJyZW50TGVmdExpLCBuZXh0TGVmdExpKTtcbiAgICAgICAgICBwcmV3QmFjaygnbGVmdCcsIGN1cnJlbnRMZWZ0TGkpO1xuICAgICAgICB9XG4gICAgICAgIC8v0LLQvtC30LLRgNCy0YnQsNC10YIg0YHQutGA0YvRgtC+0LUg0L/RgNC10LLRjiDQvdCwINGB0YLQsNGA0YLQvtCy0L7RjiDQv9C+0LfQuNGG0YvRjiwg0L/QsNGA0LDQvNC10YLRgNGLINC60LDQutC+0LUg0L/RgNC10LLRjNGOINC70LXQstC+0LUg0LjQu9C4INC/0YDQsNCy0L7QtSwg0Lgg0L3QtSDQvtCx0LXQt9Cw0YLQtdC70YzQvdGL0Lkg0YLQtdC60YPRidC40LnRjdC70LXQvNC90YJcbiAgICAgICAgZnVuY3Rpb24gcHJld0JhY2socHJldiwgY3VycmVudEVsZW1lbnQpe1xuICAgICAgICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRMaTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmIChwcmV2ID09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IG5ld1NyYyhjdXJyZW50RWxlbWVudCwgbmV3TGkpO1xuICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudC5jc3Moeyd0cmFuc2l0aW9uLWR1cmF0aW9uJzonMG1zJywgJ3RvcCc6JzAnfSk7XG4gICAgICAgICAgICB9ZWxzZSBpZiAocHJldiA9PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gbmV3U3JjKGN1cnJlbnRFbGVtZW50LCBuZXdMaSk7XG4gICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LmNzcyh7J3RyYW5zaXRpb24tZHVyYXRpb24nOicwbXMnLCAndG9wJzonMTAwJSd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBtb3ZlKGRpcmVjdGlvbiwgY3VycmVudEVsZW1lbnQsIG5leHRFbGVtZW50KXtcbiAgICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQgPT09IHVuZGVmaW5lZCB8fCBuZXh0RWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRMaTtcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gbmV4dExpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBuZXh0RWxlbWVudC5jc3Moeyd0cmFuc2l0aW9uLWR1cmF0aW9uJzp0aW1lb3V0Kydtcyd9KTtcbiAgICAgICAgICBpZiAoZGlyZWN0aW9uID09ICdib3QnKSB7XG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudC5jc3Moeyd0b3AnOicyMDAlJ30pO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQuY3NzKHsndG9wJzonMTAwJSd9KTtcbiAgICAgICAgICB9ZWxzZSBpZihkaXJlY3Rpb24gPT0gJ3RvcCcpe1xuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQuY3NzKHsndG9wJzogJy0xMDAlJ30pO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQuY3NzKHsndG9wJzonMCd9KTsgIFxuICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICAgIH1cbiAgLy/RhNGD0L3QutGG0LjRjyDQvNC10L3Rj9C10YIg0LrQsNGC0YDQuNC90LrRgyDQuCBoMSDQsiBsaSDRjdC70LXQvNC10L3RgtGC0LVcbiAgICAgIGZ1bmN0aW9uIG5ld1NyYyhvbGRMaSwgbmV3TGkpe1xuICAgICAgICB2YXJcbiAgICAgICAgICB0bXBTcmMgPSAkKG5ld0xpKS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnKSxcbiAgICAgICAgICB0bXBIMSA9ICQobmV3TGkpLmZpbmQoJ2gxJykuaHRtbCgpO1xuICAgICAgICAvL9C30LDQvNC10L3QuNC8INCw0LTRgNC10YEg0Log0LrQsNGA0YLQuNC90LrQtVxuICAgICAgICBvbGRMaS5maW5kKCdpbWcnKS5hdHRyKHsnc3JjJzp0bXBTcmN9KTtcbiAgICAgICAgLy/Qt9Cw0LzQtdC90LjQvCDQutC+0L3RgtC10L3RgiDQsiBoMVxuICAgICAgICBvbGRMaS5maW5kKCdoMScpLmh0bWwodG1wSDEpO1xuICAgICAgICByZXR1cm4gb2xkTGk7XG4gICAgICB9XG4gICAgICBjaGFuZ2VNYWluSW1hZ2UoKTtcbiAgICB9XG4gIH0pKCk7XG4gIFxuICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vZW5kIHNsaWRlci8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9wc3JhbGxheC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIChmdW5jdGlvbiAoKSB7XG4gICAgdmFyXG4gICAgICBsYXllciA9ICQoJy5wYXJhbGxheCcpLmZpbmQoJy5wYXJhbGxheF9fbGF5ZXInKSxcbiAgICAgIGxheWVyU2Nyb2xsID0gJCgnLnBhcmFsbGF4X3Njcm9sbCcpLmZpbmQoJy5wYXJhbGxheF9fbGF5ZXInKTtcbiAgICAkKHdpbmRvdykub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7IFxuICAgICAgdmFyXG4gICAgICAgIG1vdXNlX2R4ID0gKGUucGFnZVgpLCAvLyDQo9C30L3QsNC10Lwg0L/QvtC70L7QttC10L3QuNC1INC80YvRiNC60Lgg0L/QviBYXG4gICAgICAgIG1vdXNlX2R5ID0gKGUucGFnZVkpLCAvLyDQo9C30L3QsNC10Lwg0L/QvtC70L7QttC10L3QuNC1INC80YvRiNC60Lgg0L/QviBZXG4gICAgICAgIHcgPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIG1vdXNlX2R4LCAvLyDQktGL0YfQuNGB0LvRj9C10Lwg0LTQu9GPIHgg0L/QtdGA0LXQvNC10YnQtdC90LjRj1xuICAgICAgICBoID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gbW91c2VfZHk7IC8vINCS0YvRh9C40YHQu9GP0LXQvCDQtNC70Y8geSDQv9C10YDQtdC80LXRidC10L3QuNGPXG5cbiAgICAgIGxheWVyLm1hcChmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXJcbiAgICAgICAgICB3aWR0aFBvc2l0aW9uID0gdyAqIChrZXkgLyAxMDApLCAvLyDQktGL0YfQuNGB0LvRj9C10Lwg0LrQvtC+0YTQuNGG0LXQvdGCINGB0LzQtdGI0LXQvdC40Y8g0L/QviBYXG4gICAgICAgICAgaGVpZ2h0UG9zaXRpb24gPSBoICogKGtleSAvIDEwMCk7IC8vINCS0YvRh9C40YHQu9GP0LXQvCDQutC+0L7RhNC40YbQtdC90YIg0YHQvNC10YjQtdC90LjRjyDQv9C+IFlcblxuICAgICAgICAkKHZhbHVlKS5jc3Moe1xuICAgICAgICAgICd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoJyArIHdpZHRoUG9zaXRpb24gKyAncHgsICcgKyBoZWlnaHRQb3NpdGlvbiArICdweCwgMCknXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmFyIHdpbmRvd0hlaWd0aCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgd2luU2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgaWYgKHdpbmRvd0hlaWd0aCA+IHdpblNjcm9sbFRvcCkge1xuICAgICAgICBsYXllclNjcm9sbC5tYXAoZnVuY3Rpb24gKGtleSwgdmFsdWUpe1xuICAgICAgICAgIHZhciBiaWFzID0gd2luU2Nyb2xsVG9wICogKGtleS8yMCk7XG4gICAgICAgICAgJCh2YWx1ZSkuY3NzKHtcbiAgICAgICAgICAgICd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoMCwgJyArIC1iaWFzICsncHgsIDApJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZXtyZXR1cm47fVxuICAgIH0pO1xuICB9KSgpOyAgXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL3BzcmFsbGF4Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vL3ByZWxvYWRlci8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICQoZnVuY3Rpb24gKCkge1xuICAgICQoJy5hYm91dC13cmFwcGVyLCAuYmxvZy13cmFwcGVyLCAuaW5kZXgtd3JhcHBlciwgLndvcmtzLXdyYXBwZXIsIC5hZG1pbi13cmFwcGVyJykuY3NzKHsnZGlzcGxheSc6J25vbmUnfSk7XG4gICAgdmFyIGltZ3MgPSBbXTtcbiAgICAkLmVhY2goJCgnKicpLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICBiYWNrZ3JvdW5kID0gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyksXG4gICAgICAgIGltZyA9ICR0aGlzLmlzKCdpbWcnKTtcbiAgICAgIGlmIChiYWNrZ3JvdW5kICE9ICdub25lJykge1xuICAgICAgICB2YXIgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcblxuICAgICAgICBpbWdzLnB1c2gocGF0aCk7XG4gICAgICB9XG4gICAgICBpZiAoaW1nKSB7XG4gICAgICAgIHBhdGggPSAkdGhpcy5hdHRyKCdzcmMnKTtcbiAgICAgICAgaW1ncy5wdXNoKHBhdGgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHZhciBwZXJjZW50cyA9IDE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaW1hZ2UgPSAkKCc8aW1nPicsIHtcbiAgICAgICAgYXR0cjoge1xuICAgICAgICAgIHNyYyA6IGltZ3NbaV1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpbWFnZS5sb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0UGVyY2VudHMoaW1ncy5sZW5ndGgsIHBlcmNlbnRzKTtcbiAgICAgICAgcGVyY2VudHMrKztcbiAgICAgIH0pO1xuICAgICAgaW1hZ2UuZXJyb3IoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRQZXJjZW50cyhpbWdzLmxlbmd0aCwgcGVyY2VudHMpO1xuICAgICAgICBwZXJjZW50cysrO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8v0JXQodCb0Jgg0JrQkNCg0KLQmNCd0J7QmiDQndCV0KIgXG4gICAgaWYoaW1ncy5sZW5ndGggPT09IDApe1xuICAgICAgc2V0UGVyY2VudHMoMSwxKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0UGVyY2VudHModG90YWwsIGN1cnJlbnQpIHtcbiAgICAgIHZhciBwZXJjZW50ID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XG4gICAgICBpZiAocGVyY2VudCA+PSAxMDApIHtcbiAgICAgICAgJCgnLmFib3V0LXdyYXBwZXIsIC5ibG9nLXdyYXBwZXIsIC5pbmRleC13cmFwcGVyLCAud29ya3Mtd3JhcHBlciwgLmFkbWluLXdyYXBwZXInKS5jc3MoeydkaXNwbGF5JzonYmxvY2snfSk7XG4gICAgICAgICQoJy5wbGF0ZS1mcm9udCcpLmFkZENsYXNzKCdhbmltYXRlX3BsYXRlJyk7XG4gICAgICAgICQoJy5sb2FkZXItd3JhcHBlcicpLmZhZGVPdXQoMTUwMCwgZnVuY3Rpb24oKXtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcucGxhdGUtZnJvbnQnKS5yZW1vdmVDbGFzcygnYW5pbWF0ZV9wbGF0ZScpO1xuICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgICQoJy5sb2FkZXJfX3BlcmNlbnQnKS50ZXh0KHBlcmNlbnQgKyAnJScpO1xuICAgIH1cbiAgfSk7XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vcHJlbG9hZGVyLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9za2lsbHMvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAoZnVuY3Rpb24oKXtcbiAgICB2YXJcbiAgICAgIHRhcmdldCA9ICQoJy5teS1za2lsbHMtYm94LWNlZW50ZXInKSxcbiAgICAgIHdpbmRvd0hlaWd0aCA9ICQod2luZG93KS5oZWlnaHQoKTtcblxuICAgIGlmKHRhcmdldC5sZW5ndGggPiAwKSB7XG4gICAgICB2YXJcbiAgICAgICAgc2tpbGxzID0gJCgnLm15LXNraWxsc19faXRlbScpLFxuICAgICAgICBkYXRhO1xuXG4gICAgICB0YXJnZXQgPSB0YXJnZXQub2Zmc2V0KCkudG9wO1xuICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd2luU2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICBpZiAod2luU2Nyb2xsVG9wK3dpbmRvd0hlaWd0aC8xMCo3ID4gdGFyZ2V0KSB7XG4gICAgICAgICAgc2tpbGxzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICBkYXRhID0gJHRoaXMuYXR0cignZGF0YS1za2lsbCcpO1xuICAgICAgICAgICAgaWYgKGRhdGEgPT0gMCkge2RhdGEgPSAxO31cbiAgICAgICAgICAgIGRhdGEgPSAgcGFyc2VJbnQoIDcyMiooZGF0YS8xMDApICk7XG4gICAgICAgICAgICAkdGhpcy5maW5kKCcuc2VjdG9yJykuY3NzKHsnc3Ryb2tlLWRhc2hhcnJheSc6ZGF0YSsnIDcyMid9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICB9KSgpO1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL3NraWxscy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL2FkbWluLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gIChmdW5jdGlvbigpe1xuICAgIHZhciBcbiAgICAgIGFkbWluRm9ybXMgPSAkKCcuYWRtaW4tZm9ybScpLFxuICAgICAgbWVuTGlzdCA9ICQoJy5hZG1pbi1uYXZfX2l0ZW0nKTtcblxuICAgIG1lbkxpc3QuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKHRoYXQpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9ZWxzZXtcbiAgICAgICAgJCh0aGF0KS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJCh0aGF0KS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHNob3dGb3JtKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICBcbiAgICBmdW5jdGlvbiBzaG93Rm9ybSgpe1xuICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgIC8v0YTRg9C90LrRhtGL0Y8g0L/QvtC60LDQttC10YIg0L3Rg9C20L3Rg9GOINGE0L7RgNC80YMg0Lgg0YHQutGA0L7QtdGCINC90LUg0L3Rg9C20L3Rg9GOINGA0LXRiNC10L3QuNGPINC/0YDQuNC90LjQvNCw0LXRgtGM0YHRjyDQvdCwINC+0YHQvdC+0LLQtSDQsNC60YLQuNCy0L3QvtCz0L4g0LXQu9C10LzQtdC90YLQsCDQvNC10L3RjlxuICAgICAgbWVuTGlzdC5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgaWYgKCAkKHRoYXQpLmhhc0NsYXNzKCdhY3RpdmUnKSApIHtcbiAgICAgICAgICAkKGFkbWluRm9ybXNbY291bnRdKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgJChhZG1pbkZvcm1zW2NvdW50XSkuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgfVxuICAgICAgICBjb3VudCsrOyAgXG4gICAgICB9KTtcbiAgICB9XG4gICAgYWRtaW5Gb3Jtcy5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIHNob3dGb3JtKCk7XG4gICAgXG4gIH0pKCk7XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9hZG1pbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v0YTQvtGA0LzQsCDQstGF0L7QtNCwLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIChmdW5jdGlvbigpe1xuICAgIHZhciBsb2dpbkRhdGEgPSB7fTtcbiAgICAkKCcjbG9naW4tbmF2X19lbnRlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXJcbiAgICAgICAgbG9naW5Gb3JtID0gJCgnI2xvZ2luLWZvcm0nKSxcbiAgICAgICAgZXJyb3JzID0gW107XG5cbiAgICAgIGxvZ2luRGF0YS5sb2dpbiA9IGxvZ2luRm9ybS5maW5kKCcjbG9naW4nKS52YWwoKS50cmltKCksXG4gICAgICBsb2dpbkRhdGEucGFzcyA9IGxvZ2luRm9ybS5maW5kKCcjcGFzc3dvcmQnKS52YWwoKS50cmltKCksXG4gICAgICBsb2dpbkRhdGEuaHVtYW4gPSBsb2dpbkZvcm0uZmluZCgnI2xvZ2luZm9ybV9jaGVjaycpLnByb3AoJ2NoZWNrZWQnKSxcbiAgICAgIGxvZ2luRGF0YS5leGFjdGx5SHVtYW4gPSBsb2dpbkZvcm0uZmluZCgnI3JhZGlvX3llcycpLnByb3AoJ2NoZWNrZWQnKTtcbiAgICAgICAgXG4gICAgICBmb3IodmFyIHByb3BlcnR5IGluIGxvZ2luRGF0YSl7XG4gICAgICAgIHZhciBwcm9wTGFsdWUgPSBsb2dpbkRhdGFbcHJvcGVydHldO1xuICAgICAgICBpZiAoIHByb3BMYWx1ZSA9PT0gZmFsc2UgfHwgcHJvcExhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgLy/Qt9C90LDRh9C10YIg0Y3RgtC+INGH0LXQutCx0L7QutGB0YtcbiAgICAgICAgICBpZiAocHJvcExhbHVlID09IGZhbHNlKSB7XG4gICAgICAgICAgICBlcnJvcnNbMV0gPSAn0J/QvtC20L7QttC1INGH0YLQviDQstGLINGA0L7QsdC+0YIuJztcbiAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIC8v0LfQvdCw0YfQtdGCINGN0YLQviDRgdGC0YDQvtC60LhcbiAgICAgICAgICB2YXIgc3RyTGVuZ3RoID0gcHJvcExhbHVlLmxlbmd0aDtcbiAgICAgICAgICBpZiAoc3RyTGVuZ3RoIDwgNCB8fCBzdHJMZW5ndGggPiAxNCkge1xuICAgICAgICAgICAgZXJyb3JzWzBdID0gJ9CU0LvQuNC90L3QsCDQu9C+0LPQuNC90LAg0Lgg0L/QsNGA0L7Qu9GPINC00L7Qu9C20L3QsCDQsdGL0YLRjCDQvtGCIDQg0LTQviAxNCDRgdC40LzQstC+0LvQvtCyLic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSAn0J/RgNC4INC30LDQv9C+0LvQvdC10L3QuNC4INGE0L7RgNC80Ysg0L7QsdC90LDRgNGD0LbQtdC90Ysg0YHQu9C10LTRg9GO0YnQuNC1INC+0YjQuNCx0LrQuC5cXG4nO1xuICAgICAgICBlcnJvcnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICBtZXNzYWdlICs9IChpdGVtKSA/IGl0ZW0rJ1xcbic6JyAnO1xuICAgICAgICAgIC8vY29uc29sZS5sb2coaXRlbSk7XG4gICAgICAgIH0pO1xuICAgICAgICBhbGVydChtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy/QtNCw0LvQtSDRgNCw0LHQvtGC0LAg0LfQsCDRgdC10YDQstC10YDQvtC8XG4gICAgfSk7XG4gIH0pKCk7XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9GE0L7RgNC80LAg0LLRhdC+0LTQsC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v0JDQtNC80LjQvS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIChmdW5jdGlvbigpe1xuICAgIHZhclxuICAgICAgZm9ybUFib3V0TWUgPSAkKCcjYWRtaW4tYWJvdXQtbWUnKSxcbiAgICAgIGZvcm1CbG9nID0gJCgnI2FkbWluLWJsb2cnKSxcbiAgICAgIGZvcm1Xb3JrcyA9ICQoJyNhZG1pbi13b3JrcycpOyAgXG4gICAgLy/Qv9GA0L7QstC10YDRj9C10Lwg0LLQstC+0LTQuNGC0YHRjyDQu9C4INCyIGlucHV0INGH0LjRgdC70L4g0LXRgdC70Lgg0L3QtdGCINGH0LjRgdGC0LjQvCDQtdCz0L5cbiAgICBmb3JtQWJvdXRNZS5maW5kKCdpbnB1dCcpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdmFsdWUgPSBwYXJzZUludCggJCh0aGlzKS52YWwoKSApO1xuICAgICAgaWYgKCBpc05hTih2YWx1ZSkgKSB7JCh0aGlzKS52YWwoJycpO31cbiAgICB9KTtcbiAgICAvL9Cx0LXRgNGR0YIg0LTQsNC90L3Ri9C1INGBINGE0L7RgNC80Ysg0L/QvtC70YPRh9C10L3QvtC5INCyINC60LDRh9C10YHRgtCy0LUg0L/QsNGA0LDQvNC10YLRgNCwINC4INGB0YTQvtGA0LzQuNGA0YPQtdC8INC00LLRg9GFINGD0YDQvtCy0LXQstGL0Lkg0LzQsNGB0YHQuNCyINC00LTQvdC90YvRhSDQtNC70Y8g0L7RgtC/0YDQsNCy0LrQuCDQvdCwINGB0LXRgNCy0LXRgFxuICAgIGZ1bmN0aW9uIGdldERhdGEoZm9ybSl7XG4gICAgICB2YXJcbiAgICAgICAgZm9ybUlkID0gZm9ybS5hdHRyKCdpZCcpLFxuICAgICAgICBpbnB1dHMgPSBmb3JtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYScpLFxuICAgICAgICBkYXRhID0gW1snZm9ybUlkJywgZm9ybUlkXV07XG4gICAgICBpbnB1dHMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdGhhdCA9ICQodGhpcyksIGN1cmVudERhdGEgPSBbdGhhdC5hdHRyKCdpZCcpLCB0aGF0LnZhbCgpXTtcbiAgICAgICAgZGF0YVtkYXRhLmxlbmd0aF0gPSBjdXJlbnREYXRhO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgXG5cbiAgICBmb3JtQWJvdXRNZS5maW5kKCcjYWRtaW4tYWJvdXQtbWVfX3NhdmUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIGRhdGEgPSBnZXREYXRhKGZvcm1BYm91dE1lKTtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH0pO1xuICAgIGZvcm1CbG9nLmZpbmQoJyNhZG1pbi1ibG9nX19zYXZlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBkYXRhID0gZ2V0RGF0YShmb3JtQmxvZyk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICB9KTtcbiAgICBmb3JtV29ya3MuZmluZCgnI2FkbWluLXdvcmtzX19zYXZlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBkYXRhID0gZ2V0RGF0YShmb3JtV29ya3MpO1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICB9KTtcbiAgfSkoKTtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL9CQ0LTQvNC40L0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
