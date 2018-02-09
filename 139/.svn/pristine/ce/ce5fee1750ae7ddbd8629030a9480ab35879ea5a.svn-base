var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Resume Model
 * ==========
 */

var Resume = new keystone.List('Resume', {
	// map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '简历',
	singular: '简历',
	plural: '简历',
	track: true
});

Resume.add({
	user_id:  { type: String,  label: '关联用户编号' },
	career_in_crews_id: { type: String, index: true },
	agentid: { type: String, index: true },
	productioncrew_id: { type: String, index: true },
	image_set: {  type: Types.TextArray, label: '图片'	},
	video_set: {  type: Types.TextArray, label: '视频'	},
	apply_letter: { type: Types.Textarea },
	isQualified: { type: Types.Boolean, default: false, label: '是否已签约'},
	isPublic: { type:Types.Boolean, default: true, label: '是否公开'},
	sign_up_create: { type:Types.Boolean, default: false, label: '报名时创建'},//author@zheng 用来区分该简历时报名时创建的还是完善信息是创建的 false表示完善信息时创建的 true表示报名时创建的
	is_receive: { type: String, default: '0', label: '是否接收'},//author@zheng '0'表示等待结果状态，'1'表示接受状态，'2'表示拒绝状态
	registration_rtatus:{ type: String, default: '0', label:'报名的状态'},//author@zheng ‘0’表示初始状态（未投递），‘1’表示已投递状态，'2'表示已查看状态
	read_date:{ type: String, label:'简历被查看的时间'},//author@zheng
	is_receive_date:{ type: String, label:'接受或拒绝建立的时间'}//author@zheng
});

/**
 * Registration
 */

Resume.defaultColumns = 'user_id, career_in_crews_id, isQualified, isPublic';
Resume.register();
