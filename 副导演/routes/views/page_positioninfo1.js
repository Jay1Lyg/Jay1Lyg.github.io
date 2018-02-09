
var keystone = require('keystone');
var fs = require('fs');
var query = require('../../query/util/downImageToNative.js');
exports = module.exports = function (req, res) { 
   var productionCrew_id = req.params.productionCrew_id; 
   console.log(req.params);
   res.render('page_positioninfo1', {
               productionCrew_id: productionCrew_id
            });
  
};