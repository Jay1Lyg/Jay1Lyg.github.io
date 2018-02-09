

var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
var config = require('../../public/conf/common.js');

exports = module.exports = function (req, res) {
    var url   = config.homeEntry.url+req.url;
	var appid = req.params.appid || '';
	searchUser.getJssdkConfig(url,ret1.appid,function(err,ret){
	   if(err){
          throw new Error(err);
	   }else{
		   	res.render('', {
		   	 	appId: ret.appId,
		        timestamp: ret.timestamp,
		        nonceStr: ret.nonceStr,
		        signature: ret.signature,
		    });
	   }
	  

	})
};