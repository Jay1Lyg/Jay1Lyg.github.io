
var keystone = require('keystone');
var fs = require('fs');
exports = module.exports = function (req, res) { 
	var appid=req.params.appid;
	var openid = req.params.openid;
	var userid = req.params.userid;
   	res.render('page_actor_info1',{
   	  appid: appid,
   	  openid: openid,
   	  userid:userid
   	});
};

