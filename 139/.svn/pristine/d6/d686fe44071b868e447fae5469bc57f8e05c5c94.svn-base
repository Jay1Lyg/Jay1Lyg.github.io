var keystone = require('keystone'),
	BoundAgentAndActor = keystone.list('BoundAgentAndActor'),
	User = keystone.list('User'),
	MatchActor = keystone.list('MatchActor');
	MatchProduction = keystone.list('MatchProduction');
  Production = keystone.list('Production');
var async = require('async');
var urllib = require('url');
var config = require('../../public/conf/common.js');
var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var format = require('../../query/save_and_get_data_in_MongoDB/position/format.js');
exports = module.exports = function(req, res) {
   var agentid = req.params.agentid;
   var page = req.params.page;
   var appid = req.params.appid;
   var positioninfo = {}; 
   var result = []; 
   var params = urllib.parse(req.url,true);
    MatchProduction.model.find()
     .where('agent_id',agentid)
     .exec(function(err,ret){
      if(err){
         throw new Error(err);
      }else{
         async.eachSeries(ret,function(item,next){
            Production.model.findOne()
             .where('_id',item.prodction_id)
             .populate('production_crews category location')
             .exec(function(err,position_info){
                 if(err){
                    throw new Error(err);
                 }else{
                    format.formatsingleproductionforagent(position_info,appid,function(err,info){//查询剧目信息
                        if(err){
                           throw new Error(err);
                        }else{
                          MatchActor.model.find()
                          .where('matchProduction',item._id)
                          .exec(function(err,actors){
                             if(err){
                               throw new Error(err);
                             }else{
                               info.match_number=actors.length;
                               result.push(info);
                               next();
                             }
                          })
                          
                        }
                    })
                 }
             })
         },function(err){
             console.log('+++++++++++++++++++++');
             console.log(result);
             console.log('+++++++++++++++++++++');
             if(err){
                 throw new Error(err);
             }else{//
                 search.packProductionCrewInfo(result,function(err,crew){//按照剧目类别分类
                     if(err){
                        throw new Error(err);
                     }else{
                        //res.send(crew);
                     	  if(crew.length== 0){
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
        						           var str =  params.query.callback + '(' + JSON.stringify(crew) + ')';//jsonp
        						        	 res.send(str);	          
        						      	} 
        						   }	
                     } 
                 })
             }
         })
      }
   })
}