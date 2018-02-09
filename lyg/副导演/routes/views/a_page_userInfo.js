var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
exports = module.exports = function (req, res) {
  var userid=req.params.userid;
  var appid=req.params.appid;
  console.log('------params------');
  console.log(req.params);
  console.log('------params------');
        res.render('a_page_agent_userInfo', {
            userid : userid,
            appId: appid           
        });
};