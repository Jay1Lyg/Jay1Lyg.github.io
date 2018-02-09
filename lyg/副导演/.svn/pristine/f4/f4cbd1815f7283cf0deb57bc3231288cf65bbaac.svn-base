var keystone = require('keystone');
    Code = keystone.list('Code');
var http = require('http');    
var sha1=require('sha1');  
var qs = require('querystring');  
var util = require('../../query/util/util.js');
var redis = require('../../query/redis_cache/RedisCache.js');
var urllib = require('url');

exports = module.exports = function(req1, res) {
    // var telephone=req.params.telephone;
    // var password=req.params.password;

    var telephone=req1.query.telephone;
    var password=req1.query.password;

    var Appkey='8a9608d9b7c6823e567812f459de637d';  
    var Nonce="kaishi";  
    var CurTime=(new Date()).valueOf();  
    var AppSecret='ee033619aa84';  
    var str=AppSecret + Nonce + CurTime;  
    var CheckSum=sha1(str);  
      console.log(telephone);
      console.log(password);
     //  templateid:3064767,      
    var post_data = {         
        mobile:telephone,
        codeLen:6
        
    };//这是需要提交的数据 
    console.log(post_data);   
    var content = qs.stringify(post_data);   
    console.log(content) ;
    var options = {    
        hostname: 'api.netease.im',    
        //port:443,  
        path: '/sms/sendcode.action',    
        method: 'POST',    
        headers: {    
            'AppKey'        : Appkey,  
            'Nonce'         : Nonce,  
            'CurTime'       : CurTime,  
            'CheckSum'      : CheckSum,  
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',  
                  
        }    
    };  
    User.model.findOne({'telephone': telephone})
      .exec(function(err, user) {
         if(user==null){
                var req = http.request(options, function (res) {    
                console.log('STATUS: ' + res.statusCode);    
                //console.log('HEADERS: '+res.headers);    
                res.setEncoding('utf8');    
                res.on('data', function (chunk) {    
                    console.log('BODY: ' + chunk); 
                    var info = JSON.parse(chunk);
                     //将验证码保存到数据库
                     console.log('ooooooooooooooooooooooooooooooooooooooooo');
                     console.log(info);
                     console.log('ooooooooooooooooooooooooooooooooooooooooo');
                    var time = (new Date()).getTime()+60000;
                    Code.model.findOne()
                     .where('telephone',telephone)
                     .exec(function(err,ret1){
                         console.log('------------------------ret1------------------------');
                         console.log(ret1);
                         console.log('------------------------ret1------------------------');
                        if(ret1==null){
                          Code.model.create({telephone:telephone,code:info.obj,expires_in:time,isUse:true},function(err,ret){
                                if(err){
                                  throw new Error(err);
                                }else{
                                  console.log(ret);
                                  console.log('缓存成功！');
                                }
                          })
                        } else{
                            ret1.code=info.obj;
                            ret1.expires_in=time;
                            ret1.isUse=true;
                            ret1.save(function(err){
                              console.log('缓存成功！!');
                            })
                        }
                     })
                    
                    
                });    
               
            });    
                 
              req.on('error', function (e) {    
                  console.log('problem with request: ' + e.message);    
              });    
                   
              // write data to request body    
              req.write(content);    
                   
              req.end(); 
              //res.send('success');
              var data={};
              data.status=true;
              var params = urllib.parse(req1.url,true);
              if (params.query && params.query.callback) {
                  var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
                  res.send(str);
              } else {
                  res.send(JSON.stringify(data));//普通的json
              }
         }else{
            var data={};
            data.status=false;
            var params = urllib.parse(req1.url,true);
            if (params.query && params.query.callback) {
                var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
                res.send(str);
            } else {
                res.send(JSON.stringify(data));//普通的json
            }
         }
      })  
         
   
    //res.redirect('/WX/page_register'); 
}