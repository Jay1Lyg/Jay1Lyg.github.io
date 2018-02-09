/**
*
*
*
*
*
*   获取pre_auth_code
*
*
*
*
*
*
**/
var keystone = require('keystone');
var fs = require('fs');
var util = require('../../query/util/util.js');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/DSF_info.json', 'utf-8'));

//获取预授权码
function getPreAuthCode (component_access_token, callback){
	var url = 'https://api.weixin.qq.com/cgi-bin/component/api_create_preauthcode?component_access_token='+component_access_token;
	var data = {
		'component_appid': info.AppID
	};
	util.sendPostRequest(url, data, function (err1, ret1){
		if(err1){
			callback(err1, null);
		}else{
			console.log('请求得到的pre_auth_code：');
			console.log(ret1);
			callback(null, ret1);
		}
	});
}

module.exports = {
	getPreAuthCode: getPreAuthCode
}