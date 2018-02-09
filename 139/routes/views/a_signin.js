
var keystone = require('keystone');
    User = keystone.list('User');
	User_Openid=keystone.list('User_Openid');
	BoundUserAndPublic = keystone.list('BoundUserAndPublic');
	PublicAccount = keystone.list('PublicAccount');
var session = require('../../node_modules/keystone/lib/session');
var config = require('../../public/conf/common.js');
var urlModule = require('url');
var _ = require('underscore');
var async = require('async');
exports = module.exports = function(req, res) {
	// If a form was submitted, process the login attempt
	if (req.method === 'POST') {
		// console.log(req);
		var locals = {
			// csrf_header_key: keystone.security.csrf.CSRF_HEADER_KEY,
			// csrf_token_key: keystone.security.csrf.TOKEN_KEY,
			csrf_token_value: keystone.security.csrf.getToken(req, res),
			// csrf_query: '&' + keystone.security.csrf.TOKEN_KEY + '=' + keystone.security.csrf.getToken(req, res),
		};

        var index=req.body.index;
        console.log(req.body);
        var data={};
		var onSuccess = function (user) {
			locals.username = user.name;
			locals.user_id = user._id;
			locals.user_role = user.role;
			locals.telephone = user.telephone;
			locals.id_number = user.id_number;
			locals.realname = user.realname;
			//console.log(user.password==req.body.password);
			console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN');
			console.log(req.body.openid);
			console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN');


			async.waterfall([
				function(callback){//经纪人公众号注册的用户标记为经纪人
                   User.model.findOne()
                    .where('_id',user._id)
                    .exec(function(err,ret){
                       if(err){
                         throw new Error(err);
                       }else{
                         ret.if_agent=true;
                         ret.save(function(err){
                            callback(null);
                         });
                       }
                    })

				},
				function (callback){
					PublicAccount.model.findOne()
					.where('appid', req.body.appid)
					.exec( function (err, ret){
						if(err){
							throw new Error(err);
						}else{
							var auth_appid = ret._id;
							BoundUserAndPublic.model.findOne()
				            .where('openID', req.body.openid)
				            .where('appid', auth_appid)
				            .where('isSub',true)
				            .exec( function (err, ret){
				                if(err){
				                   throw new Error(err);
				                }else{  
				                   if(ret == null){
				                        BoundUserAndPublic.model.create({
				                            openID: req.body.openid,
				                            appid: auth_appid,
				                            isSub: true
				                        },
				                        function (err1, ret1){
				                            if(err1){
				                                throw new Error(err1);
				                            }else{
				                                 var is_click = ret1.isOperator;
				                                 callback(null, is_click);
				                            }
				                        });
				                    }else{ 
				                        var is_click = ret.isOperator;
				                        callback(null, is_click);                  
				                    }
				                }
				            }); 
						}
					});

				},
				function (is_click, callback){
					 User_Openid.model.findOne()
					   .where('openID',req.body.openid)
					   .where('userid',user._id)
					   .exec(function(err,ret){
		                  if(err){
		                    throw new Error(err);
		                  }else{
		                  	if(ret==null){//在其他公众号注册或者App用户,需要将user与openid关联起来
		                  		console.log('step1-1');
		                  		console.log('在其他公众号注册或者App用户,需要将user与openid关联起来');
		                  		User_Openid.model.create({openID:req.body.openid,userid:user._id,Status:true},function(err,ret1){
		                             if(err){
		                                throw new Error(err);
		                             }else{
		                             	User.model.findOne() 
		                             	 .where('telephone',user.telephone)
		                             	 .exec(function(err,ret2){
		                                    if(err){
		                                       throw new Error(err);
		                                    }else{
		                                    	console.log('step1-2');
		                                    	ret2.openIDArray.push(ret1._id);
		                                    	//ret2.Status=true;
		                                    	ret2.save(function(err){
		                                    	 if(is_click == true){
			                                          if(index=='1'){
											               var url='/agent/a_page_CrewLists/'+user._id+'/'+req.body.appid;
											               res.redirect(url);
														}if(index=='2'){
											               var url='http://www.baidu.com';
											               res.redirect(url);
														}if(index=='3'){
														   var url='http://www.baidu.com';
														   res.redirect(url);
											               
														}if(index=='4'){
											               var url='http://www.baidu.com';
											               res.redirect(url);
														}if(index=='5'){
											               var url='http://www.baidu.com';
											               res.redirect(url);
														}if(index=='6'){
															
															var url='http://www.baidu.com';
										               		res.redirect(url);
						
														}if(index=='7'){
		                                                  var url='http://www.baidu.com';
											               res.redirect(url);
														}if(index=='8'){
														  var url = '/agent/a_page_PublicAccountsListsUderAgent/'+user._id+'/'+req.body.appid;
														}
												 }else{
												 	var url=config.homeEntry.url+'/agent/a_page_actorList/'+user._id+'/'+req.body.appid;//不是管理员，跳到旗下艺人页面
											        res.redirect(url);
												 }
													
		                                    	})
		                                    }
		                             	 })
		                             }
		                  		})
		                     
		                  	}else{//
		                  		console.log('step1-3');
		                  		User_Openid.model.find()
		                  		 .where('openID',req.body.openid)
		                  		 .exec(function(err,ret){
		                  		 	console.log('pppppppppppppppkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
		                  		 	console.log(ret);

		                            async.each(ret,function(item,next){
		                            	if(item.userid!=user._id){
		                                   item.Status=false;
		                                   item.save(function(err){
                                             next();
		                                   }) 
		                            	}else{
		                                    item.Status=true;
		                                    item.save(function(err){
                                              next();
		                                    })
		                            	}
		                               
		                            },function(err){
		                               if(err){
		                                   throw new Error(err);
		                               }else{
		                               	  if(is_click == true){
	                                          if(index=='1'){
									               var url='http://www.baidu.com';
									               res.redirect(url);
												}if(index=='2'){
									               var url='http://www.baidu.com';
									               res.redirect(url);
												}if(index=='3'){
												   var url='http://www.baidu.com';
												   res.redirect(url);
									               
												}if(index=='4'){
									               var url='http://www.baidu.com';
									               res.redirect(url);
												}if(index=='5'){
									               var url='http://www.baidu.com';
									               res.redirect(url);
												}if(index=='6'){
													
													var url='http://www.baidu.com';
								               		res.redirect(url);
				
												}if(index=='7'){
                                                  var url='http://www.baidu.com';
									               res.redirect(url);
												}if(index=='8'){
												  var url = '/agent/a_page_PublicAccountsListsUderAgent/'+user._id+'/'+req.body.appid;
												}
										  }else{
										 		var url= config.homeEntry.url+'/agent/a_page_actorList/'+user._id+'/'+req.body.appid;//不是管理员，跳到旗下艺人页面
											    res.redirect(url);
										  }

		                               }
		                            })
		                  		 })

		                  		

		                  	}
		                  }
					   })



				}
			]);
			
		};

		var onFail = function (err) {
			res.render('page_signin',{
				 index : index,
              	 openid : req.body.openid,
              	 appid : req.body.appid,
				 status:false
			});
		};

		session.signin(req.body, req, res, onSuccess, onFail);
	} else {
		throw new Error("Not Accept Get Method of Signin");
	}
};
