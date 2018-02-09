/*
*
*
*     微信端发布通告的信息
*
*
*
*/
var keystone = require('keystone'),
	Role = keystone.list('Role'),
	Address = keystone.list('Address'),
	CareerInCrew = keystone.list('CareerInCrew');
var async = require('async');

exports = module.exports = function(req, res) {
	if (req.method === 'POST') {
		var params = req.body;
		console.log('接收到的前端数据：'+params);
	}

}

