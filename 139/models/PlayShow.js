var keystone = require('keystone');
var Types = keystone.Field.Types;
//const Imagemin = require('imagemin');

/**
 * Production Model
 * ==========
 */

var PlayShow = new keystone.List('PlayShow', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '剧本',
	singular: '剧本',
	plural: '剧本',
	track: true
});

PlayShow.add({
	name: { type: String, required: true, index: true , label: '剧本名称' },
	shortIntroduction: { type: Types.Textarea, initial: true, label: '剧本简介'},
	user_id: { type: Types.Relationship, ref: 'User', refPath: '_id',label: '用户ID' },
	author: {type: String, label: '作者'},
	copyrightOwner: {type: String, label: '版权所有者'},
	shortStory: {type: String, label: '一句话故事'},
	playCategory: {type: Types.Relationship, ref: 'PlayCategory', refPath: 'name', many: false , label: '剧本类别'},
	productionType: {type: Types.Relationship, ref: 'ProductionType', refPath: 'name', many: true , label: '影视产品、剧本类型'},
	isChecked: {type: Types.Boolean, default: false, label: '是否经过审核' },
	images: { type: Types.LocalFiles,
					dest: 'images/play/',
					prefix: 'play',
				    filename: function(item, customized_name) {
				    	return item._id + '/' + customized_name.originalname;
				    }
				    //format: function(item, file) {
				    	//return '<img src="/production/' + file.filename + '" style="max-width: 300px">';
				    //}  // format not work again
		            , label: '剧本照片'
				},
}

);



PlayShow.defaultColumns = 'name, playCategory , shortStory , author, shortIntroduction';
PlayShow.register();
