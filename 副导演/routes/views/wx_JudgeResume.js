var keystone = require('keystone'),
	User = keystone.list('User');
  PDF_User = keystone.list('PDF_User');
	CareerInResume = keystone.list('CareerInResume');
	Casting = keystone.list('Casting');
var urllib = require('url');
var search = require('../../query/save_and_get_data_in_MongoDB/actor/search.js');



exports = module.exports = function(req, res) {
	var data ={};
	console.log(req.query);
	User.model.findOne()
	.where('_id',req.query.userid)
	.exec(function(err,ret){
    if(err){
         return res.status(500).send(err);
    }else{
       	var params = urllib.parse(req.url,true);
       	if(ret.allok==true){//表明四步均填完，跳到简历编辑页面
            data.index = 0;
      			if (params.query && params.query.callback) {
      			    var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
      			    res.send(str);
      			}else {
      				  res.send(JSON.stringify(data));//普通的json
      			}
       	}else{//未填完，1.判断用户是否有导入的资料2.若没导入的资料，判断用户填到第几步
            PDF_User.model.findOne()
            .where('Telphone',ret.telephone)
            .exec(function(err,pdf_user){
               if(err){
                 throw new Error(err);
               }else{
                 if(pdf_user != null){//说明有导入的资料
                    search.importPDF_UserinfoToUser(pdf_user._id,ret._id,function(err){
                       if(err){
                          throw new Error(err);
                       }else{
                           data.index = 0;
                           if (params.query && params.query.callback) {
                              var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
                              res.send(str);
                           }else {
                              res.send(JSON.stringify(data));//普通的json
                           }
                       }
                   });
                 }else{//没有导入资料
                    if(ret.realname == undefined && ret.artname == undefined){//第一步的某几个必填项没填，表示第一步未完成，页面跳第一步填写
                          data.index=1; 
                          if(params.query && params.query.callback) {
                              var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
                              res.send(str);
                          }else {
                              res.send(JSON.stringify(data));//普通的json
                          }
                    }else{
                       CareerInResume.model.find()
                        .where('user_id',ret._id)
                        .exec(function(err,career){
                           if(err){
                              throw new Error(err);
                           }else{
                            console.log('-------------career-------------');
                            console.log(career);
                            console.log('-------------career-------------');
                            if(career.length == 0){//第二步没填写（第二步为非必填项），再判断第三步是否填写，若第三步填写了继续判断第四步，若第三步未填写，则页面停留在第二步
                                 Casting.model.findOne()
                                 .where('user_id',ret._id)
                                 .exec(function(err,casting){
                                    if(err){
                                       throw new Error(err);
                                    }else{
                                      if(casting==null||casting.artimage.length == 0 || ret.images.length == 0){//表明用户未填写第三步
                                         data.index = 2;//页面跳第二步
                                         if (params.query && params.query.callback) {
                                           var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
                                           res.send(str);
                                          } else {
                                            res.send(JSON.stringify(data));//普通的json
                                            }
                                      }else{//第三步填写了，判断第四步是否填写
                                          if(ret.allok == true){//第四步填写了
                                              data.index = 0;
                                              if (params.query && params.query.callback) {
                                                  var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
                                                  res.send(str);
                                              }else {
                                                res.send(JSON.stringify(data));//普通的json
                                              }
                                          }else{
                                              data.index = 4;//页面跳第四步
                                              if (params.query && params.query.callback) {
                                                  var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
                                                  res.send(str);
                                              }else {
                                                res.send(JSON.stringify(data));//普通的json
                                              }
                                          }
                                      }
                                    }
                                 })

                            }else{//第二步填写了，判断第三步
                                 Casting.model.findOne()
                                 .where('user_id',ret._id)
                                 .exec(function(err,casting){
                                    if(err){
                                       throw new Error(err);
                                    }else{
                                      console.log('--------11---------');
                                      console.log(casting);
                                      console.log('--------11---------');
                                      if(casting==null||casting.artimage.length == 0 || ret.images.length == 0){//表明用户未填写第三步
                                         data.index = 3;//页面跳第三步
                                         if (params.query && params.query.callback) {
                                           var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
                                           res.send(str);
                                          } else {
                                             res.send(JSON.stringify(data));//普通的json
                                          }
                                      }else{//第三步填写了，判断第四步是否填写
                                          if(ret.allok == true){//第四步填写了
                                              data.index = 0;
                                              if (params.query && params.query.callback) {
                                                  var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
                                                  res.send(str);
                                              }else {
                                                res.send(JSON.stringify(data));//普通的json
                                              }
                                          }else{
                                              data.index = 4;//页面跳第四步
                                              if (params.query && params.query.callback) {
                                                  var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
                                                  res.send(str);
                                              }else {
                                                res.send(JSON.stringify(data));//普通的json
                                              }
                                          }
                                      }
                                    }
                                 })
                            }
                           }
                        })
                    } 
                    
                 }
               }
            })
       	}
         
       }
	})

};
