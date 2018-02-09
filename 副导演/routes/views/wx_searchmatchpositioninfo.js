var keystone = require('keystone');
var	ProductionMatchActor = keystone.list('ProductionMatchActor');
var	User = keystone.list('User');
var search = require('../../query/save_and_get_data_in_MongoDB/actor/search.js');
var urllib = require('url');
var async = require('async');
var search_resume = require('../../query/save_and_get_data_in_MongoDB/resume/search.js');
var config = require('../../public/conf/common.js');


exports = module.exports = function(req, res) {
   var careerincrewid = req.params.careerincrewid;
   var page = req.params.page;
   var result = {};
   var userArray = [];
   	 ProductionMatchActor.paginate({
		page: page,
		perPage:5,
		maxPages: 10
	 })
	 .where('careerincrewid',careerincrewid)
	 .sort('-total_degree')
	 .exec(function(err,ret){
        if(err){
           throw new Error(err);
        }else{
        	result.currentPage=ret.currentPage;
        	result.totalPages=ret.totalPages;
        	async.eachSeries(ret.results,function(item,next){
        		var data = {};
        		data.basicInfo_degree=item.basicInfo_degree;
        		data.feature_degree=item.feature_degree;
        		data.paycheck_degree=item.paycheck_degree;
        		data.schedule_degree=item.schedule_degree;
        		data.total_degree=item.total_degree;
        		data.userid=item.user_id;
        		data.realname=item.realname;
        		data.careerincrewid=item.careerincrewid;
                 Casting.model.findOne()
		           .where('user_id',item.user_id)
		           .exec(function(err,ret){
		              if(err){
		                throw new Error(err);
		              }else{
		                (ret!=null && ret.artimage.length!=0) ? (data.iconUrl =  config.homeEntry.url+'/WX/casting/artimage/' + ret.artimage[ret.artimage.length-1].filename) : (data.iconUrl="") ;
		                 userArray.push(data);
		                 next(); 
		              }
		           })
        	},function(err){
               if(err){
                  throw new Error(err);
               }else{
               	    result.results = userArray;
               	    console.log('---------result-----------');
                    console.log(result);
               	    console.log('---------result-----------');
               	    var params = urllib.parse(req.url,true);
			       	 if(result== null){
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
					          	 var str =  params.query.callback + '(' + JSON.stringify(result) + ')';//jsonp
					        	 res.send(str);	          
					      	} 
					    }
               }
        	})
        }
	 })

}