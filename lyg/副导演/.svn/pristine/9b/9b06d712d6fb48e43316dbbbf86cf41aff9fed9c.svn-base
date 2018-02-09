var keystone = require('keystone');

exports = module.exports = function (req, res) {     
	var user_id = req.params.user_id;
	var production_crews_id = req.params.production_crews_id;
	var openid = req.params.openid;
	var appid = req.params.appid;
	var production_id = req.params.production_id;
	console.log('user_id:'+user_id+ 'production_crews_id:'+production_crews_id);
	res.render('page_roleList', {
		user_id: user_id,
		production_crews_id: production_crews_id,
		openid: openid,
		appid: appid,
		production_id : production_id
	});
		  

};