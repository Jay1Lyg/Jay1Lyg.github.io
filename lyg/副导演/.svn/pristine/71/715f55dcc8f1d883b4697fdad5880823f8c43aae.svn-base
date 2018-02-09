var keystone = require('keystone');
var Types = keystone.Field.Types;
//const Imagemin = require('imagemin');

/**
 * 
 * 将方案滑块各类演员的预算比保存到数据库
 */

var ActorBudget = new keystone.List('ActorBudget', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '演员预算',
	singular: '演员预算',
	plural: '演员预算',
	track: true
});

ActorBudget.add({
	// user_id: { type: String,label: '用户id' }, //匹配成功的项目id
	// careerincrew_id: { type: String,label: '职位id' }, 
	// actorbudget_id : { type: Types.Relationship, ref: 'ActorBudget', index: true, label: '演员预算' },
	leadingactor_budget_ratio: { type: Types.Number, label:'领衔演员预算比'},
	guestactor_budget_ratio: { type: Types.Number, label:'客串演员预算比'},
	starringingroup_budget_ratio: { type: Types.Number, label:'跟组主演预算比'},
	other_budget_ratio: { type: Types.Number, label:'其它演员预算比'},
});


ActorBudget.defaultColumns = 'leadingactor_budget_ratio,guestactor_budget_ratio,starringingroup_budget_ratio,other_budget_ratio';
ActorBudget.register();