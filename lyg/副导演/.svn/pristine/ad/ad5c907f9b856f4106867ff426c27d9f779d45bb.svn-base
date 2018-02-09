
var keystone = require('keystone');

exports = module.exports = function (req, res) { 
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'page_edu';
	locals.formData = req.body || {};
    res.render('page_edu');  
};
