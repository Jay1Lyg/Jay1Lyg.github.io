var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url');
var async = require('async');
var keystone = require('keystone');
var query = require('../../query/util/downImageToNative.js');
var Production = keystone.list('Production');
var config = require('../../public/conf/common.js');


exports = module.exports = function(req, res) {

	var result = [];
    Production.model.find()
    .where('isCreated',true)
    .where('isPost',true)
    .exec(function(err,ret){
       if(err){
         throw new Error(err);
       }else{
       	 async.each(ret,function(item,next){
            var data = {};
            (item.images.length>0) ? (data.production_image = config.homeEntry.url+'/WX/poster/production/' + item._id+'/'+(item.images)[item.images.length-1].originalname) : (data.production_image="") ;
			      (item.compress_images.length>0) ? (data.compress_production_image = config.homeEntry.url+'/WX/poster/compress_production/' + item._id+'/'+(item.compress_images)[item.compress_images.length-1].originalname) : (item.compress_production_image="");
       	    data.productionid = item._id;
       	    result.push(data);
       	    next();
       	 },function(err){
            if(err){
               throw new Error(err);
            }else{
              //res.send(result);
                var params = urllib.parse(req.url,true);
	        	if (params.query && params.query.callback) {
		          	//console.log('请求2:'+params.query);	
		          	 var str =  params.query.callback + '(' + JSON.stringify(result) + ')';//jsonp
		        	 res.send(str);	          
		      	} else{
		      		res.send(JSON.stringify(result));
		      	}
            }
       	 });
       }
    })
}