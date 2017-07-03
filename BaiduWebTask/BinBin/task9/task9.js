var data=[];//定义存放数组

// var nodes={};//定义存放节点对象
var rot=document.getElementById("root");
var dfs=document.getElementById("dfs");
var bfs=document.getElementById("bfs");
var sea=document.getElementById("search");

var del=document.getElementById("del");
var ins=document.getElementById("insert");

var movement,n;//定时器和计数器
// var m=1;//广度优先中定义的一个记录数组的索引值

//深度优先
function dfsOrder(root){
	if(root!=null){
		var nodes={};//对象传递的是指针，修改不同的指针会修改原始对象，定义到函数内，每次都释放再生成
		nodes.name=root;
		nodes.value=txt(root);
		// nodes.len=root.children.length;
		data.push(nodes);
	}
	// console.log(data[data.length-1].name)
	// console.log(data[data.length-1].value);
	for(var i=0,len=root.children.length;i<len;i++){
		dfsOrder(root.children[i]);
	}
}

function bfsOrder(root){
	if(root!=null){
		var queue=[];//声明临时队列
		queue.push(root);
		while(queue.length!=0){
			console.log(queue.length);
			var nodes={};
			nodes.name=queue[0];
			nodes.value=txt(queue[0]);
			data.push(nodes);
			var child=queue[0].children
			if(child){
				for(var i=0,len=child.length;i<len;i++){
					queue.push(child[i]);
				}
			}
			queue.shift();
		}
	}
}

//检索
function sear(color){
	var con=document.getElementById("valu");
	if(data.length==0){
		dfsOrder(rot);
	}
	if(con.value==""){
		alert("请输入有效字符！");
		return;//出口
	}
	for(var i=0,len=data.length;i<len;i++){
		if(data[i].value.indexOf(con.value)>-1){
			data[i].name.style.background=color;
		}else{
			data[i].name.style.background="#fff";
		}
	}
}

// 检测子节点是否为文本节点
function txt(nod){
	var len=nod.childNodes.length;
	// console.log("len"+len);
	var val="";
	for(var i=0;i<len;i++){
		if(nod.childNodes[i].nodeType==3){
			val=val+nod.childNodes[i].nodeValue.trim();
		}
	}
	// console.log("val"+val);
	return val;
}

//定时器检测
function check(){
	if(movement){
		clearTimeout(movement);
		console.log(data.length);
		data[n].name.style.background="#FFFFFF";//将再次点击时执行位置的bgc变为白色
		n=0;//计数器清零
		// m=0;
		data=[];
	}
}

// 从数组输出节点，并设置动画
function change(color){
	var i=0;
	var preCol;
	var len=data.length;
	var col=color;
	function show(){
		if(i==len){
			alert("OK!")
			return;
		}
		data[i].name.style.background=color;
		if(preCol){
			data[i-1].name.style.background="#FFFFFF";
		}else{
			preCol=data[i].name.style.background;
		}
		n=i;//将当前执行位置赋给变量n
		i++;
		movement=setTimeout(arguments.callee,500);//回调自己，实现动画效果
	}
	show();
}

//task9
//forEach参考链接：https://stackoverflow.com/questions/31534066/javascript-object-foreach-is-not-a-function
// 单击事件
function cli(){
	var totale=document.getElementsByClassName("box");
	var totalele=Array.prototype.slice.call(totale);
	totalele.forEach(function(e){//document.getElementsByClassName获取的是一个类数组，并没有forEach方法，
		e.onclick=function(e){
			e.preventDefault();//阻止元素鼠标点击事件的默认行为;
			e.stopPropagation();//防止事件冒泡;
			if(this.classList.contains("click")){
				this.classList.remove("click");
			}else{
				this.classList.add("click");
			}
		}
	});
}

//html5有一个classList API
//提供add,remove,contains等多个方法

//增加类
// function addC(element,class){
// 	if(!element)return;
// 	if(!element.className){
// 		element.className=class;
// 	}else{
// 		var preClass=element.className;
// 		element.className=preClass+" "+class;
// 	}
// }

//删除类
// function removeC(element,class){
// 	if(element.className.indexOf(class)!==-1){
// 		var preClass=element.className;
// 		preClass = preClass.replace(value, '');
// 		element.className = preClass.trim();
// 	}
// }

// 删除DOM节点
var domNodes=[]; //定义单击节点
// 先遍历，存储有“click”类的节点
function domOrder(root){
	if(root.classList.contains("click")){
		domNodes.push(root);
	}
	for(var i=0,len=root.children.length;i<len;i++){
		arguments.callee(root.children[i]);
	}
}

function domRemove(){
	domNodes=[];//保证多次可以多次清除
	domOrder(rot);
	if(domNodes.length==0){
		alert("您还未选中节点");
	}
	for(var i=0,len=domNodes.length;i<len;i++){
		console.log(domNodes);
		if(domNodes[i]!=null){
			domNodes[i].parentNode.removeChild(domNodes[i]);
		}else{
			continue;
		}
	}
}

//插入节点
function domInsert(){
	var valu=document.getElementById("valu1");
	domNodes=[];
	domOrder(rot);
	if(domNodes.length==1){
		var cdiv=document.createElement("div");
		cdiv.innerHTML=valu.value;
		cdiv.setAttribute("class","box");
		domNodes[0].appendChild(cdiv);
	}else if(domNodes.length==0){
		alert("您未选中节点！")
	}else{
		alert("您选中了"+domNodes.length+"个节点！")
	}
	cli();
}

window.onload=function(){
	// 绑定事件
	dfs.onclick=function(){
		check();
		dfsOrder(rot);
		change("red");
	}

	bfs.onclick=function(){
		check();
		bfsOrder(rot);
		change("blue");
	}

	sea.onclick=function(){
		sear("yellow");
	}

	cli();

	del.onclick=function(){
		domRemove();
	}

	ins.onclick=function(){
		domInsert();
	}
}

