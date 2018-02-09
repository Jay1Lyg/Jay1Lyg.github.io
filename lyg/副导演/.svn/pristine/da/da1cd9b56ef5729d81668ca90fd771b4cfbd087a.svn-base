var keystone = require('keystone'),
    CareerInCrew = keystone.list('CareerInCrew');
var urllib = require('url');

exports = module.exports = function(req, res) {
	var cid = req.params.careerincrewid || '';
	CareerInCrew.model.findByIdAndRemove(cid, function (err, doc) {
       if (err) return res.status(500).send(err);
        var data={};
    	data.index = true;
    	var params = urllib.parse(req.url,true);
		if (params.query && params.query.callback) {
	         var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
	         res.send(str);
	    } else {
	       	 res.send(JSON.stringify(data));
	    }
	});
}

// exports = module.exports = function(req, res) {
// 	var cid = req.params.careerincrewid || '';
// 	CareerInCrew.model.findByIdAndRemove(cid, function (err, doc) {
//        if (err) return res.status(500).send(err);
//         var data={};
//     	data.index = true;
//     	var params = urllib.parse(req.url,true);
// 		if (params.query && params.query.callback) {
// 	         var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
// 	         res.send(str);
// 	    } else {
// 	       	 res.send(JSON.stringify(data));
// 	    }
// 	});
// }