var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Skill Model
 * ==========
 */

var PDF_Skill = new keystone.List('PDF_Skill', {
	map: { name: 'user_id' },
	autokey: { path: 'slug', from: 'skilltype', unique: true },
	label: '技能',
	singular: '技能',
	plural: '技能',
	track: true
});

PDF_Skill.add({
	user_id:  { type: String,  label: '用户id' },
	name: {type:String,label:'技能特长'},
	isPublic: { type:Types.Boolean, default: true, label: '是否公开'}
});

/**
 * Registration
 */

PDF_Skill.defaultColumns = 'user_id, name, level, isPublic';
PDF_Skill.register();
