var keystone = require('keystone');
var Types = keystone.Field.Types;
//const Imagemin = require('imagemin');

/**
 * 
 * 添加到备选--以角色分，同一个角色共用一个备选库
 */

var AlternativeActor = new keystone.List('AlternativeActor', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '添加到备选',
	singular: '添加到备选',
	plural: '添加到备选',
	track: true
});

AlternativeActor.add({
	user_id: { type: Types.Relationship, ref: 'User', index: true, label: '演员userid' },
	//adder_id: { type: Types.Relationship, ref: 'User', index: true, label: '添加人的userid' },
	careerincrew_id: { type: Types.Relationship, ref: 'CareerInCrew', index: true, label: '职位id' },
	addstate: { type: Types.Select, 
		options: [{ value: '1', label: '未添加'},
				  { value: '2', label: '已添加'},
				 ],
		default: '1',
		label: '是否添加到备选'
	},
	source: { type: Types.Select, 
		options: [{ value: '1', label: '添加到备选'},
				  { value: '2', label: '我邀请的'},
				  { value: '3', label: '申请我的'}
				 ],
		default: '1',
		label: '演员来源'
	},
	isDelete:{ type:Types.Boolean, default: false, label: '是否删除'},
});


AlternativeActor.defaultColumns = 'user_id,careerincrew_id';
AlternativeActor.register();