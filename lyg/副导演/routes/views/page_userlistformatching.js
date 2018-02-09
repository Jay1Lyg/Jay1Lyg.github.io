var keystone = require('keystone');
var fs = require('fs');
exports = module.exports = function (req, res) { 
   var careerincrewsid=req.params.careerincrewsid;
   var userid = req.params.userid;
   res.render('page_userlistformatching',{
   	 careerincrewsid : careerincrewsid,
   	 userid : userid
   });
};