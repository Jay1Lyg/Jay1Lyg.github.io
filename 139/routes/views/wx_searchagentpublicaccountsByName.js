var keystone = require('keystone');
var User = keystone.list('User');
var PublicAccount = keystone.list('PublicAccount');
var async = require('async');
var urllib = require('url');
var search = require('../../query/save_and_get_data_in_MongoDB/weixin_public_account/search.js');

exports = module.exports = function(req, res) {
  var name = req.params.name;
  var pattern = new RegExp(name, 'i');
  PublicAccount.model.find()
   .where('')
}