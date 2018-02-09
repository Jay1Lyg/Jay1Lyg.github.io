var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
exports = module.exports = function (req, res) {
  var agentid=req.params.agentid;
  var careerincrewid=req.params.careerincrewid;
    res.render('a_page_agent_applyActorlists', {
        agentid : agentid,
        careerincrewid : careerincrewid
    });
};