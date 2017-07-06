var ele=document.getElementsByTagName("input");
var password;//声明密码

//insertAfter
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.a(newElement,targetElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

//addClass
function addClass(element,className,color){
	var warnEle=element.nextSibling;
	if(className=="nopain"){
		if(element.classList.contains("passin")){
			element.classList.remove("passin");
		}
		element.classList.add("nopain");
		warnEle.style.color=color;
	}
	if(className=="passin"){
		if(element.classList.contains("nopain")){
			element.classList.remove("nopain");
		}
		element.classList.add("passin");
		warnEle.style.color=color;
	}
}

// 聚焦事件
function focus(name){
	if(name=="name"){
		nameFocus(that,"名称为4~16个字符");
		// 执行名称提示函数
	}
	if(name=="password"){
		nameFocus(that,"密码为4~12个字符");
		//执行密码提示函数
	}
	if(name=="pass"){
		nameFocus(that,"请再次输入密码");
		//执行重复密码提示函数
	}
	if(name=="email"){
		nameFocus(that,"请输入您的邮件");
		//执行邮件提示函数
	}
	if(name=="tel"){
		nameFocus(that,"请输入11位号码");
		//执行号码提示函数
	}
}

//提示函数
function nameFocus(element,text){
	if(element.nextSibling.tagName=='SPAN') return;
	var spans=document.createElement("span");
	spans.className="warning";
	spans.innerText=text;
	insertAfter(spans,element);
}

//失焦事件
function blur(name){
	if(name=="name"){
		//因为要获取当前元素的下一个span标签，所以一直传递that
		nameTest(that);
		// 执行名称验证函数
	}
	if(name=="password"){
		wordTest(that);
		var pas=document.getElementById("pass");
		// 如果重复密码存在值，则再次验证密码
		if(pas.value){
			passTest(pas);
		}
		//执行密码验证函数
	}
	if(name=="pass"){
		passTest(that);
		//执行重复密码验证函数
	}
	if(name=="email"){
		emailTest(that);
		//执行邮件验证函数
	}
	if(name=="tel"){
		telTest(that);
		//执行号码验证函数
	}
}

//名称验证函数
function nameTest(element){
	var warnEle=element.nextSibling;
	var value=element.value;
	var len=value.length;
	var sum=0;
	var code;//字符编码变量
	for(var i=0;i<len;i++){
		//"𠮷"字 32位编码
		code=value.charCodeAt(i);
		if(code<0x00 || code>0xFF){
			//查找32位编码汉字
			//http://ife.baidu.com/note/detail/id/583
			if(code>=0xD800 && code<=0xDBFF){
				sum+=2;
				i++;
			}else{
				sum+=2;
			}
		}else{
			sum++;
		}
	}
	if(sum>3 && sum<17){
		warnEle.innerText="名称可用";
		addClass(element,"passin","#47F334");
		// if(element.classList.contains("nopain")){
		// 	element.classList.remove("nopain");
		// }
		// element.classList.add("passin");
		// warnEle.style.color="#47F334";
	}else if(sum==0){
		warnEle.innerText="名称不能为空";
		addClass(element,"nopain","#F82323");
	}else if(sum>17){
		warnEle.innerText="名称过长";
		addClass(element,"nopain","#F82323");
	}else if(sum<4){
		warnEle.innerText="名称过短";
		addClass(element,"nopain","#F82323");
	}
}

//密码验证函数
function wordTest(element){
	var warnEle=element.nextSibling;
	var value=element.value;
	var len=value.length;
	var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
	if(reg.test(value)){
		warnEle.innerText="密码不能有汉字";
		addClass(element,"nopain","#F82323");
		// alert("存在汉字");
		return false;
	}
	// console.log(password);
	// if(password){
	// 	if(value!==password){
	// 		warnEle.innerText="两次密码不同";
	// 		if(element.classList.contains("passin")){
	// 			element.classList.remove("passin");
	// 		}
	// 		element.classList.add("nopain");
	// 		warnEle.style.color="#F82323";
	// 	}
	// }
	if(len>3 && len<13){
		warnEle.innerText="密码可用";
		addClass(element,"passin","#47F334");
		password=value;
	}else if(len==0){
		warnEle.innerText="密码不能为空";
		addClass(element,"nopain","#F82323");
	}else if(len>13){
		warnEle.innerText="密码过长";
		addClass(element,"nopain","#F82323");
	}else if(len<4){
		warnEle.innerText="密码过短";
		addClass(element,"nopain","#F82323");
	}
}

//重复密码验证
function passTest(element){
	var warnEle=element.nextSibling;
	var value=element.value;
	if(value===password){
		warnEle.innerText="再次输入正确";
		addClass(element,"passin","#47F334");
		password=value;
	}else if(!password){
		warnEle.innerText="请先输入密码";
		addClass(element,"nopain","#F82323");
	}else{
		warnEle.innerText="两次密码不相同，请重新输入";
		element.classList.add("nopain");
		if(element.classList.contains("passin")){
			element.classList.remove("passin");
		}
		warnEle.style.color="#F82323";
	}
}

//邮箱验证函数
function emailTest(element){
	var warnEle=element.nextSibling;
	var value=element.value;
	var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(!reg.test(value)){
		warnEle.innerText="请正确输入邮箱地址";
		addClass(element,"nopain","#F82323");
	}else{
		warnEle.innerText="邮箱可用";
		addClass(element,"passin","#47F334");
	}
}

//号码验证函数
function telTest(element){
	var warnEle=element.nextSibling;
	var value=element.value;
	var reg = /^((0\d{2,3}-\d{7,8})|(1[35847]\d{9}))$/;
	if(!reg.test(value)){
		warnEle.innerText="请正确输入手机号码";
		addClass(element,"nopain","#F82323");
	}else{
		warnEle.innerText="号码可用";
		addClass(element,"passin","#47F334");
	}
}

//提交事件
var validate=document.getElementById("upload");
function upload(event){
	//当每项验证通过时有一个passin类，否则不通过
	//定义一个状态对象
	var validate={};
	// validate.name=false;

	for(var i=0,len=ele.length;i<len;i++){
		if(ele[i].classList.contains('passin')){
			validate.name=true;
		}else{
			validate.name=false;
			validate.element=ele[i];
			break;
		}
	}
	if(validate.name==true){
		event.preventDefault();
		alert("Pass");
	}else{
		event.preventDefault();
		alert("error");
		validate.element.focus();
	}
}


//绑定事件
function events(){
	for(var i=0,len=ele.length;i<len;i++){
		ele[i].onfocus=function(){
			that=this;
			var name=this.name;//传递当前input框的name
			// var value=this.value;//传递当前input框的值
			focus(name);
			// console.log(that);
		}
		ele[i].onblur=function(){
			that=this;
			var name=that.name;
			// var value=this.value;
			blur(name);
			// console.log(password);
		}
	}
}

window.onload=function(){
	events();

	validate.onclick=function(e){
		upload(e);
	}
}