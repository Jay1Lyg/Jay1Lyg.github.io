var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Category Model
 * ==========
 */

var Category = new keystone.List('Category', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '影片类型',
	singular: '影片类型',
	plural: '影片类型',
	track: true
});

Category.add({
	name: { type: String, required: true, index: true, label: '类型名' },
	//repertoireTpye: { type: Types.Relationship, ref: 'RepertoireType', refPath: 'name', many:true, label: '剧目类型'},
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

Category.defaultColumns = 'name';
Category.register();
