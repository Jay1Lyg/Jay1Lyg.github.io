			var username=document.getElementsByName("username")[0];
			var password=document.getElementById("password");
			var checkbox=document.getElementById("checkbox");
			var gg=document.getElementById("gg");
			
			gg.onclick=function(){
				if(checkbox.checked===true){
					setCookie(username,password,30);
				}else{
					setCookie(username,password,-1);
				}
				console.log(document.cookie);
			}
			
			username.onblur=function(){
				var cookie=decodeURIComponent(document.cookie);
				var str=cookie.split(";");
				for(var i=0;i<str.length;i++){
					if(username.value===str[i].split("=")[0].trim()){
						password.value=str[i].split("=")[i].trim();
					}
				}
			}
			
		
			function setCookie(key,val,d){
				var now=new Date();
				now.setTime(now.getTime()+d*24*3600*1000);
				document.cookie=key.value+"="+
				encodeURIComponent(val.value)+
				";expires="+now.toGMTString();
			}
		
			