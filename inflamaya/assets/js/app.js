
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
  // Якщо потрібен вивід дати та час + хвилин, тоді до спана з датою додаємо клас "time" <span class="date-1 time"></span>. 
  // Працює як в порядку спадання, так і в порядку зростання.

  document.addEventListener("DOMContentLoaded", Datee);

  function Datee() {
      var msInDay = 86400000,
          counterLength = 90,
          months, countryName = 'ru',  // Встановлюємо мову для місяців. 
          isAbbreviated = false, // Якщо потрібно скорочений варіант місяців з трьох букв, наприклад "янв", "июн" і т.д, тоді ставим TRUE.
          localDate = new Date();
                                     
      switch(countryName) {
          case 'it':  // Italy
              months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
              break;
          case 'es':  // Spain
              months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
              break;
          case 'fr':  // France
              months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
              break;
          case 'pt':  // Portugal
              months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
              break;
          case 'de':  // Germany
              months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
              break;
          case 'bg':  // Bulgaria
              months = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'];
              break;
          case 'pl':  // Poland
              months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
              break;
          case 'ro':  // Romania
              months = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
              break;
          case 'hu':  // Hungary (Румунія)
              months = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];
              break;
          case 'gr':  // Greece
          case 'cy':  // Cyprus (Кіпр)
              months = ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'];
              break;
          case 'ru':  // Russia
              months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
              break;
      }

      if (isAbbreviated) {
          for (var i = 0; i < months.length; i++) {
              months[i] = months[i].slice(0, 3).toLowerCase();  // Прибираємо ".toLowerCase()", якщо перша буква повинна бути великою.
          }
      }

      for (var counter = 0; counter < counterLength; counter++) {
          var dateClass = "date-" + counter,
              nodeList = document.getElementsByClassName(dateClass),
              date = new Date(localDate.getTime() - counter * msInDay),
              timeCounter = 0;
              timeArray = time(nodeList/*, true*/); // Розкоментувати, якщо необхідне сортування в порядку спадання.

          timeArray = timeFormat(timeArray);

          for(var i = 0; i < nodeList.length; i++) {
              var data = nodeList[i].dataset;

              if (data.format) {
                  nodeList[i].innerHTML = format(date, data.format);
                  // format: особливий формать для окремої дати. Додаєм як data-format="фомарт". Формати дивитись в switch'і нижче. dd - цифри, day - прописом.
                  // <span class="date-1" data-format="dd month yyyy"></span> - мотає на 1 день назад і виводить цей span у вигляді "24 Липня 1995".
              } else {
                  nodeList[i].innerHTML = format(date/*, "dd month yyyy"*/); // Default: dd.mm.yyyy ADD FORMAT HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
              }
              if (/\btime\b/.test(nodeList[i].className)) {
                  nodeList[i].innerHTML += " " + timeArray[timeCounter]; // Рядок для формату виводу часу.
                  timeCounter++;
              } 
          }
      }

      // <span clas="date-NUMBER"></span> - мотає час назад на NUMBER днів. Наприклад, <span className="date-5"></span>
      // <span clas="dateNUMBER"></span> - мотає час вперед на NUMBER днів. Наприклад, <span className="date5"></span>

      for (var counter = 0; counter < counterLength; counter++) {
          var dateClass = "date" + counter,
              nodeList = document.getElementsByClassName(dateClass),
              date = new Date(localDate.getTime() + counter * msInDay),
              timeCounter = 0;
              timeArray = time(nodeList/*, true*/); // Розкоментувати, якщо необхідне сортування в порядку спадання.

          timeArray = timeFormat(timeArray);

          for(var i = 0; i < nodeList.length; i++) {
              var data = nodeList[i].dataset;

              if (data.format) {
                  nodeList[i].innerHTML = format(date, data.format);
                  // format: особливий формать для окремої дати. Додаєм як data-format="фомарт". Формати дивитись в switch'і нижче. dd - цифри, day - прописом.
                  // <span class="date-1" data-format="dd month yyyy"></span> - мотає на 1 день назад і виводить цей span у вигляді "24 Липня 1995".
              } else {
                  nodeList[i].innerHTML = format(date/*, "dd month yyyy"*/); // Default: dd.mm.yyyy ADD FORMAT HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
              }
          }
      }



      function time(nodeList, reverse) {
      var timeArray = [];

      for (var i = 0; i < nodeList.length; i++) {
          if (nodeList[i].className.match(/\btime\b/)) {
              timeArray.push(timeRandom());
          }
      }

      if (reverse) timeArray.sort(function(a, b) { return b - a; });
      else timeArray.sort(function(a, b) { return a - b; });

      return timeArray;
  } 

  function timeRandom() {
      return Math.round(0 + Math.random() * 1440);
  }

  function timeFormat(timearray) {
      var array = [];

      for (var i = 0; i < timearray.length; i++) {
      var htemp = Math.floor(timearray[i] / 60), mtemp = timearray[i] % 60,
          hours = htemp < 10 ? "0" + htemp : htemp,
          minutes = mtemp < 10 ? "0" + mtemp : mtemp; 
      array.push(hours + ":" + minutes);  
      }
      

      return array;
  }

  function format(date, formatstring) {
      var innerDate = "",
          day = date.getDate(),
          year = date.getFullYear(),
          month = date.getMonth() + 1,
          fo = formatstring || true;

      switch (fo) {
          case "mm.dd.yyyy": 
              innerDate += (month < 10) ? ("0" + month) : month;
              innerDate += ".";
              innerDate += (day < 10) ? ("0" + day) : day;
              innerDate += "." + year;
              return innerDate;            

          case "dd month yyyy": 
              innerDate += (day < 10) ? ("0" + day) : day;
              innerDate += " ";
              innerDate += months[month - 1];
              innerDate += " " + year;
              return innerDate;      

          case "dd month": 
              innerDate += (day < 10) ? ("0" + day) : day;
              innerDate += " ";
              innerDate += months[month - 1];
              return innerDate;

          case "day dd, month yyyy": 
              var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
              innerDate += days[new Date(year, month - 1, day).getDay()];
              innerDate += " ";
              innerDate += (day < 10) ? ("0" + day) : day;
              innerDate += " ";
              innerDate += months[month - 1];
              innerDate += " " + year;
              return innerDate;

          case "dd/mm/yyyy":
              innerDate += (day < 10) ? ("0" + day) : day;
              innerDate += "/";
              innerDate += (month < 10) ? ("0" + month) : month;
              innerDate += "/" + year;
              return innerDate;

          case "dd-mm-yyyy":
              innerDate += (day < 10) ? ("0" + day) : day;
              innerDate += "-";
              innerDate += (month < 10) ? ("0" + month) : month;
              innerDate += "-" + year;
              return innerDate;
          
          default: 
              innerDate += (day < 10) ? ("0" + day) : day;
              innerDate += ".";
              innerDate += (month < 10) ? ("0" + month) : month;
              innerDate += "." + year;
              return innerDate;
      }
  }
  }

  $(document).ready(function () {

    var wnWidth = $(window).width();
    var x = (wnWidth > 999)? false:true;

    var slLider = $('.reviews-list');
    $(window).on('resize', function(){
      wnWidth = $(window).width();
      if (wnWidth<1000 && x===false) { //если екран меньше 1000 и слайдер еще не был иницыализирова то инициализируем его
        x = true;
        sliderInit(x);
      };
      if(wnWidth>999 ){ //если слайдер был уничтожен то создадим условия что бы при ресайзе он мог собраться
        x = false;
      }
    });

   function sliderInit(x){
    if (x) {
       slLider.slick({
         autoplay: true,
         speed: 2000,
         slidesToShow: 1,
         variableWidth: false,
         autoplaySpeed: 5000, 
         arrows: false,
         dots: true,
         responsive: [
           {
             breakpoint: 5000,
             settings: "unslick"
           },
           {
             breakpoint: 999,
             settings: {
               slidesToShow: 1,

             }
           },
         ]
       });
      }
    }
    
   sliderInit(x);

  });




