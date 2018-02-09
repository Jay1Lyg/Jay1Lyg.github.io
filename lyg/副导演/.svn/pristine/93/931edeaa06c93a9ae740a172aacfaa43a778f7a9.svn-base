var keystone = require('keystone');
var Types = keystone.Field.Types;

var Casting1 = new keystone.List('Casting1', {
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '用户Casting1',
	singular: '用户Casting1',
	plural: '用户Casting1',
	track: true
});

Casting1.add({
	user_id: { type: Types.Relationship, ref: 'User', refPath: '_id',label: '用户ID' },
	frontimage: { type: String,label: '图片ID' },
	leftimage45: { type: String,label: '图片ID' },
	rightimage45: { type: String,label: '图片ID' },
	rightimage90: { type: String,label: '图片ID' },
	leftimage90: { type: String,label: '图片ID' },
	frontimagewaist: { type: String,label: '图片ID' },
	frontimageall: { type: String,label: '图片ID' },
	frontimagehead: { type: String,label: '图片ID' },
	artimage: { type: String,label: '图片ID' },
}
);

Casting1.defaultColumns = 'user_id';
Casting1.register();
