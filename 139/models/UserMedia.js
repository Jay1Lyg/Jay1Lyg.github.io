var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Issuer Model
 * ==========
 */

var UserMedia = new keystone.List('UserMedia', {
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '用户作品',
	singular: '用户作品',
	plural: '用户作品',
	track: true
});

UserMedia.add({
	user_id: { type: String, label: '用户ID' },
	videos : {type: String, label:'用户视频'}
	
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

UserMedia.defaultColumns = 'user_id, production_crews_id';
UserMedia.register();
