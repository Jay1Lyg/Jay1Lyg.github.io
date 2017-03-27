

apiready = function() {
	//alert(JSON.stringify(api.pageParam)) //{"type":1}
	var new_type = api.pageParam.type; //1-8  新闻类型字段
   $api.html($api.byId('name'),api.pageParam.name)
	var headerH = $api.offset($api.dom('header')).h
	//打开子窗口承载列表内容
	api.openFrame({
		name: 'listfram',
		url: './listfram.html',
		rect: {
			x: 0,
			y: headerH,
			w: 'auto',
			h: api.winHeight - headerH
		},
		//将本页面接受的参数传给frame
		pageParam: {
			type: new_type
		},
		bounces: true,
		bgColor: 'rgba(0,0,0,0)',
		vScrollBarEnabled: true,
		hScrollBarEnabled: false
	});
};