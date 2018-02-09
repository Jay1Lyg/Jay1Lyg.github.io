/*
*
*
*        微信第三方平台的授权认证
*       公众号加解密symmetric_key：sajoi9ssid3iosa935nkJsndHa398danoasuo833hoh
*
*/
var keystone = require('keystone');
var fs = require('fs');
var request1 = require('request-json');
var xml2js  = require('xml2js');
var builder = new xml2js.Builder(); 
var parser = new xml2js.Parser();
	crypto = require('crypto');
// var express = require('express');
// var router = express.Router();
var request = require('request');
var aes_crypto = require('../../query/aes_crypto/AesCrypto.js');
var verify_ticket = require('../../query/redis_cache/RedisCache.js');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/DSF_info.json', 'utf-8'));
//根据InfoType不同调用方法
var EventFunction = {
	//InfoType:component_verify_ticket
	save_component_verify_ticket: function(component_verify_ticket, res) {
		verify_ticket.verifyTicketCache(component_verify_ticket);
		res.send('success');
	}
}

exports = module.exports = function (req, res) {
	
	//将推送的消息提取出来进行解密
	var token="MV_Project";
	var signature = req.query.signature;
	var timestamp = req.query.timestamp; 
	var echostr   = req.query.echostr; 
	var nonce     = req.query.nonce;
	var msg_signature = req.query.msg_signature;
	console.log('signature:' +signature +"   timestamp:"+timestamp+"   echostr:"+echostr+"  nonce:"+nonce+"  msg_signature:"+msg_signature);
	

	req.on('data', function (data){
		//console.log(data);
		//将二进制码转换成人类看得懂的xml
		
		var b = new Buffer(data, 'hex');
		var data2 = b.toString('utf8');
		parser.parseString(data2.toString(), function(err, result) {
			if(err){
				console.log(err);
				res.send('');
			}else{
				console.log('============================每十分钟收到消息如下=============================');
				var body = result.xml;
				var corpID = (body.AppId)[0];
				var Encrypt = (body.Encrypt)[0];
				console.log('corpID:'+corpID);
				console.log('Encrypt:'+Encrypt);
				console.log('============================验证通过后对消息解密=============================');
				var oriArray = new Array();
				oriArray[0] = token;
				oriArray[1] = timestamp;
				oriArray[2] = nonce;
				oriArray[3] = Encrypt;
				oriArray.sort();
				var original = oriArray.join('');
				console.log('---------original-------------');
				console.log(original);
				console.log('---------original-------------');
				var dev_msg_signature = sha1(original);
				if(dev_msg_signature == msg_signature){
					console.log('消息验证成功！');
					//aes解密
					aes_crypto.decrypt(Encrypt, info.AppID, function(err1, ret1){
						if(err1){
							console.log('解密失败...');
							res.send('');
						}else{
							console.log('====================每十分钟收到微信服务器推送的消息===================');
							console.log('解密的结果为：');
							console.log(ret1);
							console.log('=======================================================================');
							parser.parseString(ret1.toString(), function(err2, ret2) {
								if(err2){
									console.log(err2);
									res.send('');
								}else{
									console.log('------------解析XML文件得到的字段-------------');
									var info1 = ret2.xml;
									var InfoType = (info1.InfoType)[0];
									
									console.log('InfoType:'+InfoType);
									if(InfoType == 'component_verify_ticket'){
										var ComponentVerifyTicket = (info1.ComponentVerifyTicket)[0];
										console.log('ComponentVerifyTicket:'+ComponentVerifyTicket);
										console.log('----------------------------------------------');
										EventFunction.save_component_verify_ticket(ComponentVerifyTicket, res);
									}else if(InfoType =='updateauthorized'){
										console.log('授权发生变更');
										console.log('----------------------------------------------');
										res.send('success')
									}else{
										console.log('*********************授权通知*************************');
										console.log(info1);
										res.send('success');
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
};


function sha1(str) {
	 var md5sum = crypto.createHash("sha1");
	 md5sum.update(str);
	 str = md5sum.digest("hex");
	 return str;
 }
