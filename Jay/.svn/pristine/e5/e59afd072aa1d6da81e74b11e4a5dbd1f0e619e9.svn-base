apiready = function(){
		//创建美洽
var mq = api.require('meiQia');
//配置初始化美洽需要的appkey
var param = {
    appkey: "661c70ddc118eead2e626feccca5ffdd"
};
//初始化美洽
mq.initMeiQia(param, function(ret, err) {
    if (ret) {
        //初始化成功
//      alert(JSON.stringify(ret));
    } else {
        //初始化失败
        alert(JSON.stringify(err));
    }
})

var titleColor = {
    color: "#ffffff"
};
mq.setTitleColor(titleColor);
var titleBarColor = {
    color: "#00ff00"
};
mq.setTitleBarColor(titleBarColor);

mq.show()
}