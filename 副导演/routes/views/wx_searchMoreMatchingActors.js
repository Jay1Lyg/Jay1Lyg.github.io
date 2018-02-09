var keystone = require('keystone'),
	ActorBudget = keystone.list('ActorBudget'),
	ProgrammeMatchActor = keystone.list('ProgrammeMatchActor'),
	Programme = keystone.list('Programme'),
	ProgrammeInCareer = keystone.list('ProgrammeInCareer'),
	Production = keystone.list('Production'),
	ProgrammeInProduction = keystone.list('ProgrammeInProduction');
var async = require('async');
var config = require('../../public/conf/common.js');
var search = require('../../query/save_and_get_data_in_MongoDB/programme/search.js');
var urllib = require('url');

exports = module.exports = function(req, res) {
  var careerincrew_id = req.params.careerincrew_id;
  var attribute = req.params.attribute;
  var actorbudget_id = req.params.actorbudget_id;
  var page = req.params.page;
  var data = {};
  if(attribute == 1){//滑块
     ProgrammeMatchActor.paginate({
		page: page,
		perPage:10,
		maxPages: 10
	 })
	 .where({'SalaryoffsetValue':{$gt:(-0.3)}})//偏移值大于-30%的
	 .where({'SalaryoffsetValue':{$lt:(2)}})//偏移值xiao于200%的
	 .where('careerincrew_id',careerincrew_id)
	 .where('actorbudget_id',actorbudget_id)
	 .sort('-SalaryoffsetValue ')
	 .exec(function(err,ret){
	 	if(err){
          throw new Error(err);
	 	}else{
           data.currentPage = ret.currentPage;
		   data.totalPages = ret.totalPages;
		   search.searchActorMatchResults(ret.results,function(err,userarray){
              if(err){
                 throw new Error(err);
              }else{
              	 data.results = userarray;
              	 var params = urllib.parse(req.url,true);
              	 console.log('--------------data--------------');
              	 console.log(data);
              	 console.log('--------------data--------------');
              	 if(data== null){
				    if (params.query && params.query.callback) {
					    var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
					    res.send(str);
					} else {
					    res.send(JSON.stringify({}));//普通的json
					}
				 }else{
					if (params.query && params.query.callback) {	
				      var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
					  res.send(str);	          
					}else{
					   res.send(JSON.stringify(data));
					} 
				  }	
              }
		   });
	 	}
	 })

  }else if(attribute == 2){//自定义
     ProgrammeMatchActor.paginate({
		page: page,
		perPage:10,
		maxPages: 10
	 })
	 .where({'SalaryoffsetValue':{$gt:(-0.3)}})//偏移值大于-30%的
	 .where({'SalaryoffsetValue':{$lt:(2)}})//偏移值xiao于200%的
	 .where('careerincrew_id',careerincrew_id)
	 .sort('-SalaryoffsetValue ')
	 .exec(function(err,ret){
	 	if(err){
          throw new Error(err);
	 	}else{
           data.currentPage = ret.currentPage;
		   data.totalPages = ret.totalPages;
		   search.searchActorMatchResults(ret.results,function(err,userarray){
              if(err){
                 throw new Error(err);
              }else{
              	 data.results = userarray;
              	 var params = urllib.parse(req.url,true);
              	 if(data== null){
				    if (params.query && params.query.callback) {
					    var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
					    res.send(str);
					} else {
					    res.send(JSON.stringify({}));//普通的json
					}
				 }else{
					if (params.query && params.query.callback) {	
				      var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
					  res.send(str);	          
					}else{
					  res.send(JSON.stringify(data));
					} 
				  }	
              }
		   });
	 	}
	 })

  }

}