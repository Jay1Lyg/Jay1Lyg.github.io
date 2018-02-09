/**
*
*
*        aes解密测试
*
*
*
*/
var keystone = require('keystone');
var fs = require('fs');
var request1 = require('request-json');
var xml2js  = require('xml2js');
var builder = new xml2js.Builder(); 
var parser = new xml2js.Parser();
	crypto = require('crypto');
var express = require('express');
var router = express.Router();
var request = require('request');
var CryptoJS = require("crypto-js");
var urllib = require('url');
var PublicAccount = keystone.list('PublicAccount');
var aes_key = new Buffer('sajoi9ssid3iosa935nkJsndHa398danoasuo833hoh'+'=', 'base64');
var iv = aes_key.slice(0, 16);
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/OfficialAccountsInfo.json', 'utf-8'));
var query = require('../../query/get_auth_info/AuthTokenRefreshInfo.js');
var util = require('../../query/util/util.js');
CareerInCrew = keystone.list('CareerInCrew');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var query1 = require('../../query/get_auth_info/AuthTokenRefreshInfo.js');
var async = require('async');
var WechatAPI = require('open-wechat-api');
exports = module.exports = function (req, res) {
// 	console.log('aes解密算法算法执行中。。。。');
// var info = (JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/WX_ServerrNO_info.json', 'utf-8')))[0];
// console.log('info:'+info.AppID);
// var key = "12345678"     //秘钥必须为：8/16/32位
// var message = "我就是大神";

// //加密
// var encrypt = CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(key), {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7
// });
// console.log("value1: "+encrypt);

// //解密
// var decrypt = CryptoJS.AES.decrypt(encrypt, CryptoJS.enc.Utf8.parse(key), {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7
// });
// console.log("value2: "+decrypt.toString(CryptoJS.enc.Utf8));

// var client = require('../../query/redis_cache/RedisConfig.js');




// 	console.log('aes_key:'+CryptoJS.enc.Utf8.parse(aes_key));
// 	/*解密*/
// 	var data = "Vu2tbNadAszNlYSbJEGESvuSNj347TcanmnhVEzxDuHKxAWG9J5i0A0HHK/MNJ5TY4gpg470"+
// 				"vZTaD5fcpKvIiNaVu4UZFdypvLnnGlbmfLCouM5E/gp9LL0XsKvfm12JyUcXovKIveAuaYgrz9Rz8WxD"+
// 				"6rJI8tcT3RO6zvZpBoZ0srn7+Y2Oc39QBaDtWPnWUneXf0nBARjHLjFTKrFnLWBKhkAfqckdUx0C1F1p"+
// 				"8rIvryWDgHtAdpe8npOYc7kRcK4mEJ6nS8wutC263L5wtJsOGfht0X8Ce+ubG0fNqvlIH57sbgzpac/K"+
// 				"7tuyBGDf6uLREyNQzfSOkzDgvK40/q2NeTUmiK/zfNzmBX3jTTN/QydccnCFcD9jMalftzV/jH9d8nWl"+
// 				"itGOWyQCNz/ptWBp2J7gzF9Pqkt/OIX+aOdzRRxQXYkS2IE3/Ts6+SC9yO7SU/J56BSj8BFX33ctXA=="
				
// 	// var message = new Buffer(data, 'base64');
// 	// var s = message.toString('hex');
// 	// var bytes_msg  = CryptoJS.AES.decrypt(s, aes_key);
// 	// console.log('解密的结果：'+bytes_msg);

// 	var aesCipher = crypto.createDecipheriv("aes-256-cbc", aes_key, iv);
//     aesCipher.setAutoPadding(false);
//     var decipheredBuff = Buffer.concat([aesCipher.update(data, 'base64'), aesCipher.final()]);
//     decipheredBuff = PKCS7Decoder(decipheredBuff);


    // client.set("component_verify_ticket",'component_verify_ticket', client.print);
    // client.expire('component_verify_ticket', 3);
    // client.get('component_verify_ticket', function(err, reply) {
    //     if (reply) {
    //         console.log('component_verify_ticket: ' + reply.toString());
    //         res.send("解密后："+decipheredBuff+'<br>'+"component_verify_ticket:"+reply)

    //     } else {
    //         console.log('component_verify_ticket expired');
    //         client.quit();

    //     }
    // });
    // var myTimer = setInterval(function() {
    //     client.get('component_verify_ticket', function(err, reply) {
    //         if (reply) {
    //             console.log('component_verify_ticket: ' + reply.toString());
    //         } else {
    //             clearTimeout(myTimer);
    //             console.log('component_verify_ticket expired');
    //            // client.quit();
    //         }
    //     });
    // }, 3000);


     //ajax测试
   
      // var data1 = {'name': 'jifeng', 'company': 'taobao'};
      // var params=urllib.parse(req.url,true);
      // //console.log('请求1:'+params);
      // if (params.query && params.query.callback) {
      //   //console.log('请求2:'+params.query);
      //   var str =  params.query.callback + '(' + JSON.stringify(data1) + ')';//jsonp
      //   res.send(str);
      // } else {
      //   res.send(JSON.stringify(data1));//普通的json
      // }
      // if (req.method === 'POST') {
      //   var params = req.body;
  
      //  }
    // var querystring = require('querystring');
    // var util = require('util');
    // var post = '';     //定义了一个post变量，用于暂存请求体的信息
    // req.on('data', function(chunk){    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    //     post += chunk;
    // });
  
    // req.on('end', function(){    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    //     post = querystring.parse(post);
    //     console.log('post1:'+JSON.stringify(post));
    //     res.end(util.inspect(post));
    //     console.log('util:'+util.inspect(post));
    // });
    



    /*测试authorizer_access_token调用微信公众号的一些接口*/
    // async.waterfall([
    //   function (callback){
    //     query1.JudgeAuthToken("wx1beb5bae19621613",function(err,ret){
    //          if(err){
    //               throw new Error(err);
    //           }else{
    //               callback(null, ret);
    //           }
    //      });
    //   },
    //   function (arg, callback){
    //     console.log('access_token:'+arg.authorizer_access_token);
    //     var api = new WechatAPI("wx1beb5bae19621613", { authorizer_access_token: arg.authorizer_access_token, expires_at: 7000});
    //     api.getMaterials("news", 0, 20, function (err, body){
    //       if(err){
    //         throw new Error(err);
    //       }else{
    //          res.send(body);
    //       }
    //     });
        
    //   }
    // ]);
      



              BoundUserAndPublic.model.find()//查询出appid下面的所有openid
               .exec(function(err,ret1){
                  if(err){
                    throw new Error(err);
                  }else{
                    res.send(ret1);                
                  }
               });
             // PublicAccount.model.findOne()
             // .where('appid', 'wx4cac4758970eccd2')
             // .exec( function (err1, ret1){
             //   if(err1){
             //     throw new Error(err1);
             //   }else{
             //     console.log("appid:"+ret1._id);
             //     BoundUserAndPublic.model.findOne()
             //     .where('isOperator', true)
             //     .where('appid', ret1._id)
             //     .exec( function (err2, ret2){
             //       if(err2){
             //         throw new Error(err2);
             //       }else{
                     
                      
             //          CareerInCrew.model.find()
             //          .where('openid',ret2.openID)
             //          .exec( function (err3, ret3){
             //            if(err3){
             //              throw new Error(err3);
             //            }else{
             //              res.send(ret3);
             //            }
             //          });
             //       }                
                    
             //     });
                  
             //   }
             // });





      // CareerInCrew.model.find()
      // .where('openid','')
      // .exec( function (err, ret){
      //   if(err){
      //     throw new Error(err);
      //   }else{
      //     res.sned(ret);
      //   }
      // });

}

 function getAuthorizer_access_token (appId, callback){
    PublicAccount.model.findOne()
    .where('appid', appId)
    .select('authorizer_access_token')
    .exec( function (err, ret){
      if(err){
        return callback(err, null);
      }else{
        return callback(null, ret);
      }
    });
 }  
