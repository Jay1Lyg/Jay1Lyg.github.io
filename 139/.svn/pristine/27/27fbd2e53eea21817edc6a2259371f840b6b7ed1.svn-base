var keystone = require('keystone'),
    CareerInResume1 = keystone.list('CareerInResume1');

exports = module.exports = function(req, res) {
	var cid = req.params.careerinresumeid || '';
	var uid = req.params.userid || '';
	CareerInResume1.model.findByIdAndRemove(cid, function (err, doc) {
	  if (err) return res.status(500).send(err);
	   res.redirect('/WX/wx_userprofile/'+uid);
	   //res.redirect('/WX/msearchsingleworkexp/'+params.userid+'/'+data.careerInResume_id);
	});
}