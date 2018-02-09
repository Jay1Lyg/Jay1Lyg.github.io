var async = require('async');
var keystone = require('keystone'),
    Role = keystone.list('Role'),
  	User = keystone.list('User'),
	  CareerInCrew = keystone.list('CareerInCrew'),
    Resume = keystone.list('Resume');
    Casting = keystone.list('Casting');
    CareerInResume = keystone.list('CareerInResume');
    PDF_Production = keystone.list('PDF_Production'),
    PDF_Role = keystone.list('PDF_Role');
    Production = keystone.list('Production');

var config = require('../../../public/conf/common.js');
var format=require('../resume/format.js');

var isTagsTypeMatch = function(type_id, type_array){
  var flag=false;
  if(type_id==null || type_array==null || type_array.length==0) throw new Error('empty type_id or type_array!'); //Ã‚Â¹ÃƒÂ½Ãƒâ€šÃƒâ€¹ÃƒÅ’ÃƒÂµÃ‚Â¼ÃƒÂ¾ÃƒÅ½ÃƒÅ¾ÃƒÂÃ‚Â?
  for(var cat in type_array) {
    // console.log('---------------');
    // console.log(type_id);
    // console.log(type_array[cat]);
    // console.log(type_array[cat]==type_id);
    // console.log('---------------');
    if(type_array[cat]==type_id) flag=true;
  }
  return flag;
}

