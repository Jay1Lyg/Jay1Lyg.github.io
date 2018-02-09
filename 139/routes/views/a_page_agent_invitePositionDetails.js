var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
exports = module.exports = function (req, res) {
  var agentid=req.params.agentid;
  var production_id=req.params.production_id;
    res.render('a_page_agent_invitePositionDetails', {
        agentid : agentid,
        production_id : production_id
    });
};