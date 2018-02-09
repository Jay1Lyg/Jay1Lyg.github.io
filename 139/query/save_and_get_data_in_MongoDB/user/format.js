var async = require('async');
var keystone = require('keystone'),
  Role = keystone.list('Role'),
	User = keystone.list('User'),
	CareerInCrew = keystone.list('CareerInCrew'),
  Resume = keystone.list('Resume');
  Casting = keystone.list('Casting');
  Compress_Casting = keystone.list('Compress_Casting');
 // Performer=keystone.list('Performer');
var config = require('../../../public/conf/common.js');
var format=require('../resume/format.js');
var format_user = require('./format.js');
//var format_user = require('../user/format.js');


var formatPaginateObjUsers=function(UserArray,callback){
    var actor=[];
    var staff=[];
    if(UserArray==null||UserArray.length==0) return callback(null,[]);
    async.eachSeries(UserArray, function(item,next){
    var getroleCategory=[];
    var roleresults=[];
    var creearresults=[];

    var usItem={};
    async.waterfall([
      function(callback){
        console.log('step1');
       	 usItem.id = item._id;
       	 usItem.name = item.name;
       	 usItem.realname = item.realname;
       	 usItem.artname = item.artname;
       	 usItem.birth = item.birth;
       	 usItem.gender = item.gender;
       	 usItem.height = item.height;
       	 usItem.weight = item.weight;
       	 usItem.hometown = item.hometown;
       	 usItem.images = item.images;
       	 usItem.signature = item.signature; 
       	 usItem.telephone = item.telephone; 
       	 usItem.email = item.email; 
       	 usItem.id_number = item.id_number;
         usItem.beInvitedNumber = item.beInvitedNumber;
       	 usItem.user_address = item.user_address; 
       	 usItem.currentLocation = item.currentLocation; 
       	 usItem.currentStatus = item.currentStatus;
     	   usItem.careerInCrewsRelation = item.careerInCrewsRelation; 
         usItem.shortintroduce = item.shortintroduce;
        // (item.mediaid!=null) ? (usItem.iconUrl = 'http://kaishi.viphk.ngrok.org/WX/user/' +item._id+'/'+item.mediaid+'.jpg') : (usItem.iconUrl ="") ;
        // (user_info[0].images.length>0) ? (data.iconUrl = 'http://kaishi.viphk.ngrok.org/WX/users/' + user_info[0].images[user_info[0].images.length-1].filename) : (data.iconUrl="") ;
         //(item.images.length>0) ? (usItem.iconUrl = 'http://kaishi.viphk.ngrok.org/WX/users/' + item.images[item.images.length-1].filename) : (usItem.iconUrl="") ;
         callback(null);

      },function(callback){
          // Casting.model.findOne()
          //  .where('user_id',item._id)
          //  .exec(function(err,ret){
          //     if(err){
          //       throw new Error(err);
          //     }else{
          //       if(ret!=null){
          //         (ret.artimage.length!=0) ? (usItem.iconUrl =  config.homeEntry.url+'/WX/casting/artimage/' + ret.artimage[ret.artimage.length-1].filename) : (usItem.iconUrl="") ;
          //          callback(null);
          //       }else{
          //         usItem.iconUrl="";
          //         callback(null);
          //       }
                 

          //     }
          //  })
           formatCasting(item._id,function(err,url){
               if(err){
                  throw new Error(err);
               }else{
                console.log('-----------url------------');
                console.log(url);
                console.log('-----------url------------');
                usItem.iconUrl = url.iconUrl;
                usItem.compress_iconUrl = url.compress_iconUrl;
                callback(null);
               }
          }); 
      }
      // function(callback){
      //     format.getCareerByTwomodel(item._id,function(err,ret){
      //        if(err) throw new Error(err);
      //        else{
      //          getroleCategory=ret.roleTags;
      //          callback(null);
      //        }
      //     });
      // },function(callback){
      //    if(getroleCategory == null||getroleCategory.length==0){
      //        console.log('getroleCategory is null!');
      //        callback(null);
      //    }else{
      //     console.log('qqq'+getroleCategory);
      //       for(var i=0;i<getroleCategory.length;i++){
      //          if(getroleCategory[i]==='演员'){
      //                  console.log('going the actor');
      //                  actor.push(usItem);
      //                   break;                              
      //          }else{
      //                  if(i==getroleCategory.length-1){
      //                     staff.push(usItem);
      //                  }
      //         }  

      //     }
      //     callback(null);
      //   }

   //}
    ],function (err) {
          if(err) throw new Error(err);
          actor.push(usItem);
          next();
   });
},function(err){
      if(err){
	       return callback(err,null);	
      }
      else{
        callback(null,actor);
     }	
	});

}
///////////////////////////////////////////////////////////////////////////////////////////////////
var formatPaginateObjActors=function(ActorArray,callback){
    var actor=[];
    if(ActorArray==null||ActorArray.length==0) return callback(null,[]);
    async.eachSeries(ActorArray, function(item,next){
       var actorItem={};
       actorItem.id = item._id;
       actorItem.realname = item.realName;
       actorItem.artname = item.artName;
       actorItem.birth = item.birthday;
       actorItem.gender = item.gender;
       actorItem.height = item.height;
       actorItem.weight = item.weight;
       actorItem.hometown = item.hometown;
       actorItem.images = item.images;
       actorItem.nation = item.nation; 
       actorItem.nationlity = item.nationlity;
       actorItem.microblogging = item.microblogging; 
       actorItem.placeOfBirth = item.placeOfBirth;
       actorItem.introduction = item.introduction;
       if(item.images.length==0){ 
         console.log('我是空');      
         next();
       }else{
         actor.push(actorItem);
         next();
       }
       
    },function(err){
          if(err) {
             return callback(err,[]);     
          }else{
            return callback(null,actor);
          }
    });
}
///////////////////////////////////////////////////////////////////////////////////////////////////
var formatRankListActor = function( ret, callback ){//auther@cincan ????????¨C??¡±?¡®???¡¯¨¨???|???-?¡À??¡èo?????¡±?¡®?
  if (ret==null) return callback(null, {});
  var actorset = ret.results;
  var results=[];
  var actor_result = {};
  async.eachSeries(actorset, function(item,next){
      var actorItem = {};
      actorItem.id = item._id;
      actorItem.name = item.name;
      actorItem.realname = item.realname;
      actorItem.artname = item.artname;
      actorItem.shortintroduce = item.shortintroduce;
      actorItem.beInvitedNumber = item.beInvitedNumber;
      (item.images.length>0) ? (actorItem.iconUrl = config.homeEntry.url+ '/WX/users/' + item.images[item.images.length-1].filename) : (actorItem.iconUrl="") ;
      
      if(actorItem.iconUrl==""){
        console.log(actorItem.iconUrl);
           next();
      }else{
        console.log(actorItem.iconUrl);
           results.push(actorItem);
           next();

      }
     
  },function(err){
    if(err){
      return callback(err,[]);  
    }else{
      actor_result.currentPage = ret.currentPage;
      actor_result.totalPages = ret.totalPages;
      actor_result.actor_results = results;
      return callback(null,actor_result);  
    }
  });

}

