/*
*
*
*    授权的测试页面
*
*
*/
var keystone = require('keystone');

exports = module.exports = function (req, res) {
	console.log('授权页面相应中...');
	res.send("\
        <h1>"+'userinfo.nickname'+" 的个人信息</h1>\
        <p><img src='"+'userinfo.headimgurl'+"' /></p>\
        <p>"+'userinfo.city'+"，"+'userinfo.province'+"，"+'userinfo.country'+"</p>\
    ");
}