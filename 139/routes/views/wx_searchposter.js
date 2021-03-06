
var async = require('async');
var format = require('../../query/save_and_get_data_in_MongoDB/resume/format.js');
var keystone = require('keystone'),
    Production = keystone.list('Production');
var config = require('../../public/conf/common.js');

//var config = require('../../public/conf/common.js');
exports = module.exports = function(req, res) {
	var productionid=req.params.productionid;
  var author=req.params.author;
  var crewsId=req.params.crewsId;
	var imagesURL = '';
	console.log(userid);
    Production.model.findOne()
	.where('_id', productionid)
	.select('mediaid')	
	.exec( function(err, ret){
       if(err){
         console.log(err);
       }else{
       	 imagesURL = config.homeEntry.url+'/WX/poster/production/'+ productionid+'/'+ ret.mediaid+'.jpg';
       	 res.render('page_uploadPoster',{
       	 	imagesURL : imagesURL,
          author : author,
          crewsId : crewsId
       	 });
       }
   }); 

}