var new_type;
apiready = function(){
//	api.showProgress({
//	    style: 'default',
//	    animationType: 'fade',
//	    title: '努力加载中...',
//	    text: '先喝杯茶...',
//	    modal: false
//	});
	 new_type = api.pageParam.type; //1-8  新闻类型字段
	var base_url = "http://api.dagoogle.cn/news/get-news";
	api.ajax({
	    url: base_url + "?tableNum=" + new_type,
	    method: 'get'
	}, function(ret, err) {
	    if (ret) {
	    	//ret -> {"data":[]}
	    	var tml=$api.byId('new-tml').text;
	    	var  tmlFn=doT.template(tml);
	    	$api.html($api.byId('news'),tmlFn(ret.data))
	    	
	    	var arr=[];
	    	function loadImage(index){
	    		if(ret.data[i].top_image){
	    			var image=new Image();
	    			image.src=ret.data[index].top_image;
	    			image.onload=function(){
	    				if(index<(ret.data.length-1)){
	    					index++;
	    					loadImage(index)
	    				}
	    				api.hideProgress()
	    			}
	    		}else{
    				index++;
    				loadImage(index)
	    		}
	    		
	    	}
//	    	for(var i=0;i<ret.data.length;i++){
//	    		
//	    		arr.push()
//	    	}
	    	
//	    	api.showProgress();
//	        api.alert({ msg: JSON.stringify(ret) });
	    } else {
	    	api.toast({
			    msg: err.statusCode+"页面不存在",
			    duration: 2000,
			    location: 'bottom'
			});
	    	api.showProgress();
//	        api.alert({ msg: JSON.stringify(err) });
	    }
	});
};
function openContent(id){
	api.openWin({
	    name: 'newsContent',
	    url: 'newsContent.html',
	    pageParam: {
	        news_id: id,
	        new_type:new_type
	    }
	});
}
