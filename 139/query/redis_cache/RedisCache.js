/**
*
*
*
*
*                   redis缓存
*
*
*
*
*
*
*
*
*/
var keystone = require('keystone');
var fs = require('fs');
var WXAuth = require('wechat-auth');
var client = require('../../query/redis_cache/RedisConfig.js');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/DSF_info.json', 'utf-8'));
var get_pre_auth_code = require('../../query/get_auth_info/GetPreAuthCode.js');
/**
*        缓存component_verify_ticket
*
*
*/
function verifyTicketCache (component_verify_ticket){
	console.log('缓存component_verify_ticket方法执行中...');

	client.set("component_verify_ticket",component_verify_ticket, client.print);
	// 检查一个值在失效之前存留了多长时间
	var myTimer = setInterval(function() {
        client.get('component_verify_ticket', function(err, reply) {
            if (reply) {

                console.log('component_verify_ticket: ' + reply.toString());
            } else {
                clearTimeout(myTimer);
                console.log('component_verify_ticket expired');
            }
        });
    }, 600000);

 
}

//从redis缓存中获取信息
function getInfo ( key, callback ){
    client.get( key, function (err, reply){
        if(err){
            console.log('根据：'+key+' 读取数据失败！');
            callback(err, null);
        }else{
            if( reply ){
                console.log(key+':'+reply.toString());
                callback(null, reply.toString());
            }else{
                console.log(key+' expired!');
                callback(null, null);
            }
        }
    });
}

//将信息保存到redis缓存中去
/*
*parm@key 设置的key值
*parm@value 对应key的value值
*parm@expire 设置的过期时间
*
*/
function saveInfo ( key, value, expire){
    client.set(key, value, function (err, result){
        if(err){
            callback(err, null);
        }else{
            if(!isNaN(expire) && expired > 0){
                client.expire(key, parseInt(expire));
            }
             console.log('保存'+key+':'+value+'成功！');
        }
    });
}

/*
* 获取全局component_verify_ticket的方法
* 从redis缓存中读取
*/
function getVerifyTicket (callback) {
    return client.get('component_verify_ticket', function(err, ticket) {
        if (err) {
          return callback(err, null);
        } else if (!ticket) {
          return callback(new Error('no component_verify_ticket'));
        } else {
          return callback(null, ticket);
        }
    });
};

/*
* 获取全局component_access_token的方法
* 从redis缓存中读取
*/
function getComponentToken(callback) {
    return client.get('component_access_token', function(err, token) {
         if (err) {
            return callback(err);
        } else {
            return callback(null, token);
        }
    });
};

/*
* 保存component_access_token到redis中
*/
function saveComponentToken (token, callback) {
  var data = JSON.stringify(token);
  return client.setex('component_access_token', 7000, data, function(err, reply) {
    if (err) {
      callback(err);
    }
    return callback(null);
  });
};


wxauth = new WXAuth(info.AppID, info.AppSecret, getVerifyTicket, getComponentToken, saveComponentToken);
/*
*获取预授权码并存储到数据库中
*/


function getAndSavePre_auth_code ( component_access_token, callback ){
    get_pre_auth_code.getPreAuthCode(component_access_token, function (err, ret){
        if(err){
            callback(err, null);
        }else{
     
            if(("errcode" in ret) && ret.errcode == '40001'){       
              wxauth.getLatestComponentToken(function (error, token) {
                  if(error){
                    throw new Error(error);
                  }else{
                    get_pre_auth_code.getPreAuthCode(token.component_access_token, function (err2, ret2){
                      if(err2){
                        throw new Error(err2);
                      }else{
                        client.setex('pre_auth_code', 1, JSON.stringify(ret2), function (err3, ret3){
                            if(err3){
                                callback(err3, null);
                            }else{
                                console.log('缓存pre_auth_code'+ret3);
                                callback(null, ret2);
                            }
                        });
                      }
                    });
                  }
              });
            }else{
              client.setex('pre_auth_code', 1, JSON.stringify(ret), function (err1, ret1){
                if(err1){
                    callback(err1, null);
                }else{
                    console.log('缓存pre_auth_code'+ret1);
                    callback(null, ret);
                }
              });
            }
            
        }
    });
}
/*
*
*    从redis中获取pre_auth_code
*
*/

