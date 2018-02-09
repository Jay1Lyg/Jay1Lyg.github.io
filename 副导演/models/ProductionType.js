var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Category Model
 * ==========
 */

var ProductionType = new keystone.List('ProductionType', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '影视产品、剧本类型',
	singular: '影视产品、剧本类型',
	plural: '影视产品、剧本类型',
	track: true
});

ProductionType.add({
	name: { type: String, required: true, index: true, label: '类型名' }
}
);

// 校园 青春
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

ProductionType.defaultColumns = 'name';
ProductionType.register();
