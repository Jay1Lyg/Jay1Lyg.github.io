var keystone = require('keystone'),
	Actor = keystone.list('Actor');
	Role = keystone.list('Role'),
	User = keystone.list('User'),
	CareerInCrew = keystone.list('CareerInCrew'),
    Resume = keystone.list('Resume');
    RoleCategory=keystone.list('RoleCategory');
   // Performer=keystone.list('Performer');
var async = require('async');
// var _ = require('underscore');
//var config = require('../../public/conf/common.js');
var format = require('./format.js');
var format1=require('../resume/format.js');
var findUser=function(index,page,perpage,sex, age, type,callback){
     var users={};
	 User.paginate({
		page: page,
		perPage:perpage,
		maxPages: 10
	 })
	.sort('-createdAt ')
	//.sort('beInvitedNumber')
	.exec( function(err, ret){
		users.currentPage = ret.currentPage;
		users.totalPages = ret.totalPages;
		format.formatPaginateObjUsers(ret.results,index,function(err,usersets,num,jobtags){
			if(err){
				 callback(err, null);	
			}else{
				 users.total= num;
				 users.results= usersets;
				 callback(null, users);	
			}
		});    	
	});

}
//auther@cincan ½«ÑÝÔ±°´ÕÕ±»ÑûÇë´ÎÊýµÄ¶àÉÙ½øÐÐÅÅÐò
var findUserShowInRankList=function(index,callback){
     var users={};
	User.model.find()
	.sort('beInvitedNumber')
	.exec( function(err, ret){
		users.currentPage = ret.currentPage;
		users.totalPages = ret.totalPages;
		format.formatPaginateObjUsers(ret,index, function(err,usersets,num){
			if(err){
				 callback(err, null);	
			}else{
				 users.total= num;
				 users.results= usersets;
				 callback(null, users);	
			}
		});    	
	});

}

var findActorShowInRankList=function(page,callback){
     var users={};
	 Actor.paginate({
		page: page,
		perPage:20,
		maxPages: 10
	 })
	.sort('-beInvitedNumber')
	.where('isShowInInvitedRankList', 'true')
	.exec( function(err, ret){
		format.formatRankListActor(ret,function(err,actorsets){
			if(err){
				 callback(err, null);	
			}else{
				 callback(null, actorsets);	
			}
		});   
	});

}

var groupbyAge=function(age,born_year,callback){
   var nowdate=new Date();
   switch(parseInt(age)){
     case 1:
        if((nowdate.getFullYear()-6)<=born_year && born_year<=nowdate.getFullYear()){
            flag=true;
            callback(null,flag);
            break; 
        }else{
           flag=false;
           callback(null,flag);
           break;
        }

      case 2:
        if((nowdate.getFullYear()-17)<=born_year && born_year<=(nowdate.getFullYear()-7)){
           flag=true;
           callback(null,flag);
           break;
        }else{
        	flag=false;
        	callback(null,flag);
          break;
        }
      case 3:
        if((nowdate.getFullYear()-40)<=born_year && born_year<=(nowdate.getFullYear()-18)){
            flag=true;
            callback(null,flag);
            break;
        }else{
        	flag=false;
        	callback(null,flag);
          break;
        }
      case 4:
        if((nowdate.getFullYear()-65)<=born_year && born_year<=(nowdate.getFullYear()-41)){
          flag=true;
          callback(null,flag);
          break;
        }else{
        	flag=false;
        	callback(null,flag);
          break;
        }
      case 5:
        if((nowdate.getFullYear()-66)>=born_year){

          flag=true;
          callback(null,flag);
          break;
        }else{
          flag=false;
          callback(null,flag);
          break;
        }
     }
}
//演员列表--查询演员
var findactors=function(userArray,callback){  
   var actors={};
   var actorinfo=[];
   var flag=true;
   // User.paginate({
   //  page: page,
   //  perPage:10,
   //  maxPages: 10
   // }) 
   // .where('allok',true)
   // .sort('-createdAt')
   // .exec( function(err, ret){
   //  actors.currentPage = ret.currentPage;
   //  actors.totalPages = ret.totalPages;
    format.formatPaginateObjUsers(userArray,function(err,usersets){   
      console.log('----------usersets-----------');
      console.log(usersets);
      console.log('----------usersets-----------');
      if(err){
        callback(err, null);  
      }
      if(usersets==null||usersets.length==0){
        callback(null, []);
      }
      else{
        async.eachSeries(usersets,function(item,next){
          var users={};
          users.id=item.id;
          users.name=item.name;
          users.realname=item.realname;
          users.artname=item.artname;
          users.shortintroduce=item.shortintroduce;
          users.beInvitedNumber=item.beInvitedNumber;
          users.birth=item.birth;
          users.gender=item.gender;
          users.iconUrl=item.iconUrl;
          users.compress_iconUrl = item.compress_iconUrl;
          if(item.iconUrl==''){
            next();
          }else{
            actorinfo.push(users);
            next();
          }
        },function(err){
           if(err){
             callback(err,[]);
           }else{
            console.log('step-4');
            callback(null, actorinfo);               
           }
        });
         
      }
  //   });     
    });

}
/*
*
*    筛选演员
*
*
*
*/
var getScreenActors = function(item,age,sex,callback){
  var users = {};
  var flag = false;
  async.waterfall([
    function(callback){
      console.log('step-1');
      users.id=item.id;
      users.name=item.name;
      users.realname=item.realname;
      users.artname=item.artname;
      users.shortintroduce=item.shortintroduce;
      users.beInvitedNumber=item.beInvitedNumber;
      users.birth=item.birth;
      users.gender=item.gender;
      users.iconUrl=item.iconUrl;
      users.compress_iconUrl = item.compress_iconUrl;
      if(item.iconUrl==''){
         callback(null,false);
      }else{
         callback(null,true);  
      }              
    },
    function(arg,callback){
     console.log('step-2');
     if(arg == false){
        callback(null,false);
     }else{
         if(age==''||age=='0'){
           callback(null,true);
          
         }
         else{ 
           if(item.birth==null||item.birth==undefined){
                callback(null,false);
             } 
           else{            
              groupbyAge(age,item.birth.getFullYear(),function(err,ret){
                  if(err){
                    callback(err,null);
                  }else{
                    console.log(ret);
                    callback(null,ret);
                  }
              });  
           }                 
         }
     }
    },
    function(arg,callback){
      // console.log('______');
      // console.log(arg);
      if(arg==false){
          callback(null,false);
      }else{
        (sex==''||sex=='0') ? flag = true : (item.gender==sex ? flag = true : flag = false);
         callback(null,flag);
      }
    }
    ],function(err,flag1){               
       if(flag1){
          callback(null,users);
       }else{
          callback(null,null);
       }
       
  });
}

