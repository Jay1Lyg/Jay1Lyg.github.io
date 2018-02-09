var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url');
var async = require('async');
var keystone = require('keystone');
var query = require('../../query/util/downImageToNative.js');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var PublicAccount = keystone.list('PublicAccount');


exports = module.exports = function(req, res) {
	console.log('-------------------------------');
    console.log(req.params);
	console.log('-------------------------------');
	var currentPage = req.params.page || '0';
	var time = req.params.time;
	var appid = req.params.appid;
	var openid = req.params.openid;
	var infos = {};
	var data = [];
	search.findProductionCrews(appid,openid,currentPage,time,function(err, positions) {
		if(err) {	
			res.send(err);
		}else{
			console.log('===========================');
			console.log(positions);
			console.log('===========================');
		 	var params = urllib.parse(req.url,true);
			if (params.query && params.query.callback) {
				var str =  params.query.callback + '(' + JSON.stringify(positions) + ')';//jsonp
				res.send(str);
			}else{
				res.send(JSON.stringify(positions));
				//res.send(positions);//author@zheng 该情况不做考虑，如果出现ajax不跨域的情况需要对该结果集进行处理
			}
		}
	});
}