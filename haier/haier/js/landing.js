function checkForm(){
	if(aa()&&bb()){
		return true;
	}else{
		return false;
	}
}
function aa(){
	var regexp1=/^(\+86)?-?\s*1[34578]\d{9}$/g;
	var regexp2=/^\w+@\w+(-\w+)*(\.\w+)+$/g;
	var username=document.getElementById("username").value;
	var tishi1=document.getElementById("tishi1");
	if(username===""){
			tishi1.innerHTML="请输入登录名！";
			return false;
	}else if(regexp1.test(username)||regexp2.test(username)){
			tishi1.innerHTML="<img src='../haier/img-z/true.png'>";
			return true;
		}else{
			tishi1.innerHTML="<img src='../haier/img-z/error.png'>输入不正确！";
			return false;
		}
}
function bb(){
	var regexp=/^[0-9|A-Z|a-z]{6,16}$/;
	var password=document.getElementById("password").value;
	var tishi2=document.getElementById("tishi2");
	if(password===""){
			tishi2.innerHTML="请输入密码！";
			return false;
	}else if(regexp.test(password)){
			tishi2.innerHTML="<img src='../haier/img-z/true.png'>";
			return true;
		}else{
			tishi2.innerHTML="<img src='../haier/img-z/error.png'>输入不正确！";
			return false;
		}
}


