var keystone = require('keystone');
var User = keystone.list('User');
var PublicAccount = keystone.list('PublicAccount');
var BoundAgentAndActor = keystone.list('BoundAgentAndActor');
var async = require('async');
var urllib = require('url');
var search = require('../../query/save_and_get_data_in_MongoDB/weixin_public_account/search.js');
var format = require('../../query/save_and_get_data_in_MongoDB/user/format.js');
exports = module.exports = function(req, res) {
	var page = req.params.page;
	var appid = req.params.agent_appid;
	var actors = {};
	var userArray = [];
    BoundAgentAndActor.paginate({
      page: page,
      perPage:10,
      maxPages: 10
     })
     .where('appid',appid)
     .where('allok',true)
     .exec(function(err,ret){
       if(err){
         throw new Error(err);
       }else{
	      actors.currentPage = ret.currentPage;
	      actors.totalPages = ret.totalPages;
	      async.eachSeries(ret.results,function(item,next){
             User.model.findOne()
              .where('_id',item.user_id)  
              .exec(function(err,userinfo){
                 userArray.push(userinfo);
                 next();
              })
	      },function(err){
             if(err){
                throw new Error(err);
             }else{
             	 format.formatPaginateObjUsers(userArray,function(err,usersets){   
    			       if(err){
    			         throw new Error(err); 
    			       }else{
                    actors.results =  usersets;
                    PublicAccount.model.findOne()
                     .where('appid',appid)
                     .exec(function(err,public){
                        if(err){
                           throw new Error(err);
                        }else{
                           actors.nick_name = public.nick_name;
                           actors.head_img = public.head_img;
                            console.log('----------usersets----------');
                            console.log(usersets);
                            console.log('----------userArray----------');
                           var params = urllib.parse(req.url,true);
                           if(actors== null){
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
                                 var str =  params.query.callback + '(' + JSON.stringify(actors) + ')';//jsonp
                                 res.send(str);           
                             } 
                           }
                        }
                     })

    			       }
			        })
             }
	      })
	    }
	})

}