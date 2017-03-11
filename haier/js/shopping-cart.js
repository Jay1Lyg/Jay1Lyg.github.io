//微信二维码
	var naver2=document.getElementById("naver1");
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



//弹出框
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



//var delete=$(".delete");
//delete.onclick=function(){
	window.alert1 = function(str){
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
						bgDiv.style.background = "rgba(0,0,0,.7)";
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
					centerDiv.style.marginLeft = "-180px";
					centerDiv.style.marginTop = "-70px";
					centerDiv.style.width = "360px";
					centerDiv.style.height = "140px";
					centerDiv.style.background = "#fff";
					centerDiv.style.zIndex = "300";
					centerDiv.style.borderRadius = "3px";
				var strHtml = "<ul style='list-style:none;margin:0;padding:0;width:100%;'>";
					strHtml += "<li style='background:#005aaa;text-align:left;padding-left:20px;font-size:16px;font-weight:bold;height:35px;line-height:35px;color:white;'>提示</li>"
					strHtml += "<li style='height:70px;line-height:70px;text-align:left;padding-left:20px;font-size:12px;'>"+str+"</li>";
					strHtml += "<li><button id='okBtn1' onclick='ok1()' style='background:#005aaa;border:none;padding:5px;color:white;margin-left:120px;'>确定</button><button id='okBtn2' onclick='ok2()' style='background:#005aaa;border:none;padding:5px;color:white;margin-left:36px;'>取消</button></li>";
					strHtml += "</ul>";
					centerDiv.innerHTML = strHtml;
				document.body.appendChild(centerDiv);
				var product1=$("#product1");
				this.ok1 = function(){
					bgDiv.parentNode.removeChild(bgDiv);
					centerDiv.parentNode.removeChild(centerDiv);
					product1.style.display="none";
				}
				this.ok2 = function(){
					bgDiv.parentNode.removeChild(bgDiv);
					centerDiv.parentNode.removeChild(centerDiv);
				}
				document.getElementById("okBtn2").focus();
				
			}
//}

window.alert2 = function(str){
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
						bgDiv.style.background = "rgba(0,0,0,.7)";
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
					centerDiv.style.marginLeft = "-180px";
					centerDiv.style.marginTop = "-70px";
					centerDiv.style.width = "360px";
					centerDiv.style.height = "140px";
					centerDiv.style.background = "#fff";
					centerDiv.style.zIndex = "300";
					centerDiv.style.borderRadius = "3px";
				var strHtml = "<ul style='list-style:none;margin:0;padding:0;width:100%;'>";
					strHtml += "<li style='background:#005aaa;text-align:left;padding-left:20px;font-size:16px;font-weight:bold;height:35px;line-height:35px;color:white;'>提示</li>"
					strHtml += "<li style='height:70px;line-height:70px;text-align:left;padding-left:20px;font-size:12px;'>"+str+"</li>";
					strHtml += "<li><button id='okBtn1' onclick='ok1()' style='background:#005aaa;border:none;padding:5px;color:white;margin-left:120px;'>确定</button><button id='okBtn2' onclick='ok2()' style='background:#005aaa;border:none;padding:5px;color:white;margin-left:36px;'>取消</button></li>";
					strHtml += "</ul>";
					centerDiv.innerHTML = strHtml;
				document.body.appendChild(centerDiv);
				var product2=$("#product2");
				this.ok1 = function(){
					bgDiv.parentNode.removeChild(bgDiv);
					centerDiv.parentNode.removeChild(centerDiv);
					product2.style.display="none";
				}
				this.ok2 = function(){
					bgDiv.parentNode.removeChild(bgDiv);
					centerDiv.parentNode.removeChild(centerDiv);
				}
				document.getElementById("okBtn2").focus();
				
			}

window.alert3 = function(str){
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
						bgDiv.style.background = "rgba(0,0,0,.7)";
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
					centerDiv.style.marginLeft = "-180px";
					centerDiv.style.marginTop = "-70px";
					centerDiv.style.width = "360px";
					centerDiv.style.height = "140px";
					centerDiv.style.background = "#fff";
					centerDiv.style.zIndex = "300";
					centerDiv.style.borderRadius = "3px";
				var strHtml = "<ul style='list-style:none;margin:0;padding:0;width:100%;'>";
					strHtml += "<li style='background:#005aaa;text-align:left;padding-left:20px;font-size:16px;font-weight:bold;height:35px;line-height:35px;color:white;'>提示</li>"
					strHtml += "<li style='height:70px;line-height:70px;text-align:left;padding-left:20px;font-size:12px;'>"+str+"</li>";
					strHtml += "<li><button id='okBtn1' onclick='ok1()' style='background:#005aaa;border:none;padding:5px;color:white;margin-left:120px;'>确定</button><button id='okBtn2' onclick='ok2()' style='background:#005aaa;border:none;padding:5px;color:white;margin-left:36px;'>取消</button></li>";
					strHtml += "</ul>";
					centerDiv.innerHTML = strHtml;
				document.body.appendChild(centerDiv);
				var product3=$("#product3");
				this.ok1 = function(){
					bgDiv.parentNode.removeChild(bgDiv);
					centerDiv.parentNode.removeChild(centerDiv);
					product3.style.display="none";
				}
				this.ok2 = function(){
					bgDiv.parentNode.removeChild(bgDiv);
					centerDiv.parentNode.removeChild(centerDiv);
				}
				document.getElementById("okBtn2").focus();
				
			}


