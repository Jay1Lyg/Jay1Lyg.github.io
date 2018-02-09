
var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
var query = require('../../query/util/downImageToNative.js');
var config = require('../../public/conf/common.js');

exports = module.exports = function (req, res) {     
	var userid=req.params.userid;
  console.log(userid);
	var url   = config.homeEntry.url+req.url;


         searchUser.getJssdkConfig(url,req.params.appid,function(err,ret){
              if(err){
                 res.send(err);
              }else{
                 console.log(ret);
                 res.render('page_add_work',{
                      userid : userid,
                      appId : ret.appId,
                      timestamp : ret.timestamp,
                      nonceStr : ret.nonceStr,
                      signature : ret.signature
                 });
             }
        });
	

};
