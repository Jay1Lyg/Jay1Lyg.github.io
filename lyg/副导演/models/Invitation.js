var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 *  Invitation Model
 *  auther@cincan
 * ==========
 */

var Invitation = new keystone.List('Invitation', {
	// map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '邀请',
	singular: '邀请',
	plural: '邀请',
	track: true
});

Invitation.add({
	career_in_crews: { type: Types.Relationship, ref: 'CareerInCrew',  many: false, label: '职位信息'}, 
	agentid: { type: Types.Relationship, ref: 'User',  many: false, label: '经纪人id'}, 
	inviter: { type: Types.Relationship, ref: 'User',  many: false, label: '邀请人'}, 
	invited: { type: Types.Relationship, ref: 'User',  many: false, label: '被邀请人'}, 
	invitestate: { type: Types.Select, 
		options: [{ value: '1', label: '未处理'},
				  { value: '2', label: '同意'},
				  { value: '3', label: '拒绝'},
				 ],
		default: '1',
		label: '邀约状态'
	},
	invite_date:{ type: String, label:'邀请时间'},
	agree_or_refuse_date:{ type: String, label:'同意或拒绝邀请的时间'},
});

/**
 * Registration
 */

Invitation.defaultColumns = 'career_in_crews , inviter , invited';
Invitation.register();
