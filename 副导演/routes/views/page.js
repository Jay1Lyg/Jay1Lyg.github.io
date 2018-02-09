var keystone = require('keystone');
exports = module.exports = function (req, res) {
    var userid=req.params.userid;
    var appid=req.params.appid;
    res.render('page', {
        userid : userid,
        appid : appid
    });
};