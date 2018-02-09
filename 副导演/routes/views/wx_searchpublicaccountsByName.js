var keystone = require('keystone');
var User = keystone.list('User');
var PublicAccount = keystone.list('PublicAccount');
var async = require('async');
var urllib = require('url');
var search = require('../../query/save_and_get_data_in_MongoDB/weixin_public_account/search.js');

exports = module.exports = function(req, res) {
  var name = req.params.name;
  var pattern = new RegExp(name, 'i');
  var index = req.params.index;//搜经纪人公众号传入2，副导演公众号传入1
  PublicAccount.model.find()
   .where('nick_name',pattern)
   .where('publicAccountAscription',index)
   .exec(function(err,ret){
      if(err){
         throw new Error(err);
      }else{
      	 search.PublicAccountDetailinfo(ret,function(err,result){
             if(err){
                throw new Error(err);
             }else{
             	console.log(result);
             	//res.send(result);
             	var params = urllib.parse(req.url,true);
		       	if(result.length==0){
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
			          	 var str =  params.query.callback + '(' + JSON.stringify(result) + ')';//jsonp
			        	 res.send(str);	          
			      	} 
			    }
             }
      	 });
      }
   })
}