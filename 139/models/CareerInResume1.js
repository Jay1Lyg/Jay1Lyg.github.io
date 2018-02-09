var keystone = require('keystone');
var Types = keystone.Field.Types;


var CareerInResume1 = new keystone.List('CareerInResume1',{
	// map: { name: 'name' },
	autokey: { path: 'slug', from: 'role', unique: true },
	label: '微信简历中参演经历',
	singular: '微信简历中参演经历',
	plural: '微信简历中参演经历',
	track: true
});

CareerInResume1.add({//由crews_object和role区分唯一的careerInCrew
	user_id:  { type: String,  label: '关联用户编号' },
	pro_object: { type: Types.Relationship, ref: 'Production', index: true, label: '影片' },
	role: { type: Types.Relationship, ref: 'Role', refPath: 'name', index: true, label: '角色'}, 
	images : { type: Types.Relationship, ref: 'CareerImage',many:true, index: true, label: '角色'}, 
}
);


CareerInResume1.defaultColumns = '_id|20%, crews_object, role';
CareerInResume1.register();