/*
*
*    从用户中检索出演员和职员
*
*
*
*/


 var findsearchactors=function(appid,age,sex,callback){  
   console.log('---------------------');
   console.log(age);
   console.log(sex);
   console.log('---------------------');
   var actors={};
   var actorinfo=[];
   var index=1;
   var flag=true;
   PublicAccount.model.findOne()
   .where('appid',appid)
   .exec(function(err,public){
      if(err){
        throw new Error(err);
      }else{
         User.model.find()
         .where('allok',true)
         .where('appid',public._id)
         .sort('-createdAt')
         .exec( function(err, ret){
          format.formatPaginateObjUsers(ret,function(err,usersets){   
            if(err){
              callback(err, null);  
            }
            if(usersets==null||usersets.length==0){
              callback(null, []);
            }
            else{
              async.eachSeries(usersets,function(item,next){
                var users={};
                getScreenActors(item,age,sex,function(err,result){
                    if(err){
                       throw new Error(err);
                    }else{
                      console.log('---------result---------');
                      console.log(result);
                      console.log('---------result---------');
                      if(result==null){
                         next();
                      }else{
                        actorinfo.push(result);
                        next();
                      }
                       
                    }
                })

                },function(err){
                   if(err){
                     callback(err,[]);
                   }else{
                    console.log('step-4');
                    callback(null, actorinfo);                
                   }
              });
               
            }
          });     
        });
      }
    })

}
/////////////////////////////////////////////搜索演员库///////////////////////////////////////////////
// var findactorsInfo=function(page,age,sex,callback){  
//    var actors={};
//    var actorinfo=[];
//    var flag=true;
//    Performer.paginate({
//     page: page,
//     perPage:200,
//     maxPages: 10
//    }) 
//   .exec( function(err, ret){
//     actors.currentPage = ret.currentPage;
//     actors.totalPages = ret.totalPages;
//     format.formatPaginateObjActors(ret.results,function(err,usersets){    
//       if(err){
//         callback(err, []);  
//       }
//       else{
//         actors.total= usersets.length;
//         async.eachSeries(usersets,function(item,next){
//           var users={};
//           var imgUrl=null;
//           async.waterfall([
//             function(callback){
//               console.log('step-1');
//               users.id=item.id;
//               users.realname=item.realname;
//               users.artname=item.artname;
//               users.introduction=item.introduction;
//               users.birth=item.birth;
//               users.gender=item.gender;
//               (item.images.length>0) ? (users.iconUrl =  'actor/' + item.images[item.images.length-1].filename) : (users.iconUrl="") ;
//               callback(null);
//             },
//             function(callback){
//                console.log('step-2');
//                if(age==''||age=='0'){
//                  console.log('gogo..');
//                  callback(null,true);
                
//                }
//               else{  
//                  if(item.birth==null||item.birth==undefined){
//                     callback(null,false);
//                  } 
//                  else{          
//                     groupbyAge(age,item.birth.getFullYear(),function(err,ret){
//                         if(err){
//                           callback(err,null);
//                         }else{
//                           callback(null,ret);
//                         }
//                     }); 
//                  }                  
//               }
//             },
//             function(arg,callback){
//               console.log('step-3'); 
//               if(arg==false){
//                   callback(null,false);
//               }else{
//                 (sex==''||sex=='0') ? flag = true : (item.gender==sex ? flag = true : flag = false);
//                  callback(null,flag);
//               }
//             }
//             ],function(err,flag1){               
//                if(flag1){
//                   actorinfo.push(users);
//                  }
//                 next();
               
