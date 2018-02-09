var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Role Model
 * ==========
 */

var PDF_Role = new keystone.List('PDF_Role',{
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '角色',
	singular: '角色',
	plural: '角色',
	track: true
});

PDF_Role.add({
	name: { type: String, required: true, index: true, label: '角色' }, 
	roleCategory: { type: Types.Relationship, ref: 'RoleCategory', index: true, label: '角色类别'}, 
	isOfficial: { type: Types.Boolean, default: false, label: '是否被官网认可'}
}
);

PDF_Role.defaultColumns = 'name, isOfficial';
PDF_Role.register();
