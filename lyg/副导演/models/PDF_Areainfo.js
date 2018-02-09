var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Areainfo Model
 * ==========
 */

var PDF_Areainfo = new keystone.List('PDF_Areainfo',{
	map: { name: 'name' },
	label: '城市名称',
	singular: '城市名称',
	plural: '城市名称'
});

PDF_Areainfo.add({
	areacode : { type: Types.Text,index: true},
	name: { type: String},	
	parencode: { type: Types.Text  },
	level: { type: Types.Select, options: [{value : '100',label:'省'},{value:'010',label:'市'},{value:'001',label:'区'}], default: '001'},
	fullname: { type: Types.Text }
});

// Provide access to Keystone


/**
 * Relationships
 */

//User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

PDF_Areainfo.defaultColumns = 'name, areacode|20%, parencode|20%, fullname|50%';
PDF_Areainfo.register();