//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgLy/QtNC70Y8g0LrQu9C+0L3QuNGA0L7QstCw0L3QuNGPINCx0LvQvtC60LAg0LIg0L/QvtC/0LDQvyDQuNGB0L/QvtC70YzQt9GD0Y7RgtGB0Y8g0YHQu9C10LTRg9GO0YnQuNC1INCw0LnQtNC40YjQvdC40LrQuFxuICAvLyAjY2xvbmVUaGlzIC0g0LTQu9GPINC00LXRgdC60YLQvtC/0LBcbiAgLy8gI2Nsb25lTW9iaWxlVGhpcyAtINC00LvRjyDQvNC+0LHQuNC70YzQvdC+0LPQviAo0LXRgdC70Lgg0L3Rg9C20L3QvilcbiAgLy/QsdGA0LXQudC60L/QvtC40L3RgiDQtNC70Y8g0L/QtdGA0LXQutC70Y7Rh9C10L3QuNGPINC/0L7Qv9Cw0L/QsCDQv9GA0Lgg0L3QtdC+0LHRhdC+0LTQuNC80L7RgdGC0Lgg0LTQtdGE0L7Qu9GCINC30L3QsNGH0LXQvdC40LUgPSAxMDAwXG5cbiAgLy8g0LIg0YHQu9GD0YfQsNC1LCDQtdGB0LvQuCDQvNGLINC90LUg0LrQu9C+0L3QuNGA0YPQtdC8INGE0L7RgNC80YMsINCwINCy0LXRgNGB0YLQsNC10Lwg0L/QvtC/0LDQvyDQv9GA0L7QuNC30LLQvtC70YzQvdC+LFxuICAvLyDRgtC+INC00LXQu9Cw0YLRjCDRjdGC0L4g0L3QtdC+0LHRhdC+0LTQuNC80L4g0LIg0LrQvtC90YLQtdC50L3QtdGA0LUg0YEg0LrQu9Cw0YHRgdC+0LwgLmV2ZXItcG9wdXAtYnVpbGRcbiAgLy8gZmFsc2UgKNC/0L7QutCw0LfRi9Cy0LDRgtGMINC60L7QvdGC0LXQudC90LXRgCkgLyB0cnVlICjQvdC1INC/0L7QutCw0LfRi9Cy0LDRgtGMINC60L7QvdGC0LXQudC90LXRgClcblxuICB2YXIgcG9wdXBCdWlsZCA9IHRydWU7IC8vIGZhbHNlL3RydWVcblxuXG4gIC8vLmV2ZXItcG9wdXAtYnRuIC0g0LrQu9Cw0YHRgSDQtNC70Y8g0LTQu9GPINC+0YLQutGA0YvRgtC40Y8g0L/QvtC/0LDQv9CwXG5cbiAgLy/Qv9GA0L7QstC10YDQutCwINC60L7QtNCwXG4gIC8vLmNoZWNrX19maWVsZCAtINC60LvQsNGB0YEg0LTQu9GPINC/0L7Qu9GPINC/0YDQvtCy0LXRgNC60Lgg0LrQvtC00LBcbiAgLy8uY2hlY2tfX2J0biAtINC60LvQsNGB0YEg0LTQu9GPINC60L3QvtC/0LrQuCDQv9GA0L7QstC10LrQuCDQutC+0LTQsFxuICAvLy5jaGVja19fcmVzdWx0IC0g0LrQu9Cw0YHRgSDQtNC70Y8g0LrQvtC90YLQtdC50L3QtdGA0LAg0YEg0YDQtdC30YPQu9GM0YLQsNGC0L7QvCDQv9GA0L7QstC10YDQutC4INC60L7QtNCwXG5cbiAgLy/RgtCw0LnQvNC10YBcbiAgLy/QtNC70Y8g0LLRi9Cy0L7QtNCwINGB0YfQtdGC0YfQuNC60LAg0YLQsNC50LzQtdGA0LAg0LjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPIDMg0LrQvtC90YLQtdC90LXRgNCwICjRh9Cw0YHRiywg0LzQuNC90YPRgtGLLCDRgdC10LrRg9C90LTRiylcbiAgLy8uaG91cnMg0LrQu9Cw0YHRgSDQtNC70Y8g0LLRi9Cy0L7QtNCwINGH0LDRgdC+0LJcbiAgLy8ubWludXRlcyDQutC70LDRgdGBINC00LvRjyDQstGL0LLQvtC00LAg0LzQuNC90YPRglxuICAvLy5zZWNvbmRzINC60LvQsNGB0YEg0LTQu9GPINCy0YvQstC+0LTQsCDRgdC10LrRg9C90LRcblxuICAoZnVuY3Rpb24gKCkge1xuXG4gICAgICBmdW5jdGlvbiBpbml0aWF0ZSgpIHtcblxuICAgICAgICAgIHZhciBicmVha3BvaW50ID0gMTAwMCxcbiAgICAgICAgICAgICAgZGVza3RvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbG9uZVRoaXMnKSxcbiAgICAgICAgICAgICAgbW9iaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb25lTW9iaWxlVGhpcycpO1xuXG4gICAgICAgICAgaWYgKHBvcHVwQnVpbGQpIHtcbiAgICAgICAgICAgICAgLy8g0LIg0YHQu9GD0YfQsNC1LCDQtdGB0LvQuCDQvNGLINCy0LXRgNGB0YLQsNC10Lwg0L/QvtC/0LDQvyDQsiDQutC+0L3RgtC10LnQvdC10YDQtSAuZXZlci1wb3B1cC1idWlsZCwg0LTQsNC90L7QtSDRg9GB0LvQvtCy0LjQtSDQv9GA0Y/Rh9C10YIg0LXQs9C+LCDQtdGB0LvQuCDQt9C90LDRh9C10L3QuNC1INC/0LXRgNC10LzQtdC90L3QvtC5IHBvcHVwQnVpbGQgPSB0cnVlXG4gICAgICAgICAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCA9ICcuZXZlci1wb3B1cC1idWlsZHtwb3NpdGlvbjogZml4ZWQ7IG9wYWNpdHk6IDA7ei1pbmRleDogLTE7IHRvcDogMDsgbGVmdDogMDt9JztcbiAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpLmFwcGVuZENoaWxkKHN0eWxlKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGFkZFBvcHVwU3R5bGUoKSB7XG4gICAgICAgICAgICAgIC8vINC00L7QsdCw0LLQu9GP0LXQvCDRgdGC0LjQu9C4INC00LvRjyDQvdCw0YjQtdCz0L4g0L/QvtCw0L/QsFxuICAgICAgICAgICAgICB2YXIgY29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyksXG4gICAgICAgICAgICAgICAgICBoZWFkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpO1xuICAgICAgICAgICAgICBjb250LmlubmVySFRNTCA9ICcuZXZlci1wb3B1cF9fYm9keS5ldmVyLW1vYmlsZXtkaXNwbGF5Om5vbmV9LmV2ZXItcG9wdXB7cG9zaXRpb246IGZpeGVkO3RvcDogMDtsZWZ0OiAwO3dpZHRoOiAxMDAlO2hlaWdodDogMTAwJTtiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLC43KTt6LWluZGV4OiAxMTE7ZGlzcGxheTogbm9uZTtvdmVyZmxvdzogYXV0bzt9LmV2ZXItcG9wdXBfX2JvZHl7cG9zaXRpb246IHN0YXRpYztmbG9hdDogbm9uZTtkaXNwbGF5OiBibG9jazttYXJnaW46IDAgYXV0bzt3aWR0aDphdXRvfS5ldmVyLXBvcHVwLnNob3d7ZGlzcGxheTogYmxvY2s7YWxpZ24taXRlbXM6IGNlbnRlcjt9LmV2ZXItcG9wdXBfX2lubmVye3Bvc2l0aW9uOiByZWxhdGl2ZTttYXJnaW46IDAgYXV0bztwYWRkaW5nLXRvcDozNXB4fS5ldmVyLXBvcHVwX19jbG9zZXt3aWR0aDogMzVweDtoZWlnaHQ6IDMwcHg7cG9zaXRpb246IGFic29sdXRlO2N1cnNvcjpwb2ludGVyO3RvcDogMDtyaWdodDogMDt6LWluZGV4OiAxOy13ZWJraXQtdHJhbnNpdGlvbjogLjNzOyAtbW96LXRyYW5zaXRpb246IC4zczsgLW1zLXRyYW5zaXRpb246IC4zczsgLW8tdHJhbnNpdGlvbjogLjNzOyB0cmFuc2l0aW9uOiAuM3M7fS5ldmVyLXBvcHVwX19jbG9zZTphZnRlciwgLmV2ZXItcG9wdXBfX2Nsb3NlOmJlZm9yZSB7Y29udGVudDogXCJcIjtwb3NpdGlvbjogYWJzb2x1dGU7cmlnaHQ6IDA7dG9wOiAxMHB4O3dpZHRoOiAzNXB4O2hlaWdodDogMTBweDtiYWNrZ3JvdW5kOiAjZmZmO3RyYW5zaXRpb246IGFsbCAxczt9LmV2ZXItcG9wdXBfX2Nsb3NlOmFmdGVyIHstd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7LW1zLXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7LW8tdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTt0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO30uZXZlci1wb3B1cF9fY2xvc2U6YmVmb3JlIHstd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTstbXMtdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpOy1vLXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTt0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7fScgK1xuICAgICAgICAgICAgICAgICAgJ0BtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICcgKyBicmVha3BvaW50ICsgJ3B4JyArICcpeycgK1xuICAgICAgICAgICAgICAgICAgJy5ldmVyLXBvcHVwX19ib2R5LmV2ZXItZGVza3RvcHtkaXNwbGF5Om5vbmV9JyArXG4gICAgICAgICAgICAgICAgICAnLmV2ZXItcG9wdXBfX2JvZHkuZXZlci1tb2JpbGV7ZGlzcGxheTpibG9ja30nICtcbiAgICAgICAgICAgICAgICAgICd9JztcbiAgICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChjb250KVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGFkZE1vYmlsZVBvcHVwU3R5bGUoKSB7XG4gICAgICAgICAgICAgIC8vINC00L7QsdCw0LLQu9GP0LXQvCDRgdGC0LjQu9C4INC00LvRjyDQvdCw0YjQtdCz0L4g0L/QvtCw0L/QsFxuICAgICAgICAgICAgICB2YXIgY29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyksXG4gICAgICAgICAgICAgICAgICBoZWFkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpO1xuICAgICAgICAgICAgICBjb250LmlubmVySFRNTCA9ICdAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAnICsgYnJlYWtwb2ludCArICdweCcgKyAnKSB7LmV2ZXItcG9wdXAge3Bvc2l0aW9uOiBmaXhlZDt0b3A6IDA7bGVmdDogMDt3aWR0aDogMTAwJTtoZWlnaHQ6IDEwMCU7YmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAuNyk7ei1pbmRleDogMTExO2Rpc3BsYXk6IG5vbmU7b3ZlcmZsb3c6IGF1dG87fS5ldmVyLXBvcHVwX19ib2R5IHtwb3NpdGlvbjogc3RhdGljO2Zsb2F0OiBub25lO2Rpc3BsYXk6IGJsb2NrO21hcmdpbjogMCBhdXRvO3dpZHRoOiBhdXRvfS5ldmVyLXBvcHVwLnNob3cge2Rpc3BsYXk6IGJsb2NrO2FsaWduLWl0ZW1zOiBjZW50ZXI7fS5ldmVyLXBvcHVwX19pbm5lciB7cG9zaXRpb246IHJlbGF0aXZlO21hcmdpbjogMCBhdXRvO3BhZGRpbmctdG9wOiAzNXB4fS5ldmVyLXBvcHVwX19jbG9zZSB7d2lkdGg6IDM1cHg7aGVpZ2h0OiAzMHB4O3Bvc2l0aW9uOiBhYnNvbHV0ZTtjdXJzb3I6IHBvaW50ZXI7dG9wOiAwO3JpZ2h0OiAwO3otaW5kZXg6IDE7LXdlYmtpdC10cmFuc2l0aW9uOiAuM3M7LW1vei10cmFuc2l0aW9uOiAuM3M7LW1zLXRyYW5zaXRpb246IC4zczstby10cmFuc2l0aW9uOiAuM3M7dHJhbnNpdGlvbjogLjNzO30uZXZlci1wb3B1cF9fY2xvc2U6YWZ0ZXIsIC5ldmVyLXBvcHVwX19jbG9zZTpiZWZvcmUge2NvbnRlbnQ6IFwiXCI7cG9zaXRpb246IGFic29sdXRlO3JpZ2h0OiAwO3RvcDogMTBweDt3aWR0aDogMzVweDtoZWlnaHQ6IDEwcHg7YmFja2dyb3VuZDogI2ZmZjt0cmFuc2l0aW9uOiBhbGwgMXM7fS5ldmVyLXBvcHVwX19jbG9zZTphZnRlciB7LXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpOy1tcy10cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpOy1vLXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7dHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTt9LmV2ZXItcG9wdXBfX2Nsb3NlOmJlZm9yZSB7LXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7LW1zLXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTstby10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7dHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO319JztcbiAgICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChjb250KVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXkoKSB7XG4gICAgICAgICAgICAgIC8vINGB0L7Qt9C00LDQtdC8INC30LDRgtC10LzQvdC10L3QvdGL0Lkg0YTQvtC9INC00LvRjyDQv9C+0L/QsNC/0LAg0Lgg0LLRgdGC0LDQstC70Y/QtdC8INC10LPQviDQsiDRgNCw0LfQvNC10YLQutGDIGh0bWxcbiAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgICAgICAgcGFyZW50SW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgICAgICAgICAgIGNsb3NlUGFyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgICAgICAgcGFyZW50LmNsYXNzTGlzdC5hZGQoJ2V2ZXItcG9wdXAnKTtcbiAgICAgICAgICAgICAgcGFyZW50SW5uZXIuY2xhc3NMaXN0LmFkZCgnZXZlci1wb3B1cF9faW5uZXInKTtcbiAgICAgICAgICAgICAgY2xvc2VQYXJlbnQuY2xhc3NMaXN0LmFkZCgnZXZlci1wb3B1cF9fY2xvc2UnKTtcblxuICAgICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQocGFyZW50SW5uZXIpO1xuICAgICAgICAgICAgICBwYXJlbnRJbm5lci5hcHBlbmRDaGlsZChjbG9zZVBhcmVudCk7XG4gICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocGFyZW50KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBjcmVhdGVNb2RhbEJvZHkoYnJlYWtwb2ludCkge1xuICAgICAgICAgICAgICAvLyDRhNGD0L3QutGG0LjRjyDQvtC/0YDQtdC00LXQu9GP0LXRgiDRgdC+0LTQtdGA0LbQuNC80L7QtSDQtNC70Y8g0L/QvtC/0LDQv9CwLCDQutC70L7QvdC40YDRg9C10YIg0LXQs9C+INGB0L7QtNC10YDQttC40LzQvtC1LCDQuCDQv9C+0LXRidCw0LXRgiDQsiDQutC+0L3RgtC10LnQvdC10YAgZXZlci1wb3B1cF9fYm9keVxuICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmV2ZXItcG9wdXBfX2lubmVyJyk7XG5cbiAgICAgICAgICAgICAgaWYgKGRlc2t0b3ApIHtcbiAgICAgICAgICAgICAgICAgIHZhciBkZXNrdG9wQ2xvbmUgPSBkZXNrdG9wLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgIGRlc2t0b3BDbG9uZS5jbGFzc0xpc3QuYWRkKCdldmVyLXBvcHVwX19ib2R5Jyk7XG4gICAgICAgICAgICAgICAgICBkZXNrdG9wQ2xvbmUucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuICAgICAgICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGRlc2t0b3BDbG9uZSk7XG4gICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXZlci1wb3B1cCAuZXZlci1wb3B1cF9faW5uZXInKS5zdHlsZS53aWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbG9uZVRoaXMnKS5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAobW9iaWxlKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgbW9iaWxlQ2xvbmUgPSBtb2JpbGUuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgaWYgKGRlc2t0b3BDbG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGRlc2t0b3BDbG9uZS5jbGFzc0xpc3QuYWRkKCdldmVyLWRlc2t0b3AnKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIG1vYmlsZUNsb25lLmNsYXNzTGlzdC5hZGQoJ2V2ZXItcG9wdXBfX2JvZHknKTtcbiAgICAgICAgICAgICAgICAgIG1vYmlsZUNsb25lLmNsYXNzTGlzdC5hZGQoJ2V2ZXItbW9iaWxlJyk7XG4gICAgICAgICAgICAgICAgICBtb2JpbGVDbG9uZS5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgICAgICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobW9iaWxlQ2xvbmUpO1xuICAgICAgICAgICAgICAgICAgdmFyIG1vYmlsZVN0eWxlcyA9ICcuZXZlci1kZXNrdG9we2Rpc3BsYXk6IGJsb2NrfS5ldmVyLW1vYmlsZXtkaXNwbGF5OiBub25lfUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICcgKyBicmVha3BvaW50ICsgJ3B4KXsuZXZlci1tb2JpbGV7ZGlzcGxheTogYmxvY2t9LmV2ZXItZGVza3RvcHtkaXNwbGF5OiBub25lO319JztcblxuICAgICAgICAgICAgICAgICAgdmFyIG1vYmlsZVN0eWxlc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgICBtb2JpbGVTdHlsZXNDb250YWluZXIuaW5uZXJIVE1MID0gbW9iaWxlU3R5bGVzO1xuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpLmFwcGVuZENoaWxkKG1vYmlsZVN0eWxlc0NvbnRhaW5lcilcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ldmVyLXBvcHVwIC5ldmVyLXBvcHVwX19pbm5lcicpLnN0eWxlLndpZHRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb25lTW9iaWxlVGhpcycpLm9mZnNldFdpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1vYmlsZS5vZmZzZXRXaWR0aClcbiAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBtb2RhbFBvc2l0aW9uKHNjcmVlbkhlaWdodCkge1xuICAgICAgICAgICAgICAvL9GA0LDRgdGH0LXRgiDRiNC40YDQuNC90Ysg0Lgg0LLRi9Cy0L7QtCDQtdC1INCyIGh0bWwsINGE0YPQvdC60YbQuNGPINCy0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQt9Cw0LPRgNGD0LfQutC1INGB0YLRgNCw0L3QuNGG0YssINCwINGC0LDQuiDQttC1INC/0YDQuCDRgNC10YHQsNC50LfQtVxuICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmV2ZXItcG9wdXAgIC5ldmVyLXBvcHVwX19pbm5lcicpO1xuICAgICAgICAgICAgICBpZiAoY29udGFpbmVyKSB7XG5cbiAgICAgICAgICAgICAgICAgIHZhciBkZXNrdG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb25lVGhpcycpLFxuICAgICAgICAgICAgICAgICAgICAgIG1vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbG9uZU1vYmlsZVRoaXMnKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGRlc2t0b3ApIHtcblxuICAgICAgICAgICAgICAgICAgICAgIGNoZWNrUG9zaXRpb24oZGVza3RvcCwgY29udGFpbmVyLCBzY3JlZW5IZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IGJyZWFrcG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gZGVza3RvcC5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBpZiAobW9iaWxlICYmIHdpbmRvdy5pbm5lcldpZHRoIDwgYnJlYWtwb2ludCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKG1vYmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja1Bvc2l0aW9uKG1vYmlsZSwgY29udGFpbmVyLCBzY3JlZW5IZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuc3R5bGUud2lkdGggPSBtb2JpbGUub2Zmc2V0V2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBjaGVja1Bvc2l0aW9uKHNlbGVjdG9yLCBjb250YWluZXIsIHNjcmVlbkhlaWdodCkge1xuICAgICAgICAgICAgICAvL9C/0L7Qt9C40YbQuNC+0L3QuNGA0L7QstCw0L3QuNC1INC/0L7Qv9Cw0L/QsCDQv9C+INCy0LXRgNGC0LjQutCw0LvQuFxuICAgICAgICAgICAgICB2YXIgY29udCA9IHNlbGVjdG9yLFxuICAgICAgICAgICAgICAgICAgY29udEhlaWdodCA9IGNvbnQub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgICAgICAgIGlmIChjb250SGVpZ2h0ID4gc2NyZWVuSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICBjb250YWluZXIuc3R5bGUubWFyZ2luID0gJzQwcHggYXV0byc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdG9wID0gKHNjcmVlbkhlaWdodCAtIGNvbnRIZWlnaHQpIC8gMjtcbiAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5tYXJnaW4gPSB0b3AgKyAncHggYXV0byAyMHB4JztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIHNob3dQb3B1cCgpIHtcbiAgICAgICAgICAgICAgLy/RhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/QvtC60LDQt9CwINC/0L7Qv9Cw0L/QsFxuICAgICAgICAgICAgICB2YXIgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXZlci1wb3B1cCcpO1xuICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdzaG93JylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBoaWRlUG9wdXAoKSB7XG4gICAgICAgICAgICAgIC8v0YTRg9C90LrRhtC40Y8g0LTQu9GPINGB0LrRgNGL0YLQuNGPINC/0L7Qv9Cw0L/QsFxuICAgICAgICAgICAgICB2YXIgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXZlci1wb3B1cCcpO1xuICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBub3RIaWRlKGUpIHtcbiAgICAgICAgICAgICAgLy/RhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/RgNC10YDRi9Cy0LDQvdC40Y8g0LLRi9C/0L7Qu9C90LXQvdC40Y8g0YHRhtC10L3QsNGA0LjRjyDQv9C+INC60LvQuNC60YNcbiAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrQ29kZShldmVudCkge1xuICAgICAgICAgICAgICAvLyDQv9GA0L7QstC10YDQutCwINC60L7QtNCwINC/0L7QtNC70LjQvdC90L7RgdGC0LhcbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICB2YXIgY29kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2hlY2tfX2ZpZWxkXCIpLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgbXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaGVja19fcmVzdWx0XCIpO1xuXG4gICAgICAgICAgICAgIGlmIChjb2RlLmxlbmd0aCA9PT0gMTUpIHtcbiAgICAgICAgICAgICAgICAgIG1zZy5pbm5lckhUTUwgPSAn0JTQsNC90L3Ri9C5INC60L7QtCDQstC10YDQtdC9LiDQodC/0LDRgdC40LHQviwg0YfRgtC+INCy0YvQsdGA0LDQu9C4INC90LDRiNGDINC/0YDQvtC00YPQutGG0LjRjiEnO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2UgaWYgKGNvZGUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICBtc2cuaW5uZXJIVE1MID0gJ9CS0LLQtdC00LjRgtC1LCDQv9C+0LbQsNC70YPQudGB0YLQsCwg0LrQvtC0Lic7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBtc2cuaW5uZXJIVE1MID0gJ9CaINGB0L7QttCw0LvQtdC90LjRjiwg0LTQsNC90L3Ri9C5INC60L7QtCDQvdC1INC90LDQudC00LXQvSEg0JLQtdGA0L7Rj9GC0L3QtdC1INCy0YHQtdCz0L4sINCy0Ysg0L/RgNC40L7QsdGA0LXQu9C4INC/0L7QtNC00LXQu9GM0L3Ri9C5INC/0YDQvtC00YPQutGCLic7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbW91c2VPdXRDb3VudCA9IDA7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgIC8v0YHQvtCx0YvRgtC40LUg0L3QsCDRg9Cy0L7QtCDQvNGL0YjQutC4INGB0L4g0YHRgtGA0LDQvdC40YbRiy4g0LXRgdC70Lgg0LzRi9GI0LrQsCDRg9GF0L7QtNC40YIg0LfQsCDQstC10YDRhdC90Y7RjiDQs9GA0LDQvdC40YbRgyDQtNC+0LrRg9C80LXQvdGC0LAsINCy0YvQt9GL0LLQsNC10YLRgdGPINC/0L7Qv9Cw0L9cbiAgICAgICAgICAgICAgdmFyIGUgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgICAgIGUgPSBlLmNsaWVudFk7XG4gICAgICAgICAgICAgIHZhciBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ldmVyLXBvcHVwJyk7XG5cbiAgICAgICAgICAgICAgaWYgKHBvcHVwICYmIGUgPCAxMCAmJiBtb3VzZU91dENvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgICAgICAgICAgICBtb3VzZU91dENvdW50Kys7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZ1bmN0aW9uIGFkZFBob25lQnRuKGJyZWFrcG9pbnQpIHtcbiAgICAgICAgICAgICAgLy8g0LTQvtCx0LDQstC70LXQvdC40LUg0YHQuNC90LXQuSDRgtGA0YPQsdC60Lgg0LTQu9GPINCy0YvQt9C+0LLQsCDQv9C+0L/QsNC/0LAg0L3QsCDQtNC10YHQutGC0L7Qv9C1XG4gICAgICAgICAgICAgIHZhciBwaG9uZUJ0bkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICBwaG9uZUJ0bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdwaG9uZUJ0bkNvbnRhaW5lcicpO1xuICAgICAgICAgICAgICBwaG9uZUJ0bkNvbnRhaW5lci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImJsdWVQaG9uZVwiPjxkaXYgY2xhc3M9XCIgcGhvbmUtY2FsbCBjYmgtcGhvbmUgY2JoLWdyZWVuIGNiaC1zaG93IGV2ZXItcG9wdXAtYnRuIGNiaC1zdGF0aWNcIiBpZD1cImNsYmhfcGhvbmVfZGl2XCI+PGRpdiBjbGFzcz1cInBob25lSnNcIj48ZGl2IGNsYXNzPVwiY2JoLXBoLWNpcmNsZVwiPjwvZGl2PjxkaXYgY2xhc3M9XCJjYmgtcGgtY2lyY2xlLWZpbGxcIj48L2Rpdj48ZGl2IGNsYXNzPVwiY2JoLXBoLWltZy1jaXJjbGUxXCI+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwaG9uZUJ0bkNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgICAgdmFyIHBob25lU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgcGhvbmVTdHlsZXMuaW5uZXJIVE1MID0gJy5waG9uZUJ0bkNvbnRhaW5lcntwb3NpdGlvbjpmaXhlZDsgcmlnaHQ6IDEwcHg7Ym90dG9tOiAxMHB4OyB2aXNpYmlsaXR5OmhpZGRlbjtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O3dpZHRoOjIwMHB4O2hlaWdodDoyMDBweDtjdXJzb3I6cG9pbnRlcjt6LWluZGV4Ojk5Oy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWigwKTstd2Via2l0LXRyYW5zaXRpb246dmlzaWJpbGl0eSAuNXM7LW1vei10cmFuc2l0aW9uOnZpc2liaWxpdHkgLjVzOy1vLXRyYW5zaXRpb246dmlzaWJpbGl0eSAuNXM7dHJhbnNpdGlvbjp2aXNpYmlsaXR5IC41c30uY2JoLXBob25lLmNiaC1zaG93e3Zpc2liaWxpdHk6dmlzaWJsZX1ALXdlYmtpdC1rZXlmcmFtZXMgZmFkZUluUmlnaHR7MCV7b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDEwMCUsMCwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMTAwJSwwLDApfTEwMCV7b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOm5vbmU7dHJhbnNmb3JtOm5vbmV9fUBrZXlmcmFtZXMgZmFkZUluUmlnaHR7MCV7b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDEwMCUsMCwwKTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDEwMCUsMCwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMTAwJSwwLDApfTEwMCV7b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOm5vbmU7LW1zLXRyYW5zZm9ybTpub25lO3RyYW5zZm9ybTpub25lfX1ALXdlYmtpdC1rZXlmcmFtZXMgZmFkZUluUmlnaHRCaWd7MCV7b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDIwMDBweCwwLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgyMDAwcHgsMCwwKX0xMDAle29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTpub25lO3RyYW5zZm9ybTpub25lfX1ALXdlYmtpdC1rZXlmcmFtZXMgZmFkZU91dFJpZ2h0ezAle29wYWNpdHk6MX0xMDAle29wYWNpdHk6MDstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgxMDAlLDAsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDEwMCUsMCwwKX19QGtleWZyYW1lcyBmYWRlT3V0UmlnaHR7MCV7b3BhY2l0eToxfTEwMCV7b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDEwMCUsMCwwKTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDEwMCUsMCwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMTAwJSwwLDApfX0uZmFkZU91dFJpZ2h0ey13ZWJraXQtYW5pbWF0aW9uLW5hbWU6ZmFkZU91dFJpZ2h0O2FuaW1hdGlvbi1uYW1lOmZhZGVPdXRSaWdodH0uY2JoLXBob25lLmNiaC1zdGF0aWMxe29wYWNpdHk6LjZ9LmNiaC1waG9uZS5jYmgtaG92ZXIxe29wYWNpdHk6MX0uY2JoLXBoLWNpcmNsZXt3aWR0aDoxNjBweDtoZWlnaHQ6MTYwcHg7dG9wOjIwcHg7bGVmdDoyMHB4O3Bvc2l0aW9uOmFic29sdXRlO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7LXdlYmtpdC1ib3JkZXItcmFkaXVzOjEwMCU7LW1vei1ib3JkZXItcmFkaXVzOjEwMCU7Ym9yZGVyLXJhZGl1czoxMDAlO2JvcmRlcjoycHggc29saWQgcmdiYSgzMCwzMCwzMCwuNCk7b3BhY2l0eTouMTstd2Via2l0LWFuaW1hdGlvbjpjYmgtY2lyY2xlLWFuaW0gMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dDstbW96LWFuaW1hdGlvbjpjYmgtY2lyY2xlLWFuaW0gMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dDstbXMtYW5pbWF0aW9uOmNiaC1jaXJjbGUtYW5pbSAxLjJzIGluZmluaXRlIGVhc2UtaW4tb3V0Oy1vLWFuaW1hdGlvbjpjYmgtY2lyY2xlLWFuaW0gMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dDthbmltYXRpb246Y2JoLWNpcmNsZS1hbmltIDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuNXM7LW1vei10cmFuc2l0aW9uOmFsbCAuNXM7LW8tdHJhbnNpdGlvbjphbGwgLjVzO3RyYW5zaXRpb246YWxsIC41c30uY2JoLXBob25lLmNiaC1hY3RpdmUgLmNiaC1waC1jaXJjbGUxey13ZWJraXQtYW5pbWF0aW9uOmNiaC1jaXJjbGUtYW5pbSAxLjFzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudDstbW96LWFuaW1hdGlvbjpjYmgtY2lyY2xlLWFuaW0gMS4xcyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnQ7LW1zLWFuaW1hdGlvbjpjYmgtY2lyY2xlLWFuaW0gMS4xcyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnQ7LW8tYW5pbWF0aW9uOmNiaC1jaXJjbGUtYW5pbSAxLjFzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudDthbmltYXRpb246Y2JoLWNpcmNsZS1hbmltIDEuMXMgaW5maW5pdGUgZWFzZS1pbi1vdXQhaW1wb3J0YW50fS5jYmgtcGhvbmUuY2JoLXN0YXRpYyAuY2JoLXBoLWNpcmNsZXstd2Via2l0LWFuaW1hdGlvbjpjYmgtY2lyY2xlLWFuaW0gMi4ycyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnQ7LW1vei1hbmltYXRpb246Y2JoLWNpcmNsZS1hbmltIDIuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQhaW1wb3J0YW50Oy1tcy1hbmltYXRpb246Y2JoLWNpcmNsZS1hbmltIDIuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQhaW1wb3J0YW50Oy1vLWFuaW1hdGlvbjpjYmgtY2lyY2xlLWFuaW0gMi4ycyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnQ7YW5pbWF0aW9uOmNiaC1jaXJjbGUtYW5pbSAyLjJzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudH0uY2JoLXBob25lLmNiaC1ob3ZlciAuY2JoLXBoLWNpcmNsZXtib3JkZXItY29sb3I6cmdiYSgwLDE3NSwyNDIsMSk7b3BhY2l0eTouNX0uY2JoLXBob25lLmNiaC1ncmVlbi5jYmgtaG92ZXIgLmNiaC1waC1jaXJjbGV7Ym9yZGVyLWNvbG9yOnJnYmEoMTE3LDIzNSw4MCwxKTtvcGFjaXR5Oi41fS5jYmgtcGhvbmUuY2JoLWdyZWVuIC5jYmgtcGgtY2lyY2xle2JvcmRlci1jb2xvcjpyZ2JhKDAsMTc1LDI0MiwxKTtvcGFjaXR5Oi41fS5jYmgtcGhvbmUuY2JoLWdyYXkuY2JoLWhvdmVyIC5jYmgtcGgtY2lyY2xle2JvcmRlci1jb2xvcjpyZ2JhKDIwNCwyMDQsMjA0LDEpO29wYWNpdHk6LjV9LmNiaC1waG9uZS5jYmgtZ3JheSAuY2JoLXBoLWNpcmNsZXtib3JkZXItY29sb3I6cmdiYSgxMTcsMjM1LDgwLDEpO29wYWNpdHk6LjV9LmNiaC1waC1jaXJjbGUtZmlsbHt3aWR0aDoxMDBweDtoZWlnaHQ6MTAwcHg7dG9wOjUwcHg7bGVmdDo1MHB4O3Bvc2l0aW9uOmFic29sdXRlO2JhY2tncm91bmQtY29sb3I6IzAwMDstd2Via2l0LWJvcmRlci1yYWRpdXM6MTAwJTstbW96LWJvcmRlci1yYWRpdXM6MTAwJTtib3JkZXItcmFkaXVzOjEwMCU7Ym9yZGVyOjJweCBzb2xpZCB0cmFuc3BhcmVudDtvcGFjaXR5Oi4xOy13ZWJraXQtYW5pbWF0aW9uOmNiaC1jaXJjbGUtZmlsbC1hbmltIDIuM3MgaW5maW5pdGUgZWFzZS1pbi1vdXQ7LW1vei1hbmltYXRpb246Y2JoLWNpcmNsZS1maWxsLWFuaW0gMi4zcyBpbmZpbml0ZSBlYXNlLWluLW91dDstbXMtYW5pbWF0aW9uOmNiaC1jaXJjbGUtZmlsbC1hbmltIDIuM3MgaW5maW5pdGUgZWFzZS1pbi1vdXQ7LW8tYW5pbWF0aW9uOmNiaC1jaXJjbGUtZmlsbC1hbmltIDIuM3MgaW5maW5pdGUgZWFzZS1pbi1vdXQ7YW5pbWF0aW9uOmNiaC1jaXJjbGUtZmlsbC1hbmltIDIuM3MgaW5maW5pdGUgZWFzZS1pbi1vdXQ7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuNXM7LW1vei10cmFuc2l0aW9uOmFsbCAuNXM7LW8tdHJhbnNpdGlvbjphbGwgLjVzO3RyYW5zaXRpb246YWxsIC41c30uY2JoLXBob25lLmNiaC1hY3RpdmUgLmNiaC1waC1jaXJjbGUtZmlsbHstd2Via2l0LWFuaW1hdGlvbjpjYmgtY2lyY2xlLWZpbGwtYW5pbSAxLjdzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudDstbW96LWFuaW1hdGlvbjpjYmgtY2lyY2xlLWZpbGwtYW5pbSAxLjdzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudDstbXMtYW5pbWF0aW9uOmNiaC1jaXJjbGUtZmlsbC1hbmltIDEuN3MgaW5maW5pdGUgZWFzZS1pbi1vdXQhaW1wb3J0YW50Oy1vLWFuaW1hdGlvbjpjYmgtY2lyY2xlLWZpbGwtYW5pbSAxLjdzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudDthbmltYXRpb246Y2JoLWNpcmNsZS1maWxsLWFuaW0gMS43cyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnR9LmNiaC1waG9uZS5jYmgtc3RhdGljIC5jYmgtcGgtY2lyY2xlLWZpbGx7LXdlYmtpdC1hbmltYXRpb246Y2JoLWNpcmNsZS1maWxsLWFuaW0gMi4zcyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnQ7LW1vei1hbmltYXRpb246Y2JoLWNpcmNsZS1maWxsLWFuaW0gMi4zcyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnQ7LW1zLWFuaW1hdGlvbjpjYmgtY2lyY2xlLWZpbGwtYW5pbSAyLjNzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudDstby1hbmltYXRpb246Y2JoLWNpcmNsZS1maWxsLWFuaW0gMi4zcyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnQ7YW5pbWF0aW9uOmNiaC1jaXJjbGUtZmlsbC1hbmltIDIuM3MgaW5maW5pdGUgZWFzZS1pbi1vdXQhaW1wb3J0YW50O29wYWNpdHk6MCFpbXBvcnRhbnR9IC5jYmgtcGhvbmUuY2JoLWhvdmVyIC5jYmgtcGgtY2lyY2xlLWZpbGx7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMTc1LDI0MiwuNSk7b3BhY2l0eTouNzUhaW1wb3J0YW50fS5jYmgtcGhvbmUuY2JoLWdyZWVuLmNiaC1ob3ZlciAuY2JoLXBoLWNpcmNsZS1maWxse2JhY2tncm91bmQtY29sb3I6cmdiYSgxMTcsMjM1LDgwLC41KTtvcGFjaXR5Oi43NSFpbXBvcnRhbnR9LmNiaC1waG9uZS5jYmgtZ3JlZW4gLmNiaC1waC1jaXJjbGUtZmlsbHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwxNzUsMjQyLC41KTtvcGFjaXR5Oi43NSFpbXBvcnRhbnR9LmNiaC1waG9uZS5jYmgtZ3JheS5jYmgtaG92ZXIgLmNiaC1waC1jaXJjbGUtZmlsbHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjA0LDIwNCwyMDQsLjUpO29wYWNpdHk6Ljc1IWltcG9ydGFudH0uY2JoLXBob25lLmNiaC1ncmF5IC5jYmgtcGgtY2lyY2xlLWZpbGx7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDExNywyMzUsODAsLjUpO29wYWNpdHk6Ljc1IWltcG9ydGFudH0uY2JoLXBoLWltZy1jaXJjbGUxe3dpZHRoOjYwcHg7aGVpZ2h0OjYwcHg7dG9wOjcwcHg7bGVmdDo3MHB4O3Bvc2l0aW9uOmFic29sdXRlO2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRElBQUFBeUNBWUFBQUFlUDRpeEFBQUFDWEJJV1hNQUFBc1RBQUFMRXdFQW1wd1lBQUFCTm1sRFExQlFhRzkwYjNOb2IzQWdTVU5ESUhCeWIyWnBiR1VBQUhqYXJZNnhTc05RRkVEUGk2TGlVQ3NFY1hCNGt5Z290dXBneHFRdFJSQ3MxU0hKMXFTaFNta1NYbDdWZm9Tald3Y1hkNy9BeVZGd1VQd0MvMEJ4NnVBUUlZT0RDSjdwM01QbGNzR28ySFduWVpSaEVHdlZianJTOVh3NSs4UU1Vd0RRQ2JQVWJyVU9BT0lranZqQjV5c0M0SG5UcmpzTi9zWjhtQ29OVElEdGJwU0ZJQ3BBLzBLbkdzUVlNSU4rcWtIY0FhWTZhZGRBUEFDbFh1NHZRQ25JL1Ewb0tkZnpRWHdBWnMvMWZERG1BRFBJZlFVd2RYU3BBV3BKT2xKbnZWTXRxNVpsU2J1YkJKRThIbVU2R21SeVB3NFRsU2FxbzZNdWtQOEh3R0srMkc0NmNxMXFXWHZyL0RPdTU4dmMzbzhRZ0ZoNkxGcEJPRlRuM3lxTW5kL240c1o0R1E1dllYcFN0TjBydU5tQWhldWlyVmFodkFYMzR5L0F4ay85NkZwUFlnQUFBQ0JqU0ZKTkFBQjZKUUFBZ0lNQUFQbi9BQUNBNkFBQVVnZ0FBUlZZQUFBNmx3QUFGMi9YV2grUUFBQUIvRWxFUVZSNDJ1eWE3VzNDTUJDRzMxUU00QTFhTmdnVGxHNlFicEJNa0hZQzFBbG9KNEJPQUJ1RURjZ0d0Qk9FVG5EOWMxRVJDSC9sd3hlYVY4b1BGR1A4Nkh5K0R4TVJFVzVCZDdnUmpTRFNOR240L1JpQU92bThDMFpDUkQ1UFNrUVZYU3IxbksveEUzbWNXaW1BMVpWM0pZQlpDSU80Z2lRQU5vWXhNd1lTNit4S1k0bFQ1ZEpQcmVXWlkrdXNwcVNDS1BZTjI3R0pWQkRYaGVWU1FlNDk0a3NpRVdUdU1YY3UxZGxkOVNBUnhEWDFPQUo0bGdqeTR6RG5Gc0MwNzZBNGFkRWlSd0FaZzRoT1VTcE5vQ3NCUERHTStIcWtOR3luWUJDdUlMdVdqK2RnV3lzR3NOZThud0w0R3NyVzBtMmZ4WkJxOXJXMHJOY1g1TU9ROWVaRDhKRmFoY0c1Zy9pS1Q2NzFhbEdBWVFnZ3BZV3ZwRVBZV3JVL0hEVE9mZVJJWDBxMlNMM1FONHRHaFpKdWtWb2JReVhZV3c3V3RMREtESXVNK1pTenNjeUNFOVBDeTVJdHRDdm5aTmFlaUdMTkhLdXo4WlZoL01YVFZ1LzF4UUttSXFMRUF1SjBmTm8zaUc1QjUxb1NrZUtuc0JpLzRiRzlnWUIvbEN5dFU1RzlEcnlGVyszR20rSkx3VTdlaGJKcndUanE0REpVOGJIY1ZiRVY5ZFhYcXFQNnVxTzVlMi9RWlJZSnBxdTJJVUFBNEIzdFh2eDhoZ0twMDVRWlc2ZEpxckxUTmtCNnZyUlVSTFJ3UEhxdFlna0MzY0xXUUFjRFFHR0tIMTNGRVIvTkFUemk3ODYrQlBETmptMWRNa2ZqbjJwR2tCSGtmNEQ4RGdCSkR1REh4OUJOK2dBQUFBQkpSVTVFcmtKZ2dnPT0pO2JhY2tncm91bmQtY29sb3I6cmdiYSgzMCwzMCwzMCwuMSk7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXIgY2VudGVyO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDstd2Via2l0LWJvcmRlci1yYWRpdXM6MTAwJTstbW96LWJvcmRlci1yYWRpdXM6MTAwJTtib3JkZXItcmFkaXVzOjEwMCU7Ym9yZGVyOjJweCBzb2xpZCB0cmFuc3BhcmVudDtvcGFjaXR5Oi43Oy13ZWJraXQtYW5pbWF0aW9uOmNiaC1jaXJjbGUtaW1nLWFuaW0gMXMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7LW1vei1hbmltYXRpb246Y2JoLWNpcmNsZS1pbWctYW5pbSAxcyBpbmZpbml0ZSBlYXNlLWluLW91dDstbXMtYW5pbWF0aW9uOmNiaC1jaXJjbGUtaW1nLWFuaW0gMXMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7LW8tYW5pbWF0aW9uOmNiaC1jaXJjbGUtaW1nLWFuaW0gMXMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7YW5pbWF0aW9uOmNiaC1jaXJjbGUtaW1nLWFuaW0gMXMgaW5maW5pdGUgZWFzZS1pbi1vdXR9LmNiaC1waG9uZS5jYmgtYWN0aXZlIC5jYmgtcGgtaW1nLWNpcmNsZTF7LXdlYmtpdC1hbmltYXRpb246Y2JoLWNpcmNsZS1pbWctYW5pbSAxcyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnQ7LW1vei1hbmltYXRpb246Y2JoLWNpcmNsZS1pbWctYW5pbSAxcyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnQ7LW1zLWFuaW1hdGlvbjpjYmgtY2lyY2xlLWltZy1hbmltIDFzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudDstby1hbmltYXRpb246Y2JoLWNpcmNsZS1pbWctYW5pbSAxcyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnQ7YW5pbWF0aW9uOmNiaC1jaXJjbGUtaW1nLWFuaW0gMXMgaW5maW5pdGUgZWFzZS1pbi1vdXQhaW1wb3J0YW50fS5jYmgtcGhvbmUuY2JoLXN0YXRpYyAuY2JoLXBoLWltZy1jaXJjbGUxey13ZWJraXQtYW5pbWF0aW9uOmNiaC1jaXJjbGUtaW1nLWFuaW0gMHMgaW5maW5pdGUgZWFzZS1pbi1vdXQhaW1wb3J0YW50Oy1tb3otYW5pbWF0aW9uOmNiaC1jaXJjbGUtaW1nLWFuaW0gMHMgaW5maW5pdGUgZWFzZS1pbi1vdXQhaW1wb3J0YW50Oy1tcy1hbmltYXRpb246Y2JoLWNpcmNsZS1pbWctYW5pbSAwcyBpbmZpbml0ZSBlYXNlLWluLW91dCFpbXBvcnRhbnQ7LW8tYW5pbWF0aW9uOmNiaC1jaXJjbGUtaW1nLWFuaW0gMHMgaW5maW5pdGUgZWFzZS1pbi1vdXQhaW1wb3J0YW50O2FuaW1hdGlvbjpjYmgtY2lyY2xlLWltZy1hbmltIDBzIGluZmluaXRlIGVhc2UtaW4tb3V0IWltcG9ydGFudH0uY2JoLXBob25lLmNiaC1ob3ZlciAuY2JoLXBoLWltZy1jaXJjbGUxe2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDE3NSwyNDIsMSl9LmNiaC1waG9uZS5jYmgtZ3JlZW4uY2JoLWhvdmVyIC5jYmgtcGgtaW1nLWNpcmNsZTE6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDExNywyMzUsODAsMSl9LmNiaC1waG9uZS5jYmgtZ3JlZW4gLmNiaC1waC1pbWctY2lyY2xlMXtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwxNzUsMjQyLDEpfS5jYmgtcGhvbmUuY2JoLWdyZWVuIC5jYmgtcGgtaW1nLWNpcmNsZTF7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMTc1LDI0MiwxKX0uY2JoLXBob25lLmNiaC1ncmF5LmNiaC1ob3ZlciAuY2JoLXBoLWltZy1jaXJjbGUxe2JhY2tncm91bmQtY29sb3I6cmdiYSgyMDQsMjA0LDIwNCwxKX0uY2JoLXBob25lLmNiaC1ncmF5IC5jYmgtcGgtaW1nLWNpcmNsZTF7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDExNywyMzUsODAsMSl9QC1tb3ota2V5ZnJhbWVzIGNiaC1jaXJjbGUtYW5pbXswJXstbW96LXRyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMC41KSBza2V3KDFkZWcpO29wYWNpdHk6LjE7LW1vei1vcGFjaXR5Oi4xOy13ZWJraXQtb3BhY2l0eTouMTstby1vcGFjaXR5Oi4xfTMwJXstbW96LXRyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoLjcpIHNrZXcoMWRlZyk7b3BhY2l0eTouNTstbW96LW9wYWNpdHk6LjU7LXdlYmtpdC1vcGFjaXR5Oi41Oy1vLW9wYWNpdHk6LjV9MTAwJXstbW96LXRyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMSkgc2tldygxZGVnKTtvcGFjaXR5Oi42Oy1tb3otb3BhY2l0eTouNjstd2Via2l0LW9wYWNpdHk6LjY7LW8tb3BhY2l0eTouMX19QC13ZWJraXQta2V5ZnJhbWVzIGNiaC1jaXJjbGUtYW5pbXswJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMC41KSBza2V3KDFkZWcpOy13ZWJraXQtb3BhY2l0eTouMX0zMCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDBkZWcpIHNjYWxlKC43KSBza2V3KDFkZWcpOy13ZWJraXQtb3BhY2l0eTouNX0xMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpOy13ZWJraXQtb3BhY2l0eTouMX19QC1vLWtleWZyYW1lcyBjYmgtY2lyY2xlLWFuaW17MCV7LW8tdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBrc2NhbGUoMC41KSBza2V3KDFkZWcpOy1vLW9wYWNpdHk6LjF9MzAley1vLXRyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoLjcpIHNrZXcoMWRlZyk7LW8tb3BhY2l0eTouNX0xMDAley1vLXRyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMSkgc2tldygxZGVnKTstby1vcGFjaXR5Oi4xfX1Aa2V5ZnJhbWVzIGNiaC1jaXJjbGUtYW5pbXswJXt0cmFuc2Zvcm06cm90YXRlKDBkZWcpIHNjYWxlKDAuNSkgc2tldygxZGVnKTtvcGFjaXR5Oi4xfTMwJXt0cmFuc2Zvcm06cm90YXRlKDBkZWcpIHNjYWxlKC43KSBza2V3KDFkZWcpO29wYWNpdHk6LjV9MTAwJXt0cmFuc2Zvcm06cm90YXRlKDBkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyk7b3BhY2l0eTouMX19QC1tb3ota2V5ZnJhbWVzIGNiaC1jaXJjbGUtZmlsbC1hbmltezAley1tb3otdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBzY2FsZSgwLjcpIHNrZXcoMWRlZyk7b3BhY2l0eTouMn01MCV7LW1vei10cmFuc2Zvcm06cm90YXRlKDBkZWcpIC1tb3otc2NhbGUoMSkgc2tldygxZGVnKTtvcGFjaXR5Oi4yfTEwMCV7LW1vei10cmFuc2Zvcm06cm90YXRlKDBkZWcpIHNjYWxlKDAuNykgc2tldygxZGVnKTtvcGFjaXR5Oi4yfX1ALXdlYmtpdC1rZXlmcmFtZXMgY2JoLWNpcmNsZS1maWxsLWFuaW17MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDBkZWcpIHNjYWxlKDAuNykgc2tldygxZGVnKTtvcGFjaXR5Oi4yfTUwJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMSkgc2tldygxZGVnKTtvcGFjaXR5Oi4yfTEwMCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDBkZWcpIHNjYWxlKDAuNykgc2tldygxZGVnKTtvcGFjaXR5Oi4yfX1ALW8ta2V5ZnJhbWVzIGNiaC1jaXJjbGUtZmlsbC1hbmltezAley1vLXRyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMC43KSBza2V3KDFkZWcpO29wYWNpdHk6LjJ9NTAley1vLXRyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMSkgc2tldygxZGVnKTtvcGFjaXR5Oi4yfTEwMCV7LW8tdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBzY2FsZSgwLjcpIHNrZXcoMWRlZyk7b3BhY2l0eTouMn19QGtleWZyYW1lcyBjYmgtY2lyY2xlLWZpbGwtYW5pbXswJXt0cmFuc2Zvcm06cm90YXRlKDBkZWcpIHNjYWxlKDAuNykgc2tldygxZGVnKTtvcGFjaXR5Oi4yfTUwJXt0cmFuc2Zvcm06cm90YXRlKDBkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyk7b3BhY2l0eTouMn0xMDAle3RyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMC43KSBza2V3KDFkZWcpO29wYWNpdHk6LjJ9fUBrZXlmcmFtZXMgY2JoLWNpcmNsZS1pbWctYW5pbXswJXt0cmFuc2Zvcm06cm90YXRlKDBkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyl9MTAle3RyYW5zZm9ybTpyb3RhdGUoLTI1ZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpfTIwJXt0cmFuc2Zvcm06cm90YXRlKDI1ZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpfTMwJXt0cmFuc2Zvcm06cm90YXRlKC0yNWRlZykgc2NhbGUoMSkgc2tldygxZGVnKX00MCV7dHJhbnNmb3JtOnJvdGF0ZSgyNWRlZykgc2NhbGUoMSkgc2tldygxZGVnKX0xMDAlLDUwJXt0cmFuc2Zvcm06cm90YXRlKDBkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyl9fUAtbW96LWtleWZyYW1lcyBjYmgtY2lyY2xlLWltZy1hbmltezAle3RyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMSkgc2tldygxZGVnKX0xMCV7LW1vei10cmFuc2Zvcm06cm90YXRlKC0yNWRlZykgc2NhbGUoMSkgc2tldygxZGVnKX0yMCV7LW1vei10cmFuc2Zvcm06cm90YXRlKDI1ZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpfTMwJXstbW96LXRyYW5zZm9ybTpyb3RhdGUoLTI1ZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpfTQwJXstbW96LXRyYW5zZm9ybTpyb3RhdGUoMjVkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyl9MTAwJSw1MCV7LW1vei10cmFuc2Zvcm06cm90YXRlKDBkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyl9fUAtd2Via2l0LWtleWZyYW1lcyBjYmgtY2lyY2xlLWltZy1hbmltezAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpfTEwJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTI1ZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpfTIwJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMjVkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyl9MzAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtMjVkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyl9NDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgyNWRlZykgc2NhbGUoMSkgc2tldygxZGVnKX0xMDAlLDUwJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMSkgc2tldygxZGVnKX19QC1vLWtleWZyYW1lcyBjYmgtY2lyY2xlLWltZy1hbmltezAley1vLXRyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMSkgc2tldygxZGVnKX0xMCV7LW8tdHJhbnNmb3JtOnJvdGF0ZSgtMjVkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyl9MjAley1vLXRyYW5zZm9ybTpyb3RhdGUoMjVkZWcpIHNjYWxlKDEpIHNrZXcoMWRlZyl9MzAley1vLXRyYW5zZm9ybTpyb3RhdGUoLTI1ZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpfTQwJXstby10cmFuc2Zvcm06cm90YXRlKDI1ZGVnKSBzY2FsZSgxKSBza2V3KDFkZWcpfTEwMCUsNTAley1vLXRyYW5zZm9ybTpyb3RhdGUoMGRlZykgc2NhbGUoMSkgc2tldygxZGVnKX19LmNiaC1waC1pbWctY2lyY2xlMSB7fS5jYmgtcGhvbmUuY2JoLWdyZWVuIC5jYmgtcGgtY2lyY2xlIHtib3JkZXItY29sb3I6IHJnYmEoMCwgMTc1LCAyNDIsIDEpfS5jYmgtcGhvbmUuY2JoLWdyZWVuIC5jYmgtcGgtY2lyY2xlLWZpbGwge2JhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMTc1LCAyNDIsIDEpO30uY2JoLXBob25lLmNiaC1ncmVlbiAuY2JoLXBoLWltZy1jaXJjbGUxIHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwgMTc1LCAyNDIsIDEpO31ib2R5LCBkaXYsIGRsLCBkdCwgZGQsIHVsLCBvbCwgbGksIG5hdiwgaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcHJlLCBjb2RlLCBmb3JtLCBmaWVsZHNldCwgbGVnZW5kLCBpbnB1dCwgYnV0dG9uLCB0ZXh0YXJlYSwgcCwgYmxvY2txdW90ZSwgdGgsIHRkLCBhIHstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBjZW50ZXI7LW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBjZW50ZXI7LW8tdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGNlbnRlcjt0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgY2VudGVyO31AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAnICsgYnJlYWtwb2ludCArICdweCkgeyNjbGJoX3Bob25lX2RpdntkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7fX0nO1xuICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuYXBwZW5kQ2hpbGQocGhvbmVTdHlsZXMpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcblxuICAgICAgICAgICAgICB2YXIgZGVza3RvcFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb25lVGhpcycpLFxuICAgICAgICAgICAgICAgICAgbW9iaWxlUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvbmVNb2JpbGVUaGlzJyk7XG5cbiAgICAgICAgICAgICAgdmFyIGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG91cnMnKSwgbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5taW51dGVzJyksXG4gICAgICAgICAgICAgICAgICBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY29uZHMnKTtcbiAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgaWYgKGggJiYgbSAmJiBzKSB7XG4gICAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQstGB0LUg0LfQvdCw0YfQtdC90LjRjyAo0YfQsNGB0Ysv0LzQuNC90YPRgtGLL9GB0LXQutGD0L3QtNGLKSDRgdGD0YnQtdGB0LLRgtGD0Y7Rgiwg0YLQvtCz0LTQsCDRgdGA0LDQsdCw0YLRi9Cy0LDQtdGCINGC0LDQudC80LXRgFxuICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZVRpbWVyKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGRlc2t0b3BQb3B1cCkge1xuICAgICAgICAgICAgICAgICAgY3JlYXRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgYWRkUG9wdXBTdHlsZSgpO1xuICAgICAgICAgICAgICAgICAgYWRkUGhvbmVCdG4oYnJlYWtwb2ludCk7XG4gICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGhvbmVCdG5Db250YWluZXInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dQb3B1cCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjcmVhdGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICBhZGRNb2JpbGVQb3B1cFN0eWxlKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoZGVza3RvcFBvcHVwIHx8IG1vYmlsZVBvcHVwKSB7XG4gICAgICAgICAgICAgICAgICAvL9C10YHQu9C4INGDINC90LDRgSDQtdGB0YLRjCAjY2xvbmVUaGlzINC40LvQuCAjY2xvbmVNb2JpbGVUaGlzLCDRgtC+0LPQtNCwINCy0YHQtSDRhNGD0L3QutGG0LjQuCDQvdC40LbQtSDQstGL0L/QvtC70L3Rj9GO0YLRgdGPXG5cbiAgICAgICAgICAgICAgICAgIGNyZWF0ZU1vZGFsQm9keShicmVha3BvaW50KTtcbiAgICAgICAgICAgICAgICAgIG1vZGFsUG9zaXRpb24od2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ldmVyLXBvcHVwX19jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZVBvcHVwKTtcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ldmVyLXBvcHVwX19pbm5lcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbm90SGlkZSk7XG4gICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXZlci1wb3B1cCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZVBvcHVwKTtcblxuICAgICAgICAgICAgICAgICAgdmFyIG1vZGFsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmV2ZXItcG9wdXAtYnRuJyk7XG4gICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vZGFsQnRuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbW9kYWxCdG4gJiYgbW9kYWxCdG5baV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93UG9wdXApO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vINGA0LDQsdC+0LDRgtC10YIg0LXRgdC70Lgg0YMg0L3QsNGBINC10YHRgtGMINC60LvQsNGB0YEgLmNoZWNrX19idG5cbiAgICAgICAgICAgICAgdmFyIGNoZWNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaGVja19fYnRuXCIpO1xuICAgICAgICAgICAgICBjaGVja0J0biAmJiBjaGVja0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrQ29kZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8g0L/RgNC4INC00L7QutGD0LzQtdC90YIg0YDQtdC00Lgg0LLRi9C30YvQstCw0LXRgtGB0Y8g0YTRg9C90LrRhtC40Y8gaW5pdCwg0L7Qv9C40YHQsNC90LDRjyDQstGL0YjQtVxuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0KTtcblxuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIC8v0L/RgNC4INGA0LXRgdCw0LnQt9C1INC/0LXRgNC10YHRh9C40YLRi9Cy0LDQtdC8INC/0L7Qt9C40YbQuNC+0L3QuNGA0L7QstCw0L3QuNC1INC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwXG4gICAgICAgICAgICAgIG1vZGFsUG9zaXRpb24od2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZ1bmN0aW9uIGluaXRpYWxpemVUaW1lcigpIHtcblxuICAgICAgICAgICAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaGV5dGltZXJcIikpIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0aW1lID0ge1xuICAgICAgICAgICAgICAgICAgICAgIGhvdXJzOiAwLFxuICAgICAgICAgICAgICAgICAgICAgIG1pbnV0ZXM6IDI3LFxuICAgICAgICAgICAgICAgICAgICAgIHNlY29uZHM6IDBcbiAgICAgICAgICAgICAgICAgIH0sIGRpZmZlcmVudCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICB0aW1lID0gdGltZS5ob3VycyAqIDM2MDAgKyB0aW1lLm1pbnV0ZXMgKiA2MCArIHRpbWUuc2Vjb25kcztcblxuICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0aW1lXCIsIHRpbWUpO1xuICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJoZXl0aW1lclwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZGlmZmVyZW50XCIsIGRpZmZlcmVudCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aW1lclNldHRpbmdzKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gdGltZXJTZXR0aW5ncygpIHtcbiAgICAgICAgICAgICAgdmFyIHRpbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGltZScpLFxuICAgICAgICAgICAgICAgICAgZGlmZmVyZW50ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RpZmZlcmVudCcpID09PSBcInRydWVcIixcbiAgICAgICAgICAgICAgICAgIGhvdXJzID0gcGFyc2VJbnQodGltZSAvIDM2MDAsIDEwKSxcbiAgICAgICAgICAgICAgICAgIG1pbnV0ZXMgPSBwYXJzZUludCgodGltZSAtIGhvdXJzICogMzYwMCApIC8gNjAsIDEwKSxcbiAgICAgICAgICAgICAgICAgIHNlY29uZHMgPSBwYXJzZUludCh0aW1lICUgNjAsIDEwKTtcblxuICAgICAgICAgICAgICBtaW51dGVzID0gbWludXRlcyA8IDEwID8gXCIwXCIgKyBtaW51dGVzIDogXCJcIiArIG1pbnV0ZXM7XG4gICAgICAgICAgICAgIHNlY29uZHMgPSBzZWNvbmRzIDwgMTAgPyBcIjBcIiArIHNlY29uZHMgOiBcIlwiICsgc2Vjb25kcztcbiAgICAgICAgICAgICAgaG91cnMgPSBob3VycyA8IDEwID8gXCIwXCIgKyBob3VycyA6IFwiXCIgKyBob3VycztcblxuICAgICAgICAgICAgICB2YXIgaG91cnNIVE1MID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhvdXJzXCIpO1xuICAgICAgICAgICAgICB2YXIgbWludXRlc0hUTUwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibWludXRlc1wiKTtcbiAgICAgICAgICAgICAgdmFyIHNlY29uZHNIVE1MID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNlY29uZHNcIik7XG5cbiAgICAgICAgICAgICAgaWYgKC0tdGltZSA8IDApIHtcbiAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiaGV5dGltZXJcIik7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGRpZmZlcmVudCkge1xuICAgICAgICAgICAgICAgICAgc2Vjb25kcyA9IHNlY29uZHMuc3BsaXQoXCJcIik7XG4gICAgICAgICAgICAgICAgICBtaW51dGVzID0gbWludXRlcy5zcGxpdChcIlwiKTtcbiAgICAgICAgICAgICAgICAgIGhvdXJzID0gaG91cnMuc3BsaXQoXCJcIik7XG5cbiAgICAgICAgICAgICAgICAgIGRvdWJsZUZpbGxpbmcoaG91cnNIVE1MLCBob3Vycyk7XG4gICAgICAgICAgICAgICAgICBkb3VibGVGaWxsaW5nKG1pbnV0ZXNIVE1MLCBtaW51dGVzKTtcbiAgICAgICAgICAgICAgICAgIGRvdWJsZUZpbGxpbmcoc2Vjb25kc0hUTUwsIHNlY29uZHMpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZmlsbGluZyhob3Vyc0hUTUwsIGhvdXJzKTtcbiAgICAgICAgICAgICAgICAgIGZpbGxpbmcobWludXRlc0hUTUwsIG1pbnV0ZXMpO1xuICAgICAgICAgICAgICAgICAgZmlsbGluZyhzZWNvbmRzSFRNTCwgc2Vjb25kcyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRpbWVcIiwgdGltZSk7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQodGltZXJTZXR0aW5ncywgMTAwMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gZmlsbGluZyhvYmosIHZhbHVlKSB7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBvYmpbaV0uaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBkb3VibGVGaWxsaW5nKG9iaiwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIG9ialtpXS5pbm5lckhUTUwgPSB2YWx1ZVtpICUgMl07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGluaXRpYXRlKCk7XG5cbiAgfSkoKTtcbiAgLy8g0K/QutGJ0L4g0L/QvtGC0YDRltCx0LXQvSDQstC40LLRltC0INC00LDRgtC4INGC0LAg0YfQsNGBICsg0YXQstC40LvQuNC9LCDRgtC+0LTRliDQtNC+INGB0L/QsNC90LAg0Lcg0LTQsNGC0L7RjiDQtNC+0LTQsNGU0LzQviDQutC70LDRgSBcInRpbWVcIiA8c3BhbiBjbGFzcz1cImRhdGUtMSB0aW1lXCI+PC9zcGFuPi4gXG4gIC8vINCf0YDQsNGG0Y7RlCDRj9C6INCyINC/0L7RgNGP0LTQutGDINGB0L/QsNC00LDQvdC90Y8sINGC0LDQuiDRliDQsiDQv9C+0YDRj9C00LrRgyDQt9GA0L7RgdGC0LDQvdC90Y8uXG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgRGF0ZWUpO1xuXG4gIGZ1bmN0aW9uIERhdGVlKCkge1xuICAgICAgdmFyIG1zSW5EYXkgPSA4NjQwMDAwMCxcbiAgICAgICAgICBjb3VudGVyTGVuZ3RoID0gOTAsXG4gICAgICAgICAgbW9udGhzLCBjb3VudHJ5TmFtZSA9ICdydScsICAvLyDQktGB0YLQsNC90L7QstC70Y7RlNC80L4g0LzQvtCy0YMg0LTQu9GPINC80ZbRgdGP0YbRltCyLiBcbiAgICAgICAgICBpc0FiYnJldmlhdGVkID0gZmFsc2UsIC8vINCv0LrRidC+INC/0L7RgtGA0ZbQsdC90L4g0YHQutC+0YDQvtGH0LXQvdC40Lkg0LLQsNGA0ZbQsNC90YIg0LzRltGB0Y/RhtGW0LIg0Lcg0YLRgNGM0L7RhSDQsdGD0LrQsiwg0L3QsNC/0YDQuNC60LvQsNC0IFwi0Y/QvdCyXCIsIFwi0LjRjtC9XCIg0ZYg0YIu0LQsINGC0L7QtNGWINGB0YLQsNCy0LjQvCBUUlVFLlxuICAgICAgICAgIGxvY2FsRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICBzd2l0Y2goY291bnRyeU5hbWUpIHtcbiAgICAgICAgICBjYXNlICdpdCc6ICAvLyBJdGFseVxuICAgICAgICAgICAgICBtb250aHMgPSBbJ0dlbm5haW8nLCAnRmViYnJhaW8nLCAnTWFyem8nLCAnQXByaWxlJywgJ01hZ2dpbycsICdHaXVnbm8nLCAnTHVnbGlvJywgJ0Fnb3N0bycsICdTZXR0ZW1icmUnLCAnT3R0b2JyZScsICdOb3ZlbWJyZScsICdEaWNlbWJyZSddO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdlcyc6ICAvLyBTcGFpblxuICAgICAgICAgICAgICBtb250aHMgPSBbJ0VuZXJvJywgJ0ZlYnJlcm8nLCAnTWFyem8nLCAnQWJyaWwnLCAnTWF5bycsICdKdW5pbycsICdKdWxpbycsICdBZ29zdG8nLCAnU2VwdGllbWJyZScsICdPY3R1YnJlJywgJ05vdmllbWJyZScsICdEaWNpZW1icmUnXTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZnInOiAgLy8gRnJhbmNlXG4gICAgICAgICAgICAgIG1vbnRocyA9IFsnSmFudmllcicsICdGw6l2cmllcicsICdNYXJzJywgJ0F2cmlsJywgJ01haScsICdKdWluJywgJ0p1aWxsZXQnLCAnQW/Du3QnLCAnU2VwdGVtYnJlJywgJ09jdG9icmUnLCAnTm92ZW1icmUnLCAnRMOpY2VtYnJlJ107XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3B0JzogIC8vIFBvcnR1Z2FsXG4gICAgICAgICAgICAgIG1vbnRocyA9IFsnSmFuZWlybycsICdGZXZlcmVpcm8nLCAnTWFyw6dvJywgJ0FicmlsJywgJ01haW8nLCAnSnVuaG8nLCAnSnVsaG8nLCAnQWdvc3RvJywgJ1NldGVtYnJvJywgJ091dHVicm8nLCAnTm92ZW1icm8nLCAnRGV6ZW1icm8nXTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZGUnOiAgLy8gR2VybWFueVxuICAgICAgICAgICAgICBtb250aHMgPSBbJ0phbnVhcicsICdGZWJydWFyJywgJ03DpHJ6JywgJ0FwcmlsJywgJ01haScsICdKdW5pJywgJ0p1bGknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPa3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlemVtYmVyJ107XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2JnJzogIC8vIEJ1bGdhcmlhXG4gICAgICAgICAgICAgIG1vbnRocyA9IFsn0K/QvdGD0LDRgNC4JywgJ9Ck0LXQstGA0YPQsNGA0LgnLCAn0JzQsNGA0YInLCAn0JDQv9GA0LjQuycsICfQnNCw0LknLCAn0K7QvdC4JywgJ9Cu0LvQuCcsICfQkNCy0LPRg9GB0YInLCAn0KHQtdC/0YLQtdC80LLRgNC4JywgJ9Ce0LrRgtC+0LzQstGA0LgnLCAn0J3QvtC10LzQstGA0LgnLCAn0JTQtdC60LXQvNCy0YDQuCddO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdwbCc6ICAvLyBQb2xhbmRcbiAgICAgICAgICAgICAgbW9udGhzID0gWydTdHljemXFhCcsICdMdXR5JywgJ01hcnplYycsICdLd2llY2llxYQnLCAnTWFqJywgJ0N6ZXJ3aWVjJywgJ0xpcGllYycsICdTaWVycGllxYQnLCAnV3J6ZXNpZcWEJywgJ1Bhxbpkemllcm5paycsICdMaXN0b3BhZCcsICdHcnVkemllxYQnXTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncm8nOiAgLy8gUm9tYW5pYVxuICAgICAgICAgICAgICBtb250aHMgPSBbJ0lhbnVhcmllJywgJ0ZlYnJ1YXJpZScsICdNYXJ0aWUnLCAnQXByaWxpZScsICdNYWknLCAnSXVuaWUnLCAnSXVsaWUnLCAnQXVndXN0JywgJ1NlcHRlbWJyaWUnLCAnT2N0b21icmllJywgJ05vaWVtYnJpZScsICdEZWNlbWJyaWUnXTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnaHUnOiAgLy8gSHVuZ2FyeSAo0KDRg9C80YPQvdGW0Y8pXG4gICAgICAgICAgICAgIG1vbnRocyA9IFsnSmFudcOhcicsICdGZWJydcOhcicsICdNw6FyY2l1cycsICfDgXByaWxpcycsICdNw6FqdXMnLCAnSsO6bml1cycsICdKw7psaXVzJywgJ0F1Z3VzenR1cycsICdTemVwdGVtYmVyJywgJ09rdMOzYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ107XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2dyJzogIC8vIEdyZWVjZVxuICAgICAgICAgIGNhc2UgJ2N5JzogIC8vIEN5cHJ1cyAo0JrRltC/0YApXG4gICAgICAgICAgICAgIG1vbnRocyA9IFsnzpnOsc69zr/Phc6sz4HOuc6/z4InLCAnzqbOtc6yz4HOv8+FzqzPgc65zr/PgicsICfOnM6sz4HPhM65zr/PgicsICfOkc+Az4HOr867zrnOv8+CJywgJ86czqzOuc6/z4InLCAnzpnOv8+Nzr3Ouc6/z4InLCAnzpnOv8+NzrvOuc6/z4InLCAnzpHPjc6zzr/Phc+Dz4TOv8+CJywgJ86jzrXPgM+Ezq3OvM6yz4HOuc6/z4InLCAnzp/Ous+Ez47Oss+BzrnOv8+CJywgJ86dzr/Orc68zrLPgc65zr/PgicsICfOlM61zrrOrc68zrLPgc65zr/PgiddO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdydSc6ICAvLyBSdXNzaWFcbiAgICAgICAgICAgICAgbW9udGhzID0gWyfQr9C90LLQsNGA0Y8nLCAn0KTQtdCy0YDQsNC70Y8nLCAn0JzQsNGA0YLQsCcsICfQkNC/0YDQtdC70Y8nLCAn0JzQsNGPJywgJ9CY0Y7QvdGPJywgJ9CY0Y7Qu9GPJywgJ9CQ0LLQs9GD0YHRgtCwJywgJ9Ch0LXQvdGC0Y/QsdGA0Y8nLCAn0J7QutGC0Y/QsdGA0Y8nLCAn0J3QvtGP0LHRgNGPJywgJ9CU0LXQutCw0LHRgNGPJ107XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNBYmJyZXZpYXRlZCkge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW9udGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIG1vbnRoc1tpXSA9IG1vbnRoc1tpXS5zbGljZSgwLCAzKS50b0xvd2VyQ2FzZSgpOyAgLy8g0J/RgNC40LHQuNGA0LDRlNC80L4gXCIudG9Mb3dlckNhc2UoKVwiLCDRj9C60YnQviDQv9C10YDRiNCwINCx0YPQutCy0LAg0L/QvtCy0LjQvdC90LAg0LHRg9GC0Lgg0LLQtdC70LjQutC+0Y4uXG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBjb3VudGVyID0gMDsgY291bnRlciA8IGNvdW50ZXJMZW5ndGg7IGNvdW50ZXIrKykge1xuICAgICAgICAgIHZhciBkYXRlQ2xhc3MgPSBcImRhdGUtXCIgKyBjb3VudGVyLFxuICAgICAgICAgICAgICBub2RlTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoZGF0ZUNsYXNzKSxcbiAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGxvY2FsRGF0ZS5nZXRUaW1lKCkgLSBjb3VudGVyICogbXNJbkRheSksXG4gICAgICAgICAgICAgIHRpbWVDb3VudGVyID0gMDtcbiAgICAgICAgICAgICAgdGltZUFycmF5ID0gdGltZShub2RlTGlzdC8qLCB0cnVlKi8pOyAvLyDQoNC+0LfQutC+0LzQtdC90YLRg9Cy0LDRgtC4LCDRj9C60YnQviDQvdC10L7QsdGF0ZbQtNC90LUg0YHQvtGA0YLRg9Cy0LDQvdC90Y8g0LIg0L/QvtGA0Y/QtNC60YMg0YHQv9Cw0LTQsNC90L3Rjy5cblxuICAgICAgICAgIHRpbWVBcnJheSA9IHRpbWVGb3JtYXQodGltZUFycmF5KTtcblxuICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9IG5vZGVMaXN0W2ldLmRhdGFzZXQ7XG5cbiAgICAgICAgICAgICAgaWYgKGRhdGEuZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgICBub2RlTGlzdFtpXS5pbm5lckhUTUwgPSBmb3JtYXQoZGF0ZSwgZGF0YS5mb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgLy8gZm9ybWF0OiDQvtGB0L7QsdC70LjQstC40Lkg0YTQvtGA0LzQsNGC0Ywg0LTQu9GPINC+0LrRgNC10LzQvtGXINC00LDRgtC4LiDQlNC+0LTQsNGU0Lwg0Y/QuiBkYXRhLWZvcm1hdD1cItGE0L7QvNCw0YDRglwiLiDQpNC+0YDQvNCw0YLQuCDQtNC40LLQuNGC0LjRgdGMINCyIHN3aXRjaCfRliDQvdC40LbRh9C1LiBkZCAtINGG0LjRhNGA0LgsIGRheSAtINC/0YDQvtC/0LjRgdC+0LwuXG4gICAgICAgICAgICAgICAgICAvLyA8c3BhbiBjbGFzcz1cImRhdGUtMVwiIGRhdGEtZm9ybWF0PVwiZGQgbW9udGggeXl5eVwiPjwvc3Bhbj4gLSDQvNC+0YLQsNGUINC90LAgMSDQtNC10L3RjCDQvdCw0LfQsNC0INGWINCy0LjQstC+0LTQuNGC0Ywg0YbQtdC5IHNwYW4g0YMg0LLQuNCz0LvRj9C00ZYgXCIyNCDQm9C40L/QvdGPIDE5OTVcIi5cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIG5vZGVMaXN0W2ldLmlubmVySFRNTCA9IGZvcm1hdChkYXRlLyosIFwiZGQgbW9udGggeXl5eVwiKi8pOyAvLyBEZWZhdWx0OiBkZC5tbS55eXl5IEFERCBGT1JNQVQgSEVSRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoL1xcYnRpbWVcXGIvLnRlc3Qobm9kZUxpc3RbaV0uY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgbm9kZUxpc3RbaV0uaW5uZXJIVE1MICs9IFwiIFwiICsgdGltZUFycmF5W3RpbWVDb3VudGVyXTsgLy8g0KDRj9C00L7QuiDQtNC70Y8g0YTQvtGA0LzQsNGC0YMg0LLQuNCy0L7QtNGDINGH0LDRgdGDLlxuICAgICAgICAgICAgICAgICAgdGltZUNvdW50ZXIrKztcbiAgICAgICAgICAgICAgfSBcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIDxzcGFuIGNsYXM9XCJkYXRlLU5VTUJFUlwiPjwvc3Bhbj4gLSDQvNC+0YLQsNGUINGH0LDRgSDQvdCw0LfQsNC0INC90LAgTlVNQkVSINC00L3RltCyLiDQndCw0L/RgNC40LrQu9Cw0LQsIDxzcGFuIGNsYXNzTmFtZT1cImRhdGUtNVwiPjwvc3Bhbj5cbiAgICAgIC8vIDxzcGFuIGNsYXM9XCJkYXRlTlVNQkVSXCI+PC9zcGFuPiAtINC80L7RgtCw0ZQg0YfQsNGBINCy0L/QtdGA0LXQtCDQvdCwIE5VTUJFUiDQtNC90ZbQsi4g0J3QsNC/0YDQuNC60LvQsNC0LCA8c3BhbiBjbGFzc05hbWU9XCJkYXRlNVwiPjwvc3Bhbj5cblxuICAgICAgZm9yICh2YXIgY291bnRlciA9IDA7IGNvdW50ZXIgPCBjb3VudGVyTGVuZ3RoOyBjb3VudGVyKyspIHtcbiAgICAgICAgICB2YXIgZGF0ZUNsYXNzID0gXCJkYXRlXCIgKyBjb3VudGVyLFxuICAgICAgICAgICAgICBub2RlTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoZGF0ZUNsYXNzKSxcbiAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGxvY2FsRGF0ZS5nZXRUaW1lKCkgKyBjb3VudGVyICogbXNJbkRheSksXG4gICAgICAgICAgICAgIHRpbWVDb3VudGVyID0gMDtcbiAgICAgICAgICAgICAgdGltZUFycmF5ID0gdGltZShub2RlTGlzdC8qLCB0cnVlKi8pOyAvLyDQoNC+0LfQutC+0LzQtdC90YLRg9Cy0LDRgtC4LCDRj9C60YnQviDQvdC10L7QsdGF0ZbQtNC90LUg0YHQvtGA0YLRg9Cy0LDQvdC90Y8g0LIg0L/QvtGA0Y/QtNC60YMg0YHQv9Cw0LTQsNC90L3Rjy5cblxuICAgICAgICAgIHRpbWVBcnJheSA9IHRpbWVGb3JtYXQodGltZUFycmF5KTtcblxuICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9IG5vZGVMaXN0W2ldLmRhdGFzZXQ7XG5cbiAgICAgICAgICAgICAgaWYgKGRhdGEuZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgICBub2RlTGlzdFtpXS5pbm5lckhUTUwgPSBmb3JtYXQoZGF0ZSwgZGF0YS5mb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgLy8gZm9ybWF0OiDQvtGB0L7QsdC70LjQstC40Lkg0YTQvtGA0LzQsNGC0Ywg0LTQu9GPINC+0LrRgNC10LzQvtGXINC00LDRgtC4LiDQlNC+0LTQsNGU0Lwg0Y/QuiBkYXRhLWZvcm1hdD1cItGE0L7QvNCw0YDRglwiLiDQpNC+0YDQvNCw0YLQuCDQtNC40LLQuNGC0LjRgdGMINCyIHN3aXRjaCfRliDQvdC40LbRh9C1LiBkZCAtINGG0LjRhNGA0LgsIGRheSAtINC/0YDQvtC/0LjRgdC+0LwuXG4gICAgICAgICAgICAgICAgICAvLyA8c3BhbiBjbGFzcz1cImRhdGUtMVwiIGRhdGEtZm9ybWF0PVwiZGQgbW9udGggeXl5eVwiPjwvc3Bhbj4gLSDQvNC+0YLQsNGUINC90LAgMSDQtNC10L3RjCDQvdCw0LfQsNC0INGWINCy0LjQstC+0LTQuNGC0Ywg0YbQtdC5IHNwYW4g0YMg0LLQuNCz0LvRj9C00ZYgXCIyNCDQm9C40L/QvdGPIDE5OTVcIi5cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIG5vZGVMaXN0W2ldLmlubmVySFRNTCA9IGZvcm1hdChkYXRlLyosIFwiZGQgbW9udGggeXl5eVwiKi8pOyAvLyBEZWZhdWx0OiBkZC5tbS55eXl5IEFERCBGT1JNQVQgSEVSRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cblxuXG5cbiAgICAgIGZ1bmN0aW9uIHRpbWUobm9kZUxpc3QsIHJldmVyc2UpIHtcbiAgICAgIHZhciB0aW1lQXJyYXkgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChub2RlTGlzdFtpXS5jbGFzc05hbWUubWF0Y2goL1xcYnRpbWVcXGIvKSkge1xuICAgICAgICAgICAgICB0aW1lQXJyYXkucHVzaCh0aW1lUmFuZG9tKCkpO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHJldmVyc2UpIHRpbWVBcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGIgLSBhOyB9KTtcbiAgICAgIGVsc2UgdGltZUFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYSAtIGI7IH0pO1xuXG4gICAgICByZXR1cm4gdGltZUFycmF5O1xuICB9IFxuXG4gIGZ1bmN0aW9uIHRpbWVSYW5kb20oKSB7XG4gICAgICByZXR1cm4gTWF0aC5yb3VuZCgwICsgTWF0aC5yYW5kb20oKSAqIDE0NDApO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZUZvcm1hdCh0aW1lYXJyYXkpIHtcbiAgICAgIHZhciBhcnJheSA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRpbWVhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGh0ZW1wID0gTWF0aC5mbG9vcih0aW1lYXJyYXlbaV0gLyA2MCksIG10ZW1wID0gdGltZWFycmF5W2ldICUgNjAsXG4gICAgICAgICAgaG91cnMgPSBodGVtcCA8IDEwID8gXCIwXCIgKyBodGVtcCA6IGh0ZW1wLFxuICAgICAgICAgIG1pbnV0ZXMgPSBtdGVtcCA8IDEwID8gXCIwXCIgKyBtdGVtcCA6IG10ZW1wOyBcbiAgICAgIGFycmF5LnB1c2goaG91cnMgKyBcIjpcIiArIG1pbnV0ZXMpOyAgXG4gICAgICB9XG4gICAgICBcblxuICAgICAgcmV0dXJuIGFycmF5O1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0KGRhdGUsIGZvcm1hdHN0cmluZykge1xuICAgICAgdmFyIGlubmVyRGF0ZSA9IFwiXCIsXG4gICAgICAgICAgZGF5ID0gZGF0ZS5nZXREYXRlKCksXG4gICAgICAgICAgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDEsXG4gICAgICAgICAgZm8gPSBmb3JtYXRzdHJpbmcgfHwgdHJ1ZTtcblxuICAgICAgc3dpdGNoIChmbykge1xuICAgICAgICAgIGNhc2UgXCJtbS5kZC55eXl5XCI6IFxuICAgICAgICAgICAgICBpbm5lckRhdGUgKz0gKG1vbnRoIDwgMTApID8gKFwiMFwiICsgbW9udGgpIDogbW9udGg7XG4gICAgICAgICAgICAgIGlubmVyRGF0ZSArPSBcIi5cIjtcbiAgICAgICAgICAgICAgaW5uZXJEYXRlICs9IChkYXkgPCAxMCkgPyAoXCIwXCIgKyBkYXkpIDogZGF5O1xuICAgICAgICAgICAgICBpbm5lckRhdGUgKz0gXCIuXCIgKyB5ZWFyO1xuICAgICAgICAgICAgICByZXR1cm4gaW5uZXJEYXRlOyAgICAgICAgICAgIFxuXG4gICAgICAgICAgY2FzZSBcImRkIG1vbnRoIHl5eXlcIjogXG4gICAgICAgICAgICAgIGlubmVyRGF0ZSArPSAoZGF5IDwgMTApID8gKFwiMFwiICsgZGF5KSA6IGRheTtcbiAgICAgICAgICAgICAgaW5uZXJEYXRlICs9IFwiIFwiO1xuICAgICAgICAgICAgICBpbm5lckRhdGUgKz0gbW9udGhzW21vbnRoIC0gMV07XG4gICAgICAgICAgICAgIGlubmVyRGF0ZSArPSBcIiBcIiArIHllYXI7XG4gICAgICAgICAgICAgIHJldHVybiBpbm5lckRhdGU7ICAgICAgXG5cbiAgICAgICAgICBjYXNlIFwiZGQgbW9udGhcIjogXG4gICAgICAgICAgICAgIGlubmVyRGF0ZSArPSAoZGF5IDwgMTApID8gKFwiMFwiICsgZGF5KSA6IGRheTtcbiAgICAgICAgICAgICAgaW5uZXJEYXRlICs9IFwiIFwiO1xuICAgICAgICAgICAgICBpbm5lckRhdGUgKz0gbW9udGhzW21vbnRoIC0gMV07XG4gICAgICAgICAgICAgIHJldHVybiBpbm5lckRhdGU7XG5cbiAgICAgICAgICBjYXNlIFwiZGF5IGRkLCBtb250aCB5eXl5XCI6IFxuICAgICAgICAgICAgICB2YXIgZGF5cyA9IFtcItCS0L7RgdC60YDQtdGB0LXQvdGM0LVcIiwgXCLQn9C+0L3QtdC00LXQu9GM0L3QuNC6XCIsIFwi0JLRgtC+0YDQvdC40LpcIiwgXCLQodGA0LXQtNCwXCIsIFwi0KfQtdGC0LLQtdGA0LNcIiwgXCLQn9GP0YLQvdC40YbQsFwiLCBcItCh0YPQsdCx0L7RgtCwXCJdO1xuICAgICAgICAgICAgICBpbm5lckRhdGUgKz0gZGF5c1tuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSkuZ2V0RGF5KCldO1xuICAgICAgICAgICAgICBpbm5lckRhdGUgKz0gXCIgXCI7XG4gICAgICAgICAgICAgIGlubmVyRGF0ZSArPSAoZGF5IDwgMTApID8gKFwiMFwiICsgZGF5KSA6IGRheTtcbiAgICAgICAgICAgICAgaW5uZXJEYXRlICs9IFwiIFwiO1xuICAgICAgICAgICAgICBpbm5lckRhdGUgKz0gbW9udGhzW21vbnRoIC0gMV07XG4gICAgICAgICAgICAgIGlubmVyRGF0ZSArPSBcIiBcIiArIHllYXI7XG4gICAgICAgICAgICAgIHJldHVybiBpbm5lckRhdGU7XG5cbiAgICAgICAgICBjYXNlIFwiZGQvbW0veXl5eVwiOlxuICAgICAgICAgICAgICBpbm5lckRhdGUgKz0gKGRheSA8IDEwKSA/IChcIjBcIiArIGRheSkgOiBkYXk7XG4gICAgICAgICAgICAgIGlubmVyRGF0ZSArPSBcIi9cIjtcbiAgICAgICAgICAgICAgaW5uZXJEYXRlICs9IChtb250aCA8IDEwKSA/IChcIjBcIiArIG1vbnRoKSA6IG1vbnRoO1xuICAgICAgICAgICAgICBpbm5lckRhdGUgKz0gXCIvXCIgKyB5ZWFyO1xuICAgICAgICAgICAgICByZXR1cm4gaW5uZXJEYXRlO1xuXG4gICAgICAgICAgY2FzZSBcImRkLW1tLXl5eXlcIjpcbiAgICAgICAgICAgICAgaW5uZXJEYXRlICs9IChkYXkgPCAxMCkgPyAoXCIwXCIgKyBkYXkpIDogZGF5O1xuICAgICAgICAgICAgICBpbm5lckRhdGUgKz0gXCItXCI7XG4gICAgICAgICAgICAgIGlubmVyRGF0ZSArPSAobW9udGggPCAxMCkgPyAoXCIwXCIgKyBtb250aCkgOiBtb250aDtcbiAgICAgICAgICAgICAgaW5uZXJEYXRlICs9IFwiLVwiICsgeWVhcjtcbiAgICAgICAgICAgICAgcmV0dXJuIGlubmVyRGF0ZTtcbiAgICAgICAgICBcbiAgICAgICAgICBkZWZhdWx0OiBcbiAgICAgICAgICAgICAgaW5uZXJEYXRlICs9IChkYXkgPCAxMCkgPyAoXCIwXCIgKyBkYXkpIDogZGF5O1xuICAgICAgICAgICAgICBpbm5lckRhdGUgKz0gXCIuXCI7XG4gICAgICAgICAgICAgIGlubmVyRGF0ZSArPSAobW9udGggPCAxMCkgPyAoXCIwXCIgKyBtb250aCkgOiBtb250aDtcbiAgICAgICAgICAgICAgaW5uZXJEYXRlICs9IFwiLlwiICsgeWVhcjtcbiAgICAgICAgICAgICAgcmV0dXJuIGlubmVyRGF0ZTtcbiAgICAgIH1cbiAgfVxuICB9XG5cbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHduV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICB2YXIgeCA9ICh3bldpZHRoID4gOTk5KT8gZmFsc2U6dHJ1ZTtcblxuICAgIHZhciBzbExpZGVyID0gJCgnLnJldmlld3MtbGlzdCcpO1xuICAgICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24oKXtcbiAgICAgIHduV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICAgIGlmICh3bldpZHRoPDEwMDAgJiYgeD09PWZhbHNlKSB7IC8v0LXRgdC70Lgg0LXQutGA0LDQvSDQvNC10L3RjNGI0LUgMTAwMCDQuCDRgdC70LDQudC00LXRgCDQtdGJ0LUg0L3QtSDQsdGL0Lsg0LjQvdC40YbRi9Cw0LvQuNC30LjRgNC+0LLQsCDRgtC+INC40L3QuNGG0LjQsNC70LjQt9C40YDRg9C10Lwg0LXQs9C+XG4gICAgICAgIHggPSB0cnVlO1xuICAgICAgICBzbGlkZXJJbml0KHgpO1xuICAgICAgfTtcbiAgICAgIGlmKHduV2lkdGg+OTk5ICl7IC8v0LXRgdC70Lgg0YHQu9Cw0LnQtNC10YAg0LHRi9C7INGD0L3QuNGH0YLQvtC20LXQvSDRgtC+INGB0L7Qt9C00LDQtNC40Lwg0YPRgdC70L7QstC40Y8g0YfRgtC+INCx0Ysg0L/RgNC4INGA0LXRgdCw0LnQt9C1INC+0L0g0LzQvtCzINGB0L7QsdGA0LDRgtGM0YHRj1xuICAgICAgICB4ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgIGZ1bmN0aW9uIHNsaWRlckluaXQoeCl7XG4gICAgaWYgKHgpIHtcbiAgICAgICBzbExpZGVyLnNsaWNrKHtcbiAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgc3BlZWQ6IDIwMDAsXG4gICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICB2YXJpYWJsZVdpZHRoOiBmYWxzZSxcbiAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsIFxuICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgIHtcbiAgICAgICAgICAgICBicmVha3BvaW50OiA1MDAwLFxuICAgICAgICAgICAgIHNldHRpbmdzOiBcInVuc2xpY2tcIlxuICAgICAgICAgICB9LFxuICAgICAgICAgICB7XG4gICAgICAgICAgICAgYnJlYWtwb2ludDogOTk5LFxuICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG5cbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIH0sXG4gICAgICAgICBdXG4gICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgc2xpZGVySW5pdCh4KTtcblxuICB9KTtcblxuXG5cbiJdfQ==
