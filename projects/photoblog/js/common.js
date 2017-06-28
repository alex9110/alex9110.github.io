$(function(){

	// var width = 24; // начальная ширина блоков 
	// var margin = 0.5; //отступ в процентах
	// var sum = 4; //количество фоток в ряде

	// // узнать реальные пропорцыи
	// // делим высоту на ширину 
	// var prop1 = (800/1200)*100;
	// var prop2 = (800/533)*100;
	// var prop3 = (1200/800)*100;
	// var prop4 = (1200/800)*100;	
	//  // установить высоту для блоков согласно пропорцыям
	// $("#box31 .heigth").css({"padding-top": prop1+"%"});
	// $("#box32 .heigth").css({"padding-top": prop2+"%"});
	// $("#box33 .heigth").css({"padding-top": prop3+"%"});
	// $("#box34 .heigth").css({"padding-top": prop4+"%"});
	// //нужно узнать какой блок самый высокий
	// //{} пока что допустим что это prop4 150%
	// //выровнять все блоки по нем с сохранением пропорцый для этого увеличим ширину у низких блоков
	// var kof1 = prop4/prop1; //узнаем в сколько раз самый большой блок высше того который мы хотим выровнять
	// var newWidth =  kof1*width; //новая ширина блока необходимая для выравнивания его же по высоте с самым высоким
	// //узнать сумарную ширину всех блоков в процентах после того как они выровнены по высоте
	// var totalWidth = newWidth + width*3;
	// //узнать в сколько раз ширина родительского блока меньше чем сумма ширин всех блоков минус все маржини
	// var mainKof = ( 100-margin*(sum*2) )/totalWidth;
	// // console.log(mainKof);
	// //умножить ширину каждого блока на получившийся коэфицыент
	// $("#box31").css({"width":newWidth*mainKof+"%"});
	// $("#box32").css({"width":width*mainKof+"%"});
	// $("#box33").css({"width":width*mainKof+"%"});
	// $("#box34").css({"width":width*mainKof+"%"});
	// console.log(newWidth*mainKof,width*mainKof);


	// var width = 49; // начальная ширина блоков 
	// var margin = 0.5; //отступ в процентах
	// var sum = 2; //количество фоток в ряде
	// var prop1 = (800/1200)*100;
	// var prop2 = (800/533)*100;
	 // установить высоту для блоков согласно пропорцыям
	// $("#gall_box31 .heigth").css({"padding-top": prop1+"%"});
	// $("#gall_box32 .heigth").css({"padding-top": prop2+"%"});
	// var kof1 = prop2/prop1;
	// var newWidth = kof1*width;
	// var totalWidth = newWidth + width;
	// var mainKof = ( 100-margin*(sum*2) )/totalWidth;
	// $("#gall_box31").css({"width":newWidth*mainKof+"%"});
	// $("#gall_box32").css({"width":width*mainKof+"%"});
	// console.log(prop2);

//В КАЧАЕСТВЕ ПАРАМЕТРОВ принимает двохуровневый массив первый уровень елементы второй уровень высота ширина
	// function normalSize(arr){
	// 	// узнать реальные пропорцыи каждого элементов засунуть данные в массив
	// 	var prop = [];
	// 	for (var i = 0; i < arr.length; i++) {
	// 		prop[i] = (arr[i][0]/arr[i][1])*100;
	// 	}
	// 	console.log(prop);
	// 	$("#box31 .heigth").css({"padding-top": prop[0]+"%"});
	// 	$("#box32 .heigth").css({"padding-top": prop[1]+"%"});
	// 	$("#box33 .heigth").css({"padding-top": prop[2]+"%"});
	// 	$("#box34 .heigth").css({"padding-top": prop[3]+"%"});

	// 	//какой блок самый высокий
	// 	var mx = prop.max();
	// 	console.log(mx);

	
	// }
	// var param = [[800,1200],[800,533],[1200,800],[1200,800]];
	// normalSize(param);
});