var keystone = require('keystone');
var fs = require('fs');
exports = module.exports = function (req, res) { 
	var careerincrew_id=req.params.careerincrew_id;
   res.render('page_candidateinfo',{
   	  careerincrew_id : careerincrew_id
   });
};
