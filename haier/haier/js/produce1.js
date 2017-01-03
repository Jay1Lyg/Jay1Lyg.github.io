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
 



var hua=document.getElementById("hua");
			var fen=document.getElementById("fenlei");
			hua.onmouseover=function(){
			
			fen.style.display="block";	
				fen.style.left = hua.offsetLeft+"px";
			}
			fen.onmouseover=function(){
				fen.style.display="block"
			}
			hua.onmouseout=function(){
			
			fen.style.display="none";	
			}
			fen.onmouseout=function(){
				fen.style.display="none"
			}
//			商品分类结束
			var gou=document.getElementById("gou");
			var gouxia =document.getElementById("gouxia");
			gou.onmouseover=function(){
			    gouxia.style.display="block";	
			    gouxia.style.left = gou.offsetLeft+"px";
			}
			gouxia.onmouseover=function(){
			   gouxia.style.display="block"
			}
			gou.onmouseout=function(){
			
			gouxia.style.display="none";	
			}
			gouxia.onmouseout=function(){
				gouxia.style.display="none"
			}


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
		
		      var we=document.getElementById("we");
		      var weixin=document.getElementById("weixin");
		      we.onmouseover=function(){
		      	weixin.style.display="block"
		      }
		      we.onmouseout=function(){
		      	weixin.style.display="";
		      }
		      weixin.onmouseover=function(){
		      	weixin.style.display=""
		      }
		      weixin.onmouseout=function(){
		      	weixin.style.display="block";
		      }
		       var ap=document.getElementById("ap");
		      var app=document.getElementById("app");
		      ap.onmouseover=function(){
		      	app.style.display="block"
		      }
		      ap.onmouseout=function(){
		      	app.style.display="";
		      }
		      app.onmouseover=function(){
		      	app.style.display=""
		      }
		      app.onmouseout=function(){
		      	app.style.display="block";
		      }
            
            var dian1=document.getElementById("dian1");
            var dian2=document.getElementById("dian2");
            var dian3=document.getElementById("dian3");
            var dian4=document.getElementById("dian4");
            var san=document.getElementById("san");
            var san1=document.getElementById("san1");
            var san2=document.getElementById("san2");
            var san3=document.getElementById("san3");
            
            dian1.onclick=function(){
            	dian1.style.background="white";
            	dian1.style.color="black";
            	dian2.style.background="";
            	dian2.style.color="";
            	dian3.style.background="";
            	dian3.style.color="";
            	dian4.style.background="";
            	dian4.style.color="";
            	
            	san.style.display="block";
            	san1.style.display="none";
            	san2.style.display="none";
            	san3.style.display="none";
            }
            dian2.onclick=function(){
            	dian2.style.background="white";
            	dian2.style.color="black";
            	dian1.style.background="#999999";
            	dian1.style.color="white";
            	dian3.style.background="";
            	dian3.style.color="";
            	dian4.style.background="";
            	dian4.style.color="";
            	san.style.display="none";
            	san1.style.display="block";
            	san2.style.display="none";
            	san3.style.display="none";
            }
            dian3.onclick=function(){
            	dian3.style.background="white";
            	dian3.style.color="black";
            	dian1.style.background="#999999";
            	dian1.style.color="white";
            	dian2.style.background="";
            	dian2.style.color="";
            	dian4.style.background="";
            	dian4.style.color="";
            	
            	san.style.display="none";
            	san1.style.display="none";
            	san2.style.display="block";
            	san3.style.display="none";
            }
            dian4.onclick=function(){
            	dian4.style.background="white";
            	dian4.style.color="black";
            	dian1.style.background="#999999";
            	dian1.style.color="white";
            	dian2.style.background="";
            	dian2.style.color="";
            	dian3.style.background="";
            	dian3.style.color="";
            	
            	san.style.display="none";
            	san1.style.display="none";
            	san2.style.display="none";
            	san3.style.display="block";
            }
            console.log(scrollY)
           function ding(){
           	setInterval(function(){
           		
           	if(scrollY>900){
           		
           		$(".yi")[0].style.position="fixed";
           		$(".yi")[0].style.top="0px";
           	}else{
           		$(".yi")[0].style.position="";
           		$(".yi")[0].style.top="";
           	}
           	
           	},50)
           }
           ding()
            
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
			