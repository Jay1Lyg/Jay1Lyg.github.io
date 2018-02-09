var keystone = require('keystone'),
    CareerInCrew = keystone.list('CareerInCrew');
var async = require('async');
var format = require('../position_match/format.js');
var Production = keystone.list('Production');
var Invitation = keystone.list('Invitation');
var config = require('../../../public/conf/common.js');
var format1 = require('./format.js');
var format_user = require('../user/format.js');


// ******************************** Query Functions **********************************************************
var findPositions = function( /*start, end,*/ currentPage, pageSize, callback){
	var curPage = currentPage || 0;  
	var pSize = pageSize || 10;
	
	var q1 = CareerInCrew.paginate({
		page: curPage,
		perPage: pSize,
		maxPages: 10000
	 }).select('name salary_paid_by salary_amount createdAt expired_date benifit_tags requirement_tags crews_object')
	 //.where('createAt', {"$gte": start, "$lt": end})
	 //.where('author', authorname)
	 .populate('crews_object benifit_tags requirement_tags')
	 .sort('-expired_date')
	 //.exec(callback);		
	 .exec( function(err, positions){
        format1.formatPositionResult(positions, function(err,ret){
			if(err){
				return callback(err, null);
			}else{
				return callback(null, ret);
			}
		});
	 });
};
//auther@cincna 搜寻用户的邀请演员的记录
var findUserInvitation = function(user_id , page , callback){
	Invitation.paginate({
		page: page,
		perPage: 6,
		maxPages: 10
	 })
	.where('inviter',user_id)
	.sort('-createdAt')
	.exec( function(err, ret){
			Invitation.model.find()
			.where('inviter',user_id)
			.exec(function(err,invition){
				 format1.formatInvitation(ret, function(err,invitationset){
					if(err){
						var results = {};
						 results.total = invitationset.length;
						 results.invitations = invitationset;
						return callback(err, results);	
					}else{
						var results = {};
						 results.total = invitationset.length;
						 results.invitations = invitationset;
						return callback(null, results);	
					}
				}); 	

			});
				 

	});
}


