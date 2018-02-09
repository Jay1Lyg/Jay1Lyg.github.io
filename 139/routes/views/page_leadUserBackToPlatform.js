var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
exports = module.exports = function (req, res) {
  var appid=req.params.appid;
    res.render('page_leadUserBackToPlatform', {
        appid : appid
    });
};