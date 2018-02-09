var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * BenefitTag Model
 * ==========
 */

var BenefitTag = new keystone.List('BenefitTag',{
	label: '职位优势标签',
	singular: '职位优势标签',
	plural: '职位优势标签',
	track: true
});

BenefitTag.add({
	name: { type: String, required: true, index: true },
	isOffcial: { type: Types.Boolean, default: false, label: '是否被官网认可'}
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

BenefitTag.defaultColumns = 'name';
BenefitTag.register();
