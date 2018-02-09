var keystone = require('keystone');
var Types = keystone.Field.Types;
//const Imagemin = require('imagemin');

/**
 * Production Model
 * ==========
 */

var MatchCareerInCrew = new keystone.List('MatchCareerInCrew', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '匹配出的职位',
	singular: '匹配出的职位',
	plural: '匹配出的职位',
	track: true
});

MatchCareerInCrew.add({
	careerincrew_id: { type: String,label: '职位id' }, //匹配成功的职位id
	agent_id: { type: String,label: '经纪人id' }, 
	userObj: {type: Types.Relationship, ref: 'MatchUser', many:true,label: '匹配成功的演员'}
});


MatchCareerInCrew.defaultColumns = 'careerincrew_id';
MatchCareerInCrew.register();