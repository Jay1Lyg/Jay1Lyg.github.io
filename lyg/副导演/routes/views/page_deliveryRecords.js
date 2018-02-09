var keystone = require('keystone');


exports = module.exports = function (req, res) {     
	var userid=req.params.user_id;
	var appid=req.params.appid;
	console.log(req.params);
	res.render('page_deliveryRecords',{
      userid : userid,
      appid : appid
    });

};