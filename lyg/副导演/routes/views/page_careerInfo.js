var keystone = require('keystone');


exports = module.exports = function (req, res) {     
	var authorid=req.params.authorid;
	res.render('page_careerInfo',{
    authorid : authorid
  });

};