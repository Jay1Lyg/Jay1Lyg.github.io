var keystone = require('keystone');
var Types = keystone.Field.Types;


var BoundProductionAndInvited = new keystone.List('BoundProductionAndInvited', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '演员',
	singular: '演员',
	plural: '演员',
	track: true
});

BoundProductionAndInvited.add({
	agentid: { type: String,label: '纪经人id' },
	production_id: { type: String,label: '项目id' }, 
	careerobj:{type: Types.Relationship, ref: 'Invitation', many:true,label: '被邀请者'}
	//careerobj :{ type: Types.Relationship, ref: 'CareerInCrew',  many: false, label: '职位信息'}, 
});


/**
 * Relationships
 */

BoundProductionAndInvited.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

BoundProductionAndInvited.defaultColumns = 'name, email';
BoundProductionAndInvited.register();