var formatGroupImgurl =function(ret,callback){
if (ret==null) return callback(null, {});
  var imgUrl=null;
  (ret.length>0) ? (imgUrl = config.homeEntry.url+ '/WX/image/users/' + ret[ret.length-1].filename) : (imgUrl="") ;
 // console.log('imgUrl:'+imgUrl);
  return callback(null,imgUrl);
}

var isRoleCategoryMatch = function(user_id ,rolecategory_id){
  var flag=false;
  var resumeArr = [];
    Resume.model.find()
        .where('user_id', user_id)
        .limit(20)
        .exec(function(err, resume) {
          for(i = 0;i<resume.length;i++){
            resumeArr.push(resume[i].career_in_crews_id);


          }
         
            
        });

  
  return flag;
}
//auther@cincan ??1?????¡§¨¨????????????-?¨¦€¡ë???¨¦€??????¡±?¡®?
var formatRecommendUser = function(users , age, rolecategory_id, callback ){//auther@cincan ????????¨C??¡§¨¨???????¡±¨¨???¡®?
  if (users.length==0) return callback(null, []);

  var results = [];
  async.eachSeries(users, function(item,next){
    var userItem={};
    async.waterfall([
      function(callback){
          userItem.id = item._id;
          userItem.name = item.name;
          userItem.artname = item.artname;
          userItem.realname = item.realname;
          (item.images.length>0) ? (userItem.iconUrl = config.homeEntry.url+ '/WX/image/users/' + item.images[item.images.length-1].filename) : (userItem.iconUrl="");
          (item.compress_images.length>0) ? (userItem.compress_iconUrl = config.homeEntry.url+ '/WX/image/compress_users/' + item.compress_images[item.compress_images.length-1].filename) : (userItem.compress_iconUrl="");
          callback(null);
        
        },
        function(callback){
          var itemAge = new Date().getFullYear() - item.birth.getFullYear();
          console.log(itemAge);
          console.log(age);
            switch(age)
                  {
                  case '1':
                      if(itemAge >= 0 && itemAge <= 6){ 
                        callback(null, true);
                      }else{
                        callback(null, false);
                      }

                    break;
                  case '2':
                        if(itemAge >= 6 && itemAge <= 18){ 
                        callback(null, true);
                      }else{
                        callback(null, false);
                      }
                    break;
                  case '3':
                      if(itemAge >= 18 && itemAge <= 40){ 
                        callback(null, true);
                      }else{
                        callback(null, false);
                      }
                    break;
                  case '4':
                      if(itemAge >= 40 && itemAge <= 65){ 
                        callback(null, true);
                      }else{
                        callback(null, false);
                      }
                    break;
                  case '5':
                      if(itemAge >= 65 ){ 
                        callback(null, true);
                      }else{
                        callback(null, false);
                      }
                    break;
                  case '6':
                      callback(null, true);
                    break;
                  default:
                  console.log("default");
                      callback(null, false);
                  }
        },
        function(arg1,callback){
          console.log(arg1);
            if(arg1 == false) callback(null,false);
            var resumeSetId = [];
            var roleIdSet = [];
            
              Resume.model.find()
                    .where('user_id',userItem.id)
                    .exec(function(err, resume) {
                     if(resume.length == 0)  return callback(null,false);//?¡¥1??o?€?¨¨??¨¨???¡è????
                      for(i=0;i<resume.length;i++){
                        resumeSetId.push(resume[i].career_in_crews_id);
                      }
                      var resumeSetIdLength = resumeSetId.length;
                      async.eachSeries(resumeSetId, function(item,next){

                            CareerInCrew.model.findById(item)
                                              .where('publish_create',false)
                                              .exec(function(err, careerInCrew) {
                                                if (careerInCrew == null )  return callback(null,false);

                                               Role.model.findById(careerInCrew.role)
                                                                 .exec(function(err, role) { 
                                                                    if (role == null )   callback(null,false);//?¡è??????o?€?
                                             
                                                                  resumeSetIdLength = resumeSetIdLength-1;

                                                                    if(resumeSetIdLength==0){
                                                                          if(role.roleCategory != rolecategory_id){
                                                                               return callback(null,false);
                                                                            }
                                                                      }

                                                                  if(resumeSetIdLength>=0){
                                                                      if(role.roleCategory == rolecategory_id){
                                                                            return callback(null,true);
                                                                      }else{
                                                                       next();
                                                                      }
                                                                    

                                                                  }else{

                                                                      return callback(null,false);

                                                                  }
                                        

                                                  });
                                               
                                             
                                            

                              });
                              

                            },function(err){
                              console.log(roleIdSet);
                            });                       
                    });                                                        
        }
      ], function (err ,isPush) {
        console.log(isPush);
          if(isPush){
          results.push(userItem);
        }
        next();
      });  
  },function(err){
    if(err){
      callback(err,null);
    }else{
      callback(null,ret);
    }
  }); 
}

