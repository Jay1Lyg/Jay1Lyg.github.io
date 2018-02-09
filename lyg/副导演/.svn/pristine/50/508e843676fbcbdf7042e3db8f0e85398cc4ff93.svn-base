var keystone = require('keystone');
var path = require('path');

exports = module.exports = function(req, res) {
    var location = req.params.location;
	var uid = req.params.userid;
	var imagename = req.params.imagename;
	console.log(path.resolve('images/'+location+'/'+ uid + '/' +imagename));
	res.sendfile( path.resolve('images/'+location+'/'+ uid + '/' +imagename));
	//res.sendfile( path.resolve('images/frontimage/59409bc8ddcd7a9107e1c3f5/81YpgU1Pa4qzS-kCDO5CZPyvEmxcWnUn_t0eE5Vlx9nyQRtT5sS5xkN5EZw3QvPw.jpg'));
};