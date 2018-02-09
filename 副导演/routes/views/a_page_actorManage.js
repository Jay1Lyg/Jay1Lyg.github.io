var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
exports = module.exports = function (req, res) {
  var agentid=req.params.agent_id;
  var appid=req.params.appid;
  console.log('------appid------');
  console.log(appid);
    res.render('a_page_agent_actorManage', {
        agentid : agentid,
        appid : appid
    });
};