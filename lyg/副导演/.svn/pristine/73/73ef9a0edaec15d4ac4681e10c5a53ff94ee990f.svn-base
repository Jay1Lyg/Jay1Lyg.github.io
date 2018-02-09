var keystone = require('keystone'),
	TestPicture = keystone.list('TestPicture');
    //CareerInResume = keystone.list('CareerInResume');
var request = require('request');
var fs = require('fs');
var http = require("http");
var path = require("path");
var config = require('../../public/conf/common.js');
var urllib = require('url');


exports = module.exports = function(req, res) {
	console.log(req.body);
	console.log('--------------uploadcareerimage---------------------');
	var item={};
	var date = new Date().getTime();
    var location = '2/'+date+'.jpg';
    var medianame = date+'.jpg';
    var path='images/careerimage/';
    var params = urllib.parse(req.url,true);
    //res.send('success');
    res.header('Access-Control-Allow-Origin', '*');
   // if (req.method == 'OPTIONS') {
	 var careerImage = new TestPicture.model();
	  item.filename=location;
	  item.originalname=medianame;
	  item.path=path;
	  careerImage.images.push(item);
	  careerImage.save(function(err){
	    if(err){
	       throw new Error(err);
	    }else{
	   //       res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
	         // res.on("data", function(chunk){
	         //      imgData+=chunk;
	         //   });
	         //  res.on("end", function(){
	         	if(req.body.imgData == undefined){
                    res.send('fail');
	         	}else{
	         		var imgData = req.body.imgData;
 
	                var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
	         	    var dataBuffer = new Buffer(base64Data, 'base64');
	                 mkdirs(process.cwd()+'/images/careerimage/',function(err){

	                     if (!fs.existsSync(process.cwd()+'/images/careerimage/2')) {
	                         fs.mkdirSync(process.cwd()+'/images/careerimage/2');
	                         console.log('创建成功！');
	                     }else{
	                         console.log('文件路径已经存在，无需创建!');
	                     }
	                      
	                    mkdirs(process.cwd()+'/images/careerimage/2',function(err){
	                        if(err){
	                          throw new Error(err);
	                        }else{
	                           fs.writeFile(process.cwd()+'/images/careerimage/2/'+date+'.jpg', dataBuffer, "binary", function(err){
	                              if(err){
	                                throw new Error(err);
	                                  console.log("down fail");
	                              }else{
	                                  console.log("down success4");
	                                  var imagesURL=config.homeEntry.url+'/WX/career/careerimage/2/'+date+'.jpg';
	                                  var data = {};
	                                  data.imagesURL = imagesURL;
	                                  console.log(imagesURL);
                                      res.send(data);
	                              }
	                           });
	                        }
	                      });
	                    });       
	         	}
	         	  
	    }
	  });
	//}
			
  }

function mkdirs(dirname, callback) {
    fs.exists(dirname, function (exists) {
        if (exists) {
            console.log('存在');
            callback(null);
        } else {
            console.log('不存在，要新建');
              fs.mkdirSync(dirname);
              callback(null);          
        }
    });
}


