
var keystone = require('keystone'),
	Address = keystone.list('Address'),
	Areainfo = keystone.list('Areainfo'),
	Category = keystone.list('Category'),
	Production = keystone.list('Production'),
	ProductionCrews = keystone.list('ProductionCrews'),
	ProductionCompany = keystone.list('ProductionCompany'),
	Issuer = keystone.list('Issuer'),
	RoleCategory = keystone.list('RoleCategory'),
	Role = keystone.list('Role'),
	User = keystone.list('User'),
	CareerInCrew = keystone.list('CareerInCrew'),
    Category = keystone.list('Category'); 
    Invitation = keystone.list('Invitation'); 
var async = require('async');
var config = require('../../../public/conf/common.js');

/*
*author@zheng
*根据名称判断出品公司是否存在的方法,如果存在则返回id和name ,
*如果不存在，则新创条目并返回id和name
*/
var formatProductionCompanyInfo = function (name, callback){
	var data = {};//用来封装productionCompany的id和name
	ProductionCompany.model.create({name: name}, function (err, ret){
		if(err){
			callback(err, null);
		}else{
			data.id = ret._id;
			data.name = ret.name;
			ret.save( function (err){
				if(err){
					callback(err, null);
				}else{
					callback(null, data);
				}
			});
			
		}
	});
}

var formatIssuserCompanyInfo = function (name, callback){
	var data = {};//用来封装productionCompany的id和name
	Issuer.model.create({name: name}, function (err, ret){
		if(err){
			callback(err, null);
		}else{
			data.id = ret._id;
			data.name = ret.name;
			ret.save( function (err){
				if(err){
					callback(err, null);
				}else{
					callback(null, data);
				}
			});
			
		}
	});
}

var formatCategoryInfo = function (name, callback){
	var data = {};//用来封装productionCompany的id和name
	Category.model.create({name: name}, function (err, ret){
		if(err){
			callback(err, null);
		}else{
			data.id = ret._id;
			data.name = ret.name;
			ret.save( function (err){
				if(err){
					callback(err, null);
				}else{
					callback(null, data);
				}
			});
			
		}
	});
}

module.exports = {
	formatProductionCompanyInfo: formatProductionCompanyInfo,
	formatIssuserCompanyInfo: formatIssuserCompanyInfo,
	formatCategoryInfo: formatCategoryInfo
}

