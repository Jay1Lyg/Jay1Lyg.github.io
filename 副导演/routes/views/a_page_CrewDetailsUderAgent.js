var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
exports = module.exports = function (req, res) {
  var productionCrew_id=req.params.productionCrew_id;
  var user_id=req.params.user_id;
    res.render('a_page_CrewDetailsUderAgent', {
        productionCrew_id : productionCrew_id,
        user_id : user_id
    });
};