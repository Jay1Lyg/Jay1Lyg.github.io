var keystone = require('keystone'),
	ActorBudget = keystone.list('ActorBudget'),
	ProgrammeMatchActor = keystone.list('ProgrammeMatchActor'),
	Programme = keystone.list('Programme'),
	ProgrammeInCareer = keystone.list('ProgrammeInCareer'),
	Production = keystone.list('Production'),
	SliderPaycheck = keystone.list('SliderPaycheck'),
	ProgrammeInProduction = keystone.list('ProgrammeInProduction');
var async = require('async');
var config = require('../../public/conf/common.js');
var search = require('../../query/save_and_get_data_in_MongoDB/programme/search.js');
var urllib = require('url');
var format_position = require('../../query/save_and_get_data_in_MongoDB/position/format.js');
//将备选演员添加到方案---顺便计算该演员的匹配度
exports = module.exports = function(req, res) {
  var userid = req.params.userid;
  var careerincrew_id = req.params.careerincrew_id;
  var programme_id = req.params.programme_id;
  var actorbudget_id = req.params.actorbudget_id;
  var data = {};
  ProgrammeInCareer.model.find()//查询方案中人数是否超过三人
  .where('careerincrew_id',careerincrew_id)
  .where('programme',programme_id)
  .exec(function(err,user){
     if(err){
       throw new Error(err);
     }else{
       if(user.length>=3){
          var params = urllib.parse(req.url,true);
       	  //data.programmestate = user.programmestate;
       	  data.user_id = user.user_id;
       	  data.careerincrew_id = user.careerincrew_id;
       	  data.programme = user.programme;
       	  data.canadd = false;//不可再添加
       	  if(data == null){
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
       }else{
           ProgrammeInCareer.model.findOne()
		   .where('user_id',userid)
		   .where('careerincrew_id',careerincrew_id)
		   .where('programme',programme_id)
		   .exec(function(err,ret){
		      if(err){
		         throw new Error(err);
		      }else{
		      	 if(ret==null){//未添加过，要新创
		            ProgrammeInCareer.model.create({
		               user_id : userid,
		               careerincrew_id : careerincrew_id,
		               programme : programme_id,
		               programmestate : 2,//表明已经添加
		            },function(err,ret1){
		               if(err){
		                  throw new Error(err);
		               }else{
		               	if(actorbudget_id!=null){//不使用滑块
		               		ProductionMatchActor.model.findOne()
		               		.where('careerincrew_id',careerincrew_id)
		               		.where('user_id',userid)
		               		.exec(function(err,ret2){
                               if(err){
                                 throw new Error(err);
                               }else{
                               	 if(ret2==null){//需要重新匹配
	                                  search.matchActorAndCareerwithHand(careerincrew_id,userid,function(err,actor_results){
	                                     if(err){
	                                        throw new Error(err);
	                                     }else{
	                                     	  ret1.basicInfo_degree = actor_results.basicMatchingDegree;
			                               	  ret1.feature_degree = actor_results.featureMatchingDegree;
			                               	  ret1.paycheck_degree = actor_results.offsetMatchingDegree;
			                               	  ret1.schedule_degree = actor_results.scheduleMatchingDegree;
			                               	  ret1.total_degree = actor_results.totalMatchingDegree;
			                               	  ret1.SalaryoffsetValue = actor_results.SalaryoffsetValue;
			                               	  ret1.realname = actor_results.realname;
			                                  ret1.save(function(err,ret3){
			                                     if(err){
			                                        throw new Error(err);
			                                     }else{
			                                     	var params = urllib.parse(req.url,true);
								               	    data.programmestate = ret1.programmestate;
								               	    data.user_id = ret1.user_id;
								               	    data.careerincrew_id = ret1.careerincrew_id;
								               	    data.programme = ret1.programme;
									                if(data == null){
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

	                                     }
	                                  });
	                               }else{
	                               	  ret1.basicInfo_degree = ret2.basicInfo_degree;
	                               	  ret1.feature_degree = ret2.feature_degree;
	                               	  ret1.paycheck_degree = ret2.paycheck_degree;
	                               	  ret1.schedule_degree = ret2.schedule_degree;
	                               	  ret1.total_degree = ret2.total_degree;
	                               	  ret1.SalaryoffsetValue = ret2.SalaryoffsetValue;
	                               	  ret1.realname = ret2.realname;
	                                  ret1.save(function(err,ret3){
	                                     if(err){
	                                        throw new Error(err);
	                                     }else{
	                                     	var params = urllib.parse(req.url,true);
						               	    data.programmestate = ret1.programmestate;
						               	    data.user_id = ret1.user_id;
						               	    data.careerincrew_id = ret1.careerincrew_id;
						               	    data.programme = ret1.programme;
							                if(data == null){
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
	                               }
                               }
		               		})

		               	}else{//使用滑块
			               	 ProgrammeMatchActor.model.findOne()
			               	 .where('careerincrew_id',careerincrew_id)
			               	 .where('user_id',userid)
			               	 .exec(function(err,ret2){
	                            if(err){
	                               throw new Error(err);
	                            }else{
	                               if(ret2==null){//需要重新匹配
	                                  search.matchActorAndCareerwithSlider(careerincrew_id,actorbudget_id,user_id,function(err,actor_results){
	                                     if(err){
	                                        throw new Error(err);
	                                     }else{
	                                     	  ret1.basicInfo_degree = actor_results.basicMatchingDegree;
			                               	  ret1.feature_degree = actor_results.featureMatchingDegree;
			                               	  ret1.paycheck_degree = actor_results.offsetMatchingDegree;
			                               	  ret1.schedule_degree = actor_results.scheduleMatchingDegree;
			                               	  ret1.total_degree = actor_results.totalMatchingDegree;
			                               	  ret1.SalaryoffsetValue = actor_results.SalaryoffsetValue;
			                               	  ret1.realname = actor_results.realname;
			                                  ret1.save(function(err,ret3){
			                                     if(err){
			                                        throw new Error(err);
			                                     }else{
			                                     	var params = urllib.parse(req.url,true);
								               	    data.programmestate = ret1.programmestate;
								               	    data.user_id = ret1.user_id;
								               	    data.careerincrew_id = ret1.careerincrew_id;
								               	    data.programme = ret1.programme;
									                if(data == null){
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

	                                     }
	                                  });
	                               }else{
	                               	  ret1.basicInfo_degree = ret2.basicInfo_degree;
	                               	  ret1.feature_degree = ret2.feature_degree;
	                               	  ret1.paycheck_degree = ret2.paycheck_degree;
	                               	  ret1.schedule_degree = ret2.schedule_degree;
	                               	  ret1.total_degree = ret2.total_degree;
	                               	  ret1.SalaryoffsetValue = ret2.SalaryoffsetValue;
	                               	  ret1.realname = ret2.realname;
	                                  ret1.save(function(err,ret3){
	                                     if(err){
	                                        throw new Error(err);
	                                     }else{
	                                     	var params = urllib.parse(req.url,true);
						               	    //data.programmestate = ret1.programmestate;
						               	    data.user_id = ret1.user_id;
						               	    data.careerincrew_id = ret1.careerincrew_id;
						               	    data.programme = ret1.programme;
							                if(data == null){
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
	                               }
	                            }
			               	 })
                        }
		               }
		            })
		      	 }else{
		      	 	var params = urllib.parse(req.url,true);
			       	  //data.programmestate = ret.programmestate;
			       	  data.alreadyAdd = true;//已经添加，不可重复添加
			       	  data.user_id = ret.user_id;
			       	  data.careerincrew_id = ret.careerincrew_id;
			       	  data.programme = ret.programme;
			            if(data == null){
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
		   })
       }
     }
  })
}