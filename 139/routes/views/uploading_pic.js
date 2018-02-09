var keystone = require('keystone');
var fs = require('fs');
var query = require('../../query/get_auth_info/AuthTokenRefreshInfo.js');
var util = require('../../query/util/util.js');
var child_process = require("child_process");
var formidable = require('formidable'); 
exports = module.exports = function (req, res) {
	console.log('上传素材接口...');
	var imgUrl = req.files.pic.path;
	console.log(imgUrl);
	var form = new formidable.IncomingForm();
	form.uploadDir = '/../../images/image_text/';   //文件保存在系统临时目录
	form.maxFieldsSize = 1 * 1024 * 1024;  //上传文件大小限制为最大1M
	form.keepExtensions = true;        //使用文件的原扩展名
	var targetDir = path.join(__dirname, './../../images/image_text');
  	// 检查目标目录，不存在则创建
	fs.access(targetDir, function(err){
	    if(err){
	      fs.mkdirSync(targetDir);
	    }
	    _fileParse();
	});
	// var file = process.cwd()+'/images/image-text/'+req.body.pic;
 //    var media t= fs.createReadStream(file);//读取图片文件
	// query.JudgeAuthToken("wx1beb5bae19621613",function(err,ret){
 //     	if(err){
 //      		 throw new Error(err);
 //      	}else{
 //        	console.log(ret.authorizer_access_token);
 //        	var formData = {
	// 	     	'media': media
	// 	  	};
 //        	util.sendPostRequest('https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token='+ret.authorizer_access_token, formData, function (err, body){
 //          	if(err){
 //            	throw new Error(err);
 //          	}else{
 //            	console.log(body);
 //            	res.send(body);
 //          	}
 //        });
 //      }
 //    });
}