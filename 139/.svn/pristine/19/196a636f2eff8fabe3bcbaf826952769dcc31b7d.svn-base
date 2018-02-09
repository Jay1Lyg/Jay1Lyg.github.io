var keystone = require('keystone'),
    Production = keystone.list('Production');
var urllib = require('url');
var config = require('../../public/conf/common.js');

exports = module.exports = function(req, res) {
	var productionid = req.params.productionid || '';
	var userid = req.params.userid || '';
	var appid = req.params.appid || '';
	var openid = req.params.openid || '';
	var production_crews_id = req.params.production_crews_id || '';
	Production.model.findOne()
	 .where('_id',productionid)
	 .exec(function(err,ret){
       if(err){
         throw new Error(err);
       }else{
         ret.isPost = true;
         ret.save(function(err){
           if(err){
              throw new Error(err);
           }else{
              //var url=config.homeEntry.url+"/WX/testTemplateMsg/"+userid+"/"+appid+"/"+openid+"/"+production_crews_id;
              //res.redirect("/WX/page_allpositions/"+userid+'/'+appid+'/'+openid);
              //var url=config.homeEntry.url+"/WX/page_allpositions/"+userid+"/"+appid+"/"+openid;
              var url=config.homeEntry.url+"/WX/page_crewlistformatching/"+production_crews_id+"/"+userid;
              res.send(url);
              //res.send({"isOK": true,"url":config.homeEntry.url+"/WX/testTemplateMsg/"+userid+"/"+appid+"/"+openid+"/"+production_crews_id});
           }
         })
       }
	 })
}