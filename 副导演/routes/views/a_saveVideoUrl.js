var keystone = require('keystone');
var UserMedia = keystone.list('UserMedia');
var async = require('async');
var urllib = require('url');

exports = module.exports = function (req, res) {
  console.log(req.body);
   UserMedia.model.findOne()
    .where('user_id',req.body.userid)
    .exec(function(err,ret){
       if(err){
          throw new Error(err);
       }else{
       	  if(ret==null){
            UserMedia.model.create({user_id:req.body.userid,videos:req.body.videourl},function(err,ret1){
               if(err){
                  throw new Error(err);
               }else{
               	  var data={};
		              data.index=true;
		              data.userid=req.body.userid;
		              data.agentid=req.body.agentid;
                  var params = urllib.parse(req.url,true);
      					  if (params.query && params.query.callback) {
      				        var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
      				        res.send(str);
      				    } else {
      				       	res.send(JSON.stringify(data));//普通的json
      				    }
               }
            })
       	  }else{
       	  	ret.videos=req.body.videourl;
       	  	ret.save(function(err){
               if(err){
                    throw new Error(err);
               }else{
               	    var data={};
    		            data.index=true;
    		            data.userid=req.body.userid;
    		            data.agentid=req.body.agentid;
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
       }
    })

}