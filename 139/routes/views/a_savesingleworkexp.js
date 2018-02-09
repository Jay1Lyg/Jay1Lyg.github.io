var keystone = require('keystone'),
	Production = keystone.list('Production'),
	Role = keystone.list('Role'),
	CareerInCrew = keystone.list('CareerInCrew'),
	CareerInResume1=keystone.list('CareerInResume1'),
	CareerInResume=keystone.list('CareerInResume'),
	Resume = keystone.list('Resume'),
	ProductionCrews = keystone.list('ProductionCrews');
	Category = keystone.list('Category');
	RoleTag = keystone.list('RoleTag');
	RoleCategory = keystone.list('RoleCategory');
var async = require('async');
var searchUser = require('../../query/save_and_get_data_in_MongoDB/resume/search.js');
var urllib = require('url');

exports = module.exports = function(req, res) {
	if (req.method === 'POST') {
		var params = req.body== 'null' ? null:req.body;
		var data ={};
		console.log('-----------params--------------');
		console.log(params);
		console.log('------------params--------------');
		console.log('   作品名：'+params.production_name+'    角色名：'+params.workexp_roleName+'    用户id:'+params.userid);
		async.waterfall([
			function(callback){
               Category.model.findOne()
               .where('name', params.workexp_productionType)
               .exec(function(err,ret){
                   if(err){throw new Error(err)}
                   	else{
                   	 console.log(ret);
                   	 data.productionType_id=ret._id;
                   	 callback(null);	
                   	}
               })
			},
			function(callback){
				if(params.production_id=='' ){
					//customized production_name; we need to create a new production
					console.log('step111111111111111111111111111111111111111111');	
					// Production.model.findOne()
					// .where('name',params.production_name)
					// .where('category',  data.productionType_id)
					// //.where('publishDate',params.productionPublishDate)	
					// .exec(function(err,ret){
     //                    if(err) throw new Error(err);
     //                    if(ret==null){
     //                    	console.log('step22222222222222222222222222222222222222222');	
	                         Production.model.create({ name: params.production_name,category: data.productionType_id, createdBy: params.userid}, function (err, ret1) {//@zheng 添加了publishDate: params. productionPublishDate属性
								 if (err) callback(new Error("failed creating production object:" + err.message), null);
							  	 data.production_id=ret1._id;
							  	 
							  	 ProductionCrews.model.create({ name: params.production_name, production:ret1._id , createdBy: params.userid}, function (err, ret2) {
								  	if (err) callback(new Error("failed creating ProductionCrews object:" + err.message));
								  	if (ret2!=null) data.crews_id = ret2._id;
								  	callback(null);
								});
					         });   
        //                 }else{
        //                 	 ret.createdBy=params.userid;
        //                 	 ret.name=params.production_name;
        //                 	// ret.publishDate=params.productionPublishDate;
        //                 	 ret.category=data.productionType_id;
        //                 	 ret.save(function(){
        //                 	 	if(err) throw new Error('save production object error!');
        //                 	 	data.production_id=ret._id;
        //                 	 	ProductionCrews.model.findOne({'production':ret._id})
								// .exec(function(err, rsm) {
								//   	if (err) callback(null);
								//   	rsm.name = params.production_name;
								//   	rsm.production = ret._id;
								//   	rsm.save( function (err){
								//   		if(err) throw new Error('save productioncrews object error!');
								//   		if(rsm!=null) data.crews_id = rsm._id;
								//   		callback(null);
								//   	});						  
							 //    });	
							
        //                 	 });
        //                 }
					//})		
					
				}
				else{
					// production_id ==null && production_name==null的情况被禁止
					Production.model.findOne()
					.where('_id', params.production_id)
					.exec( function (err, ret){
						if(err) callback(new Error("failed production object:" + err.message), null);
						if(ret.name!=params.production_name || !(ret.category[0].equals(data.productionType_id))){
                           Production.model.create({ name: params.production_name,category:data.productionType_id, createdBy: params.userid}, function (err, ret1) {//@zheng 添加了publishDate: params. productionPublishDate属性
								 if (err) callback(new Error("failed creating production object:" + err.message), null);
							  	 data.production_id=ret1._id;
							  	 ProductionCrews.model.create({ name: params.production_name, production: ret1._id, createdBy: params.userid}, function (err, ret2) {
								  	if (err) callback(new Error("failed creating ProductionCrews object:" + err.message));
								  	if (ret2!=null) data.crews_id = ret2._id;
								  	callback(null);
								});
							  //	 callback(null, ret._id);
					       });   
						}
						else{
							data.production_id=ret._id;
							callback(null);
						}
						
					});
											
				}			    
			},
            function(callback){
				if(params.workexp_roleTagName!=undefined){
					RoleTag.model.findOne()
		              .where('name',params.workexp_roleTagName)
		              .exec(function(err,ret){
		              	if(err){throw new Error(err)}
		               	else{               
		               	 data.roleTag=ret._id;
		               	 callback(null);	
		               	}

		              })
				}else{
					callback(null);
				}
              
			},
			function(callback){
				if(params.workexp_roleId==''){
					Role.model.create({ name: params.workexp_roleName || "", createdBy: params.userid,roleTag:data.roleTag}, function (err, ret) {
					  console.log("3-1");
					  if (err) callback(null);
					  data.role_id = ret._id;
					  callback(null);  
					});
				}
				else{
					console.log("step3-2" );
					Role.model.findOne()
					.where('_id', params.workexp_roleId)
					.exec( function (err, ret){
						if(err) callback(new Error("failed creating Role object:" + err.message));
						data.role_id = params.workexp_roleId;
						ret.name = params.workexp_roleName;
						ret.roleTag = data.roleTag;
						ret.save( function (err){
							if(err) throw new Error('save Role object error!');
							console.log("role_id:"+data.role_id);
							callback(null);
						});
						
					});
					
				}    
			},
			function(callback){
				if(params.careerInResume_id == ''){//if any of role and production_crews is created, we need to create a new CareerInCrew.
					console.log('step33333333333333333333333333333333333333333333333333');	
					CareerInResume.model.create({ pro_object: data.production_id, role: data.role_id, user_id: params.userid}, function (err, ret) {
					  	if (err) callback(null);					
					  	data.careerInResume_id = ret._id;
					  	callback(null);
					});
				}
				else{
					if(data.role_id == null || data.production_id == null) {
						callback(new Error("failed initializing role and crews:"));
					}
					else{						
						CareerInResume.model.find()
						.where('_id', params.careerInResume_id)
						//.where('isRegistered', 'true')
						.exec(function (err, cic){
						  	if (err) {
						  		console.log("Error happened in step4" + err.message);
						  		callback(null);	
						  	}
					  		cic[0].user_id = params.userid;
					  		cic[0].pro_object = data.production_id;
					  		cic[0].role = data.role_id;
					  		cic[0].save(function (err){
					  			if(err) throw new Error('save careerInCrews object error!');
					  			data.careerInResume_id = cic[0]._id;
								callback(null);	
					  		});
						});
					}					
				}
			}
		], function (err) {
			  console.log(data);
			  if (err) return res.status(500).send(err);
			  else {
			  	//res.redirect('/WX/wx_searchsingleworkexp/'+params.userid+'/'+data.careerInResume_id+'/'+params.appId);
		         	data.index=true;
		         	var params = urllib.parse(req.url,true);
					if (params.query && params.query.callback) {
				          	//console.log('请求2:'+params.query);
				          	var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
				        	res.send(str);
				    } else {
				       		res.send(JSON.stringify(data));//普通的json
				    }// console.log(allnames);
			  }
		});
	} else {
		throw new Error("Not Accept Get Method of Saving Basic Resume Info");
	}
};
