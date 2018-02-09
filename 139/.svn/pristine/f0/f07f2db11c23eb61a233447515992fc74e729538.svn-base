var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Areainfo Model
 * ==========
 */

var Areainfo = new keystone.List('Areainfo',{
	map: { name: 'name' },
	label: '城市名称',
	singular: '城市名称',
	plural: '城市名称'
});

Areainfo.add({
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

Areainfo.defaultColumns = 'name, areacode|20%, parencode|20%, fullname|50%';
Areainfo.register();
