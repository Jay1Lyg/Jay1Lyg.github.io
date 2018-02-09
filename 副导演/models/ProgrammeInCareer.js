var keystone = require('keystone');
var Types = keystone.Field.Types;
//const Imagemin = require('imagemin');

/**
 * 
 * 每个方案下每个角色下加入方案的演员
 */

var ProgrammeInCareer = new keystone.List('ProgrammeInCareer', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '演员预算',
	singular: '演员预算',
	plural: '演员预算',
	track: true
});

ProgrammeInCareer.add({
	user_id: { type: Types.Relationship, ref: 'User', index: true, label: 'userid' },
	careerincrew_id: { type: Types.Relationship, ref: 'CareerInCrew', index: true, label: '职位id' },
	realname: { type: String, index: true, label: '真名' },
	programme : { type: Types.Relationship, ref: 'Programme', index: true, label: '方案id' },
	programmestate: { type: Types.Select, 
		options: [{ value: '1', label: '未添加'},
				  { value: '2', label: '已添加'},
				 ],
		default: '1',
		label: '是否添加到方案'
	},
	basicInfo_degree: { type: Types.Number, label:'基本信息匹配度'},
	feature_degree: { type: Types.Number, label:'特征角色匹配度'},
	paycheck_degree: { type: Types.Number, label:'片酬需求匹配度'},
	schedule_degree: { type: Types.Number, label:'档期匹配度'},
	total_degree: { type: Types.Number, label:'总匹配度'},
	SalaryoffsetValue : { type: Types.Number, label:'偏移值'},
});


ProgrammeInCareer.defaultColumns = 'user_id,careerincrew_id,programme';
ProgrammeInCareer.register();