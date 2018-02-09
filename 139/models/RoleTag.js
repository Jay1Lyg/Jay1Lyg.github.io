var keystone = require('keystone');
var Types = keystone.Field.Types;


var RoleTag = new keystone.List('RoleTag', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '角色标签',
	singular: '角色标签',
	plural: '角色标签',
	track: true
});

RoleTag.add({
	name: { type: String, required: true, index: true, label: '角色标签' }
}
);


RoleTag.defaultColumns = 'name';
RoleTag.register();