var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
exports = module.exports = function (req, res) {
  //var url   = 'http://kaishi.viphk.ngrok.org'+req.url;
  var userid=req.params.user_id;
  var production_id=req.params.production_id;
  var production_crews_id=req.params.production_crews_id;
  var openid=req.params.openid;
  console.log('------params------');
  console.log(req.params);
  console.log('------params------');
      res.render('page_addroleinfo', {
          userid : userid,
          production_id: production_id,
          production_crews_id: production_crews_id,
          openid: openid,
      });

};