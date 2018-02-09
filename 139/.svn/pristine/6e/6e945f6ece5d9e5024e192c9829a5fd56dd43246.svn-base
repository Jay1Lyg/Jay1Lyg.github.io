$(document).ready(function(){
	//当屏幕高度达到一定距离时，就在页面上动态添加一个返回顶部的按钮（absolute,right=0;）绑定返回顶部事件。
  	 var div=document.createElement("div");	
  	$(div).css({
		"width":"3rem",
		"height":"3rem",
		"border-radius":"50%",
		"background-image":"url(/img/gotop.png)",
		"background-size":"100%",
		"position":"fixed",
		"right":"1rem",
		"bottom":"1rem",
		"display":"none",	
	});	
	console.log($(div).attr("background-image"));//undefined
  	$("body").append(div);
  	window.onscroll = function(){ 	
     var t = document.documentElement.scrollTop || document.body.scrollTop;  //获取距离页面顶部的距离
  	 console.log(t);
     if( t >= 1000 ) { //当距离顶部超过300px时
		 $(div).css("display","block");
  		    div.onclick=function(){
  			document.body.scrollTop = document.documentElement.scrollTop = 0;
			 $(div).css("display","none");
  		}
     }else if(t<=1000){//防止用户手动滑到上端，也得让此按钮隐藏
		 $(div).css("display","none");
	 }  
  } 
});
