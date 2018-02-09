var keystone = require('keystone'),
    CareerInResume = keystone.list('CareerInResume');
var urllib = require('url');

exports = module.exports = function(req, res) {
	var cid = req.params.careerinresumeid || '';
	//var uid = req.params.userid || '';
	var data={};
	CareerInResume.model.findByIdAndRemove(cid, function (err, doc) {
	  if (err) return res.status(500).send(err);
	    data.index=true;
        var params = urllib.parse(req.url,true);
		if (params.query && params.query.callback) {
	        var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
	        res.send(str);
	    } else {
	       	res.send(JSON.stringify(data));//普通的json
	    }
	});
}