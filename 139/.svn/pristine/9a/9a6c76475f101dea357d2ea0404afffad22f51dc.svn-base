var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
var config = require('../../public/conf/common.js');
exports = module.exports = function (req, res) {
  var url   = config.homeEntry.url+req.url;
  var userid=req.params.userid;
  var appid=req.params.appid;
  var index=req.params.index;
  console.log('------params------');
  console.log(req.params);
  console.log('------params------');
  searchUser.getJssdkConfig(url,appid,function(err,ret){
     if(err){
          throw new Error(err);
     }else{
        res.render('page_addNewActors', {
            userid : userid,
            appId: ret.appId,
            timestamp: ret.timestamp,
            nonceStr: ret.nonceStr,
            signature: ret.signature,
            index : index
        });
     }
    

  })
};