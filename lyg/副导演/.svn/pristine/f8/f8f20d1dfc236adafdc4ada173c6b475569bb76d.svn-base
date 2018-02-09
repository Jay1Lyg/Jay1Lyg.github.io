/**
*
*   author@zheng
*发布通告的职位信息页面
*
*/
var keystone = require('keystone');

exports = module.exports = function (req, res) {     
	var user_id = req.params.user_id;
	var production_crews_id = req.params.production_crews_id;
	var openid = req.params.openid;
	var roletag_id = req.params.roletag_id;
	var production_id = req.params.production_id;
	console.log('user_id:'+user_id+ 'production_crews_id:'+production_crews_id);
	res.render('page_positionDetail', {
		user_id: user_id,
		production_crews_id: production_crews_id,
		openid: openid,
		roletag_id:roletag_id,
		production_id : production_id
	});
		  

};