function getPreAuthCode (componet_access_roken, callback){
    return client.get('pre_auth_code', function(err, pre_auth_code) {
        if (err) {
          return callback(err, null);
        } else if (!pre_auth_code) {
          //return callback(new Error('no pre_auth_code'));
          console.log('pre_auth_code已经过期,正在重新获取并缓存...');
          getAndSavePre_auth_code(componet_access_roken, function (err, ret){
            if(err){
                return callback(err, null);
            }else{
                return callback(null, ret);
            }
          });
        } else {
          return callback(null, pre_auth_code);
        }
    });
}
/*
* 获取全局access_token的方法
* 从redis缓存中读取
*/
function getAccessToken(callback) {
    return client.get('access_token', function(err, token) {
         if (err) {
            return callback(err);
        } else {
            return callback(null, token);
        }
    });
};
/*
* 保存access_token
* 到redis缓存中
*/
function saveAccessToken (token, callback) {
  var data = JSON.stringify(token);
  return client.setex('access_token', 5400, data, function(err, reply) {
    if (err) {
      callback(err);
    }
    return callback(null);
  });
};

/*
* 保存Jsapi_ticket
* 到redis缓存中
*/
function saveJsapi_ticket (token, callback) {
  var data = JSON.stringify(token);
  return client.setex('jsapi_ticket', 7000, data, function(err, reply) {
    if (err) {
      callback(err);
    }
    return callback(null);
  });
};
/*
* 获取全局jsapi_ticket的方法
* 从redis缓存中读取
*/
function getJsapiTicket(callback) {
    return client.get('jsapi_ticket', function(err, token) {
         if (err) {
            return callback(err);
        } else {
            return callback(null, token);
        }
    });
};

/*
* 
* 在缓存获取验证码
*/
function getSMS(callback) {
    return client.get('SMS', function(err, token) {
         if (err) {
            return callback(err);
        } else {
            return callback(null, token);
        }
    });
};
/*
* 保存验证码
* 到redis缓存中
*/
function saveSMS (sms, callback) {
  var data = JSON.stringify(sms);
  return client.setex('SMS', 70, data, function(err, reply) {
    if (err) {
      callback(err);
    }
    return callback(null);
  });
};
/*
*   保存authorizer_access_token到redis服务器中去
*
*
*/
// function saveAuthAccessToken (authorizer_access_token, callback){
//     return client.setex('authorizer_access_token', 7000, JSON.stringify(authorizer_access_token), function (err, ret){
//         if(err){
//             return callback(err, null);
//         }else{
//             return callback(null, ret);
//         }
//     });
// }
/*
*
*   获取authorizer_access_token,判断是否过期，如果过期通过authorizer_refresh_token刷新后进行重新的存储
*
*
*/
// function getAndSaveAuthAccessToken (auth_code, callback){
//     return client.get('authorizer_access_token', function (err, authorizer_access_token){
//         if(err){
//             return callback(err, null);
//         }else{
//             if(!authorizer_access_token){
//                 //authorizer_accesee_token已经过期，需要使用authorizer_refresh_token来重新刷新并进行存储到redis服务器中去

