var keystone = require('keystone');
var	Resume = keystone.list('Resume');
var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url');
exports = module.exports = function(req, res){
	var productionCrew_id = req.params.productionCrew_id || '';
	var user_id =req.params.user_id || '';
	var careerincrewid = req.params.careerincrewid;
	console.log(req.params);
	search.findAllPosition(productionCrew_id,user_id,function(err,infomation){
		Resume.model.findOne()
		 .where('user_id',user_id)
		 .where('career_in_crews_id',careerincrewid)
		 .exec(function(err,ret){
            if(err){
				res.send(err);
			}else{
			     var params = urllib.parse(req.url,true);
			     console.log('----infomation1111111111111----');
			     console.log(infomation);
			      console.log('----infomation1111111111111----');
		        if(infomation == null){
		            //console.log('请求1:'+params);
		          if (params.query && params.query.callback) {
		              //console.log('请求2:'+params.query);
		              var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
		              console.log('))');
		              res.send(str);
		          } else {
		              res.send(JSON.stringify({}));//普通的json
		          }
		        }else{
		          if (params.query && params.query.callback) {
		          	   console.log('---走了吗---');
		          	   infomation.is_receive = ret.is_receive;
		               var str =  params.query.callback + '(' + JSON.stringify(infomation) + ')';//jsonp
		               res.send(str);           
		          } 
		      }
			}
		 })
	});
}