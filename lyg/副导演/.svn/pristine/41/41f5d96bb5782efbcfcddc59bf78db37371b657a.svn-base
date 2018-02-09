var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * RoleCategory Model
 * ==========
 */

var RoleCategory = new keystone.List('RoleCategory', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '职位类别',
	singular: '职位类别',
	plural: '职位类别',
	track: true
});

RoleCategory.add({
	name: { type: String, required: true, index: true, label: '职位类别名' }
}
);

// Provide access to Keystone
//User.schema.virtual('canAccessKeystone').get(function() {
//	return this.isAdmin;
//});


/**
 * Relationships
 */

//User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

RoleCategory.defaultColumns = 'name';
RoleCategory.register();
