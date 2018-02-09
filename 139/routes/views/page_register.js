var keystone = require('keystone');
var fs = require('fs');
exports = module.exports = function (req, res) { 
	var openid=req.params.openid;
	var appid=req.params.appid;
	var index=req.params.index;
  res.render('page_register',{
             openid: openid,
             index : index,
             appid : appid
           })
};