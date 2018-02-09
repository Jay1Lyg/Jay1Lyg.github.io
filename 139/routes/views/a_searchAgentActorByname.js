var keystone = require('keystone'),
	BoundAgentAndActor = keystone.list('BoundAgentAndActor'),
	User = keystone.list('User'),
	BoundUserAndPublic = keystone.list('BoundUserAndPublic');
	FeatureTag = keystone.list('FeatureTag');
var async = require('async');
var urllib = require('url');
var config = require('../../public/conf/common.js');
var search = require('../../query/save_and_get_data_in_MongoDB/resume/search.js');

//搜索经济人下面的演员
exports = module.exports = function(req, res) {
var appid=req.params.appid;
var name = req.params.name || '';
var agentid = req.params.agentid || '';
var actors={};
var pattern = new RegExp(name, 'i');
var data=[];
 BoundAgentAndActor.model.find()
  .where('agent_id',agentid)//锁定搜索范围>>经济人旗下
  .where('appid',appid)
  .exec(function(err,ret){
     if(err){
        throw new Error(err);
     }else{
        async.each(ret,function(item,next){
        	  var detail={};
            User.model.findOne()
            .where('_id',item.user_id)
            .where('realname',pattern)
            .exec(function(err,ret1){
              if(err){
                throw new Error(err);
              }else{
              	if(ret1==null){
                   next();
              	}else{
                   search.packedSimpleActorInfo(ret1,function(err,user){
                      if(err){
                         throw new Error(err);
                      }else{
                      	data.push(user);
                      	next();
                      }
                   });
              	}
              }
            })
        },function(err){
           if(err){
              throw new Error(err);
           }else{
           	  	var params = urllib.parse(req.url,true);
  		       	if(data.length== 0){
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
  			          	 var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
  			        	 res.send(str);	          
  			      	} 
  			    }
           }
        });
     }
  })

}