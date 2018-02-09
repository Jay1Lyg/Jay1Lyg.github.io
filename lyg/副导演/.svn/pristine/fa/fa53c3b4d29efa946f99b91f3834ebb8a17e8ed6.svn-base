var keystone = require('keystone');
var Types = keystone.Field.Types;
//const Imagemin = require('imagemin');

/**
 * 
 * 将方案滑块各类演员的预算比保存到数据库
 */

var Programme = new keystone.List('Programme', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '演员预算',
	singular: '演员预算',
	plural: '演员预算',
	track: true
});

Programme.add({
	name: { type: String,label: '方案名称' }, 
	actorbudget_id : { type: Types.Relationship, ref: 'ActorBudget', index: true, label: '演员预算id' },
	programmeinproduction : { type: Types.Relationship, ref: 'ProgrammeInProduction', index: true, label: '项目方案' },
	attribute: { type: Types.Select, 
		options: [{ value: '1', label: '使用滑块方案'},
				  { value: '2', label: '自定义方案'},
				  ],
		default: '1',
		label: '方案属性'
	},
});


Programme.defaultColumns = 'name';
Programme.register();