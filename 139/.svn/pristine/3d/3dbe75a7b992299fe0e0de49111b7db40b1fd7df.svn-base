var keystone = require('keystone'),
	Invitation = keystone.list('Invitation');

exports = module.exports = function(req, res) {
	var invitation_id = req.params.invitation_id;
	var userid = req.params.invited_id;
	var state = req.params.state;

	Invitation.model.findById(invitation_id)
	.exec(function(err, invitation) {
		invitation.invitestate = state;
		invitation.save(function (err) {
				    if (err) console.log('change state failed');
				     return res.status(200).redirect('/WX/page_Invitedrecord/'+userid);
				});	

	});


};