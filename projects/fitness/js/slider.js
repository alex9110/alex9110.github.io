$( document ).ready(function() {	

	var interval = 3000;			//через сколько сдвигать слайд ms
	var time = 800;					//время сдвига ms
	var x = -100;					//в какую сторону и насколько сдвигать елемент по оси x %
	var indicator = ".indicator"; 	//имя класса индикаторов смены анимацыии
	var notActoveCollor = "#fff";	//цвет не активного индикатора
	var actoveCollor = "#292929";	//цвет активного индикатора

	var n = 0;						//порядковый номер indicator который первый будет подсвечиватся как активный
	$(indicator+":eq("+n+")").css({"background-color": actoveCollor});		
	$(".slider").css({"transition": time+"ms"});		//установим значения для свойсва css transition
	var setInt = setInterval(start, interval);

	$(".slideBut").on("click", mySlider);			//обработчик клика по елементах управления слайдером
	
	function mySlider(evt){
		clearInterval(setInt);					
		$('.slideBut').unbind('click');				//временно удалим обработчик
		var element = evt.currentTarget;
		element = $(element).hasClass("next");		//если мы кликнули на элемент с классом  next
		// var direction;	
		if (element) {								//если в переменная определена то мы кликнули на элемент с классом  next
			x=(x>0)?x*-1:x;							//нужен минусовой х
			// x = -x;
		}else{x=(x<0)?x*-1:x;}						//нужен плюсовой х

		start(x);									//это чтобы del() вернула обработчик клика 
	}

	function start(val){
		$(".slider:last").css({"left":x+"%"});		//сдвинем слайд
		setTimeout(function(){del(val);}, time);		
	}

	function del(val){								//перемещает последний элемент 
		if (val) {
			var arr = $(indicator).css({"background-color": notActoveCollor});
			// console.log(val);
			n = (val>0)?n-1:n+1;			
		}else{
			var arr = $(indicator).css({"background-color": notActoveCollor});
			 n = (x<0)?n+1:n-1;
		}
		
		if (n>=arr.length) {n=0;}					//корекцыя n
		if (n<0) {n=arr.length-1;}					//корекцыя n

		$(indicator+":eq("+n+")").css({"background-color": actoveCollor});
		var currentFon = $('.slider:last');			//временно снесём
		currentFon.detach();
		currentFon.css({"left":"0%"})				//поставим фото в начальное положение
		$('.image').prepend(currentFon);

		if (val) {									//вернём обработчик 
			$(".slideBut").on("click", mySlider);		
		}
	}
});