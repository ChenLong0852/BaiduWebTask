// html5
function valid(ele){
	if(ele.value.length!=11){
		ele.setCustomValidity("不是正确的手机号码");
	}else{
		ele.setCustomValidity("");
	}
}

// js
// 获取按钮
var butone=document.getElementById("butone");


function test(){
	// 获取输入框
	var nam=document.getElementById("nam");
	// 获取span
	var wrinfor=document.getElementById("wrinfor");
	var len=nam.value.length;
	var sum=0;
	var code;//字符编码变量
	var temper;
	for(var i=0;i<len;i++){
		//"𠮷"字 32位编码
		code=nam.value.charCodeAt(i);
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
	console.log(sum);
	if(sum>3 && sum<17){
		wrinfor.innerText="Pass";
		if(nam.classList.contains("nopain")){
			nam.classList.remove("nopain");
		}
		nam.classList.add("passin");
		wrinfor.style.color="#47F334";
	}else{
		wrinfor.innerText="error";
		nam.classList.add("nopain");
		wrinfor.style.color="#F82323";
	}
}


window.onload=function(){
	butone.onclick=function(){
		test();
	}
}