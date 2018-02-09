var keystone = require('keystone'),
	User = keystone.list('User'),



exports = module.exports = function(req, res) {
	if (req.method === 'POST') {
		var params = req.body;
		var data ={};
		console.log(params);
		User.model.findOne()
		.where('_id',params.userid)
		.exec(function(err,ret){
           if(err){
             return res.status(500).send(err);
           }else{
           	 ret.shortintroduce=params.shortintroduce;
           	 ret.save(function(err){
               if(err) throw new Error('save production object error!');
               res.redirect('/WX/muserprofile/'+params.userid);
           	 })
           }
		})
	}
};
