var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');

exports = module.exports = function (req, res) {     
	var productionid=req.params.productionid;
  var crewsId=req.params.crewsId;
  var author=req.params.author;
	var url   = config.homeEntry.url+req.url;
	searchUser.getJssdkConfig(url,function(err,ret){
        if(err){
           res.send(err);
        }else{
           console.log(ret);
           res.render('page_uploadPoster',{
			        	productionid : productionid,
                crewsId : crewsId,
                author :author,
			 	        appId : ret.appId,
                timestamp : ret.timestamp,
                nonceStr : ret.nonceStr,
                signature : ret.signature
		       });
       }
  });

};