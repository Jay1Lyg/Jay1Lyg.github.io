var keystone = require('keystone');
exports = module.exports = function (req, res) {
	var user_id = req.params.user_id || '';
	var authorid = req.params.authorid || '';
	var appid = req.params.appid || '';
	console.log('user_id:'+user_id);
    res.render('page_actor_detail', {
   	 	user_id: user_id,
   	 	authorid:authorid,
   	 	appid : appid

    });
};

