var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
exports = module.exports = function (req, res) {
  var agentid=req.params.agentid;
  var productioncrew_id=req.params.productioncrew_id;
    res.render('a_page_agent_applyPositionDetails', {
        agentid : agentid,
        productioncrew_id : productioncrew_id
    });
};