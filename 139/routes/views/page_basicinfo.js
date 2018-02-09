

var keystone = require('keystone');

exports = module.exports = function (req, res) { 
   // var model = { title : 'Page Title' };  
    console.log('step1');
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'page_basicinfo';
	locals.formData = req.body || {};
    res.render('page_basicinfo');  
};


