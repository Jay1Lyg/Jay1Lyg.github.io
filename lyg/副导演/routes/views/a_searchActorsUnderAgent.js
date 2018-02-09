var keystone = require('keystone'),
  BoundAgentAndActor = keystone.list('BoundAgentAndActor'),
  Areainfo = keystone.list('Areainfo'),
  RoleCategory = keystone.list('RoleCategory'),
  Role = keystone.list('Role'),
  User = keystone.list('User'),
  CareerInCrew = keystone.list('CareerInCrew'),
  Resume = keystone.list('Resume')
  ProductionCrews = keystone.list('ProductionCrews');
  Category = keystone.list('Category');
  Casting = keystone.list('Casting');
  BoundUserAndPublic = keystone.list('BoundUserAndPublic');
  PublicAccount = keystone.list('PublicAccount');
  FeatureTag = keystone.list('FeatureTag');
var async = require('async');
var urllib = require('url');
var config = require('../../public/conf/common.js');
var search = require('../../query/save_and_get_data_in_MongoDB/resume/search.js');

// var getActorDetail=function(actorArray,callback){
//   var data=[];  
//   async.each(actorArray,function(item,next){
//       var detail={};
//         User.model.findOne()
//          .where('_id',item.user_id)
//          .where('allok',true)
//          .exec(function(err,ret){
//           if(ret!=null){
//            detail.name=ret.realname;
//            detail.gender=ret.gender;
//            detail.schedule=ret.schedule;
//            detail.userid=ret._id;
//            Casting.model.findOne()
//             .where('user_id',item.user_id)
//             .exec(function(err,img){
//                if(err){
//                  throw new Error(err);
//                }else{
//                  if(img!=null){
//                    (img.artimage.length>0) ? (detail.iconUrl = config.homeEntry.url+'WX/casting/artimage/' + img.artimage[img.artimage.length-1].filename) : (detail.iconUrl="") ;
//                  }else{
//                    detail.iconUrl="";
//                  }
//                  var str="";
//                  async.each(ret.feature,function(item1,next){
//                    FeatureTag.model.findOne()
//                     .where('_id',item1)
//                     .exec(function(err,ret1){
//                        if(err){
//                          throw new Error(err);
//                        }else{
//                           str+=' '+ret1.name;
//                           detail.feature=str;
//                           next();
//                        }
//                     })
//                  },function(err){
//                     if(err){
//                        throw new Error(err);
//                      }else{
//                         data.push(detail);
//                         next();
//                      }
//                  });
//                }
                
//             }) 
//           }else{
//              next();
//           }     
//         })
//      },function(err){
//         if(err){
//           throw new Error(err);
//         }else{
//           callback(null,data);
//         }            
//      });         

// }
exports = module.exports = function(req, res) {
var agentid = req.params.agentid || '';
var appid = req.params.appid || '';
var page = req.params.page || '';
var index = req.params.index || '';
console.log('---------params----------');
console.log(req.params);
console.log('---------params----------');
var actors={};
async.waterfall([
  function(callback){//在app上注册的经纪人在公众号登录，需要将用户与appid关联
    BoundAgentAndActor.model.find()
     .where('agent_id',agentid)
     .exec(function(err,ret){
       async.each(ret,function(item,next){
         item.appid=appid;
         item.save(function(err){
            next();
         });
       },function(err){
            if(err){
              throw new Error(err);
            }else{
              callback(null);
            }
         });
     })
  },function(callback){
      if(index==1){
        BoundAgentAndActor.paginate({
          page: page,
          perPage:10,
          maxPages: 10
        })
       .where('appid',appid)
       .where('agent_id',agentid)
       .where('allok',true)
       .exec(function(err,ret){
         if(err){
           throw new Error(err);
         }else{
          actors.currentPage = ret.currentPage;
          actors.totalPages = ret.totalPages;
          search.getActorDetail(ret.results,function(err,ret1){
                if(err){
                  throw new Error(err);
                }else{
                  actors.results=ret1;
                  callback(null);
              
                }
          });
         }
       })
      }if(index==2){
        BoundAgentAndActor.paginate({
          page: page,
          perPage:10,
          maxPages: 10
        })
         .where('agent_id',agentid)
         .where('appid',appid)
         .where('allok',true)
         .where('user_gender',1)
         .exec(function(err,ret){
           if(err){
             throw new Error(err);
           }else{
              actors.currentPage = ret.currentPage;
              actors.totalPages = ret.totalPages;
              search.getActorDetail(ret.results,function(err,ret1){
                    if(err){
                      throw new Error(err);
                    }else{
                      actors.results=ret1;
                      callback(null);
                    }
              });
           }
         })

      }if(index==3){
         BoundAgentAndActor.paginate({
          page: page,
          perPage:10,
          maxPages: 10
         })
         .where('agent_id',agentid)
         .where('appid',appid)
         .where('allok',true)
         .where('user_gender',2)
         .exec(function(err,ret){
           if(err){
             throw new Error(err);
           }else{
              actors.currentPage = ret.currentPage;
              actors.totalPages = ret.totalPages;
              search.getActorDetail(ret.results,function(err,ret1){
                    if(err){
                      throw new Error(err);
                    }else{
                      actors.results=ret1;
                      callback(null);
                    }
              });
           }
         })
      }
  }
],function(err){
   if(err){
     throw new Error(err);
   }else{
        var params = urllib.parse(req.url,true);
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
          } 
      }
   }
});


}