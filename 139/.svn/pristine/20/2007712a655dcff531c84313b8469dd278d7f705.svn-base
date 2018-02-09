var keystone = require('keystone');
var Types = keystone.Field.Types;
//const Imagemin = require('imagemin');

/**
 * 
 * 用户生成方案的项目
 */

var ProgrammeInProduction = new keystone.List('ProgrammeInProduction', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '演员预算',
	singular: '演员预算',
	plural: '演员预算',
	track: true
});

ProgrammeInProduction.add({
	user_id: { type: Types.Relationship, ref: 'User', index: true, label: 'userid' },
	production_id: { type: Types.Relationship, ref: 'Production', index: true, label: '项目id' },
});


ProgrammeInProduction.defaultColumns = 'user_id,production_id';
ProgrammeInProduction.register();