var tijiaodingdan=$("#tijiaodingdan");
var outbox1=$(".outbox1");
tijiaodingdan.onclick=function(){
	document.body.scrollTop=outbox1.offsetTop;
}


function checkForm(){
	if(aa()&&bb()&&dd()&&ee()){
		return true;
	}else{
		return false;
	}
}
function aa(){
	var username=document.getElementById("username").value;
	var usernametishi=document.getElementById("usernametishi");
	if(username===""){
			usernametishi.innerHTML="请填写收货人姓名！";
			return false;
	}else {
			usernametishi.innerHTML="<img src='../haier/img-shopping-cart/true.png'>";
			return true;
		}
}

function bb(){
	var shouji=document.getElementById("shouji").value;
	var guhua=document.getElementById("guhua").value;
	var dianhuatishi=document.getElementById("dianhuatishi");
	var regexp1=/^0\d{2,3}-?\d{7,8}$/;//区号
	var regexp2=/^(\+86)?-?\s*1[34578]\d{9}$/;//电话
	if(shouji===""&&guhua===""){
			dianhuatishi.innerHTML="请至少填写一种电话联系方式！";
			return false;
	}else if(regexp1.test(guhua)||regexp2.test(shouji)){
		dianhuatishi.innerHTML="<img src='../haier/img-shopping-cart/true.png'>";
		return true;
		}else{
			dianhuatishi.innerHTML="请填写正确的电话号！";
			return false;
		}
}

function dd(){
	var dizhi=document.getElementById("dizhi").value;
	var dizhitishi=document.getElementById("dizhitishi");
	if(dizhi===""){
			dizhitishi.innerHTML="请填写收货地址！";
			return false;
	}else{
			dizhitishi.innerHTML="<img src='../haier/img-shopping-cart/true.png'>";
			return true;
	}
}






function ee(){
	var youzheng=document.getElementById("youzheng").value;
	var youzhengtishi=document.getElementById("youzhengtishi");
	var regexp=/^[0-9]{6}$/;
	if(youzheng===""){
			youzhengtishi.innerHTML="请填写邮政编码！";
			return false;
	}else if(regexp.test(youzheng)){
			youzhengtishi.innerHTML="<img src='../haier/img-shopping-cart/true.png'>";
		}else{
			youzhengtishi.innerHTML="请填写正确的邮政编码！";
		}
}






//优惠券
var process1=$("#youhui1");
var youhui2=$("#youhui2");
var youhui11=$("#youhui11");
youhui1.onclick=function(){
	youhui1.style.display="none";
	youhui11.style.display="block";
	youhui2.style.marginTop="0px";
	
	
}


var changebox1=$("#changebox1");
var changebox2=$("#changebox2");
var process1=$("#process1");
var process2=$("#process2");
var lijijiesuan=$("#lijijiesuan");

lijijiesuan.onclick=function(){
	changebox2.style.display="block";
	changebox1.style.display="none";
	process2.style.background="#26539c";
	process1.style.background="#a7b0b5";
}
//process2.onclick=function(){
//	changebox2.style.display="block";
//	changebox1.style.display="none";
//	process2.style.background="#26539c";
//	process1.style.background="#a7b0b5";
//	
//}


//var spanjian=$(".spanjian")[0];
//var spanjia=$(".spanjia")[0];
//var am=$("#am");
//var xiaoji=$("#xiaoji");
//var xiaoji1=$("#xiaoji1");
//var xiaoji2=$("#xiaoji2");
//var dingdanall=$("#dingdanall");
//var shangpinall=$("#shangpinall");
//spanjia.onclick=function(){
//	var value=parseInt(am.value);
//	value+=1;
//	am.value=value;
//	xiaoji.innerHTML="￥"+value*1000;
//	
//}
//spanjian.onclick=function(){
//	var value=parseInt(am.value);
//	if(value>1){
//					value-=1;
//				xiaoji.innerHTML="￥"+value*1000;
//				}
//				am.value=value;
//	
//}
//
//
//
//
//var spanjian1=$(".spanjian1")[0];
//var spanjia1=$(".spanjia1")[0];
//var am1=$("#am1");
//var xiaoji1=$("#xiaoji1");
//spanjia1.onclick=function(){
//	var value=parseInt(am1.value);
//	value+=1;
//	am1.value=value;
//	xiaoji1.innerHTML="￥"+value*1000;
//}
//spanjian1.onclick=function(){
//	var value=parseInt(am1.value);
//	if(value>1){
//					value-=1;
//				xiaoji1.innerHTML="￥"+value*1000;
//				}
//				am1.value=value;
//}
//
//
//var spanjian2=$(".spanjian2")[0];
//var spanjia2=$(".spanjia2")[0];
//var am2=$("#am2");
//var xiaoji2=$("#xiaoji2");
//
//spanjia2.onclick=function(){
//	var value=parseInt(am2.value);
//	value+=1;
//	am2.value=value;
//	xiaoji2.innerHTML="￥"+value*1000;
//}
//spanjian2.onclick=function(){
//	var value=parseInt(am2.value);
//	if(value>1){
//					value-=1;
//					xiaoji2.innerHTML="￥"+value*1000;
//				}
//				am2.value=value;
//}


