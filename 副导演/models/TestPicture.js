var keystone = require('keystone');
var Types = keystone.Field.Types;


var TestPicture = new keystone.List('TestPicture',{
	// map: { name: 'name' },
	autokey: { path: 'slug', from: 'role', unique: true },
	label: '图片上传测试',
	singular: '图片上传测试',
	plural: '图片上传测试',
	track: true
});

TestPicture.add({//由crews_object和role区分唯一的careerInCrew
	//size: { label: '角色'}, 
	images: { type: Types.LocalFiles,
					dest: 'images/careerimage/',
					prefix: 'careerimage',
				    filename: function(item, customized_name) {
				    	return item._id + '/' + customized_name.originalname;
				    }
		            , label: '剧照'
				},
}
);


TestPicture.defaultColumns = 'images';
TestPicture.register();