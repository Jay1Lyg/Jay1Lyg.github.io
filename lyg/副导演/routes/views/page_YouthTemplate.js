var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
exports = module.exports = function (req, res) {
  var appid=req.params.appid;
  var productionCrew_id = req.params.productionCrew_id;
    res.render('page_YouthTemplate', {
        appid : appid,
        productionCrew_id : productionCrew_id
    });
};