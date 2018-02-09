var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url');
exports = module.exports = function(req, res){
	var production_id = req.params.production_id || '';
	var agent_id = req.params.agent_id || '';
	var careerincrew_id = req.params.careerincrew_id || '';
    var page = req.params.page || '';
    var params = urllib.parse(req.url,true);
    search.findmatchingActors(production_id,careerincrew_id,agent_id,page,function(err,ret){
       if(err){
         throw new Error(err);
       }else{
       	  if(ret == null){
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
	               var str =  params.query.callback + '(' + JSON.stringify(ret) + ')';//jsonp
	               res.send(str);           
	          } 
	      }
       }
    });
}