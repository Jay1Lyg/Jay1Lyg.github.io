var keystone = require('keystone');


exports = module.exports = function (req, res) {     
	var careerincrew_id = req.params.careerincrew_id ;
	var actorbudget_id = req.params.actorbudget_id ;
	var programme_id = req.params.programme_id ;
	res.render('page_searchAlternativeActorsbySlider',{
	   careerincrew_id : careerincrew_id,
	   actorbudget_id : actorbudget_id,
	   programme_id : programme_id
	});
};