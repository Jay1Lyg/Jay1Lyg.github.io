var keystone = require('keystone'),
    CareerInResume = keystone.list('CareerInResume');
    ProgrammeInCareer = keystone.list('ProgrammeInCareer');
var urllib = require('url');
exports = module.exports = function(req, res) {
  var user_id = req.params.user_id;
  var careerincrew_id = req.params.careerincrew_id;
  var programme_id = req.params.programme_id;
  ProgrammeInCareer.model.remove()
   .where('user_id',user_id)
   .where('careerincrew_id',careerincrew_id)
   .where('programme',programme_id)
   .exec(function(err,ret){
     if(err){
       throw new Error(err);
     }else{
        var data={};
      	data.index = true;
      	var params = urllib.parse(req.url,true);
  		  if (params.query && params.query.callback) {
  	       var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
  	       res.send(str);
  	    } else {
  	       res.send(JSON.stringify(data));
  	    }
       }
   })
}