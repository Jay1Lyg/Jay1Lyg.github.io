var async = require('async');
var _ = require('underscore');
var format = require('../../query/save_and_get_data_in_MongoDB/resume/format.js');
var keystone = require('keystone'),
    User = keystone.list('User'),
    EducationExperience = keystone.list('EducationExperience'),
    School = keystone.list('School'),
    SchoolType = keystone.list('SchoolType'),
    Major = keystone.list('Major'),


//var config = require('../../public/conf/common.js');
exports = module.exports = function(req, res) {
    var userid=req.params.userid;
    EducationExperience.paginate({
            page: 1,
            perPage: 10,
            maxPages: 10000
         })
        .where('user_id', userid)
        //.where('isPublic', 'true')
        .populate('school') 
        .exec( function(err, edu){
            format.formatEducationInfomation(edu, function(err,ret){
                if(err){                  
                   res.send(err);
                }else{
                    res.render('page_edu_edit',{
                        userid:userid,
                        major : (ret.length==null) ? '' : (ret.eduExpArray.major),
                        major_id : (ret.length==null) ? '' : ret.eduExpArray.major_id,
                        school : (ret.length==null) ? '' : ret.eduExpArray.school,
                        school_id : (ret.length==null) ? '' : ret.eduExpArray.school_id,
                        duration : (ret.length==null) ? '' : ret.eduExpArray.duration,
                        certificate : (ret.length==null) ? '' : ret.eduExpArray.certificate,
                        eduExp_id : (ret.length==null) ? '' : ret.eduExpArray._id,
                        appid : req.params.appid
                     })
                   
                }
            });
        });
}