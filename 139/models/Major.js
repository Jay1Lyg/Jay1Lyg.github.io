var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Major Model
 * ==========
 */

var Major = new keystone.List('Major',{
	label: '专业',
	singular: '专业',
	plural: '专业',
	track: true
});

Major.add({
	name: { type: String, required: true, index: true, label:'名称'},
	isOfficial: { type: Types.Boolean, default: false, label: '是否被官网认可'}
});


/**
 * Registration
 */

Major.defaultColumns = 'name, isOfficial';
Major.register();
