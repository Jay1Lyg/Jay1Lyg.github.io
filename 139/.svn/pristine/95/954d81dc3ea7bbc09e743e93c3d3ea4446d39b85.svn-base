var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * SkillType Model
 * ==========
 */

var SkillType = new keystone.List('SkillType',{
	label: '技能名称',
	singular: '技能名称',
	plural: '技能名称',
	track: true
});

SkillType.add({
	name: { type: String, required: true, index: true, label:'名称'},
	isOfficial: { type: Types.Boolean, default: false, label: '是否被官网认可'}
});


/**
 * Registration
 */

SkillType.defaultColumns = 'name, isOfficial';
SkillType.register();
