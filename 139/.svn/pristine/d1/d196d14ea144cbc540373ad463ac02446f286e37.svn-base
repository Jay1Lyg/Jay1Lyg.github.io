var keystone = require('keystone'),
	User = keystone.list('User');
	Code = keystone.list('Code');
	User_Openid=keystone.list('User_Openid');
var session = require('../../node_modules/keystone/lib/session');
var async = require('async');
var redis = require('../../query/redis_cache/RedisCache.js');


// exports = module.exports = function(req, res) {
	
// 	console.log("send securitycodeandpassword");
// 	var data ={};
// 	var code;
// 	var params = req.body;
// 	var params1 = req.params;
// 	var securitycode = params.securitycode;
// 	var password = params.password;
// 	var telephone = params.telephone;
// 	var openid=params.openid;
// 	var appid=params.appid;
// 	var index=params.index;
// 	console.log(securitycode);
// 	console.log(password);
// 	console.log(telephone);
// 	console.log(params);
// 	var datetime=(new Date()).getTime()/1000;
// 	var user_tel = telephone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');


// 		if(req.method === 'POST'){
// 		 if(securitycode==undefined||password==undefined||telephone==undefined||openid==undefined||appid==undefined||index==undefined){
//             // throw new Error
//             res.status(403).send('parameter undefined');
//             //res.send
// 		 }
//          if(params.telephone==''||params.password==''||params.securitycode==''){
//             console.log('用户名或密码或验证码不能为空');
//             res.render('page_register',{
//                       	 telephone:telephone,
//                       	 password:password,
//                       	 openid:openid,
//                       	 appid : appid,
//                       	 index:index,
//                       	 status:'4'//用户名或密码或验证码不能为空
//                       });

//          }else{

// 			User.model.findOne({'telephone': telephone})
// 				.exec(function(err, user) {
// 					if(user == null){             
//                  		if(securitycode=='123456'){
                            
//                         	User.model.create({telephone: telephone,name: "User_"+user_tel,password:password,email:"User_"+user_tel+'@qq.com'},function(err,ret1){
//                                if(err){
//                                  throw new Error(err);
//                                }else{

//                                  User_Openid.model.create({openID:openid,userid:ret1._id},function(err,ret2){
//                                     if(err){
//                                         throw new Error(err);
//                                     }else{
//                                     	console.log('step3');
//                                     	ret1.openIDArray.push(ret2._id);
//                                     	ret1.save(function(err){
// 			                              res.redirect('/WX/page_signin/'+index+'/'+openid+'/'+appid);
//                                    	   })
                                       
//                                    }
//                         	    })
//                                }
//                              })
                           
						
// 						}else{
// 							console.log('验证码错误');
//                              res.render('page_register',{
//                               	 telephone:telephone,
//                               	 password:password,
//                               	 openid:openid,
//                               	 appid : appid,
//                               	 index:index,
//                               	 status:'2'//验证码错误
//                               });

// 						}

// 					}else{
						
//                               		console.log('用户已经存在');
//                                     res.render('page_register',{
// 			                              	 telephone:telephone,
// 			                              	 password:password,
// 			                              	 openid:openid,
// 			                              	 appid : appid,
// 							                 index:index,
// 			                               	 status:'3'//用户已经存在
// 					                   });

// 					}

// 			});
// 		  }
// 		}else{

// 			throw new Error("Not Accept Get Method of getsecuritycode");
// 		}

	
// }



exports = module.exports = function(req, res) {
	
	console.log("send securitycodeandpassword");
	var data ={};
	var code;
	var params = req.body;
	var params1 = req.params;
	var securitycode = params.securitycode;
	var password = params.password;
	var telephone = params.telephone;
	var openid=params.openid;
	var appid=params.appid;
	var index=params.index;
	console.log(securitycode);
	console.log(password);
	console.log(telephone);
	console.log(params);
	var datetime=(new Date()).getTime()/1000;
	var user_tel = telephone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');


		if(req.method === 'POST'){
         if(params.telephone==''||params.password==''||params.securitycode==''){
            console.log('用户名或密码或验证码不能为空');
            res.render('page_register',{
                      	 telephone:telephone,
                      	 password:password,
                      	 openid:openid,
                      	 appid : appid,
                      	 index:index,
                      	 status:'4'//用户名或密码或验证码不能为空
                      });

         }else{

			User.model.findOne({'telephone': telephone})
				.exec(function(err, user) {
					if(user == null){             
                        Code.model.findOne()
                          .where('telephone',telephone)
                          .where('isUse',true)   
                          .exec(function(err,ret){
                             if(err){
                                throw new Error(err);
                             }else{
                             	console.log('=====================ret========================');
								console.log(ret);
								console.log('=====================ret========================');
                             	if(ret!=null){
                                  if(ret.expires_in<datetime){//过期
                                  	console.log('验证码过期');
                                  	    ret.isUse=false;
									    ret.save(function(err){
									      res.render('page_register',{
			                              	 telephone:telephone,
			                              	 password:password,
			                              	 status:'1'//验证码过期
			                              });
									    })
	                                   
	                             	}else{
	                             		if(securitycode==ret.code){
                                            
                                        	User.model.create({telephone: telephone,name: "User_"+user_tel,password:password,email:"User_"+user_tel+'@qq.com'},function(err,ret1){
                                               if(err){
                                                 throw new Error(err);
                                               }else{

                                                 User_Openid.model.create({openID:openid,userid:ret1._id},function(err,ret2){
	                                                if(err){
	                                                    throw new Error(err);
	                                                }else{
	                                                	console.log('step3');
	                                                	ret1.openIDArray.push(ret2._id);
	                                                	ret1.save(function(err){
	                                    //                   res.render('page_signin',{
							                              // 	 index : index,
							                              // 	 openid : openid,
							                              // 	 appid : appid
							                              // }); /WX/page_signin/:index?/:openid/:appid
							                              //res.redirect();
							                              res.redirect('/WX/page_signin/'+index+'/'+openid+'/'+appid);
	                                               	   })
	                                                   
	                                               }
                                        	    })
                                               }
                                             })
                                           
										
										}else{
											console.log('验证码错误');
		                                     res.render('page_register',{
				                              	 telephone:telephone,
				                              	 password:password,
				                              	 openid:openid,
				                              	 appid : appid,
				                              	 index:index,
				                              	 status:'2'//验证码错误
				                              });

										}
                             	    }
	                             	
                             	}else{
                             		console.log('验证码无效');
                             		res.render('page_register',{
				                              	 telephone:telephone,
				                              	 password:password,
				                              	 openid:openid,
				                              	 appid : appid,
				                              	 index:index,
				                              	 status:'2'//验证码无效
				                              });
                             	}
                             }
                          })
					}else{
						
                              		console.log('用户已经存在');
                                    res.render('page_register',{
			                              	 telephone:telephone,
			                              	 password:password,
			                              	 openid:openid,
			                              	 appid : appid,
							                 index:index,
			                               	 status:'3'//用户已经存在
					                   });

					}

			});
		  }
		}else{

			throw new Error("Not Accept Get Method of getsecuritycode");
		}

	
}

