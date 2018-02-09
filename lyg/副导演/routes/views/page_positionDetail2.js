var keystone = require('keystone');

exports = module.exports = function (req, res) {     
	var user_id = req.params.user_id;
	var production_crews_id = req.params.production_crews_id;
	var openid = req.params.openid;
	var firstCreate = req.params.firstCreate;
	console.log('user_id:'+user_id+ 'production_crews_id:'+production_crews_id);
	res.render('page_positionDetail2', {
		user_id: user_id,
		production_crews_id: production_crews_id,
		openid: openid,
		firstCreate:firstCreate
	});
		  

};