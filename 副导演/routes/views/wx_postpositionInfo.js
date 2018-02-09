var keystone = require('keystone'),
	Role = keystone.list('Role'),
	Address = keystone.list('Address'),
	CareerInCrew = keystone.list('CareerInCrew');
var async = require('async');

exports = module.exports = function(req, res) {

	if (req.method === 'POST') {
		var params = req.body;
		var data ={};
		var timestamp=new Date().getTime();
		console.log('params.crewsId:'+params.crewsId);
		console.log('params.position.id):'+params.position.id);
		console.log(params);
		if(params.position.rolename == null ) throw new Error('RoleName is null！');
		if(params.position.roleCategory == null ) throw new Error('RoleCategory is null！');
		async.waterfall([
				function(callback){
					console.log('1-1');
					if(params.position.id == null ){
						Role.model.create({ name: params.position.rolename}, function (err, ret) {
					  		if (err) throw new Error("failed creating Role object:" + err.message);

					  		console.log("1-2");
					  		console.log(ret._id);
							data.role_id = ret._id;
							ret.roleCategory = params.position.roleCategory_id;
							ret.createdBy = params.author;
							ret.save(function (err) {
								console.log("1-3");
							    if (err) console.log('Saving Role failed');
							    callback(null);
							});
						});
					}else{
						console.log('1-4');
						data.role_id = params.position.id;
						Role.model.findOne()
						.where('_id',params.position.id)
						.exec(function(err, ret){
							if(err) throw new Error('find role infomation error!');
							ret.roleCategory = params.position.roleCategory_id;
							ret.createdBy = params.author;
							ret.save(function(err){
								if(err) throw new Error('save role infomation failed!');
								callback(null);
							});
							

						});
						
					}
			
					/*if(params.position.rolename != null  && params.position.roleCategory_id !=null && params.position.id == null){
						Role.model.find({'name': params.position.rolename, 'roleCategory': params.position.roleCategory_id})
							.exec(function(err, ret) {
							  	if (err) throw new error("Failed to find role by name");
							  	console.log(ret);

							  	if(ret.length==0){
						  			Role.model.create({ name: params.position.rolename}, function (err, ret) {
									  	if (err) throw new Error("failed creating Role object:" + err.message);

									  	if(ret!=null){
									  		console.log("1-2");
											data.role_id = ret._id;
											ret.roleCategory = params.position.roleCategory_id;
											ret.createdBy = params.author;
											ret.save(function (err) {
												console.log("1-3");
											    if (err) console.log('Saving Role failed');
											    callback(null);
											});
									  	} 
									  	else callback(null);
									});
							  	}
							  	else{
							  		console.log("2-4");
							  		data.role_id = ret[0]._id;
								  	callback(null);
							  	}
							});
					}else{
						console.log("2-5");
				  		data.role_id = params.position.id;
					  	callback(null);
					}*/
				},
				function(callback){
					console.log('2-1')
					if(params.position.addressid == null){
						Address.model.create({name: params.position.addressname, area: params.position.provinceid},function(err,ret){
							if(err) throw new error("Error happened when creating Address Object" + err.message);
							data.address_id = ret._id;
							data.addressname = ret.name;
							ret.createdBy = params.author;
							ret.save(function(err){
								if (err) console.log('Saving Address failed!');
								callback(null);
							});

						})
					}else{
						console.log('2-2');
						data.address_id = params.position.addressid;
						data.addressname = params.position.addressname;
						Address.model.findOne()
						.where('_id', params.position.addressid)
						exec(function(err, ret){
							if(err) throw new Error('find Address infomation failed!');
							ret.createdBy = params.author;
							ret.save(function(err){
								console.log('2-3');
								if (err) console.log('Saving Address failed!');
								callback(null);
							});
						});
						
					}
				},

				function(callback){
					console.log('3-1');
					if(data.role_id == null || params.crewsId == null){
						console.log(params.crewsId);
						throw new Error("failed initializing role and crews!");
					}else{
						console.log('3-2');
						CareerInCrew.model.create({crews_object: params.crewsId}, function(err, ret){
							if (err) throw new error("Error happened when creating CareerInCrew Object" + err.message);
							ret.role = data.role_id;
							ret.men_count = params.position.count;
							ret.description = params.position.description;
							ret.address = data.address_id;
							ret.expired_date = params.position.duedate;
							ret.createdBy = params.author;
							ret.gender = params.position.genderwithid;
							ret.age = params.position.agewithid;
							data.men_count = params.position.count;
							data.rolename = params.position.rolename;
							data.roleCategory = params.position.roleCategory;
							data.provincename = params.position.provincename;
							data.duedate = params.position.duedate;
							data.gender = params.position.genderwithid;
							data.age = params.position.agewithid;
							data.description = params.position.description;
							ret.save(function(err){
								if(err) throw new Error('Create CareerInCrew faill!');
								callback(null, data, 200);
							});

						});
					}
				}
			
		],function (err, result, statId) {
			  console.log(statId);
			  console.log(result);
			  if (err) {
			  	return res.status(500).send(err);
			  	}else {
			  		result.ispositioncreate = true;
			  	//return res.status(statId).send(result);
			  	 res.redirect('/WX/wx_allpositions/null/null/null/null/:page?/null/'+timestamp);

			  }
			  	
		});
	} else {
		throw new Error("Not Accept Get Method of Posting Position Info");
	}
}