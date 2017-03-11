//配送地
var peisongdi=$(".peisongdi")[0];
var selectcity=$("#selectcity");
peisongdi.onmouseover=function(){
	selectcity.style.display="block";
}
peisongdi.onmouseout=function(){
	selectcity.style.display="none";
}

selectcity.onmousemove=function(){
	selectcity.style.display="block";
}
selectcity.onmouseout=function(){
	selectcity.style.display="none";
}
//我要买
var spanjian=$(".spanjian")[0];
var spanjia=$(".spanjia")[0];
var am=$("#am");
spanjia.onclick=function(){
	var value=parseInt(am.value);
	value+=1;
	am.value=value;
	
}
spanjian.onclick=function(){
	var value=parseInt(am.value);
	if(value>1){
					value-=1;
				}
				am.value=value;
	
}




//商品介绍
var spHead =$("#sphead1").children;
var changebox =$(".changebox");
for(var i=0;i<spHead.length;i++){
	spHead[i].index = i;
	spHead[i].onclick = function(){
		for(var j=0;j<spHead.length;j++){
			spHead[j].className = spHead[j].className.replace("navShow","");
			changebox[j].className = changebox[j].className.replace(" show11","");
		}
		changebox[this.index].className += " show11";
		spHead[this.index].className += " navShow";
	}
}


//var sphead1=document.getElementById("sphead1");
//var offon = true;
//$(window).scroll(function() {
//	if(offon) {
//		var _top = $(window).scrollTop();
//		console.log(_top);
//		if(_top > 900) {
//			$('#sphead1').show();
//		} else {
//			$('#sphead1').hide();
//		}
//	}
//})





//规格参数-全部咨询
var lis =$("#navShow").children;
for(var i=0;i<lis.length;i++){
	lis[i].onclick = function(){
		for(var j=0;j<lis.length;j++){
			lis[j].className = "";
		}
		this.className = "navShow";
		document.body.scrollTop=this.offsetTop;
		
	}
}

//var sheng =$("#sheng").value;
//var shi =$("#shi").value;
//var xian =$("#xian").value;
//var peisongdi =$(".peisongdi");
//peisongdi.innerHTML="sheng+shi+xian";


var b2=$("#b2");
var b1=$("#b1");
var thumbboxul=$("#thumbboxul");
b2.onclick=function(){
	thumbboxul.style.left="-360px";
}
b1.onclick=function(){
	thumbboxul.style.left="35px";
}



//导航条固定
var spHead1 =$("#sphead1");
function ding(){
        setInterval(function(){
           	if(scrollY>1500){
           		spHead1.style.position="fixed";
           		spHead1.style.top="0px";
           		spHead1.style.marginLeft="210px";
           	}else{
           		spHead1.style.position="";
           		spHead1.style.top="";
           	}
           	
        },50)
           	}
ding();