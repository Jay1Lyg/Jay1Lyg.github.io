apiready = function() {
	var news_id = api.pageParam.news_id;
	var new_type = api.pageParam.new_type;

	var headerH = $api.offset($api.dom('header')).h
	api.openFrame({
		name: 'contentfram',
		url: './contentfram.html',
		rect: {
			x: 0,
			y: headerH,
			w: 'auto',
			h: api.winHeight - headerH
		},
		pageParam: {
			news_id: news_id,
			new_type:new_type
		},
		bounces: true,
		bgColor: 'rgba(0,0,0,0)',
		vScrollBarEnabled: true,
		hScrollBarEnabled: false
	});
};