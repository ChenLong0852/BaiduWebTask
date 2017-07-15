var popBut=document.getElementById("popBut");
var popBox=document.getElementById("popBox");
var popUp=document.getElementById("popUp");

var popConfirm=document.getElementById("popConfirm");
var popCancel=document.getElementById("popCancel");


window.onload=function(){
	popBut.onclick=function(){
		popBox.style.display="block";
	}

	//要阻止popUp盒子冒泡，不然点盒子也会冒泡到大盒子
	popUp.onclick=function(evevt){
		var event = event || window.event;
		event.stopPropagation();
	}

	popBox.onclick=function(){
		// e.preventDefault();
		// var event = event || window.event;
		// event.stopPropagation();
		
		if(popBox.style.display="block"){
			popBox.style.display="none";
		}
	}

	popConfirm.onclick=function(){
		popBox.style.display="none";
		return true;
	}

	popCancel.onclick=function(){
		popBox.style.display="none";
		return false;
	}
}