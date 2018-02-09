var keystone = require('keystone');
var PublicAccount = keystone.list('PublicAccount');
var urllib = require('url');

exports = module.exports = function(req, res) {
  var appid = req.params.appid;
  var data = {};
  PublicAccount.model.findOne()
  .where('appid',appid)
  .exec(function(err,public){
     if(err){
       throw new Error(err);
     }else{
     	data.nick_name = public.nick_name;
    	data.head_img = public.head_img;
    	var url = 'http://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+encodeURI(public.ticket);//二维码链接
    	data.QRcodeUrl = url;
    	var params = urllib.parse(req.url,true);
	      if (params.query && params.query.callback) {
	        var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
	        res.send(str);
	      }else{
	         console.log(data);
	         res.send(data);
	      }
     }
  })
}