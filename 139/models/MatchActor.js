var keystone = require('keystone');
var Types = keystone.Field.Types;
//const Imagemin = require('imagemin');

/**
 * Production Model
 * ==========
 */

var MatchActor = new keystone.List('MatchActor', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '项目id',
	singular: '项目id',
	plural: '项目id',
	track: true
});

MatchActor.add({
	user_id: { type: String,label: '用户id' }, //匹配成功的项目id
	careerincrew_id: { type: String,label: '职位id' }, 
	matchProduction:{type: Types.Relationship, ref: 'MatchProduction',label: '对应的项目和经纪人'},
	basicInfo_degree: { type: Types.Number, label:'基本信息匹配度'},
	feature_degree: { type: Types.Number, label:'特征角色匹配度'},
	paycheck_degree: { type: Types.Number, label:'片酬需求匹配度'},
	schedule_degree: { type: Types.Number, label:'档期匹配度'},
	total_degree: { type: Types.Number, label:'总匹配度'},
});


MatchActor.defaultColumns = 'user_id';
MatchActor.register();