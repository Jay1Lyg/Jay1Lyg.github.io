/**
*author@zheng 
*上传影视海报的接口
*
*/
var keystone = require('keystone'),
  	Production = keystone.list('Production');
var fs = require("fs");
var query = require('../../query/util/savePictureToServer.js');
var config = require('../../public/conf/common.js');

exports = module.exports = function(req, res) {
	var productionid = req.params.production_id;
	//var user_id = req.params.user_id;
	//var appid = req.body.appid;
	var location = productionid+'/'+new Date().getTime()+'.jpg';
	var imgData = req.body.imgData;
    var medianame = new Date().getTime()+'.jpg';
    var path='images/compress_production/';
    var item={};
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    var dataArray = [path,productionid,location,dataBuffer];
    console.log('--------req.params--------');
    console.log(req.params);
    console.log('--------req.params--------');
	query.savePictureToServer(dataArray,function(err){//将图片保存到自己服务器
	     if(err){
	        res.send(err);
	     }else{//将图片保存到数据库
	       Production.model.findOne()
	        .where('_id',productionid)
	        .exec(function(err,ret){
	           if(err){
	              throw new Error(err);
	           }else{
	           	  if(ret.compress_images.length==0){
                       item.filename = location;
		               item.originalname = medianame;
		               item.path = path;
		               ret.compress_images.push(item);
		               ret.save(function(err){
		                  if(err){
		                    res.send(err);
		                  }else{
		                  	var data = {};
		                  	var  imagesURL = config.homeEntry.url+'/WX/poster/compress_production/'+ location;
		                  	data.imagesURL = imagesURL;
		                    res.send(data);
		                  }
		               })
	           	  }else{
		                fs.unlink(process.cwd()+'/images/compress_production/'+productionid+'/'+(ret.images)[0].originalname, function(err) {
		                    if (err) {
		                      return console.error(err);
		                    }
		                    console.log("deleted");
	                		item.filename=productionid+'/'+mediaId+'.jpg'; 
			               	item.originalname=medianame;
			               	item.path=path;
			               	ret.compress_images.shift();
			               	ret.compress_images.push(item);
			               	ret.save(function(err){
			                  if(err){
			                    res.send(err);
			                  }else{
			                  	var data = {};
	                  	        var imagesURL = config.homeEntry.url+'/WX/poster/compress_production/'+ location;
	                  	        data.imagesURL = imagesURL;
	                            res.send(data);
			                  }
			                })
		                });


                        
                   }
	               
	           }
	        })
	     }
  	});

}