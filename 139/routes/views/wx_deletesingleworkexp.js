var keystone = require('keystone'),
    CareerInResume = keystone.list('CareerInResume');

exports = module.exports = function(req, res) {
	var cid = req.params.careerinresumeid || '';
	var uid = req.params.userid || '';
	CareerInResume.model.findByIdAndRemove(cid, function (err, doc) {
	  if (err) return res.status(500).send(err);
	   res.redirect('/WX/wx_userprofile/'+uid+'/'+req.params.appId);
	   //res.redirect('/WX/msearchsingleworkexp/'+params.userid+'/'+data.careerInResume_id);
	});
}