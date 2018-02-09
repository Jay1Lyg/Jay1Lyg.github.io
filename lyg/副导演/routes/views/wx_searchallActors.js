var keystone = require('keystone');
var	User = keystone.list('User');
var	PublicAccount = keystone.list('PublicAccount');
var search = require('../../query/save_and_get_data_in_MongoDB/resume/search.js');
var urllib = require('url');
var async = require('async');

exports = module.exports = function(req, res) {

   var actors = [];
   User.model.find()
   .where('allok',true)
   .exec( function(err, ret){
   	  if(err){
        throw new Error(err);
   	  }else{
   	  	async.each(ret,function(item,next){
            search.findProfile(item._id,function(err,actor_result){
		       if(err){
		         throw new Error(err);
		       }else{
		       	  actors.push(actor_result);
		       	  next();
		       }
		    });
   	  	},function(err){
           if(err){
              throw new Error(err);
           }else{
           	  var params = urllib.parse(req.url,true);
           	 // res.send(actors);
	       	  if(actors== null){
		        	//console.log('请求1:'+params);
			        if (params.query && params.query.callback) {
			          	//console.log('请求2:'+params.query);
			          	var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
			        	res.send(str);
			      	} else {
			       		res.send(JSON.stringify({}));//普通的json
			      	}
		      }else{
		        	if (params.query && params.query.callback) {
			          	//console.log('请求2:'+params.query);	
			          	 var str =  params.query.callback + '(' + JSON.stringify(actors) + ')';//jsonp
			        	 res.send(str);	          
			      	} else{
			      		res.send(JSON.stringify(actors));
			      	}
			  }	
           }
   	  	});
        
   	  }
   })
       	
}


