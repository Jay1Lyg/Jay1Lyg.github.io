var keystone = require('keystone');

exports = module.exports = function (req, res) {
   var openid=req.params.openid;
   var appid= req.params.appid;    
   var userid= req.params.userid; 
   console.log('--------------------------'); 
   console.log(req.params); 
   console.log('--------------------------'); 
	res.render('page_searchPositions',{
		openid:openid,
		appid:appid,
		userid:userid
	});

}