var keystone = require('keystone'),
	Invitation = keystone.list('Invitation');
var urllib = require('url');

exports = module.exports = function(req, res) {
	var invitation_id = req.params.invitation_id;
	var userid = req.params.invited_id;
	var state = req.params.state;
	var ndate = new Date();

	Invitation.model.findById(invitation_id)
	.exec(function(err, invitation) {
		invitation.invitestate = state;
		invitation.agree_or_refuse_date = ndate;
		invitation.save(function (err) {
		    if (err) console.log('change state failed');
		    var data = {};
		    data.index = true;
		    var params = urllib.parse(req.url,true);
		    if (params.query && params.query.callback) {
	           var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
	           res.send(str);
	        } else {
	       	   res.send(JSON.stringify(data));//普通的json
	        }
		});	

	});


};