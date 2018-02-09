var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url');
exports = module.exports = function(req, res){
	var productionCrew_id = req.params.productionCrew_id || '';
	var agent_id = req.params.agent_id || '';
	var page = req.params.page || '';
	search.findmatchingPositionandActors(productionCrew_id,agent_id,page,function(err,infomation){
		if(err){
			res.send(err);
		}else{
		     var params = urllib.parse(req.url,true);
		     console.log('----infomation----');
		     console.log(infomation);
		     console.log('----infomation----');
		     //res.send(infomation);
	        if(infomation == null){
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
	               var str =  params.query.callback + '(' + JSON.stringify(infomation) + ')';//jsonp
	               res.send(str);           
	          } 
	      }
		}
	});
}