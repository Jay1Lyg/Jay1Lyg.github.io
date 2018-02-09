var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Actor Model
 * auther@cincan
 * ==========
 */

var Actor = new keystone.List('Actor', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '演员',
	singular: '演员',
	plural: '演员',
	track: true
});

Actor.add({
	name: { type: String, required: true, index: true, label: '用户名' },
	realname: { type: String, index: true, label: '真名' },
	artname: { type: String, index: true, label: '艺名' },
	images: { type: Types.LocalFiles,
					dest: 'images/users/',
					prefix: 'users',
					filename: function(item, customized_name) {
				    	return item._id + '/' + customized_name.originalname;
				    }
					, label: '个人头像'
				},
	telephone: { type: String },
	email: { type: Types.Email },
	shortintroduce: { type: String ,label: '一句话简介'},
	beInvitedNumber:{ type:Types.Number, default: 0, label: '被邀请的次数'},//author@cincan
	isPayed: { type:Types.Boolean, default: false, label: '是否付费'},
	isShowInInvitedRankList: { type:Types.Boolean, default: false, label: '是否在受邀次数排行榜中进行展示'},
	isShowInHomePage: { type:Types.Boolean, default: false, label: '是否在首页进行展示'},
});


/**
 * Relationships
 */

Actor.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

Actor.defaultColumns = 'name, email';
Actor.register();
