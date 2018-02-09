var keystone = require('keystone');
var User = keystone.list('User');
var CareerInCrew = keystone.list('CareerInCrew');
var async = require('async');
var urllib = require('url');


exports = module.exports = function (req, res) {
   var careerincrewid = req.careerincrewid;
   CareerInCrew.model.findOne()
    .where('_id',careerincrewid)
    .exec(function(err,ret){
       if(err){
          throw new Error(err);
       }else{
       	  ret.isDelete = true;
       	  ret.save(function(err){
             if(err){
                throw new Error(err);
             }else{
             	data.index=true;
	         	  var params = urllib.parse(req.url,true);
      				if (params.query && params.query.callback) {
      		          	var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
      		        	res.send(str);
      			    } else {
      			       	res.send(JSON.stringify(data));//普通的json
      			    }
              }
          })
       }
    })
}