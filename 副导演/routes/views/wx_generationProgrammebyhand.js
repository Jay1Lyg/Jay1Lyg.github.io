/*  手动添加生成方案
*   将对应参数保存到对应model中
*/


var keystone = require('keystone'),
	ActorBudget = keystone.list('ActorBudget'),
	ProgrammeMatchActor = keystone.list('ProgrammeMatchActor'),
	Programme = keystone.list('Programme'),
	ProgrammeInCareer = keystone.list('ProgrammeInCareer'),
	ProgrammeInProduction = keystone.list('ProgrammeInProduction');
var async = require('async');
var config = require('../../public/conf/common.js');
var search = require('../../query/save_and_get_data_in_MongoDB/programme/search.js');
var urllib = require('url');
exports = module.exports = function(req, res) {
   var params = req.body;
   var production_id = params.production_id;//项目id
   var name = params.name;//方案名
   var userid = params.userid;//当前用户的id
   var attribute = params.attribute;//1--使用滑块 2--自定义方案
   var data = {};
   // var production_id = '5a1679cfe2ff45bb075d95e0';
   // var name = '方案一';//方案名
   // var userid = '59eed6fca6a0b4b0689ba1e3';//当前用户的id
   async.waterfall([
      function(callback){//判断当前剧目是否已经生成过方案
        ProgrammeInProduction.model.findOne()
	     .where('user_id',userid)
	     .where('production_id',production_id)
	     .exec(function(err,ret){
	        if(err){
	          throw new Error(err);
	        }else{
	        	if(ret==null){//该剧目还未生成过方案
	              ProgrammeInProduction.model.create({
	              	 user_id : userid,
	              	 production_id : production_id
	              },function(err,ret1){
	                  if(err){
	                    throw new Error(err); 
	                  }else{
                        callback(null,ret1);
	                  }
	              })
	        	}else{//已经生成过，不需在新建
	        		callback(null,ret);
	        	}
	        }
	    })
      },function(arg1,callback){//生成方案
          Programme.model.create({
          	name: name, 
	          programmeinproduction : arg1._id,
	          attribute : 2//表示手动添加方案
          },function(err,ret){
              if(err){
                 throw new Error(err);
              }else{
              	 callback(null,ret);
              }
          })
      },function(arg,callback){////为每条角色推荐三个合适的演员,保存到方案
          search.searchThreeActorsForHandProgramme(production_id,arg._id,function(err,ret){
             if(err){
                throw new Error(err);
             }else{
              callback(null);
             }
          })
      }
   ],function(err){
      if(err){
          throw new Error(err);
      }else{
      	  //跳转到方案管理页面
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
