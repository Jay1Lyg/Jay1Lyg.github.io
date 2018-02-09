var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
	noedit: true
});

Enquiry.add({
	name: { type: Types.Name},
	email: { type: Types.Email},
	phone: { type: String },
	enquiryType: { type: Types.Select, options: [
		{ value: 'message', label: 'Just leaving a message' },
		{ value: 'question', label: 'I\'ve got a question' },
		{ value: 'other', label: 'Something else...' }
	] },
	img: { type: Types.LocalFiles,
					dest: 'images/test/',
				    prefix: 'test',
				    filename: function(item, customized_name) {
				    	return item._id + '/' + customized_name.originalname;
				    }
					, label: '照片'
				},
	message: { type: Types.Markdown},

	createdAt: { type: Date, default: Date.now }
});

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
