var keystone = require('keystone');
var Types = keystone.Field.Types;
//const Imagemin = require('imagemin');

/**
 * Production Model
 * ==========
 */

var PDF_Production = new keystone.List('PDF_Production', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '影片',
	singular: '影片',
	plural: '影片',
	track: true
});

PDF_Production.add({
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
	category: { type: Types.Relationship, ref: 'Category', refPath: 'name', many: true, label: '影片类型'}, 
	investmentAmount: { type: Types.Money, currency: 'chs', format: '0,0', label: '投资规模(万元)'},
	duration: { type: String, label: '拍摄周期(天)' },
	location: { type: Types.Relationship, ref: 'Areainfo', refPath: 'fullname', many: true, label: '拍摄地'},
	production_companys: { type: Types.Relationship, ref: 'ProductionCompany', refPath: 'name', many: true, label: '出品公司'},
	issuer_companies: { type: Types.Relationship, ref: 'Issuer', refPath: 'name', many: true, label: '发行公司'},
	production_companys: { type: String, label: '出品公司' },
	issuer_companies: { type: String, label: '发行公司' },
	production_crews: { type: Types.Relationship, ref: 'ProductionCrews', refPath: 'name', many: true, label: '剧组'},
	//isPublicShow: { type: Types.Boolean, default: false, label: '是否公映' },
	isOfficial: { type: Types.Boolean, default: true, label: '是否被官网认可'},
	publishDate: { type: Types.Date, label:'上映时间'},
	isKeepOnRecord: { type: Types.Boolean, default: false, label: '是否备案'},
	/*recordAddress: { type: Types.Select, options: '北京市 , 上海市 , 天津市 , 重庆市 , 河北省 , 山西省 , 内蒙古自治区 , 辽宁省 , 吉林省 , 黑龙江省 , 江苏省 , 浙江省 , 安徽省 , 福建省 , 江西省 , 山东省 , 河南省 , 湖北省 , 湖南省 , 广东省 , 广西省 , 海南省 , 四川省 , 贵州省 , 云南省 , 西藏自治区 , 陕西省 , 甘肃省 , 青海省 , 宁夏回族自治区 , 新疆维吾尔族自治区 , 香港特别行政区 , 澳门特别行政区 , 台湾省', default: '北京市 ' , label: '备案地'}*/
	recordAddress: { type: String, label: '备案地' }


}
);


PDF_Production.defaultColumns = 'name, isPublicShow, category, isOfficial, images';
PDF_Production.register();
