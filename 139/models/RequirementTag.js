var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * RequirementTag Model
 * ==========
 */

var RequirementTag = new keystone.List('RequirementTag',{
	label: '职位需求标签',
	singular: '职位需求标签',
	plural: '职位需求标签',
	track: true
});

RequirementTag.add({
	name: { type: String, required: true, index: true },
	roleCategory: { type: Types.Relationship, ref: 'RoleCategory', index: true, label: '角色类别'}, 
	isOffcial: { type: Types.Boolean, default: false, label: '是否被官网认可'}
}
);

// Provide access to Keysto
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

RequirementTag.defaultColumns = 'name';
RequirementTag.register();
