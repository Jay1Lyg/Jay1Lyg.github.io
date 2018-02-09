var keystone = require('keystone');
var Types = keystone.Field.Types;
//const Imagemin = require('imagemin');

/**
 * 
 * 通过方案滑块匹配全平台演员，将匹配成功的演员保存到数据库
 */

var ProgrammeMatchActor = new keystone.List('ProgrammeMatchActor', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '方案滑块匹配',
	singular: '方案滑块匹配',
	plural: '方案滑块匹配',
	track: true
});

ProgrammeMatchActor.add({
	user_id: { type: Types.Relationship, ref: 'User', index: true, label: '演员id' },
	careerincrew_id: { type: Types.Relationship, ref: 'CareerInCrew', index: true, label: '职位id' },
	//programme : { type: Types.Relationship, ref: 'Programme', index: true, many:true,label: '方案id' },
	actorbudget_id : { type: Types.Relationship, ref: 'ActorBudget', index: true, label: '演员预算' },
	realname: { type: String, label: '姓名' },
	basicInfo_degree: { type: Types.Number, label:'基本信息匹配度'},
	feature_degree: { type: Types.Number, label:'特征角色匹配度'},
	paycheck_degree: { type: Types.Number, label:'片酬需求匹配度'},
	schedule_degree: { type: Types.Number, label:'档期匹配度'},
	total_degree: { type: Types.Number, label:'总匹配度'},
	SalaryoffsetValue : { type: Types.Number, label:'偏移值'},
});


ProgrammeMatchActor.defaultColumns = 'user_id,careerincrew_id,basicInfo_degree,feature_degree,paycheck_degree,schedule_degree,total_degree';
ProgrammeMatchActor.register();