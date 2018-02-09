var keystone = require('keystone');


exports = module.exports = function (req, res) {     
	var director_id = req.params.director_id;
	var appid = req.params.appid;
	res.render('page_getAllCrewLists',{
	   director_id : director_id,
	   appid : appid
	});

};