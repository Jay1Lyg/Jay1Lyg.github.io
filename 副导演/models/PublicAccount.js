/*
*
*
*
*      微信公众号模型
*		publicSignal Model
*   
*
*
**/
var keystone = require('keystone');
var Types = keystone.Field.Types;

var PublicAccount = new keystone.List('PublicAccount', {
	label: '公众号列表',
	singular: '公众号列表',
	plural: '公众号列表',
	track: true
});

PublicAccount.add({
	nick_name: { type: String, index: true, label: '授权方昵称' }, //授权方昵称
	head_img: { type: String, index: true, label: '授权方头像' },//授权方头像
	service_type_info: { type:Types.Number, label: '授权方公众号类型' }, //授权方公众号类型，0代表订阅号，1代表由历史老帐号升级后的订阅号，2代表服务号
	verify_type_info: { type:Types.Number, label: '授权方认证类型' }, //授权方认证类型，-1代表未认证，0代表微信认证，1代表新浪微博认证，2代表腾讯微博认证，3代表已资质认证通过但还未通过名称认证，4代表已资质认证通过、还未通过名称认证，但通过了新浪微博认证，5代表已资质认证通过、还未通过名称认证，但通过了腾讯微博认证
	user_name: { type: String, index: true, label: '授权方公众号的原始ID' }, //授权方公众号的原始ID
	principal_name: { type: String, index: true, label: '公众号的主体名称' }, //公众号的主体名称
	alias: { type: String, index: true, label: '授权方公众号所设置的微信号' }, //授权方公众号所设置的微信号，可能为空
	// 用以了解以下功能的开通状况（0代表未开通，1代表已开通）
	open_store: { type:Types.Number, default: 0, label: '是否开通微信门店功能' }, //是否开通微信门店功能
	open_scan: { type:Types.Number, default: 0, label: '是否开通微信扫商品功能' }, //是否开通微信扫商品功能
	open_pay: { type:Types.Number, default: 0, label: '是否开通微信支付功能' }, //是否开通微信支付功能
	open_card: { type:Types.Number, default: 0, label: '是否开通微信卡券功能' }, //是否开通微信卡券功能
	open_shake: { type:Types.Number, default: 0, label: '是否开通微信摇一摇功能' }, //是否开通微信摇一摇功能
	qrcode_url: { type: String, index: true, label: '二维码图片的URL' },//二维码图片的URL，开发者最好自行也进行保存
	appid: { type: String, index: true, label: '授权方appid' },//授权方appid
	authorizer_access_token: { type: String, index: true, label: '授权方令牌' },//授权方令牌
	expires_in: { type: Types.Number, index: true, label: 'authorizer_access_token的有效期节点' },//authorizer_access_token的有效期
	authorizer_refresh_token: { type: String, index: true, label: 'authorizer_access_token刷新令牌' },//刷新令牌

	webpage_access_token: { type: String, index: true, label: '网页授权方令牌' },//网页授权方令牌
	webpage_expires_in: { type: Types.Number, index: true, label: 'webpage_access_token的有效期节点' },//authorizer_access_token的有效期
	webpage_refresh_token: { type: String, index: true, label: 'webpage_access_token刷新令牌' },//刷新令牌
	webpage_expires_date: { type: Types.Number, index: true, label: 'webpage_refresh_token的有效期节点' },//webpage_refresh_token的有效期

	jsapi_ticket: { type: String, index: true, label: 'jssdk令牌' },
	jsapi_ticket_expires_in: {  type: Types.Number, index: true, label: 'jsapi_ticket的有效期节点' },
	//公众号授权给开发者的权限集列表，ID为1到15时分别代表：
	//1消息管理权限
	//2用户管理权限
	//3帐号服务权限
	//4网页服务权限
	//5微信小店权限
	//6微信多客服权限
	//7群发与通知权限
	//8微信卡券权限
	//9微信扫一扫权限
	//10微信连WIFI权限
	//11素材管理权限
	//12微信摇周边权限
	//13微信门店权限
	//14微信支付权限
	//15自定义菜单权限
	func_info: { type: String, index: true,  refPath: 'name', label: '公众号授权给开发者的权限集列表'},//公众号授权给开发者的权限集列表
	//openID: { type: Types.Relationship, ref: 'User', refPath: 'openID', label: '微信公众号管理员的oppenID'}//微信公众号管理员的oppenID
	publicAccountAscription: { type: Types.Select, 
		options: [{ value: '1', label: '副导演'},
				  { value: '2', label: '经纪人'},
				 ],
		default: '1',
		label: '公众号所属'
	},
	ticket: { type: String, index: true, label: '通过ticket换取二维码' },//
});

PublicAccount.defaultColumns = 'principal_name, appid, authorizer_access_token, expires_in, authorizer_refresh_token, openID';
PublicAccount.register();
