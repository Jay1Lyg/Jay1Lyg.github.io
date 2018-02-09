var keystone = require('keystone'),
	Resume = keystone.list('Resume');
	AlternativeActor = keystone.list('AlternativeActor');
var async = require('async');
var urllib = require('url')

//当前时间格式化的方法
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
exports = module.exports = function(req, res) {
	var user_id = req.params.user_id || '';
	var careerincrew_id = req.params.careerincrew_id || '';
	var status = req.params.status || '';
	var data = {};//用来封装相应的状态码
	var date = new Date().Format("yyyy-MM-dd HH:mm:ss");
	console.log('候选者id:'+user_id+'      职位id:'+careerincrew_id+'     状态码：'+status);
	
	Resume.model.findOne()
	.where('user_id', user_id)
	.where('career_in_crews_id', careerincrew_id)
	.exec( function (err, resume_info){
		if(err) throw new Error('find resume_info error!');
		else{
			console.log(resume_info.registration_rtatus);
			console.log(resume_info.is_receive);
			resume_info.is_receive = status;
			resume_info.is_receive_date = date;
			resume_info.save( function (err){
				if(err) throw new Error('save resume_info failed!');
				else{
					data.registration_rtatus = resume_info.registration_rtatus;
					data.is_receive = resume_info.is_receive;
					data.isQualified = resume_info.isQualified;
					data.is_receive_date = date;
					console.log(date);
					if(status=='1'){//接收
                       AlternativeActor.model.create({
                       	 user_id : user_id,
                       	 careerincrew_id : careerincrew_id,
                       	 addstate : 2,
                       	 source : 3
                       },function(err,alternative_actor){
                          if(err){
                             throw new Error(err);
                          }else{
                             var params = urllib.parse(req.url,true);
								//res.redirect('/WX/page_candidateinfo/'+careerincrew_id);
								if(data== null){
							        	//console.log('请求1:'+params);
							        if (params.query && params.query.callback) {
							          	//console.log('请求2:'+params.query);
							          	var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
							        	res.send(str);
							      	} else {
							       		res.send(JSON.stringify({}));//普通的json
							      	}
						        }else{
						        	if (params.query && params.query.callback) {
							          	//console.log('请求2:'+params.query);	
							          	 var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
							        	 res.send(str);	          
							      	} 
						        } 
                          }
                       })
					}else{
					   var params = urllib.parse(req.url,true);
						//res.redirect('/WX/page_candidateinfo/'+careerincrew_id);
						if(data== null){
					        	//console.log('请求1:'+params);
					        if (params.query && params.query.callback) {
					          	//console.log('请求2:'+params.query);
					          	var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
					        	res.send(str);
					      	} else {
					       		res.send(JSON.stringify({}));//普通的json
					      	}
				        }else{
				        	if (params.query && params.query.callback) {
					          	//console.log('请求2:'+params.query);	
					          	 var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
					        	 res.send(str);	          
					      	} 
				        }  	
					} 	
				}
			});

		}
	});

}