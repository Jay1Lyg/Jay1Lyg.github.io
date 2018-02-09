var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * School Model
 * ==========
 */

var School = new keystone.List('School',{
	label: '学校',
	singular: '学校',
	plural: '学校',
	track: true
});

School.add({
	name: { type: String, required: true, index: true },
	type: { type: Types.Relationship, ref: 'SchoolType',  refPath:'name', label: '学校类型'},
	isOfficial: { type: Types.Boolean, default: false, label: '是否被官网认可'}
});

School.defaultColumns = 'name, isOfficial';
School.register();
