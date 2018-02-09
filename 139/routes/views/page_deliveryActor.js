
var keystone = require('keystone');
exports = module.exports = function (req, res) {
	var user_id = req.params.user_id || '';
	var careerincrew_id = req.params.careerincrew_id || '';
	console.log('user_id:'+user_id);
    res.render('page_deliveryActor_info', {
   	 	user_id: user_id,
   	 	careerincrew_id : careerincrew_id
    });
};