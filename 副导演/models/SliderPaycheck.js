var keystone = require('keystone');
var Types = keystone.Field.Types;
//const Imagemin = require('imagemin');

/**
 * 
 * 每个角色对应的滑块片酬
 */

var SliderPaycheck = new keystone.List('SliderPaycheck', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '演员滑块片酬',
	singular: '演员滑块片酬',
	plural: '演员滑块片酬',
	track: true
});

SliderPaycheck.add({
	actorbudget_id : { type: Types.Relationship, ref: 'ActorBudget', index: true, label: '演员预算id' },
	careerincrew_id: { type: Types.Relationship, ref: 'CareerInCrew', index: true, label: '职位id' },
	slider_paycheck : { type: Types.Number, label:'滑块算出的薪资/天'},
});

SliderPaycheck.defaultColumns = 'careerincrew_id,actorbudget_id,slider_paycheck';
SliderPaycheck.register();