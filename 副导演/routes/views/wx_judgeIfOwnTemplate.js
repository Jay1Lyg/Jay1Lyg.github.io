var keystone = require('keystone'),
	User = keystone.list('User');
var urllib = require('url');

exports = module.exports = function(req, res) {
   var userid = res.paras.userid;
   User.model.findOne()
   .where('_id',userid)
   .exec(function(err,ret){
      if(err){
         throw new Error(err);
      }else{
      	if(ret.resume_url == ''||undefined){//无模板情况，需要跳转到自定义模板
      	   var resume_url = '';
           res.send(ret.resume_url);   
      	}else{//有模板，返回模板url
           res.send(ret.resume_url);                 
      	}
      }
   })
}