
var keystone = require('keystone');
var fs = require('fs');
var query = require('../../query/util/downImageToNative.js');
exports = module.exports = function (req, res) { 
   var user_id = req.params.user_id; 
   var appid = req.params.appid;
   var openid =req.params.openid;
   var productionCrew_id = req.params.productionCrew_id;
   console.log(req.params);
   res.render('page_publicMoreposition', {
               userid: user_id,
               productionCrew_id : productionCrew_id,
               appid: appid,
               openid: openid
            });
  
};