var keystone = require('keystone');
var Types = keystone.Field.Types;


var SkillTag = new keystone.List('SkillTag', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '技能标签',
	singular: '技能标签',
	plural: '技能标签',
	track: true
});

SkillTag.add({
	name: { type: String, required: true, index: true, label: '技能标签' }
}
);


SkillTag.defaultColumns = 'name';
SkillTag.register();