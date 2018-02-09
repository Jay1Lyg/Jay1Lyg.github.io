var keystone = require('keystone');
var User = keystone.list('User');
var CareerInCrew = keystone.list('CareerInCrew');
var async = require('async');
var urllib = require('url');

exports = module.exports = function (req, res) {
  var user_id = req.body.user_id;
  var careerincrew_id = req.body.careerincrew_id;
  var data = {};
  console.log(req.body);
  async.eachSeries(careerincrew_id,function(item,next){
    AlternativeActor.model.findOne()
     .where('user_id',user_id)
     .where('careerincrew_id',item)
     .exec(function(err,alternativeActor){
         if(err){
            throw new Error(err);
         }else{
            if(alternativeActor == null){
              AlternativeActor.model.create({
                user_id : user_id,
                careerincrew_id : item,
                addstate : 2,//表示已添加
                source : 1//来源
              },function(err,ret){
                 if(err){
                   throw new Error(err);
                 }else{
                    next();
                 }
              })
            }else{
               alternativeActor.isDelete = false;
               alternativeActor.addstate = 2;
               alternativeActor.source = 1;
               alternativeActor.save(function(err){
                  if(err){
                     throw new Error(err);
                  }else{
                    next();
                  }
               })
            }
         }
      })
  },function(err){
      if(err){
         throw new Error(err);
      }else{
        data.index = true;
        var params = urllib.parse(req.url,true);
        if (params.query && params.query.callback) {
              var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
              res.send(str);
          } else {
              res.send(JSON.stringify(data));//普通的json
          }
      }
  });
 
}



 