var findUserBeInvitedInfo = function(user_id , page ,appid, callback){
	Invitation.paginate({
		page: page,
		perPage: 20,
		maxPages: 20
	 })
	.where('invited',user_id)
	.sort('-createdAt')
	.exec( function(err, ret){
		  format1.formatBeInvitedInfo(ret,appid,function(err,invitationset){
			if(err){
				var results = {};
				 results.total = invitationset.length;
				 results.invitations = invitationset;
				
				return callback(err, results);	
			}else{
				var results = {};
				 results.total = invitationset.length;
				 results.invitations = invitationset;
				return callback(null, results);	
			}
		}); 	
	});
}
var abstractMatchDetails = function(careerinfo,userinfo,callback){
  var data ={};
  var basicMatchingDegree;
  var featureMatchingDegree ;
  var offsetMatchingDegree ;
  var scheduleMatchingDegree ;
  var totalMatchingDegree;
  async.waterfall([
     function(callback){//匹配基本信息35
       format.matchBasicInfo(careerinfo,userinfo,function(err,basicDegree){
          if(err){
             throw new Error(err);
          }else{
             console.log(basicDegree);
             basicMatchingDegree =  Math.round(((basicDegree)*100))/100;
             console.log('basicMatchingDegree:'+basicMatchingDegree);
             callback(null);
          }
       });   
     },function(callback){//角色特征20
        format.matchFeature(careerinfo,userinfo,function(err,featureDegree){
           if(err){
              throw new Error(err);
           }else{
              featureMatchingDegree = Math.round(((featureDegree)*100))/100;
              console.log('featureMatchingDegree:'+featureMatchingDegree);
              callback(null);
           }
        })
     },function(callback){//片酬需求30
        format.matchoffset(careerinfo,userinfo,function(err,offsetDegree){
           if(err){
              throw new Error(err);
           }else{
              offsetMatchingDegree =  Math.round(((offsetDegree)*100))/100;
              console.log('offsetMatchingDegree:'+offsetMatchingDegree);
              callback(null);
           }
        });

     },function(callback){//档期匹配15
        format.matchschedule(careerinfo,userinfo,function(err,scheduleDegree){
           if(err){
              throw new Error(err);
           }else{
              scheduleMatchingDegree = Math.round(((scheduleDegree)*100))/100;
              console.log('scheduleMatchingDegree:'+scheduleMatchingDegree);
              callback(null);
           }
        });
     },function(callback){//计算总匹配度
        var totalDegree = basicMatchingDegree*0.35+featureMatchingDegree*0.2+offsetMatchingDegree*0.3+scheduleMatchingDegree*0.15;
        totalMatchingDegree = Math.round(((totalDegree)*100))/100;
        console.log('totalMatchingDegree:'+totalMatchingDegree);
        callback(null);
     }],function(err){
        if(err){
           throw new Error(err);
        }else{
           data.basicMatchingDegree = basicMatchingDegree;
           data.featureMatchingDegree = featureMatchingDegree;
           data.offsetMatchingDegree = offsetMatchingDegree;
           data.scheduleMatchingDegree = scheduleMatchingDegree;
           data.totalMatchingDegree = Math.round((totalMatchingDegree*100))/100;
           data.realname = userinfo.realname;
           data.careerincrew_id = careerinfo.careerincrew_id;
           data._id = userinfo.id;
           data.image = userinfo.image;
           // (userinfo.agentid==undefined)?(data.agentid=''):(data.agentid=userinfo.agentid);
           return callback(null,data);
        }
     })
}
//为申请人作匹配
var positionMatchActorApplicant = function(careerinfo,userArray,callback){
   //var userArray = [];
   var result1 = [];
   var basicMatchingDegree;
   var featureMatchingDegree ;
   var offsetMatchingDegree ;
   var scheduleMatchingDegree ;
   var totalMatchingDegree;
   console.log('----------userArray-------------');
   console.log(careerinfo);
   console.log(userArray);
   console.log('----------userArray-------------');
   async.eachSeries(userArray,function(item,next){
      var userdata = {};
      abstractMatchDetails(careerinfo,item,function(err,result){
          userdata.realname = result.realname;
          userdata._id = result._id;
          userdata.image = result.image;
          userdata.basicMatchingDegree = result.basicMatchingDegree;
          userdata.featureMatchingDegree = result.featureMatchingDegree;
          userdata.offsetMatchingDegree = result.offsetMatchingDegree;
          userdata.scheduleMatchingDegree = result.scheduleMatchingDegree;
          userdata.totalMatchingDegree = result.totalMatchingDegree;
          userdata.sign_up_date = item.sign_up_date;
          userdata.registration_rtatus = item.registration_rtatus;
          userdata.is_receive = item.is_receive;
          userdata.index = item.index;
          userdata.authorid = item.authorid;
          result1.push(userdata); 
          next();     
      })
     
   },function(err){//按照匹配度高低排序
      if(err){
         throw new Error(err);
      }else{
        console.log('!!!!');
        console.log(result1);
        callback(null,result1);
         // format.SortbymatchinDegree(result,function(err,user_result){
         //    if(err){
         //      throw new Error(err);
         //    }else{
         //      console.log('---');
         //      console.log(user_result);
         //      console.log('---');
         //       callback(null,user_result);
         //    }
         // });
      }
   });

}
//申请我的-----演员详情
var formatProfileBasicInfoforApplicant = function( userinfo,applydetails,callback ){
  if (userinfo==null) return callback(null, {});
  console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&');
  console.log(userinfo);
  console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&');
  var featureArray=[];
  var categoryArray=[];
  var skillArray=[];
  var roletagArray=[];
  var repertoireArray=[];
  var profile_basicinfo = {};
    async.waterfall([
      function(callback){
          var now_date = new Date();
          profile_basicinfo.id = userinfo._id;
          profile_basicinfo.name = userinfo.name;
          profile_basicinfo.realname = userinfo.realname;
          profile_basicinfo.gender = userinfo.gender;
          profile_basicinfo.age = now_date.getFullYear() - userinfo._.birth.format('YYYY'); 
          profile_basicinfo.birth = userinfo.birth; 
          profile_basicinfo.height = userinfo.height;
          profile_basicinfo.shortintroduce = userinfo.shortintroduce;
          profile_basicinfo.weight = userinfo.weight;
          profile_basicinfo.telephone = userinfo.telephone;
          profile_basicinfo.agentTelphone = userinfo.agentTelphone;
          profile_basicinfo.email = userinfo.email;
          profile_basicinfo.currentStatus = userinfo.currentStatus;
          profile_basicinfo.artname = userinfo.artname;
          profile_basicinfo.id_number = userinfo.id_number;
          profile_basicinfo.user_address = userinfo.user_address;
          profile_basicinfo.schedule = userinfo.schedule;
          profile_basicinfo.paycheck = userinfo.paycheck;

          (userinfo.bust!=undefined)?( profile_basicinfo.bust = userinfo.bust):(profile_basicinfo.bust='');
          (userinfo.waist!=undefined)?( profile_basicinfo.waist = userinfo.waist):(profile_basicinfo.waist='');
          (userinfo.hip!=undefined)?( profile_basicinfo.hip = userinfo.hip):(profile_basicinfo.hip='');
          (userinfo.schoolname!=undefined)?( profile_basicinfo.schoolname = userinfo.schoolname):(profile_basicinfo.schoolname='');
          (userinfo.role_tag!=undefined)?( profile_basicinfo.role_tag = userinfo.role_tag):(profile_basicinfo.role_tag='');
          (userinfo.skill!=undefined)?( profile_basicinfo.skill = userinfo.skill):(profile_basicinfo.skill='');
          (userinfo.category!=undefined)?( profile_basicinfo.category = userinfo.category):(profile_basicinfo.category='');
          (userinfo.feature!=undefined)?( profile_basicinfo.feature = userinfo.feature):(profile_basicinfo.feature='');


          (userinfo.hometown!=null)?( profile_basicinfo.hometownid=userinfo.hometown._id):(profile_basicinfo.hometownid='');
          (userinfo.hometown!=null)?( profile_basicinfo.hometown=userinfo.hometown.name):(profile_basicinfo.hometown='');
          (userinfo.images.length>0) ? (profile_basicinfo.iconUrl = config.homeEntry.url+'/WX/image/users/' + userinfo.images[userinfo.images.length-1].filename) : (profile_basicinfo.iconUrl="") ;
          //(userinfo.compress_images.length>0) ? (profile_basicinfo.compress_iconUrl = config.homeEntry.url+'/WX/image/compress_users/' + userinfo.compress_images[userinfo.compress_images.length-1].filename) : (profile_basicinfo.compress_iconUrl="") ;
          profile_basicinfo.sign_up_date = applydetails.sign_up_date;
          profile_basicinfo.registration_rtatus = applydetails.registration_rtatus;
          profile_basicinfo.is_receive = applydetails.is_receive;
          profile_basicinfo.index = applydetails.index;
          profile_basicinfo.authorid = applydetails.authorid;
          callback(null);
     },function(callback){
        CaregoryInTarget.model.find()
          .where('user_id',userinfo._id)
          .exec(function(err,category){
            console.log('--------category-----------');
            console.log(category);
            console.log('--------category-----------');
            async.eachSeries(category,function(item,next){
              async.eachSeries(item.repertoireType,function(item1,next){
                  repertoireArray.push(item1);
                  next();
              },function(err){
                 if(err){
                   throw new Error(err);
                 }else{
                    console.log(typeof(item.category));
                    categoryArray.push(item.category);
                    next();
                 }
              })
            },function(err){
               if(err){
                  throw new Error(err);
               }else{
                  profile_basicinfo.repertoireTpye = repertoireArray;
                  profile_basicinfo.category = categoryArray;
                  callback(null);
               }
              
            })
          })
     },function(callback){
         format_user.formatCasting(userinfo._id,function(err,url){
           if(err){
              throw new Error(err);
           }else{
             profile_basicinfo.iconUrl = url.iconUrl;
             profile_basicinfo.compress_iconUrl = url.compress_iconUrl;
             callback(null);
           }
         }); 
        //  Casting.model.findOne()
        //    .where('user_id',userinfo._id)
        //    .exec(function(err,ret){
        //       if(err){
        //         throw new Error(err);
        //       }else{
        //         if(ret!=null){
        //           (ret.artimage.length!=0) ? (profile_basicinfo.image =  config.homeEntry.url+'/WX/casting/artimage/' + ret.artimage[ret.artimage.length-1].filename) : (profile_basicinfo.image="") ;
        //            callback(null);
        //         }else{
        //           profile_basicinfo.image="";
        //           callback(null);
        //         }
                 

        //       }
        // })
     }],function(err){
         if(err){
             throw new Error(err);
         }else{
             return callback(null, profile_basicinfo);  
         }
     });
}
//为受邀人作匹配
var positionMatchActorforInvitedperson = function(careerinfo,userArray,callback){
   //var userArray = [];
   var result = [];
   var basicMatchingDegree;
   var featureMatchingDegree ;
   var offsetMatchingDegree ;
   var scheduleMatchingDegree ;
   var totalMatchingDegree;
   console.log('----------userArray-------------');
   console.log(careerinfo);
   console.log(userArray);
   console.log('----------userArray-------------');
   async.eachSeries(userArray,function(item,next){
      var userdata = {};
         abstractMatchDetails(careerinfo,item,function(err,match){
            userdata.realname = item.realname;
            userdata._id = item.id;
            userdata.image = item.image;
            userdata.basicMatchingDegree = match.basicMatchingDegree;
            userdata.featureMatchingDegree = match.featureMatchingDegree;
            userdata.offsetMatchingDegree = match.offsetMatchingDegree;
            userdata.scheduleMatchingDegree = match.scheduleMatchingDegree;
            userdata.totalMatchingDegree = match.totalMatchingDegree;
            userdata.invitestate = item.invitestate;
            userdata.invited = item.invited;
            userdata.invitationid = item.invitationid;
            userdata.invite_date = item.invite_date;
            userdata.agree_or_refuse_date = item.agree_or_refuse_date;
            userdata.crew_tel = careerinfo.author.telephone;

            result.push(userdata);
            next();
         })

   },function(err){
      if(err){
         throw new Error(err);
      }else{
        callback(null,result);
        // console.log('!!!!');
        // console.log(result);
        //  format.SortbymatchinDegree(result,function(err,user_result){
        //     if(err){
        //       throw new Error(err);
        //     }else{
        //       console.log('---');
        //       console.log(user_result);
        //       console.log('---');
        //        callback(null,user_result);
        //     }
        //  });
      }
   });

}