//function all(){
//	dingdanall.innerHTML="￥"+(parseInt(xiaoji.innerHTML.substring(1)) +
//	parseInt(xiaoji1.innerHTML.substring(1))+
//	parseInt(xiaoji2.innerHTML.substring(1))).toString();
//}
//all()

$("#checkbox").onclick = function(){
		$("#checkbox1").checked = "checked";
		$("#checkbox2").checked = "checked";
		$("#checkbox3").checked = "checked";
	}
	$("#nocheckbox").onclick = function(){
		$("#checkbox1").checked = "";
		$("#checkbox2").checked = "";
		$("#checkbox3").checked = "";
		$("#checkbox").checked = "";
	}


//购物车
	function sum(){
		console.log($("#sold1").innerHTML);
		setInterval(function(){
			
			
			var Num = $(".text");
			
//			for(var i=0;i<btn.length;i++){
//				btn[i].index = i;
//				btn[i]
//			}
//			
			
			
			
			
			
			var num =parseInt($("#text1").value);
			var num1 =parseInt($("#text2").value);
			var num2 =parseInt($("#text3").value);
			var btn = $("button");
			var spanjian=$(".spanjian")[0];
			var spanjia=$(".spanjia")[0];
			var spanjian1=$(".spanjian1")[0];
			var spanjia1=$(".spanjia1")[0];
			var spanjian2=$(".spanjian2")[0];
			var spanjia2=$(".spanjia2")[0];
			spanjian.onclick = function(){
				num-=1;
				if (num <= 0) {
					num=0;
				}
				console.log(num);
				$("#text1").value = num;
			}
			spanjia.onclick = function(){
				num++;
				$("#text1").value = num;
				console.log(num);
			}
			spanjian1.onclick = function(){
				num1-=1;
				if (num1 <= 0) {
					num1=0;
				}
				console.log(num1);
				$("#text2").value = num1;
			}
			spanjia1.onclick = function(){
				num1++;
				$("#text2").value = num1;
				console.log(num1);
			}
			spanjian2.onclick = function(){
				num2-=1;
				if (num2 <= 0) {
					num2=0;
				}
				console.log(num2);
				$("#text3").value = num2;
			}
			spanjia2.onclick = function(){
				num2++;
				$("#text3").value = num2;
				console.log(num2);
			}
			
			var dj1 = parseInt($("#dj1").innerHTML.split("¥")[1]);
			var dj2 = parseInt($("#dj2").innerHTML.split("¥")[1]);
			var dj3 = parseInt($("#dj3").innerHTML.split("¥")[1]);
			$("#sold1").innerHTML = "¥"+(dj1*num);
			$("#sold2").innerHTML = "¥"+(dj2*num1);
			$("#sold3").innerHTML = "¥"+(dj3*num2);
			
			
			var flag1 = $("#checkbox1").checked;
			var flag2 = $("#checkbox2").checked;
			var flag3 = $("#checkbox3").checked;
			var sold1 = parseInt($("#sold1").innerHTML.split("¥")[1]);
			var sold2 = parseInt($("#sold2").innerHTML.split("¥")[1]);
			var sold3 = parseInt($("#sold3").innerHTML.split("¥")[1]);
			if (flag1=== true && flag2 == false && flag3 ==false) {
				$("#sum").innerHTML = $("#sold1").innerHTML;
			}else if(flag1===false  && flag2 == true && flag3 ==false){
				$("#sum").innerHTML = $("#sold2").innerHTML;
			}else if(flag1===false  && flag2 ==false  && flag3 ==true){
				$("#sum").innerHTML = $("#sold3").innerHTML;
			}else if(flag1===true  && flag2 ==true  && flag3 ==true){
				$("#sum").innerHTML = "¥"+(sold1+sold2+sold3);
			}else if(flag1===true  && flag2 ==true  && flag3 ==false){
				$("#sum").innerHTML = "¥"+(sold1+sold2);
			}else if(flag1===true  && flag2 ==false  && flag3 ==true){
				$("#sum").innerHTML = "¥"+(sold1+sold3);
			}else if(flag1===false  && flag2 ==true  && flag3 ==true){
				$("#sum").innerHTML = "¥"+(sold2+sold3);
			}else{
				$("#sum").innerHTML = "";
			}
			
		},10);
	}
	
	
	sum();
	