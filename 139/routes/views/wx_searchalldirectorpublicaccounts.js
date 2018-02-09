var keystone = require('keystone');
var User = keystone.list('User');
var PublicAccount = keystone.list('PublicAccount');
var async = require('async');
var urllib = require('url');
var search = require('../../query/save_and_get_data_in_MongoDB/weixin_public_account/search.js');

exports = module.exports = function(req, res) {
	var data = {};
	var page = req.params.page;
	console.log(req.params);
	PublicAccount.paginate({
		page: page,
		perPage:10,
		maxPages: 10
	})
	.sort('-createdAt')
	.where('publicAccountAscription',1)//副导演
	.exec(function(err,ret){
	   data.currentPage = ret.currentPage;
	   data.totalPages = ret.totalPages;
       if(err){
          throw new Error(err);
       }else{
           search.PublicAccountDetailinfo(ret.results,function(err,publicaccountinfo){
               if(err){
                  throw new Error(err);
               }else{
               	    console.log('step-1');
                    data.results =  publicaccountinfo;
                   // res.send(data);
                    console.log(data);
                    var params = urllib.parse(req.url,true);
			       	if(data==null){
				        //console.log('请求1:'+params);
				        if (params.query && params.query.callback) {
				          	//console.log('请求2:'+params.query);
				          	var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
				        	res.send(str);
				      	} else {
				       		res.send(JSON.stringify({}));//普通的json
				      	}
			        }else{
			        	if (params.query && params.query.callback) {
				          	//console.log('请求2:'+params.query);	
				          	 var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
				        	 res.send(str);	          
				      	} 
				    }
               }
           });
       }
	})

	
}