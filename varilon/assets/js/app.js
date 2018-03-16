
  //everad start
  //для клонирования блока в попап используются следующие айдишники
  // #cloneThis - для десктопа
  // #cloneMobileThis - для мобильного (если нужно)
  //брейкпоинт для переключения попапа при необходимости дефолт значение = 1000

  // в случае, если мы не клонируем форму, а верстаем попап произвольно,
  // то делать это необходимо в контейнере с классом .ever-popup-build
  // false (показывать контейнер) / true (не показывать контейнер)

  var popupBuild = true; // false/true


  //.ever-popup-btn - класс для для открытия попапа

  //проверка кода
  //.check__field - класс для поля проверки кода
  //.check__btn - класс для кнопки провеки кода
  //.check__result - класс для контейнера с результатом проверки кода

  //таймер
  //для вывода счетчика таймера используется 3 контенера (часы, минуты, секунды)
  //.hours класс для вывода часов
  //.minutes класс для вывода минут
  //.seconds класс для вывода секунд

  (function () {

      function initiate() {

          var breakpoint = 1000,
              desktop = document.querySelector('#cloneThis'),
              mobile = document.querySelector('#cloneMobileThis');

          if (popupBuild) {
              // в случае, если мы верстаем попап в контейнере .ever-popup-build, даное условие прячет его, если значение переменной popupBuild = true
              var style = document.createElement('style');
              style.innerHTML = '.ever-popup-build{position: fixed; opacity: 0;z-index: -1; top: 0; left: 0;}';
              document.querySelector('head').appendChild(style)
          }

          function addPopupStyle() {
              // добавляем стили для нашего поапа
              var cont = document.createElement('style'),
                  head = document.querySelector('head');
              cont.innerHTML = '.ever-popup__body.ever-mobile{display:none}.ever-popup{position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,.7);z-index: 111;display: none;overflow: auto;}.ever-popup__body{position: static;float: none;display: block;margin: 0 auto;width:auto}.ever-popup.show{display: block;align-items: center;}.ever-popup__inner{position: relative;margin: 0 auto;padding-top:35px}.ever-popup__close{width: 35px;height: 30px;position: absolute;cursor:pointer;top: 0;right: 0;z-index: 1;-webkit-transition: .3s; -moz-transition: .3s; -ms-transition: .3s; -o-transition: .3s; transition: .3s;}.ever-popup__close:after, .ever-popup__close:before {content: "";position: absolute;right: 0;top: 10px;width: 35px;height: 10px;background: #fff;transition: all 1s;}.ever-popup__close:after {-webkit-transform: rotate(-45deg);-ms-transform: rotate(-45deg);-o-transform: rotate(-45deg);transform: rotate(-45deg);}.ever-popup__close:before {-webkit-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);}' +
                  '@media screen and (max-width: ' + breakpoint + 'px' + '){' +
                  '.ever-popup__body.ever-desktop{display:none}' +
                  '.ever-popup__body.ever-mobile{display:block}' +
                  '}';
              head.appendChild(cont)
          }

          function addMobilePopupStyle() {
              // добавляем стили для нашего поапа
              var cont = document.createElement('style'),
                  head = document.querySelector('head');
              cont.innerHTML = '@media screen and (max-width: ' + breakpoint + 'px' + ') {.ever-popup {position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0, 0, 0, .7);z-index: 111;display: none;overflow: auto;}.ever-popup__body {position: static;float: none;display: block;margin: 0 auto;width: auto}.ever-popup.show {display: block;align-items: center;}.ever-popup__inner {position: relative;margin: 0 auto;padding-top: 35px}.ever-popup__close {width: 35px;height: 30px;position: absolute;cursor: pointer;top: 0;right: 0;z-index: 1;-webkit-transition: .3s;-moz-transition: .3s;-ms-transition: .3s;-o-transition: .3s;transition: .3s;}.ever-popup__close:after, .ever-popup__close:before {content: "";position: absolute;right: 0;top: 10px;width: 35px;height: 10px;background: #fff;transition: all 1s;}.ever-popup__close:after {-webkit-transform: rotate(-45deg);-ms-transform: rotate(-45deg);-o-transform: rotate(-45deg);transform: rotate(-45deg);}.ever-popup__close:before {-webkit-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);}}';
              head.appendChild(cont)
          }

          function createOverlay() {
              // создаем затемненный фон для попапа и вставляем его в разметку html
              var parent = document.createElement('div'),
                  parentInner = document.createElement('div'),
                  closeParent = document.createElement('div');

              parent.classList.add('ever-popup');
              parentInner.classList.add('ever-popup__inner');
              closeParent.classList.add('ever-popup__close');

              parent.appendChild(parentInner);
              parentInner.appendChild(closeParent);
              document.body.appendChild(parent);
          }

          function createModalBody(breakpoint) {
              // функция определяет содержимое для попапа, клонирует его содержимое, и поещает в контейнер ever-popup__body
              var parent = document.querySelector('.ever-popup__inner');

              if (desktop) {
                  var desktopClone = desktop.cloneNode(true);
                  desktopClone.classList.add('ever-popup__body');
                  desktopClone.removeAttribute('id');
                  parent.appendChild(desktopClone);
                  document.querySelector('.ever-popup .ever-popup__inner').style.width = document.querySelector('#cloneThis').offsetWidth + 'px';
              }

              if (mobile) {
                  var mobileClone = mobile.cloneNode(true);
                  if (desktopClone) {
                      desktopClone.classList.add('ever-desktop');
                  }
                  mobileClone.classList.add('ever-popup__body');
                  mobileClone.classList.add('ever-mobile');
                  mobileClone.removeAttribute('id');
                  parent.appendChild(mobileClone);
                  var mobileStyles = '.ever-desktop{display: block}.ever-mobile{display: none}@media screen and (max-width: ' + breakpoint + 'px){.ever-mobile{display: block}.ever-desktop{display: none;}}';

                  var mobileStylesContainer = document.createElement('style');
                  mobileStylesContainer.innerHTML = mobileStyles;
                  document.querySelector('head').appendChild(mobileStylesContainer)
                  document.querySelector('.ever-popup .ever-popup__inner').style.width = document.querySelector('#cloneMobileThis').offsetWidth + 'px';
                  console.log(mobile.offsetWidth)
              }


          }

          function modalPosition(screenHeight) {
              //расчет ширины и вывод ее в html, функция вызывается при загрузке страницы, а так же при ресайзе
              var container = document.querySelector('.ever-popup  .ever-popup__inner');
              if (container) {

                  var desktop = document.querySelector('#cloneThis'),
                      mobile = document.querySelector('#cloneMobileThis');

                  if (desktop) {

                      checkPosition(desktop, container, screenHeight);
                      if (window.innerWidth > breakpoint) {
                          container.style.width = desktop.offsetWidth + 'px';
                      }
                  }

                  if (mobile && window.innerWidth < breakpoint) {

                      if (mobile) {
                          checkPosition(mobile, container, screenHeight);
                          container.style.width = mobile.offsetWidth + 'px';
                      }
                  }

              }

          }

          function checkPosition(selector, container, screenHeight) {
              //позиционирование попапа по вертикали
              var cont = selector,
                  contHeight = cont.offsetHeight;

              if (contHeight > screenHeight) {
                  container.style.margin = '40px auto';
              }
              else {
                  var top = (screenHeight - contHeight) / 2;
                  container.style.margin = top + 'px auto 20px';
              }
          }

          function showPopup() {
              //функция для показа попапа
              var popup = document.querySelector('.ever-popup');
              popup.classList.add('show')
          }

          function hidePopup() {
              //функция для скрытия попапа
              var popup = document.querySelector('.ever-popup');
              popup.classList.remove('show')
          }

          function notHide(e) {
              //функция для прерывания выполнения сценария по клику
              e.stopPropagation()
          }

          function checkCode(event) {
              // проверка кода подлинности
              event.preventDefault();

              var code = document.querySelector(".check__field").value,
                  msg = document.querySelector(".check__result");

              if (code.length === 15) {
                  msg.innerHTML = 'Данный код верен. Спасибо, что выбрали нашу продукцию!';
              }
              else if (code.length === 0) {
                  msg.innerHTML = 'Введите, пожалуйста, код.';
              } else {
                  msg.innerHTML = 'К сожалению, данный код не найден! Вероятнее всего, вы приобрели поддельный продукт.';
              }
          }

          var mouseOutCount = 0;
          document.body.addEventListener('mouseleave', function (event) {
              //событие на увод мышки со страницы. если мышка уходит за верхнюю границу документа, вызывается попап
              var e = event || window.event;
              e = e.clientY;
              var popup = document.querySelector('.ever-popup');

              if (popup && e < 10 && mouseOutCount === 0) {
                  popup.classList.add('show');
                  mouseOutCount++;
              }
          });

          function addPhoneBtn(breakpoint) {
              // добавление синей трубки для вызова попапа на десктопе
              var phoneBtnContainer = document.createElement('div');
              phoneBtnContainer.classList.add('phoneBtnContainer');
              phoneBtnContainer.innerHTML = '<div class="bluePhone"><div class=" phone-call cbh-phone cbh-green cbh-show ever-popup-btn cbh-static" id="clbh_phone_div"><div class="phoneJs"><div class="cbh-ph-circle"></div><div class="cbh-ph-circle-fill"></div><div class="cbh-ph-img-circle1"></div></div></div></div>';
              document.body.appendChild(phoneBtnContainer);

              var phoneStyles = document.createElement('style');
              phoneStyles.innerHTML = '.phoneBtnContainer{position:fixed; right: 10px;bottom: 10px; visibility:hidden;background-color:transparent;width:200px;height:200px;cursor:pointer;z-index:99;-webkit-backface-visibility:hidden;-webkit-transform:translateZ(0);-webkit-transition:visibility .5s;-moz-transition:visibility .5s;-o-transition:visibility .5s;transition:visibility .5s}.cbh-phone.cbh-show{visibility:visible}@-webkit-keyframes fadeInRight{0%{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}100%{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInRight{0%{opacity:0;-webkit-transform:translate3d(100%,0,0);-ms-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}100%{opacity:1;-webkit-transform:none;-ms-transform:none;transform:none}}@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}100%{opacity:1;-webkit-transform:none;transform:none}}@-webkit-keyframes fadeOutRight{0%{opacity:1}100%{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}@keyframes fadeOutRight{0%{opacity:1}100%{opacity:0;-webkit-transform:translate3d(100%,0,0);-ms-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}.fadeOutRight{-webkit-animation-name:fadeOutRight;animation-name:fadeOutRight}.cbh-phone.cbh-static1{opacity:.6}.cbh-phone.cbh-hover1{opacity:1}.cbh-ph-circle{width:160px;height:160px;top:20px;left:20px;position:absolute;background-color:transparent;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;border:2px solid rgba(30,30,30,.4);opacity:.1;-webkit-animation:cbh-circle-anim 1.2s infinite ease-in-out;-moz-animation:cbh-circle-anim 1.2s infinite ease-in-out;-ms-animation:cbh-circle-anim 1.2s infinite ease-in-out;-o-animation:cbh-circle-anim 1.2s infinite ease-in-out;animation:cbh-circle-anim 1.2s infinite ease-in-out;-webkit-transition:all .5s;-moz-transition:all .5s;-o-transition:all .5s;transition:all .5s}.cbh-phone.cbh-active .cbh-ph-circle1{-webkit-animation:cbh-circle-anim 1.1s infinite ease-in-out!important;-moz-animation:cbh-circle-anim 1.1s infinite ease-in-out!important;-ms-animation:cbh-circle-anim 1.1s infinite ease-in-out!important;-o-animation:cbh-circle-anim 1.1s infinite ease-in-out!important;animation:cbh-circle-anim 1.1s infinite ease-in-out!important}.cbh-phone.cbh-static .cbh-ph-circle{-webkit-animation:cbh-circle-anim 2.2s infinite ease-in-out!important;-moz-animation:cbh-circle-anim 2.2s infinite ease-in-out!important;-ms-animation:cbh-circle-anim 2.2s infinite ease-in-out!important;-o-animation:cbh-circle-anim 2.2s infinite ease-in-out!important;animation:cbh-circle-anim 2.2s infinite ease-in-out!important}.cbh-phone.cbh-hover .cbh-ph-circle{border-color:rgba(0,175,242,1);opacity:.5}.cbh-phone.cbh-green.cbh-hover .cbh-ph-circle{border-color:rgba(117,235,80,1);opacity:.5}.cbh-phone.cbh-green .cbh-ph-circle{border-color:rgba(0,175,242,1);opacity:.5}.cbh-phone.cbh-gray.cbh-hover .cbh-ph-circle{border-color:rgba(204,204,204,1);opacity:.5}.cbh-phone.cbh-gray .cbh-ph-circle{border-color:rgba(117,235,80,1);opacity:.5}.cbh-ph-circle-fill{width:100px;height:100px;top:50px;left:50px;position:absolute;background-color:#000;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;border:2px solid transparent;opacity:.1;-webkit-animation:cbh-circle-fill-anim 2.3s infinite ease-in-out;-moz-animation:cbh-circle-fill-anim 2.3s infinite ease-in-out;-ms-animation:cbh-circle-fill-anim 2.3s infinite ease-in-out;-o-animation:cbh-circle-fill-anim 2.3s infinite ease-in-out;animation:cbh-circle-fill-anim 2.3s infinite ease-in-out;-webkit-transition:all .5s;-moz-transition:all .5s;-o-transition:all .5s;transition:all .5s}.cbh-phone.cbh-active .cbh-ph-circle-fill{-webkit-animation:cbh-circle-fill-anim 1.7s infinite ease-in-out!important;-moz-animation:cbh-circle-fill-anim 1.7s infinite ease-in-out!important;-ms-animation:cbh-circle-fill-anim 1.7s infinite ease-in-out!important;-o-animation:cbh-circle-fill-anim 1.7s infinite ease-in-out!important;animation:cbh-circle-fill-anim 1.7s infinite ease-in-out!important}.cbh-phone.cbh-static .cbh-ph-circle-fill{-webkit-animation:cbh-circle-fill-anim 2.3s infinite ease-in-out!important;-moz-animation:cbh-circle-fill-anim 2.3s infinite ease-in-out!important;-ms-animation:cbh-circle-fill-anim 2.3s infinite ease-in-out!important;-o-animation:cbh-circle-fill-anim 2.3s infinite ease-in-out!important;animation:cbh-circle-fill-anim 2.3s infinite ease-in-out!important;opacity:0!important} .cbh-phone.cbh-hover .cbh-ph-circle-fill{background-color:rgba(0,175,242,.5);opacity:.75!important}.cbh-phone.cbh-green.cbh-hover .cbh-ph-circle-fill{background-color:rgba(117,235,80,.5);opacity:.75!important}.cbh-phone.cbh-green .cbh-ph-circle-fill{background-color:rgba(0,175,242,.5);opacity:.75!important}.cbh-phone.cbh-gray.cbh-hover .cbh-ph-circle-fill{background-color:rgba(204,204,204,.5);opacity:.75!important}.cbh-phone.cbh-gray .cbh-ph-circle-fill{background-color:rgba(117,235,80,.5);opacity:.75!important}.cbh-ph-img-circle1{width:60px;height:60px;top:70px;left:70px;position:absolute;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNmlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY6xSsNQFEDPi6LiUCsEcXB4kygotupgxqQtRRCs1SHJ1qShSmkSXl7VfoSjWwcXd7/AyVFwUPwC/0Bx6uAQIYODCJ7p3MPlcsGo2HWnYZRhEGvVbjrS9Xw5+8QMUwDQCbPUbrUOAOIkjvjB5ysC4HnTrjsN/sZ8mCoNTIDtbpSFICpA/0KnGsQYMIN+qkHcAaY6addAPAClXu4vQCnI/Q0oKdfzQXwAZs/1fDDmADPIfQUwdXSpAWpJOlJnvVMtq5ZlSbubBJE8HmU6GmRyPw4TlSaqo6MukP8HwGK+2G46cq1qWXvr/DOu58vc3o8QgFh6LFpBOFTn3yqMnd/n4sZ4GQ5vYXpStN0ruNmAheuirVahvAX34y/Axk/96FpPYgAAACBjSFJNAAB6JQAAgIMAAPn/AACA6AAAUggAARVYAAA6lwAAF2/XWh+QAAAB/ElEQVR42uya7W3CMBCG31QM4A1aNggTlG6QbpBMkHYC1AloJ4BOABuEDcgGtBOETnD9c1ERCH/lwxeaV8oPFGP86Hy+DxMREW5Bd7gRjSDSNGn4/RiAOvm8C0ZCRD5PSkQVXSr1nK/xE3mcWimA1ZV3JYBZCIO4giQANoYxMwYS6+xKY4lT5dJPreWZY+uspqSCKPYN27GJVBDXheVSQe494ksiEWTuMXcu1dld9SARxDX1OAJ4lgjy4zDnFsC076A4adEiRwAZg4hOUSpNoCsBPDGM+HqkNGynYBCuILuWj+dgWysGsNe8nwL4GsrW0m2fxZBq9rW0rNcX5MOQ9eZD8JFahcG5g/iKT671alGAYQggpYWvpEPYWrU/HDTOfeRIX0q2SL3QN4tGhZJukVobQyXYWw7WtLDKDIuM+ZSzscyCE9PCy5IttCvnZNaeiGLNHKuz8ZVh/MXTVu/1xQKmIqLEAuJ0fNo3iG5B51oSkeKnsBi/4bG9gYB/lCytU5G9DryFW+3Gm+JLwU7ehbJrwTjq4DJU8bHcVbEV9dXXqqP6uqO5e2/QZRYJpqu2IUAA4B3tXvx8hgKp05QZW6dJqrLTNkB6vrRURLRwPHqtYgkC3cLWQAcDQGGKH13FER/NATzi786+BPDNjm1dMkfjn2pGkBHkf4D8DgBJDuDHx9BN+gAAAABJRU5ErkJggg==);background-color:rgba(30,30,30,.1);background-position:center center;background-repeat:no-repeat;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;border:2px solid transparent;opacity:.7;-webkit-animation:cbh-circle-img-anim 1s infinite ease-in-out;-moz-animation:cbh-circle-img-anim 1s infinite ease-in-out;-ms-animation:cbh-circle-img-anim 1s infinite ease-in-out;-o-animation:cbh-circle-img-anim 1s infinite ease-in-out;animation:cbh-circle-img-anim 1s infinite ease-in-out}.cbh-phone.cbh-active .cbh-ph-img-circle1{-webkit-animation:cbh-circle-img-anim 1s infinite ease-in-out!important;-moz-animation:cbh-circle-img-anim 1s infinite ease-in-out!important;-ms-animation:cbh-circle-img-anim 1s infinite ease-in-out!important;-o-animation:cbh-circle-img-anim 1s infinite ease-in-out!important;animation:cbh-circle-img-anim 1s infinite ease-in-out!important}.cbh-phone.cbh-static .cbh-ph-img-circle1{-webkit-animation:cbh-circle-img-anim 0s infinite ease-in-out!important;-moz-animation:cbh-circle-img-anim 0s infinite ease-in-out!important;-ms-animation:cbh-circle-img-anim 0s infinite ease-in-out!important;-o-animation:cbh-circle-img-anim 0s infinite ease-in-out!important;animation:cbh-circle-img-anim 0s infinite ease-in-out!important}.cbh-phone.cbh-hover .cbh-ph-img-circle1{background-color:rgba(0,175,242,1)}.cbh-phone.cbh-green.cbh-hover .cbh-ph-img-circle1:hover{background-color:rgba(117,235,80,1)}.cbh-phone.cbh-green .cbh-ph-img-circle1{background-color:rgba(0,175,242,1)}.cbh-phone.cbh-green .cbh-ph-img-circle1{background-color:rgba(0,175,242,1)}.cbh-phone.cbh-gray.cbh-hover .cbh-ph-img-circle1{background-color:rgba(204,204,204,1)}.cbh-phone.cbh-gray .cbh-ph-img-circle1{background-color:rgba(117,235,80,1)}@-moz-keyframes cbh-circle-anim{0%{-moz-transform:rotate(0deg) scale(0.5) skew(1deg);opacity:.1;-moz-opacity:.1;-webkit-opacity:.1;-o-opacity:.1}30%{-moz-transform:rotate(0deg) scale(.7) skew(1deg);opacity:.5;-moz-opacity:.5;-webkit-opacity:.5;-o-opacity:.5}100%{-moz-transform:rotate(0deg) scale(1) skew(1deg);opacity:.6;-moz-opacity:.6;-webkit-opacity:.6;-o-opacity:.1}}@-webkit-keyframes cbh-circle-anim{0%{-webkit-transform:rotate(0deg) scale(0.5) skew(1deg);-webkit-opacity:.1}30%{-webkit-transform:rotate(0deg) scale(.7) skew(1deg);-webkit-opacity:.5}100%{-webkit-transform:rotate(0deg) scale(1) skew(1deg);-webkit-opacity:.1}}@-o-keyframes cbh-circle-anim{0%{-o-transform:rotate(0deg) kscale(0.5) skew(1deg);-o-opacity:.1}30%{-o-transform:rotate(0deg) scale(.7) skew(1deg);-o-opacity:.5}100%{-o-transform:rotate(0deg) scale(1) skew(1deg);-o-opacity:.1}}@keyframes cbh-circle-anim{0%{transform:rotate(0deg) scale(0.5) skew(1deg);opacity:.1}30%{transform:rotate(0deg) scale(.7) skew(1deg);opacity:.5}100%{transform:rotate(0deg) scale(1) skew(1deg);opacity:.1}}@-moz-keyframes cbh-circle-fill-anim{0%{-moz-transform:rotate(0deg) scale(0.7) skew(1deg);opacity:.2}50%{-moz-transform:rotate(0deg) -moz-scale(1) skew(1deg);opacity:.2}100%{-moz-transform:rotate(0deg) scale(0.7) skew(1deg);opacity:.2}}@-webkit-keyframes cbh-circle-fill-anim{0%{-webkit-transform:rotate(0deg) scale(0.7) skew(1deg);opacity:.2}50%{-webkit-transform:rotate(0deg) scale(1) skew(1deg);opacity:.2}100%{-webkit-transform:rotate(0deg) scale(0.7) skew(1deg);opacity:.2}}@-o-keyframes cbh-circle-fill-anim{0%{-o-transform:rotate(0deg) scale(0.7) skew(1deg);opacity:.2}50%{-o-transform:rotate(0deg) scale(1) skew(1deg);opacity:.2}100%{-o-transform:rotate(0deg) scale(0.7) skew(1deg);opacity:.2}}@keyframes cbh-circle-fill-anim{0%{transform:rotate(0deg) scale(0.7) skew(1deg);opacity:.2}50%{transform:rotate(0deg) scale(1) skew(1deg);opacity:.2}100%{transform:rotate(0deg) scale(0.7) skew(1deg);opacity:.2}}@keyframes cbh-circle-img-anim{0%{transform:rotate(0deg) scale(1) skew(1deg)}10%{transform:rotate(-25deg) scale(1) skew(1deg)}20%{transform:rotate(25deg) scale(1) skew(1deg)}30%{transform:rotate(-25deg) scale(1) skew(1deg)}40%{transform:rotate(25deg) scale(1) skew(1deg)}100%,50%{transform:rotate(0deg) scale(1) skew(1deg)}}@-moz-keyframes cbh-circle-img-anim{0%{transform:rotate(0deg) scale(1) skew(1deg)}10%{-moz-transform:rotate(-25deg) scale(1) skew(1deg)}20%{-moz-transform:rotate(25deg) scale(1) skew(1deg)}30%{-moz-transform:rotate(-25deg) scale(1) skew(1deg)}40%{-moz-transform:rotate(25deg) scale(1) skew(1deg)}100%,50%{-moz-transform:rotate(0deg) scale(1) skew(1deg)}}@-webkit-keyframes cbh-circle-img-anim{0%{-webkit-transform:rotate(0deg) scale(1) skew(1deg)}10%{-webkit-transform:rotate(-25deg) scale(1) skew(1deg)}20%{-webkit-transform:rotate(25deg) scale(1) skew(1deg)}30%{-webkit-transform:rotate(-25deg) scale(1) skew(1deg)}40%{-webkit-transform:rotate(25deg) scale(1) skew(1deg)}100%,50%{-webkit-transform:rotate(0deg) scale(1) skew(1deg)}}@-o-keyframes cbh-circle-img-anim{0%{-o-transform:rotate(0deg) scale(1) skew(1deg)}10%{-o-transform:rotate(-25deg) scale(1) skew(1deg)}20%{-o-transform:rotate(25deg) scale(1) skew(1deg)}30%{-o-transform:rotate(-25deg) scale(1) skew(1deg)}40%{-o-transform:rotate(25deg) scale(1) skew(1deg)}100%,50%{-o-transform:rotate(0deg) scale(1) skew(1deg)}}.cbh-ph-img-circle1 {}.cbh-phone.cbh-green .cbh-ph-circle {border-color: rgba(0, 175, 242, 1)}.cbh-phone.cbh-green .cbh-ph-circle-fill {background-color: rgba(0, 175, 242, 1);}.cbh-phone.cbh-green .cbh-ph-img-circle1 {background-color:rgba(0, 175, 242, 1);}body, div, dl, dt, dd, ul, ol, li, nav, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, button, textarea, p, blockquote, th, td, a {-webkit-transform-origin: center center;-ms-transform-origin: center center;-o-transform-origin: center center;transform-origin: center center;}@media screen and (max-width: ' + breakpoint + 'px) {#clbh_phone_div{display: none !important;}}';
              document.querySelector('head').appendChild(phoneStyles)
          }

          function init() {

              var desktopPopup = document.querySelector('#cloneThis'),
                  mobilePopup = document.querySelector('#cloneMobileThis');

              var h = document.querySelector('.hours'), m = document.querySelector('.minutes'),
                  s = document.querySelector('.seconds');

              if (h && m && s) {
                  // если все значения (часы/минуты/секунды) сущесвтуют, тогда срабатывает таймер
                  initializeTimer();
              }
              if (desktopPopup) {
                  createOverlay();
                  addPopupStyle();
                  addPhoneBtn(breakpoint);
                  document.querySelector('.phoneBtnContainer').addEventListener('click', showPopup);
              }
              else {
                  createOverlay();
                  addMobilePopupStyle()
              }
              if (desktopPopup || mobilePopup) {
                  //если у нас есть #cloneThis или #cloneMobileThis, тогда все функции ниже выполняются

                  createModalBody(breakpoint);
                  modalPosition(window.innerHeight);
                  document.querySelector('.ever-popup__close').addEventListener('click', hidePopup);
                  document.querySelector('.ever-popup__inner').addEventListener('click', notHide);
                  document.querySelector('.ever-popup').addEventListener('click', hidePopup);

                  var modalBtn = document.querySelectorAll('.ever-popup-btn');
                  for (var i = 0; i < modalBtn.length; i++) {
                      modalBtn && modalBtn[i].addEventListener('click', showPopup);
                  }
              }
              // рабоатет если у нас есть класс .check__btn
              var checkBtn = document.querySelector(".check__btn");
              checkBtn && checkBtn.addEventListener('click', checkCode);
          }

          // при документ реди вызывается функция init, описаная выше
          document.addEventListener('DOMContentLoaded', init);

          window.addEventListener('resize', function () {
              //при ресайзе пересчитываем позиционирование модального окна
              modalPosition(window.innerHeight);
          });

          function initializeTimer() {

              if (!localStorage.getItem("heytimer")) {
                  var time = {
                      hours: 0,
                      minutes: 27,
                      seconds: 0
                  }, different = false;

                  time = time.hours * 3600 + time.minutes * 60 + time.seconds;

                  localStorage.setItem("time", time);
                  localStorage.setItem("heytimer", true);
                  localStorage.setItem("different", different);
              }

              timerSettings();
          }

          function timerSettings() {
              var time = localStorage.getItem('time'),
                  different = localStorage.getItem('different') === "true",
                  hours = parseInt(time / 3600, 10),
                  minutes = parseInt((time - hours * 3600 ) / 60, 10),
                  seconds = parseInt(time % 60, 10);

              minutes = minutes < 10 ? "0" + minutes : "" + minutes;
              seconds = seconds < 10 ? "0" + seconds : "" + seconds;
              hours = hours < 10 ? "0" + hours : "" + hours;

              var hoursHTML = document.getElementsByClassName("hours");
              var minutesHTML = document.getElementsByClassName("minutes");
              var secondsHTML = document.getElementsByClassName("seconds");

              if (--time < 0) {
                  localStorage.removeItem("heytimer");
                  return;
              }
              if (different) {
                  seconds = seconds.split("");
                  minutes = minutes.split("");
                  hours = hours.split("");

                  doubleFilling(hoursHTML, hours);
                  doubleFilling(minutesHTML, minutes);
                  doubleFilling(secondsHTML, seconds);
              } else {
                  filling(hoursHTML, hours);
                  filling(minutesHTML, minutes);
                  filling(secondsHTML, seconds);
              }

              localStorage.setItem("time", time);
              setTimeout(timerSettings, 1000);
          }

          function filling(obj, value) {
              for (var i = 0; i < obj.length; i++) {
                  obj[i].innerHTML = value;
              }
          }

          function doubleFilling(obj, value) {
              for (var i = 0; i < obj.length; i++) {
                  obj[i].innerHTML = value[i % 2];
              }
          }
      }

      initiate();

  })();
