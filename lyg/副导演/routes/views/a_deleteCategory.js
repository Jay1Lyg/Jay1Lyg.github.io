var keystone = require('keystone'),
    CareerInResume = keystone.list('CareerInResume');
    User = keystone.list('User');
    CaregoryInTarget = keystone.list('CaregoryInTarget');
var urllib = require('url');
var search = require('../../query/save_and_get_data_in_MongoDB/resume/search.js');

exports = module.exports = function(req, res) {
  console.log(req.body);
  var userid=req.body.userid;
  var category_id=req.body.category_id;
  CaregoryInTarget.model.remove()
   .where('category',category_id)
   .where('user_id',userid)
   .exec(function(err,ret){
      CaregoryInTarget.model.find()
	    .where('user_id',userid)
	    .exec(function(err,ret1){
	       if(err){
	          throw new Error(err);
	       }else{
	         search.getAllCareerType(ret1,function(err,ret2){
	           if(err){
	              throw new Error(err);
	           }else{
	               var params = urllib.parse(req.url,true);
                    if(ret2== null){
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
                          //console.log('请求2:'+params.query); 
                           var str =  params.query.callback + '(' + JSON.stringify(ret2.nameSet) + ')';//jsonp
                           res.send(str);           
                      } 
                  }
	           }
	         });
	       }
	    })
  })

}