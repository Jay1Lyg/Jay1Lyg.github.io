var keystone = require('keystone'),
	ActorBudget = keystone.list('ActorBudget'),
	ProgrammeMatchActor = keystone.list('ProgrammeMatchActor'),
	Programme = keystone.list('Programme'),
	ProgrammeInCareer = keystone.list('ProgrammeInCareer'),
	Production = keystone.list('Production'),
	ProgrammeInProduction = keystone.list('ProgrammeInProduction');
var async = require('async');
var config = require('../../public/conf/common.js');
var search = require('../../query/save_and_get_data_in_MongoDB/programme/search.js');
var urllib = require('url');

exports = module.exports = function(req, res) {
   var userid = req.params.userid;
   var results = [];
   ProgrammeInProduction.model.find()
   .where('user_id',userid)
   .exec(function(err,programme){
       if(err){
          throw new Error(err);
       }else{
       	  async.eachSeries(programme,function(item,next){
       	  	var data = {};
             Production.model.findOne()
             .where('_id',item.production_id)
             .where('isCreated',true)
             .where('isPost',true)
             .where('createdBy',userid)
             //.where('isDelete',false)
             .exec(function(err,production){
                if(err){
                   throw new Error(err);
                }else{
                   Programme.model.find()//查询每个项目下的方案
                   .where('programmeinproduction',item._id)
                   .exec(function(err,programmes){
                       if(err){
                          throw new Error(err);
                       }else{
                       	  var programmeArray = [];
                       	  async.eachSeries(programmes,function(item1,next){
                             var programmeinfo = {};
                             programmeinfo.programme_name = item1.name;
                             (item1.actorbudget_id==undefined)?(programmeinfo.actorbudget_id = '') : (programmeinfo.actorbudget_id = item1.actorbudget_id);
                             programmeinfo.programmeinproduction = item1.programmeinproduction;
                             programmeinfo.attribute = item1.attribute;
                             programmeinfo.programme_id = item1._id;                            
                             programmeArray.push(programmeinfo);
                             next();
                       	  },function(err){
                       	  	 if(err){
                                throw new Error(err);
                             }else{
                                if(programmeArray.length == 0){
                                   next();
                                }else{
                                   data.production_name = production.name;
                                   data.production_id = production._id;
                                   data.programmeArray = programmeArray;
                                   results.push(data);                               
                                   next();
                                }  
                                
                             }
                       	  });
                       }
                   })
                }
             })
       	  },function(err){
              if(err){
                 throw new Error(err);
              }else{  
                var params = urllib.parse(req.url,true);  
                if (params.query && params.query.callback) {
                    //console.log('请求2:'+params.query); 
                   var str =  params.query.callback + '(' + JSON.stringify(results) + ')';//jsonp
                   res.send(str);           
                }else{
                    res.send(JSON.stringify(results));
                }
              }
          });
       	  
       }
   })
}