var keystone = require('keystone'),
	User = keystone.list('User');
	Code = keystone.list('Code');
var session = require('../../node_modules/keystone/lib/session');
var async = require('async');
var urllib = require('url');

// exports = module.exports = function(req, res) {
	
// 	console.log("send securitycodeandpassword");
// 	var data ={};
// 	var params = req.query;
// 	var securitycode = params.securitycode;
// 	var password = params.password;
// 	var telephone = params.telephone;
// 	var data={};
// 	var datetime=(new Date()).getTime();
// 	//var originalpassword = params.originalpassword;



// 	//if(req.method === 'POST'){
//        User.model.findOne({'telephone': telephone})
// 		.exec(function(err, user) {
// 			console.log('=============================================');
// 			console.log(user);
// 			console.log('=============================================');
// 			if (user==null) {
// 				 data.tip=4;
// 				 var params = urllib.parse(req.url,true);
// 				 if (params.query && params.query.callback) {
// 			          	var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
// 			        	res.send(str);
// 			      	} else {
// 			       		res.send(JSON.stringify(data));
// 			      	}
// 			}  
// 			else{       

//          		if(securitycode=='123456'){
//                     user.password = password;
// 					user.save(function (err) {
// 						console.log("step2-3");
// 					    if (err) console.log('Forgot password failed');
// 					    data.tip=3;
// 					    var params = urllib.parse(req.url,true);
// 						if (params.query && params.query.callback) {
// 					          	var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
// 					        	res.send(str);
// 					      	} else {
// 					       		res.send(JSON.stringify(data));
// 					      	}
// 					});	
                   
				
// 				}else{
// 					console.log('验证码错误');
// 			    	 data.tip=2;
// 			         var params = urllib.parse(req.url,true);
// 					 if (params.query && params.query.callback) {
// 				          	var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
// 				        	res.send(str);
// 				     } else {
// 				       		res.send(JSON.stringify(data));
// 				     }

// 				}

// 			}

// 	});

			

// 	//}else{

// 	//	throw new Error("failed  Forgot Password");
// //	}
	
// };

exports = module.exports = function(req, res) {
	
	console.log("send securitycodeandpassword");
	var data ={};
	var params = req.query;
	var securitycode = params.securitycode;
	var password = params.password;
	var telephone = params.telephone;
	var data={};
	var datetime=(new Date()).getTime();
	//var originalpassword = params.originalpassword;



	//if(req.method === 'POST'){
       User.model.findOne({'telephone': telephone})
		.exec(function(err, user) {
			console.log('=============================================');
			console.log(user);
			console.log('=============================================');
			if (user==null) {
				 data.tip=4;
				 var params = urllib.parse(req.url,true);
				 if (params.query && params.query.callback) {
			          	var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
			        	res.send(str);
			      	} else {
			       		res.send(JSON.stringify(data));
			      	}
			}  
			else{       
                Code.model.findOne()
                  .where('telephone',telephone)
                  .where('isUse',true)   
                  .exec(function(err,ret){
                     if(err){
                        throw new Error(err);
                     }else{
                     	console.log(ret);
                     	if(ret!=null){
                          if(ret.expires_in<datetime){//过期
                          	console.log(datetime);
                          	console.log('验证码过期');
                          	    ret.isUse=false;
							    ret.save(function(err){
							    	data.tip=1;
							       var params = urllib.parse(req.url,true);
										if (params.query && params.query.callback) {
									          	var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
									        	res.send(str);
									      	} else {
									       		res.send(JSON.stringify(data));
									      	}
							    })
                               
                         	}else{
                         		if(securitycode==ret.code){
                                    user.password = password;
									user.save(function (err) {
										console.log("step2-3");
									    if (err) console.log('Forgot password failed');
									    data.tip=3;
									    var params = urllib.parse(req.url,true);
										if (params.query && params.query.callback) {
									          	var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
									        	res.send(str);
									      	} else {
									       		res.send(JSON.stringify(data));
									      	}
									});	
                                   
								
								}else{
									console.log('验证码错误');
							    	 data.tip=2;
							         var params = urllib.parse(req.url,true);
									 if (params.query && params.query.callback) {
								          	var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
								        	res.send(str);
								      	} else {
								       		res.send(JSON.stringify(data));
								      	}

								}
                     	    }
                         	
                     	}else{
                     		console.log('验证码无效');
                     		 data.tip=2;
							 var params = urllib.parse(req.url,true);
							if (params.query && params.query.callback) {
						          	var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
						        	res.send(str);
						      	} else {
						       		res.send(JSON.stringify(data));
						      	}
                     	}
                     }
                  })
			}

	});

			

	//}else{

	//	throw new Error("failed  Forgot Password");
//	}
	
};

		