var formatMatchTag = function(giveTagsArray,ownTagsArray,callback){
  var flag = false;
  async.waterfall([
  	function(callback){//判断前端传来的标签里是否有不限
      for(var cat in giveTagsArray) {
        // console.log('---------------');
        // console.log('前端传来标签有不限');
        // console.log(giveTagsArray);
        // console.log('---------------');
        if(giveTagsArray[cat]=='59a721769c2bd4746065d7f6'||giveTagsArray[cat]=='59acc64425d3453c2a50bbfe'||giveTagsArray[cat]=='59aa2b24d1caefb01b1f6e45') flag=true;
      }
      callback(null,flag);
    },function(arg,callback){
       console.log('1');
       //console.log(arg);
       if(arg){
          console.log('2');
          callback(null,arg);
       }else{
          console.log('3');
          for(var i=0;i<giveTagsArray.length;i++){
            if(isTagsTypeMatch(giveTagsArray[i],ownTagsArray)){
                  flag = true;
                  console.log('4');
                  callback(null,flag); 
                  break;
            }else{
                if(i==giveTagsArray.length-1){
                  flag=false; 
                  callback(null,flag);
                }
            }
          }
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

var matchShapAccordingToMale=function(shap,BMI,callback){//男性体型匹配
   // console.log('------------------------');
   // console.log(shap);
   // console.log(BMI);
   // console.log('------------------------');
   var nowdate=new Date();
   switch(parseInt(shap)){
     case 0://不限
         flag=true;
         callback(null,flag);
         break; 
     case 1://消瘦（BMI<17.6）
        if(BMI<17.6){
            flag=true;
            callback(null,flag);
            break; 
        }else{
           flag=false;
           callback(null,flag);
           break;
        }

      case 2://偏瘦(17.6-19.6)
        if(17.6<=BMI && BMI<=19.6){
           flag=true;
           callback(null,flag);
           break;
        }else{
          flag=false;
          callback(null,flag);
          break;
        }
      case 3://适中(19.6-25.4)
        if(19.6<=BMI && BMI<=25.4){
            flag=true;
            console.log('!');
            callback(null,flag);
            break;
        }else{
          flag=false;
          console.log('?');
          callback(null,flag);
          break;
        }
      case 4://健硕(25.4-29.7)
        if(25.4<=BMI && BMI<=29.7){
          flag=true;
          callback(null,flag);
          break;
        }else{
          flag=false;
          callback(null,flag);
          break;
        }
      case 5://胖子(29.7以上)
        if(BMI>29.7){
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

var matchShapAccordingToFemale=function(shap,BMI,callback){//女性体型匹配
   var nowdate=new Date();
   switch(parseInt(shap)){
     case 0://不限
         flag=true;
         callback(null,flag);
         break; 
     case 1://消瘦（BMI<16.5）
        if(BMI<16.5){
            flag=true;
            callback(null,flag);
            break; 
        }else{
           flag=false;
           callback(null,flag);
           break;
        }
      case 2://偏瘦(16.5-18.7)
        if(16.5<=BMI && BMI<=18.7){
           flag=true;
           callback(null,flag);
           break;
        }else{
          flag=false;
          callback(null,flag);
          break;
        }
      case 3://适中(18.7-25)
        if(18.7<=BMI && BMI<=25){
            flag=true;
            callback(null,flag);
            break;
        }else{
          flag=false;
          callback(null,flag);
          break;
        }
      case 4://健硕(25-29.7)
        if(25<=BMI && BMI<=29.7){
          flag=true;
          callback(null,flag);
          break;
        }else{
          flag=false;
          callback(null,flag);
          break;
        }
      case 5://胖子(29.7以上)
        if(BMI>29.7){
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
var matchShap=function(obj,user,callback){//匹配体型
   var height = user.height/100;//(换算成m)
   var BMI = user.weight/(height*height);
   if(user.gender==1){//性别为男（男女计算公式不同）
      matchShapAccordingToMale(obj.shape,BMI,function(err,status){
        if(err){
           throw new Error(err);
        }else{
          // console.log('男生体格匹配');
          // console.log('BMI:'+BMI);
          // console.log(obj.shape);
          callback(null,status);
        }
      });
   }else if(user.gender==2){
      matchShapAccordingToFemale(obj.shape,BMI,function(err,status){
         if(err){
           throw new Error(err);
         }else{
          // console.log('女生体格匹配');
          // console.log('BMI:'+BMI);
          // console.log(obj.shape);
          callback(null,status);
         }
      });
   }
}
var matchHeight=function(obj,user,callback){//匹配身高
   var flag = false;
   if(obj.max_height==''){
       console.log('最高身高不限');
       if(obj.min_height==''){
          console.log('最低身高不限');
          flag = true;
          callback(null,flag); 
       }else{//填了最小身高，最大没填,身高大于最小身高的符合
          console.log('最低身高：'+obj.min_height);
          console.log('用户身高：'+user.height);
          if(user.height>=obj.min_height){
              console.log('身高匹配成功');
              flag = true;
              callback(null,flag); 
          }else{
            console.log('身高匹配失败');
            flag = false;
            callback(null,flag); 
          }
       }
   }else{
        console.log('最高身高：'+obj.max_height);
        if(obj.min_height==''){//填了最大身高，最小没填,身高小于最大身高的符合
           console.log('最低身高不限');
           if(user.height<=obj.max_height){
              console.log('用户身高：'+user.height);
              console.log('身高匹配成功');
              flag = true;
              callback(null,flag); 
           }else{
            console.log('身高匹配失败');
            flag = false;
            callback(null,flag); 
           }
        }else{
          console.log('最低身高：'+obj.min_height);
           if(obj.min_height<=user.height && user.height<=obj.max_height){
              console.log('用户身高：'+user.height);
              console.log('身高匹配成功');
              flag = true;
              callback(null,flag); 
           }else{
            console.log('身高匹配失败');
            flag = false;
            callback(null,flag); 
           }
        }
   }
}

//将pdf_user的数据放入User表-------照片未处理
var formatUser = function(pdfUser,userid,callback){
   User.model.findOne()
   .where('_id',userid) 
   .exec(function(err,user){
      if(err){
         throw new Error(err);
      }else{
        (pdfUser.realname != undefined) ? (user.realname = pdfUser.realname) : (console.log('realname is null'));
        (pdfUser.height != undefined) ? (user.height = pdfUser.height) : (console.log('height is null'));
        (pdfUser.weight != undefined) ? (user.weight = pdfUser.weight) : (console.log('weight is null'));
        (pdfUser.resume_url != undefined) ? (user.resume_url = pdfUser.resume_url) : (console.log('resume_url is null'));
        (pdfUser.birth != undefined) ? (user.birth = pdfUser.birth) : (console.log('birth is null'));
        user.save(function(err){
          if(err){
            throw new Error(err);
          }else{
            callback(null);
          }
        })
        // var img = {};
        // img.filename = user_id+'/'+filename_time + '.png';
        // img.originalname = filename_time + '.png';
        // img.path = 'images/ProductionImageInPdf/';
        // result.ProductionImageInPdf.push(img);
        // result.save(function(err){
        //     if(err){
        //         throw new Error("err in save"+err.message);
        //         console.log(err);
        //     }

        // });
      }
   })
}

var formatSkill = function(pdf_skillArray,userid,callback){
   async.eachSeries(pdf_skillArray,function(item,next){
      SkillTag.model.findOne()
      .where('name',item.name)
      .exec(function(err,ret){
        if(err){
          throw new Error(err);
        }else{
          if(ret==null){
            next();
          }else{
             User.model.findOne()
             .where('_id',userid)
             .exec(function(err,user){
                if(err){
                   throw new Error(err);
                }else{
                   skill.push(ret._id);
                   user.save(function(err){
                     if(err){
                        throw new Error(null);
                     }else{
                         next();
                     }
                   });
                }
             })
          }
        }
      })
   },function(err){
      if(err){
        throw new Error(err);
      }else{
         callback(null);
      }
   });
}
//查询出导出的剧目
var formatPdfProduction = function(careerinresumeArray,userid,callback){
   var array = [];
   async.eachSeries(careerinresumeArray,function(item,next){
      var data = {};
      data.user_id = item.user_id;
      data.pro_object = item.pro_object;
      data.role = item.role;
      PDF_Production.model.findOne()
      .where('_id',item.pro_object)
      .exec(function(err,production){
         if(err){
           throw new Error(err);
         }else{
           data.production_name = production.name;
           PDF_Role.model.findOne()
           .where('id',item.role)
           .exec(function(err,role){
              if(err){
                 throw new Error(err);
              }else{
                 data.role_name = role.name;
                 array.push(data);
                 next();
              }
           })
         }
      })
   },function(err){
      if(err){
         throw new Error(err);
      }else{
        callback(null,array);
      }
   });
}
//将导出的剧目与user关联
var formatProduction = function(PdfProductionInfo,userid,callback){
   async.eachSeries(PdfProductionInfo,function(item,next){
      Production.model.create({
        name : item.production_name
      },function(err,production){
        if(err){
          throw new Error(err);
        }else{
          Role.model.create({
             name : item.role_name
          },function(err,role){
             if(err){
               throw new Error(err);
             }else{
               CareerInResume.model.create({
                 user_id : userid,
                 pro_object : item.pro_object,
                 role : item.role
               },function(err,careerinresume){
                  if(err){
                     throw new Error(err);
                  }else{
                     next();
                  }
               })
             }
          })
        }
      })
   },function(err){
     if(err){
       throw new Error(err);
     }else{
       callback(null);
     }     
   });
}

//保存照pian(导入一张图片)
var formatSaveImage1 = function(ProductionImageInPdf,userid,callback){
 User.model.findOne()
  .where('_id',userid) 
  .exec(function(err,user){
    if(err){
       throw new Error(err);
    }else{
       user.filename=ProductionImageInPdf[0].filename;
       user.originalname=ProductionImageInPdf[0].originalname;
       user.path=ProductionImageInPdf[0].path;
       user.save(function(err){
          if(err){
             throw new Error(err);
          }else{
             Casting.model.findOne()
             .where('user_id',userid)
             .exec(function(err,casting){
               if(err){
                  throw new Error(err);
               }else{
                  if(casting == null){
                    Casting.model.create({
                      user_id : userid
                    },function(err,casting1){
                      if(err){
                        throw new Error(err);
                      }else{
                         casting1.filename=ProductionImageInPdf[0].filename;
                         casting1.originalname=ProductionImageInPdf[0].originalname;
                         casting1.path=ProductionImageInPdf[0].path;
                         casting1.save(function(err){
                            if(err){
                               throw new Error(err);
                            }else{
                               callback(null);
                            }
                         })
                      }
                    })
                  }else{
                     casting.filename=ProductionImageInPdf[0].filename;
                     casting.originalname=ProductionImageInPdf[0].originalname;
                     casting.path=ProductionImageInPdf[0].path;
                     casting.save(function(err){
                        if(err){
                           throw new Error(err);
                        }else{
                           callback(null);
                        }
                     })
                  }
               }
             })
          }
       })
    }
  })
}

//保存照pian(导入两张及以上数量的图片)
var formatSaveImage2 = function(ProductionImageInPdf,userid,callback){
 User.model.findOne()
  .where('_id',userid) 
  .exec(function(err,user){
    if(err){
       throw new Error(err);
    }else{
       user.filename=ProductionImageInPdf[0].filename;
       user.originalname=ProductionImageInPdf[0].originalname;
       user.path=ProductionImageInPdf[0].path;
       user.save(function(err){
          if(err){
             throw new Error(err);
          }else{
             Casting.model.findOne()
             .where('user_id',userid)
             .exec(function(err,casting){
               if(err){
                  throw new Error(err);
               }else{
                  if(casting == null){
                    Casting.model.create({
                      user_id : userid
                    },function(err,casting1){
                      if(err){
                        throw new Error(err);
                      }else{
                         casting1.filename=ProductionImageInPdf[1].filename;
                         casting1.originalname=ProductionImageInPdf[1].originalname;
                         casting1.path=ProductionImageInPdf[1].path;
                         casting1.save(function(err){
                            if(err){
                               throw new Error(err);
                            }else{
                               callback(null);
                            }
                         })
                      }
                    })
                  }else{
                     casting.filename=ProductionImageInPdf[1].filename;
                     casting.originalname=ProductionImageInPdf[1].originalname;
                     casting.path=ProductionImageInPdf[1].path;
                     casting.save(function(err){
                        if(err){
                           throw new Error(err);
                        }else{
                           callback(null);
                        }
                     })
                  }
               }
             })
          }
       })
    }
  })
}
module.exports = {
  formatMatchTag: formatMatchTag,
  matchShapAccordingToFemale : matchShapAccordingToFemale,
  matchShapAccordingToMale : matchShapAccordingToMale,
  matchHeight : matchHeight,
  matchShap : matchShap,
  formatPdfProduction : formatPdfProduction,
  formatSkill : formatSkill,
  formatUser : formatUser,
  formatProduction : formatProduction,
  formatSaveImage1 : formatSaveImage1,
  formatSaveImage2 : formatSaveImage2
}