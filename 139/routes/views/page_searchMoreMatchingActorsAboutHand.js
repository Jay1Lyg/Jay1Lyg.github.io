var keystone = require('keystone');


exports = module.exports = function (req, res) {     
	var careerincrew_id = req.params.careerincrew_id ;
	var attribute = req.params.attribute;
	var director_id = req.params.director_id;
	res.render('page_searchMoreMatchingActorsAboutHand',{
	   careerincrew_id : careerincrew_id,
	   attribute : attribute,
	   director_id : director_id
	});
};