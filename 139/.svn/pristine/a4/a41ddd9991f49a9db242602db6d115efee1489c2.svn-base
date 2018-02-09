var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
var config = require('../../public/conf/common.js');
exports = module.exports = function (req, res) {
  var url   = config.homeEntry.url+req.url;
  var agentid=req.params.agent_id;
  var appid=req.params.appid;
  console.log('------appid------');
  console.log(appid);
    res.render('a_page_agent_searchActorUnderAgent', {
        agentid : agentid,
        appid : appid
    });
};