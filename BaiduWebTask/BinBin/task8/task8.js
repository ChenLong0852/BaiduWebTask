var data=[];//定义存放数组

// var nodes={};//定义存放节点对象
var rot=document.getElementById("root");
var dfs=document.getElementById("dfs");
var bfs=document.getElementById("bfs");
var sea=document.getElementById("search");
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

// 广度优先，遍历节点深度失败，遇到无子节点的就会出错
// function bfsOrder(root){
// 	if(root){
// 		for(var i=0,len=root.children.length;i<len;i++){
// 			var nodes={};
// 			nodes.name=root.children[i];
// 			nodes.value=txt(root.children[i]);
// 			data.push(nodes);
// 		}
// 	// console.log(m);
// 	}
// 	root=data[m].name;
// 	m++;
// 	if(root.firstElementChild==null){
// 		m++;
// 		bfsOrder(root.firstElementChild);
// 	}
// 	bfsOrder(root.firstElementChild);
// }

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

window.onload=function(){
	// 绑定事件
	dfs.onclick=function(){
		check();
		dfsOrder(rot);
		// console.log(data.length);
		change("red");
	}

	bfs.onclick=function(){
		check();
		bfsOrder(rot);
		change("blue");
		console.log(data);
	}

	sea.onclick=function(){
		sear("yellow");
	}
}

