
var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url');
var keystone = require('keystone'),
	RepertoireType = keystone.list('RepertoireType');
var async = require('async');

exports = module.exports = function(req, res) {
	//var name = req.body.name || '';
	var id = req.params.id || '';
	//var id = '\"\"';
	var id1 = req.params.id1 || '';
	//var i='"\"\""'
	//var id2=JSON.stringify(id);
	console.log(req.params);
	RepertoireType.model.find()
	.where('category_id',id)
	.exec(function(err,ret){
	   console.log('--------------------------');
	   console.log(ret);
	   //res.send(ret);
       async.each(ret,function(item,next){
       	 // console.log(item);
          item.category_id=id1;
          item.save(function(err){
              next();
          });
          
       },function(err){
	       	if(err){
	       		throw new Error(err);
	       	}
            res.send('success');
       })

	})


}