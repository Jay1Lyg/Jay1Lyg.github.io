var keystone = require('keystone');
var Types = keystone.Field.Types;
var Picturematerial = new keystone.List('Picturematerial', {
	map: { name: 'name' },
	label: '图片素材',
	singular: '图片素材',
	plural: '图片素材',
	track: true
});

Picturematerial.add({
	name: { type: String, required: false, unique:true, index: true, label: '素材名称' },
	author: { type: String, required: false, unique:true, index: true, label: '作者' },
	images: { type: Types.LocalFiles,
		 			index: true,
					dest: 'images/pic/',
					prefix: 'pic',
					filename: function(item, customized_name) {
				    	return item._id + '/' + customized_name.originalname;
				    }
					, label: '素材图片'
			},
	url: { type: String, required: false, unique:true, label: '微信上的url' }
});


Picturematerial.defaultColumns = 'name, images, url, author';
Picturematerial.register();
