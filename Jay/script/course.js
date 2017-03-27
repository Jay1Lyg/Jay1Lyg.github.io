function openNewslist(tableNum,name){
	api.openWin({
    name: 'newsList',
    url: './newsList.html',
    //传参数
    pageParam: {
        type: tableNum,
        name:name
    }
});
}
