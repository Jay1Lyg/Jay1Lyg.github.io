var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Issuer Model
 * ==========
 */

var ProductionCrews = new keystone.List('ProductionCrews', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '剧组',
	singular: '剧组',
	plural: '剧组',
	track: true
});

ProductionCrews.add({
	name: { type: String, required: true, index: true, label: '剧组名称' },
	production: { type: Types.Relationship, ref: 'Production', refPath: 'name', label: '影片'}, 
	isRegistered: { type: Types.Boolean, default: false, label: '是否注册'}
}
);

ProductionCrews.defaultColumns = 'name, isRegistered';
ProductionCrews.register();
