var keystone = require('keystone');
var User = keystone.list('User');
var AlternativeActor = keystone.list('AlternativeActor');
var async = require('async');
var urllib = require('url');


exports = module.exports = function (req, res) {
   var user_id = req.params.user_id;
   var careerincrew_id = req.params.careerincrew_id;
   var data = {};
   AlternativeActor.model.findOne()
   .where('user_id',user_id)
   .where('careerincrew_id',careerincrew_id)
   .exec(function(err,alternativeActor){
       if(err){
          throw new Error(err);
       }else{
       	 alternativeActor.isDelete = true;//表示删除
       	 alternativeActor.save(function(err){
            if(err){
	          throw new Error(err);
	        }else{
            data.index=true;
         	  var params = urllib.parse(req.url,true);
    				if (params.query && params.query.callback) {
  		          var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
  		          res.send(str);
    			  }else{
    			      res.send(JSON.stringify(data));//普通的json
    			  }
  	     }
       	 })
       }
   })
}