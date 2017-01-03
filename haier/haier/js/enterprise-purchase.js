var a1=$("#a1");
var a2=$("#a2");
var a3=$("#a3");
var a4=$("#a4");
var bbspan1=$("#bbspan1");
var bbspan2=$("#bbspan2");
var bbspan3=$("#bbspan3");
var bbspan4=$("#bbspan4");
var bbspan5=$("#bbspan5");
a1.onmouseover=function(){
	bbspan1.style.display="block";
}
a1.onmouseout=function(){
	bbspan1.style.display="none";
}
bbspan1.onmouseover=function(){
	bbspan1.style.display="block";
}
bbspan1.onmouseout=function(){
	bbspan1.style.display="none";
}
a2.onmouseover=function(){
	bbspan2.style.display="block";
}
a2.onmouseout=function(){
	bbspan2.style.display="none";
}
bbspan2.onmouseover=function(){
	bbspan2.style.display="block";
}
bbspan2.onmouseout=function(){
	bbspan2.style.display="none";
}
a3.onmouseover=function(){
	bbspan3.style.display="block";
}
a3.onmouseout=function(){
	bbspan3.style.display="none";
}
bbspan3.onmouseover=function(){
	bbspan3.style.display="block";
}
bbspan3.onmouseout=function(){
	bbspan3.style.display="none";
}
a4.onmouseover=function(){
	bbspan4.style.display="block";
}
a4.onmouseout=function(){
	bbspan4.style.display="none";
}
bbspan4.onmouseover=function(){
	bbspan4.style.display="block";
}
bbspan4.onmouseout=function(){
	bbspan4.style.display="none";
}


//看不清换图片
var kanbuqing=$("#kanbuqing");
var yanzheng=$("#yanzheng");
var b=0;
kanbuqing.onclick=function(){
	switch(b){
					case 0:
						yanzheng.src = "img-enterprise-purchase/vCode1.jpg";
						b++;
					break;
					case 1:
						yanzheng.src = "img-enterprise-purchase/vCode2.jpg";
						b++;
					break;
					case 2:
						yanzheng.src = "img-enterprise-purchase/vCode3.jpg";
						b++;
					break;
					case 3:
						yanzheng.src = "img-enterprise-purchase/vCode4.jpg";
						b++;
					break;
					case 4:
						yanzheng.src = "img-enterprise-purchase/vCode5.jpg";
						b++;
					break;
					default:
						yanzheng.src = "img-enterprise-purchase/vCode1.jpg";
						b = 0;		
	}
}					


//所在省份\所在城市
//var sheng=$("#sheng").value;
//var shi=$("#shi").value;
//if(sheng==="1"){
//	shi="1";
//}





