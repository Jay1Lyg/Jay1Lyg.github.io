var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Casting Model
 * ==========
 */

var Casting = new keystone.List('Casting', {
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '用户Casting',
	singular: '用户Casting',
	plural: '用户Casting',
	track: true
});

Casting.add({
	user_id: { type: Types.Relationship, ref: 'User', refPath: '_id',label: '用户ID' },
	frontimage: { type: Types.LocalFiles,
					dest: 'images/frontimage/',
				    prefix: 'frontimage',
				    filename: function(item, customized_name) {
				    	return item.user_id + '/' + customized_name.originalname;
				    }
					, label: '正面卡胸照片'
				},
	leftimage45: { type: Types.LocalFiles,
					dest: 'images/leftimage45/',
				    prefix: 'leftimage45',
				    filename: function(item, customized_name) {
				    	return item.user_id + '/' + customized_name.originalname;
				    }
					, label: '左侧45度卡胸照片'
				},
	rightimage45: { type: Types.LocalFiles,
					dest: 'images/rightimage45/',
				    prefix: 'rightimage45',
				    filename: function(item, customized_name) {
				    	return item.user_id + '/' + customized_name.originalname;
				    }
					, label: '右侧45度卡胸照片'
				},
	rightimage90: { type: Types.LocalFiles,
					dest: 'images/rightimage90/',
				    prefix: 'rightimage90',
				    filename: function(item, customized_name) {
				    	return item.user_id + '/' + customized_name.originalname;
				    }
					, label: '右侧90度卡腰'
				},
	leftimage90: { type: Types.LocalFiles,
					dest: 'images/leftimage90/',
				    prefix: 'leftimage90',
				    filename: function(item, customized_name) {
				    	return item.user_id + '/' + customized_name.originalname;
				    }
					, label: '左侧90度卡腰'
				},
	frontimagewaist: { type: Types.LocalFiles,
					dest: 'images/frontimagewaist/',
				    prefix: 'frontimagewaist',
				    filename: function(item, customized_name) {
				    	return item.user_id + '/' + customized_name.originalname;
				    }
					, label: '正面卡腰'
				},
	frontimageall: { type: Types.LocalFiles,
					dest: 'images/frontimageall/',
				    prefix: 'frontimageall',
				    filename: function(item, customized_name) {
				    	return item.user_id + '/' + customized_name.originalname;
				    }
					, label: '正面全身'
				},
	frontimagehead: { type: Types.LocalFiles,
					dest: 'images/frontimagehead/',
				    prefix: 'frontimagehead',
				    filename: function(item, customized_name) {
				    	return item.user_id + '/' + customized_name.originalname;
				    }
					, label: '露额头正面卡胸'
				},
	artimage: { type: Types.LocalFiles,
					dest: 'images/artimage/',
				    prefix: 'artimage',
				    filename: function(item, customized_name) {
				    	return item.user_id + '/' + customized_name.originalname;
				    }
					, label: '生活照'
				},
				

}
);

Casting.defaultColumns = 'user_id';
Casting.register();
