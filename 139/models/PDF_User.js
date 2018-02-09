var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var PDF_User = new keystone.List('PDF_User', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '用户',
	singular: '用户',
	plural: '用户',
	track: true
});

PDF_User.add({
	name: { type: String, required: false, index: true, label: '用户名' },
	password: { type: Types.Password, initial: true, required: false },
	realname: { type: String, index: true, label: '真名' },
	artname: { type: String, index: true, label: '艺名' },
	appid: { type: String, label: '公众号的appid' },
	resume_url: { type: String, label: 'html简历的url' },
	if_claim:{ type:Types.Boolean, default: false, label: '简历是否被认领'},
	birth: { type: Types.Date },
	gender: { type: Types.Select, 
		options: [{ value: '1', label: '男'},
				  { value: '2', label: '女'},
				  { value: '3', label: '不详'},
				 ],
		default: '3',
		label: '性别'
	},
	height: { type: Types.Number, label:'身高(cm)'},
	weight: { type: Types.Number, label:'体重(kg)'},
	openid: { type: String, label: 'openid' },//openid
    ProductionImageInPdf: { type: Types.LocalFiles,
		dest: 'images/ProductionImageInPdf/',
		prefix: 'ProductionImageInPdf',
		filename: function(item, customized_name) {
	    	return item._id + '/' + customized_name.originalname;
	    }
		, label: '简历中提取出的剧照'
	},
	hometown: { type: Types.Relationship, ref: 'Areainfo', refPath: 'name', label: '籍贯'},
	images: { type: Types.LocalFiles,
					dest: 'images/users/',
					prefix: 'users',
					filename: function(item, customized_name) {
				    	return item._id + '/' + customized_name.originalname;
				    }
					, label: '个人头像'
				},
	IDcardFrontImage: { type: Types.LocalFiles,
					dest: 'images/IDcardFrontImage/',
					prefix: 'IDcardFrontImage',
					filename: function(item, customized_name) {
				    	return item._id + '/' + customized_name.originalname;
				    }
					, label: '身份证正面照片'
				},
	IDcardBackImage: { type: Types.LocalFiles,
					dest: 'images/IDcardBackImage/',
					prefix: 'IDcardBackImage',
					filename: function(item, customized_name) {
				    	return item._id + '/' + customized_name.originalname;
				    }
					, label: '身份证反面照片'
				},
	ProductionImageInPdf: { type: Types.LocalFiles,
					dest: 'images/ProductionImageInPdf/',
					prefix: 'ProductionImageInPdf',
					filename: function(item, customized_name) {
				    	return item._id + '/' + customized_name.originalname;
				    }
					, label: '简历中提取出的剧照'
				},
	signature: { type: Types.Textarea },
	Telphone: {type: String ,label: '电话'},
	email: { type: Types.Email },
	id_number: { type: String ,label: '身份证号'},
	user_address: { type: String ,label: '具体住址'},
	shortintroduce: { type: String ,label: '一句话简介'},
	currentLocation: { type: Types.Relationship, ref: 'Areainfo', refPath: 'name', label: '现居地'},
	currentStatus:  { type: Types.Select, 
		options: [{ value: '1', label: '正在寻找下任剧组'},
				  { value: '2', label: '暂不考虑新的机会'}
				 ],
		default: '1',
		label: '状态'
	},
	isRead:{ type:Types.Boolean, default: false, label: '是否阅读简历'},//author@zheng 
	beInvitedNumber:{ type:Types.Number, default: 0, label: '被邀请的次数'},//author@cincan
	careerInCrewsRelation:{type: Types.Relationship, ref: 'CareerInCrew', label: '现任工作'},
	//isCertificate:{ type:Types.Boolean, default: false, label: '用户是否认证'},//author@cincan  用户是否经过认证
	isCertificate: { type: Types.Select, 
		options: [{ value: '0', label: '未提交审核'},
		          { value: '1', label: '待审核'},
				  { value: '2', label: '审核通过'},
				  { value: '3', label: '审核失败'},
				 ],
		default: '0',
		label: '审核'
	},
	roleInSystem: { type: Types.Select, 
		options: [{ value: '0', label: '演员'},
		          { value: '1', label: '经纪人'},
				  { value: '2', label: '副导演'},
				 ],
		default: '0',
		label: '用户在系统中的角色'
	},
	isManageAdmin:{type:Types.Boolean, default:false, label:'用户是否是系统的管理员'},//auther@cincan 用户时候是系统的管理员
	pdfresume: { type: Types.LocalFiles,
					dest: 'pdfresume/users/',
					prefix: 'pdfresume',
					filename: function(item, customized_name) {
				    	return item._id + '/' + customized_name.originalname;
				    }
					, label: '用户pdf简历'
				},
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
	role: { type: Types.Select, 
		options: [{ value: '1', label: '非注册会员'},
				  { value: '2', label: '注册求职者'},
				  { value: '3', label: '注册求贤者'},
				  { value: '4', label: '管理员'}],
		default: '1',
		label: '访问控制角色'
	},

});

// Provide access to Keystone
PDF_User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Relationships
 */

PDF_User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

PDF_User.defaultColumns = 'name, email, isAdmin ,isCertificate';
PDF_User.register();
