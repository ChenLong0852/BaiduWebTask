//获取按钮
var forward=document.getElementById("forward");
var toleft=document.getElementById("toleft");
var toright=document.getElementById("toright");
var toback=document.getElementById("toback");

//获取方块
// var head=document.getElementById("head");

//定义状态变量
var direction="top";

//定义个蓝色块朝向时的属性设置函数
function setAttr(direct){
	var head=document.getElementById("head");
	switch(direct){
		case "left":
			setAttr("10px","40px","0","0","left")
			head.style.width="10px";
			head.style.height="40px";
			head.style.marginTop="0";
			head.style.marginLeft="0";
			direction="left";
			break;
		case "bottom":
			head.style.width="40px";
			head.style.height="10px";
			head.style.marginTop="30px";
			head.style.marginLeft="0";
			direction="bottom";
			break;
		case "right":
			head.style.width="10px";
			head.style.height="40px";
			head.style.marginTop="0";
			head.style.marginLeft="30px";
			direction="right";
			break;
		case "top":
			head.style.width="40px";
			head.style.height="10px";
			head.style.marginTop="-20px";
			head.style.marginLeft="0";
			direction="top";
			break;
	}
}

//向左转
function toLeft(){
	//因为是按值传递的，所以赋值只是传递给了当前值，并不能修改style属性值
	// var wid=head.style.width;
	// var hei=head.style.height;
	// var marTop=head.style.marginTop;
	// var marLeft=head.style.marginLeft;
	switch(direction){
		case "top":
			setAttr("left");
			break;
		case "left":
			setAttr("bottom");
			// head.style.width="40px";
			// head.style.height="10px";
			// head.style.marginTop="30px";
			// head.style.marginLeft="0";
			// direction="bottom";
			break;
		case "bottom":
			setAttr("right");
			// head.style.width="10px";
			// head.style.height="40px";
			// head.style.marginTop="0";
			// head.style.marginLeft="30px";
			// direction="right";
			break;
		case "right":
			setAttr("top");
			// head.style.width="40px";
			// head.style.height="10px";
			// head.style.marginTop="-20px";
			// head.style.marginLeft="0";
			// direction="top";
			break;
	}
}

//向右转
function toRight(){
	switch(direction){
		case "top":
			setAttr("right");
			break;
		case "left":
			setAttr("top");
			break;
		case "bottom":
			setAttr("left");
			break;
		case "right":
			setAttr("bottom");
			break;
	}
}

//向后转
function toBack(){
	switch(direction){
		case "top":
			setAttr("bottom");
			break;
		case "left":
			setAttr("right");
			break;
		case "bottom":
			setAttr("top");
			break;
		case "right":
			setAttr("left");
			break;
	}
}
// 定义一个前进属性设置函数
// function setGo(direction){

// }

//向前进
var tdId=44;//定义初始的格子id

function forWard(){	
	var head=document.getElementById("head");
	var parent=head.parentNode;//获取头部父节点
	var parentClass=parent.className;//获取头部父元素的类名
	var clone=head.cloneNode(true);//克隆头节点
	var table=document.getElementById("boom");
	var tds=table.getElementsByTagName("td");//获取表格里面的所有td标签
	// console.log(tds[44]);

	var leftNumber=/0/;

	switch(direction){
		case "left":
			if(leftNumber.test(tdId)){
				alert("再往左走就掉下去啦");
				return false;
			}else{
				tdId=tdId-1;
				tds[tdId].appendChild(clone);
				if(!tds[tdId].classList.contains("body")){
					tds[tdId].classList.add("body");
				}
			}
			break;
		case "bottom":
			tdId=tdId+10;
			if(tdId>99){
				alert("楼板穿了");
				tdId=tdId-10;
				return false;
			}else{
				tds[tdId].appendChild(clone);
				if(!tds[tdId].classList.contains("body")){
					tds[tdId].classList.add("body");
				}
			}
			break;
		case "right":
			tdId=tdId+1;
			if(leftNumber.test(tdId)){
				alert("右边走不动了");
				tdId=tdId-1;
				return false;
			}else{
				tds[tdId].appendChild(clone);
				if(!tds[tdId].classList.contains("body")){
					tds[tdId].classList.add("body");
				}
			}
			break;
		case "top":
			tdId=tdId-10;
			if(tdId<0){
				alert("撞天花板啦");
				tdId=tdId+10;
				return false;
			}else{
				tds[tdId].appendChild(clone);
				if(!tds[tdId].classList.contains("body")){
					tds[tdId].classList.add("body");
				}
			}
			break;
	}
	//保证在撞墙时不会先删除上一位置
	parent.removeChild(head);
	if(parent.classList.contains("body")){
		parent.classList.remove("body");
	}
	// var leftNumber=/0/;
	// console.log(leftNumber.test(tdId))



	// tds[1].style.background="red";
	// console.log(tds.length);
	
	// var i=0,len=tds.length;
	// function test(){
	// 	if(i<len){
	// 		tds[i].innerHTML=i;
	// 		// console.log(i);
	// 		i++;
	// 	}
	// 	setTimeout(arguments.callee,10);
	// }
	// test();
}

window.onload=function(){
	toleft.onclick=function(){
		toLeft();
		console.log(direction);
	}

	toright.onclick=function(){
		toRight();
		console.log(direction);
	}

	toback.onclick=function(){
		toBack();
		console.log(direction);
	}

	forward.onclick=function(){
		forWard();
	}
}