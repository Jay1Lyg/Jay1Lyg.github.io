$(document).ready(function(){
		var dom=document.createElement("div");
		document.body.appendChild(dom);
		$(dom).css({
			"width":"100%",
			"height":"auto",
			"background":"none",
			"position":"absolute",
			"left":0,
			"right":0,
			"top":"150px",
			"z-index":100,
			"display":"none"
		});
		var appimg=document.createElement("img");
		dom.appendChild(appimg);
		console.log(15151515);
		$(appimg).css({"width":"100%","height":"100%"});
		//注意：引用此js文件时注意将类名改过来
		console.log("找到");
		$(".myImg").each(function(index,ele){
			console.log("找到了所有图片");
			var src=$(ele).attr("src");
			var height=$(ele).attr("height");	
			if(src!==""){
				$(ele).click(function(){
					console.log("图片被点击了");
					if($(dom).context.style.display=="none"){
					$(dom).css({"display":"block"});
					$(appimg).attr("src",src);
					$(dom).click(function(){
						$(this).css("display","none");
					});
					}else{
						$(dom).css({"display":"none"});
					}
				});	
			}else{
				$(dom).css("display","none");
			}		
		});
	});