
var keystone = require('keystone');
var fs = require('fs');
var query = require('../../query/util/downImageToNative.js');
exports = module.exports = function (req, res) { 
   var user_id = req.params.user_id; 
   var appid = req.params.appid;
   var openid =req.params.openid;
   console.log(req.params);
   res.render('page_CrewsList', {
               userid: user_id,
               appid: appid,
               openid: openid
            });
   // query.getAppid(user_id,function (err1,ret1){
   // 	 if(err1){
   // 	 	throw new Error(err1);
   // 	 }else{
   // 	 	  	console.log("user_id:"+user_id+'   appid:'+ret1.appid);
	  //     	res.render('page_PositionsList', {
	  //  			user_id: user_id,
	  //  			appid: ret1.appid
	  //     	});
   // 	 }
  // });
  
};