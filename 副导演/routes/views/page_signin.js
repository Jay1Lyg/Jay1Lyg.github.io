
var keystone = require('keystone');
var PublicAccount = keystone.list('PublicAccount');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var fs = require('fs');
exports = module.exports = function (req, res) { 
	var index=req.params.index;
	var openid=req.params.openid;
	var appid=req.params.appid;
	console.log(index);
	console.log(openid);
	PublicAccount.model.findOne()
	.where('appid',appid)
	.exec(function(err,ret){
       BoundUserAndPublic.model.findOne()
        .where('appid',ret._id)
        .exec(function(err,ret1){
           if(ret1.AdministratorStatus==1){
              res.render('page_signin',{
				 index:index,
				 openid:openid,
				 appid:appid
			  })
           }else if(ret1.AdministratorStatus==2){
               res.render('a_page_agent_signin',{
				 index:index,
				 openid:openid,
				 appid:appid
			  })
           }
        })
	})
   
};