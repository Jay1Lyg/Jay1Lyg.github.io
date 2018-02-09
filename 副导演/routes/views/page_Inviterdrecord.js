var keystone = require('keystone');
var fs = require('fs');
exports = module.exports = function (req, res) { 
	//var careerincrew_id=req.params.careerincrew_id;
	console.log(req.params.user_id);
   var userid=req.params.user_id;
   var careerincrewid = req.params.careerincrewid;
   res.render('page_Inviterdrecord',{
   	 userid:userid,
   	 careerincrewid : careerincrewid
   });
};