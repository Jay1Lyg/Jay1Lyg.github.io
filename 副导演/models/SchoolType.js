var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * SchoolType Model
 * ==========
 */

var SchoolType = new keystone.List('SchoolType',{
	label: '学校类型',
	singular: '学校类型',
	plural: '学校类型',
	track: true
});

SchoolType.add({
	name: { type: String, required: true, index: true, label:'名称'},
	isOfficial: { type: Types.Boolean, default: false, label: '是否被官网认可'}
});


/**
 * Registration
 */

SchoolType.defaultColumns = 'name';
SchoolType.register();
