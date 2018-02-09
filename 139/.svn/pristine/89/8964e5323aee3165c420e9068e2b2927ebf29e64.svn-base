var async = require('async');
var keystone = require('keystone'),
    Role = keystone.list('Role'),
  	User = keystone.list('User'),
    PDF_User = keystone.list('PDF_User'),
	  CareerInCrew = keystone.list('CareerInCrew'),
    Resume = keystone.list('Resume');
    Casting = keystone.list('Casting');

var config = require('../../../public/conf/common.js');
var actor_format=require('../actor/format.js');
var user_search=require('../user/search.js');
var format_user = require('../user/format.js');

var matchactordetails = function(obj,user,callback){
  // console.log('----------user----------');
  // console.log(user);
  // console.log('----------user----------');
  var flag = false;
  async.waterfall([
  	function(callback){
       if(obj.gender==''||obj.gender==0){
         //console.log('gender不限');
          flag=true;
          callback(null,flag);
       }else if(obj.gender!=0){
          if(obj.gender==user.gender){
             //console.log('gender匹配成功');
             flag=true;
             callback(null,flag);
          }else{
            //console.log('gender匹配失败');
       	    flag=false;
       	    callback(null,flag);
          }
       }
    },function(arg,callback){
       if(flag){//性别匹配成功，匹配年龄段
         if(obj.age == 0){//年龄段未填写，进行全局匹配
           //console.log('age不限');
           flag = true;
           callback(null,flag);
         }else{//填写了年龄段，判断演员是否在该年龄段内  item.birth.getFullYear()
           user_search.groupbyAge(obj.age,user.birth.getFullYear(),function(err,age_result){
              if(err){
                throw new Error(err);
              }else{
               //console.log('匹配age');
                //console.log(age_result);
                //console.log('匹配age');
              	callback(null,age_result);
              }
           })
         }
       }else{//匹配失败
          //console.log('上一步匹配失败');
          callback(null,arg);
       }
    },function(arg,callback){
        if(arg){//匹配成功，匹配身高
           actor_format.matchHeight(obj,user,function(err,status){
              if(err){
                 throw new Error(err);
              }else{
                 callback(null,status);
              }
           });
        }else{//匹配失败
            //console.log('上一步匹配失败');
            flag=false;
       	    callback(null,flag);
        } 
    },function(arg,callback){
       if(arg){//匹配成功，匹配体型  匹配公式：BMI=体重（kg）/(身高（m）*身高（m）)   
          if(obj.shap==0){//表示不限
             //console.log('shap不限');
             flag=true;
             callback(null,flag);
          }else{
             actor_format.matchShap(obj,user,function(err,status){
                if(err){
                  throw new Error(err);
                }else{
                  callback(null,status);
                }
             });
          }
       }else{
          //console.log('上一步匹配失败');
          flag=false;
          callback(null,flag);
       }
    },function(arg,callback){
       if(arg){//匹配成功，匹配技能特长
          //console.log('体格匹配成功');
          //console.log(obj);
          if(obj.skillArray.length==0){
             //console.log('技能不限');
             flag = true;
             callback(null,flag);
          }else{
          	actor_format.formatMatchTag(obj.skillArray,user.skill,function(err,status){
               if(err){
                  throw new Error(err);
               }else{              	  
                  callback(null,status);
               }
          	});
          }
       }else{
            //console.log('上一步匹配失败');
            flag=false;
       	    callback(null,flag); 
       }
    },function(arg,callback){
        if(arg){//匹配成功，匹配角色特征
          //console.log('技能匹配成功');
           if(obj.featureArray.length == 0){
              //console.log('特征不限');
              flag = true;
              callback(null,flag);
           }else{
              actor_format.formatMatchTag(obj.featureArray,user.feature,function(err,status){
               if(err){
                  throw new Error(err);
               }else{              	  
                  callback(null,status);
               }
          	});
           }
        }else{
            flag=false;
            callback(null,flag); 
        }
    },function(arg,callback){
        if(arg){//匹配成功,匹配剧目类别
          //console.log('特征匹配成功');
           if(obj.categoryid==''||obj.categoryid=='59aa2930d1caefb01b1f6e44'){//剧目类别没填或者为不限
              //console.log('剧目类别不限');
              flag = true;
              callback(null,arg);
           }else{
              actor_format.isTagsTypeMatch(obj.categoryid,user.category,function(err,ret){
                 if(err){
                    throw new Error(err);
                 }else{
                    callback(null,ret);
                 }
              });
           }
        }else{
            //console.log('上一步匹配失败');
            flag=false;
            callback(null,flag); 
        }
    },function(arg,callback){
        if(arg){//匹配成功，匹配剧目类型
          //console.log('特征匹配成功');
          if(obj.repertoireArray.length == 0){
              console.log('剧目类型不限');
              flag = true;
              callback(null,flag);
           }else{
              actor_format.formatMatchTag(obj.repertoireArray,user.repertoireTpye,function(err,status){
               if(err){
                  throw new Error(err);
               }else{                 
                  callback(null,status);
               }
            });
           } 
        }else{
           //console.log('上一步匹配失败');
            flag=false;
            callback(null,flag); 
        }
    },function(arg,callback){
        if(arg){//匹配成功，匹配角色类别
           //console.log('剧目类型匹配成功');
           if(obj.roletypeArray.length==0){
              //console.log('角色类别不限');
              flag = true;
              callback(null,flag);
           }else{
              actor_format.formatMatchTag(obj.roletypeArray,user.role_tag,function(err,status){
                 if(err){
                    throw new Error(err);
                 }else{                 
                    callback(null,status);
                 }
              });
           }     
        }else{
          //console.log('上一步匹配失败');
          flag=false;
          callback(null,flag); 
        }
    },function(arg,callback){
        if(arg){//匹配成功，匹配片酬
           //console.log('角色类别匹配成功');
           if(obj.rolepaycheck==''){
             flag=true;
             callback(null,flag);
           }else{
             //var SalaryoffsetValue = (user.paycheck - obj.rolepaycheck)/obj.rolepaycheck;
             // console.log('-------user.SalaryoffsetValue------');
             // console.log(user.SalaryoffsetValue);
             // console.log('-------user.SalaryoffsetValue------');
             if(-0.3<user.SalaryoffsetValue&&user.SalaryoffsetValue<2){
                //console.log('偏移值匹配成功');
                flag=true;
                callback(null,flag);
             }else{
                //console.log('偏移值匹配失败');
                flag=false;
                callback(null,flag);
             }
           } 
           
        }else{
          //console.log('上一步匹配失败');
          flag=false;
          callback(null,flag);
        }
    }
  ],function(err,arg){
     if(err){
        throw new Error(err);
     }else{
        callback(null,arg);
     }
  })
}
//查询演员详细信息
var searchactordetails = function(userinfo,obj,callback){
  var now_date = new Date();
  var data = {};
    // console.log('--------userinfo--------');
    // console.log(userinfo);
    // console.log('--------userinfo--------');
    data.id = userinfo._id;
		data.name = userinfo.name;
		data.realname = userinfo.realname;
		data.gender = userinfo.gender;
		data.age = now_date.getFullYear() - userinfo._.birth.format('YYYY'); 
		data.birth = userinfo.birth; 
		data.height = userinfo.height;
		data.shortintroduce = userinfo.shortintroduce;
		data.weight = userinfo.weight;
		data.telephone = userinfo.telephone;
		data.agentTelphone = userinfo.agentTelphone;
		data.email = userinfo.email;
		data.currentStatus = userinfo.currentStatus;
		data.artname = userinfo.artname;
		data.id_number = userinfo.id_number;
		data.user_address = userinfo.user_address;
	  data.schedule = userinfo.schedule;
	  data.paycheck = userinfo.paycheck;
    (obj.rolepaycheck!='')?(data.SalaryoffsetValue = Math.round((((userinfo.paycheck - obj.rolepaycheck)/obj.rolepaycheck)*100))/100):(data.SalaryoffsetValue='');
	  (userinfo.bust!=undefined)?( data.bust = userinfo.bust):(data.bust='');
	  (userinfo.waist!=undefined)?( data.waist = userinfo.waist):(data.waist='');
	  (userinfo.hip!=undefined)?( data.hip = userinfo.hip):(data.hip='');
	  (userinfo.schoolname!=undefined)?( data.schoolname = userinfo.schoolname):(data.schoolname='');
    (userinfo.role_tag!=undefined)?( data.role_tag = userinfo.role_tag):(data.role_tag='');
	  (userinfo.skill!=undefined)?( data.skill = userinfo.skill):(data.skill='');
	  (userinfo.category!=undefined)?( data.category = userinfo.category):(data.category='');
	  (userinfo.feature!=undefined)?( data.feature = userinfo.feature):(data.feature='');
		(userinfo.images.length>0) ? (data.image = config.homeEntry.url+'/WX/image/users/' + userinfo.images[userinfo.images.length-1].filename) : (data.image="") ;
    //(userinfo.compress_images.length>0) ? (data.compress_image = config.homeEntry.url+'/WX/image/compress_users/' + userinfo.compress_images[userinfo.compress_images.length-1].filename) : (data.compress_image="") ;
	    CaregoryInTarget.model.findOne()
	      .where('user_id',data.id)
	      .exec(function(err,ret1){
          console.log('-----------ret1-------------');
          console.log(data.id);
          console.log(ret1);
          console.log('-----------ret1-------------');
          if(ret1 == null){
            callback(null,null);
          }else{
  	         data.category = ret1.category;
  	         data.repertoireTpye = ret1.repertoireTpye;
  	         if(err){
                  throw new Error(err);
  	         }else{
               format_user.formatCasting(userinfo._id,function(err,url){
                 if(err){
                    throw new Error(err);
                 }else{
                  data.iconUrl = url.iconUrl;
                  data.compress_iconUrl = url.compress_iconUrl;
                  callback(null,data);
                 }
              }); 
               // Casting.model.findOne()
               // .where('user_id',userinfo._id)
               // .exec(function(err,ret){
               //    if(err){
               //      throw new Error(err);
               //    }else{
               //      if(ret!=null){
               //        (ret.artimage.length!=0) ? (data.iconUrl =  config.homeEntry.url+'/WX/casting/artimage/' + ret.artimage[ret.artimage.length-1].filename) : (data.iconUrl="") ;
               //        callback(null,data);
               //      }else{
               //        data.iconUrl="";
               //        callback(null,data);
               //      }
               //    }
               // })
  	          
  	         } 
          }
	    }) 
}
//按偏移值从大到小排序
var Sortbyoffset = function(userarray,callback){
  for(var i = 0;i < userarray.length - 1; i++){
    for(var j = i + 1;j < userarray.length;j++){
        if (userarray[i].SalaryoffsetValue < userarray[j].SalaryoffsetValue){
          var temp = userarray[i];
          userarray[i] = userarray[j];
          userarray[j] = temp;
        }
    }
  } 
    callback(null,userarray);
}

