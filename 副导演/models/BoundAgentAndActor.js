var keystone = require('keystone');
var Types = keystone.Field.Types;


var BoundAgentAndActor = new keystone.List('BoundAgentAndActor', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '经纪人-演员',
	singular: '经纪人-演员',
	plural: '经纪人-演员',
	track: true
});

BoundAgentAndActor.add({
	agent_id: { type: String,  label: '经纪人id' },
	user_id: { type: String,  label: '用户id' },
	user_gender: { type: Types.Select, 
		options: [{ value: '1', label: '男'},
				  { value: '2', label: '女'},
				  { value: '3', label: '不详'},
				 ],
		default: '3',
		label: '性别'
	},
    appid: { type: String,label: 'appid' },
    allok:{ type:Types.Boolean, default: false, label: '资料是否填写完毕'},

	
});





BoundAgentAndActor.defaultColumns = 'agent_id, user_id';
BoundAgentAndActor.register();