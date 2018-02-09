var keystone = require('keystone');
var path = require('path');

exports = module.exports = function(req, res) {
	var mid = req.params.mediaid;
	var imgname = req.params.imagename;
	res.sendfile( path.resolve('images/usermedia/'+ mid + '/' +imgname));
};