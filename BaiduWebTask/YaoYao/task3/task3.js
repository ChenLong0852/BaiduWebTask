var study=document.getElementById("study");
var nostudy=document.getElementById("nostudy");

var student=document.getElementsByName("student");

function students(){
	//选择在校生
	if(student[0].checked){
		study.style.display="block";
		nostudy.style.display="none";
	}
	//选择非在校生
	if(student[1].checked){
		study.style.display="none";
		nostudy.style.display="block";
	}
}
//绑定事件
function bindEvent(){
	for(var i=0,len=student.length;i<len;i++){
		student[i].onclick=function(){
			students();
		}
	}
}

//学校联动
var city=document.getElementById("city");
var university=document.getElementById("university");

//获取联动起始标签
// var city=document.getElementById("city").childNodes[0];

function school(citys){
	university.options.length=0;
	switch(citys){
		case "beijing":
			elem("option","beijing","北大",university);
			elem("option","beijing","清华",university);
			elem("option","beijing","北航",university);
			break;
		case "shanghai":
			elem("option","beijing","复旦",university);
			break;
		case "guangzhou":
			elem("option","beijing","中山",university);
			elem("option","beijing","中山",university);
			break;
		case "chengdu":
			elem("option","beijing","川大",university);
			elem("option","beijing","电子科技",university);
			elem("option","beijing","川师",university);
			break;
		case "guizhou":
			elem("option","beijing","贵大",university);
			break;
	}
}

//创建option
// elem("option","beijing","北京",university);
function elem(elemment,value,content,parentNode){
	var node=document.createElement(elemment);
	node.innerText=content;
	node.value=value;
	parentNode.appendChild(node);
}

window.onload=function(){
	bindEvent();

	city.onchange=function(){
		//获取城市的值
		var citys=this.value;
		console.log(citys);
		school(citys);
	}
}