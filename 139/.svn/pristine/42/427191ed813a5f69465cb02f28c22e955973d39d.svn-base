var keystone = require('keystone');
	Programme = keystone.list('Programme');
var urllib = require('url');
module.exports = function (req, res) {
  var programme_id = req.params.programme_id;
  Programme.model.findByIdAndRemove(programme_id, function (err, doc) {
     if(err){
       throw new Error(err);
     }else{
     	var data={};
      	data.index = true;
      	var params = urllib.parse(req.url,true);
  		  if (params.query && params.query.callback) {
  	       var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
  	       res.send(str);
  	    } else {
  	       res.send(JSON.stringify(data));
  	    }
     }
  })
}