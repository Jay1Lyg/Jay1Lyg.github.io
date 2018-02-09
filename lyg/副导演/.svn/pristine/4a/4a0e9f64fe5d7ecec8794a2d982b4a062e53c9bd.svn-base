var keystone = require('keystone');
var keystone = require('keystone');
var PublicAccount = keystone.list('PublicAccount');
var config = require('../../public/conf/common.js');
var fs = require('fs');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/DSF_info.json', 'utf-8'));

exports = module.exports = function (req, res) {
	console.log(req.body);
    var appid = req.body.appid;
    var index=0;
    PublicAccount.model.findOne()
    .where('appid',appid)
    .exec(function(err,ret){
       if(err){
          throw new Error(err);
       }else{
       	console.log(ret);
       	  if(ret==null){
            res.render('page_getappidForDirector',{
				appid: appid,
				index: 2
			});
       	  }else{
            var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+encodeURIComponent(config.homeEntry.url+'/WX/wx_bindOperatorForDirector')+'&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid='+info.AppID+'#wechat_redirect';
			res.render('page_OperatorAuthority',{
				url: url
			});
       	  }
       }
    })
	//res.send(url);
}