var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Comment Model
 * ==========
 */

var Comment = new keystone.List('Comment', {
	//map: { name: 'author' },
	//autokey: { path: 'slug', from: 'author', unique: true },
	label: '评价',
	singular: '评价',
	plural: '评价',
	track: true
});

Comment.add({
	career_in_crews_object_id: { type: String,  index: true },
	person_be_commented: { type: String, label: '评价对象'},
	content: { type: Types.Textarea }, 
	author: { type: Types.Relationship, ref: 'User', refPath: 'name', index: true },
	date: { type: Types.Datetime,  index: true },
	score: { type: Types.Number}
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

Comment.defaultColumns = 'career_in_crews_object_id，person_be_commented ';
Comment.register();
