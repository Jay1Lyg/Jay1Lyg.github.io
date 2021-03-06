var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * CareerInCrew Model
 * ==========
 */

var CareerInCrew = new keystone.List('CareerInCrew',{
	// map: { name: 'name' },
	autokey: { path: 'slug', from: 'role', unique: true },
	label: '职位',
	singular: '职位',
	plural: '全部职位',
	track: true
});

CareerInCrew.add({//由crews_object和role区分唯一的careerInCrew
	crews_object: { type: Types.Relationship, ref: 'ProductionCrews', index: true, label: '剧组名称' },
	role: { type: Types.Relationship, ref: 'Role', refPath: 'name', index: true, label: '角色'}, 
	men_count: { type: Types.Number, label: '职位个数'},
	description: { type: Types.Textarea, label: '职位描述' },
	min_height: { type: String, label:'最低身高(cm)'},
	max_height: { type: String, label:'最高身高(cm)'},
	//gender: {type: String, label:'性别'},//author@zheng
	//age: { type: String, label:'年龄'},//author@zheng
	gender: { type: Types.Select, //auther@cincan
		options: [{ value: '1', label: '男'},
				  { value: '2', label: '女'},
				  { value: '3', label: '不详'},
				 ],
		default: '3',
		label: '性别'
	},
	age: { type: Types.Select,               //auther@cincan
		options: [{ value: '1', label: '婴幼儿'},//0~6岁
				  { value: '2', label: '少年'},//7~17岁
				  { value: '3', label: '青年'},//18~40岁
				  { value: '4', label: '中年'},//41~65岁
				  { value: '5', label: '老年'},//66岁以后
				  { value: '6', label: '不限'} //不限范围
				  ],
		default: '6',
		label: '年龄'
	},	
	salary_paid_by: { type: Types.Select, 
		options: [{ value: '1', label: '日薪'},
				  { value: '2', label: '周薪'},
				  { value: '3', label: '月薪'},
				  { value: '4', label: '年薪'}],
		default: '3',
		label: '付薪方式'
	},	
	shape: { type: Types.Select, 
		options: [{ value: '0', label: '不限'},
		          { value: '1', label: '瘦子'},
				  { value: '2', label: '偏瘦'},
		          { value: '3', label: '适中'},
				  { value: '4', label: '健硕'},
				  { value: '5', label: '胖子'},
				 ],
		default: '0',
		label: '体型'
	},
	role_paycheck:{ type: String, label: '片酬' },
	workingdays: { type: String, label: '拍摄周期(天)' },
	salary_amount: { type: Types.Number, label: '薪水' },
    benifit_tags: { type: Types.Relationship, ref: 'BenefitTag', refPath: 'name', many:true, label: '职位标签' },
    requirement_tags: { type: Types.Relationship, ref: 'RequirementTag', refPath: 'name', many:true, label: '职位需求标签' },
	// comments: { type: Types.Relationship,  ref: 'Comment', many: true, label: '评价' },
	candidates: { type: Types.Relationship, ref: 'Resume', many: true, label: '候选人' },
	subscribers: {type: Types.Relationship, ref: 'User', many: true, label: '审阅简历的人'},
	address: { type: Types.Relationship, ref: 'Address', refPath: 'name', many: true, label: '报名地点'},
	//expired_date: { type: Types.Date, label: '截止日期' },
	isRegistered: { type:Types.Boolean, default: false, label: '是否已注册'},
	publish_create: { type:Types.Boolean, default: true, label: '发布时创建'},//author@zheng 用来区分该职位model是发布时创建的还是添加参演经历是创建的 false表示添加参演经历时创建的 true表示发布职位时创建的
	is_effective: { type:Types.Boolean, default: true, label: '职位是否有效'},//author@zheng 用来表明该条职位是否有效
	is_expire: { type:Types.Boolean, default: false, label: '职位是否过期'},//author@zheng 用来表明该条职位是否过期
	openid: { type: String,label: '发布者的openid' }, //author@zheng 用来锁定职位的来源，主要功能是表明其来自哪个公众号，分隔通告信息在不同的公众号之下显示
    isDelete : { type:Types.Boolean, default: false, label: '是否删除'}
}
);

// Provide access to Keystone
//User.schema.virtual('canAccessKeystone').get(function() {
//	return this.isAdmin;
//});


/**
 * Relationships
 */

//User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

CareerInCrew.defaultColumns = '_id|20%, crews_object, role, men_count, description, isRegistered';
CareerInCrew.register();
