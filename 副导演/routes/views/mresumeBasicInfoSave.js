var keystone = require('keystone');
var User = keystone.list('User');

exports = module.exports = function (req, res) {
    console.log('step1');
	console.log('---------------');
	console.log(req.body);
	console.log('---------------');
	  if(req.body.userid==undefined){
			User.model.create({
				name:'null',
				password:'null',
				realname:req.body.realname,
				artname:req.body.artname,
				gender:req.body.gender,
				birth:req.body.birth,
				height:req.body.height,
				weight:req.body.weight
			},
			function(err,ret){
               if (err) return res.status(500).send(err);
               else{
               	console.log(ret);
               	console.log('新创用户成功！');
                // res.send(ret);
                res.redirect('/WX/muserprofile/'+ret._id);
               }
			})
			
        }else{
        	User.model.findOne()
        	 .where('_id',req.body.userid)
		     .exec(function(err,ret){
		     	if(err){
                   return res.status(500).send(err);
		     	}else{
		        	(req.body.realname==undefined)? console.log('realname is null'):ret.realname=req.body.realname;
				    (req.body.artname==undefined)? console.log('artname is null'):ret.artname=req.body.artname;
				    (req.body.gender=='')? console.log('gender is null'):ret.gender=req.body.gender;
				    (req.body.birth=='')? console.log('birth is null'):ret.birth=req.body.birth;
				    (req.body.height==undefined)? console.log('height is null'):ret.height=req.body.height;
				    (req.body.weight==undefined)? console.log('weight is null'):ret.weight=req.body.weight;
					 ret.save(function (err) {
					    if (err) return res.status(500).send(err);
					   res.redirect('/WX/muserprofile/'+req.body.userid);
					 });
				}
			});
        }
}
