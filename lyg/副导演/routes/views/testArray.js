var keystone = require('keystone');
var User = keystone.list('User');
var PublicAccount = keystone.list('PublicAccount');
var async = require('async');
exports = module.exports = function (req, res) {
    PublicAccount.model.findOne()
    .where('appid','wx1beb5bae19621613')
    .exec(function(err,ret){
      if(err){
         throw new Error(err);
      }else{
         User.model.find()
         .where('allok',true)
         .exec(function(err,ret2){
            if(err){
              throw new Error(err);
            }else{
              async.each(ret2,function(item,next){
                  User.model.findOne()
                   .where('_id',item._id)
                   .exec(function(err,ret1){
                      if(err){
                        throw new Error(err);
                      }else{
                         ret1.appid.push(ret._id);
                         console.log(ret._id);
                         // ret1.save(function(err){
                         //   if(err){
                         //     throw new Error(err);
                         //   }else{
                         //     next();
                         //   }
                         // })
                      }
                   })
              },function(err){
                 if(err){
                   throw new Error(err);
                 }else{
                   res.send('success!');
                 }
              });
            }
         })
      }
    })
}