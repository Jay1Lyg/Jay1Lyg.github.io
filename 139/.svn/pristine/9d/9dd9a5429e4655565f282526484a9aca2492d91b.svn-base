var keystone = require('keystone'),
PDF_User = keystone.list('PDF_User');
var _ = require('underscore');
var exec = require('child_process').exec;
var http = require('http');
var path = require("path");  
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var urlModule = require('url');
var async = require('async');
var PDF_Skill = keystone.list('PDF_Skill');
var PDF_CareerInResume = keystone.list('PDF_CareerInResume');
var PDF_Production = keystone.list('PDF_Production');
var PDF_Role = keystone.list('PDF_Role');
var getHtml = require("../../public/utils/getHtml");  //获得html的内容
var Areainfo = keystone.list('Areainfo');
var config = require('../../public/conf/common.js');

var url = "http://58.87.104.41:8080/htmlHelper/views/";


exports = module.exports = function(req, resquest) {
	var params = urlModule.parse(req.url,true);
	var folder = req.body.folder || '';
	var date = new Date();
	var i = 0;
	console.log('--------req.body---------');
	console.log(req.body);
	console.log('--------req.body---------');
	readDirSync(folder); 
	function readDirSync(path){  
		var pa = fs.readdirSync(path);  
		pa.forEach(function(ele,index){  
			var info = fs.statSync(path+"/"+ele)    			  
			if(info.isDirectory()){  
				console.log("dir: "+ele)  
				readDirSync(path+"/"+ele);  
			}else{  
				var filename_time = date.getTime()+i;//根据时间给文件命名
				i = i+1;
				var htmlpath = './../../../../../usr/tomcat/apache-tomcat-8.5.24/webapps/htmlHelper/views/'+filename_time+'.html';
				console.log(process.cwd());
				console.log('--------------htmlpath---------------');
				console.log(htmlpath);
                console.log('--------------htmlpath---------------');
				var filepath = folder+ele;
                var cmd = "pdf2htmlEX "+filepath+" "+htmlpath;
				exec(cmd, function(error, stdout, stderr) {//
		  		// 获取命令执行的输出
			  		console.log('---err----');
			  		console.log(error);
			  		console.log('---stdout----');
			  		console.log(stdout);
			  		console.log('---stderr----');
			  		console.log(stderr);
				  	//res.send('success');
				  	var user = new PDF_User.model({appid:req.body.appid});//此处参数为appid
				  	//console.log(user._id);
				  	var user_id = user._id;

			  		getHtml(url+filename_time+'.html',user_id,function(err,finalResult){//获取提取到的信息
			  			console.log('step1');
			  			var string = JSON.stringify(finalResult);
			  			var str = string.replace(/\\/g,"");
                        async.waterfall([
                           function(callback){//保存pdf_user表中的基本信息
                              if(finalResult.birth!=undefined){
								var birthday = JSON.parse(finalResult.birth);
								if(birthday.length>0){
									user.birth = birthday[0];
								}
								console.log(birthday);

							  }
		   //                    //保存真实姓名，身高，体重，经纪人手机号
								user.realname = finalResult.realname;
								user.height = finalResult.height;
								user.weight = finalResult.weight;
								//user.hometown = finalResult.hometownid;
								user.Telphone =  finalResult.Tel;
		                        var resume_url = config.homeEntry.url+':8080/htmlHelper/views/'+filename_time+'.html';
		                        user.resume_url = resume_url;
							    user.save(function(err,result){
									if(err){
										console.log(err);
										throw new Error("Save err");
									}else{
                                        callback(null);
									}
									
								}); 
                           },function(callback){
                                skillname = finalResult.skill;
								//skillnamestr = skillname.join(",");
									
								async.eachSeries(skillname,function(item,next){
		                            PDF_Skill.model.create({
									  user_id : user._id,
									  name :  item,
									},function(err,result){
										if(err){
		                                   throw new Error(err);
										}else{
											next();
										}
									});  
								},function(err){
                                   if(err){
                                      throw new Error(err);
                                   }else{
                                   	  callback(null);
                                   }
								})
                           },function(callback){
                              //遍历剧目并保存
								async.eachSeries(finalResult.production, function(item,next){
									var rolename ;
									if(item.rolename == undefined){
										rolename = '不详'; 
									}else{
										rolename = item.rolename;
									}
								    PDF_Production.model.create({
										name :  item.name
									},function(err,production){
										PDF_Role.model.create({												
											name :  rolename,
										},function(err,role){
											console.log(err);
											console.log('----------role-----------');
											console.log(role);
											console.log('----------role-----------');
											PDF_CareerInResume.model.create({
												user_id : user._id,
												pro_object : production._id,
												role : role._id,												
											},function(err,carrerinresume){
												console.log(err);
												next();
											});													

									    });											

									});									
								
								},function(err){
                                   if(err){
                                     throw new Error(err);
                                   }else{
                                   	 callback(null);
                                   }
								});
                           }
                        ]);     
                    });
               });
           } 
       })
         resquest.send('success') ; 
    }  



}


