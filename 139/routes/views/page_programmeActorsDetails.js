var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
exports = module.exports = function (req, res) {
  var userid=req.params.userid;
  var directorid=req.params.directorid;
  var careerincrew_id=req.params.careerincrew_id;
  var productionid=req.params.productionid;
    res.render('page_programmeActorsDetails', {
        userid : userid,
        directorid : directorid,
        careerincrew_id : careerincrew_id,
        productionid : productionid
    });
};