/**
*
*  author@zheng
*上传海报的页面
*
*
*/
var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
var query = require('../../query/util/downImageToNative.js');
var Production = keystone.list('Production');
var config = require('../../public/conf/common.js');

exports = module.exports = function (req, res) {  
	console.log('可以上传海报了'+req.params.openid);   
	var user_id = req.params.user_id;
	var production_id = req.params.production_id;
	var production_crews_id = req.params.production_crews_id;
	var appid = req.params.appid;
    //var firstCreate = req.params.firstCreate;

	var url = config.homeEntry.url+req.url;
	 query.getAppid(user_id,function (err1,ret1){
	       if(err1){
	          throw new Error(err1);
	       }else{
				searchUser.getJssdkConfig(url,appid,function(err,ret){
					if(err){
						throw new Error(err);
					}else{
						Production.model.findOne()
				        .where('_id',production_id)
				        .exec(function (err1,ret2){
				           if(err1){
				              throw new Error(err1);
				           }else{
				           	  if(ret2.images.length==0 || ret2.images == null || ret2.images == undefined){
				           	  	    var firstCreate=true;
				                    res.render('page_posterInfo',{
									     production_id : production_id,
									     production_crews_id : production_crews_id,
									     appId: appid,
							             timestamp: ret.timestamp,
							             nonceStr: ret.nonceStr,
							             signature: ret.signature,
							             user_id: user_id,
							             imagesURL: "",
							             openid: req.params.openid,
							             firstCreate:firstCreate
								    });
				           	  }else{
				                  	var  imagesURL = config.homeEntry.url+'WX/poster/production/'+ production_id+'/'+ (ret2.images)[0].originalname;
                                    var firstCreate=false;
				                  	res.render('page_posterInfo',{
									     production_id : production_id,
									     production_crews_id : production_crews_id,
									     appId: appid,
							             timestamp: ret.timestamp,
							             nonceStr: ret.nonceStr,
							             signature: ret.signature,
							             user_id: user_id,
							             imagesURL: imagesURL,
							             openid: req.params.openid,
							             firstCreate:firstCreate
								    });
				             
				               }
				               
				           }
				        })
				    }
						
					
				});
		   }
	  })
	

};



