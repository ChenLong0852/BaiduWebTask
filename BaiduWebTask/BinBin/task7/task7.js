var data=[];		//定义存放遍历节点位置的数组
var rot=document.getElementById("root");  //获取根节点
var pre=document.getElementById("preOrder");//获取按钮
var mid=document.getElementById("inOrder");
var post=document.getElementById("postOrder");
var movement,n;//定时器和计数器

//先序遍历,遍历结果存入数组
function preOrder(root) {
	if(root!=null){
		data.push(root);
		preOrder(root.firstElementChild);
		preOrder(root.lastElementChild);
	}
}
//中序
function inOrder(root){
	if(root!=null){
		inOrder(root.firstElementChild);
		data.push(root);
		inOrder(root.lastElementChild);
	}
}
//后序
function postOrder(root){
	if(root!=null){
		postOrder(root.firstElementChild);
		postOrder(root.lastElementChild);
		data.push(root);
	}
}

//定时器检测
function check(){
	if(movement){
		clearTimeout(movement);
		console.log(data.length);
		data[n].style.background="#FFFFFF";//将再次点击时执行位置的bgc变为白色
		n=0;//计数器清零
		data=[];
	}
}

//从数组输出节点，并设置动画
function change(color){
	var i=0;
	var preCol;
	var len=data.length;
	var col=color;
	function show(){
		if(i==len){
			alert("遍历OK!")
			return;
		}
		data[i].style.background=color;
		if(preCol){
			data[i-1].style.background="#FFFFFF";
		}else{
			preCol=data[i].style.background;
		}
		n=i;//将当前执行位置赋给变量n
		i++;
		movement=setTimeout(arguments.callee,500);//回调自己，实现动画效果
	}
	show();
}

window.onload=function(){
	// 绑定事件
	pre.onclick=function(){
		check();//检测是否已有定时器动画，
		preOrder(rot);
		change("red");
	}

	mid.onclick=function(){
		check();
		inOrder(rot);
		change("green");
	}

	post.onclick=function(){
		check();
		postOrder(rot);
		change("blue");
	}
}