var keystone = require('keystone');
var fs = require('fs');
exports = module.exports = function (req, res) { 
   var productionid=req.params.productionid;
   var productioncrew_id = req.params.productioncrew_id;
   var user_id = req.params.userid;
   var openid = req.params.openid;
   res.render('page_editpositioninfo',{
   	 productionid:productionid,
   	 productioncrew_id : productioncrew_id,
   	 userid : user_id,
   	 openid : openid
   });
};