//查询导入的演员列表
var searchImportActorLists = function(userArray,callback){
   var result=[];
   async.eachSeries(userArray,function(item,next){
     var data = {};
     (item.realname == undefined) ? data.realname='不详' : data.realname=item.realname;
     item.userid = item._id;
     (item.ProductionImageInPdf.length == 0) ? data.iconUrl='' : data.iconUrl=config.homeEntry.url+'/WX/image/' + item.ProductionImageInPdf[ret.ProductionImageInPdf.length-1].filename;
     result.push(data);
     next();
   },function(err){
      if(err){
        throw new Error(err);
      }else{
        callback(null,result);
      }
   });
}

//将导入的资料与User表关联（两个User合一）
var importPDF_UserinfoToUser = function(pdf_userid,userid,callback){
   async.waterfall([
     function(callback){//导入演员基本资料
        PDF_User.model.findOne()
        .where('_id',pdf_userid) 
        .exec(function(err,ret){
           if(err){
             throw new Error(err);
           }else{
             format.formatUser(ret,userid,function(err){
                ret.if_claim = true;//表明资料已经认领
                ret.save(function(err){
                   if(err){
                      throw new Error(err);
                   }else{
                      callback(null);
                   }
                })
             });
           }
        })
     },function(callback){//合并技能
        PDF_Skill.model.find()
        .where('user_id',pdf_userid)
        .exec(function(err,pdf_skill){
           if(err){
              throw new Error(err);
           }else{
              format.formatSkill(pdf_skill,userid,function(err){
                 if(err){
                    throw new Error(err);
                 }else{
                    callback(null);
                 }
              });
           }
        })
     },function(callback){//合并剧目
       PDF_CareerInResume.model.find()
       .where('user_id',pdf_userid)
       .exec(function(err,careerinresume){
          if(err){
            throw new Error(err);
          }else{
            format.formatPdfProduction(careerinresume,function(err,PdfProductionInfo){
                 if(err){
                    throw new Error(err);
                 }else{
                    format.formatProduction(PdfProductionInfo,userid,function(err){
                       if(err){
                         throw new Error(err);
                       }else{
                          callback(null);
                       }
                    })
                 }
            });
          }
       })

     },function(callback){//将导入的照片与平台上的演员关联，原则：照片数量大于等于二，取第一张为封面照，第二张为艺术照，照片数量等于1，将该照片设为封面照和艺术照，照片数量等于0，跳过
        PDF_User.model.findOne()
        .where('_id',pdf_userid) 
        .exec(function(err,ret){
           if(err){
             throw new Error(err);
           }else{
             if(ret.ProductionImageInPdf.length == 0){
                callback(null);
             }
             else if(ret.ProductionImageInPdf.length == 1){
                format.formatSaveImage1(ret.ProductionImageInPdf,userid,function(err){
                   if(err){
                      throw new Error(err);
                   }else{
                      callback(null);
                   }
                });
             }
             else if(ret.ProductionImageInPdf.length >= 2){
                format.formatSaveImage2(ret.ProductionImageInPdf,userid,function(err){
                   if(err){
                      throw new Error(err);
                   }else{
                     callback(null);
                   }
                });
             }
           }   
        })
     }
   ],function(err){
      if(err){
         throw new Error(err);
      }else{
         callback(null);
      }
   })
}

module.exports = {
  matchactordetails: matchactordetails,
  searchactordetails : searchactordetails,
  Sortbyoffset : Sortbyoffset,
  searchImportActorLists : searchImportActorLists,
  importPDF_UserinfoToUser : importPDF_UserinfoToUser
}