//everad end



$(document).ready(function () {
  plyr.setup();



  var evSvgArray = $('.ev-composition__svg'),
      evItemsArray = $('.ev-composition__item-description'),
      evSvgActive='ev-composition__svg_active',
      evRoundShow='ev-composition__center_round_show',
      evBufferText='',
      evRound='.ev-composition__center_round',
      evItemFullHeight='ev-composition__item-full_height';


  $('path').hover(function () {
      var parentSvg = $(this).parents('.ev-composition__svg'),
          evIndexSvg = evSvgArray.index(parentSvg);

      parentSvg.siblings('.ev-composition__svg').removeClass(evSvgActive);
      $(evRound).text($(evItemsArray[evIndexSvg]).text()).removeClass(evRoundShow);
      evBufferText=$(evItemsArray[evIndexSvg]).text();

      if (parentSvg.hasClass(evSvgActive)) {
          parentSvg.removeClass(evSvgActive);
          $(evRound).text('').addClass(evRoundShow);
          evBufferText='';
      }
      else {
          parentSvg.addClass(evSvgActive);
      }
  });

  $('.ev-composition__item').click(function(){
      $(this).siblings().removeClass(evItemFullHeight);
      $(this).toggleClass(evItemFullHeight);
  });

  $(window).on('resize',windowSize);

  function windowSize(){
      if ($(window).width() <= '1199'){
          $(evRound).text('').addClass(evRoundShow);
      }
      else {
          if(evBufferText!==''){
              $(evRound).text(evBufferText).removeClass(evRoundShow);
          }
      }
  }


//код для розвертывания текста
(function(){
  var
    text = $('.article__text-box_visible'),
    height = text.height(),
    button = $('#article__button'),
    shadow = $('.section6 .article__button-box__shadow');

  text.addClass('ficsed_h')
    button.on('click', function(){
      if ( !text.hasClass('auto_h') ) {
        text.css('height',height);
        shadow.animate({'opacity':'0'}, 500);
      }else{
        text.css('height','223px');
        shadow.animate({'opacity':'1'}, 500)
      }
      button.toggleClass('article__button_180');
      text.toggleClass('auto_h');
    })
})();


//код для розвертывания текста слайдеров
var changeHeigth;
(function(){
  var
  sec10SlidItems = $('.section10-slider__descc-box'),
  shadow = $('.section10 .article__button-box__shadow');
  
  //запишим в атрибут 'data-total_height оригинальную высоту каждого елемента
  for(var i=0; i<sec10SlidItems.length; i++){
    var current = $(sec10SlidItems[i]);
    var itemHeight = current.height()+'px';

    current.css('height', '172px');
    current.attr('data-total_height', itemHeight)
  }
  //приведем стили слайдера в порядок после того как исходная высота сохранена
  $('.section10-slider__item').addClass('section10__active-slider');

  changeHeigth = function changeHeigth(button){
  
    var block = $(button).parent().siblings('.section10-slider__descc-box');
    var height = $(block).attr('data-total_height');
    
    if ( !block.hasClass('auto_h') ) {
      block.css('height',height);
      shadow.toggleClass('opacity_shadow');
    }else{
      block.css('height','172px');
      shadow.toggleClass('opacity_shadow');
    }
    $(button).toggleClass('article__button_180');
    block.toggleClass('auto_h');
  }

  $('.section10__drop-button').on('click', function(){
    changeHeigth(this);
  })
})();

//slider1
(function(){

  var slidList = $('.section2-slider-list');
  var slids = $('.section2-slider__item');
  var slidsClone = slids.clone();
  var sliderMarks = $('.slide2__mark');

  for(var i=0; sliderMarks.length>i; i++){
    var current = sliderMarks[i];
    $(current).attr('data-slider_number', i+1);
  }


  function changeSlide(that){

    if (!$(that).hasClass('active-slide')) {
      var cliced = $(that).attr('data-slider_number');
      var centerSlide = $(slids[1]);

      sliderMarks.removeClass('active-slide');
      $(that).addClass('active-slide');

      slidList.animate({'opacity':0.3}, 200, function(){

        if (cliced>2) {
          centerSlide.appendTo(slidList);
        }else if(cliced<2){
          centerSlide.prependTo(slidList);
        }else{
          slids.remove();
          slidsClone.appendTo(slidList);
          slids = $('.section2-slider__item');
        }
        slidList.animate({'opacity':1}, 500, function(){});

      });

    }
    
  }

  sliderMarks.on('click', function(){
    changeSlide(this);
  })
  
})();
  
  //slider2
  (function(){
    var
      slide = $('.slider__item'),
      sliderView = $('.slde__view'),
      slidsBox = $('.slides__box'),
      slideWidht = slide.width(),
      sliderMarks = $('.slide1__mark'),
      section4BgSlidBox = $('.section4__bg-slids__box'),
      section4BgSlids = $('.section2__bg-slide');

    for(var i=0; slide.length>i; i++){
      var current = slide[i];
      $(current).attr('data-number', i+1);
      
    }

    section4BgSlidBox.width(section4BgSlids.width()*section4BgSlids.length);
    sliderView.width(slideWidht);
    sliderView.css('overflow', 'hidden');
    slidsBox.width(slideWidht*slide.length);
    slidsBox.css({'position':'relative','left': -slideWidht});
    slidsBox.css({'margin-left': 0+'px', 'margin-right': 0+'px'});
    $(slide[slide.length - 1]).prependTo(slidsBox);


    function apdateInfo(current){
      var number = $(current).attr('data-number');
      $('.slider__item-number').text(number);
      sliderMarks.removeClass('active-slide');
      $(sliderMarks[number -1]).addClass('active-slide');
    }

    function slideMove(that){
      var bool = $(that).hasClass('next');
      var direction = (bool)? -slideWidht : slideWidht;

      slidsBox = $('.slides__box');
      slide = $('.slider__item');
      section4BgSlidBox = $('.section4__bg-slids__box'),
      section4BgSlids = $('.section2__bg-slide');

      (bool)? apdateInfo(slide[2]): apdateInfo(slide[0]);
      slidsBox.animate({'margin-left':direction+'px'}, 500, function(){

        (bool)? $(slide[0]).appendTo(slidsBox) : $(slide[slide.length - 1]).prependTo(slidsBox);
        (bool)? $(section4BgSlids[0]).appendTo(section4BgSlidBox) : $(section4BgSlids[section4BgSlids.length - 1]).prependTo(section4BgSlidBox);
        slidsBox.css('margin-left', 0+'px');
        
      })
    }

    $('.sectioon4__slider-button span').on('click', function(e){
      slideMove(this);
    });

  })();


  //slider3
  (function(){

    var slidList = $('.section10-slider');
    var slids = $('.section10-slider__item');
    var slidsClone = slids.clone();
    var sliderMarks = $('.slide3__mark');

    for(var i=0; sliderMarks.length>i; i++){
      var current = sliderMarks[i];
      $(current).attr('data-slider_number', i+1);
    }


    function changeSlide(that){

      if (!$(that).hasClass('active-slide')) {
        var cliced = $(that).attr('data-slider_number');
        var centerSlide = $(slids[1]);

        sliderMarks.removeClass('active-slide');
        $(that).addClass('active-slide');

        if (cliced>2) {
          centerSlide.appendTo(slidList);
        }else if(cliced<2){
          centerSlide.prependTo(slidList);
        }else{
          slids.remove();
          slidsClone.appendTo(slidList);
          slids = $('.section10-slider__item');
          $('.section10__drop-button').on('click', function(){
            console.log('click');
            changeHeigth(this);
          })
        }
      }
    }

    sliderMarks.on('click', function(){
      changeSlide(this);
    })

  })();

//попап на отзыв stsrt
  var btn = $('.comment-btn'), //кнопка вызова
    closeBtn = $('.closer'), //крестик попапа
    field = $('.field'), // поле ввода сообщения
    thanksNo = $('.thanks-no'), //нет отзыва
    thanksPopup = $('.thanks-popup'), //блок с попапом
    thanksInner = $('.thanks-popup__inner'); //внутренний блок попапа

      btn.click(function(e) {
        if (field.val().length > 0) {
          e.preventDefault();
          //если поле не пустое очищаем его, и показываем попап
          thanksPopup.addClass('show')
          
            thanksNo.removeClass('active');
            field.val('');
        } else if (field.val().length == 0) {
          thanksNo.addClass('active');
        }
      })

      function closeThanksPopup() {
        //функция закрытия попапа
        thanksPopup.removeClass('show');
      }
      thanksPopup.add(closeBtn).click(closeThanksPopup); // навешиваем функцию закрытия на блок попапа, и на кнопку закрытия попапа

      thanksInner.click(function(e) {
        //при клике на содержимое попапа прерываем отображение скрипта
        e.stopPropagation()
    });
  //попап на отзыв end

})



