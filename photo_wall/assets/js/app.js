'use strict';

//допустим эти данные мы получили из сервера
var imageData = [
  { url : './assets/img/photo/Layer1.jpg', like:50, dislike:10, comments:[{autor:'Olya', data:'Tyday 10:21 pm', text:'Very beautiful photo'}] },
  { url : './assets/img/photo/Layer2.jpg', like:50, dislike:10, comments:[{autor:'Dima', data:'Tyday 10:21 pm', text:'Some text'}] },
  { url : './assets/img/photo/Layer3.jpg', like:50, dislike:10, comments:[{autor:'Alex', data:'Tyday 10:21 pm', text:'Some text'}] },
  { url : './assets/img/photo/Layer4.jpg', like:50, dislike:10, comments:[{autor:'Vasia', data:'Tyday 10:21 pm', text:'Some text'}] },
  { url : './assets/img/photo/Layer2.jpg', like:50, dislike:10, comments:[{autor:'Olya', data:'Tyday 10:21 pm', text:'Some text'}] },
  { url : './assets/img/photo/Layer6.jpg', like:50, dislike:10, comments:[{autor:'Dima', data:'Tyday 10:21 pm', text:'Some text'}] },
  { url : './assets/img/photo/Layer7.jpg', like:50, dislike:10, comments:[{autor:'Vasia', data:'Tyday 10:21 pm', text:'Some text'}] },
  { url : './assets/img/photo/Layer8.jpg', like:50, dislike:10, comments:[{autor:'Vasia', data:'Tyday 10:21 pm', text:'Some text'}] }

];


