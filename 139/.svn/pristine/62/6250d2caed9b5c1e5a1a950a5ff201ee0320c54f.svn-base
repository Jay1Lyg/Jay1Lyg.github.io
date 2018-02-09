var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Suggestion Model
 * ==========
 */

var Suggestion = new keystone.List('Suggestion',{
	label: '意见',
	singular: '意见',
	plural: '意见',
	track: true
});

Suggestion.add({
	telephone: { type: String},
	content: { type: String},
	images: { type: Types.LocalFiles,
					dest: 'images/suggestion/',
					prefix: 'suggestion',
					filename: function(item, customized_name) {
				    	return item._id + '/' + customized_name.originalname;
				    }
					, label: '意见图片'
				},
	
});

Suggestion.defaultColumns = 'suggestion';
Suggestion.register();