//             }else{
//                 return callback(null, JSON.parse(authorizer_access_token));
//             }
//         }
//     });
// }
/*
*
*    将authorizer_refresh_token保存到redis服务器中去
*
*
*
*/
// function savaAuthRefreshToken (authorizer_refresh_token, callback){
//     return client.set('authorizer_refresh_token', authorizer_refresh_token, function (err, ret){
//         if(err){
//             return callback(err, null);
//         }else{
//             return callback(null, ret);
//         }
//     });
// }
/**
*
*
*   获取authorizer_refresh_token的方法
*
*
*
*/
// function getAuthRefreshToken (callback){
//     return client.get('authorizer_refresh_token', function (err, authorizer_refresh_token){
//         if(err){
//             return callback(err, null);
//         }else{
//             if(!authorizer_refresh_token){
//                 throw new Error('authorizer_refresh_token is null!');
//             }else{
//                 return callback(null, authorizer_refresh_token);
//             }
//         }
//     });
// }
module.exports =  {
	verifyTicketCache: verifyTicketCache,
    getInfo: getInfo,
    saveInfo: saveInfo,
    wxauth: wxauth,
    getComponentToken: getComponentToken,
    saveComponentToken: saveComponentToken,
    getVerifyTicket: getVerifyTicket,
    getAndSavePre_auth_code: getAndSavePre_auth_code, 
    getPreAuthCode: getPreAuthCode,
    saveJsapi_ticket:saveJsapi_ticket,
    getJsapiTicket:getJsapiTicket,
    getAccessToken:getAccessToken,
    saveAccessToken:saveAccessToken,
    getSMS:getSMS,
    saveSMS:saveSMS
    // saveAuthAccessToken: saveAuthAccessToken, 
    // getAndSaveAuthAccessToken: getAndSaveAuthAccessToken,
    // savaAuthRefreshToken: savaAuthRefreshToken,
    // getAuthRefreshToken: getAuthRefreshToken
};



// 获取第三方平台component_access_token
// wxauth.getLatestComponentToken(function(err, token) {
//   // TODO 
// });
// 获取预授权码pre_auth_code
// wxauth.getPreAuthCode(function(err, reply) {
//   // TODO 
// });
// 获取公众号的接口调用凭据和授权信息
// // auth_code 授权完成后微信返回的授权码 
// wxauth.getAuthToken(auth_code, function(err, reply) {
//   // TODO 
// });
// 刷新授权公众号的接口调用凭据
// // authorizer_appid 授权公众号的appid 
// // authorizer_refresh_token 从微信获取的公众号刷新token，存储在db中 
// wxauth.refreshAuthToken(authorizer_appid, authorizer_refresh_token, function(err, reply) {
//   // TODO 
// });
// 获取授权公众号账号基本信息
// // authorizer_appid 授权公众号的appid 
// wxauth.getAuthInfo(authorizer_appid, function(err, reply) {
//   // TODO 
// });
// 获取授权方的选项设置信息
// // authorizer_appid 授权公众号的appid 
// // option_name 选项名 
// wxauth.getAuthOption(authorizer_appid, option_name, function(err, reply) {
//   // TODO 
// });
// 设置授权方的选项信息
// // authorizer_appid 授权公众号的appid 
// // option_name 选项名 
// // option_value选项值 
// wxauth.setAuthOption(authorizer_appid, option_name, option_value, function(err, reply) {
//   // TODO 
// });
// 网页授权

// 获取授权页面的URL地址
// // appid 授权公众号的appid 
// // redirect 授权后要跳转的地址 
// // state 开发者可提供的数据 
// // scope 作用范围，值为snsapi_userinfo和snsapi_base，前者用于弹出，后者用于跳转 
// var oauthUrl = wxauth.getOAuthURL(appid, redirect, state, scope);
// 通过code换取access_token
// // appid 授权公众号的appid 
// // code 授权获取到的code 
// // callback 回调函数 
// wxauth.getOAuthAccessToken(appid, code, function(err, reply) {
//   // TODO 
// });
// 刷新access_token
// // appid 授权公众号的appid 
// // refresh_token 授权刷新token 
// // callback 回调函数 
// wxauth.refreshOAuthAccessToken(appid, refresh_token, function(err, reply) {
//   // TODO 
// });
// 通过access_token获取用户基本信息
// // openid 授权用户的唯一标识 
// // access_token 网页授权接口调用凭证 
// // lang 语言版本，zh_CN 简体，zh_TW 繁体，en 英语 
// // callback 回调函数 
// wxauth.getUserInfo(openid, access_token, lang, function(err, reply) {
//   // TODO 
// });