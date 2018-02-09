/*
*
*
*   通过auth_code获取authorizer_access_token和authorizer_refresh_token
*
*
*
*
*/
var keystone = require('keystone');
var fs = require('fs');
var util = require('../../query/util/util.js');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/DSF_info.json', 'utf-8'));

//获取authorizer_access_tocken和authorizer_refresh_token
function getAuthToken (authorization_code, component_access_token, callback){
	var url = 'https://api.weixin.qq.com/cgi-bin/component/api_query_auth?component_access_token='+component_access_token;
	var data = {
		"component_appid": info.AppID,
		"authorization_code": authorization_code
	};
	util.sendPostRequest(url, data, function (err1, ret1){
		if(err1){
			callback(err1, null);
		}else{
			console.log('请求得到的授权方信息：');
			console.log(ret1);
			callback(null, ret1);
		}
	});
}
module.exports = {
	getAuthToken: getAuthToken
}