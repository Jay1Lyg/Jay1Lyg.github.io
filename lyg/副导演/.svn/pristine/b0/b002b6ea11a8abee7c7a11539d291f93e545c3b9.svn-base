var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
exports = module.exports = function(req, res){
	var careerInCrews_id = req.params.careerInCrews_id || '';
	//var role_id = req.params.role_id || '';
	var user_id =req.params.user_id || '';
	//console.log('剧组id：'+crews_id+'        角色id：'+role_id+"      用户id:"+user_id);
	search.findMorePosition(careerInCrews_id, function(err,infomation){
		if(err){
			res.send(err);
		}else{
			res.render('page_publicMoreposition.pug',{
				infomation:infomation,
				user_id : user_id,
				authorid : (infomation==null) ? '' : infomation[0].author._id,
				careerincrew_id : (infomation==null) ? '' : infomation[0].careerincrew_id,
				crews_id : (infomation==null) ? '' : infomation[0].crews_id,
				crews_name : (infomation==null) ? '' : infomation[0].crews_name,
				production_category_name : (infomation==null) ? '' : infomation[0].production_category_name,
				production_companys_name : (infomation==null) ? '' : infomation[0].production_companys_name,
				issuer_companies_name : (infomation==null) ? '' : infomation[0].issuer_companies_name,
				investmentAmount : (infomation==null) ? '' : infomation[0].investmentAmount,
				duration : (infomation==null) ? '' : infomation[0].duration,
				roleCategory : (infomation==null) ? '' : infomation[0].roleCategory,
				gender : (infomation==null) ? '' : infomation[0].gender,
				age : (infomation==null) ? '' : infomation[0].age,
				men_count : (infomation==null) ? '' : infomation[0].men_count,
				address_name : (infomation==null) ? '' : infomation[0].address_name,
				description : (infomation==null) ? '' : infomation[0].description,
				location_name : (infomation==null) ? '' : infomation[0].location_name[0].name,
				location_id : (infomation==null) ? '' : infomation[0].location_id[0],
				production_image:(infomation==null) ? '' : infomation[0].production_image
			}
			);
		}
	});
}