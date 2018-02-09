
	//height=此div距离最顶部的距离  ele=当前元素最外的div
	function fixeed(ele,ele1,height,top,top1){
	
		window.onscroll = function(){ 	
			 var t = document.documentElement.scrollTop || document.body.scrollTop;  //获取距离页面顶部的距离
			 console.log(t);
			 if( t >height) { //当距离顶部超过200px时 
			  
			   $(ele).css({"position":"fixed","z-index":96,"top":top});
			   $(ele1).css({"position":"fixed","z-index":96,"top":top1});
			 };
			 if(t<height){
			 	 $(ele).css({"position":"","z-index":96,"top":top});
			 	 $(ele1).css({"position":"","z-index":96,"top":top1});
			 };

		} 
	}
	fixeed(".tabUp",".tabDown",500,0,44);
	// fixeed(".tabDown",500,44);
	

