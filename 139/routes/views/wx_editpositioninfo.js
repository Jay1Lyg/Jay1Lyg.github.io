var keystone = require('keystone'),
	Production = keystone.list('Production');
  Areainfo = keystone.list('Areainfo');
  CaregoryInTarget = keystone.list('CaregoryInTarget');
//var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url');
var async = require('async');
var search = require('../../query/save_and_get_data_in_MongoDB/production/search.js');

exports = module.exports = function(req, res) {
	var productionid = req.params.productionid || '';
  console.log('------------------------');
  console.log(req.body);
  console.log(req.params.productionid);
  console.log('------------------------');
	async.waterfall([
    function(callback){
      search.searchAreaInfo(req.body.code,req.body.areaCode,function(err,ret){
         if(err){
            throw new Error(err);
         }else{
            callback(null,ret);
         }
      });
    },
		function(arg,callback){
      console.log('---------arg----------');
      console.log(arg);
      console.log('---------arg----------');
        Production.model.findOne()
		     .where('_id',productionid)
		     .exec(function(err,ret){
		        if(err){
		           throw new Error(err);
		        }else{
		            ret.name = req.body.production_name;//剧名
		            ret.investmentAmount = req.body.account;//投资规模
		            ret.duration = req.body.date;//拍摄周期
		            ret.actorBudget = req.body.actorBudget;//演员预算
		            ret.production_companys = req.body.production_companies;//出品公司
		            ret.issuer_companies = req.body.issuser_companies;//承制公司
                ret.expired_date = req.body.expired_date;//截止日期
                ret.address = req.body.production_address_obj;//见组地址
                ret.location = arg.id;//拍摄地
                ret.save(function(err){
                  if(err){
                     throw new Error(err);
                  }else{
                  	 callback(null);
                  }
                })
		        }
		     })
		},function(callback){//剧目类型，剧目类别
          CaregoryInTarget.model.findOne()
           .where('production_id',productionid)
           .exec(function(err,ret){
               if(err){
                  throw new Error(err);
               }else{               
                   ret.production_id = productionid;
                   ret.category = req.body.categoryid;
                   ret.repertoireType = req.body.repertoireid;
                   ret.save(function(err){
                        if(err){
                           throw new Error(err);
                        }else{
                           callback(null);
                        }
                   })
               }
          })     
		},function(callback){//若剧目名字变化，需要重新关联剧组
        var production_obj1 = {};
        production_obj1.id = productionid;
        production_obj1.name = req.body.production_name;
        search.changeProductionCrews(production_obj1, function (err, ret){
          if(err){
            throw new Error(err);
          }else{
            callback(null);
          }
        });
    },
	],function(err){
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