/**
 * 加密方法
 * @param key 加密key
 * @param iv       向量
 * @param data     需要加密的数据
 * @returns string
 */
// function encrypt (key, iv, data) {
//     var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
//     var crypted = cipher.update(data, 'utf8', 'binary');
//     crypted += cipher.final('binary');
//     crypted = new Buffer(crypted, 'binary').toString('base64');

//     return crypted;
// };
 
/**
 * 解密方法
 * @param key      解密的key
 * @param iv       向量
 * @param crypted  密文
 * @returns string
 */
//  function decrypt (key, iv, crypted) {
//     crypted = new Buffer(crypted, 'base64').toString('binary');
//     var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
//     var decoded = decipher.update(crypted, 'binary', 'utf8');
//     decoded += decipher.final('utf8');
//     return decoded;
// };
 function encrypt(xmlMsg) {
    var random16 = crypto.pseudoRandomBytes(16);
    var msg = new Buffer(xmlMsg);
    var msgLength = new Buffer(4);
    msgLength.writeUInt32BE(msg.length, 0);
    var corpId = new Buffer(this.appID);
    var raw_msg = Buffer.concat([random16,msgLength,msg ,corpId]);//randomString + msgLength + xmlMsg + this.corpID;
    //var encoded = PKCS7Encoder(raw_msg);
    var cipher = crypto.createCipheriv('aes-256-cbc', this.aesKey, this.iv);
    //cipher.setAutoPadding(false);
    var cipheredMsg = Buffer.concat([cipher.update(/*encoded*/raw_msg), cipher.final()]);
    return cipheredMsg.toString('base64');
};

function decrypt(str) {
    var aesCipher = crypto.createDecipheriv("aes-256-cbc", this.aesKey, this.iv);
    aesCipher.setAutoPadding(false);
    var decipheredBuff = Buffer.concat([aesCipher.update(str, 'base64'), aesCipher.final()]);
    decipheredBuff = PKCS7Decoder(decipheredBuff);
    var len_netOrder_corpid = decipheredBuff.slice(16);
    var msg_len = len_netOrder_corpid.slice(0, 4).readUInt32BE(0);
    //recoverNetworkBytesOrder(len_netOrder_corpid.slice(0, 4));
    var result = len_netOrder_corpid.slice(4, msg_len + 4).toString();
    var appId = len_netOrder_corpid.slice(msg_len + 4).toString();
    if (appId != this.appID)throw new Error('appId is invalid');
    return result;
};
function PKCS7Decoder(buff) {
    var pad = buff[buff.length - 1];
    if (pad < 1 || pad > 32) {
        pad = 0;
    }
    return buff.slice(0, buff.length - pad);
}
function PKCS7Encoder(buff) {
    var blockSize = 32;
    var strSize = buff.length;
    var amountToPad = blockSize - (strSize % blockSize);
    var pad = new Buffer(amountToPad-1);
    pad.fill(String.fromCharCode(amountToPad));
    return Buffer.concat([buff, pad]);
}