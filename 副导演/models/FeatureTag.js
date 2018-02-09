var keystone = require('keystone');
var Types = keystone.Field.Types;


var FeatureTag = new keystone.List('FeatureTag', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '特征类型',
	singular: '特征类型',
	plural: '特征类型',
	track: true
});

FeatureTag.add({
	name: { type: String, required: true, index: true, label: '特征类型标签' }
}
);


FeatureTag.defaultColumns = 'name';
FeatureTag.register();
