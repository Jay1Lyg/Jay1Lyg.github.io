var keystone = require('keystone'),
	Address = keystone.list('Address'),
	Areainfo = keystone.list('Areainfo'),
	Category = keystone.list('Category'),
	Production = keystone.list('Production'),
	ProductionCrews = keystone.list('ProductionCrews'),
	ProductionCompany = keystone.list('ProductionCompany'),
	Issuer = keystone.list('Issuer'),
	RoleCategory = keystone.list('RoleCategory'),
	Role = keystone.list('Role'),
	User = keystone.list('User'),
	CareerInCrew = keystone.list('CareerInCrew'),
	Resume = keystone.list('Resume'),
    Category = keystone.list('Category'); 
    BoundAgentAndActor = keystone.list('BoundAgentAndActor');   
var search = require('../../query/save_and_get_data_in_MongoDB/resume/search.js');
var async = require('async');
var urllib = require('url');
//判断某个字符串是否在数组中
var inArray = function(arr, item) {
	for (var i = 0; i < arr.length; i++) {
	    if (arr[i] == item) {
	        return true;
	    }
	}
	return false;
};
exports = module.exports = function(req, res) {
	console.log('报名方法执行中...');
	var param = urllib.parse(req.url,true);
	var user_id = req.params.user_id || '';
	var author_id = req.params.author_id || '';
	var careerincrew_id = req.params.careerincrew_id || '';
	console.log('当前用户id:'+user_id+'    发布者id:'+author_id+'     当前用户报名的CareerInCrews_id:'+careerincrew_id);
	var sign_up_arry = [];//用来存放is_sign_up
	var is_sign_up = false;//判断是否报能的标示（默认是false 没有对该条职位进行报名）
	var data = {};//存放返回的数据
	async.waterfall([
		function(callback){
          search.findProfile( user_id, function(err, profile) {
          	 if(err){
               throw new Error(err);
          	 }else{
          	 	console.log('------------------profile------------------');
          	 	console.log(profile);
          	 	console.log(profile.iconUrl=='');
          	 	console.log(profile.realname==undefined||profile.CastingImageUrl==null||profile.iconUrl=='');
          	 	console.log('------------------profile------------------');
          	 	///if(profile.realname==undefined||profile.CastingImageUrl==null||profile.iconUrl==''){
          	 	 if(profile.allok == false){
                   data.status=false;
                   if (param.query && param.query.callback) {
		          	//console.log('请求2:'+params.query);
		          	    var str =  param.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
		        	    res.send(str);
			      	} else {
			      		console.log('oooooooo');
			      		console.log(data);
			       		res.send(JSON.stringify(data));//普通的json
			      	}
          	 	}else{
          	 		callback(null);
          	 	}
          	 }
          })
		},function(callback){//判断报名人是否有经纪人
          BoundAgentAndActor.model.findOne()
           .where('user_id',user_id)
           .exec(function(err,ret){
              if(err){
                 throw new Error(err);
              }else{
              	callback(null,ret);
              }
           })
		},
		function(arg,callback){
			console.log('1-1');
			//关联当前用户，以便查阅简历者对应聘者的简历进行评阅与决策
			CareerInCrew.model.findOne()
			.where('_id', careerincrew_id)
			.exec( function (err, careerincrew_info){
				console.log('careerincrew_info:'+careerincrew_info);
				if(err) throw new Error('find careerincrew_info error');
				if(careerincrew_info.length == 0){
					throw new Error('careerincrew_info is null!');
				}else{
					is_sign_up = true;
					callback(null, careerincrew_info,arg);
				}
			});
		},
		function(arg,arg1, callback){
			console.log('2-1');

			if(arg.candidates == ''){
				console.log('2-2');
				if(arg1==null){//无经纪人的用户
				   //如果candidates数组为空（只能以’‘这种形式，以null形式来判定是不行的，说明初始状态是字符串）
					Resume.model.create({
						user_id: user_id,
						career_in_crews_id: careerincrew_id
					},
					function (err, ret){
						console.log('2-3');
						if(err) throw new Error('create Resume failed!');
						(arg.candidates).push(ret._id);//设置与该职位相关连的简历
						(arg.subscribers).push(author_id);//设置连的评阅简历的人（暂定是发布者）
						data.sign_up_date = ret._.createdAt.format('YYYY-MM-DD HH:mm:ss');
						data.candidates = arg.candidates;
						data.subscribers = arg.subscribers;
						data.productioncrew_id = arg.crews_object;
						data.sign_up = false;
						ret.sign_up_create = true;
						ret.registration_rtatus = '1';
						ret.productioncrew_id=arg.crews_object;
						ret.createBy = user_id;
						ret.save(function (err){
							if(err) throw new Error('save Resume failed!');
							arg.save(function (err){
								console.log('2-4');
								if(err) throw new Error('save careerincrew_info failed!');
								callback(null);
							});
						});
					});
				}else{//有经纪人的演员
                     //如果candidates数组为空（只能以’‘这种形式，以null形式来判定是不行的，说明初始状态是字符串）
					Resume.model.create({
						user_id: user_id,
						career_in_crews_id: careerincrew_id
					},
					function (err, ret){
						console.log('2-3');
						if(err) throw new Error('create Resume failed!');
						(arg.candidates).push(ret._id);//设置与该职位相关连的简历
						(arg.subscribers).push(author_id);//设置连的评阅简历的人（暂定是发布者）
						data.sign_up_date = ret._.createdAt.format('YYYY-MM-DD HH:mm:ss');
						data.candidates = arg.candidates;
						data.subscribers = arg.subscribers;
						data.productioncrew_id = arg.crews_object;
						data.agent_id = arg1.agent_id;
						data.sign_up = false;
						ret.sign_up_create = true;
						ret.registration_rtatus = '1';
						ret.productioncrew_id=arg.crews_object;
						ret.agentid=arg1.agent_id;
						ret.createBy = user_id;
						ret.save(function (err){
							if(err) throw new Error('save Resume failed!');
							arg.save(function (err){
								console.log('2-4');
								if(err) throw new Error('save careerincrew_info failed!');
								callback(null);
							});
						});
					});
				}
			}else{
				async.eachSeries(arg.candidates, function (candidates_info, next){
					console.log('2-5')
					console.log('candidates_info:'+candidates_info);
					Resume.model.find()
					.where('_id', candidates_info)
					.where('user_id', user_id)
					.exec( function (err, resume_info){
						console.log('2-6');
						if(err) throw new Error('find resume_info failed!');
						if(resume_info.length == 0){
							is_sign_up = false;
							sign_up_arry.push(is_sign_up);
						}else{
							is_sign_up = true;
							console.log('resume_info:'+resume_info);
							data.sign_up_date = resume_info[0]._.createdAt.format('YYYY-MM-DD HH:mm:ss');
							sign_up_arry.push(is_sign_up);
						}
						next();
					});
				}, function (err){
					if(err) throw new Error('check candidates error!');
					console.log('2-8');
					console.log('sign_up_arry:'+sign_up_arry);
					console.log( inArray(sign_up_arry, true));
					if(inArray(sign_up_arry, true) == false){ // 如果没有报过名，create new Resume
						Resume.model.create({
							user_id: user_id,
							career_in_crews_id: careerincrew_id
						},
						function (err, ret){
							console.log('2-9');
							if(err) throw new Error('create Resume failed!');
							(arg.candidates).push(ret._id);//设置与该职位相关连的简历
							arg.subscribers[0] = author_id;//设置连的评阅简历的人（暂定是发布者）
							data.sign_up_date = ret._.createdAt.format('YYYY-MM-DD HH:mm:ss');
							data.candidates = arg.candidates;
							data.subscribers = arg.subscribers;
							data.sign_up = false;
							ret.sign_up_create = true;
							ret.registration_rtatus = '1';
							ret.createBy = user_id;
							ret.save(function (err){
								if(err) throw new Error('save Resume failed!');
								arg.save(function (err){
									console.log('2-10');
									if(err) throw new Error('save careerincrew_info failed!');
									callback(null);
								});
							});
						});
					}else{
						console.log('已经报过名了');
						data.candidates = arg.candidates;
						data.subscribers = arg.subscribers;
						data.sign_up = true;
						callback(null);
					}
				});
			}
		}

	], function (err){
		console.log(data);
		if (err) return res.status(500).send(err);
	   else{
	   	  if(data == null || data == {}){
	        	//console.log('请求1:'+params);
		        if (param.query && param.query.callback) {
		          	//console.log('请求2:'+params.query);
		          	var str =  param.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
		        	res.send(str);
		      	} else {
		       		res.send(JSON.stringify({}));//普通的json
		      	}
	        }else{
	        	//console.log('请求1:'+params);
		        if (param.query && param.query.callback) {
		          	//console.log('请求2:'+params.query);
		          	var str =  param.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
		        	res.send(str);
		      	} else {
		       		res.send(JSON.stringify(data));//普通的json
		      	}
	        }
	   	//return res.status(200).send(data);
	   } 
	});	
}