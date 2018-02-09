var keystone = require('keystone'),
	ActorBudget = keystone.list('ActorBudget'),
	ProductionMatchActor = keystone.list('ProductionMatchActor'),
	Programme = keystone.list('Programme'),
	ProgrammeInCareer = keystone.list('ProgrammeInCareer'),
	Production = keystone.list('Production'),
	ProgrammeInProduction = keystone.list('ProgrammeInProduction');
var async = require('async');
var config = require('../../public/conf/common.js');
var search = require('../../query/save_and_get_data_in_MongoDB/programme/search.js');
var urllib = require('url');

exports = module.exports = function(req, res) {
  //var name = req.params.name;
  // ProductionMatchActor.model.remove()
  // .where('realname',name)
  // .exec(function(err){
  //   if(err){
  //      throw new Error(err);
  //   }else{
  //      res.send('sussess!');
  //   }
  // })
  ProductionMatchActor.model.find()
  .exec(function(err,ret){
     if(err){
        throw new Error(err);
     }else{
     	async.each(ret,function(item,next){
          ProductionMatchActor.model.findByIdAndRemove(item._id, function (err, doc) {              
              if(err){
                 throw new Error(err);
              }else{
                 next();
              }   
          })
     	},function(err){
           res.send('success');
     	})
     }
  })

}