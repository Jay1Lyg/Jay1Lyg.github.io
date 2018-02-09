var keystone = require('keystone');
var Types = keystone.Field.Types;


var User_Openid = new keystone.List('User_Openid',{
	// map: { name: 'name' },
	autokey: { path: 'slug', from: 'role', unique: true },
	label: '微信用户对应的Openid',
	singular: '微信用户对应的Openid',
	plural: '微信用户对应的Openid',
	track: true
});

User_Openid.add({//由crews_object和role区分唯一的careerInCrew
	openID:  { type: String,  label: 'openID' },
	userid:  { type: String,  label: 'userid' },
	Status: { type: Boolean, label: '登录状态'}
}
);


User_Openid.defaultColumns = '_id|20%, crews_object, role';
User_Openid.register();