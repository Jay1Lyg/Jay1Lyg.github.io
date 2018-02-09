var keystone = require('keystone');
var Types = keystone.Field.Types;


var CaregoryInTarget = new keystone.List('CaregoryInTarget',{
	 map: { name: 'name' },
	//autokey: { path: 'slug', from: 'role', unique: true },
	label: '目标中剧目类型',
	singular: '目标中剧目类型',
	plural: '目标中剧目类型',
	track: true
});

CaregoryInTarget.add({
	user_id:  { type: String,  label: '关联用户编号' },
	production_id:  { type: String,  label: '关联项目编号' },
	category:  { type: String,  label: '关联项目类别编号' },
    repertoireType: { type: Types.Relationship, ref: 'RepertoireType', refPath: 'name', many:true, label: '剧目类型'},
    isCreateforProduction:{ type:Types.Boolean, default: false, label: '标签所属'},//true--发布通告时创建，false--填写参演经历时创建
}
);


CaregoryInTarget.defaultColumns = '_id|20%, user_id, production_id';
CaregoryInTarget.register();