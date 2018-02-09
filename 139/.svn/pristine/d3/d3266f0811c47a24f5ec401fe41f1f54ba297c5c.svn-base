var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Skill Model
 * ==========
 */

var Skill = new keystone.List('Skill', {
	map: { name: 'user_id' },
	autokey: { path: 'slug', from: 'skilltype', unique: true },
	label: '技能',
	singular: '技能',
	plural: '技能',
	track: true
});

Skill.add({
	user_id:  { type: String,  label: '用户id' },
	name: {type:String,label:'技能特长'},
	//skilltype: { type: Types.Relationship, ref: 'SkillType',  refPath:'name', label: '技能名称'},
	// level: { type: Types.Select, 
	// 	options: [{ value: '1', label: '了解'},
	// 			  { value: '2', label: '初级'},
	// 			  { value: '3', label: '中级'},
	// 			  { value: '4', label: '高级'}],
	// 	default: '2',
	// 	label: '熟练程度'
	// },
	isPublic: { type:Types.Boolean, default: true, label: '是否公开'}
});

/**
 * Registration
 */

Skill.defaultColumns = 'user_id, name, level, isPublic';
Skill.register();
