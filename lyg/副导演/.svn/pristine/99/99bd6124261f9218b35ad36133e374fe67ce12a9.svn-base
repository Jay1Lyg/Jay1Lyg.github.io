
var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url');
var keystone = require('keystone'),
	RepertoireType = keystone.list('RepertoireType'),

exports = module.exports = function(req, res) {
	//var name = req.body.name || '';
	var id = req.params.id || '';
	//var id1 = req.body.id1 || '';
	console.log(req.params);
	// RepertoireType.model.create({
	// 	category_id:id,
	// 	name:name
	// },function(err,ret){
 //      if(err){
 //         throw new Error(err);
 //      }else{
 //      	res.send('success!');
 //      }
	// })
	RepertoireType.model.find()
	.where('category_id',id)
	.exec(function(err,ret){
       // async.each(ret,function(item,next){
       //    item.category_id=id1;
       //    item.save(function(err){
       //        next();
       //    });
       // })
       res.send(ret);
	})


}