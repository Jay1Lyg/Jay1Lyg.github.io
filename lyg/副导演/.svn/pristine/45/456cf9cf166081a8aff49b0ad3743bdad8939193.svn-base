var keystone = require('keystone');
var Types = keystone.Field.Types;


var CareerImage = new keystone.List('CareerImage',{
	// map: { name: 'name' },
	autokey: { path: 'slug', from: 'role', unique: true },
	label: '微信简历中参演经历',
	singular: '微信简历中参演经历',
	plural: '微信简历中参演经历',
	track: true
});

CareerImage.add({//由crews_object和role区分唯一的careerInCrew
	mediaid:  { type: String,  label: '图片id' },
}
);


CareerImage.defaultColumns = '_id|20%, crews_object, role';
CareerImage.register();
