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
 
 window.alert = function(str){
				var bgDiv = document.createElement("div");
					bgDiv.id = "bgDiv";
					bgDiv.style.position = "absolute";
					bgDiv.style.left = "0px";
					bgDiv.style.top = "0px";
					bgDiv.style.width = "100%";
					h=document.body.scrollHeight;
					bgDiv.style.height = h+"px";
					try{
						bgDiv.style.background = "rgba(0,0,0,.5)";
					}catch(e){
						bgDiv.style.background = "#000";
						bgDiv.style.filter = "alpha(opacity=50)";   //IE8
					}
					bgDiv.style.zIndex = "299";
				document.body.appendChild(bgDiv);
				var centerDiv = document.createElement("div");
					centerDiv.id = "centerDiv";
					centerDiv.style.position = "absolute";
					centerDiv.style.left = "50%";
					centerDiv.style.top = "50%";
					centerDiv.style.marginLeft = "-346px";
					centerDiv.style.marginTop = "-231px";
					centerDiv.style.width = "692px";
					centerDiv.style.height = "462px";
					centerDiv.style.background = "#fff";
					centerDiv.style.zIndex = "300";
					centerDiv.style.borderRadius="5px";
				document.body.appendChild(centerDiv);
				var strHtml = "<div style='height:40px;width:100%;background:#005aaa;'>";
					strHtml +="<span style='color:white;line-height:40px;margin-left:10px;'>选择地区</span>"
					strHtml +="<p style='position:absolute;top:10px;left:100px'> ";
					strHtml +="<a href='http://www.baidu.com' style='color:white;'>A</a>";
					strHtml +="<a href='#' style='color:white;margin-left:30px;'>B</a><a href='#' style='color:white;margin-left:30px;'>C</a><a href='#' style='color:white;margin-left:30px;'>F</a><a href='#' style='color:white;margin-left:30px;'>G</a><a href='#' style='color:white;margin-left:30px;'>H</a><a href='#' style='color:white;margin-left:30px;'>J</a><a href='#' style='color:white;margin-left:30px;'>X</a><a href='#' style='color:white;margin-left:30px;'>Y</a>";
					strHtml +="</p>";
					strHtml += "</div>";
					
					strHtml += "<div style='height:360px;width:100%;background:white;'>";
					strHtml += "<ul>";
					
					strHtml +="<li style='overflow: hidden;font-size:13px;padding: 5px 0;padding-left:33px;border-bottom: 1px solid #ddd;zoom: 1;'>";
					strHtml +="<span style='margin-top:7px;display: inline-block;'>A</span>";
					strHtml +="<dl style='float: right;overflow: hidden;padding: 3px 0 3px 50px;width: 520px;zoom: 1;'>";
					strHtml +="<dt style='float: left;display: inline;margin-left: -50px;padding: 3px 5px;white-space: nowrap;font-weight: 700;}'>安徽</dt>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>合肥</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>宿州</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>巢湖</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>六安</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>亳州</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>池州</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>宣城</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>合肥</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>池州</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>合肥</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>宣城</dd>";
					strHtml +="</dl>";
					strHtml +="</li>";
					strHtml +="<li style='overflow: hidden;font-size:13px;padding: 5px 0;padding-left:33px;border-bottom: 1px solid #ddd;zoom: 1;'>";
					strHtml +="<span style='margin-top:7px;display: inline-block;'>B</span>";
					strHtml +="<dl style='float: right;overflow: hidden;padding: 3px 0 3px 50px;width: 520px;zoom: 1;'>";
					strHtml +="<dt style='float: left;display: inline;margin-left: -50px;padding: 3px 5px;white-space: nowrap;font-weight: 700;}'>北京</dt>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>北京</dd>";
					strHtml +="</dl>";
					strHtml +="</li>";
					strHtml +="<li style='overflow: hidden;font-size:13px;padding: 5px 0;padding-left:33px;border-bottom: 1px solid #ddd;zoom: 1;'>";
					strHtml +="<span style='margin-top:7px;display: inline-block;'>C</span>";
					strHtml +="<dl style='float: right;overflow: hidden;padding: 3px 0 3px 50px;width: 520px;zoom: 1;'>";
					strHtml +="<dt style='float: left;display: inline;margin-left: -50px;padding: 3px 5px;white-space: nowrap;font-weight: 700;}'>重庆</dt>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>重庆</dd>";
					strHtml +="</dl>";
					strHtml +="</li>";
					strHtml +="<li style='overflow: hidden;font-size:13px;padding: 5px 0;padding-left:33px;border-bottom: 1px solid #ddd;zoom: 1;'>";
					strHtml +="<span style='margin-top:7px;display: inline-block;'>F</span>";
					strHtml +="<dl style='float: right;overflow: hidden;padding: 3px 0 3px 50px;width: 520px;zoom: 1;'>";
					strHtml +="<dt style='float: left;display: inline;margin-left: -50px;padding: 3px 5px;white-space: nowrap;font-weight: 700;}'>福建</dt>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>福州</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>厦门</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>莆田</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>三明</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>亳州</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>漳州</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>龙岩</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>宁德</dd>";
					strHtml +="</dl>";
					strHtml +="</li>";
					strHtml +="<li style='overflow: hidden;font-size:13px;padding: 5px 0;padding-left:33px;border-bottom: 1px solid #ddd;zoom: 1;'>";
					strHtml +="<span style='margin-top:7px;display: inline-block;'>G</span>";
					strHtml +="<dl style='float: right;overflow: hidden;padding: 3px 0 3px 50px;width: 520px;zoom: 1;'>";
					strHtml +="<dt style='float: left;display: inline;margin-left: -50px;padding: 3px 5px;white-space: nowrap;font-weight: 700;}'>贵州</dt>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>贵阳</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>六盘</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>水遵</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'> 义安</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'> 顺铜</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>仁毕</dd>";
					strHtml +="</dl>";
					strHtml +="</li>";
					strHtml +="<li style='overflow: hidden;font-size:13px;padding: 5px 0;padding-left:33px;border-bottom: 1px solid #ddd;zoom: 1;'>";
					strHtml +="<span style='margin-top:7px;display: inline-block;'>H</span>";
					strHtml +="<dl style='float: right;overflow: hidden;padding: 3px 0 3px 50px;width: 520px;zoom: 1;'>";
					strHtml +="<dt style='float: left;display: inline;margin-left: -50px;padding: 3px 5px;white-space: nowrap;font-weight: 700;}'>湖北</dt>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>武汉</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>黄石</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>巢湖</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>六安</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>亳州</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>池州</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>宣城</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>合肥</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>池州</dd>";
					strHtml +="</dl>";
					strHtml +="</li>";
					strHtml +="<li style='overflow: hidden;font-size:13px;padding: 5px 0;padding-left:33px;border-bottom: 1px solid #ddd;zoom: 1;'>";
					strHtml +="<span style='margin-top:7px;display: inline-block;'>J</span>";
					strHtml +="<dl style='float: right;overflow: hidden;padding: 3px 0 3px 50px;width: 520px;zoom: 1;'>";
					strHtml +="<dt style='float: left;display: inline;margin-left: -50px;padding: 3px 5px;white-space: nowrap;font-weight: 700;}'>江西</dt>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>南昌</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>景德镇</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>巢湖</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>六安</dd>";
					strHtml +="</dl>";
					strHtml +="</li>";
					strHtml +="<li style='overflow: hidden;font-size:13px;padding: 5px 0;padding-left:33px;border-bottom: 1px solid #ddd;zoom: 1;'>";
					strHtml +="<span style='margin-top:7px;display: inline-block;'>X</span>";
					strHtml +="<dl style='float: right;overflow: hidden;padding: 3px 0 3px 50px;width: 520px;zoom: 1;'>";
					strHtml +="<dt style='float: left;display: inline;margin-left: -50px;padding: 3px 5px;white-space: nowrap;font-weight: 700;}'>西藏</dt>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>拉萨</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>黄石</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>巢湖</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>六安</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>亳州</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>林芝</dd>";
					strHtml +="</dl>";
					strHtml +="</li>";
					strHtml +="<li style='overflow: hidden;font-size:13px;padding: 5px 0;padding-left:33px;border-bottom: 1px solid #ddd;zoom: 1;'>";
					strHtml +="<span style='margin-top:7px;display: inline-block;'>Y</span>";
					strHtml +="<dl style='float: right;overflow: hidden;padding: 3px 0 3px 50px;width: 520px;zoom: 1;'>";
					strHtml +="<dt style='float: left;display: inline;margin-left: -50px;padding: 3px 5px;white-space: nowrap;font-weight: 700;}'>云南</dt>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>昆明</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>黄石</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>巢湖</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>六安</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>亳州</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>池州</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>宣城</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>合肥</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>池州</dd>";
					strHtml +="<dd style='float: left;margin-top:4px;display: inline;margin-right: 10px;white-space: nowrap;'>普洱</dd>";
					strHtml +="</dl>";
					strHtml +="</li>";
					strHtml += "</ul>";
					strHtml += "</div>";
					centerDiv.innerHTML = strHtml;
				this.ok = function(){
					bgDiv.parentNode.removeChild(bgDiv);
					centerDiv.parentNode.removeChild(centerDiv);
				}
				document.getElementById("okBtn").focus();
				
			}
		    
		    
		
