var keystone = require('keystone');
var async = require('async');
var user_search=require('../user/search.js');
var actor_format=require('../actor/format.js');
var config = require('../../../public/conf/common.js');
var format_user = require('../user/format.js');

var formatProfileBasicInfo = function( userinfo, callback ){
  if (userinfo==null) return callback(null, {});
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
          (userinfo.compress_images.length>0) ? (profile_basicinfo.compress_iconUrl = config.homeEntry.url+'/WX/image/compress_users/' + userinfo.compress_images[userinfo.compress_images.length-1].filename) : (profile_basicinfo.compress_iconUrl="") ;
          (userinfo.currentLocation!=null) ? (profile_basicinfo.currentLocation = userinfo.currentLocation.name) : (profile_basicinfo.currentLocation = "");
          callback(null);
     },function(callback){
        CaregoryInTarget.model.find()
          .where('user_id',userinfo._id)
          .exec(function(err,category){
            async.eachSeries(category,function(item,next){
              async.eachSeries(item.repertoireType,function(item1,next){
                  repertoireArray.push(item1);
                  next();
              },function(err){
                 if(err){
                   throw new Error(err);
                 }else{
                   // console.log(typeof(item.category));
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
              profile_basicinfo.image = url.iconUrl;
              profile_basicinfo.compress_image = url.compress_iconUrl;
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

var matchAccordingToNecessaryConditions = function(userinfo,careerinfo,callback){
  console.log("enheng?");
  //console.log(careerinfo);
   var flag = false;
   async.waterfall([
      function(callback){//匹配年龄段
        if(careerinfo.age==6){//不限年龄
           flag = true;
           callback(null,flag);
        }else{
           user_search.groupbyAge(careerinfo.age,userinfo.birth.getFullYear(),function(err,flag){
              if(err){
                 throw new Error(err);
              }else{
                 callback(null,flag);
              }
           });
        }
      },function(arg,callback){//匹配身高
         if(arg){
            actor_format.matchHeight(careerinfo,userinfo,function(err,ret){
              callback(null,ret);
            });
         }else{
            callback(null,arg);
         }
      },function(arg,callback){//匹配体型
         if(arg){
            actor_format.matchShap(careerinfo,userinfo,function(err,ret){
              callback(null,ret);
            }); 
         }else{
           callback(null,arg);
         }
      }
   ],function(err,arg){
      if(err){
        throw new Error(err);
      }else{
        console.log("aha?");
        console.log(arg);
        callback(null,arg);
      }
   }) 
}

var isSkillTypeMatch = function(type_id, type_array){
  var flag=false;
  if(type_id==null || type_array==null || type_array.length==0) throw new Error('empty type_id or type_array!'); //Ã‚Â¹ÃƒÂ½Ãƒâ€šÃƒâ€¹ÃƒÅ’ÃƒÂµÃ‚Â¼ÃƒÂ¾ÃƒÅ½ÃƒÅ¾ÃƒÂÃ‚Â?
  for(var cat in type_array) {
    if(type_array[cat]==type_id) flag=true;
  }
  return flag;
}
var matchTagsDetail = function(careertags,usertags,callback){
  console.log(careertags);
  var number = 0;//标签匹配上的个数
   async.eachSeries(careertags,function(item1,next){
      async.eachSeries(usertags,function(item2,next){
         if(item1.equals(item2)){
            number = number+1;
            next();
         }else{
            next();
         }
      },function(err){
         if(err){
            throw new Error(err);
         }else{
            next();
         }
      })
   },function(err){
      if(err){
        throw new Error(err);
      }else{
        if(careertags==undefined){
          var degree = 0;
          callback(null,degree);
        }else{
         var degree = Math.round((number/careertags.length*100))/100;
         callback(null,degree);
        }
      }
   })
}
var matchBasicInfo = function(careerinfo,userinfo,callback){//基本信息匹配度
    var skillMatchingDegree;//技能匹配度
    var categoryMatchingDegree;//剧目类别匹配度
    var repertoireMatchingDegree;//剧目类型匹配度
    var categoryAndrepertoireMatchingDegree;//剧目类别和剧目类型匹配度
    var roleTagsMatchingDegree;//角色类型匹配度
    var basicMatchingDegree;//基本信息匹配度
    async.waterfall([
      function(callback){//技能匹配度
        //console.log('step1');
        var skillid = '59a721769c2bd4746065d7f6';//不限
        if(isSkillTypeMatch(skillid,careerinfo.SkillTagid)){
           skillMatchingDegree = 1*0.4;
            callback(null);
        }else{
            matchTagsDetail(careerinfo.SkillTagid,userinfo.skill,function(err,ret){
               if(err){
                  throw new Error(err);
               }else{
                 // console.log('skill:'+ret);
                  skillMatchingDegree = ret * 0.4;
                  callback(null);
               }
            });
        }
      },function(callback){//剧目类别
          //console.log('step2');
          var categoryid = '59aa2930d1caefb01b1f6e44';//不限
          //console.log(userinfo.category);
          //console.log(careerinfo.category);
          if(isSkillTypeMatch(categoryid,userinfo.category)){//用户剧目类别是否有不限
             categoryMatchingDegree = 1*0.5;
             callback(null);
          }else{
            // console.log('step2-1');
             if(categoryid==careerinfo.category){//通告剧目类别有不限
                 categoryMatchingDegree = 1*0.5;
                 //console.log('category:'+1);
                 callback(null);
             }else{
                //console.log('step2-2');
                 if(isSkillTypeMatch(careerinfo.category,userinfo.category)){
                    categoryMatchingDegree = 1*0.5;
                    //console.log('category:'+1);
                    callback(null);
                 }else{
                    //console.log('step2-3');
                    //console.log('category:'+0);
                    categoryMatchingDegree = 0;
                    callback(null);
                 }
              }
          }
         
      },function(callback){//剧目类型
         //console.log('step3');
         if(categoryMatchingDegree == 0){
            categoryAndrepertoireMatchingDegree = 0;
            callback(null);
         }else{
             matchTagsDetail(careerinfo.repertoireTpye,userinfo.repertoireTpye,function(err,ret){
                if(err){
                   throw new Error(err);
                }else{
                   repertoireMatchingDegree = ret*0.5;
                   categoryAndrepertoireMatchingDegree = (categoryMatchingDegree+repertoireMatchingDegree)*0.3;
                   callback(null);
                }
             });
         }
      },function(callback){//角色类型
        //console.log('step4');
        var roletypeid = '59acc5c825d3453c2a50bbf8';
        if(isSkillTypeMatch(roletypeid,userinfo.role_tag)){
           roleTagsMatchingDegree = 1*0.3;
           //console.log('roleTag:'+1);
           callback(null);
        }else{
            for(var i=0;i<userinfo.role_tag.length;i++){
              if(careerinfo.roleTag_id.equals(userinfo.role_tag[i])){
                 roleTagsMatchingDegree = 1*0.3;
                 callback(null);
                 break;
              }else if(i==userinfo.role_tag.length-1){
                 roleTagsMatchingDegree = 0;
                 callback(null);
              }
            }
        }
      }
    ],function(err){
       if(err){
          throw new Error(err);
       }else{
           //console.log('step5');
          var basicDegree = skillMatchingDegree+categoryAndrepertoireMatchingDegree+roleTagsMatchingDegree;
          basicMatchingDegree = Math.round((basicDegree*100))/100;
           //console.log('roleTagsMatchingDegree:'+roleTagsMatchingDegree);
          // console.log('categoryAndrepertoireMatchingDegree:'+categoryAndrepertoireMatchingDegree);
          // console.log('roleTagsMatchingDegree:'+roleTagsMatchingDegree);
          // console.log('basicMatchingDegree:'+basicMatchingDegree);  
          callback(null,basicMatchingDegree);
       }
    })
}

var matchFeature=function(careerinfo,userinfo,callback){//角色特征匹配
   var featureMatchingDegree ;
   var featureid = '59acc64425d3453c2a50bbfe';//不限
    if(isSkillTypeMatch(featureid,careerinfo.FeatureTagid)){
       featureMatchingDegree = 1 ;
       callback(null,featureMatchingDegree);
    }else{
       matchTagsDetail(careerinfo.FeatureTagid,userinfo.feature,function(err,ret){
           if(err){
              throw new Error(err);
           }else{
              featureMatchingDegree = ret ;
              callback(null,featureMatchingDegree);
           }
       });
    }
}

var matchoffset = function(careerinfo,userinfo,callback){//偏移值匹配
  var offsetMatchingDegree = 0;
  //careerinfo.role_paycheck//角色片酬
  //userinfo.paycheck//演员片酬
 // var SalaryoffsetValue = (userinfo.paycheck - careerinfo.role_paycheck)/careerinfo.role_paycheck;//片酬偏移值
  var Salaryoffset = (userinfo.paycheck - careerinfo.role_paycheck)/careerinfo.role_paycheck;//片酬偏移值
  var SalaryoffsetValue = Math.round((Salaryoffset*100))/100;
  if(SalaryoffsetValue>-0.3 && SalaryoffsetValue<0.5){//偏移值在-30%——200%之间
     offsetMatchingDegree = 1-100/80*(Math.abs(SalaryoffsetValue-0.5));
     callback(null,offsetMatchingDegree);
  }else if(SalaryoffsetValue>0.5 && SalaryoffsetValue<2){
     offsetMatchingDegree = 1-100/150*(Math.abs(SalaryoffsetValue-0.5));
     callback(null,offsetMatchingDegree);
  }else{//偏移值不在-100%——200%之间，片酬匹配度为0
     callback(null,offsetMatchingDegree);
  }
}

var matchschedule = function(careerinfo,userinfo,callback){//偏移值匹配
  var scheduleMatchingDegree = 0;
  if(userinfo.schedule){//有档期
    scheduleMatchingDegree = 1;
    callback(null,scheduleMatchingDegree);
  }else{//无档期
    scheduleMatchingDegree = 1*0.33;
    callback(null,scheduleMatchingDegree);
  }
  
}
//按匹配度从大到小排序
var SortbymatchinDegree = function(userarray,callback){
  for(var i = 0;i < userarray.length - 1; i++){
    for(var j = i + 1;j < userarray.length;j++){
        if (userarray[i].totalMatchingDegree < userarray[j].totalMatchingDegree){
          var temp = userarray[i];
          userarray[i] = userarray[j];
          userarray[j] = temp;
        }
    }
  } 
    callback(null,userarray);
}

module.exports = {
  formatProfileBasicInfo: formatProfileBasicInfo,
  matchAccordingToNecessaryConditions : matchAccordingToNecessaryConditions,
  matchTagsDetail : matchTagsDetail,
  matchBasicInfo : matchBasicInfo,
  matchFeature : matchFeature,
  matchoffset : matchoffset,
  matchschedule : matchschedule,
  SortbymatchinDegree : SortbymatchinDegree
}
