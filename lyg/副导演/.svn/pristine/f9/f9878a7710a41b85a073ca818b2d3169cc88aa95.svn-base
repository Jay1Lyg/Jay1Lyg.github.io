var keystone = require('keystone');
var Types = keystone.Field.Types;


var RepertoireType = new keystone.List('RepertoireType', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '剧目类型',
	singular: '剧目类型',
	plural: '剧目类型',
	track: true
});

RepertoireType.add({
	category_id:  { type: String,initial: true, required: true, index: true, label: '剧目类型的id' },
	name: { type: String, required: true, index: true, label: '剧目类型' },
	
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

RepertoireType.defaultColumns = 'category_id,name';
RepertoireType.register();
