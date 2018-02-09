var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * EducationExperience Model
 * ==========
 */

var EducationExperience = new keystone.List('EducationExperience', {
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '教育经历',
	singular: '教育经历',
	plural: '教育经历',
	track: true
});

EducationExperience.add({
	user_id:  { type: String,  label: '用户id' },
	duration: { type: String, label: '时间段' },
	school: { type: Types.Relationship, ref: 'School',  refPath:'name', label: '学校'},
	major: { type: Types.Relationship, ref: 'Major',  refPath:'name', label: '主修专业'},
	certificate: { type: String, label: '所获证书/学历' },
	isPublic: { type:Types.Boolean, default: true, label: '是否公开'}
});

/**
 * Registration
 */

EducationExperience.defaultColumns = 'duration, school, major, certificate';
EducationExperience.register();