//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIC8vZXZlcmFkIHN0YXJ0XHJcbiAgLy/QtNC70Y8g0LrQu9C+0L3QuNGA0L7QstCw0L3QuNGPINCx0LvQvtC60LAg0LIg0L/QvtC/0LDQvyDQuNGB0L/QvtC70YzQt9GD0Y7RgtGB0Y8g0YHQu9C10LTRg9GO0YnQuNC1INCw0LnQtNC40YjQvdC40LrQuFxyXG4gIC8vICNjbG9uZVRoaXMgLSDQtNC70Y8g0LTQtdGB0LrRgtC+0L/QsFxyXG4gIC8vICNjbG9uZU1vYmlsZVRoaXMgLSDQtNC70Y8g0LzQvtCx0LjQu9GM0L3QvtCz0L4gKNC10YHQu9C4INC90YPQttC90L4pXHJcbiAgLy/QsdGA0LXQudC60L/QvtC40L3RgiDQtNC70Y8g0L/QtdGA0LXQutC70Y7Rh9C10L3QuNGPINC/0L7Qv9Cw0L/QsCDQv9GA0Lgg0L3QtdC+0LHRhdC+0LTQuNC80L7RgdGC0Lgg0LTQtdGE0L7Qu9GCINC30L3QsNGH0LXQvdC40LUgPSAxMDAwXHJcblxyXG4gIC8vINCyINGB0LvRg9GH0LDQtSwg0LXRgdC70Lgg0LzRiyDQvdC1INC60LvQvtC90LjRgNGD0LXQvCDRhNC+0YDQvNGDLCDQsCDQstC10YDRgdGC0LDQtdC8INC/0L7Qv9Cw0L8g0L/RgNC+0LjQt9Cy0L7Qu9GM0L3QvixcclxuICAvLyDRgtC+INC00LXQu9Cw0YLRjCDRjdGC0L4g0L3QtdC+0LHRhdC+0LTQuNC80L4g0LIg0LrQvtC90YLQtdC50L3QtdGA0LUg0YEg0LrQu9Cw0YHRgdC+0LwgLmV2ZXItcG9wdXAtYnVpbGRcclxuICAvLyBmYWxzZSAo0L/QvtC60LDQt9GL0LLQsNGC0Ywg0LrQvtC90YLQtdC50L3QtdGAKSAvIHRydWUgKNC90LUg0L/QvtC60LDQt9GL0LLQsNGC0Ywg0LrQvtC90YLQtdC50L3QtdGAKVxyXG5cclxuICB2YXIgcG9wdXBCdWlsZCA9IHRydWU7IC8vIGZhbHNlL3RydWVcclxuXHJcblxyXG4gIC8vLmV2ZXItcG9wdXAtYnRuIC0g0LrQu9Cw0YHRgSDQtNC70Y8g0LTQu9GPINC+0YLQutGA0YvRgtC40Y8g0L/QvtC/0LDQv9CwXHJcblxyXG4gIC8v0L/RgNC+0LLQtdGA0LrQsCDQutC+0LTQsFxyXG4gIC8vLmNoZWNrX19maWVsZCAtINC60LvQsNGB0YEg0LTQu9GPINC/0L7Qu9GPINC/0YDQvtCy0LXRgNC60Lgg0LrQvtC00LBcclxuICAvLy5jaGVja19fYnRuIC0g0LrQu9Cw0YHRgSDQtNC70Y8g0LrQvdC+0L/QutC4INC/0YDQvtCy0LXQutC4INC60L7QtNCwXHJcbiAgLy8uY2hlY2tfX3Jlc3VsdCAtINC60LvQsNGB0YEg0LTQu9GPINC60L7QvdGC0LXQudC90LXRgNCwINGBINGA0LXQt9GD0LvRjNGC0LDRgtC+0Lwg0L/RgNC+0LLQtdGA0LrQuCDQutC+0LTQsFxyXG5cclxuICAvL9GC0LDQudC80LXRgFxyXG4gIC8v0LTQu9GPINCy0YvQstC+0LTQsCDRgdGH0LXRgtGH0LjQutCwINGC0LDQudC80LXRgNCwINC40YHQv9C+0LvRjNC30YPQtdGC0YHRjyAzINC60L7QvdGC0LXQvdC10YDQsCAo0YfQsNGB0YssINC80LjQvdGD0YLRiywg0YHQtdC60YPQvdC00YspXHJcbiAgLy8uaG91cnMg0LrQu9Cw0YHRgSDQtNC70Y8g0LLRi9Cy0L7QtNCwINGH0LDRgdC+0LJcclxuICAvLy5taW51dGVzINC60LvQsNGB0YEg0LTQu9GPINCy0YvQstC+0LTQsCDQvNC40L3Rg9GCXHJcbiAgLy8uc2Vjb25kcyDQutC70LDRgdGBINC00LvRjyDQstGL0LLQvtC00LAg0YHQtdC60YPQvdC0XHJcblxyXG4gIChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBmdW5jdGlvbiBpbml0aWF0ZSgpIHtcclxuXHJcbiAgICAgICAgICB2YXIgYnJlYWtwb2ludCA9IDEwMDAsXHJcbiAgICAgICAgICAgICAgZGVza3RvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbG9uZVRoaXMnKSxcclxuICAgICAgICAgICAgICBtb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvbmVNb2JpbGVUaGlzJyk7XHJcblxyXG4gICAgICAgICAgaWYgKHBvcHVwQnVpbGQpIHtcclxuICAgICAgICAgICAgICAvLyDQsiDRgdC70YPRh9Cw0LUsINC10YHQu9C4INC80Ysg0LLQtdGA0YHRgtCw0LXQvCDQv9C+0L/QsNC/INCyINC60L7QvdGC0LXQudC90LXRgNC1IC5ldmVyLXBvcHVwLWJ1aWxkLCDQtNCw0L3QvtC1INGD0YHQu9C+0LLQuNC1INC/0YDRj9GH0LXRgiDQtdCz0L4sINC10YHQu9C4INC30L3QsNGH0LXQvdC40LUg0L/QtdGA0LXQvNC10L3QvdC+0LkgcG9wdXBCdWlsZCA9IHRydWVcclxuICAgICAgICAgICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCA9ICcuZXZlci1wb3B1cC1idWlsZHtwb3NpdGlvbjogZml4ZWQ7IG9wYWNpdHk6IDA7ei1pbmRleDogLTE7IHRvcDogMDsgbGVmdDogMDt9JztcclxuICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuYXBwZW5kQ2hpbGQoc3R5bGUpXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZnVuY3Rpb24gYWRkUG9wdXBTdHlsZSgpIHtcclxuICAgICAgICAgICAgICAvLyDQtNC+0LHQsNCy0LvRj9C10Lwg0YHRgtC40LvQuCDQtNC70Y8g0L3QsNGI0LXQs9C+INC/0L7QsNC/0LBcclxuICAgICAgICAgICAgICB2YXIgY29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyksXHJcbiAgICAgICAgICAgICAgICAgIGhlYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJyk7XHJcbiAgICAgICAgICAgICAgY29udC5pbm5lckhUTUwgPSAnLmV2ZXItcG9wdXBfX2JvZHkuZXZlci1tb2JpbGV7ZGlzcGxheTpub25lfS5ldmVyLXBvcHVwe3Bvc2l0aW9uOiBmaXhlZDt0b3A6IDA7bGVmdDogMDt3aWR0aDogMTAwJTtoZWlnaHQ6IDEwMCU7YmFja2dyb3VuZDogcmdiYSgwLDAsMCwuNyk7ei1pbmRleDogMTExO2Rpc3BsYXk6IG5vbmU7b3ZlcmZsb3c6IGF1dG87fS5ldmVyLXBvcHVwX19ib2R5e3Bvc2l0aW9uOiBzdGF0aWM7ZmxvYXQ6IG5vbmU7ZGlzcGxheTogYmxvY2s7bWFyZ2luOiAwIGF1dG87d2lkdGg6YXV0b30uZXZlci1wb3B1cC5zaG93e2Rpc3BsYXk6IGJsb2NrO2FsaWduLWl0ZW1zOiBjZW50ZXI7fS5ldmVyLXBvcHVwX19pbm5lcntwb3NpdGlvbjogcmVsYXRpdmU7bWFyZ2luOiAwIGF1dG87cGFkZGluZy10b3A6MzVweH0uZXZlci1wb3B1cF9fY2xvc2V7d2lkdGg6IDM1cHg7aGVpZ2h0OiAzMHB4O3Bvc2l0aW9uOiBhYnNvbHV0ZTtjdXJzb3I6cG9pbnRlcjt0b3A6IDA7cmlnaHQ6IDA7ei1pbmRleDogMTstd2Via2l0LXRyYW5zaXRpb246IC4zczsgLW1vei10cmFuc2l0aW9uOiAuM3M7IC1tcy10cmFuc2l0aW9uOiAuM3M7IC1vLXRyYW5zaXRpb246IC4zczsgdHJhbnNpdGlvbjogLjNzO30uZXZlci1wb3B1cF9fY2xvc2U6YWZ0ZXIsIC5ldmVyLXBvcHVwX19jbG9zZTpiZWZvcmUge2NvbnRlbnQ6IFwiXCI7cG9zaXRpb246IGFic29sdXRlO3JpZ2h0OiAwO3RvcDogMTBweDt3aWR0aDogMzVweDtoZWlnaHQ6IDEwcHg7YmFja2dyb3VuZDogI2ZmZjt0cmFuc2l0aW9uOiBhbGwgMXM7fS5ldmVyLXBvcHVwX19jbG9zZTphZnRlciB7LXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpOy1tcy10cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpOy1vLXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7dHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTt9LmV2ZXItcG9wdXBfX2Nsb3NlOmJlZm9yZSB7LXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7LW1zLXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTstby10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7dHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO30nICtcclxuICAgICAgICAgICAgICAgICAgJ0BtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICcgKyBicmVha3BvaW50ICsgJ3B4JyArICcpeycgK1xyXG4gICAgICAgICAgICAgICAgICAnLmV2ZXItcG9wdXBfX2JvZHkuZXZlci1kZXNrdG9we2Rpc3BsYXk6bm9uZX0nICtcclxuICAgICAgICAgICAgICAgICAgJy5ldmVyLXBvcHVwX19ib2R5LmV2ZXItbW9iaWxle2Rpc3BsYXk6YmxvY2t9JyArXHJcbiAgICAgICAgICAgICAgICAgICd9JztcclxuICAgICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkKGNvbnQpXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZnVuY3Rpb24gYWRkTW9iaWxlUG9wdXBTdHlsZSgpIHtcclxuICAgICAgICAgICAgICAvLyDQtNC+0LHQsNCy0LvRj9C10Lwg0YHRgtC40LvQuCDQtNC70Y8g0L3QsNGI0LXQs9C+INC/0L7QsNC/0LBcclxuICAgICAgICAgICAgICB2YXIgY29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyksXHJcbiAgICAgICAgICAgICAgICAgIGhlYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJyk7XHJcbiAgICAgICAgICAgICAgY29udC5pbm5lckhUTUwgPSAnQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJyArIGJyZWFrcG9pbnQgKyAncHgnICsgJykgey5ldmVyLXBvcHVwIHtwb3NpdGlvbjogZml4ZWQ7dG9wOiAwO2xlZnQ6IDA7d2lkdGg6IDEwMCU7aGVpZ2h0OiAxMDAlO2JhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgLjcpO3otaW5kZXg6IDExMTtkaXNwbGF5OiBub25lO292ZXJmbG93OiBhdXRvO30uZXZlci1wb3B1cF9fYm9keSB7cG9zaXRpb246IHN0YXRpYztmbG9hdDogbm9uZTtkaXNwbGF5OiBibG9jazttYXJnaW46IDAgYXV0bzt3aWR0aDogYXV0b30uZXZlci1wb3B1cC5zaG93IHtkaXNwbGF5OiBibG9jazthbGlnbi1pdGVtczogY2VudGVyO30uZXZlci1wb3B1cF9faW5uZXIge3Bvc2l0aW9uOiByZWxhdGl2ZTttYXJnaW46IDAgYXV0bztwYWRkaW5nLXRvcDogMzVweH0uZXZlci1wb3B1cF9fY2xvc2Uge3dpZHRoOiAzNXB4O2hlaWdodDogMzBweDtwb3NpdGlvbjogYWJzb2x1dGU7Y3Vyc29yOiBwb2ludGVyO3RvcDogMDtyaWdodDogMDt6LWluZGV4OiAxOy13ZWJraXQtdHJhbnNpdGlvbjogLjNzOy1tb3otdHJhbnNpdGlvbjogLjNzOy1tcy10cmFuc2l0aW9uOiAuM3M7LW8tdHJhbnNpdGlvbjogLjNzO3RyYW5zaXRpb246IC4zczt9LmV2ZXItcG9wdXBfX2Nsb3NlOmFmdGVyLCAuZXZlci1wb3B1cF9fY2xvc2U6YmVmb3JlIHtjb250ZW50OiBcIlwiO3Bvc2l0aW9uOiBhYnNvbHV0ZTtyaWdodDogMDt0b3A6IDEwcHg7d2lkdGg6IDM1cHg7aGVpZ2h0OiAxMHB4O2JhY2tncm91bmQ6ICNmZmY7dHJhbnNpdGlvbjogYWxsIDFzO30uZXZlci1wb3B1cF9fY2xvc2U6YWZ0ZXIgey13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTstbXMtdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTstby10cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO3RyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7fS5ldmVyLXBvcHVwX19jbG9zZTpiZWZvcmUgey13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpOy1tcy10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7LW8tdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO3RyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTt9fSc7XHJcbiAgICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChjb250KVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXkoKSB7XHJcbiAgICAgICAgICAgICAgLy8g0YHQvtC30LTQsNC10Lwg0LfQsNGC0LXQvNC90LXQvdC90YvQuSDRhNC+0L0g0LTQu9GPINC/0L7Qv9Cw0L/QsCDQuCDQstGB0YLQsNCy0LvRj9C10Lwg0LXQs9C+INCyINGA0LDQt9C80LXRgtC60YMgaHRtbFxyXG4gICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgICAgICAgICAgICAgcGFyZW50SW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgICAgICAgICAgICAgY2xvc2VQYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgICAgICAgcGFyZW50LmNsYXNzTGlzdC5hZGQoJ2V2ZXItcG9wdXAnKTtcclxuICAgICAgICAgICAgICBwYXJlbnRJbm5lci5jbGFzc0xpc3QuYWRkKCdldmVyLXBvcHVwX19pbm5lcicpO1xyXG4gICAgICAgICAgICAgIGNsb3NlUGFyZW50LmNsYXNzTGlzdC5hZGQoJ2V2ZXItcG9wdXBfX2Nsb3NlJyk7XHJcblxyXG4gICAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChwYXJlbnRJbm5lcik7XHJcbiAgICAgICAgICAgICAgcGFyZW50SW5uZXIuYXBwZW5kQ2hpbGQoY2xvc2VQYXJlbnQpO1xyXG4gICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocGFyZW50KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBjcmVhdGVNb2RhbEJvZHkoYnJlYWtwb2ludCkge1xyXG4gICAgICAgICAgICAgIC8vINGE0YPQvdC60YbQuNGPINC+0L/RgNC10LTQtdC70Y/QtdGCINGB0L7QtNC10YDQttC40LzQvtC1INC00LvRjyDQv9C+0L/QsNC/0LAsINC60LvQvtC90LjRgNGD0LXRgiDQtdCz0L4g0YHQvtC00LXRgNC20LjQvNC+0LUsINC4INC/0L7QtdGJ0LDQtdGCINCyINC60L7QvdGC0LXQudC90LXRgCBldmVyLXBvcHVwX19ib2R5XHJcbiAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ldmVyLXBvcHVwX19pbm5lcicpO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoZGVza3RvcCkge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgZGVza3RvcENsb25lID0gZGVza3RvcC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgIGRlc2t0b3BDbG9uZS5jbGFzc0xpc3QuYWRkKCdldmVyLXBvcHVwX19ib2R5Jyk7XHJcbiAgICAgICAgICAgICAgICAgIGRlc2t0b3BDbG9uZS5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XHJcbiAgICAgICAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChkZXNrdG9wQ2xvbmUpO1xyXG4gICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXZlci1wb3B1cCAuZXZlci1wb3B1cF9faW5uZXInKS5zdHlsZS53aWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbG9uZVRoaXMnKS5vZmZzZXRXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZiAobW9iaWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBtb2JpbGVDbG9uZSA9IG1vYmlsZS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChkZXNrdG9wQ2xvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGRlc2t0b3BDbG9uZS5jbGFzc0xpc3QuYWRkKCdldmVyLWRlc2t0b3AnKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBtb2JpbGVDbG9uZS5jbGFzc0xpc3QuYWRkKCdldmVyLXBvcHVwX19ib2R5Jyk7XHJcbiAgICAgICAgICAgICAgICAgIG1vYmlsZUNsb25lLmNsYXNzTGlzdC5hZGQoJ2V2ZXItbW9iaWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgIG1vYmlsZUNsb25lLnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcclxuICAgICAgICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKG1vYmlsZUNsb25lKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIG1vYmlsZVN0eWxlcyA9ICcuZXZlci1kZXNrdG9we2Rpc3BsYXk6IGJsb2NrfS5ldmVyLW1vYmlsZXtkaXNwbGF5OiBub25lfUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICcgKyBicmVha3BvaW50ICsgJ3B4KXsuZXZlci1tb2JpbGV7ZGlzcGxheTogYmxvY2t9LmV2ZXItZGVza3RvcHtkaXNwbGF5OiBub25lO319JztcclxuXHJcbiAgICAgICAgICAgICAgICAgIHZhciBtb2JpbGVTdHlsZXNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICBtb2JpbGVTdHlsZXNDb250YWluZXIuaW5uZXJIVE1MID0gbW9iaWxlU3R5bGVzO1xyXG4gICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuYXBwZW5kQ2hpbGQobW9iaWxlU3R5bGVzQ29udGFpbmVyKVxyXG4gICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXZlci1wb3B1cCAuZXZlci1wb3B1cF9faW5uZXInKS5zdHlsZS53aWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbG9uZU1vYmlsZVRoaXMnKS5vZmZzZXRXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1vYmlsZS5vZmZzZXRXaWR0aClcclxuICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBtb2RhbFBvc2l0aW9uKHNjcmVlbkhlaWdodCkge1xyXG4gICAgICAgICAgICAgIC8v0YDQsNGB0YfQtdGCINGI0LjRgNC40L3RiyDQuCDQstGL0LLQvtC0INC10LUg0LIgaHRtbCwg0YTRg9C90LrRhtC40Y8g0LLRi9C30YvQstCw0LXRgtGB0Y8g0L/RgNC4INC30LDQs9GA0YPQt9C60LUg0YHRgtGA0LDQvdC40YbRiywg0LAg0YLQsNC6INC20LUg0L/RgNC4INGA0LXRgdCw0LnQt9C1XHJcbiAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ldmVyLXBvcHVwICAuZXZlci1wb3B1cF9faW5uZXInKTtcclxuICAgICAgICAgICAgICBpZiAoY29udGFpbmVyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICB2YXIgZGVza3RvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbG9uZVRoaXMnKSxcclxuICAgICAgICAgICAgICAgICAgICAgIG1vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbG9uZU1vYmlsZVRoaXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChkZXNrdG9wKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgY2hlY2tQb3NpdGlvbihkZXNrdG9wLCBjb250YWluZXIsIHNjcmVlbkhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiBicmVha3BvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gZGVza3RvcC5vZmZzZXRXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChtb2JpbGUgJiYgd2luZG93LmlubmVyV2lkdGggPCBicmVha3BvaW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKG1vYmlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrUG9zaXRpb24obW9iaWxlLCBjb250YWluZXIsIHNjcmVlbkhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gbW9iaWxlLm9mZnNldFdpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrUG9zaXRpb24oc2VsZWN0b3IsIGNvbnRhaW5lciwgc2NyZWVuSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgLy/Qv9C+0LfQuNGG0LjQvtC90LjRgNC+0LLQsNC90LjQtSDQv9C+0L/QsNC/0LAg0L/QviDQstC10YDRgtC40LrQsNC70LhcclxuICAgICAgICAgICAgICB2YXIgY29udCA9IHNlbGVjdG9yLFxyXG4gICAgICAgICAgICAgICAgICBjb250SGVpZ2h0ID0gY29udC5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChjb250SGVpZ2h0ID4gc2NyZWVuSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5tYXJnaW4gPSAnNDBweCBhdXRvJztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciB0b3AgPSAoc2NyZWVuSGVpZ2h0IC0gY29udEhlaWdodCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICBjb250YWluZXIuc3R5bGUubWFyZ2luID0gdG9wICsgJ3B4IGF1dG8gMjBweCc7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIHNob3dQb3B1cCgpIHtcclxuICAgICAgICAgICAgICAvL9GE0YPQvdC60YbQuNGPINC00LvRjyDQv9C+0LrQsNC30LAg0L/QvtC/0LDQv9CwXHJcbiAgICAgICAgICAgICAgdmFyIHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmV2ZXItcG9wdXAnKTtcclxuICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdzaG93JylcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBoaWRlUG9wdXAoKSB7XHJcbiAgICAgICAgICAgICAgLy/RhNGD0L3QutGG0LjRjyDQtNC70Y8g0YHQutGA0YvRgtC40Y8g0L/QvtC/0LDQv9CwXHJcbiAgICAgICAgICAgICAgdmFyIHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmV2ZXItcG9wdXAnKTtcclxuICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JylcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBub3RIaWRlKGUpIHtcclxuICAgICAgICAgICAgICAvL9GE0YPQvdC60YbQuNGPINC00LvRjyDQv9GA0LXRgNGL0LLQsNC90LjRjyDQstGL0L/QvtC70L3QtdC90LjRjyDRgdGG0LXQvdCw0YDQuNGPINC/0L4g0LrQu9C40LrRg1xyXG4gICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBjaGVja0NvZGUoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAvLyDQv9GA0L7QstC10YDQutCwINC60L7QtNCwINC/0L7QtNC70LjQvdC90L7RgdGC0LhcclxuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICB2YXIgY29kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2hlY2tfX2ZpZWxkXCIpLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICBtc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNoZWNrX19yZXN1bHRcIik7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChjb2RlLmxlbmd0aCA9PT0gMTUpIHtcclxuICAgICAgICAgICAgICAgICAgbXNnLmlubmVySFRNTCA9ICfQlNCw0L3QvdGL0Lkg0LrQvtC0INCy0LXRgNC10L0uINCh0L/QsNGB0LjQsdC+LCDRh9GC0L4g0LLRi9Cx0YDQsNC70Lgg0L3QsNGI0YMg0L/RgNC+0LTRg9C60YbQuNGOISc7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGVsc2UgaWYgKGNvZGUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIG1zZy5pbm5lckhUTUwgPSAn0JLQstC10LTQuNGC0LUsINC/0L7QttCw0LvRg9C50YHRgtCwLCDQutC+0LQuJztcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBtc2cuaW5uZXJIVE1MID0gJ9CaINGB0L7QttCw0LvQtdC90LjRjiwg0LTQsNC90L3Ri9C5INC60L7QtCDQvdC1INC90LDQudC00LXQvSEg0JLQtdGA0L7Rj9GC0L3QtdC1INCy0YHQtdCz0L4sINCy0Ysg0L/RgNC40L7QsdGA0LXQu9C4INC/0L7QtNC00LXQu9GM0L3Ri9C5INC/0YDQvtC00YPQutGCLic7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHZhciBtb3VzZU91dENvdW50ID0gMDtcclxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgIC8v0YHQvtCx0YvRgtC40LUg0L3QsCDRg9Cy0L7QtCDQvNGL0YjQutC4INGB0L4g0YHRgtGA0LDQvdC40YbRiy4g0LXRgdC70Lgg0LzRi9GI0LrQsCDRg9GF0L7QtNC40YIg0LfQsCDQstC10YDRhdC90Y7RjiDQs9GA0LDQvdC40YbRgyDQtNC+0LrRg9C80LXQvdGC0LAsINCy0YvQt9GL0LLQsNC10YLRgdGPINC/0L7Qv9Cw0L9cclxuICAgICAgICAgICAgICB2YXIgZSA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcclxuICAgICAgICAgICAgICBlID0gZS5jbGllbnRZO1xyXG4gICAgICAgICAgICAgIHZhciBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ldmVyLXBvcHVwJyk7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChwb3B1cCAmJiBlIDwgMTAgJiYgbW91c2VPdXRDb3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICAgIG1vdXNlT3V0Q291bnQrKztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBhZGRQaG9uZUJ0bihicmVha3BvaW50KSB7XHJcbiAgICAgICAgICAgICAgLy8g0LTQvtCx0LDQstC70LXQvdC40LUg0YHQuNC90LXQuSDRgtGA0YPQsdC60Lgg0LTQu9GPINCy0YvQt9C+0LLQsCDQv9C+0L/QsNC/0LAg0L3QsCDQtNC10YHQutGC0L7Qv9C1XHJcbiAgICAgICAgICAgICAgdmFyIHBob25lQnRuQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgcGhvbmVCdG5Db250YWluZXIuY2xhc3NMaXN0LmFkZCgncGhvbmVCdG5Db250YWluZXInKTtcclxuICAgICAgICAgICAgICBwaG9uZUJ0bkNvbnRhaW5lci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImJsdWVQaG9uZVwiPjxkaXYgY2xhc3M9XCIgcGhvbmUtY2FsbCBjYmgtcGhvbmUgY2JoLWdyZWVuIGNiaC1zaG93IGV2ZXItcG9wdXAtYnRuIGNiaC1zdGF0aWNcIiBpZD1cImNsYmhfcGhvbmVfZGl2XCI+PGRpdiBjbGFzcz1cInBob25lSnNcIj48ZGl2IGNsYXNzPVwiY2JoLXBoLWNpcmNsZVwiPjwvZGl2PjxkaXYgY2xhc3M9XCJjYmgtcGgtY2lyY2xlLWZpbGxcIj48L2Rpdj48ZGl2IGNsYXNzPVwiY2JoLXBoLWltZy1jaXJjbGUxXCI+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBob25lQnRuQ29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHBob25lU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgICAgICAgICAgICBwaG9uZVN0eWxlcy5pbm5lckhUTUwgPSAnLnBob25lQnRuQ29udGFpbmVye3Bvc2l0aW9uOmZpeGVkOyByaWdodDogMTBweDtib3R0b206IDEwcHg7IHZpc2liaWxpdHk6aGlkZGVuO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7d2lkdGg6MjAwcHg7aGVpZ2h0OjIwMHB4O2N1cnNvcjpwb2ludGVyO3otaW5kZXg6OTk7LXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVaKDApOy13ZWJraXQtdHJhbnNpdGlvbjp2aXNpYmlsaXR5IC41czstbW96LXRyYW5zaXRpb246dmlzaWJpbGl0eSAuNXM7LW8tdHJhbnNpdGlvbjp2aXNpYmlsaXR5IC41czt0cmFuc2l0aW9uOnZpc2liaWxpdHkgLjVzfS5jYmgtcGhvbmUuY2JoLXNob3d7dmlzaWJpbGl0eTp2aXNpYmxlfUAtd2Via2l0LWtleWZyYW1lcyBmYWRlSW5SaWdodHswJXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMTAwJSwwLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgxMDAlLDAsMCl9MTAwJXtvcGFjaXR5OjE7LXdlYmtpdC10cmFuc2Zvcm06bm9uZTt0cmFuc2Zvcm06bm9uZX19QGtleWZyYW1lcyBmYWRlSW5SaWdodHswJXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMTAwJSwwLDApOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMTAwJSwwLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgxMDAlLDAsMCl9MTAwJXtvcGFjaXR5OjE7LXdlYmtpdC10cmFuc2Zvcm06bm9uZTstbXMtdHJhbnNmb3JtOm5vbmU7dHJhbnNmb3JtOm5vbmV9fUAtd2Via2l0LWtleWZyYW1lcyBmYWRlSW5SaWdodEJpZ3swJXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMjAwMHB4LDAsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDIwMDBweCwwLDApfTEwMCV7b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOm5vbmU7dHJhbnNmb3JtOm5vbmV9fUAtd2Via2l0LWtleWZyYW1lcyBmYWRlT3V0UmlnaHR7MCV7b3BhY2l0eToxfTEwMCV7b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDEwMCUsMCwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMTAwJSwwLDApfX1Aa2V5ZnJhbWVzIGZhZGVPdXRSaWdodHswJXtvcGFjaXR5OjF9MTAwJXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMTAwJSwwLDApOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMTAwJSwwLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgxMDAlLDAsMCl9fS5mYWRlT3V0UmlnaHR7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpmYWRlT3V0UmlnaHQ7YW5pbWF0aW9uLW5hbWU6ZmFkZU91dFJpZ2h0fS5jYmgtcGhvbmUuY2JoLXN0YXRpYzF7b3BhY2l0eTouNn0uY2JoLXBob25lLmNiaC1ob3ZlcjF7b3BhY2l0eToxfS5jYmgtcGgtY2lyY2xle3dpZHRoOjE2MHB4O2hlaWdodDoxNjBweDt0b3A6MjBweDtsZWZ0OjIwcHg7cG9zaXRpb246YWJzb2x1dGU7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDstd2Via2l0LWJvcmRlci1yYWRpdXM6MTAwJTstbW96LWJvcmRlci1yYWRpdXM6MTAwJTtib3JkZXItcmFkaXVzOjEwMCU7Ym9yZGVyOjJweCBzb2xpZCByZ2JhKDMwLDMwLDMwLC40KTtvcGFjaXR5Oi4xOy13ZWJraXQtYW5pbWF0aW9uOmNiaC1jaXJjbGUtYW5pbSAxLjJzIGluZmluaXRlIGVhc2UtaW4tb3V0Oy1tb3otYW5pbWF0aW9uOmNiaC1jaXJjbGUtYW5pbSAxLjJzIGluZmluaXRlIGVhc2UtaW4tb3V0Oy1tcy1hbmltYXRpb246Y2JoLWNpcmNsZS1hbmltIDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7LW8tYW5pbWF0aW9uOmNiaC1jaXJjbGUtYW5pbSAxLjJzIGluZmluaXRlIGVhc2UtaW4tb3V0O2FuaW1hdGlvbjpjYmgtY2lyY2xlLWFuaW0gMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dDstd2Via2l0LXRyYW5zaXRpb246YWxsIC41czstbW96LXRyYW5zaXRpb246YWxsIC41czstby10cmFuc2l0aW9uOmFsbCAuNXM7dHJhbnNpdGlvbjphbGwgLjVzfS5jYmgtcGhvbmUuY2JoLWFjdGl2ZSAuY2JoLXBoLWNpcmNsZTF7LXdlYmtpdC1hbmltYXRpb246Y2JoLWNpcmNsZS1hbmltIDEuMXMgaW5maW5pdGUgZWFzZS1pbi1vdXQhaW1wb3J0YW50Oy1tb3otYW5pbWF0aW9uOmNiaC1jaXJjbGUtYW5pbSAxLjFzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudDstbXMtYW5pbWF0aW9uOmNiaC1jaXJjbGUtYW5pbSAxLjFzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudDstby1hbmltYXRpb246Y2JoLWNpcmNsZS1hbmltIDEuMXMgaW5maW5pdGUgZWFzZS1pbi1vdXQhaW1wb3J0YW50O2FuaW1hdGlvbjpjYmgtY2lyY2xlLWFuaW0gMS4xcyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnR9LmNiaC1waG9uZS5jYmgtc3RhdGljIC5jYmgtcGgtY2lyY2xley13ZWJraXQtYW5pbWF0aW9uOmNiaC1jaXJjbGUtYW5pbSAyLjJzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudDstbW96LWFuaW1hdGlvbjpjYmgtY2lyY2xlLWFuaW0gMi4ycyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnQ7LW1zLWFuaW1hdGlvbjpjYmgtY2lyY2xlLWFuaW0gMi4ycyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnQ7LW8tYW5pbWF0aW9uOmNiaC1jaXJjbGUtYW5pbSAyLjJzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudDthbmltYXRpb246Y2JoLWNpcmNsZS1hbmltIDIuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQhaW1wb3J0YW50fS5jYmgtcGhvbmUuY2JoLWhvdmVyIC5jYmgtcGgtY2lyY2xle2JvcmRlci1jb2xvcjpyZ2JhKDAsMTc1LDI0MiwxKTtvcGFjaXR5Oi41fS5jYmgtcGhvbmUuY2JoLWdyZWVuLmNiaC1ob3ZlciAuY2JoLXBoLWNpcmNsZXtib3JkZXItY29sb3I6cmdiYSgxMTcsMjM1LDgwLDEpO29wYWNpdHk6LjV9LmNiaC1waG9uZS5jYmgtZ3JlZW4gLmNiaC1waC1jaXJjbGV7Ym9yZGVyLWNvbG9yOnJnYmEoMCwxNzUsMjQyLDEpO29wYWNpdHk6LjV9LmNiaC1waG9uZS5jYmgtZ3JheS5jYmgtaG92ZXIgLmNiaC1waC1jaXJjbGV7Ym9yZGVyLWNvbG9yOnJnYmEoMjA0LDIwNCwyMDQsMSk7b3BhY2l0eTouNX0uY2JoLXBob25lLmNiaC1ncmF5IC5jYmgtcGgtY2lyY2xle2JvcmRlci1jb2xvcjpyZ2JhKDExNywyMzUsODAsMSk7b3BhY2l0eTouNX0uY2JoLXBoLWNpcmNsZS1maWxse3dpZHRoOjEwMHB4O2hlaWdodDoxMDBweDt0b3A6NTBweDtsZWZ0OjUwcHg7cG9zaXRpb246YWJzb2x1dGU7YmFja2dyb3VuZC1jb2xvcjojMDAwOy13ZWJraXQtYm9yZGVyLXJhZGl1czoxMDAlOy1tb3otYm9yZGVyLXJhZGl1czoxMDAlO2JvcmRlci1yYWRpdXM6MTAwJTtib3JkZXI6MnB4IHNvbGlkIHRyYW5zcGFyZW50O29wYWNpdHk6LjE7LXdlYmtpdC1hbmltYXRpb246Y2JoLWNpcmNsZS1maWxsLWFuaW0gMi4zcyBpbmZpbml0ZSBlYXNlLWluLW91dDstbW96LWFuaW1hdGlvbjpjYmgtY2lyY2xlLWZpbGwtYW5pbSAyLjNzIGluZmluaXRlIGVhc2UtaW4tb3V0Oy1tcy1hbmltYXRpb246Y2JoLWNpcmNsZS1maWxsLWFuaW0gMi4zcyBpbmZpbml0ZSBlYXNlLWluLW91dDstby1hbmltYXRpb246Y2JoLWNpcmNsZS1maWxsLWFuaW0gMi4zcyBpbmZpbml0ZSBlYXNlLWluLW91dDthbmltYXRpb246Y2JoLWNpcmNsZS1maWxsLWFuaW0gMi4zcyBpbmZpbml0ZSBlYXNlLWluLW91dDstd2Via2l0LXRyYW5zaXRpb246YWxsIC41czstbW96LXRyYW5zaXRpb246YWxsIC41czstby10cmFuc2l0aW9uOmFsbCAuNXM7dHJhbnNpdGlvbjphbGwgLjVzfS5jYmgtcGhvbmUuY2JoLWFjdGl2ZSAuY2JoLXBoLWNpcmNsZS1maWxsey13ZWJraXQtYW5pbWF0aW9uOmNiaC1jaXJjbGUtZmlsbC1hbmltIDEuN3MgaW5maW5pdGUgZWFzZS1pbi1vdXQhaW1wb3J0YW50Oy1tb3otYW5pbWF0aW9uOmNiaC1jaXJjbGUtZmlsbC1hbmltIDEuN3MgaW5maW5pdGUgZWFzZS1pbi1vdXQhaW1wb3J0YW50Oy1tcy1hbmltYXRpb246Y2JoLWNpcmNsZS1maWxsLWFuaW0gMS43cyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnQ7LW8tYW5pbWF0aW9uOmNiaC1jaXJjbGUtZmlsbC1hbmltIDEuN3MgaW5maW5pdGUgZWFzZS1pbi1vdXQhaW1wb3J0YW50O2FuaW1hdGlvbjpjYmgtY2lyY2xlLWZpbGwtYW5pbSAxLjdzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudH0uY2JoLXBob25lLmNiaC1zdGF0aWMgLmNiaC1waC1jaXJjbGUtZmlsbHstd2Via2l0LWFuaW1hdGlvbjpjYmgtY2lyY2xlLWZpbGwtYW5pbSAyLjNzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudDstbW96LWFuaW1hdGlvbjpjYmgtY2lyY2xlLWZpbGwtYW5pbSAyLjNzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudDstbXMtYW5pbWF0aW9uOmNiaC1jaXJjbGUtZmlsbC1hbmltIDIuM3MgaW5maW5pdGUgZWFzZS1pbi1vdXQhaW1wb3J0YW50Oy1vLWFuaW1hdGlvbjpjYmgtY2lyY2xlLWZpbGwtYW5pbSAyLjNzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudDthbmltYXRpb246Y2JoLWNpcmNsZS1maWxsLWFuaW0gMi4zcyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnQ7b3BhY2l0eTowIWltcG9ydGFudH0gLmNiaC1waG9uZS5jYmgtaG92ZXIgLmNiaC1waC1jaXJjbGUtZmlsbHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwxNzUsMjQyLC41KTtvcGFjaXR5Oi43NSFpbXBvcnRhbnR9LmNiaC1waG9uZS5jYmgtZ3JlZW4uY2JoLWhvdmVyIC5jYmgtcGgtY2lyY2xlLWZpbGx7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDExNywyMzUsODAsLjUpO29wYWNpdHk6Ljc1IWltcG9ydGFudH0uY2JoLXBob25lLmNiaC1ncmVlbiAuY2JoLXBoLWNpcmNsZS1maWxse2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDE3NSwyNDIsLjUpO29wYWNpdHk6Ljc1IWltcG9ydGFudH0uY2JoLXBob25lLmNiaC1ncmF5LmNiaC1ob3ZlciAuY2JoLXBoLWNpcmNsZS1maWxse2JhY2tncm91bmQtY29sb3I6cmdiYSgyMDQsMjA0LDIwNCwuNSk7b3BhY2l0eTouNzUhaW1wb3J0YW50fS5jYmgtcGhvbmUuY2JoLWdyYXkgLmNiaC1waC1jaXJjbGUtZmlsbHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMTE3LDIzNSw4MCwuNSk7b3BhY2l0eTouNzUhaW1wb3J0YW50fS5jYmgtcGgtaW1nLWNpcmNsZTF7d2lkdGg6NjBweDtoZWlnaHQ6NjBweDt0b3A6NzBweDtsZWZ0OjcwcHg7cG9zaXRpb246YWJzb2x1dGU7YmFja2dyb3VuZC1pbWFnZTp1cmwoZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFESUFBQUF5Q0FZQUFBQWVQNGl4QUFBQUNYQklXWE1BQUFzVEFBQUxFd0VBbXB3WUFBQUJObWxEUTFCUWFHOTBiM05vYjNBZ1NVTkRJSEJ5YjJacGJHVUFBSGphclk2eFNzTlFGRURQaTZMaVVDc0VjWEI0a3lnb3R1cGd4cVF0UlJDczFTSEoxcVNoU21rU1hsN1Zmb1NqV3djWGQ3L0F5VkZ3VVB3Qy8wQng2dUFRSVlPRENKN3AzTVBsY3NHbzJIV25ZWlJoRUd2VmJqclM5WHc1KzhRTVV3RFFDYlBVYnJVT0FPSWtqdmpCNXlzQzRIblRyanNOL3NaOG1Db05USUR0YnBTRklDcEEvMEtuR3NRWU1JTitxa0hjQWFZNmFkZEFQQUNsWHU0dlFDbkkvUTBvS2RmelFYd0Facy8xZkREbUFEUElmUVV3ZFhTcEFXcEpPbEpudlZNdHE1WmxTYnViQkpFOEhtVTZHbVJ5UHc0VGxTYXFvNk11a1A4SHdHSysyRzQ2Y3ExcVdYdnIvRE91NTh2YzNvOFFnRmg2TEZwQk9GVG4zeXFNbmQvbjRzWjRHUTV2WVhwU3ROMHJ1Tm1BaGV1aXJWYWh2QVgzNHkvQXhrLzk2RnBQWWdBQUFDQmpTRkpOQUFCNkpRQUFnSU1BQVBuL0FBQ0E2QUFBVWdnQUFSVllBQUE2bHdBQUYyL1hXaCtRQUFBQi9FbEVRVlI0MnV5YTdXM0NNQkNHMzFRTTRBMWFOZ2dUbEc2UWJwQk1rSFlDMUFsb0o0Qk9BQnVFRGNnR3RCT0VUbkQ5YzFFUkNIL2x3eGVhVjhvUEZHUDg2SHkrRHhNUkVXNUJkN2dSalNEU05HbjQvUmlBT3ZtOEMwWkNSRDVQU2tRVlhTcjFuSy94RTNtY1dpbUExWlYzSllCWkNJTzRnaVFBTm9ZeE13WVM2K3hLWTRsVDVkSlByZVdaWSt1c3BxU0NLUFlOMjdHSlZCRFhoZVZTUWU0OTRrc2lFV1R1TVhjdTFkbGQ5U0FSeERYMU9BSjRsZ2p5NHpEbkZzQzA3NkE0YWRFaVJ3QVpnNGhPVVNwTm9Dc0JQREdNK0hxa05HeW5ZQkN1SUx1V2orZGdXeXNHc05lOG53TDRHc3JXMG0yZnhaQnE5clcwck5jWDVNT1E5ZVpEOEpGYWhjRzVnL2lLVDY3MWFsR0FZUWdncFlXdnBFUFlXclUvSERUT2ZlUklYMHEyU0wzUU40dEdoWkp1a1ZvYlF5WFlXdzdXdExES0RJdU0rWlN6c2N5Q0U5UEN5NUl0dEN2blpOYWVpR0xOSEt1ejhaVmgvTVhUVnUvMXhRS21JcUxFQXVKMGZObzNpRzVCNTFvU2tlS25zQmkvNGJHOWdZQi9sQ3l0VTVHOURyeUZXKzNHbStKTHdVN2VoYkpyd1RqcTRESlU4YkhjVmJFVjlkWFhxcVA2dXFPNWUyL1FaUllKcHF1MklVQUE0QjN0WHZ4OGhnS3AwNVFaVzZkSnFyTFROa0I2dnJSVVJMUndQSHF0WWdrQzNjTFdRQWNEUUdHS0gxM0ZFUi9OQVR6aTc4NitCUEROam0xZE1rZmpuMnBHa0JIa2Y0RDhEZ0JKRHVESHg5Qk4rZ0FBQUFCSlJVNUVya0pnZ2c9PSk7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDMwLDMwLDMwLC4xKTtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlciBjZW50ZXI7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0Oy13ZWJraXQtYm9yZGVyLXJhZGl1czoxMDAlOy1tb3otYm9yZGVyLXJhZGl1czoxMDAlO2JvcmRlci1yYWRpdXM6MTAwJTtib3JkZXI6MnB4IHNvbGlkIHRyYW5zcGFyZW50O29wYWNpdHk6Ljc7LXdlYmtpdC1hbmltYXRpb246Y2JoLWNpcmNsZS1pbWctYW5pbSAxcyBpbmZpbml0ZSBlYXNlLWluLW91dDstbW96LWFuaW1hdGlvbjpjYmgtY2lyY2xlLWltZy1hbmltIDFzIGluZmluaXRlIGVhc2UtaW4tb3V0Oy1tcy1hbmltYXRpb246Y2JoLWNpcmNsZS1pbWctYW5pbSAxcyBpbmZpbml0ZSBlYXNlLWluLW91dDstby1hbmltYXRpb246Y2JoLWNpcmNsZS1pbWctYW5pbSAxcyBpbmZpbml0ZSBlYXNlLWluLW91dDthbmltYXRpb246Y2JoLWNpcmNsZS1pbWctYW5pbSAxcyBpbmZpbml0ZSBlYXNlLWluLW91dH0uY2JoLXBob25lLmNiaC1hY3RpdmUgLmNiaC1waC1pbWctY2lyY2xlMXstd2Via2l0LWFuaW1hdGlvbjpjYmgtY2lyY2xlLWltZy1hbmltIDFzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudDstbW96LWFuaW1hdGlvbjpjYmgtY2lyY2xlLWltZy1hbmltIDFzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudDstbXMtYW5pbWF0aW9uOmNiaC1jaXJjbGUtaW1nLWFuaW0gMXMgaW5maW5pdGUgZWFzZS1pbi1vdXQhaW1wb3J0YW50Oy1vLWFuaW1hdGlvbjpjYmgtY2lyY2xlLWltZy1hbmltIDFzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudDthbmltYXRpb246Y2JoLWNpcmNsZS1pbWctYW5pbSAxcyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnR9LmNiaC1waG9uZS5jYmgtc3RhdGljIC5jYmgtcGgtaW1nLWNpcmNsZTF7LXdlYmtpdC1hbmltYXRpb246Y2JoLWNpcmNsZS1pbWctYW5pbSAwcyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnQ7LW1vei1hbmltYXRpb246Y2JoLWNpcmNsZS1pbWctYW5pbSAwcyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnQ7LW1zLWFuaW1hdGlvbjpjYmgtY2lyY2xlLWltZy1hbmltIDBzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudDstby1hbmltYXRpb246Y2JoLWNpcmNsZS1pbWctYW5pbSAwcyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnQ7YW5pbWF0aW9uOmNiaC1jaXJjbGUtaW1nLWFuaW0gMHMgaW5maW5pdGUgZWFzZS1pbi1vdXQhaW1wb3J0YW50fS5jYmgtcGhvbmUuY2JoLWhvdmVyIC5jYmgtcGgtaW1nLWNpcmNsZTF7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMTc1LDI0MiwxKX0uY2JoLXBob25lLmNiaC1ncmVlbi5jYmgtaG92ZXIgLmNiaC1waC1pbWctY2lyY2xlMTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMTE3LDIzNSw4MCwxKX0uY2JoLXBob25lLmNiaC1ncmVlbiAuY2JoLXBoLWltZy1jaXJjbGUxe2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDE3NSwyNDIsMSl9LmNiaC1waG9uZS5jYmgtZ3JlZW4gLmNiaC1waC1pbWctY2lyY2xlMXtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwxNzUsMjQyLDEpfS5jYmgtcGhvbmUuY2JoLWdyYXkuY2JoLWhvdmVyIC5jYmgtcGgtaW1nLWNpcmNsZTF7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDIwNCwyMDQsMjA0LDEpfS5jYmgtcGhvbmUuY2JoLWdyYXkgLmNiaC1waC1pbWctY2lyY2xlMXtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMTE3LDIzNSw4MCwxKX1ALW1vei1rZXlmcmFtZXMgY2JoLWNpcmNsZS1hbmltezAley1tb3otdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBzY2FsZSgwLjUpIHNrZXcoMWRlZyk7b3BhY2l0eTouMTstbW96LW9wYWNpdHk6LjE7LXdlYmtpdC1vcGFjaXR5Oi4xOy1vLW9wYWNpdHk6LjF9MzAley1tb3otdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBzY2FsZSguNykgc2tldygxZGVnKTtvcGFjaXR5Oi41Oy1tb3otb3BhY2l0eTouNTstd2Via2l0LW9wYWNpdHk6LjU7LW8tb3BhY2l0eTouNX0xMDAley1tb3otdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpO29wYWNpdHk6LjY7LW1vei1vcGFjaXR5Oi42Oy13ZWJraXQtb3BhY2l0eTouNjstby1vcGFjaXR5Oi4xfX1ALXdlYmtpdC1rZXlmcmFtZXMgY2JoLWNpcmNsZS1hbmltezAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBzY2FsZSgwLjUpIHNrZXcoMWRlZyk7LXdlYmtpdC1vcGFjaXR5Oi4xfTMwJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoLjcpIHNrZXcoMWRlZyk7LXdlYmtpdC1vcGFjaXR5Oi41fTEwMCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDBkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyk7LXdlYmtpdC1vcGFjaXR5Oi4xfX1ALW8ta2V5ZnJhbWVzIGNiaC1jaXJjbGUtYW5pbXswJXstby10cmFuc2Zvcm06cm90YXRlKDBkZWcpIGtzY2FsZSgwLjUpIHNrZXcoMWRlZyk7LW8tb3BhY2l0eTouMX0zMCV7LW8tdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBzY2FsZSguNykgc2tldygxZGVnKTstby1vcGFjaXR5Oi41fTEwMCV7LW8tdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpOy1vLW9wYWNpdHk6LjF9fUBrZXlmcmFtZXMgY2JoLWNpcmNsZS1hbmltezAle3RyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMC41KSBza2V3KDFkZWcpO29wYWNpdHk6LjF9MzAle3RyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoLjcpIHNrZXcoMWRlZyk7b3BhY2l0eTouNX0xMDAle3RyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMSkgc2tldygxZGVnKTtvcGFjaXR5Oi4xfX1ALW1vei1rZXlmcmFtZXMgY2JoLWNpcmNsZS1maWxsLWFuaW17MCV7LW1vei10cmFuc2Zvcm06cm90YXRlKDBkZWcpIHNjYWxlKDAuNykgc2tldygxZGVnKTtvcGFjaXR5Oi4yfTUwJXstbW96LXRyYW5zZm9ybTpyb3RhdGUoMGRlZykgLW1vei1zY2FsZSgxKSBza2V3KDFkZWcpO29wYWNpdHk6LjJ9MTAwJXstbW96LXRyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMC43KSBza2V3KDFkZWcpO29wYWNpdHk6LjJ9fUAtd2Via2l0LWtleWZyYW1lcyBjYmgtY2lyY2xlLWZpbGwtYW5pbXswJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMC43KSBza2V3KDFkZWcpO29wYWNpdHk6LjJ9NTAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpO29wYWNpdHk6LjJ9MTAwJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMC43KSBza2V3KDFkZWcpO29wYWNpdHk6LjJ9fUAtby1rZXlmcmFtZXMgY2JoLWNpcmNsZS1maWxsLWFuaW17MCV7LW8tdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBzY2FsZSgwLjcpIHNrZXcoMWRlZyk7b3BhY2l0eTouMn01MCV7LW8tdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpO29wYWNpdHk6LjJ9MTAwJXstby10cmFuc2Zvcm06cm90YXRlKDBkZWcpIHNjYWxlKDAuNykgc2tldygxZGVnKTtvcGFjaXR5Oi4yfX1Aa2V5ZnJhbWVzIGNiaC1jaXJjbGUtZmlsbC1hbmltezAle3RyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMC43KSBza2V3KDFkZWcpO29wYWNpdHk6LjJ9NTAle3RyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMSkgc2tldygxZGVnKTtvcGFjaXR5Oi4yfTEwMCV7dHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBzY2FsZSgwLjcpIHNrZXcoMWRlZyk7b3BhY2l0eTouMn19QGtleWZyYW1lcyBjYmgtY2lyY2xlLWltZy1hbmltezAle3RyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMSkgc2tldygxZGVnKX0xMCV7dHJhbnNmb3JtOnJvdGF0ZSgtMjVkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyl9MjAle3RyYW5zZm9ybTpyb3RhdGUoMjVkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyl9MzAle3RyYW5zZm9ybTpyb3RhdGUoLTI1ZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpfTQwJXt0cmFuc2Zvcm06cm90YXRlKDI1ZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpfTEwMCUsNTAle3RyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMSkgc2tldygxZGVnKX19QC1tb3ota2V5ZnJhbWVzIGNiaC1jaXJjbGUtaW1nLWFuaW17MCV7dHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpfTEwJXstbW96LXRyYW5zZm9ybTpyb3RhdGUoLTI1ZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpfTIwJXstbW96LXRyYW5zZm9ybTpyb3RhdGUoMjVkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyl9MzAley1tb3otdHJhbnNmb3JtOnJvdGF0ZSgtMjVkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyl9NDAley1tb3otdHJhbnNmb3JtOnJvdGF0ZSgyNWRlZykgc2NhbGUoMSkgc2tldygxZGVnKX0xMDAlLDUwJXstbW96LXRyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMSkgc2tldygxZGVnKX19QC13ZWJraXQta2V5ZnJhbWVzIGNiaC1jaXJjbGUtaW1nLWFuaW17MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDBkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyl9MTAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtMjVkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyl9MjAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgyNWRlZykgc2NhbGUoMSkgc2tldygxZGVnKX0zMCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC0yNWRlZykgc2NhbGUoMSkgc2tldygxZGVnKX00MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDI1ZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpfTEwMCUsNTAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpfX1ALW8ta2V5ZnJhbWVzIGNiaC1jaXJjbGUtaW1nLWFuaW17MCV7LW8tdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpfTEwJXstby10cmFuc2Zvcm06cm90YXRlKC0yNWRlZykgc2NhbGUoMSkgc2tldygxZGVnKX0yMCV7LW8tdHJhbnNmb3JtOnJvdGF0ZSgyNWRlZykgc2NhbGUoMSkgc2tldygxZGVnKX0zMCV7LW8tdHJhbnNmb3JtOnJvdGF0ZSgtMjVkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyl9NDAley1vLXRyYW5zZm9ybTpyb3RhdGUoMjVkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyl9MTAwJSw1MCV7LW8tdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpfX0uY2JoLXBoLWltZy1jaXJjbGUxIHt9LmNiaC1waG9uZS5jYmgtZ3JlZW4gLmNiaC1waC1jaXJjbGUge2JvcmRlci1jb2xvcjogcmdiYSgwLCAxNzUsIDI0MiwgMSl9LmNiaC1waG9uZS5jYmgtZ3JlZW4gLmNiaC1waC1jaXJjbGUtZmlsbCB7YmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAxNzUsIDI0MiwgMSk7fS5jYmgtcGhvbmUuY2JoLWdyZWVuIC5jYmgtcGgtaW1nLWNpcmNsZTEge2JhY2tncm91bmQtY29sb3I6cmdiYSgwLCAxNzUsIDI0MiwgMSk7fWJvZHksIGRpdiwgZGwsIGR0LCBkZCwgdWwsIG9sLCBsaSwgbmF2LCBoMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwcmUsIGNvZGUsIGZvcm0sIGZpZWxkc2V0LCBsZWdlbmQsIGlucHV0LCBidXR0b24sIHRleHRhcmVhLCBwLCBibG9ja3F1b3RlLCB0aCwgdGQsIGEgey13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGNlbnRlcjstbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGNlbnRlcjstby10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgY2VudGVyO3RyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBjZW50ZXI7fUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICcgKyBicmVha3BvaW50ICsgJ3B4KSB7I2NsYmhfcGhvbmVfZGl2e2Rpc3BsYXk6IG5vbmUgIWltcG9ydGFudDt9fSc7XHJcbiAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpLmFwcGVuZENoaWxkKHBob25lU3R5bGVzKVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcblxyXG4gICAgICAgICAgICAgIHZhciBkZXNrdG9wUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvbmVUaGlzJyksXHJcbiAgICAgICAgICAgICAgICAgIG1vYmlsZVBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb25lTW9iaWxlVGhpcycpO1xyXG5cclxuICAgICAgICAgICAgICB2YXIgaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3VycycpLCBtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pbnV0ZXMnKSxcclxuICAgICAgICAgICAgICAgICAgcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWNvbmRzJyk7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChoICYmIG0gJiYgcykge1xyXG4gICAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQstGB0LUg0LfQvdCw0YfQtdC90LjRjyAo0YfQsNGB0Ysv0LzQuNC90YPRgtGLL9GB0LXQutGD0L3QtNGLKSDRgdGD0YnQtdGB0LLRgtGD0Y7Rgiwg0YLQvtCz0LTQsCDRgdGA0LDQsdCw0YLRi9Cy0LDQtdGCINGC0LDQudC80LXRgFxyXG4gICAgICAgICAgICAgICAgICBpbml0aWFsaXplVGltZXIoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKGRlc2t0b3BQb3B1cCkge1xyXG4gICAgICAgICAgICAgICAgICBjcmVhdGVPdmVybGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgIGFkZFBvcHVwU3R5bGUoKTtcclxuICAgICAgICAgICAgICAgICAgYWRkUGhvbmVCdG4oYnJlYWtwb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5waG9uZUJ0bkNvbnRhaW5lcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd1BvcHVwKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGNyZWF0ZU92ZXJsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgYWRkTW9iaWxlUG9wdXBTdHlsZSgpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmIChkZXNrdG9wUG9wdXAgfHwgbW9iaWxlUG9wdXApIHtcclxuICAgICAgICAgICAgICAgICAgLy/QtdGB0LvQuCDRgyDQvdCw0YEg0LXRgdGC0YwgI2Nsb25lVGhpcyDQuNC70LggI2Nsb25lTW9iaWxlVGhpcywg0YLQvtCz0LTQsCDQstGB0LUg0YTRg9C90LrRhtC40Lgg0L3QuNC20LUg0LLRi9C/0L7Qu9C90Y/RjtGC0YHRj1xyXG5cclxuICAgICAgICAgICAgICAgICAgY3JlYXRlTW9kYWxCb2R5KGJyZWFrcG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICBtb2RhbFBvc2l0aW9uKHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ldmVyLXBvcHVwX19jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZVBvcHVwKTtcclxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmV2ZXItcG9wdXBfX2lubmVyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBub3RIaWRlKTtcclxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmV2ZXItcG9wdXAnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGVQb3B1cCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICB2YXIgbW9kYWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZXZlci1wb3B1cC1idG4nKTtcclxuICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb2RhbEJ0bi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgbW9kYWxCdG4gJiYgbW9kYWxCdG5baV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93UG9wdXApO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC8vINGA0LDQsdC+0LDRgtC10YIg0LXRgdC70Lgg0YMg0L3QsNGBINC10YHRgtGMINC60LvQsNGB0YEgLmNoZWNrX19idG5cclxuICAgICAgICAgICAgICB2YXIgY2hlY2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNoZWNrX19idG5cIik7XHJcbiAgICAgICAgICAgICAgY2hlY2tCdG4gJiYgY2hlY2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0NvZGUpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vINC/0YDQuCDQtNC+0LrRg9C80LXQvdGCINGA0LXQtNC4INCy0YvQt9GL0LLQsNC10YLRgdGPINGE0YPQvdC60YbQuNGPIGluaXQsINC+0L/QuNGB0LDQvdCw0Y8g0LLRi9GI0LVcclxuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0KTtcclxuXHJcbiAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIC8v0L/RgNC4INGA0LXRgdCw0LnQt9C1INC/0LXRgNC10YHRh9C40YLRi9Cy0LDQtdC8INC/0L7Qt9C40YbQuNC+0L3QuNGA0L7QstCw0L3QuNC1INC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwXHJcbiAgICAgICAgICAgICAgbW9kYWxQb3NpdGlvbih3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZVRpbWVyKCkge1xyXG5cclxuICAgICAgICAgICAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaGV5dGltZXJcIikpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIHRpbWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBob3VyczogMCxcclxuICAgICAgICAgICAgICAgICAgICAgIG1pbnV0ZXM6IDI3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgc2Vjb25kczogMFxyXG4gICAgICAgICAgICAgICAgICB9LCBkaWZmZXJlbnQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIHRpbWUgPSB0aW1lLmhvdXJzICogMzYwMCArIHRpbWUubWludXRlcyAqIDYwICsgdGltZS5zZWNvbmRzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0aW1lXCIsIHRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImhleXRpbWVyXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImRpZmZlcmVudFwiLCBkaWZmZXJlbnQpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgdGltZXJTZXR0aW5ncygpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIHRpbWVyU2V0dGluZ3MoKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHRpbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGltZScpLFxyXG4gICAgICAgICAgICAgICAgICBkaWZmZXJlbnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGlmZmVyZW50JykgPT09IFwidHJ1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICBob3VycyA9IHBhcnNlSW50KHRpbWUgLyAzNjAwLCAxMCksXHJcbiAgICAgICAgICAgICAgICAgIG1pbnV0ZXMgPSBwYXJzZUludCgodGltZSAtIGhvdXJzICogMzYwMCApIC8gNjAsIDEwKSxcclxuICAgICAgICAgICAgICAgICAgc2Vjb25kcyA9IHBhcnNlSW50KHRpbWUgJSA2MCwgMTApO1xyXG5cclxuICAgICAgICAgICAgICBtaW51dGVzID0gbWludXRlcyA8IDEwID8gXCIwXCIgKyBtaW51dGVzIDogXCJcIiArIG1pbnV0ZXM7XHJcbiAgICAgICAgICAgICAgc2Vjb25kcyA9IHNlY29uZHMgPCAxMCA/IFwiMFwiICsgc2Vjb25kcyA6IFwiXCIgKyBzZWNvbmRzO1xyXG4gICAgICAgICAgICAgIGhvdXJzID0gaG91cnMgPCAxMCA/IFwiMFwiICsgaG91cnMgOiBcIlwiICsgaG91cnM7XHJcblxyXG4gICAgICAgICAgICAgIHZhciBob3Vyc0hUTUwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaG91cnNcIik7XHJcbiAgICAgICAgICAgICAgdmFyIG1pbnV0ZXNIVE1MID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1pbnV0ZXNcIik7XHJcbiAgICAgICAgICAgICAgdmFyIHNlY29uZHNIVE1MID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNlY29uZHNcIik7XHJcblxyXG4gICAgICAgICAgICAgIGlmICgtLXRpbWUgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiaGV5dGltZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKGRpZmZlcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICBzZWNvbmRzID0gc2Vjb25kcy5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgbWludXRlcyA9IG1pbnV0ZXMuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgIGhvdXJzID0gaG91cnMuc3BsaXQoXCJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICBkb3VibGVGaWxsaW5nKGhvdXJzSFRNTCwgaG91cnMpO1xyXG4gICAgICAgICAgICAgICAgICBkb3VibGVGaWxsaW5nKG1pbnV0ZXNIVE1MLCBtaW51dGVzKTtcclxuICAgICAgICAgICAgICAgICAgZG91YmxlRmlsbGluZyhzZWNvbmRzSFRNTCwgc2Vjb25kcyk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgZmlsbGluZyhob3Vyc0hUTUwsIGhvdXJzKTtcclxuICAgICAgICAgICAgICAgICAgZmlsbGluZyhtaW51dGVzSFRNTCwgbWludXRlcyk7XHJcbiAgICAgICAgICAgICAgICAgIGZpbGxpbmcoc2Vjb25kc0hUTUwsIHNlY29uZHMpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0aW1lXCIsIHRpbWUpO1xyXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQodGltZXJTZXR0aW5ncywgMTAwMCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZnVuY3Rpb24gZmlsbGluZyhvYmosIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgb2JqW2ldLmlubmVySFRNTCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBkb3VibGVGaWxsaW5nKG9iaiwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICBvYmpbaV0uaW5uZXJIVE1MID0gdmFsdWVbaSAlIDJdO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaW5pdGlhdGUoKTtcclxuXHJcbiAgfSkoKTtcclxuLy9ldmVyYWQgZW5kXHJcblxyXG5cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICBwbHlyLnNldHVwKCk7XHJcblxyXG5cclxuXHJcbiAgdmFyIGV2U3ZnQXJyYXkgPSAkKCcuZXYtY29tcG9zaXRpb25fX3N2ZycpLFxyXG4gICAgICBldkl0ZW1zQXJyYXkgPSAkKCcuZXYtY29tcG9zaXRpb25fX2l0ZW0tZGVzY3JpcHRpb24nKSxcclxuICAgICAgZXZTdmdBY3RpdmU9J2V2LWNvbXBvc2l0aW9uX19zdmdfYWN0aXZlJyxcclxuICAgICAgZXZSb3VuZFNob3c9J2V2LWNvbXBvc2l0aW9uX19jZW50ZXJfcm91bmRfc2hvdycsXHJcbiAgICAgIGV2QnVmZmVyVGV4dD0nJyxcclxuICAgICAgZXZSb3VuZD0nLmV2LWNvbXBvc2l0aW9uX19jZW50ZXJfcm91bmQnLFxyXG4gICAgICBldkl0ZW1GdWxsSGVpZ2h0PSdldi1jb21wb3NpdGlvbl9faXRlbS1mdWxsX2hlaWdodCc7XHJcblxyXG5cclxuICAkKCdwYXRoJykuaG92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgcGFyZW50U3ZnID0gJCh0aGlzKS5wYXJlbnRzKCcuZXYtY29tcG9zaXRpb25fX3N2ZycpLFxyXG4gICAgICAgICAgZXZJbmRleFN2ZyA9IGV2U3ZnQXJyYXkuaW5kZXgocGFyZW50U3ZnKTtcclxuXHJcbiAgICAgIHBhcmVudFN2Zy5zaWJsaW5ncygnLmV2LWNvbXBvc2l0aW9uX19zdmcnKS5yZW1vdmVDbGFzcyhldlN2Z0FjdGl2ZSk7XHJcbiAgICAgICQoZXZSb3VuZCkudGV4dCgkKGV2SXRlbXNBcnJheVtldkluZGV4U3ZnXSkudGV4dCgpKS5yZW1vdmVDbGFzcyhldlJvdW5kU2hvdyk7XHJcbiAgICAgIGV2QnVmZmVyVGV4dD0kKGV2SXRlbXNBcnJheVtldkluZGV4U3ZnXSkudGV4dCgpO1xyXG5cclxuICAgICAgaWYgKHBhcmVudFN2Zy5oYXNDbGFzcyhldlN2Z0FjdGl2ZSkpIHtcclxuICAgICAgICAgIHBhcmVudFN2Zy5yZW1vdmVDbGFzcyhldlN2Z0FjdGl2ZSk7XHJcbiAgICAgICAgICAkKGV2Um91bmQpLnRleHQoJycpLmFkZENsYXNzKGV2Um91bmRTaG93KTtcclxuICAgICAgICAgIGV2QnVmZmVyVGV4dD0nJztcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICAgIHBhcmVudFN2Zy5hZGRDbGFzcyhldlN2Z0FjdGl2ZSk7XHJcbiAgICAgIH1cclxuICB9KTtcclxuXHJcbiAgJCgnLmV2LWNvbXBvc2l0aW9uX19pdGVtJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgJCh0aGlzKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKGV2SXRlbUZ1bGxIZWlnaHQpO1xyXG4gICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKGV2SXRlbUZ1bGxIZWlnaHQpO1xyXG4gIH0pO1xyXG5cclxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsd2luZG93U2l6ZSk7XHJcblxyXG4gIGZ1bmN0aW9uIHdpbmRvd1NpemUoKXtcclxuICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9ICcxMTk5Jyl7XHJcbiAgICAgICAgICAkKGV2Um91bmQpLnRleHQoJycpLmFkZENsYXNzKGV2Um91bmRTaG93KTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICAgIGlmKGV2QnVmZmVyVGV4dCE9PScnKXtcclxuICAgICAgICAgICAgICAkKGV2Um91bmQpLnRleHQoZXZCdWZmZXJUZXh0KS5yZW1vdmVDbGFzcyhldlJvdW5kU2hvdyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG5cclxuLy/QutC+0LQg0LTQu9GPINGA0L7Qt9Cy0LXRgNGC0YvQstCw0L3QuNGPINGC0LXQutGB0YLQsFxyXG4oZnVuY3Rpb24oKXtcclxuICB2YXJcclxuICAgIHRleHQgPSAkKCcuYXJ0aWNsZV9fdGV4dC1ib3hfdmlzaWJsZScpLFxyXG4gICAgaGVpZ2h0ID0gdGV4dC5oZWlnaHQoKSxcclxuICAgIGJ1dHRvbiA9ICQoJyNhcnRpY2xlX19idXR0b24nKSxcclxuICAgIHNoYWRvdyA9ICQoJy5zZWN0aW9uNiAuYXJ0aWNsZV9fYnV0dG9uLWJveF9fc2hhZG93Jyk7XHJcblxyXG4gIHRleHQuYWRkQ2xhc3MoJ2ZpY3NlZF9oJylcclxuICAgIGJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICBpZiAoICF0ZXh0Lmhhc0NsYXNzKCdhdXRvX2gnKSApIHtcclxuICAgICAgICB0ZXh0LmNzcygnaGVpZ2h0JyxoZWlnaHQpO1xyXG4gICAgICAgIHNoYWRvdy5hbmltYXRlKHsnb3BhY2l0eSc6JzAnfSwgNTAwKTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgdGV4dC5jc3MoJ2hlaWdodCcsJzIyM3B4Jyk7XHJcbiAgICAgICAgc2hhZG93LmFuaW1hdGUoeydvcGFjaXR5JzonMSd9LCA1MDApXHJcbiAgICAgIH1cclxuICAgICAgYnV0dG9uLnRvZ2dsZUNsYXNzKCdhcnRpY2xlX19idXR0b25fMTgwJyk7XHJcbiAgICAgIHRleHQudG9nZ2xlQ2xhc3MoJ2F1dG9faCcpO1xyXG4gICAgfSlcclxufSkoKTtcclxuXHJcblxyXG4vL9C60L7QtCDQtNC70Y8g0YDQvtC30LLQtdGA0YLRi9Cy0LDQvdC40Y8g0YLQtdC60YHRgtCwINGB0LvQsNC50LTQtdGA0L7QslxyXG52YXIgY2hhbmdlSGVpZ3RoO1xyXG4oZnVuY3Rpb24oKXtcclxuICB2YXJcclxuICBzZWMxMFNsaWRJdGVtcyA9ICQoJy5zZWN0aW9uMTAtc2xpZGVyX19kZXNjYy1ib3gnKSxcclxuICBzaGFkb3cgPSAkKCcuc2VjdGlvbjEwIC5hcnRpY2xlX19idXR0b24tYm94X19zaGFkb3cnKTtcclxuICBcclxuICAvL9C30LDQv9C40YjQuNC8INCyINCw0YLRgNC40LHRg9GCICdkYXRhLXRvdGFsX2hlaWdodCDQvtGA0LjQs9C40L3QsNC70YzQvdGD0Y4g0LLRi9GB0L7RgtGDINC60LDQttC00L7Qs9C+INC10LvQtdC80LXQvdGC0LBcclxuICBmb3IodmFyIGk9MDsgaTxzZWMxMFNsaWRJdGVtcy5sZW5ndGg7IGkrKyl7XHJcbiAgICB2YXIgY3VycmVudCA9ICQoc2VjMTBTbGlkSXRlbXNbaV0pO1xyXG4gICAgdmFyIGl0ZW1IZWlnaHQgPSBjdXJyZW50LmhlaWdodCgpKydweCc7XHJcblxyXG4gICAgY3VycmVudC5jc3MoJ2hlaWdodCcsICcxNzJweCcpO1xyXG4gICAgY3VycmVudC5hdHRyKCdkYXRhLXRvdGFsX2hlaWdodCcsIGl0ZW1IZWlnaHQpXHJcbiAgfVxyXG4gIC8v0L/RgNC40LLQtdC00LXQvCDRgdGC0LjQu9C4INGB0LvQsNC50LTQtdGA0LAg0LIg0L/QvtGA0Y/QtNC+0Log0L/QvtGB0LvQtSDRgtC+0LPQviDQutCw0Log0LjRgdGF0L7QtNC90LDRjyDQstGL0YHQvtGC0LAg0YHQvtGF0YDQsNC90LXQvdCwXHJcbiAgJCgnLnNlY3Rpb24xMC1zbGlkZXJfX2l0ZW0nKS5hZGRDbGFzcygnc2VjdGlvbjEwX19hY3RpdmUtc2xpZGVyJyk7XHJcblxyXG4gIGNoYW5nZUhlaWd0aCA9IGZ1bmN0aW9uIGNoYW5nZUhlaWd0aChidXR0b24pe1xyXG4gIFxyXG4gICAgdmFyIGJsb2NrID0gJChidXR0b24pLnBhcmVudCgpLnNpYmxpbmdzKCcuc2VjdGlvbjEwLXNsaWRlcl9fZGVzY2MtYm94Jyk7XHJcbiAgICB2YXIgaGVpZ2h0ID0gJChibG9jaykuYXR0cignZGF0YS10b3RhbF9oZWlnaHQnKTtcclxuICAgIFxyXG4gICAgaWYgKCAhYmxvY2suaGFzQ2xhc3MoJ2F1dG9faCcpICkge1xyXG4gICAgICBibG9jay5jc3MoJ2hlaWdodCcsaGVpZ2h0KTtcclxuICAgICAgc2hhZG93LnRvZ2dsZUNsYXNzKCdvcGFjaXR5X3NoYWRvdycpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIGJsb2NrLmNzcygnaGVpZ2h0JywnMTcycHgnKTtcclxuICAgICAgc2hhZG93LnRvZ2dsZUNsYXNzKCdvcGFjaXR5X3NoYWRvdycpO1xyXG4gICAgfVxyXG4gICAgJChidXR0b24pLnRvZ2dsZUNsYXNzKCdhcnRpY2xlX19idXR0b25fMTgwJyk7XHJcbiAgICBibG9jay50b2dnbGVDbGFzcygnYXV0b19oJyk7XHJcbiAgfVxyXG5cclxuICAkKCcuc2VjdGlvbjEwX19kcm9wLWJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBjaGFuZ2VIZWlndGgodGhpcyk7XHJcbiAgfSlcclxufSkoKTtcclxuXHJcbi8vc2xpZGVyMVxyXG4oZnVuY3Rpb24oKXtcclxuXHJcbiAgdmFyIHNsaWRMaXN0ID0gJCgnLnNlY3Rpb24yLXNsaWRlci1saXN0Jyk7XHJcbiAgdmFyIHNsaWRzID0gJCgnLnNlY3Rpb24yLXNsaWRlcl9faXRlbScpO1xyXG4gIHZhciBzbGlkc0Nsb25lID0gc2xpZHMuY2xvbmUoKTtcclxuICB2YXIgc2xpZGVyTWFya3MgPSAkKCcuc2xpZGUyX19tYXJrJyk7XHJcblxyXG4gIGZvcih2YXIgaT0wOyBzbGlkZXJNYXJrcy5sZW5ndGg+aTsgaSsrKXtcclxuICAgIHZhciBjdXJyZW50ID0gc2xpZGVyTWFya3NbaV07XHJcbiAgICAkKGN1cnJlbnQpLmF0dHIoJ2RhdGEtc2xpZGVyX251bWJlcicsIGkrMSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gY2hhbmdlU2xpZGUodGhhdCl7XHJcblxyXG4gICAgaWYgKCEkKHRoYXQpLmhhc0NsYXNzKCdhY3RpdmUtc2xpZGUnKSkge1xyXG4gICAgICB2YXIgY2xpY2VkID0gJCh0aGF0KS5hdHRyKCdkYXRhLXNsaWRlcl9udW1iZXInKTtcclxuICAgICAgdmFyIGNlbnRlclNsaWRlID0gJChzbGlkc1sxXSk7XHJcblxyXG4gICAgICBzbGlkZXJNYXJrcy5yZW1vdmVDbGFzcygnYWN0aXZlLXNsaWRlJyk7XHJcbiAgICAgICQodGhhdCkuYWRkQ2xhc3MoJ2FjdGl2ZS1zbGlkZScpO1xyXG5cclxuICAgICAgc2xpZExpc3QuYW5pbWF0ZSh7J29wYWNpdHknOjAuM30sIDIwMCwgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgaWYgKGNsaWNlZD4yKSB7XHJcbiAgICAgICAgICBjZW50ZXJTbGlkZS5hcHBlbmRUbyhzbGlkTGlzdCk7XHJcbiAgICAgICAgfWVsc2UgaWYoY2xpY2VkPDIpe1xyXG4gICAgICAgICAgY2VudGVyU2xpZGUucHJlcGVuZFRvKHNsaWRMaXN0KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHNsaWRzLnJlbW92ZSgpO1xyXG4gICAgICAgICAgc2xpZHNDbG9uZS5hcHBlbmRUbyhzbGlkTGlzdCk7XHJcbiAgICAgICAgICBzbGlkcyA9ICQoJy5zZWN0aW9uMi1zbGlkZXJfX2l0ZW0nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2xpZExpc3QuYW5pbWF0ZSh7J29wYWNpdHknOjF9LCA1MDAsIGZ1bmN0aW9uKCl7fSk7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcblxyXG4gIHNsaWRlck1hcmtzLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBjaGFuZ2VTbGlkZSh0aGlzKTtcclxuICB9KVxyXG4gIFxyXG59KSgpO1xyXG4gIFxyXG4gIC8vc2xpZGVyMlxyXG4gIChmdW5jdGlvbigpe1xyXG4gICAgdmFyXHJcbiAgICAgIHNsaWRlID0gJCgnLnNsaWRlcl9faXRlbScpLFxyXG4gICAgICBzbGlkZXJWaWV3ID0gJCgnLnNsZGVfX3ZpZXcnKSxcclxuICAgICAgc2xpZHNCb3ggPSAkKCcuc2xpZGVzX19ib3gnKSxcclxuICAgICAgc2xpZGVXaWRodCA9IHNsaWRlLndpZHRoKCksXHJcbiAgICAgIHNsaWRlck1hcmtzID0gJCgnLnNsaWRlMV9fbWFyaycpLFxyXG4gICAgICBzZWN0aW9uNEJnU2xpZEJveCA9ICQoJy5zZWN0aW9uNF9fYmctc2xpZHNfX2JveCcpLFxyXG4gICAgICBzZWN0aW9uNEJnU2xpZHMgPSAkKCcuc2VjdGlvbjJfX2JnLXNsaWRlJyk7XHJcblxyXG4gICAgZm9yKHZhciBpPTA7IHNsaWRlLmxlbmd0aD5pOyBpKyspe1xyXG4gICAgICB2YXIgY3VycmVudCA9IHNsaWRlW2ldO1xyXG4gICAgICAkKGN1cnJlbnQpLmF0dHIoJ2RhdGEtbnVtYmVyJywgaSsxKTtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2VjdGlvbjRCZ1NsaWRCb3gud2lkdGgoc2VjdGlvbjRCZ1NsaWRzLndpZHRoKCkqc2VjdGlvbjRCZ1NsaWRzLmxlbmd0aCk7XHJcbiAgICBzbGlkZXJWaWV3LndpZHRoKHNsaWRlV2lkaHQpO1xyXG4gICAgc2xpZGVyVmlldy5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgc2xpZHNCb3gud2lkdGgoc2xpZGVXaWRodCpzbGlkZS5sZW5ndGgpO1xyXG4gICAgc2xpZHNCb3guY3NzKHsncG9zaXRpb24nOidyZWxhdGl2ZScsJ2xlZnQnOiAtc2xpZGVXaWRodH0pO1xyXG4gICAgc2xpZHNCb3guY3NzKHsnbWFyZ2luLWxlZnQnOiAwKydweCcsICdtYXJnaW4tcmlnaHQnOiAwKydweCd9KTtcclxuICAgICQoc2xpZGVbc2xpZGUubGVuZ3RoIC0gMV0pLnByZXBlbmRUbyhzbGlkc0JveCk7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGFwZGF0ZUluZm8oY3VycmVudCl7XHJcbiAgICAgIHZhciBudW1iZXIgPSAkKGN1cnJlbnQpLmF0dHIoJ2RhdGEtbnVtYmVyJyk7XHJcbiAgICAgICQoJy5zbGlkZXJfX2l0ZW0tbnVtYmVyJykudGV4dChudW1iZXIpO1xyXG4gICAgICBzbGlkZXJNYXJrcy5yZW1vdmVDbGFzcygnYWN0aXZlLXNsaWRlJyk7XHJcbiAgICAgICQoc2xpZGVyTWFya3NbbnVtYmVyIC0xXSkuYWRkQ2xhc3MoJ2FjdGl2ZS1zbGlkZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNsaWRlTW92ZSh0aGF0KXtcclxuICAgICAgdmFyIGJvb2wgPSAkKHRoYXQpLmhhc0NsYXNzKCduZXh0Jyk7XHJcbiAgICAgIHZhciBkaXJlY3Rpb24gPSAoYm9vbCk/IC1zbGlkZVdpZGh0IDogc2xpZGVXaWRodDtcclxuXHJcbiAgICAgIHNsaWRzQm94ID0gJCgnLnNsaWRlc19fYm94Jyk7XHJcbiAgICAgIHNsaWRlID0gJCgnLnNsaWRlcl9faXRlbScpO1xyXG4gICAgICBzZWN0aW9uNEJnU2xpZEJveCA9ICQoJy5zZWN0aW9uNF9fYmctc2xpZHNfX2JveCcpLFxyXG4gICAgICBzZWN0aW9uNEJnU2xpZHMgPSAkKCcuc2VjdGlvbjJfX2JnLXNsaWRlJyk7XHJcblxyXG4gICAgICAoYm9vbCk/IGFwZGF0ZUluZm8oc2xpZGVbMl0pOiBhcGRhdGVJbmZvKHNsaWRlWzBdKTtcclxuICAgICAgc2xpZHNCb3guYW5pbWF0ZSh7J21hcmdpbi1sZWZ0JzpkaXJlY3Rpb24rJ3B4J30sIDUwMCwgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgKGJvb2wpPyAkKHNsaWRlWzBdKS5hcHBlbmRUbyhzbGlkc0JveCkgOiAkKHNsaWRlW3NsaWRlLmxlbmd0aCAtIDFdKS5wcmVwZW5kVG8oc2xpZHNCb3gpO1xyXG4gICAgICAgIChib29sKT8gJChzZWN0aW9uNEJnU2xpZHNbMF0pLmFwcGVuZFRvKHNlY3Rpb240QmdTbGlkQm94KSA6ICQoc2VjdGlvbjRCZ1NsaWRzW3NlY3Rpb240QmdTbGlkcy5sZW5ndGggLSAxXSkucHJlcGVuZFRvKHNlY3Rpb240QmdTbGlkQm94KTtcclxuICAgICAgICBzbGlkc0JveC5jc3MoJ21hcmdpbi1sZWZ0JywgMCsncHgnKTtcclxuICAgICAgICBcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAkKCcuc2VjdGlvb240X19zbGlkZXItYnV0dG9uIHNwYW4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgc2xpZGVNb3ZlKHRoaXMpO1xyXG4gICAgfSk7XHJcblxyXG4gIH0pKCk7XHJcblxyXG5cclxuICAvL3NsaWRlcjNcclxuICAoZnVuY3Rpb24oKXtcclxuXHJcbiAgICB2YXIgc2xpZExpc3QgPSAkKCcuc2VjdGlvbjEwLXNsaWRlcicpO1xyXG4gICAgdmFyIHNsaWRzID0gJCgnLnNlY3Rpb24xMC1zbGlkZXJfX2l0ZW0nKTtcclxuICAgIHZhciBzbGlkc0Nsb25lID0gc2xpZHMuY2xvbmUoKTtcclxuICAgIHZhciBzbGlkZXJNYXJrcyA9ICQoJy5zbGlkZTNfX21hcmsnKTtcclxuXHJcbiAgICBmb3IodmFyIGk9MDsgc2xpZGVyTWFya3MubGVuZ3RoPmk7IGkrKyl7XHJcbiAgICAgIHZhciBjdXJyZW50ID0gc2xpZGVyTWFya3NbaV07XHJcbiAgICAgICQoY3VycmVudCkuYXR0cignZGF0YS1zbGlkZXJfbnVtYmVyJywgaSsxKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gY2hhbmdlU2xpZGUodGhhdCl7XHJcblxyXG4gICAgICBpZiAoISQodGhhdCkuaGFzQ2xhc3MoJ2FjdGl2ZS1zbGlkZScpKSB7XHJcbiAgICAgICAgdmFyIGNsaWNlZCA9ICQodGhhdCkuYXR0cignZGF0YS1zbGlkZXJfbnVtYmVyJyk7XHJcbiAgICAgICAgdmFyIGNlbnRlclNsaWRlID0gJChzbGlkc1sxXSk7XHJcblxyXG4gICAgICAgIHNsaWRlck1hcmtzLnJlbW92ZUNsYXNzKCdhY3RpdmUtc2xpZGUnKTtcclxuICAgICAgICAkKHRoYXQpLmFkZENsYXNzKCdhY3RpdmUtc2xpZGUnKTtcclxuXHJcbiAgICAgICAgaWYgKGNsaWNlZD4yKSB7XHJcbiAgICAgICAgICBjZW50ZXJTbGlkZS5hcHBlbmRUbyhzbGlkTGlzdCk7XHJcbiAgICAgICAgfWVsc2UgaWYoY2xpY2VkPDIpe1xyXG4gICAgICAgICAgY2VudGVyU2xpZGUucHJlcGVuZFRvKHNsaWRMaXN0KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHNsaWRzLnJlbW92ZSgpO1xyXG4gICAgICAgICAgc2xpZHNDbG9uZS5hcHBlbmRUbyhzbGlkTGlzdCk7XHJcbiAgICAgICAgICBzbGlkcyA9ICQoJy5zZWN0aW9uMTAtc2xpZGVyX19pdGVtJyk7XHJcbiAgICAgICAgICAkKCcuc2VjdGlvbjEwX19kcm9wLWJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGljaycpO1xyXG4gICAgICAgICAgICBjaGFuZ2VIZWlndGgodGhpcyk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNsaWRlck1hcmtzLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIGNoYW5nZVNsaWRlKHRoaXMpO1xyXG4gICAgfSlcclxuXHJcbiAgfSkoKTtcclxuXHJcbi8v0L/QvtC/0LDQvyDQvdCwINC+0YLQt9GL0LIgc3RzcnRcclxuICB2YXIgYnRuID0gJCgnLmNvbW1lbnQtYnRuJyksIC8v0LrQvdC+0L/QutCwINCy0YvQt9C+0LLQsFxyXG4gICAgY2xvc2VCdG4gPSAkKCcuY2xvc2VyJyksIC8v0LrRgNC10YHRgtC40Log0L/QvtC/0LDQv9CwXHJcbiAgICBmaWVsZCA9ICQoJy5maWVsZCcpLCAvLyDQv9C+0LvQtSDQstCy0L7QtNCwINGB0L7QvtCx0YnQtdC90LjRj1xyXG4gICAgdGhhbmtzTm8gPSAkKCcudGhhbmtzLW5vJyksIC8v0L3QtdGCINC+0YLQt9GL0LLQsFxyXG4gICAgdGhhbmtzUG9wdXAgPSAkKCcudGhhbmtzLXBvcHVwJyksIC8v0LHQu9C+0Log0YEg0L/QvtC/0LDQv9C+0LxcclxuICAgIHRoYW5rc0lubmVyID0gJCgnLnRoYW5rcy1wb3B1cF9faW5uZXInKTsgLy/QstC90YPRgtGA0LXQvdC90LjQuSDQsdC70L7QuiDQv9C+0L/QsNC/0LBcclxuXHJcbiAgICAgIGJ0bi5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKGZpZWxkLnZhbCgpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIC8v0LXRgdC70Lgg0L/QvtC70LUg0L3QtSDQv9GD0YHRgtC+0LUg0L7Rh9C40YnQsNC10Lwg0LXQs9C+LCDQuCDQv9C+0LrQsNC30YvQstCw0LXQvCDQv9C+0L/QsNC/XHJcbiAgICAgICAgICB0aGFua3NQb3B1cC5hZGRDbGFzcygnc2hvdycpXHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhbmtzTm8ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBmaWVsZC52YWwoJycpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZmllbGQudmFsKCkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgIHRoYW5rc05vLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBmdW5jdGlvbiBjbG9zZVRoYW5rc1BvcHVwKCkge1xyXG4gICAgICAgIC8v0YTRg9C90LrRhtC40Y8g0LfQsNC60YDRi9GC0LjRjyDQv9C+0L/QsNC/0LBcclxuICAgICAgICB0aGFua3NQb3B1cC5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoYW5rc1BvcHVwLmFkZChjbG9zZUJ0bikuY2xpY2soY2xvc2VUaGFua3NQb3B1cCk7IC8vINC90LDQstC10YjQuNCy0LDQtdC8INGE0YPQvdC60YbQuNGOINC30LDQutGA0YvRgtC40Y8g0L3QsCDQsdC70L7QuiDQv9C+0L/QsNC/0LAsINC4INC90LAg0LrQvdC+0L/QutGDINC30LDQutGA0YvRgtC40Y8g0L/QvtC/0LDQv9CwXHJcblxyXG4gICAgICB0aGFua3NJbm5lci5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgLy/Qv9GA0Lgg0LrQu9C40LrQtSDQvdCwINGB0L7QtNC10YDQttC40LzQvtC1INC/0L7Qv9Cw0L/QsCDQv9GA0LXRgNGL0LLQsNC10Lwg0L7RgtC+0LHRgNCw0LbQtdC90LjQtSDRgdC60YDQuNC/0YLQsFxyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgIH0pO1xyXG4gIC8v0L/QvtC/0LDQvyDQvdCwINC+0YLQt9GL0LIgZW5kXHJcblxyXG59KVxyXG5cclxuXHJcbiJdfQ==
