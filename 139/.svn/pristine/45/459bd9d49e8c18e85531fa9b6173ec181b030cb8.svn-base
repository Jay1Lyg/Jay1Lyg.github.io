var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Issuer Model
 * ==========
 */

var Issuer = new keystone.List('Issuer', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '发行公司',
	singular: '发行公司',
	plural: '发行公司',
	track: true
});

Issuer.add({
	name: { type: String, required: true, index: true }
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

Issuer.defaultColumns = 'name';
Issuer.register();
