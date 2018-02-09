var keystone = require('keystone');
var User = keystone.list('User');
var Skill = keystone.list('Skill');
var EducationExperience = keystone.list('EducationExperience');
var School = keystone.list('School');
var SkillTag = keystone.list('SkillTag');
var FeatureTag = keystone.list('FeatureTag');
var BoundAgentAndActor = keystone.list('BoundAgentAndActor');
var async = require('async');
var urllib = require('url');

// var groupbyAge=function(born_year,callback){
//    var nowdate=new Date();

//         if((nowdate.getFullYear()-6)<=born_year && born_year<=nowdate.getFullYear()){
//             var age=1;
//             callback(null,age);
//         }
//         if((nowdate.getFullYear()-17)<=born_year && born_year<=(nowdate.getFullYear()-7)){
//             var age=2;
//             callback(null,age);
//         }
//         if((nowdate.getFullYear()-40)<=born_year && born_year<=(nowdate.getFullYear()-18)){
//             var age=3;
//             callback(null,age);
//         }
//         if((nowdate.getFullYear()-65)<=born_year && born_year<=(nowdate.getFullYear()-41)){
//             var age=4;
//             callback(null,age);
//         }
//         if((nowdate.getFullYear()-66)>=born_year){
//             var age=5;
//             callback(null,age);
//         }else{
//         	var age=6;
//             callback(null,age);
//         }
// }

exports = module.exports = function (req, res) {
    console.log('step1');
	console.log('---------------');
	console.log(req.body);
	console.log('---------------');
	var data={};
	  console.log(req.body.userid=='');
	  if(req.body.userid==''){//表明是新用户，第一次添加
	  	async.waterfall([
	  	 function(callback){
	  		User.model.create({
				name:'null',
				password:'null',
				realname:req.body.realname,
				artname:req.body.artname,
				gender:req.body.gender,
				birth:req.body.birth,
				height:req.body.height,
				bust:req.body.bust,
				waist:req.body.waist,
				hip:req.body.hip,
				weight:req.body.weight,
				schoolname:req.body.schoolname,
				if_own_agent:true,
				//shortintroduce:req.body.shortintroduce,
				skill:req.body.skillArray,
				feature:req.body.featureArray,
				email : req.body.realname+'@qq.com'
			},
			function(err,ret){
               if (err) console.log(err);
               else{
               	 console.log(ret);
               	 console.log('新创用户成功！');
               	 User.model.findOne()//查询经纪人手机号
               	  .where('_id',req.body.agentid)
               	  .exec(function(err,ret1){
                     if(err){
                        throw new Error(err);
                     }else{
                     	User.model.findOne()
                     	 .where('_id',ret._id)
                     	 .exec(function(err,ret2){
                            ret2.agentTelphone=ret1.telephone;
                            ret2.save(function(err){
                               if(err){
                                 throw new Error(err);
                               }else{
                               	 callback(null,ret); 
                               }
                            })
                     	 })
                     }
               	  })
                             
               }
			})
	  	},
	  	function(arg,callback){//将演员与经纪人绑定
          BoundAgentAndActor.model.findOne()
          .where('agent_id',req.body.agent_id)
          .where('user_id',arg._id)
          .where('user_gender',arg.gender)
          .exec(function(err,ret){
            if(ret==null){
              BoundAgentAndActor.model.create({agent_id:req.body.agentid,user_id:arg._id,user_gender:arg.gender,appid:req.body.appId},function(err,ret1){
                  if(err){
                     throw new Error(err)
                  }else{
                    data.userid=arg._id;
                  	callback(null);
                  }
              })

            }else{
            	ret.gender=arg.gender;
            	data.userid=arg._id;
            	ret.save(function(err){
                   callback(null);
            	})
            	
            }
          })

	  	}],function(err){
             if(err){
               throw new Error(err);
             }else{
		        data.index=true;
		        var params = urllib.parse(req.url,true);
				if (params.query && params.query.callback) {
			        var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
			        res.send(str);
			    } else {
			       	res.send(JSON.stringify(data));//普通的json
			    }
             }
	  	});
			
			
        }else{
        	async.waterfall([
        	  function(callback){
        		User.model.findOne()
		    	 .where('_id',req.body.userid)
			     .exec(function(err,ret){
			     	if(err){
		               return res.status(500).send(err);
			     	}else{
			        	(req.body.realname==undefined)? console.log('realname is null'):ret.realname=req.body.realname;
					    (req.body.artname==undefined)? console.log('artname is null'):ret.artname=req.body.artname;
					    (req.body.gender=='')? console.log('gender is null'):ret.gender=req.body.gender;
					    (req.body.birth=='')? console.log('birth is null'):ret.birth=req.body.birth;
					    (req.body.height==undefined)? console.log('height is null'):ret.height=req.body.height;
					    (req.body.weight==undefined)? console.log('weight is null'):ret.weight=req.body.weight;

					    (req.body.bust==undefined)? console.log('bust is null'):ret.bust=req.body.bust;
					    (req.body.waist==undefined)? console.log('waist is null'):ret.waist=req.body.waist;
					    (req.body.hip==undefined)? console.log('hip is null'):ret.hip=req.body.hip;
					    (req.body.schoolname==undefined)? console.log('schoolname is null'):ret.weight=req.body.schoolname;

					    (req.body.agentTelphone==undefined)? console.log('agentTelphone is null'):ret.agentTelphone=req.body.agentTelphone;
					    //(req.body.shortintroduce==undefined)? console.log('shortintroduce is null'):ret.shortintroduce=req.body.shortintroduce;
					    ret.skill=req.body.skillArray;
				        ret.feature=req.body.featureArray;
						 ret.save(function (err) {
						 	if(err){
                               throw new Error(err);
						 	}else{
						 	  BoundAgentAndActor.model.findOne()
					          .where('agent_id',req.body.agent_id)
					          .where('user_id',req.body.userid)
					          .exec(function(err,ret){
					            if(ret==null){
					              BoundAgentAndActor.model.create({agent_id:req.body.agent_id,user_id:arg._id,user_gender:arg.gender},function(err,ret1){
					                  if(err){
					                     throw new Error(err)
					                  }else{
					                  	callback(null);
					                  }
					              })

					            }else{
					            	ret.user_gender=req.body.gender;
						            ret.save(function(err){
						              if(err){
	                                     throw new Error(err);
						              }else{
	                                     callback(null);
	                                  }
						            })
					            }
					          })
				            }
						 });
					}
				});

        	  }
        	  ],function(err){
		         if(err){
		           throw new Error(err);
		         }else{
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
        	
        }
}
