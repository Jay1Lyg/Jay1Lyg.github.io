var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * RightActor Model
 * 保存为副导演推荐的演员
 * ==========
 */

var RightActor = new keystone.List('RightActor', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '推荐演员',
	singular: '推荐演员',
	plural: '推荐演员',
	track: true
});

RightActor.add({
	careerincrew_id: { type: String, index: true, label: '职位id' },
	user_id: { type: String, index: true, label: '用户id' },
	basicInfo_degree: { type: Types.Number, label:'基本信息匹配度'},
	feature_degree: { type: Types.Number, label:'特征角色匹配度'},
	paycheck_degree: { type: Types.Number, label:'片酬需求匹配度'},
	schedule_degree: { type: Types.Number, label:'档期匹配度'},
	total_degree: { type: Types.Number, label:'总匹配度'},
});

RightActor.defaultColumns = 'careerincrew_id';
RightActor.register();