$(document).ready(function () {
  
  var
    galleryBox = $('#gallery-box'), popUp = $('#pop-up-wrap');
  //в этом обекте будем хранисть обекты с данными каждого блока с картинкой ключи совпадают с id блоков
  var imageSaveData = {};


  //Красивый скролл
  (function(){
    $('html').niceScroll({
      cursorcolor:'#20B8C5',
      cursoropacitymin: 1,
      cursorborder: '0px',
      cursorwidth: '4px',
    });
    $('.gallery').niceScroll({
      cursorcolor:'#20B8C5',
      cursoropacitymin: 1,
      cursorborderradius: '5px',
      cursorwidth: '10px',
      cursorborder: '0px',
      background: '#D0DAE4'
    });
    $('.nicescroll-rails').css({'border-radius':'5px'});

    $('.pop-up-comments__list, .add-comment__text').niceScroll({
      cursorcolor:'#20B8C5',
      cursoropacitymin: 1,
      cursorborderradius: '3px',
      cursorwidth: '6px',
      cursorborder: '0px',
      background: '#D0DAE4'
    });
    $('.pop-up .nicescroll-rails').css({'border-radius':'3px'});
  })();
  

  //пвернёт все необходимые данные привязаные к блоку по которому кинули
  function getData(blockId){
    // var blockId = block.parent().attr('id');
    var blockInfo = imageSaveData[blockId];
   
    return {
      id : blockId+'___pop',
      url: blockInfo.url,
      likeCount : blockInfo.like,
      dislikeCount : blockInfo.dislike,
      comments : blockInfo.comments,
      likeButton: blockInfo.likeButton || null
    };
  }


  function paintLike(data){
    if (data === 'like') {
      $('.pop-up-image-dislike').removeClass('inactive');
      $('.pop-up-image-like').addClass('inactive');
    }else if(data ==='dislike'){
      $('.pop-up-image-dislike').addClass('inactive');
      $('.pop-up-image-like').removeClass('inactive');
    }else{
      $('.pop-up-image-dislike').removeClass('inactive');
      $('.pop-up-image-like').removeClass('inactive');
    }
  }
  

  function editСomments(data){
    var content = '';
    popUp.find('.comments-count span').html(data.comments.length);

    data.comments.forEach(function(comment){
      if (comment.data === undefined) {return;}
      var commentData = comment.data.split(' ');
      content += '<li class="pop-up-comments__item">'+
                  '<div class="pop-up-comments__info"><span class="pop-up-comments__autor">'+comment.autor+'</span><span class="pop-up-comments__data">'+commentData[0]+'<span>'+commentData[1]+' '+commentData[2]+'</span></span></div>'+
                  '<p class="pop-up-comments__text">'+comment.text+'</p>'+
                '</li>';
    });
    
    popUp.find('.pop-up-image__box').css({'background-image':'url('+data.url+')'});
    $('.pop-up-comments__list').html(content);
  }

  
  function showPopUp(data){
    paintLike();
    editСomments(data);
    popUp.attr({'id':data.id});
    popUp.find('.pop-up-image-like__box').html(data.likeCount);
    popUp.find('.pop-up-image-dislike__box').html(data.dislikeCount);

    if (data.likeButton === 'like') {
      $('.pop-up-image-like').addClass('inactive');
    }else if (data.likeButton === 'dislike'){
      $('.pop-up-image-dislike').addClass('inactive');
    }
    popUp.show({duration:200});
  }
  

  function updateGallery(block){
    var current = $('#'+block);
   
    current.find('.photo__info-comment__box').html(imageSaveData[block].comments.length);
    current.find('.photo__info-dislike__box').html(imageSaveData[block].dislike);
    current.find('.photo__info-like__box').html(imageSaveData[block].like);
    
  }


  //сохраняет новые данные для бкоков с фотками и обновляет их в pop-up
  function setData(obj){
    // получим id блока фото в галерее
    var imageBlock = popUp.attr('id').split('___')[0];
    if (obj.newComment !== undefined) {
      //сохраним данные
      imageSaveData[imageBlock].comments.push(obj.newComment);
      //оновим данные на всплывашке
      var data = getData(imageBlock);
      editСomments(data);
      $('.pop-up-comments__list').getNiceScroll().resize();
    }
    if (obj.like !== undefined) {
      //сохраним данные
      if (obj.already === false) {
        if (obj.like>0) {
          imageSaveData[imageBlock].like++;
          paintLike('like');
          imageSaveData[imageBlock].likeButton = 'like';
        }else{
          imageSaveData[imageBlock].dislike++;
          paintLike('dislike');
          imageSaveData[imageBlock].likeButton = 'dislike';
        }
      }else{
        if (obj.like>0) {
          imageSaveData[imageBlock].like++;
          imageSaveData[imageBlock].dislike--;
          paintLike('like');
          imageSaveData[imageBlock].likeButton = 'like';
        }else{
          imageSaveData[imageBlock].dislike++;
          imageSaveData[imageBlock].like--;
          paintLike('dislike');
          imageSaveData[imageBlock].likeButton = 'dislike';
        }
      }
      //обновитьть лайки на pop-up
      $('.pop-up-image-like__box').html(imageSaveData[imageBlock].like);
      $('.pop-up-image-dislike__box').html(imageSaveData[imageBlock].dislike);
    }
    updateGallery(imageBlock);
  }


  function addComment(){
    var
      input = $('#add-comment__text'),
      name = $('#add-comment__name').val().trim(),
      text = input.val().trim(),
      message = 'It cannot be empty here !!!',
      date = new Date(),
      time = 'Today '+date.getHours()+':'+date.getMinutes()+' pm';

    if (name.length<1) {name='Anonim';}
    if (text.length<1 || text === message) {
      input.val(message);
      input.click(function(){
        if (input.val().trim() === message) {input.val('');}
      });
      return;
    }
    input.val('');
    $('#add-comment__name').val('');
    var data = {
      newComment : {
        data : time,
        autor : name,
        text : text
      }
    };
    setData(data);
  }


  galleryBox.on('click',function(e){
    var curentImageBlock = $(e.target);
    var currentClass = curentImageBlock.attr('class');
    //если кликнули по фото или по любому из его дочерних блоков
    if (currentClass === 'photo__box'||curentImageBlock.closest('.photo__box').length>0) {
      var currrent = (currentClass === 'photo__box')? curentImageBlock:curentImageBlock.closest('.photo__box');
      var data = getData(currrent.parent().attr('id'));
      showPopUp(data);
    }
    return;
  });


  popUp.on('click', function(e){
    var
      currentClickObj = $(e.target),
      currentClass = currentClickObj.attr('class');
      
    if (currentClass === 'close') {

      popUp.hide({duration:50});
    }
    if (currentClass === 'add-comment__button') {
      addComment();
    }
    if (currentClass === 'button__like'||currentClass === 'button__dislike') {
      var data = {
        like :  (currentClass === 'button__like')? 1 : -1,
        already : false
      };
      //если мы еще не лайкалм тогда можно

      if (!currentClickObj.parent().hasClass('inactive')) {
        //если уже лайкали тогда already = true
        if (currentClickObj.parent().siblings().hasClass('inactive')) {
          data.already = true;
        }
        setData(data);
      }else{return;}
    }
  });


  //типы блоков ширина и висота маленьких и боьших блоков в пикселях
  var imageStandarts = function(){
    var
      baseWidth = 246,
      baseHeight = 210,
      largeWidth = baseWidth*2,
      largeHeight = baseHeight*2;

    return {
      baseWidth   : baseWidth,
      baseHeight  : baseHeight,
      largeWidth  : largeWidth,
      largeHeight : largeHeight
    };
  }();


  var blockType = function(){
    return {
      base : { 'width': imageStandarts.baseWidth+'px', 'height': imageStandarts.baseHeight+'px' },
      horizontal : { 'width': imageStandarts.largeWidth+'px', 'height': imageStandarts.baseHeight+'px' },
      vertical : { 'width': imageStandarts.baseWidth+'px', 'height': imageStandarts.largeHeight+'px' }
    };
  }();


  //шаблон вывода блоков
  var pattern = function(){
    var
      baseWidth = imageStandarts.baseWidth,
      largeWidth = imageStandarts.largeWidth,
      baseHeight = imageStandarts.baseHeight,
      largeHeight = imageStandarts.largeHeight;

    return [
      { type:blockType.horizontal,    left:0,                    top : 0 },
      { type:blockType.base,          left:0,                    top:baseHeight },
      { type:blockType.base,          left:baseWidth,            top:baseHeight },
      { type:blockType.vertical,      left:largeWidth,           top:0 },
      { type:blockType.base,          left:baseWidth*3,          top:0 },
      { type:blockType.base,          left:baseWidth*3,          top:baseHeight },
      { type:blockType.base,          left:0,                    top:largeHeight },
      { type:blockType.horizontal,    left:baseWidth,            top:largeHeight },
      { type:blockType.base,          left:baseWidth*3,          top:largeHeight }
    ];
  }();
  // количество елементов которое мы уже вывели
  var counter = 0;
  //id следующего блока
  var id = 0;

  //функция вернет обьект с размером и положением которое необходимо установить текущему блоку
  var positionTemplate = function(){
    var currentPos = counter;
    while(currentPos>pattern.length-1){
      //если мы здесь значит шаблон вывода закончился нужно обнулить щетчик
      currentPos = currentPos-(pattern.length);
      counter = currentPos;
      //увеличить все координаты по х в шаблоне на 4базовых блока то есть один екран
      pattern.forEach(function(element){
        element.left += imageStandarts.baseWidth*4;
      });
    }
    return pattern[currentPos];
  };


  function addImages(arr){

    arr.forEach(function(element){
      var
        url = element.url,
        like = element.like || 0,
        dislike = element.dislike || 0,
        comments = element.comments || [];

      var image = $(
        '<div class="photo" id="block'+id+'">'+
                  '<div class="photo__box">'+
                    '<div class="photo__info">'+
                      '<div class="photo__info-comments">'+
                        '<span class="photo__info-comment">'+
                          '<span class="photo__info-comment__box">'+comments.length+'</span>'+
                          '<svg><use xlink:href="#comment"></use></svg>'+
                        '</span>'+
                      '</div>'+
                      '<div class="photo__info-likes">'+
                        '<span class="photo__info-dislike">'+
                          '<span class="photo__info-dislike__box">'+dislike+'</span>'+
                         '<svg><use xlink:href="#dislike"></use></svg>'+
                        '</span>'+
                        '<span class="photo__info-like">'+
                          '<span class="photo__info-like__box">'+like+'</span>'+
                         '<svg><use xlink:href="#like"></use></svg>'+
                        '</span>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>');
    
      imageSaveData['block'+id] = {
        url: url,
        like : like,
        dislike : dislike,
        comments : comments
      };

      var
        blockProps = positionTemplate(),
        boxSize = blockProps.type,
        position = {'top':blockProps.top, 'left':blockProps.left};
      
      image.find('.photo__box').css({'background-image':'url('+element.url+')'});
      image.css(boxSize);
      image.css(position);
      galleryBox.append(image);
      counter++;
      id++;
    });

    //в конце не забудем переместить кнопку для загрузки нового фото
    var
      lastPhoto = $('.photo').last(),
      lastPhotoPos = lastPhoto.position(),
      buttonPos = {
        'left':lastPhotoPos.left+lastPhoto.innerWidth(),
        'top':lastPhotoPos.top
      };

    $('#add-photo').css(buttonPos);
    //изменим ширину галереи
    galleryBox.css({'width':buttonPos.left+imageStandarts.baseWidth+'px'});
    $('.gallery').getNiceScroll().resize();
    
     
  }
  addImages(imageData);


  $('#add-photo__input').change(function(evt){
    var
      files = evt.target.files,              
      file = files[0],
      reader = new FileReader();

    reader.readAsDataURL(file);                
    reader.onload = (function(event) {           
      var image = event.target.result;
      var imageData = [{url : image}];
      $('#add-photo__input').val('');
      addImages(imageData);
    });
  });


});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vL9C00L7Qv9GD0YHRgtC40Lwg0Y3RgtC4INC00LDQvdC90YvQtSDQvNGLINC/0L7Qu9GD0YfQuNC70Lgg0LjQtyDRgdC10YDQstC10YDQsFxudmFyIGltYWdlRGF0YSA9IFtcbiAgeyB1cmwgOiAnLi9hc3NldHMvaW1nL3Bob3RvL0xheWVyMS5qcGcnLCBsaWtlOjUwLCBkaXNsaWtlOjEwLCBjb21tZW50czpbe2F1dG9yOidPbHlhJywgZGF0YTonVHlkYXkgMTA6MjEgcG0nLCB0ZXh0OidWZXJ5IGJlYXV0aWZ1bCBwaG90byd9XSB9LFxuICB7IHVybCA6ICcuL2Fzc2V0cy9pbWcvcGhvdG8vTGF5ZXIyLmpwZycsIGxpa2U6NTAsIGRpc2xpa2U6MTAsIGNvbW1lbnRzOlt7YXV0b3I6J0RpbWEnLCBkYXRhOidUeWRheSAxMDoyMSBwbScsIHRleHQ6J1NvbWUgdGV4dCd9XSB9LFxuICB7IHVybCA6ICcuL2Fzc2V0cy9pbWcvcGhvdG8vTGF5ZXIzLmpwZycsIGxpa2U6NTAsIGRpc2xpa2U6MTAsIGNvbW1lbnRzOlt7YXV0b3I6J0FsZXgnLCBkYXRhOidUeWRheSAxMDoyMSBwbScsIHRleHQ6J1NvbWUgdGV4dCd9XSB9LFxuICB7IHVybCA6ICcuL2Fzc2V0cy9pbWcvcGhvdG8vTGF5ZXI0LmpwZycsIGxpa2U6NTAsIGRpc2xpa2U6MTAsIGNvbW1lbnRzOlt7YXV0b3I6J1Zhc2lhJywgZGF0YTonVHlkYXkgMTA6MjEgcG0nLCB0ZXh0OidTb21lIHRleHQnfV0gfSxcbiAgeyB1cmwgOiAnLi9hc3NldHMvaW1nL3Bob3RvL0xheWVyMi5qcGcnLCBsaWtlOjUwLCBkaXNsaWtlOjEwLCBjb21tZW50czpbe2F1dG9yOidPbHlhJywgZGF0YTonVHlkYXkgMTA6MjEgcG0nLCB0ZXh0OidTb21lIHRleHQnfV0gfSxcbiAgeyB1cmwgOiAnLi9hc3NldHMvaW1nL3Bob3RvL0xheWVyNi5qcGcnLCBsaWtlOjUwLCBkaXNsaWtlOjEwLCBjb21tZW50czpbe2F1dG9yOidEaW1hJywgZGF0YTonVHlkYXkgMTA6MjEgcG0nLCB0ZXh0OidTb21lIHRleHQnfV0gfSxcbiAgeyB1cmwgOiAnLi9hc3NldHMvaW1nL3Bob3RvL0xheWVyNy5qcGcnLCBsaWtlOjUwLCBkaXNsaWtlOjEwLCBjb21tZW50czpbe2F1dG9yOidWYXNpYScsIGRhdGE6J1R5ZGF5IDEwOjIxIHBtJywgdGV4dDonU29tZSB0ZXh0J31dIH0sXG4gIHsgdXJsIDogJy4vYXNzZXRzL2ltZy9waG90by9MYXllcjguanBnJywgbGlrZTo1MCwgZGlzbGlrZToxMCwgY29tbWVudHM6W3thdXRvcjonVmFzaWEnLCBkYXRhOidUeWRheSAxMDoyMSBwbScsIHRleHQ6J1NvbWUgdGV4dCd9XSB9XG5cbl07XG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICBcbiAgdmFyXG4gICAgZ2FsbGVyeUJveCA9ICQoJyNnYWxsZXJ5LWJveCcpLCBwb3BVcCA9ICQoJyNwb3AtdXAtd3JhcCcpO1xuICAvL9CyINGN0YLQvtC8INC+0LHQtdC60YLQtSDQsdGD0LTQtdC8INGF0YDQsNC90LjRgdGC0Ywg0L7QsdC10LrRgtGLINGBINC00LDQvdC90YvQvNC4INC60LDQttC00L7Qs9C+INCx0LvQvtC60LAg0YEg0LrQsNGA0YLQuNC90LrQvtC5INC60LvRjtGH0Lgg0YHQvtCy0L/QsNC00LDRjtGCINGBIGlkINCx0LvQvtC60L7QslxuICB2YXIgaW1hZ2VTYXZlRGF0YSA9IHt9O1xuXG5cbiAgLy/QmtGA0LDRgdC40LLRi9C5INGB0LrRgNC+0LvQu1xuICAoZnVuY3Rpb24oKXtcbiAgICAkKCdodG1sJykubmljZVNjcm9sbCh7XG4gICAgICBjdXJzb3Jjb2xvcjonIzIwQjhDNScsXG4gICAgICBjdXJzb3JvcGFjaXR5bWluOiAxLFxuICAgICAgY3Vyc29yYm9yZGVyOiAnMHB4JyxcbiAgICAgIGN1cnNvcndpZHRoOiAnNHB4JyxcbiAgICB9KTtcbiAgICAkKCcuZ2FsbGVyeScpLm5pY2VTY3JvbGwoe1xuICAgICAgY3Vyc29yY29sb3I6JyMyMEI4QzUnLFxuICAgICAgY3Vyc29yb3BhY2l0eW1pbjogMSxcbiAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzVweCcsXG4gICAgICBjdXJzb3J3aWR0aDogJzEwcHgnLFxuICAgICAgY3Vyc29yYm9yZGVyOiAnMHB4JyxcbiAgICAgIGJhY2tncm91bmQ6ICcjRDBEQUU0J1xuICAgIH0pO1xuICAgICQoJy5uaWNlc2Nyb2xsLXJhaWxzJykuY3NzKHsnYm9yZGVyLXJhZGl1cyc6JzVweCd9KTtcblxuICAgICQoJy5wb3AtdXAtY29tbWVudHNfX2xpc3QsIC5hZGQtY29tbWVudF9fdGV4dCcpLm5pY2VTY3JvbGwoe1xuICAgICAgY3Vyc29yY29sb3I6JyMyMEI4QzUnLFxuICAgICAgY3Vyc29yb3BhY2l0eW1pbjogMSxcbiAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzNweCcsXG4gICAgICBjdXJzb3J3aWR0aDogJzZweCcsXG4gICAgICBjdXJzb3Jib3JkZXI6ICcwcHgnLFxuICAgICAgYmFja2dyb3VuZDogJyNEMERBRTQnXG4gICAgfSk7XG4gICAgJCgnLnBvcC11cCAubmljZXNjcm9sbC1yYWlscycpLmNzcyh7J2JvcmRlci1yYWRpdXMnOiczcHgnfSk7XG4gIH0pKCk7XG4gIFxuXG4gIC8v0L/QstC10YDQvdGR0YIg0LLRgdC1INC90LXQvtCx0YXQvtC00LjQvNGL0LUg0LTQsNC90L3Ri9C1INC/0YDQuNCy0Y/Qt9Cw0L3Ri9C1INC6INCx0LvQvtC60YMg0L/QviDQutC+0YLQvtGA0L7QvNGDINC60LjQvdGD0LvQuFxuICBmdW5jdGlvbiBnZXREYXRhKGJsb2NrSWQpe1xuICAgIC8vIHZhciBibG9ja0lkID0gYmxvY2sucGFyZW50KCkuYXR0cignaWQnKTtcbiAgICB2YXIgYmxvY2tJbmZvID0gaW1hZ2VTYXZlRGF0YVtibG9ja0lkXTtcbiAgIFxuICAgIHJldHVybiB7XG4gICAgICBpZCA6IGJsb2NrSWQrJ19fX3BvcCcsXG4gICAgICB1cmw6IGJsb2NrSW5mby51cmwsXG4gICAgICBsaWtlQ291bnQgOiBibG9ja0luZm8ubGlrZSxcbiAgICAgIGRpc2xpa2VDb3VudCA6IGJsb2NrSW5mby5kaXNsaWtlLFxuICAgICAgY29tbWVudHMgOiBibG9ja0luZm8uY29tbWVudHMsXG4gICAgICBsaWtlQnV0dG9uOiBibG9ja0luZm8ubGlrZUJ1dHRvbiB8fCBudWxsXG4gICAgfTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gcGFpbnRMaWtlKGRhdGEpe1xuICAgIGlmIChkYXRhID09PSAnbGlrZScpIHtcbiAgICAgICQoJy5wb3AtdXAtaW1hZ2UtZGlzbGlrZScpLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpO1xuICAgICAgJCgnLnBvcC11cC1pbWFnZS1saWtlJykuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7XG4gICAgfWVsc2UgaWYoZGF0YSA9PT0nZGlzbGlrZScpe1xuICAgICAgJCgnLnBvcC11cC1pbWFnZS1kaXNsaWtlJykuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7XG4gICAgICAkKCcucG9wLXVwLWltYWdlLWxpa2UnKS5yZW1vdmVDbGFzcygnaW5hY3RpdmUnKTtcbiAgICB9ZWxzZXtcbiAgICAgICQoJy5wb3AtdXAtaW1hZ2UtZGlzbGlrZScpLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpO1xuICAgICAgJCgnLnBvcC11cC1pbWFnZS1saWtlJykucmVtb3ZlQ2xhc3MoJ2luYWN0aXZlJyk7XG4gICAgfVxuICB9XG4gIFxuXG4gIGZ1bmN0aW9uIGVkaXTQoW9tbWVudHMoZGF0YSl7XG4gICAgdmFyIGNvbnRlbnQgPSAnJztcbiAgICBwb3BVcC5maW5kKCcuY29tbWVudHMtY291bnQgc3BhbicpLmh0bWwoZGF0YS5jb21tZW50cy5sZW5ndGgpO1xuXG4gICAgZGF0YS5jb21tZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGNvbW1lbnQpe1xuICAgICAgaWYgKGNvbW1lbnQuZGF0YSA9PT0gdW5kZWZpbmVkKSB7cmV0dXJuO31cbiAgICAgIHZhciBjb21tZW50RGF0YSA9IGNvbW1lbnQuZGF0YS5zcGxpdCgnICcpO1xuICAgICAgY29udGVudCArPSAnPGxpIGNsYXNzPVwicG9wLXVwLWNvbW1lbnRzX19pdGVtXCI+JytcbiAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicG9wLXVwLWNvbW1lbnRzX19pbmZvXCI+PHNwYW4gY2xhc3M9XCJwb3AtdXAtY29tbWVudHNfX2F1dG9yXCI+Jytjb21tZW50LmF1dG9yKyc8L3NwYW4+PHNwYW4gY2xhc3M9XCJwb3AtdXAtY29tbWVudHNfX2RhdGFcIj4nK2NvbW1lbnREYXRhWzBdKyc8c3Bhbj4nK2NvbW1lbnREYXRhWzFdKycgJytjb21tZW50RGF0YVsyXSsnPC9zcGFuPjwvc3Bhbj48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgJzxwIGNsYXNzPVwicG9wLXVwLWNvbW1lbnRzX190ZXh0XCI+Jytjb21tZW50LnRleHQrJzwvcD4nK1xuICAgICAgICAgICAgICAgICc8L2xpPic7XG4gICAgfSk7XG4gICAgXG4gICAgcG9wVXAuZmluZCgnLnBvcC11cC1pbWFnZV9fYm94JykuY3NzKHsnYmFja2dyb3VuZC1pbWFnZSc6J3VybCgnK2RhdGEudXJsKycpJ30pO1xuICAgICQoJy5wb3AtdXAtY29tbWVudHNfX2xpc3QnKS5odG1sKGNvbnRlbnQpO1xuICB9XG5cbiAgXG4gIGZ1bmN0aW9uIHNob3dQb3BVcChkYXRhKXtcbiAgICBwYWludExpa2UoKTtcbiAgICBlZGl00KFvbW1lbnRzKGRhdGEpO1xuICAgIHBvcFVwLmF0dHIoeydpZCc6ZGF0YS5pZH0pO1xuICAgIHBvcFVwLmZpbmQoJy5wb3AtdXAtaW1hZ2UtbGlrZV9fYm94JykuaHRtbChkYXRhLmxpa2VDb3VudCk7XG4gICAgcG9wVXAuZmluZCgnLnBvcC11cC1pbWFnZS1kaXNsaWtlX19ib3gnKS5odG1sKGRhdGEuZGlzbGlrZUNvdW50KTtcblxuICAgIGlmIChkYXRhLmxpa2VCdXR0b24gPT09ICdsaWtlJykge1xuICAgICAgJCgnLnBvcC11cC1pbWFnZS1saWtlJykuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7XG4gICAgfWVsc2UgaWYgKGRhdGEubGlrZUJ1dHRvbiA9PT0gJ2Rpc2xpa2UnKXtcbiAgICAgICQoJy5wb3AtdXAtaW1hZ2UtZGlzbGlrZScpLmFkZENsYXNzKCdpbmFjdGl2ZScpO1xuICAgIH1cbiAgICBwb3BVcC5zaG93KHtkdXJhdGlvbjoyMDB9KTtcbiAgfVxuICBcblxuICBmdW5jdGlvbiB1cGRhdGVHYWxsZXJ5KGJsb2NrKXtcbiAgICB2YXIgY3VycmVudCA9ICQoJyMnK2Jsb2NrKTtcbiAgIFxuICAgIGN1cnJlbnQuZmluZCgnLnBob3RvX19pbmZvLWNvbW1lbnRfX2JveCcpLmh0bWwoaW1hZ2VTYXZlRGF0YVtibG9ja10uY29tbWVudHMubGVuZ3RoKTtcbiAgICBjdXJyZW50LmZpbmQoJy5waG90b19faW5mby1kaXNsaWtlX19ib3gnKS5odG1sKGltYWdlU2F2ZURhdGFbYmxvY2tdLmRpc2xpa2UpO1xuICAgIGN1cnJlbnQuZmluZCgnLnBob3RvX19pbmZvLWxpa2VfX2JveCcpLmh0bWwoaW1hZ2VTYXZlRGF0YVtibG9ja10ubGlrZSk7XG4gICAgXG4gIH1cblxuXG4gIC8v0YHQvtGF0YDQsNC90Y/QtdGCINC90L7QstGL0LUg0LTQsNC90L3Ri9C1INC00LvRjyDQsdC60L7QutC+0LIg0YEg0YTQvtGC0LrQsNC80Lgg0Lgg0L7QsdC90L7QstC70Y/QtdGCINC40YUg0LIgcG9wLXVwXG4gIGZ1bmN0aW9uIHNldERhdGEob2JqKXtcbiAgICAvLyDQv9C+0LvRg9GH0LjQvCBpZCDQsdC70L7QutCwINGE0L7RgtC+INCyINCz0LDQu9C10YDQtdC1XG4gICAgdmFyIGltYWdlQmxvY2sgPSBwb3BVcC5hdHRyKCdpZCcpLnNwbGl0KCdfX18nKVswXTtcbiAgICBpZiAob2JqLm5ld0NvbW1lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy/RgdC+0YXRgNCw0L3QuNC8INC00LDQvdC90YvQtVxuICAgICAgaW1hZ2VTYXZlRGF0YVtpbWFnZUJsb2NrXS5jb21tZW50cy5wdXNoKG9iai5uZXdDb21tZW50KTtcbiAgICAgIC8v0L7QvdC+0LLQuNC8INC00LDQvdC90YvQtSDQvdCwINCy0YHQv9C70YvQstCw0YjQutC1XG4gICAgICB2YXIgZGF0YSA9IGdldERhdGEoaW1hZ2VCbG9jayk7XG4gICAgICBlZGl00KFvbW1lbnRzKGRhdGEpO1xuICAgICAgJCgnLnBvcC11cC1jb21tZW50c19fbGlzdCcpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcbiAgICB9XG4gICAgaWYgKG9iai5saWtlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8v0YHQvtGF0YDQsNC90LjQvCDQtNCw0L3QvdGL0LVcbiAgICAgIGlmIChvYmouYWxyZWFkeSA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKG9iai5saWtlPjApIHtcbiAgICAgICAgICBpbWFnZVNhdmVEYXRhW2ltYWdlQmxvY2tdLmxpa2UrKztcbiAgICAgICAgICBwYWludExpa2UoJ2xpa2UnKTtcbiAgICAgICAgICBpbWFnZVNhdmVEYXRhW2ltYWdlQmxvY2tdLmxpa2VCdXR0b24gPSAnbGlrZSc7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGltYWdlU2F2ZURhdGFbaW1hZ2VCbG9ja10uZGlzbGlrZSsrO1xuICAgICAgICAgIHBhaW50TGlrZSgnZGlzbGlrZScpO1xuICAgICAgICAgIGltYWdlU2F2ZURhdGFbaW1hZ2VCbG9ja10ubGlrZUJ1dHRvbiA9ICdkaXNsaWtlJztcbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIGlmIChvYmoubGlrZT4wKSB7XG4gICAgICAgICAgaW1hZ2VTYXZlRGF0YVtpbWFnZUJsb2NrXS5saWtlKys7XG4gICAgICAgICAgaW1hZ2VTYXZlRGF0YVtpbWFnZUJsb2NrXS5kaXNsaWtlLS07XG4gICAgICAgICAgcGFpbnRMaWtlKCdsaWtlJyk7XG4gICAgICAgICAgaW1hZ2VTYXZlRGF0YVtpbWFnZUJsb2NrXS5saWtlQnV0dG9uID0gJ2xpa2UnO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBpbWFnZVNhdmVEYXRhW2ltYWdlQmxvY2tdLmRpc2xpa2UrKztcbiAgICAgICAgICBpbWFnZVNhdmVEYXRhW2ltYWdlQmxvY2tdLmxpa2UtLTtcbiAgICAgICAgICBwYWludExpa2UoJ2Rpc2xpa2UnKTtcbiAgICAgICAgICBpbWFnZVNhdmVEYXRhW2ltYWdlQmxvY2tdLmxpa2VCdXR0b24gPSAnZGlzbGlrZSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8v0L7QsdC90L7QstC40YLRjNGC0Ywg0LvQsNC50LrQuCDQvdCwIHBvcC11cFxuICAgICAgJCgnLnBvcC11cC1pbWFnZS1saWtlX19ib3gnKS5odG1sKGltYWdlU2F2ZURhdGFbaW1hZ2VCbG9ja10ubGlrZSk7XG4gICAgICAkKCcucG9wLXVwLWltYWdlLWRpc2xpa2VfX2JveCcpLmh0bWwoaW1hZ2VTYXZlRGF0YVtpbWFnZUJsb2NrXS5kaXNsaWtlKTtcbiAgICB9XG4gICAgdXBkYXRlR2FsbGVyeShpbWFnZUJsb2NrKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gYWRkQ29tbWVudCgpe1xuICAgIHZhclxuICAgICAgaW5wdXQgPSAkKCcjYWRkLWNvbW1lbnRfX3RleHQnKSxcbiAgICAgIG5hbWUgPSAkKCcjYWRkLWNvbW1lbnRfX25hbWUnKS52YWwoKS50cmltKCksXG4gICAgICB0ZXh0ID0gaW5wdXQudmFsKCkudHJpbSgpLFxuICAgICAgbWVzc2FnZSA9ICdJdCBjYW5ub3QgYmUgZW1wdHkgaGVyZSAhISEnLFxuICAgICAgZGF0ZSA9IG5ldyBEYXRlKCksXG4gICAgICB0aW1lID0gJ1RvZGF5ICcrZGF0ZS5nZXRIb3VycygpKyc6JytkYXRlLmdldE1pbnV0ZXMoKSsnIHBtJztcblxuICAgIGlmIChuYW1lLmxlbmd0aDwxKSB7bmFtZT0nQW5vbmltJzt9XG4gICAgaWYgKHRleHQubGVuZ3RoPDEgfHwgdGV4dCA9PT0gbWVzc2FnZSkge1xuICAgICAgaW5wdXQudmFsKG1lc3NhZ2UpO1xuICAgICAgaW5wdXQuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKGlucHV0LnZhbCgpLnRyaW0oKSA9PT0gbWVzc2FnZSkge2lucHV0LnZhbCgnJyk7fVxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlucHV0LnZhbCgnJyk7XG4gICAgJCgnI2FkZC1jb21tZW50X19uYW1lJykudmFsKCcnKTtcbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIG5ld0NvbW1lbnQgOiB7XG4gICAgICAgIGRhdGEgOiB0aW1lLFxuICAgICAgICBhdXRvciA6IG5hbWUsXG4gICAgICAgIHRleHQgOiB0ZXh0XG4gICAgICB9XG4gICAgfTtcbiAgICBzZXREYXRhKGRhdGEpO1xuICB9XG5cblxuICBnYWxsZXJ5Qm94Lm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XG4gICAgdmFyIGN1cmVudEltYWdlQmxvY2sgPSAkKGUudGFyZ2V0KTtcbiAgICB2YXIgY3VycmVudENsYXNzID0gY3VyZW50SW1hZ2VCbG9jay5hdHRyKCdjbGFzcycpO1xuICAgIC8v0LXRgdC70Lgg0LrQu9C40LrQvdGD0LvQuCDQv9C+INGE0L7RgtC+INC40LvQuCDQv9C+INC70Y7QsdC+0LzRgyDQuNC3INC10LPQviDQtNC+0YfQtdGA0L3QuNGFINCx0LvQvtC60L7QslxuICAgIGlmIChjdXJyZW50Q2xhc3MgPT09ICdwaG90b19fYm94J3x8Y3VyZW50SW1hZ2VCbG9jay5jbG9zZXN0KCcucGhvdG9fX2JveCcpLmxlbmd0aD4wKSB7XG4gICAgICB2YXIgY3VycnJlbnQgPSAoY3VycmVudENsYXNzID09PSAncGhvdG9fX2JveCcpPyBjdXJlbnRJbWFnZUJsb2NrOmN1cmVudEltYWdlQmxvY2suY2xvc2VzdCgnLnBob3RvX19ib3gnKTtcbiAgICAgIHZhciBkYXRhID0gZ2V0RGF0YShjdXJycmVudC5wYXJlbnQoKS5hdHRyKCdpZCcpKTtcbiAgICAgIHNob3dQb3BVcChkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9KTtcblxuXG4gIHBvcFVwLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIHZhclxuICAgICAgY3VycmVudENsaWNrT2JqID0gJChlLnRhcmdldCksXG4gICAgICBjdXJyZW50Q2xhc3MgPSBjdXJyZW50Q2xpY2tPYmouYXR0cignY2xhc3MnKTtcbiAgICAgIFxuICAgIGlmIChjdXJyZW50Q2xhc3MgPT09ICdjbG9zZScpIHtcblxuICAgICAgcG9wVXAuaGlkZSh7ZHVyYXRpb246NTB9KTtcbiAgICB9XG4gICAgaWYgKGN1cnJlbnRDbGFzcyA9PT0gJ2FkZC1jb21tZW50X19idXR0b24nKSB7XG4gICAgICBhZGRDb21tZW50KCk7XG4gICAgfVxuICAgIGlmIChjdXJyZW50Q2xhc3MgPT09ICdidXR0b25fX2xpa2UnfHxjdXJyZW50Q2xhc3MgPT09ICdidXR0b25fX2Rpc2xpa2UnKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgbGlrZSA6ICAoY3VycmVudENsYXNzID09PSAnYnV0dG9uX19saWtlJyk/IDEgOiAtMSxcbiAgICAgICAgYWxyZWFkeSA6IGZhbHNlXG4gICAgICB9O1xuICAgICAgLy/QtdGB0LvQuCDQvNGLINC10YnQtSDQvdC1INC70LDQudC60LDQu9C8INGC0L7Qs9C00LAg0LzQvtC20L3QvlxuXG4gICAgICBpZiAoIWN1cnJlbnRDbGlja09iai5wYXJlbnQoKS5oYXNDbGFzcygnaW5hY3RpdmUnKSkge1xuICAgICAgICAvL9C10YHQu9C4INGD0LbQtSDQu9Cw0LnQutCw0LvQuCDRgtC+0LPQtNCwIGFscmVhZHkgPSB0cnVlXG4gICAgICAgIGlmIChjdXJyZW50Q2xpY2tPYmoucGFyZW50KCkuc2libGluZ3MoKS5oYXNDbGFzcygnaW5hY3RpdmUnKSkge1xuICAgICAgICAgIGRhdGEuYWxyZWFkeSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgc2V0RGF0YShkYXRhKTtcbiAgICAgIH1lbHNle3JldHVybjt9XG4gICAgfVxuICB9KTtcblxuXG4gIC8v0YLQuNC/0Ysg0LHQu9C+0LrQvtCyINGI0LjRgNC40L3QsCDQuCDQstC40YHQvtGC0LAg0LzQsNC70LXQvdGM0LrQuNGFINC4INCx0L7RjNGI0LjRhSDQsdC70L7QutC+0LIg0LIg0L/QuNC60YHQtdC70Y/RhVxuICB2YXIgaW1hZ2VTdGFuZGFydHMgPSBmdW5jdGlvbigpe1xuICAgIHZhclxuICAgICAgYmFzZVdpZHRoID0gMjQ2LFxuICAgICAgYmFzZUhlaWdodCA9IDIxMCxcbiAgICAgIGxhcmdlV2lkdGggPSBiYXNlV2lkdGgqMixcbiAgICAgIGxhcmdlSGVpZ2h0ID0gYmFzZUhlaWdodCoyO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGJhc2VXaWR0aCAgIDogYmFzZVdpZHRoLFxuICAgICAgYmFzZUhlaWdodCAgOiBiYXNlSGVpZ2h0LFxuICAgICAgbGFyZ2VXaWR0aCAgOiBsYXJnZVdpZHRoLFxuICAgICAgbGFyZ2VIZWlnaHQgOiBsYXJnZUhlaWdodFxuICAgIH07XG4gIH0oKTtcblxuXG4gIHZhciBibG9ja1R5cGUgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiB7XG4gICAgICBiYXNlIDogeyAnd2lkdGgnOiBpbWFnZVN0YW5kYXJ0cy5iYXNlV2lkdGgrJ3B4JywgJ2hlaWdodCc6IGltYWdlU3RhbmRhcnRzLmJhc2VIZWlnaHQrJ3B4JyB9LFxuICAgICAgaG9yaXpvbnRhbCA6IHsgJ3dpZHRoJzogaW1hZ2VTdGFuZGFydHMubGFyZ2VXaWR0aCsncHgnLCAnaGVpZ2h0JzogaW1hZ2VTdGFuZGFydHMuYmFzZUhlaWdodCsncHgnIH0sXG4gICAgICB2ZXJ0aWNhbCA6IHsgJ3dpZHRoJzogaW1hZ2VTdGFuZGFydHMuYmFzZVdpZHRoKydweCcsICdoZWlnaHQnOiBpbWFnZVN0YW5kYXJ0cy5sYXJnZUhlaWdodCsncHgnIH1cbiAgICB9O1xuICB9KCk7XG5cblxuICAvL9GI0LDQsdC70L7QvSDQstGL0LLQvtC00LAg0LHQu9C+0LrQvtCyXG4gIHZhciBwYXR0ZXJuID0gZnVuY3Rpb24oKXtcbiAgICB2YXJcbiAgICAgIGJhc2VXaWR0aCA9IGltYWdlU3RhbmRhcnRzLmJhc2VXaWR0aCxcbiAgICAgIGxhcmdlV2lkdGggPSBpbWFnZVN0YW5kYXJ0cy5sYXJnZVdpZHRoLFxuICAgICAgYmFzZUhlaWdodCA9IGltYWdlU3RhbmRhcnRzLmJhc2VIZWlnaHQsXG4gICAgICBsYXJnZUhlaWdodCA9IGltYWdlU3RhbmRhcnRzLmxhcmdlSGVpZ2h0O1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIHsgdHlwZTpibG9ja1R5cGUuaG9yaXpvbnRhbCwgICAgbGVmdDowLCAgICAgICAgICAgICAgICAgICAgdG9wIDogMCB9LFxuICAgICAgeyB0eXBlOmJsb2NrVHlwZS5iYXNlLCAgICAgICAgICBsZWZ0OjAsICAgICAgICAgICAgICAgICAgICB0b3A6YmFzZUhlaWdodCB9LFxuICAgICAgeyB0eXBlOmJsb2NrVHlwZS5iYXNlLCAgICAgICAgICBsZWZ0OmJhc2VXaWR0aCwgICAgICAgICAgICB0b3A6YmFzZUhlaWdodCB9LFxuICAgICAgeyB0eXBlOmJsb2NrVHlwZS52ZXJ0aWNhbCwgICAgICBsZWZ0OmxhcmdlV2lkdGgsICAgICAgICAgICB0b3A6MCB9LFxuICAgICAgeyB0eXBlOmJsb2NrVHlwZS5iYXNlLCAgICAgICAgICBsZWZ0OmJhc2VXaWR0aCozLCAgICAgICAgICB0b3A6MCB9LFxuICAgICAgeyB0eXBlOmJsb2NrVHlwZS5iYXNlLCAgICAgICAgICBsZWZ0OmJhc2VXaWR0aCozLCAgICAgICAgICB0b3A6YmFzZUhlaWdodCB9LFxuICAgICAgeyB0eXBlOmJsb2NrVHlwZS5iYXNlLCAgICAgICAgICBsZWZ0OjAsICAgICAgICAgICAgICAgICAgICB0b3A6bGFyZ2VIZWlnaHQgfSxcbiAgICAgIHsgdHlwZTpibG9ja1R5cGUuaG9yaXpvbnRhbCwgICAgbGVmdDpiYXNlV2lkdGgsICAgICAgICAgICAgdG9wOmxhcmdlSGVpZ2h0IH0sXG4gICAgICB7IHR5cGU6YmxvY2tUeXBlLmJhc2UsICAgICAgICAgIGxlZnQ6YmFzZVdpZHRoKjMsICAgICAgICAgIHRvcDpsYXJnZUhlaWdodCB9XG4gICAgXTtcbiAgfSgpO1xuICAvLyDQutC+0LvQuNGH0LXRgdGC0LLQviDQtdC70LXQvNC10L3RgtC+0LIg0LrQvtGC0L7RgNC+0LUg0LzRiyDRg9C20LUg0LLRi9Cy0LXQu9C4XG4gIHZhciBjb3VudGVyID0gMDtcbiAgLy9pZCDRgdC70LXQtNGD0Y7RidC10LPQviDQsdC70L7QutCwXG4gIHZhciBpZCA9IDA7XG5cbiAgLy/RhNGD0L3QutGG0LjRjyDQstC10YDQvdC10YIg0L7QsdGM0LXQutGCINGBINGA0LDQt9C80LXRgNC+0Lwg0Lgg0L/QvtC70L7QttC10L3QuNC10Lwg0LrQvtGC0L7RgNC+0LUg0L3QtdC+0LHRhdC+0LTQuNC80L4g0YPRgdGC0LDQvdC+0LLQuNGC0Ywg0YLQtdC60YPRidC10LzRgyDQsdC70L7QutGDXG4gIHZhciBwb3NpdGlvblRlbXBsYXRlID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgY3VycmVudFBvcyA9IGNvdW50ZXI7XG4gICAgd2hpbGUoY3VycmVudFBvcz5wYXR0ZXJuLmxlbmd0aC0xKXtcbiAgICAgIC8v0LXRgdC70Lgg0LzRiyDQt9C00LXRgdGMINC30L3QsNGH0LjRgiDRiNCw0LHQu9C+0L0g0LLRi9Cy0L7QtNCwINC30LDQutC+0L3Rh9C40LvRgdGPINC90YPQttC90L4g0L7QsdC90YPQu9C40YLRjCDRidC10YLRh9C40LpcbiAgICAgIGN1cnJlbnRQb3MgPSBjdXJyZW50UG9zLShwYXR0ZXJuLmxlbmd0aCk7XG4gICAgICBjb3VudGVyID0gY3VycmVudFBvcztcbiAgICAgIC8v0YPQstC10LvQuNGH0LjRgtGMINCy0YHQtSDQutC+0L7RgNC00LjQvdCw0YLRiyDQv9C+INGFINCyINGI0LDQsdC70L7QvdC1INC90LAgNNCx0LDQt9C+0LLRi9GFINCx0LvQvtC60LAg0YLQviDQtdGB0YLRjCDQvtC00LjQvSDQtdC60YDQsNC9XG4gICAgICBwYXR0ZXJuLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgICAgIGVsZW1lbnQubGVmdCArPSBpbWFnZVN0YW5kYXJ0cy5iYXNlV2lkdGgqNDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcGF0dGVybltjdXJyZW50UG9zXTtcbiAgfTtcblxuXG4gIGZ1bmN0aW9uIGFkZEltYWdlcyhhcnIpe1xuXG4gICAgYXJyLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgICB2YXJcbiAgICAgICAgdXJsID0gZWxlbWVudC51cmwsXG4gICAgICAgIGxpa2UgPSBlbGVtZW50Lmxpa2UgfHwgMCxcbiAgICAgICAgZGlzbGlrZSA9IGVsZW1lbnQuZGlzbGlrZSB8fCAwLFxuICAgICAgICBjb21tZW50cyA9IGVsZW1lbnQuY29tbWVudHMgfHwgW107XG5cbiAgICAgIHZhciBpbWFnZSA9ICQoXG4gICAgICAgICc8ZGl2IGNsYXNzPVwicGhvdG9cIiBpZD1cImJsb2NrJytpZCsnXCI+JytcbiAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGhvdG9fX2JveFwiPicrXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGhvdG9fX2luZm9cIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGhvdG9fX2luZm8tY29tbWVudHNcIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwicGhvdG9fX2luZm8tY29tbWVudFwiPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInBob3RvX19pbmZvLWNvbW1lbnRfX2JveFwiPicrY29tbWVudHMubGVuZ3RoKyc8L3NwYW4+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzdmc+PHVzZSB4bGluazpocmVmPVwiI2NvbW1lbnRcIj48L3VzZT48L3N2Zz4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGhvdG9fX2luZm8tbGlrZXNcIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwicGhvdG9fX2luZm8tZGlzbGlrZVwiPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInBob3RvX19pbmZvLWRpc2xpa2VfX2JveFwiPicrZGlzbGlrZSsnPC9zcGFuPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgJzxzdmc+PHVzZSB4bGluazpocmVmPVwiI2Rpc2xpa2VcIj48L3VzZT48L3N2Zz4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwicGhvdG9fX2luZm8tbGlrZVwiPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInBob3RvX19pbmZvLWxpa2VfX2JveFwiPicrbGlrZSsnPC9zcGFuPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgJzxzdmc+PHVzZSB4bGluazpocmVmPVwiI2xpa2VcIj48L3VzZT48L3N2Zz4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nKTtcbiAgICBcbiAgICAgIGltYWdlU2F2ZURhdGFbJ2Jsb2NrJytpZF0gPSB7XG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICBsaWtlIDogbGlrZSxcbiAgICAgICAgZGlzbGlrZSA6IGRpc2xpa2UsXG4gICAgICAgIGNvbW1lbnRzIDogY29tbWVudHNcbiAgICAgIH07XG5cbiAgICAgIHZhclxuICAgICAgICBibG9ja1Byb3BzID0gcG9zaXRpb25UZW1wbGF0ZSgpLFxuICAgICAgICBib3hTaXplID0gYmxvY2tQcm9wcy50eXBlLFxuICAgICAgICBwb3NpdGlvbiA9IHsndG9wJzpibG9ja1Byb3BzLnRvcCwgJ2xlZnQnOmJsb2NrUHJvcHMubGVmdH07XG4gICAgICBcbiAgICAgIGltYWdlLmZpbmQoJy5waG90b19fYm94JykuY3NzKHsnYmFja2dyb3VuZC1pbWFnZSc6J3VybCgnK2VsZW1lbnQudXJsKycpJ30pO1xuICAgICAgaW1hZ2UuY3NzKGJveFNpemUpO1xuICAgICAgaW1hZ2UuY3NzKHBvc2l0aW9uKTtcbiAgICAgIGdhbGxlcnlCb3guYXBwZW5kKGltYWdlKTtcbiAgICAgIGNvdW50ZXIrKztcbiAgICAgIGlkKys7XG4gICAgfSk7XG5cbiAgICAvL9CyINC60L7QvdGG0LUg0L3QtSDQt9Cw0LHRg9C00LXQvCDQv9C10YDQtdC80LXRgdGC0LjRgtGMINC60L3QvtC/0LrRgyDQtNC70Y8g0LfQsNCz0YDRg9C30LrQuCDQvdC+0LLQvtCz0L4g0YTQvtGC0L5cbiAgICB2YXJcbiAgICAgIGxhc3RQaG90byA9ICQoJy5waG90bycpLmxhc3QoKSxcbiAgICAgIGxhc3RQaG90b1BvcyA9IGxhc3RQaG90by5wb3NpdGlvbigpLFxuICAgICAgYnV0dG9uUG9zID0ge1xuICAgICAgICAnbGVmdCc6bGFzdFBob3RvUG9zLmxlZnQrbGFzdFBob3RvLmlubmVyV2lkdGgoKSxcbiAgICAgICAgJ3RvcCc6bGFzdFBob3RvUG9zLnRvcFxuICAgICAgfTtcblxuICAgICQoJyNhZGQtcGhvdG8nKS5jc3MoYnV0dG9uUG9zKTtcbiAgICAvL9C40LfQvNC10L3QuNC8INGI0LjRgNC40L3RgyDQs9Cw0LvQtdGA0LXQuFxuICAgIGdhbGxlcnlCb3guY3NzKHsnd2lkdGgnOmJ1dHRvblBvcy5sZWZ0K2ltYWdlU3RhbmRhcnRzLmJhc2VXaWR0aCsncHgnfSk7XG4gICAgJCgnLmdhbGxlcnknKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG4gICAgXG4gICAgIFxuICB9XG4gIGFkZEltYWdlcyhpbWFnZURhdGEpO1xuXG5cbiAgJCgnI2FkZC1waG90b19faW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oZXZ0KXtcbiAgICB2YXJcbiAgICAgIGZpbGVzID0gZXZ0LnRhcmdldC5maWxlcywgICAgICAgICAgICAgIFxuICAgICAgZmlsZSA9IGZpbGVzWzBdLFxuICAgICAgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpOyAgICAgICAgICAgICAgICBcbiAgICByZWFkZXIub25sb2FkID0gKGZ1bmN0aW9uKGV2ZW50KSB7ICAgICAgICAgICBcbiAgICAgIHZhciBpbWFnZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XG4gICAgICB2YXIgaW1hZ2VEYXRhID0gW3t1cmwgOiBpbWFnZX1dO1xuICAgICAgJCgnI2FkZC1waG90b19faW5wdXQnKS52YWwoJycpO1xuICAgICAgYWRkSW1hZ2VzKGltYWdlRGF0YSk7XG4gICAgfSk7XG4gIH0pO1xuXG5cbn0pOyJdfQ==
