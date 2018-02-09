
/**
*
*
*     公众号与用户绑定的模型
*     BoundUserAndPublic model
*
*
*
*/
var keystone = require('keystone');
var Types = keystone.Field.Types;

var BoundUserAndPublic = new keystone.List('BoundUserAndPublic', {
	label: '公众号与用户绑定的模型',
	singular:'公众号与用户绑定的模型',
	plural: '公众号与用户绑定的模型',
	track: true
});

BoundUserAndPublic.add({
	isOperator: { type:Types.Boolean, default: false, label: '是否是管理员' }, //是否是管理员
	isSub: { type:Types.Boolean, default: false, label: '是否关注' }, //是否关注	
	openID: { type: String,label: '授权方昵称' }, //微信公众号下用户的oppenID
	AdministratorStatus: { type: Types.Select, 
		options: [{ value: '1', label: '副导演'},
				  { value: '2', label: '经纪人'},
				 ],
		default: '1',
		label: '入口'
	},
	appid: { type: Types.Relationship, ref: 'PublicAccount', refPath: 'appid', label: '授权方昵称' } //授权方appid
});

BoundUserAndPublic.defaultColumns = 'isSub, openID, appid';
BoundUserAndPublic.register();
