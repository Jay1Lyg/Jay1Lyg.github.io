var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
exports = module.exports = function (req, res) {
  var user_id=req.params.user_id;
  var director_appid=req.params.director_appid;
    res.render('a_page_CrewListsUderAgent', {
        user_id : user_id,
        director_appid : director_appid
    });
};