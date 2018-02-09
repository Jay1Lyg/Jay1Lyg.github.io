/*
*
*        公众号消息与事件接收
*
*
*
*/
var keystone = require('keystone');
    User = keystone.list('User');
    User_Openid=keystone.list('User_Openid');
var async = require('async');
var fs = require('fs');
var request1 = require('request-json');
var xml2js  = require('xml2js');
var builder = new xml2js.Builder(); 
 	buildXML = new xml2js.Builder({rootName:'xml',cdata:true,headless:true,renderOpts :{indent:' ',pretty:'true'}}); //用于构建 xml 结构
var parser = new xml2js.Parser();
	crypto = require('crypto');
var request = require('request');
var util = require('../../query/util/util.js');
var aes_crypto = require('../../query/aes_crypto/AesCrypto.js');
var verify_ticket = require('../../query/redis_cache/RedisCache.js');
//var query = require('../../query/get_auth_info/AuthTokenRefreshInfo.js');
var query1 = require('../../query/get_auth_info/AccessTokenRefresh.js');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/DSF_info.json', 'utf-8'));
var request = require('request');
var MongoDB = require('../../query/save_and_get_data_in_MongoDB/weixin_public_account/search.js');
var util = require('../../query/util/util.js');
var http = require('http');
var aes = require('../../query/aes_crypto/AesCrypto.js');
var session = require('../../node_modules/keystone/lib/session');

var demo_appid = "wx570bc396a51b8ff8";//自动化测试的专用测试公众号appid  全网发布时测试用
var demo_Username = "gh_3c884a361561";//自动化测试的专用测试公众号Username 全网发布时测试用
//var weixin = require('weixin-api');
/*
*
*   接收普通消息
* 
*
**/
function getMsgSignature (token,timestamp, nonce, encryptedMsg){
    //将token、timestamp、nonce、cryptedMsg 四个参数进行字典序排序，并拼接成一个字符串
    var tempStr = [token,timestamp,nonce,encryptedMsg].sort().join('');
    //创建加密类型 
    const hashCode = crypto.createHash('sha1');
    //对传入的字符串进行加密
    var resultCode = hashCode.update(tempStr,'utf8').digest('hex'); 
    //将 sha1 加密的签名字符串返回
    return resultCode;
};
function txtMsg (toUser,fromUser,content){
    var xmlContent =  "<xml><ToUserName><![CDATA["+ toUser +"]]></ToUserName>";
        xmlContent += "<FromUserName><![CDATA["+ fromUser +"]]></FromUserName>";
        xmlContent += "<CreateTime>"+ new Date().getTime() +"</CreateTime>";
        xmlContent += "<MsgType><![CDATA[text]]></MsgType>";
        xmlContent += "<Content><![CDATA["+ content +"]]></Content></xml>";
    return xmlContent;
}


