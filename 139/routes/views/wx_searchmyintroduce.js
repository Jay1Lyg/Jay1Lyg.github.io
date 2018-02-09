
var format = require('../../query/save_and_get_data_in_MongoDB/resume/format.js');
var keystone = require('keystone'),
    User = keystone.list('User');

exports = module.exports = function(req, res) {
    var userid=req.params.userid;
	User.model.findOne({'_id': userid})
		.populate('hometown currentLocation careerInCrewsRelation')
		.exec(function(err, user) {
			if(user!=null){
				format.formatProfileBasicInfo(user, function(err,ret){
					if(err){
						return callback(err, null);
					}else{
						console.log(ret);
						res.render('page_myintroduce_edit',{
                        userid : userid,
                        shortintroduce : (ret==null) ? '' : ret.shortintroduce,
                        
                        })
					}
				});
			}
    		else{
    			return callback(true, 'The user ' + userid + 'cannot be found!');
    		}
	});	
}
