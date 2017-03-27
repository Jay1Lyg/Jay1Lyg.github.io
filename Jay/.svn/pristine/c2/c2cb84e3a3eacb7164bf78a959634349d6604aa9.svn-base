apiready = function(){
	var header = $api.dom('header');
	var headerH = $api.offset(header).h;
	api.openFrame({
	    name: 'loginframe',
	    url: './loginframe.html',
	    rect: {
	        x: 0,
	        y: headerH,
	        w: 'auto',
	        h: api.winHeight - headerH
	    },
	    bounces: true,
	    bgColor: 'rgba(0,0,0,0)',
	    vScrollBarEnabled: true,
	    hScrollBarEnabled: false
	});
}