var keystone = require('keystone');
var Types = keystone.Field.Types;


var Code = new keystone.List('Code',{
	//map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '验证码',
	singular: '验证码',
	plural: '验证码',
	track: true
});

Code.add({
	telephone: { type: String }, 
	expires_in: { type: Types.Number, index: true, label: '验证码的有效期节点' },
	code: { type: String,label: '验证码'},
	isUse: { type:Types.Boolean, default: true, label: '是否使用'}//true 没有使用
}
);


Code.defaultColumns = 'name, isOfficial';
Code.register();
