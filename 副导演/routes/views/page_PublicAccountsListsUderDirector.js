var keystone = require('keystone');
var fs = require('fs');
exports = module.exports = function (req, res) { 
   var user_id=req.params.user_id;
   var myappid = req.params.myappid;
   res.render('page_PublicAccountsListsUderDirector',{
   	 user_id:user_id,
   	 myappid : myappid
   });
};