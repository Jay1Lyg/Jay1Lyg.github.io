/*
*
*获取（刷新）授权公众号或小程序的接口调用凭据（令牌）
*该API用于在授权方令牌（authorizer_access_token）失效时，可用刷新令牌（authorizer_refresh_token）获取新的令牌。
*请注意，此处t*oken是2小时刷新一次，开发者需要自行进行token的缓存，避免token的获取次数达到每日的限定额度。
*缓存方法可以参考：http://mp.weixin.qq.com/wiki/2/88b2bf1265a707c031e51f26ca5e6512.html
*
*/
var keystone = require('keystone');
var fs = require('fs');
var util = require('../../query/util/util.js');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/DSF_info.json', 'utf-8'));

/*
*
*   通过authorizer_refresh_token进行刷新authorizer_access_token
*	param@component_access_token 
*   param@authorizer_appid 授权方appids
*   param@authorizer_refresh_token 授权方接口调用凭据（在授权的公众号或小程序具备API权限时，才有此返回值），也简称为令牌
*/
function getRefreshToken (component_access_token, authorizer_appid, authorizer_refresh_token, callback){
	var url = 'https:// api.weixin.qq.com /cgi-bin/component/api_authorizer_token?component_access_token='+component_access_token;
	var data = {
		'component_appid': info.AppID,
		"authorizer_appid":authorizer_appid,
		"authorizer_refresh_token":authorizer_refresh_token
	};
	util.sendPostRequest(url, data, function (err1, ret1){
		if(err1){
			callback(err1, null);
		}else{
			console.log('请求得到的auth_access_token：');
			console.log(ret1);
			callback(null, ret1);
		}
	});
}

module.exports = {
	getRefreshToken: getRefreshToken
}