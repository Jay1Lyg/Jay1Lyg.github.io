/*
*
*
*
*
*
*         将微信公众号的详细信息存储到数据库之中
*
*
*
*
*
*
*
*
*/
var keystone = require('keystone');
var fs = require('fs');
var util = require('../../query/util/util.js');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/DSF_info.json', 'utf-8'));
var async = require('async');

/*
*
*存储微信公众号（授权方的详细信息） 
*
*/
//////////// [Jing] Comments: 这个函数似乎没有做保存的工作，仅仅是返回了数据。建议更名
function saveInfo (weixin_info, component_access_token, callback){
	var data = {};
	var body = weixin_info.authorization_info; 
	var authorizer_appid = body.authorizer_appid;
	var authorizer_access_token = body.authorizer_access_token;
	var expires_in = (new Date()).getTime()/1000+7000;
	var authorizer_refresh_token = body.authorizer_refresh_token;
	data.authorizer_appid = authorizer_appid;
	data.authorizer_access_token = authorizer_access_token;
	data.expires_in = expires_in;
	data.authorizer_refresh_token = authorizer_refresh_token;
	async.waterfall([
		function (callback){
			//拉取到授权方的详细信息
			getWeiXinInfo( data.authorizer_appid, component_access_token, function (err, ret){
				if(err){
					throw new Error(err);
				}else{
					callback(null, ret);
				}
			});
		},
		function (arg, callback){
			// console.log('拉取到授权方的详细信息：');
			//console.log(arg);
			//封装授权方的信息
			var body = arg.authorizer_info;
			data.nick_name = body.nick_name;
			data.head_img = body.head_img;
			data.service_type_info = (body.service_type_info).id;
			data.verify_type_info = (body.verify_type_info).id;
			data.user_name = body.user_name;
			data.alias = (!body.alias) ? '' :body.alias;
			data.qrcode_url = body.qrcode_url;
			var function_code = body.business_info;
			data.open_pay = function_code.open_pay;
			data.open_shake = function_code.open_shake;
			data.open_scan = function_code.open_scan;
			data.open_card = function_code.open_card;
			data.open_store = function_code.open_store;
			data.principal_name = body.principal_name;
			data.signature = body.signature;
			var body1 = arg.authorization_info;
			data.func_info = body1.func_info;
			//console.log(data);
			callback(null);
		}, 
		function (callback){
			var func_info_arry = [];
			async.eachSeries(data.func_info, function ( func_info, next){
				func_info_arry.push(func_info.funcscope_category.id);
				next();
			}, function (err){
				if(err){
					throw new Error(err);
				}else{
					func_info_arry.sort();
					func_info_arry.join('、');
					var func_info_json = {};
					func_info_json.func_info = func_info_arry;
					data.func_info = JSON.stringify(func_info_json);
					// console.log(typeof data.func_info);
					// console.log(data.func_info);
					callback(null, data);
				}
			});
		}
	], function (err, data){
		if(err){
			throw new Error(err);
		}else{
			return callback( null, data);
		}
	});

}


/*
*   
* 获取微信公众号的基本信息
*
*/
function getWeiXinInfo ( authorizer_appid, component_access_token, callback ){

	var url = 'https://api.weixin.qq.com/cgi-bin/component/api_get_authorizer_info?component_access_token='+component_access_token;
	var data = {
		"component_appid": info.AppID,
		"authorizer_appid": authorizer_appid
	};
	util.sendPostRequest(url, data, function (err1, ret1){
		if(err1){
			callback(err1, null);
		}else{
			// console.log('请求得到的授权方的基本信息：');
			// console.log(ret1);
			callback(null, ret1);
		}
	});
	
}

module.exports = {
	saveInfo: saveInfo
}