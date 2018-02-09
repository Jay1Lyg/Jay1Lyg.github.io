var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
exports = module.exports = function (req, res) {
  var user_id=req.params.user_id;
  var myappid = req.params.myappid;
    res.render('a_page_PublicAccountsListsUderAgent', {
    	user_id : user_id,
        myappid : myappid
    });
};