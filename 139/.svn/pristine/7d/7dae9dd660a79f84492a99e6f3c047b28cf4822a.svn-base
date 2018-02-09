var keystone = require('keystone');
var Types = keystone.Field.Types;
//const Imagemin = require('imagemin');

/**
 * Production Model
 * ==========
 */

var MatchProduction = new keystone.List('MatchProduction', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '项目id',
	singular: '项目id',
	plural: '项目id',
	track: true
});

MatchProduction.add({
	prodction_id: { type: String,label: '项目id' }, //匹配成功的项目id
	agent_id: { type: String,label: '经纪人id' }, 
	//careerInCrewObj:{type: Types.Relationship, ref: 'MatchActor',label: '对应的职位'},
});


MatchProduction.defaultColumns = 'prodction_id';
MatchProduction.register();