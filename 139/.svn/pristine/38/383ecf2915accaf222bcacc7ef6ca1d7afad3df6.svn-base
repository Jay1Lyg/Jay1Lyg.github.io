var keystone = require('keystone'),
  Production = keystone.list('Production');

var fs = require("fs");
var query = require('../../query/util/downImageToNative.js');

exports = module.exports = function(req, res) {
  var productionid = req.body.productionid;
  var mediaId = req.body.media;
  var author = req.body.author;
  var crewsId = req.body.crewsId;
  console.log(req.body);
  query.downlodePoster(mediaId,productionid,author,function(err){//从官方服务器下载图片到自己服务器
     if(err){
        res.send(err);
     }else{//将图片保存到数据库
       Production.model.findOne()
        .where('_id',productionid)
        .exec(function(err,ret){
           if(err){
              throw new Error(err);
           }else{
             ret.mediaid=mediaId;
             ret.save(function(err){
                if(err){
                   res.send(err);
                }else{
                  res.redirect('/WX/wx_searchposter/'+productionid+'/'+author+'/'+crewsId);
                }
             });
           }
        })
     }
  });

}