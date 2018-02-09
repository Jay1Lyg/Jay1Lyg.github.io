/*  按滑块生成方案
*   1.将对应参数保存到对应model中
    2.若选择使用滑块，需要根据滑块值对平台上的演员做匹配，将匹配结果保存到数据库
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
   var production_id = params.production_id;//项目id  //
   var leadingactor_budget_ratio = params.leadingactor_budget_ratio;//领衔主演预算比
   var guestactor_budget_ratio = params.guestactor_budget_ratio;//客串主演预算比
   var starringingroup_budget_ratio = params.starringingroup_budget_ratio;//跟组主演预算比
   var other_budget_ratio = params.other_budget_ratio;//其他演员预算比
   var name = params.name;//方案名
   var userid = params.userid;//当前用户的id
   var attribute = params.attribute;//1--使用滑块 2--自定义方案
   var flag ;
   var data = {};
   console.log('----------------production_id------------------');
   console.log(production_id);
   console.log('----------------production_id------------------');
   // var params = req.body;
   // var production_id = '5a1679cfe2ff45bb075d95e0';//项目id  //5a0a901823efe9724b8ec096
   // var leadingactor_budget_ratio = 0.4;//领衔主演预算比
   // var guestactor_budget_ratio = 0.3;//客串主演预算比
   // var starringingroup_budget_ratio = 0.2;//跟组主演预算比
   // var other_budget_ratio = 0.1;//其他演员预算比
   // var name = '方案一';//方案名
   // var userid = '59eed6fca6a0b4b0689ba1e3';//当前用户的id
   async.waterfall([
      function(callback){//判断当前剧目是否已经生成过方案
      	console.log('step1');
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
	                  	console.log('新建成功');
                      callback(null,ret1);
	                  }
	              })
	        	}else{//已经生成过，不需在新建
	        		console.log('ProgrammeInProduction已经生成过，不需在新建');
	        		callback(null,ret);
	        	}
	        }
	    })
      },function(arg,callback){//演员预算比去重，若有相同的预算比就不再新建
      	  console.log('step2');
      	  //console.log(arg);
          ActorBudget.model.findOne()
	       .where('leadingactor_budget_ratio',leadingactor_budget_ratio)
	       .where('guestactor_budget_ratio',guestactor_budget_ratio)
	       .where('starringingroup_budget_ratio',starringingroup_budget_ratio)
	       .where('other_budget_ratio',other_budget_ratio)
	       .exec(function(err,ret){
	         if(err){
	           throw new Error(err);
	         }else{
	         	if(ret==null){
	              ActorBudget.model.create({
	              	leadingactor_budget_ratio : leadingactor_budget_ratio,
	              	guestactor_budget_ratio : guestactor_budget_ratio,
	              	starringingroup_budget_ratio : starringingroup_budget_ratio,
	              	other_budget_ratio : other_budget_ratio
	              },function(err,ret1){
	                  if(err){
	                    throw new Error(err);
	                  }else{
	                  	console.log('ActorBudget新建成功');
                      callback(null,arg,ret1);
	                  }
	              })
	         	}else{
	         		console.log('ActorBudget已经生成过，不需在新建');
	         		callback(null,arg,ret);
	         	}
	         }
	       })
      },function(arg1,arg2,callback){//生成方案
      	  console.log('step3');
      	  //console.log(arg1);
          //console.log(arg2);
          Programme.model.findOne()
          .where('actorbudget_id',arg2._id)
          .where('programmeinproduction',arg1._id)
          .exec(function(err,programme){
             if(err){
                throw new Error(err);
             }else{
                if(programme==null){
                  flag = true;//同一剧目，同一滑块值的方案还未生成
                  callback(null,arg1,arg2);
                }else{
                  flag = false;//同一剧目，同一滑块值的方案已经生成
                  callback(null,arg1,arg2);
                }
             }
          })
         
      },function(arg1,arg2,callback){
         Programme.model.create({
            name: name, 
            actorbudget_id : arg2._id,
            programmeinproduction : arg1._id,
            attribute : 1
          },function(err,ret){
              if(err){
                 throw new Error(err);
              }else{
                console.log('Programme新建成功');
                callback(null,ret,arg2);
              }
          })
      },
      function(programme,actorbudget,callback){//按照滑块值匹配全平台上演员,保存到数据库
      	  	console.log('step4');
      	  	//console.log(arg1);
            console.log(flag);
            if(flag){
               search.matchActorByActorBudgetRetio(production_id,actorbudget,function(err,ret){
                  if(err){
                     throw new Error(err);
                  }else{
                     callback(null,programme,actorbudget);
                  }
              });
            }else{
                callback(null,programme,actorbudget);
            }
          
      },function(programme,actorbudget,callback){//为每条角色推荐三个合适的演员,保存到方案
      		console.log('step5');
      		//console.log(arg1);
           // console.log(arg2);
          search.searchThreeActorsForSliderProgramme(production_id,actorbudget._id,programme._id,function(err,ret){
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
