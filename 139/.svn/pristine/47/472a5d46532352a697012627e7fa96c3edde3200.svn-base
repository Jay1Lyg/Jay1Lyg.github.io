var keystone = require('keystone');
var PDF_Skill = keystone.list('PDF_Skill');
var PDF_CareerInResume = keystone.list('PDF_CareerInResume');
var PDF_Production = keystone.list('PDF_Production');
var PDF_Role = keystone.list('PDF_Role');
var PDF_User = keystone.list('PDF_User');
var urllib = require('url');
var search = require('../../query/save_and_get_data_in_MongoDB/actor/search.js');

exports = module.exports = function(req, res) {
	 var appid = req.params.appid;
	 var page = req.params.page;
	 var actor = {};
	  PDF_User.paginate({
		page: page,
		perPage:perpage,
		maxPages: 10
	  })
	 .where('appid',appid)
	 .sort('-createdAt ')
	 .exec( function(err, ret){
       if(err){
          throw new Error(err);
       }else{
       	  actor.currentPage = ret.currentPage;
  		    actor.totalPages = ret.totalPages;
            search.searchImportActorLists(ret.results,function(err,users){
              if(err){
                throw new Error(err);
              }else{
                 var params = urllib.parse(req.url,true);
                 actor.results = users;
                 if(actor== null){
                   if (params.query && params.query.callback) {
                      //console.log('请求2:'+params.query);
                      var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
                      res.send(str);
                   }else {
                      res.send(JSON.stringify({}));//普通的json
                   }
                 }else{
                   if (params.query && params.query.callback) {
                        //console.log('请求2:'+params.query); 
                       var str =  params.query.callback + '(' + JSON.stringify(actor) + ')';//jsonp
                       res.send(str);           
                   } 
                }
              }     
            });
       }
	})
	

};