//我邀请的-----演员详情
var formatProfileBasicInfo = function( userinfo,invitedetails,callback ){
  if (userinfo==null) return callback(null, {});
  console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&');
  console.log(userinfo);
  console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&');
  var featureArray=[];
  var categoryArray=[];
  var skillArray=[];
  var roletagArray=[];
  var repertoireArray=[];
  var profile_basicinfo = {};
    async.waterfall([
      function(callback){
          var now_date = new Date();
          profile_basicinfo.id = userinfo._id;
          profile_basicinfo.name = userinfo.name;
          profile_basicinfo.realname = userinfo.realname;
          profile_basicinfo.gender = userinfo.gender;
          profile_basicinfo.age = now_date.getFullYear() - userinfo._.birth.format('YYYY'); 
          profile_basicinfo.birth = userinfo.birth; 
          profile_basicinfo.height = userinfo.height;
          profile_basicinfo.shortintroduce = userinfo.shortintroduce;
          profile_basicinfo.weight = userinfo.weight;
          profile_basicinfo.telephone = userinfo.telephone;
          profile_basicinfo.agentTelphone = userinfo.agentTelphone;
          profile_basicinfo.email = userinfo.email;
          profile_basicinfo.currentStatus = userinfo.currentStatus;
          profile_basicinfo.artname = userinfo.artname;
          profile_basicinfo.id_number = userinfo.id_number;
          profile_basicinfo.user_address = userinfo.user_address;
          profile_basicinfo.schedule = userinfo.schedule;
          profile_basicinfo.paycheck = userinfo.paycheck;

          (userinfo.bust!=undefined)?( profile_basicinfo.bust = userinfo.bust):(profile_basicinfo.bust='');
          (userinfo.waist!=undefined)?( profile_basicinfo.waist = userinfo.waist):(profile_basicinfo.waist='');
          (userinfo.hip!=undefined)?( profile_basicinfo.hip = userinfo.hip):(profile_basicinfo.hip='');
          (userinfo.schoolname!=undefined)?( profile_basicinfo.schoolname = userinfo.schoolname):(profile_basicinfo.schoolname='');
          (userinfo.role_tag!=undefined)?( profile_basicinfo.role_tag = userinfo.role_tag):(profile_basicinfo.role_tag='');
          (userinfo.skill!=undefined)?( profile_basicinfo.skill = userinfo.skill):(profile_basicinfo.skill='');
          (userinfo.category!=undefined)?( profile_basicinfo.category = userinfo.category):(profile_basicinfo.category='');
          (userinfo.feature!=undefined)?( profile_basicinfo.feature = userinfo.feature):(profile_basicinfo.feature='');


          (userinfo.hometown!=null)?( profile_basicinfo.hometownid=userinfo.hometown._id):(profile_basicinfo.hometownid='');
          (userinfo.hometown!=null)?( profile_basicinfo.hometown=userinfo.hometown.name):(profile_basicinfo.hometown='');
          (userinfo.images.length>0) ? (profile_basicinfo.iconUrl = config.homeEntry.url+'/WX/image/users/' + userinfo.images[userinfo.images.length-1].filename) : (profile_basicinfo.iconUrl="") ;
          //(userinfo.compress_images.length>0) ? (profile_basicinfo.compress_iconUrl = config.homeEntry.url+'/WX/image/users/' + userinfo.compress_images[userinfo.compress_images.length-1].filename) : (profile_basicinfo.compress_iconUrl="") ;
          profile_basicinfo.invitestate = invitedetails.invitestate;
          profile_basicinfo.invited = invitedetails.invited;
          profile_basicinfo.invitationid = invitedetails.invitationid;
          profile_basicinfo.invite_date = invitedetails.invite_date;
          profile_basicinfo.agree_or_refuse_date = invitedetails.agree_or_refuse_date;
          callback(null);
     },function(callback){
        CaregoryInTarget.model.find()
          .where('user_id',userinfo._id)
          .exec(function(err,category){
            console.log('--------category-----------');
            console.log(category);
            console.log('--------category-----------');
            async.eachSeries(category,function(item,next){
              async.eachSeries(item.repertoireType,function(item1,next){
                  repertoireArray.push(item1);
                  next();
              },function(err){
                 if(err){
                   throw new Error(err);
                 }else{
                    console.log(typeof(item.category));
                    categoryArray.push(item.category);
                    next();
                 }
              })
            },function(err){
               if(err){
                  throw new Error(err);
               }else{
                  profile_basicinfo.repertoireTpye = repertoireArray;
                  profile_basicinfo.category = categoryArray;
                  callback(null);
               }
              
            })
          })
     },function(callback){
        format_user.formatCasting(userinfo._id,function(err,url){
           if(err){
              throw new Error(err);
           }else{
             profile_basicinfo.iconUrl = url.iconUrl;
             profile_basicinfo.compress_iconUrl = url.compress_iconUrl;
             callback(null);
           }
         }); 
        //  Casting.model.findOne()
        //    .where('user_id',userinfo._id)
        //    .exec(function(err,ret){
        //       if(err){
        //         throw new Error(err);
        //       }else{
        //         if(ret!=null){
        //           (ret.artimage.length!=0) ? (profile_basicinfo.image =  config.homeEntry.url+'/WX/casting/artimage/' + ret.artimage[ret.artimage.length-1].filename) : (profile_basicinfo.image="") ;
        //            callback(null);
        //         }else{
        //           profile_basicinfo.image="";
        //           callback(null);
        //         }
                 

        //       }
        // })
     }],function(err){
         if(err){
             throw new Error(err);
         }else{
             return callback(null, profile_basicinfo);  
         }
     });
}

module.exports = {
	findPositions: findPositions, 
	findUserInvitation: findUserInvitation,
	findUserBeInvitedInfo: findUserBeInvitedInfo,
	formatProfileBasicInfo : formatProfileBasicInfo,
	positionMatchActorApplicant : positionMatchActorApplicant,
  positionMatchActorforInvitedperson : positionMatchActorforInvitedperson,
  formatProfileBasicInfoforApplicant : formatProfileBasicInfoforApplicant,
  abstractMatchDetails : abstractMatchDetails
}
