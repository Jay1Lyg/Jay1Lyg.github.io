var keystone = require('keystone');
var Types = keystone.Field.Types;


var CareerInResume = new keystone.List('CareerInResume',{
	// map: { name: 'name' },
	autokey: { path: 'slug', from: 'role', unique: true },
	label: '简历中参演经历',
	singular: '简历中参演经历',
	plural: '简历中参演经历',
	track: true
});

CareerInResume.add({//由crews_object和role区分唯一的careerInCrew
	user_id:  { type: String,  label: '关联用户编号' },
	pro_object: { type: Types.Relationship, ref: 'Production', index: true, label: '影片' },
	role: { type: Types.Relationship, ref: 'Role', refPath: 'name', index: true, label: '角色'}, 
	images: { type: Types.LocalFiles,
					dest: 'images/careerimage/',
					prefix: 'careerimage',
				    filename: function(item, customized_name) {
				    	return item._id + '/' + customized_name.originalname;
				    }
		            , label: '剧照'
				},
	compress_images: { type: Types.LocalFiles,
					dest: 'images/compress_careerimage/',
					prefix: 'careerimage',
				    filename: function(item, customized_name) {
				    	return item._id + '/' + customized_name.originalname;
				    }
		            , label: '缩略剧照'
				}
}
);


CareerInResume.defaultColumns = '_id|20%, crews_object, role';
CareerInResume.register();