var formatroleresult=function(roletags,callback){
  var roleresult=[];
  roletags.forEach(function(value) {
    roleresult.push(value);
  })
    return callback(null, roleresult); 
}

var formatCasting = function(userid,callback){
  var actor_casting = {};
  Casting.model.findOne()
   .where('user_id',userid)
   .exec(function(err,casting){
      if(err){
        throw new Error(err);
      }else{
        if(casting!=null){
          (casting.artimage.length!=0) ? (actor_casting.iconUrl =  config.homeEntry.url+'/WX/casting/artimage/' + casting.artimage[casting.artimage.length-1].filename) : (actor_casting.iconUrl="") ;
            Compress_Casting.model.findOne()
            .where('user_id',userid)
            .exec(function(err,casting1){
               if(err){
                  throw new Error(err);
               }else{
                  if(casting1 == null){
                    actor_casting.compress_iconUrl="";
                    callback(null,actor_casting);
                  }else{
                    (casting1.compress_artimage.length!=0) ? (actor_casting.compress_iconUrl =  config.homeEntry.url+'/WX/casting/compress_artimage/' + casting1.compress_artimage[casting1.compress_artimage.length-1].filename) : (actor_casting.compress_iconUrl="") ;
                     callback(null,actor_casting);
                  }               
               }
            })
         
        }else{
           actor_casting.iconUrl="";
           Compress_Casting.model.findOne()
           .where('user_id',item.user_id)
           .exec(function(err,casting1){
               if(err){
                  throw new Error(err);
               }else{
                  if(casting1 == null){
                    actor_casting.compress_iconUrl="";
                    callback(null,actor_casting);
                  }else{
                    (casting1.compress_artimage.length!=0||casting1.compress_artimage.length!=undefined) ? (actor_casting.compress_iconUrl =  config.homeEntry.url+'/WX/casting/compress_artimage/' + casting1.compress_artimage[casting1.compress_artimage.length-1].filename) : (actor_casting.compress_iconUrl="") ;
                     callback(null,actor_casting);
                  }
                
               }
           })
        }
      }
   }) 
}
module.exports = {
  formatPaginateObjUsers: formatPaginateObjUsers,
  formatRankListActor: formatRankListActor,
  formatGroupImgurl:formatGroupImgurl,
  formatRecommendUser: formatRecommendUser,
  ///getrolecategoryid:getrolecategoryid,
  formatPaginateObjActors:formatPaginateObjActors,
  formatroleresult:formatroleresult,
  formatCasting : formatCasting
}