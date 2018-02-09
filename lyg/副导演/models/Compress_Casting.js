var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Casting Model
 * ==========
 */

var Compress_Casting = new keystone.List('Compress_Casting', {
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '用户Casting缩略图',
	singular: '用户Casting缩略图',
	plural: '用户Casting缩略图',
	track: true
});

Compress_Casting.add({
	user_id: { type: Types.Relationship, ref: 'User', refPath: '_id',label: '用户ID' },
	compress_frontimage: { type: Types.LocalFiles,
					dest: 'images/compress_frontimage/',
				    prefix: 'compress_frontimage',
				    filename: function(item, customized_name) {
				    	return item.user_id + '/' + customized_name.originalname;
				    }
					, label: '正面卡胸照片缩略图'
				},
	compress_leftimage45: { type: Types.LocalFiles,
					dest: 'images/compress_leftimage45/',
				    prefix: 'compress_leftimage45',
				    filename: function(item, customized_name) {
				    	return item.user_id + '/' + customized_name.originalname;
				    }
					, label: '左侧45度卡胸照片缩略图'
				},
	compress_rightimage45: { type: Types.LocalFiles,
					dest: 'images/compress_rightimage45/',
				    prefix: 'compress_rightimage45',
				    filename: function(item, customized_name) {
				    	return item.user_id + '/' + customized_name.originalname;
				    }
					, label: '右侧45度卡胸照片缩略图'
				},
	compress_rightimage90: { type: Types.LocalFiles,
					dest: 'images/compress_rightimage90/',
				    prefix: 'compress_rightimage90',
				    filename: function(item, customized_name) {
				    	return item.user_id + '/' + customized_name.originalname;
				    }
					, label: '右侧90度卡腰缩略图'
				},
	compress_leftimage90: { type: Types.LocalFiles,
					dest: 'images/compress_leftimage90/',
				    prefix: 'compress_leftimage90',
				    filename: function(item, customized_name) {
				    	return item.user_id + '/' + customized_name.originalname;
				    }
					, label: '左侧90度卡腰缩略图'
				},
	compress_frontimagewaist: { type: Types.LocalFiles,
					dest: 'images/compress_frontimagewaist/',
				    prefix: 'compress_frontimagewaist',
				    filename: function(item, customized_name) {
				    	return item.user_id + '/' + customized_name.originalname;
				    }
					, label: '正面卡腰缩略图'
				},
	compress_frontimageall: { type: Types.LocalFiles,
					dest: 'images/compress_frontimageall/',
				    prefix: 'compress_frontimageall',
				    filename: function(item, customized_name) {
				    	return item.user_id + '/' + customized_name.originalname;
				    }
					, label: '正面全身缩略图'
				},
	compress_frontimagehead: { type: Types.LocalFiles,
					dest: 'images/compress_frontimagehead/',
				    prefix: 'compress_frontimagehead',
				    filename: function(item, customized_name) {
				    	return item.user_id + '/' + customized_name.originalname;
				    }
					, label: '露额头正面卡胸缩略图'
				},
	compress_artimage: { type: Types.LocalFiles,
					dest: 'images/compress_artimage/',
				    prefix: 'compress_artimage',
				    filename: function(item, customized_name) {
				    	return item.user_id + '/' + customized_name.originalname;
				    }
					, label: '生活照缩略图'
				},
				

}
);

Compress_Casting.defaultColumns = 'user_id';
Compress_Casting.register();
