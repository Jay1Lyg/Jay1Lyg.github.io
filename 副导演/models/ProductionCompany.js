var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Issuer Model
 * ==========
 */

var ProductionCompany = new keystone.List('ProductionCompany',{
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '出品公司',
	singular: '出品公司',
	plural: '出品公司',
	track: true
});

ProductionCompany.add({
	name: { type: String, required: true, index: true },
	isRegistered: { type: Types.Boolean, default: false, label: '是否官网注册'}
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

ProductionCompany.defaultColumns = 'name';
ProductionCompany.register();
