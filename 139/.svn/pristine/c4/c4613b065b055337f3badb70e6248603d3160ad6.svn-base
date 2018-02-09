var keystone = require('keystone');
var Types = keystone.Field.Types;
//const Imagemin = require('imagemin');

/**
 * Production Model
 * ==========
 */

var Production = new keystone.List('Production', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '影片',
	singular: '影片',
	plural: '影片',
	track: true
});

Production.add({
	name: { type: String, required: true, index: true , label: '影片名称' },
	introduction: { type: Types.Textarea, initial: true, label: '影片简介'},
	images: { type: Types.LocalFiles,
					dest: 'images/production/',
					prefix: 'production',
				    filename: function(item, customized_name) {
				    	return item._id + '/' + customized_name.originalname;
				    }
		            , label: '剧照'
				},
	compress_images: { type: Types.LocalFiles,
					dest: 'images/compress_production/',
					prefix: 'production',
				    filename: function(item, customized_name) {
				    	return item._id + '/' + customized_name.originalname;
				    }
		            , label: '缩略剧照'
				},
	category: { type: Types.Relationship, ref: 'Category', refPath: 'name', many: true, label: '影片类型'}, 
	investmentAmount: { type: Types.Money, currency: 'chs', format: '0,0', label: '投资规模(万元)'},
	actorBudget: { type: Types.Money, currency: 'chs', format: '0,0', label: '演员预算(万元)'},
	// starring_ratio: { type: Types.Number, label:'领衔主演投资比'},
	// starring_team_ratio: { type: Types.Number, label:'跟组主演投资比'},
	// guestplayer_ratio: { type: Types.Number, label:'客串演员投资比'},
	// otherRole_ratio: { type: Types.Number, label:'其他角色投资比'},
	duration: { type: String, label: '拍摄周期(天)' },
	location: { type: Types.Relationship, ref: 'Areainfo', refPath: 'fullname', many: true, label: '拍摄地'},
	//production_companys: { type: Types.Relationship, ref: 'ProductionCompany', refPath: 'name', many: true, label: '出品公司'},
	//issuer_companies: { type: Types.Relationship, ref: 'Issuer', refPath: 'name', many: true, label: '发行公司'},
	production_companys: { type: String, label: '出品公司' },
	issuer_companies: { type: String, label: '发行公司' },
	production_crews: { type: Types.Relationship, ref: 'ProductionCrews', refPath: 'name', many: true, label: '剧组'},
	//isPublicShow: { type: Types.Boolean, default: false, label: '是否公映' },
	isOfficial: { type: Types.Boolean, default: true, label: '是否被官网认可'},
	isPost: { type: Types.Boolean, default: false, label: '是否发布'},
	publishDate: { type: Types.Date, label:'上映时间'},
	isKeepOnRecord: { type: Types.Boolean, default: false, label: '是否备案'},
	/*recordAddress: { type: Types.Select, options: '北京市 , 上海市 , 天津市 , 重庆市 , 河北省 , 山西省 , 内蒙古自治区 , 辽宁省 , 吉林省 , 黑龙江省 , 江苏省 , 浙江省 , 安徽省 , 福建省 , 江西省 , 山东省 , 河南省 , 湖北省 , 湖南省 , 广东省 , 广西省 , 海南省 , 四川省 , 贵州省 , 云南省 , 西藏自治区 , 陕西省 , 甘肃省 , 青海省 , 宁夏回族自治区 , 新疆维吾尔族自治区 , 香港特别行政区 , 澳门特别行政区 , 台湾省', default: '北京市 ' , label: '备案地'}*/
	recordAddress: { type: String, label: '备案地' },
    mediaid: { type: String, label: '图片ID' },
    isCreated: { type: Boolean, label: '通告发布成功',default:false},//true——成功，false——失败
    isDelete: { type: Boolean,default: false, label: '通告是否删除'},//true——删除，false——未删除
    appid: { type: String, label: '绑定的appid' },//author@zheng 表明项目的来源
    expired_date: { type: Types.Date, label: '截止日期' },
    address:{ type: String, label: '见组地址' },
    isRegistered: { type:Types.Boolean, default: false, label: '是否已注册'},
});


// Provide access to Keystone
//User.schema.virtual('canAccessKeystone').get(function() {
//	return this.isAdmin;
//});

// Production.schema.pre('save', function(next) {
//  console.log(this.images);
//  new Imagemin()
//     .src(this.images[0].path + this.images[0].filename )
//     .dest('images/production')
//     .use(Imagemin.jpegtran({progressive: true}))            // It is confirmed the func cannot deal with big jpg file. 1.2M sample ok; but 4M sample fail
//     //.use(Imagemin.optipng({optimizationLevel: 3}))
//     .run((err, files) => {
//         console.log(files);
//         //=> {path: 'build/images/foo.jpg', contents: <Buffer 89 50 4e ...>}
//   });

//   next();
// });


/**
 * Relationships
 */

//User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

Production.defaultColumns = 'name, isPublicShow, category, isOfficial';
Production.register();
