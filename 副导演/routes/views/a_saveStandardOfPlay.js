var keystone = require('keystone');
var User = keystone.list('User');
var Skill = keystone.list('Skill');
var RoleTag = keystone.list('RoleTag');
var School = keystone.list('School');
var SkillTag = keystone.list('SkillTag');
var FeatureTag = keystone.list('FeatureTag');
var BoundAgentAndActor = keystone.list('BoundAgentAndActor');
var CaregoryInTarget = keystone.list('CaregoryInTarget');
var async = require('async');
var urllib = require('url');

exports = module.exports = function (req, res) {
  console.log(req.body);
	var userid=req.body.userid;
  async.waterfall([
    function(callback){
      User.model.findOne()
       .where('_id',userid)
       .exec(function(err,ret){
         if(err){
           throw new Error(err);
         }else{
            console.log(ret);
            ret.schedule=req.body.schedule;
            ret.paycheck=req.body.paycheck;
            ret.role_tag=req.body.role_tag;
            ret.allok=true;
            ret.save(function(err){
               if(err){
                 throw new Error(err);
               }else{
                 BoundAgentAndActor.model.findOne()
                  .where('user_id',userid)
                  .exec(function(err,ret1){
                     if(err){
                        throw new Error(err);
                     }else{
                        if(ret1==null){
                          callback(null);
                        }else{
                          ret1.allok =true;
                          ret1.save(function(err){
                             if(err){
                               throw new Error(err);
                             }else{
                               callback(null);
                             }
                          })
                        }
                       
                     }
                  })
                 
               }
            })
         }
       })
    }
  ],function(err){
      if(err){
        throw new Error(err);
      }else{
          var data={};
          data.index=true;
          var params = urllib.parse(req.url,true);
          if (params.query && params.query.callback) {
                //console.log('请求2:'+params.query);
              var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
              res.send(str);
          } else {
              res.send(JSON.stringify(data));//普通的json
          }// console.log(allnames);
      }
  });
	 
}
