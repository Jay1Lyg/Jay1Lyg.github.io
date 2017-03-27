apiready=function(){
	
	var UIScrollPicture = api.require('UIScrollPicture');
	UIScrollPicture.open({
	    rect: {
	        x: 0,
	        y: 0,
	        w: api.winWidth,
	        h: api.winHeight*23 / 75
	    },
	    data: {
	        paths: [
	            'widget://image/1..jpg',
	            'widget://image/2.jpg',
	            'widget://image/3.jpg',
	        ],
	        captions: ['html', 'css', 'mei']
	    },
	    styles: {
	        caption: {
	            height: 35,
	            color: '#E0FFFF',
	            size: 13,
	            bgColor: 'rgba(0,0,0,0.5)',
	            position: 'overlay'
	        },
	        indicator: {
	            align: 'center',
	            color: 'rgba(255,255,255,0.5)',
	            activeColor: '#072f76'
	        }
	    },
	    placeholderImg: 'widget://image/1..jgp',
	    contentMode: 'scaleToFill',
	    interval: 5,
	    fixedOn: api.frameName,
	    loop: true,
	    fixed: false
	}, function(ret, err) {
	    if (ret) {
//	        alert(JSON.stringify(ret));
	    } else {
//	        alert(JSON.stringify(err));
	    }
	});
	$api.css($api.dom('body'),'padding-top:'+(api.winHeight*23 / 73)+'px')
	
}