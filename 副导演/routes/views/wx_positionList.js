var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url');
var async = require('async');
var keystone = require('keystone');
var query = require('../../query/util/downImageToNative.js');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var PublicAccount = keystone.list('PublicAccount');
var ProductionCrews = keystone.list('ProductionCrews');
var CareerInCrew = keystone.list('CareerInCrew');
exports = module.exports = function(req, res) {
  var productionCrew_id = req.params.productionCrew_id;
  var userid = req.params.user_id;
  search.findMorePosition(productionCrew_id,userid, function(err,infomation){
		if(err){
			res.send(err);
		}else{
		   console.log('------------------------------');
		   console.log(infomation);
      var params = urllib.parse(req.url,true);
      if (params.query && params.query.callback) {
        var str =  params.query.callback + '(' + JSON.stringify(infomation) + ')';//jsonp
        console.log('----------------------');
        console.log(str);
        res.send(str);
      }else{
         console.log(infomation);
        res.send(infomation);
      }
		}
  })
  // CareerInCrew.model.find()
  //  .where('crews_object',productionCrew_id)
  //  .where({'expired_date':{$gte:((new Date()).getTime()-3600000*24)}})  //@zheng ¹ýÂË¹ýÆÚµÄÊ±¼ä
  //  .where({'createdAt':{$lt:time}})
  //  .where('publish_create',true)
  //  .where('is_effective',true)
  //  .sort("-createdAt")	
  //  .exec(function(err,ret){
     
  //  })
}