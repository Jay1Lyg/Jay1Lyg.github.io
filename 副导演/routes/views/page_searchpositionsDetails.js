var keystone = require('keystone');
var fs = require('fs');
exports = module.exports = function (req, res) { 
   var productionCrew_id=req.params.productionCrew_id;
   var careerincrewid=req.params.careerincrewid;
   var userid = req.params.userid;
   res.render('page_searchpositionsDetails',{
   	 productionCrew_id:productionCrew_id,
   	 careerincrewid : careerincrewid,
   	 userid : userid
   });
};