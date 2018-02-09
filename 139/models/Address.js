var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Address Model
 * ==========
 */

var Address = new keystone.List('Address',{
	label: '地址名称',
	singular: '地址名称',
	plural: '地址名称',
	track: true
});

Address.add({
	name: { type: String, required: true, index: true, label:'名称'},
	area: { type: Types.Relationship, ref: 'Areainfo', refPath: 'name', index: true, many:false, label: '城市名称'}, 
	isOfficial: { type: Types.Boolean, default: false, label: '是否被官网认可'}
});


/**
 * Registration
 */

Address.defaultColumns = 'name, area, isOfficial';
Address.register();
