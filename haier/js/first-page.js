window.alert = function(str){
				var bgDiv = document.createElement("div");
					bgDiv.id = "bgDiv";
					bgDiv.style.position = "absolute";
					bgDiv.style.left = "0px";
					bgDiv.style.top = "0px";
					bgDiv.style.width = "100%";
//				var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
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
					
//					strHtml += "<div style='background:red;height:350px;margin-top:40px'>";
//					strHtml += "<li style='height:100px;line-height:100px;text-align:center;'>"+str+"</li>";
					strHtml += "<button id='okBtn' onclick='ok()' style='position:absolute;top:420px;left:280px;width:100px;height:30px;background:skyblue;'>确定</button>";
//					strHtml += "</div>";
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


//微信二维码
	var naver1=document.getElementById("naver1");
	var saoma1=document.getElementById("saoma1");
	var naver2=document.getElementById("naver2");
	var saoma2=document.getElementById("saoma2");
	naver1.onmouseover=function (){
		saoma1.style.display="block";
	}
	naver1.onmouseout=function (){
		saoma1.style.display="none";
	}
	saoma1.onmouseover=function (){
		saoma1.style.display="block";
	}
	saoma1.onmouseout=function (){
		saoma1.style.display="none";
	}
	
	naver2.onmouseover=function (){
		saoma2.style.display="block";
	}
	naver2.onmouseout=function (){
		saoma2.style.display="none";
	}
	saoma2.onmouseover=function (){
		saoma2.style.display="block";
	}
	saoma2.onmouseout=function (){
		saoma2.style.display="none";
	}
	

//左划
	var im=document.getElementsByClassName("zuohua1");
	for(var i=0;i<im.length;i++){
		im[i].index = i;
		im[i].onmouseover=function leftMove(){
		im[this.index].style.left="-5px";
	}
		im[i].onmouseout=function backMove(){
		im[this.index].style.left="0px";
	}
	}

var xpsfimg=document.getElementsByClassName("xpsfimg");
	for(var i=0;i<xpsfimg.length;i++){
		xpsfimg[i].index = i;
		xpsfimg[i].onmouseover=function leftMove(){
		xpsfimg[this.index].style.left="-5px";
	}
		xpsfimg[i].onmouseout=function backMove(){
		xpsfimg[this.index].style.left="0px";
	}
	}



var rmnav =$(".rmnav");
var changebox =$(".changebox");
for(var i=0;i<rmnav.length;i++){
	rmnav[i].index = i;
	rmnav[i].onmouseover = function(){
		for(var j=0;j<rmnav.length;j++){
			rmnav[j].className = rmnav[j].className.replace("navShow","");
			changebox[j].className = changebox[j].className.replace(" show11","");
		}
		changebox[this.index].className += " show11";
		rmnav[this.index].className += " navShow";
	}
}


//var p3 =$("#p3");
//var show1 =$(".show1");
//for(var i=0;i<show1.length;i++){
////	show1[i].index = i;
//show1[i].onmouseover=function(){
//	p3.style.display="block";
//}
//show1[i].onmouseout=function(){
//	p3.style.display="none";
//}
//}