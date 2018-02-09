var keystone = require('keystone'),
    CareerInResume = keystone.list('CareerInResume');
    User = keystone.list('User');
    BoundAgentAndActor = keystone.list('BoundAgentAndActor');
var urllib = require('url');

exports = module.exports = function(req, res) {
	var data={};
	var agentid = req.params.agentid || '';
	var userid = req.params.userid || '';
	BoundAgentAndActor.model.remove()
	 .where('agent_id',agentid)
	 .where('user_id',userid)
	 .exec(function(err,ret){
         User.model.findOne()
          .where('_id',userid)
          .exec(function(err,ret1){
             if(err){
               throw new Error(err);
             }else{
             	ret1.if_own_agent=false;
             	ret1.save(function(err){
                    data.index=true;
			        var params = urllib.parse(req.url,true);
					if (params.query && params.query.callback) {
				        var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
				        res.send(str);
				    } else {
				       	res.send(JSON.stringify(data));//普通的json
				    }
             	})
             }
          })
	 })

}