//           });

//           },function(err){
//              if(err){
//                callback(err,[]);
//              }else{
//               console.log('step-4');
//               actors.results=actorinfo ;
//               callback(null, actors);               
//              }
//         });
             
//       }
//       });     
//   });

// }
////////////////////////////////////////////////////////////////////////////////////////////
//auther@dongjia
var findstaff=function(page,age,sex,rolecategoryid,callback){
 var staff={};
 var staffinfo=[];
 //var rolecategoryArray=[];
 var index=2;
 User.paginate({
	page: page,
	perPage:20,
	maxPages: 10
 })
.populate('careerInCrewsRelation')
.sort('-beInvitedNumber')
.exec( function(err, ret){
	staff.currentPage = ret.currentPage;
	staff.totalPages = ret.totalPages;
	format.formatPaginateObjUsers(ret.results,index,function(err,usersets,num){		
		if(err){
			return callback(err, null);	
		}
    if(usersets==null||usersets.length==0){
      return callback(null, []);
    }
	  else{
		  staff.total= num;
		  async.eachSeries(usersets,function(item,next){
		  	var users={};
        var roleresult=[];
        var rolecategoryArray=[];
        var getroleCategory=[];
        var flag=false;
		  	async.waterfall([
	  	    function(callback){
	  	  	console.log('step-1');
            users.id=item.id;
            users.name=item.name;
            users.realname=item.realname;
            users.artname=item.artname;
            users.shortintroduce=item.shortintroduce;
            users.beInvitedNumber=item.beInvitedNumber;
            users.birth=item.birth;
            console.log( users.birth);
            users.gender=item.gender;
            format.formatGroupImgurl(item.images,function(err,imgurl){
              if(err){
                throw new Error('Error happened when getting imgurl' );
              }else{
              	users.iconUrl=imgurl;
                return callback(null);
              }
            });	
          },
          function(callback){
            format1.getCareerByTwomodel(item.id,function(err,ret){
               if(err) throw new Error(err);
               else{
                  rolecategoryArray=ret.rolecategoryTags;
                  getroleCategory=ret.roleTags;
                  return callback(null);
               }
            });
          },    
          function(callback){
             console.log('step-4');
             if(age==''||age=='0'||item.birth==null){
                 return callback(null,true);          
             }

            else{ 
               if(item.birth==null||item.birth==undefined){
                  return callback(null,false);
               }  
               else{              	
               	  groupbyAge(age,item.birth.getFullYear(),function(err,ret){
                      if(err){
                        return callback(err,null);
                      }else{
                        return callback(null,ret);
                      }
               	  });  
               }        
            }      
          },
          function(arg,callback){
          	console.log('step-5'); 
          	if(arg==false){
                return callback(null,false);
          	}else{
               (sex==''||sex=='0') ? flag = true : (item.gender==sex ? flag = true : flag = false);
               return callback(null,flag);
             }             
          }, 
          function(arg1,callback){
            console.log('step-6'); 
            if(arg1==false){
                return callback(null,false);
          	}else{
          	   if(rolecategoryid==null||rolecategoryid==''){
                 return callback(null,true);
          	   }else{
                  for(var i=0;i<rolecategoryArray.length;i++){
                     if(rolecategoryArray[i]==rolecategoryid){
                       flag=true;
                       callback(null,flag);
                       break;                          
                     }else{
                        if(i==rolecategoryArray.length-1){
                          flag=false; 
                          return callback(null,flag);
                       }
                    }
                  } 
          	   }	
          	}           	
          },
      	],function(err,flag1){          	 
           if(flag1){
             staffinfo.push(users);
           }
            next();             
       });
  	   },function(err){
           if(err){
             return callback(err,[]);
           }else{
             console.log('step-7');
           	 staff.results=staffinfo;
             return callback(null, staff);	         
           }
  	   });			 
  		}
	});    	
});    

}


//auther@ciancan ËÑÑ°ÍÆ¼öµÄÑÝÖ°Ô±
var findUserRecommend=function(age,gender,rolecategory_id,callback){
	User.model.find()
		.sort('-beInvitedNumber')
		.populate('CareerInCrew')
		.where('gender', gender)
		.exec( function(err, ret){
			format.formatRecommendUser(ret , age, rolecategory_id,function(err,users){
				if(err){
					 callback(err, null);	
				}else{
					 callback(null, users);	
				}
			});   
		});

}


module.exports = {
	findUser: findUser, 
	findUserShowInRankList: findUserShowInRankList,
	findActorShowInRankList: findActorShowInRankList,
	findactors:findactors,
	findstaff:findstaff,
	findUserRecommend: findUserRecommend,
  groupbyAge:groupbyAge,
  findsearchactors : findsearchactors,
  getScreenActors : getScreenActors
}