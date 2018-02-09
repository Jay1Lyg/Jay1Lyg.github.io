var keystone = require('keystone');
var Types = keystone.Field.Types;
//const Imagemin = require('imagemin');

/**
 * 
 *发布并筛选--将筛选结果保存到该model
 */

var ProductionMatchActor = new keystone.List('ProductionMatchActor', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '匹配项目id',
	singular: '匹配项目id',
	plural: '匹配项目id',
	track: true
});

ProductionMatchActor.add({
	careerincrew_id: { type: String,label: '角色信息id' },
	user_id: { type: String,label: '用户id' }, //匹配成功的项目id
	realname: { type: String,label: '用户名字' }, //匹配成功的项目id
	SalaryoffsetValue: { type: Types.Number, label:'偏移值'},
	basicInfo_degree: { type: Types.Number, label:'基本信息匹配度'},
	feature_degree: { type: Types.Number, label:'特征角色匹配度'},
	paycheck_degree: { type: Types.Number, label:'片酬需求匹配度'},
	schedule_degree: { type: Types.Number, label:'档期匹配度'},
	total_degree: { type: Types.Number, label:'总匹配度'},
});


ProductionMatchActor.defaultColumns = 'user_id';
ProductionMatchActor.register();