$("#che").onmouseover=function(){
	$("#che1").style.display="block";
	$("#che1").style.left=$("#che").offsetLeft+"px";
}
$("#che").onmouseout=function(){
	$("#che1").style.display="";
}
$("#che1").onmouseover=function(){
	$("#che1").style.display="block";
}
$("#che1").onmouseout=function(){
	$("#che1").style.display="";
}


$("#hd").onmouseover=function(){
	$("#hd1").style.display="block";
	$("#hd1").style.left=$("#hd").offsetLeft+"px";
}
$("#hd").onmouseout=function(){
	$("#hd1").style.display="";
}
$("#hd1").onmouseover=function(){
	$("#hd1").style.display="block";
}
$("#hd1").onmouseout=function(){
	$("#hd1").style.display="";
}



		    
		    
        	var num = 0;   
			var index;    
			var a = document.getElementById("title").getElementsByTagName("a");
			var div = document.getElementById("article").getElementsByTagName("img");
			var parent = document.getElementById("lun");
			var left = document.getElementById("left");
			var right = document.getElementById("right");
			
			var timer = setInterval(autoMove,2000);
			function autoMove(){
				index = num+1;
				if(index==div.length){index=0;} 
				move();			
			}
			
			for(var i=0;i<div.length;i++){
				a[i].index = i;				
				a[i].onmouseover = move;   
			}
			
			function move(){
				a[num].className = "";
				a[this.index].className = "pointShow";
				div[num].className = "";
				div[this.index].className = "show";
				num = this.index;
			}
			
			parent.onmouseover = function(){
				clearInterval(timer);
			}
			parent.onmouseout = function(){
				timer = setInterval(autoMove,1000)
			}

			left.onclick = function(){
				index = num-1;
				if(index<0){index=div.length-1}
				move();
			}
			right.onclick = autoMove;
			
