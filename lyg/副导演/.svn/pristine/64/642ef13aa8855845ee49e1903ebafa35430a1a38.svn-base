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
    Category = keystone.list('Category'); 
var async = require('async');
var config = require('../../public/conf/common.js');
var format = require('../../query/save_and_get_data_in_MongoDB/position/format.js');
var urllib = require('url');
exports = module.exports = function(req, res) {
	var userid = req.params.user_id;
	var page = req.params.page;
	var info = {};
	var result=[];
	var now_date = new Date();
    console.log('----------前台数据-----------');
	console.log(req.params);
	console.log('----------前台数据-----------');
	Production.paginate({
		page: page,
		perPage: 5,
		maxPages: 100
	})
	 .where('isCreated',true)
	 .where('isPost',true)
	 .where('createdBy',userid)
	 .populate('production_crews category location')
	 .sort("-createdAt")
	 .exec(function(err,ret){
       if(err){
         throw new Error(err);
       }else{
       	  info.currentPage = ret.currentPage;
       	  info.totalPages = ret.totalPages;
       	  async.eachSeries(ret.results,function(item,next){
            var data={};
            console.log('ppp');
            console.log(item);
            console.log(item.production_crews.length);
            console.log(item.production_crews.length!=0);
            if(item.production_crews.length!=0){
            	data.id = item._id;
				data.introduction = item.introduction;
				data.actorBudget = item.actorBudget;
				data.duration = item.duration;
				data.investmentAmount = item.investmentAmount;
				data.location = item.location;
				data.locationname = item.location.name;
				data.expired_date = item._.expired_date.format('YYYY-MM-DD');
				data.remaining_days = Math.floor( (item.expired_date.getTime() - now_date.getTime())/3600000/24 );
				data.address = item.address;
				data.isRegistered = item.isRegistered;				
				data.production_companys = item.production_companys;
				data.issuer_companies = item.issuer_companies;
				data.author_name = item.createdBy.name;
				data.appid = item.appid;
				data.repertoireTpyeArray=item.repertoireTpyeArray;
				data.categoryName=item.categoryName;
				data.categoryid=item.categoryid;
				data.production_crews=item.production_crews;
				data.isDelete=item.isDelete;
				(item.images.length>0) ? (data.production_image = config.homeEntry.url+'/WX/poster/production/' + item._id+'/'+(item.images)[item.images.length-1].originalname) : (data.production_image="") ;
				(item.compress_images.length>0) ? (data.compress_production_image = config.homeEntry.url+'/WX/poster/compress_production/' + item._id+'/'+(item.compress_images)[item.compress_images.length-1].originalname) : (data.compress_production_image="") ;
				format.formatcategorytags(item._id,function(err,tag){
                   if(err){
                      throw new Error(err);
                   }else{
                   	 if(tag==null){
                        next();
                   	 }else{
                   	   data.tags=tag;
                   	   result.push(data);
	                   next();
	                 }
                   }
				});
	            
            }else{
            	next();
            }

       	  },function(err){
             if(err){
               throw new Error(err);
             }else{
             	// console.log('-----------result-------------');
             	// console.log(result);
             	// console.log('-----------result-------------');
             	info.results = result;
               	var params = urllib.parse(req.url,true);
  		       	if(info == null){
  			        	//console.log('ÇëÇó1:'+params);
  			        if (params.query && params.query.callback) {
  			          	//console.log('ÇëÇó2:'+params.query);
  			          	var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
  			        	res.send(str);
  			      	} else {
  			       		res.send(JSON.stringify({}));//ÆÕÍ¨µÄjson
  			      	}
  		        }else{
  		        	if (params.query && params.query.callback) {
  			          	//console.log('ÇëÇó2:'+params.query);	
  			          	 var str =  params.query.callback + '(' + JSON.stringify(info) + ')';//jsonp
  			        	 res.send(str);	          
  			      	} 
  			    }
			
             }
       	  })
       }
	 })

}