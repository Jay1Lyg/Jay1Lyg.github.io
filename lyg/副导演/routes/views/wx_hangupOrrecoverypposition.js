var keystone = require('keystone');
var User = keystone.list('User');
var Production = keystone.list('Production');
var async = require('async');
var urllib = require('url');


exports = module.exports = function (req, res) {
   var productionid = req.params.productionid;
   var status = req.params.status;//true--挂起，false--恢复
   console.log(req.params);
   Production.model.findOne()
    .where('_id',productionid)
    .exec(function(err,ret){
       if(err){
          throw new Error(err);
       }else{
       	  ret.isDelete = status;
       	  ret.save(function(err){
             if(err){
                throw new Error(err);
             }else{
             	  CareerInCrew.model.find()
                 .where('crews_object',ret.production_crews)
                 .exec(function(err,ret1){
                    if(err){
                      throw new Error(err);
                    }else{
                       async.each(ret1,function(item,next){
                           CareerInCrew.model.findOne()
                            .where('_id',item._id)
                            .exec(function(err,ret2){
                               if(err){
                                  throw new Error(err);
                               }else{
                                  ret2.isDelete = status;
                                  ret2.save(function(err){
                                     if(err){
                                        throw new Error(err);
                                     }else{
                                        next();
                                     }
                                  })
                               }
                            })
                       },function(err){
                          if(err){
                             throw new Error(err);
                          }else{
                              var params = urllib.parse(req.url,true);
                              var data = {};
                              data.index = true;
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
	         	
       	  })
       }
    })
}



       
             