//          侧边栏开始
             var yi1=document.getElementById("yi1");
			var tu2 =document.getElementById("tu2");
			yi1.onmouseover=function(){
			    tu2.style.display="block";	
			}
			tu2.onmouseover=function(){
			   tu2.style.display="block"
			}
			yi1.onmouseout=function(){
			
			tu2.style.display="none";	
			}
			tu2.onmouseout=function(){
				tu2.style.display="none"
			}
//          回到顶部开始

				var timer=null;
				 function hui(){
					clearInterval(timer);
					timer=setInterval(function(){
						var oSt = document.documentElement.scrollTop || document.body.scrollTop;
						var speed=Math.floor(-oSt/6);
						
						if(document.body.scrollTop){
							document.body.scrollTop = oSt+speed;
						}else{
							document.documentElement.scrollTop = oSt+speed;
						}
						
						if (oSt==0) {
							clearInterval(timer);
						}
					},30);
				}
//			yundong开始
            var chao=document.getElementById("chao").getElementsByTagName("img")
            for(var i = 0; i < div.length; i++) {
				chao[i].timer;
				chao[i].onmouseover = function() {
					var n = this;
					move1(n, {
						width: 220,
						height: 140,
						opacity: 80,
					});
				};
				chao[i].onmouseout = function() {
					var n = this;
					move1(n, {
						width: 200,
						height: 120,
						opacity: 100,
					})
				}

			}
            function move1(obj, json, fn) {
				clearInterval(obj.timer);
				obj.timer = setInterval(function() {
					var flag = true;
					for(var attr in json) {
						if(attr === "opacity") {
							var icur = parseFloat(getStyle(obj, attr)) * 100;
						} else {
							var icur = parseInt(getStyle(obj, attr));
						}
						var speed = (json[attr] - icur) / 10;
						speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

						if(icur != json[attr]) {
							flag = false;
						}
						if(attr === "opacity") {
							obj.style.opacity = (icur + speed) / 100;
							obj.style.filter = "alpha(opacity:" + (icur + speed) + ")";
						} else {
							obj.style[attr] = icur + speed + "px";
						}
					}
					if(flag) {
						clearInterval(obj.timer);
						if(fn) {
							fn();
						}
					}
				}, 30)
			}

			function getStyle(obj, attr) {
				if(obj.currentStyle) {
					return obj.currentStyle[attr];
				} else {
					return getComputedStyle(obj, false)[attr];
				}
			}
          