/**
*
*   回复图文消息的xml
*   author@zheng
*   params 参考 https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140543
*/
function picTxtMsg (toUser, fromUser, title, description, picurl, url){
	var xmlContent ="<xml><ToUserName><![CDATA["+toUser +"]]></ToUserName>";
	  	xmlContent += "<FromUserName><![CDATA["+ fromUser +"]]></FromUserName>";
	  	xmlContent += "<CreateTime>"+ new Date().getTime() +"</CreateTime>";
	  	xmlContent += "<MsgType><![CDATA[news]]></MsgType>";
	  	xmlContent += "<ArticleCount>1</ArticleCount>";
	  	xmlContent += "<Articles>";
		xmlContent += "<item>";
		xmlContent += "<Title><![CDATA["+title+"]]></Title>";
		xmlContent += "<Description><![CDATA["+description+"]]></Description>";
		xmlContent += "<PicUrl><![CDATA["+picurl+"]]></PicUrl>";
		xmlContent += "<Url><![CDATA["+url+"]]></Url>";
		xmlContent += "<item>";
	  	xmlContent += "</Articles></xml>";
	return xmlContent;
}
Msg = {
	getTextMsg: function (body1, req, res, msgSignature){
		//接收文本消息
		// console.log('------------接收文本消息-------------');
		// var appid = req.params.APPID;
		// var xml_result = txtMsg(body1.FromUserName[0], body1.ToUserName[0],"回复功能还未开启，请耐心等待...");
  //       aes.encrypt(xml_result, info.AppID, function (err1, ret1){
  //       	if(err1){
  //       		throw new Error(err1);
  //       	}else{
  //       		console.log('kkkkkkkkkkkkkkkkkkkkk');
	 //            console.log(ret1);
	 //            console.log('kkkkkkkkkkkkkkkkkkkkk');
  //      			var xml_result1 = getMsgSignature (msgSignature.token, msgSignature.timestamp, msgSignature.nonce, ret1);
  //      			var xml_result2 = buildXML.buildObject({
		// 	        Encrypt: ret1,
		// 	        MsgSignature: xml_result1,
		// 	        TimeStamp: msgSignature.timestamp,
		// 	        Nonce: msgSignature.nonce
		// 	    });  
		// 	    console.log('------------------------------');
  //      			console.log("加密后的结果："+xml_result2);
  //      			console.log('------------------------------');
  //             	res.send(xml_result2);
  				res.send('success');
            
        	//}
       // });

	},
	getImageMsg: function (body1, req, res, msgSignature){
		//接收图片消息
		console.log('------------接收图片消息-------------');
		res.send('success');
	},
	getVoiceMsg: function (body1, req, res, msgSignature){
		//接收语音消息
		console.log('------------接收语音消息-------------');
		res.send('success');
	},
	getVideoMsg: function (body1, req, res, msgSignature){
		//接收视频消息
		console.log('------------接收视频消息-------------');
		res.send('success');
	},
	getShortVideoMsg: function (body1, req, res, msgSignature){
		//接收短视频消息
		console.log('------------接收短视频消息-------------');
		res.send('success');
	},
	getLocationMsg: function (body1, req, res, msgSignature){
		//接收地理位置消息
		console.log('------------接收地理位置消息-------------');
		res.send('success');
	},
	getLinkMsg: function (body1, req, res, msgSignature){
		//接收连接消息
		console.log('--------------接收连接消息---------------');
		res.send('success');
	}
};
/*
*
*      接收事件推送
*
*
*/
Event = {
	getSubscribeEvent: function (body1, req, res, msgSignature){
		//接收订阅事件
		//目前分为两种，主要是普通的订阅和用户未关注时扫描二维码
		var appid = req.params.APPID;

		if(!(body1.EventKey in body1) && !(body1.Ticket in body1)){
			//用户未关注时扫描二维码
			console.log('--------------接收用户未关注时扫描二维码事件---------------');
			MongoDB.buildRelationshipOfFans(appid,body1.FromUserName[0],function(err){
               if(err){
                  res.send(err);
               }else{
               	 res.send('success');
               }
			});
			
		}else{
			console.log('--------------接收订阅事件---------------');
			res.send('success');
		}
	},
	getUnsubscribeEvent: function (body1, req, res, msgSignature){
		//取消订阅事件
		var appid = req.params.APPID;
		console.log('--------------取消订阅事件---------------');
		console.log(body1);
		
		// console.log(body1.FromUserName);
		// console.log(typeof(body1.FromUserName[0]));
		// var openid=JSON.stringify(body1.FromUserName[0])
		// console.log(typeof(openid));
		 var info = (body1.FromUserName)[0];
		 console.log(info);
		MongoDB.removeRelationshipOfFans(appid,body1.FromUserName[0],function(err){
           if(err){
               res.send(err);
           }else{
           	    User_Openid.model.find()
           	     .where('openID', info)
           	     .exec(function(err,ret){
                    if(err){
                      throw new Error(err);
                    }else{
                        console.log(ret);
                        async.each(ret,function(ret1,next){
                          ret1.Status=false;
                          ret1.save(function(err){
                             if(err){
                               throw new Error();
                             }else{
                             	next();
                             }
                          })
                        },function(err){
                            if(err) console.log(err);
                            else{
                            	res.send('success');
                            }
                        });
                    	
                    }
           	     })
 
           	   
               
           }
		});
	},
	getScanEvent: function (body1, req, res, msgSignature){
		//接收扫描事件
		console.log('--------------接收扫描事件---------------');
		res.send('success');
	},
	getLocationEvent: function (body1, req, res, msgSignature){
		//接收上报地理位置事件
		console.log('--------------接收上报地理位置事件---------------');
		res.send('success');
	},
	getClickEvent: function (body1, req, res, msgSignature){
		//接受自定义菜单事件
		console.log('--------------接收自定义菜单事件---------------');
		if((body1.Event)[0] == 'CLICK' && (body1.EventKey)[0] == 'V1001_PIC'){
			console.log('副导演看这');
			var xml_result = picTxtMsg(body1.FromUserName[0], body1.ToUserName[0],"副导演！咱们一起凹凸造型呗！","免费开通你的副导演微信公众平台，自动填报CASTING、自动筛选CASTING，副导演所有“头疼脑热”一键解决！", "http://mmbiz.qpic.cn/mmbiz_jpg/8COjWicebItlOZ1nlSXCAGs3nKKfvJY3Mia5mibe0Tr9ANQxhp4QMxHyUs6bT3j7Cib1wib3Xr2ibPEzVternr4UV0eQ/0","https://mp.weixin.qq.com/s?__biz=MzI1MTc4NjEzNg==&mid=100000001&idx=1&sn=57ed43aa743b3106d29929e8b8b49a4a&chksm=69ece7f65e9b6ee0db70602ba32a460377b0cc080cfde5a3b36bcd9e54c059d7f1952ef20ef5#rd");
	      	aes.encrypt(xml_result, info.AppID, function (err1, ret1){
	        	if(err1){
	        		throw new Error(err1);
	        	}else{
	        		console.log('kkkkkkkkkkkkkkkkkkkkk');
		            console.log(ret1);
		            console.log('kkkkkkkkkkkkkkkkkkkkk');
	       			var xml_result1 = getMsgSignature (msgSignature.token, msgSignature.timestamp, msgSignature.nonce, ret1);
	       			var xml_result2 = buildXML.buildObject({
				        Encrypt: ret1,
				        MsgSignature: xml_result1,
				        TimeStamp: msgSignature.timestamp,
				        Nonce: msgSignature.nonce
				    });  
				    console.log('------------------------------');
	       			console.log("加密后的结果："+xml_result2);
	       			console.log('------------------------------');
	              	res.send(xml_result2);
	        	}
	        });
		}
		
	},
	getViewEvent: function (body1, req, res, msgSignature){
		//接收点击菜单跳链接链接时事件推送
		console.log('--------------接收点击菜单跳链接链接时事件推送-------------------');
		console.log(body1);
       
		res.send('success');
		//res.send(body1.FromUserName);
	},
	getMASSSENDJOBFINISHEvent: function (body1, req, res, msgSignature){
		//接收群发消息时事件推送
		console.log('--------------接收群发消息时事件推送-------------------');
		console.log(body1);
		res.send('success');
		//res.send(body1.FromUserName);
	},
	getTEMPLATESENDJOBFINISH: function (body1, req, res, msgSignature){
		//接收模板消息时事件推送
		console.log('--------------接收群发消息时事件推送-------------------');
		console.log(body1);
		res.send('success');
		//res.send(body1.FromUserName);
	}
};
var EventAndMsgSolve = {
	eventSolve: function (body1, req, res, msgSignature){
		var eventCategory = (body1.Event)[0];
		if(eventCategory == 'subscribe'){
			Event.getSubscribeEvent(body1, req, res, msgSignature);
		}else if(eventCategory == 'unsubscribe'){
			Event.getUnsubscribeEvent(body1, req, res, msgSignature);
		}else if(eventCategory == 'SCAN'){
			Event.getScanEvent(body1, req, res, msgSignature);
		}else if(eventCategory == 'LOCATION'){
			Event.getLocationEvent(body1, req, res, msgSignature);
		}else if(eventCategory == 'CLICK'){
			Event.getClickEvent(body1, req, res, msgSignature);
		}else if(eventCategory == 'VIEW'){
	        Event.getViewEvent(body1, req, res, msgSignature);			
		}else if(eventCategory == 'MASSSENDJOBFINISH'){
			Event.getMASSSENDJOBFINISHEvent(body1, req, res, msgSignature);
		}else if(eventCategory == 'TEMPLATESENDJOBFINISH'){
			Event.getTEMPLATESENDJOBFINISH(body1, req, res, msgSignature);
		}

	},
	msgSolve: function (body1, req, res, msgSignature){
		var MsgType = (body1.MsgType)[0];
		if(MsgType == 'text'){
			Msg.getTextMsg(body1, req, res, msgSignature);
		}else if(MsgType == 'image'){
			Msg.getImageMsg(body1, req, res, msgSignature);
		}else if(MsgType == 'voice'){
			Msg.getVoiceMsg(body1, req, res, msgSignature);
		}else if(MsgType == 'video'){
			Msg.getVideoMsg(body1,req, res, msgSignature);
		}else if(MsgType == 'shortvideo'){
			Msg.getShortVideoMsg(body1, req, res, msgSignature);
		}else if(MsgType == 'location'){
			Msg.getLocationMsg(body1, req, res, msgSignature);
		}else if(MsgType == 'link'){
			Msg.getLinkMsg(body1, req, res, msgSignature);
		}else{
			res.send('success');
		}
	}
};
exports = module.exports = function (req, res) {
	//将推送的消息提取出来进行解密
	//var token="MV_Project";
	//将推送的消息提取出来进行解密
	var token = "MV_Project";
	var signature = req.query.signature;
	var timestamp = req.query.timestamp; 
	var echostr   = req.query.echostr; 
	var nonce     = req.query.nonce;
	var msg_signature = req.query.msg_signature;
	console.log('signature:' +signature +"   timestamp:"+timestamp+"   echostr:"+echostr+"  nonce:"+nonce+"  msg_signature:"+msg_signature);
	
	req.on('data', function (data){
		
		//将二进制码转换成人类看得懂的xml
		console.log("初始的数据："+data);
		var b = new Buffer(data, 'hex');
		var data2 = b.toString('utf8');
		parser.parseString(data2.toString(), function(err, result) {
			if(err){
				throw new Error(err);
			}else{
				console.log('#######################授权成功后接收消息#########################');
				var body = result.xml;
				var ToUserName = (body.ToUserName)[0];
				var Encrypt = (body.Encrypt)[0];
				console.log(body);
				console.log('ToUserName:'+ToUserName);
				console.log('Encrypt:'+Encrypt);
				console.log('######################验证通过后对消息解密########################');
				var oriArray = new Array();
				oriArray[0] = token;
				oriArray[1] = timestamp;
				oriArray[2] = nonce;
				oriArray[3] = Encrypt;
				oriArray.sort();
				var original = oriArray.join('');
				var dev_msg_signature = sha1(original);
				if(dev_msg_signature == msg_signature){
					console.log('消息验证成功！');
					//aes解密
					aes_crypto.decrypt(Encrypt, info.AppID, function(err1, ret1){
						if(err1){
							throw new Error(err1);
						}else{
							console.log('#################微信服务器转发第三方平台的时间推送####################');
							console.log('解密的结果为：');
							console.log(ret1);
							console.log('#######################################################################');
							parser.parseString(ret1.toString(), function(err2, ret2) {
								if(err2){
									throw new Error(err2);
								}else{
									console.log('-------------------------解析的结果为--------------------------');
									console.log(ret2);
									console.log('---------------------------------------------------------------');
									//进行消息分类处理
									var body1 = ret2.xml;
									var MsgType = (body1.MsgType)[0];
									var msgSignature = {};
									msgSignature.token = token;
									msgSignature.timestamp = timestamp;
									msgSignature.nonce = nonce;
									console.log(msgSignature);
									if(MsgType == 'event'){
										if(demo_Username == body1.ToUserName[0] || req.params.APPID == demo_appid){//检测到是全网发布，响应全网发布的逻辑
											var xml_content = (body1.Event)[0]+"from_callback";
											var xml_result = txtMsg(body1.FromUserName[0], body1.ToUserName[0], xml_content);
											aes.encrypt(xml_result, info.AppID, function (err3, ret3){
							                	if(err3){
							                		throw new Error(err3);
							                	}else{
							               			var xml_result1 = getMsgSignature (msgSignature.token, msgSignature.timestamp, msgSignature.nonce, ret3);
							               			var xml_result2 = buildXML.buildObject({
												        Encrypt: ret3,
												        MsgSignature: xml_result1,
												        TimeStamp: msgSignature.timestamp,
												        Nonce: msgSignature.nonce
												    });  
							
							                      	res.send(xml_result2);
							                    
							                	}
							                });

										}else{
											EventAndMsgSolve.eventSolve(body1, req, res, msgSignature);
										}
									}else{
										if(demo_Username == body1.ToUserName[0] || req.params.APPID == demo_appid){//检测到是全网发布，响应全网发布的逻辑
											if(body1.Content[0] == 'TESTCOMPONENT_MSG_TYPE_TEXT' ){
												var xml_result = txtMsg(body1.FromUserName[0], body1.ToUserName[0],"TESTCOMPONENT_MSG_TYPE_TEXT_callback");
												aes.encrypt(xml_result, info.AppID, function (err3, ret3){
								                	if(err3){
								                		throw new Error(err3);
								                	}else{
								               			var xml_result1 = getMsgSignature (msgSignature.token, msgSignature.timestamp, msgSignature.nonce, ret3);
								               			var xml_result2 = buildXML.buildObject({
													        Encrypt: ret3,
													        MsgSignature: xml_result1,
													        TimeStamp: msgSignature.timestamp,
													        Nonce: msgSignature.nonce
													    });  
								
								                      	res.send(xml_result2);
								                    
								                	}
								                });
											}else{
												//解析xml文件，得到query_auth_code
												//if((body1.Content[0]).indexOf('QUERY_AUTH_CODE:')>=0){
													var query_auth_code = (body1.Content[0]).replace('QUERY_AUTH_CODE:', '');
													
													//使用授权码换取公众号的授权信息”API，将$query_auth_code$的值赋值给API所需的参数authorization_code
													async.waterfall([
														function (callback){
															//首先获取comonent_access_token
															verify_ticket.getComponentToken( function (err, ret){
																if(err){
																	throw new Error('获取comonent_access_token失败！');
																}else{
																	console.log(ret);
																	if(!ret){
																		//如果comonent_access_token为空，重新获取
																		verify_ticket.wxauth.getLatestComponentToken( function (err1, ret1){
																			if(err1){
																				throw new Error('获取comonent_access_token失败！');
																			}else{
																				console.log('comonent_access_token已过期，重新获取...');
																				console.log(typeof ret1);
																				console.log(ret1);
																				callback(null, ret1)
																			}
																		});
																	}else{
																		callback(null, ret);
																	}
																	
																}
															});
														}, 
														function (arg, callback){
															var data = {};
															(typeof arg == 'string') ? (data = JSON.parse(arg)) : (data = arg);
															//使用授权码换取公众号的授权信息”API
															
															var auth_access_token_url = 'https://api.weixin.qq.com/cgi-bin/component/api_query_auth?component_access_token='+data.component_access_token;
															var data_result = {
																"component_appid": info.AppID,
																"authorization_code": query_auth_code
															};
															util.sendPostRequest(auth_access_token_url, data_result, function (err1,ret1){
													            if(err1){
													                throw new Error(err1);
													            }else{
													                console.log(ret1);
													                callback(null, ret1);
													           	}
													        });
														},
														function (arg, callback){
															//调用发送客服消息api回复文本消息给粉丝
															var data1 = {};
															(typeof arg == 'string') ? (data1 = JSON.parse(arg)) : (data1 = arg);
									
															var text_url = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='+data1.authorization_info.authorizer_access_token;
															var text_data = {
																"touser": body1.FromUserName[0],
															    "msgtype":"text",
															    "text":
															    {
															         "content": query_auth_code+"_from_api"
															    }
															};
															util.sendPostRequest(text_url, text_data, function (err1,ret1){
													            if(err1){
													                throw new Error(err1);
													            }else{
													                console.log(ret1);
													                callback(null);
													           	}
													        });
														}

													], function (err){
														if(err){
															throw new Error(err);
														}else{
															res.send('');
														}
													});
												//}

											}


										}else{
											EventAndMsgSolve.msgSolve(body1, req, res, msgSignature);
										}
										
									}
									
								}
							});
						}
					});
				}else{
					console.log('消息验证失败！');
					res.send('');
				}
				
			}

		});

	});
}

function sha1(str) {
	 var md5sum = crypto.createHash("sha1");
	 md5sum.update(str);
	 str = md5sum.digest("hex");
	 return str;
 }


