/**
*        向微信服务端发送post请求，响应得到想要的数据
*
*/
var keystone = require('keystone');
var request = require('request');
var request1 = require('request-json');

/*
*    向微信服务端发送post请求
*    parm@url 向微信服务端请求的地址
*    parm@post_info 请求的post数据
*    
*
*/
function sendPostRequest (url, post_info, callback){
	var client = request1.createClient(url);
	client.post('', post_info, function (err, ret, body){
		if(err){
			callback(err, null);
		}else{
			callback(null, body);
		}
	});
}
/*
*
*  通过get方式获取微信服务器的信息
*
*/
function sendGetRequest ( url, callback){
	request.get({
		url: url
	},
	function (err, res, body){
		if(err){
			callback(err, null, null);
		}else{
			if(res.statusCode == 200){
				callback(null, res, body);
			}
		}
	});
}

module.exports = {
	sendPostRequest: sendPostRequest,
	sendGetRequest: sendGetRequest
}