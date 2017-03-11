function $(str){
			var reg = /^(\s+)|(\s+)$/g;
			var str = str.replace(reg,"");
			if(str.substring(0,1)==="#"){
				return document.getElementById(str.substring(1));
			}else if(str.substring(0,1)==="."){
				if(document.getElementsByClassName){
					return document.getElementsByClassName(str.substring(1));
				}else{
					var arr = [];
					var all = document.getElementsByTagName("*");
					for(var i=0;i<all.length;i++){
						if(all[i].className === str.substring(1)){
							arr[arr.length] = all[i];
						}
					}
					return arr;
				}
			}else{
				return document.getElementsByTagName(str);
			}
		}
//邮箱 
$("#btu1").onclick=function(){
	$("#ttt").style.display="block";
	$("#t3").style.display="none";
}
//手机 
$("#btu2").onclick=function(){
	$("#ttt").style.display="none";
	$("#t3").style.display="block";
}

//cebianlan
$("#yi1").onmouseover=function(){
	$("#tu2").style.display="block";
}
$("#yi1").onmouseout=function(){
	$("#tu2").style.display="";
}
$("#tu2").onmouseover=function(){
	$("#tu2").style.display="block";
}
$("#tu2").onmouseout=function(){
	$("#tu2").style.display="";
}
//表单验证

function checkForm(){
				if(user()&&pass()&&repass()){
					return true;
				}else if(usern()&&passw()&&repassw()){
					return true;
				}else{
					return false;
				}
			}
function user(){
	var  regexp=/^\w+@\w+(-\w+)*(\.\w+)$/;
	if(regexp.test($("#uesername").value)){
		    $("#uesername").nextSibling.innerHTML = "<img src='img/zhuce/sign-check-icon.png' class='icon'/>";
		    return true;
        }else{
           	$("#uesername").nextSibling.innerHTML = "<img src='img/zhuce/sign-error-icon.png' class='icon'/> 您输入有误 ";
        }
}
function pass(){
	var  regexp=/^\d{4,16}$/;
	if(regexp.test($("#password").value)){
		    $("#password").nextSibling.innerHTML = "<img src='img/zhuce/sign-check-icon.png' class='icon'/>";
		    return true;
        }else{
           	$("#password").nextSibling.innerHTML = "<img src='img/zhuce/sign-error-icon.png' class='icon'/>您输入有误 ";
           	return false;
        }
}
function repass(){
	if($("#confirmPassword").value===""){
		$("#confirmPassword").nextSibling.innerHTML = "请先输入密码 ";
		return false;
	}else if($("#confirmPassword").value===$("#password").value){
		$("#confirmPassword").nextSibling.innerHTML = "<img src='img/zhuce/sign-check-icon.png' class='icon'/>";
		return true;
	}else{
		$("#confirmPassword").nextSibling.innerHTML = "<img src='img/zhuce/sign-error-icon.png' class='icon'/>两次密码输入不一致";
		return false;
	}
}

//手机注册



//function usern(){
//	var  regexp=/^(\+86)?-?\s*1[34578]\d{9}$/;
//	if(regexp.test($("#uesernam").value)){
//		    $("#uesernam").nextSibling.innerHTML = "<img src='img/zhuce/sign-check-icon.png' class='icon'/>";
//		    return true;
//      }else{
//         	$("#uesernam").nextSibling.innerHTML = "<img src='img/zhuce/sign-error-icon.png' class='icon'/> 您输入有误 ";
//         	return false;
//      }
//}
function usern(){
	var  regexp=/^(\+86)?-?\s*1[34578]\d{9}$/;
	if(regexp.test($("#uesernam").value)){
		$("#uesernam").nextSibling.innerHTML = "<img src='img/zhuce/sign-check-icon.png' class='icon'/>";
		return true;
	}else{
        $("#uesernam").nextSibling.innerHTML = "<img src='img/zhuce/sign-error-icon.png' class='icon'/> 您输入有误 ";
		return false;
	}
}
function passw(){
	var  regexp=/^\d{4,16}$/;
	if(regexp.test($("#passwor").value)){
		    $("#passwor").nextSibling.innerHTML = "<img src='img/zhuce/sign-check-icon.png' class='icon'/>";
		    return true;
        }else{
           	$("#passwor").nextSibling.innerHTML = "<img src='img/zhuce/sign-error-icon.png' class='icon'/>您输入有误 ";
           	return false;
        }
}
function repassw(){
	if($("#confirmPasswor").value===""){
		$("#confirmPasswor").nextSibling.innerHTML = "请先输入密码 ";
		return false;
	}else if($("#confirmPasswor").value===$("#passwor").value){
		$("#confirmPasswor").nextSibling.innerHTML = "<img src='img/zhuce/sign-check-icon.png' class='icon'/>";
		return true;
	}else{
		$("#confirmPassword").nextSibling.innerHTML = "<img src='img/zhuce/sign-error-icon.png' class='icon'/>两次密码输入不一致";
		return false;
	}
}