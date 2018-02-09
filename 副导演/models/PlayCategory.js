var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Category Model
 * ==========
 */

var PlayCategory = new keystone.List('PlayCategory', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '剧本类别',
	singular: '剧本类别',
	plural: '剧本类别',
	track: true
});

PlayCategory.add({
	name: { type: String, required: true, index: true, label: '类别名' }
}
);

// 电视剧
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

PlayCategory.defaultColumns = 'name';
PlayCategory.register();
