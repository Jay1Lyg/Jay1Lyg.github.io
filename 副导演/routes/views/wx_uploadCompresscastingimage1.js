var keystone = require('keystone'),
	Compress_Casting = keystone.list('Compress_Casting');
var fs = require("fs");
var query = require('../../query/util/savePictureToServer.js');
var config = require('../../public/conf/common.js');


var saveImage=function(imageLocation,userid,callback){
  var item={};
  Compress_Casting.model.findOne()
  .where('user_id',userid)
  .exec(function(err, casting) {
      console.log('1111111111111111111111111111111111111111111111');
      console.log(casting);
      console.log(imageLocation);

        if(imageLocation=='1'){
           var date = new Date().getTime();
           var location = userid+'/'+date+'.jpg';
           var medianame = date+'.jpg';
           var path='images/compress_frontimage';
           var path1='images/compress_frontimage/';
           var dataArray = [path1,userid,location];
          if(casting==null){
              Compress_Casting.model.create({user_id:userid},function(err,ret){
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 ret.compress_frontimage.push(item);
                 ret.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/compress_frontimage/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
              })
          }else{
             item.filename=location;
             item.originalname=medianame;
             item.path=path;
             casting.compress_frontimage.push(item);
             casting.save(function(err){
                if(err){
                  res.send(err);
                }else{
                  var url=config.homeEntry.url+'/WX/casting/compress_frontimage/'+userid+'/'+medianame;
                  callback(null,url,dataArray);
                }
             })
          }
          
        }if(imageLocation=='2'){
            var date = new Date().getTime();
            var location = userid+'/'+date+'.jpg';
            var medianame = date+'.jpg';
            var path='images/compress_leftimage45';
            var path1='images/compress_leftimage45/';
            var dataArray = [path1,userid,location];
            if(casting==null){
              Compress_Casting.model.create({user_id:userid},function(err,ret){
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 ret.compress_leftimage45.push(item);
                 ret.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/compress_leftimage45/'+userid+'/'+date+'.jpg';
                      callback(null,url,dataArray);
                    }
                 })
              })
            }else{
               item.filename=location;
               item.originalname=medianame;
               item.path=path;
               casting.compress_leftimage45.push(item);
               casting.save(function(err){
                  if(err){
                    res.send(err);
                  }else{
                   // res.send('http://kaishi.viphk.ngrok.org/WX/casting/leftimage45/'+userid+'/'+mediaId+'.jpg');
                    var url=config.homeEntry.url+'/WX/casting/compress_leftimage45/'+userid+'/'+date+'.jpg';
                    callback(null,url,dataArray);
                  }
               })
            }
            
          
        }if(imageLocation=='3'){
           var date = new Date().getTime();
           var location = userid+'/'+date+'.jpg';
           var medianame = date+'.jpg';
           var path='images/compress_rightimage45';
           var path1='images/compress_rightimage45/';
           var dataArray = [path1,userid,location];
          if(casting==null){
              Compress_Casting.model.create({user_id:userid},function(err,ret){
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 ret.compress_rightimage45.push(item);
                 ret.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/compress_rightimage45/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
              })
            }else{
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 casting.compress_rightimage45.push(item);
                 casting.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      //res.send('http://kaishi.viphk.ngrok.org/WX/casting/rightimage45/'+userid+'/'+mediaId+'.jpg');
                      var url=config.homeEntry.url+'/WX/casting/compress_rightimage45/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
            }
           
          
        }if(imageLocation=='4'){
            var date = new Date().getTime();
            var location = userid+'/'+date+'.jpg';
            var medianame = date+'.jpg';
            var path='images/compress_rightimage90';
            var path1='images/compress_rightimage90/';
            var dataArray = [path1,userid,location];
             if(casting==null){
              Compress_Casting.model.create({user_id:userid},function(err,ret){
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 ret.compress_rightimage90.push(item);
                 ret.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/compress_rightimage90/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
              })
            }else{
               item.filename=location;
               item.originalname=medianame;
               item.path=path;
               casting.compress_rightimage90.push(item);
               casting.save(function(err){
                  if(err){
                    res.send(err);
                  }else{
                    //res.send('http://kaishi.viphk.ngrok.org/WX/casting/rightimage90/'+userid+'/'+mediaId+'.jpg');
                    var url=config.homeEntry.url+'/WX/casting/compress_rightimage90/'+userid+'/'+ medianame;
                    callback(null,url,dataArray);
                  }
               })
            }
          
        }if(imageLocation=='5'){
            var date = new Date().getTime();
            var location = userid+'/'+date+'.jpg';
            var medianame = date+'.jpg';
            var path='images/compress_leftimage90';
            var path1='images/compress_leftimage90/';
            var dataArray = [path1,userid,location];
            if(casting==null){             
              Compress_Casting.model.create({user_id:userid},function(err,ret){
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 ret.compress_leftimage90.push(item);
                 ret.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/compress_leftimage90/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
              })
            }else{
               item.filename=location;
               item.originalname=medianame;
               item.path=path;
               casting.compress_leftimage90.push(item);
               casting.save(function(err){
                  if(err){
                    res.send(err);
                  }else{
                    //res.send('http://kaishi.viphk.ngrok.org/WX/casting/leftimage90/'+userid+'/'+mediaId+'.jpg');
                    var url=config.homeEntry.url+'/WX/casting/compress_leftimage90/'+userid+'/'+medianame;
                    callback(null,url,dataArray);
                  }
               })
          
            }
        }if(imageLocation=='6'){
            var date = new Date().getTime();
            var location = userid+'/'+date+'.jpg';
            var medianame = date+'.jpg';
            var path='images/compress_frontimagewaist';
            var path1='images/compress_frontimagewaist/';
            var dataArray = [path1,userid,location];
             if(casting==null){
              Compress_Casting.model.create({user_id:userid},function(err,ret){
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 ret.compress_frontimagewaist.push(item);
                 ret.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/compress_frontimagewaist/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
              })
            }else{
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 casting.compress_frontimagewaist.push(item);
                 casting.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/compress_frontimagewaist/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
          
            }
          
        }if(imageLocation=='7'){
            var date = new Date().getTime();
            var location = userid+'/'+date+'.jpg';
            var medianame = date+'.jpg';
            var path='images/compress_frontimageall'; 
            var path1='images/compress_frontimageall/'; 
            var dataArray = [path1,userid,location];
            if(casting==null){
              Compress_Casting.model.create({user_id:userid},function(err,ret){
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 ret.compress_frontimageall.push(item);
                 ret.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/compress_frontimageall/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
              })
            }else{
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 casting.compress_frontimageall.push(item);
                 casting.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/compress_frontimageall/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
            }
          
        }if(imageLocation=='8'){
            var date = new Date().getTime();
            var location = userid+'/'+date+'.jpg';
            var medianame = date+'.jpg';
            var path='images/compress_frontimagehead'; 
            var path1='images/compress_frontimagehead/'; 
            var dataArray = [path1,userid,location];
            if(casting==null){
              Compress_Casting.model.create({user_id:userid},function(err,ret){
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 ret.compress_frontimagehead.push(item);
                 ret.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/compress_frontimagehead/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
              })
            }else{
               item.filename=location;
               item.originalname=medianame;
               item.path=path;
               casting.compress_frontimagehead.push(item);
               casting.save(function(err){
                  if(err){
                    res.send(err);
                  }else{
                    //res.send('http://kaishi.viphk.ngrok.org/WX/casting/frontimagehead/'+userid+'/'+mediaId+'.jpg');
                    var url=config.homeEntry.url+'/WX/casting/compress_frontimagehead/'+userid+'/'+medianame;
                    callback(null,url,dataArray);
                  }
               })
            }
          
        }if(imageLocation=='9'){
            var date = new Date().getTime();
            var location = userid+'/'+date+'.jpg';
            var medianame = date+'.jpg';
            var path='images/compress_artimage'; 
            var path1='images/compress_artimage/'; 
            var dataArray = [path1,userid,location];
           if(casting==null){
              
              Compress_Casting.model.create({user_id:userid},function(err,ret){
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 ret.compress_artimage.push(item);
                 ret.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/compress_artimage/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
              })
            }else{
               item.filename=location;
               item.originalname=medianame;
               item.path=path;
               casting.compress_artimage.push(item);
               casting.save(function(err){
                  if(err){
                    res.send(err);
                  }else{
                    //res.send('http://kaishi.viphk.ngrok.org/WX/casting/artimage/'+userid+'/'+mediaId+'.jpg');
                     var url=config.homeEntry.url+'/WX/casting/compress_artimage/'+userid+'/'+medianame;
                     callback(null,url,dataArray);
                  }
               })
            }
          
        }         
    });

}

exports = module.exports = function(req, res) {
  var userid = req.body.userid;
  var imgData = req.body.imgData;
  var imageLocation = req.body.imageLocation;
  //var appid = req.body.appid;
  var location;
  var url;
  var item={};
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer(base64Data, 'base64');
  console.log(req.body);
       Compress_Casting.model.findOne()
        .where('user_id',userid)
        .exec(function(err, casting) {          
            if(casting == null){
              if(imageLocation==undefined||userid==undefined){
                res.status(403).send('parameter undefined');
              }else{
                  saveImage(imageLocation,userid,function(err,ret,array){
                     if(err){
                        throw new Error(err);
                     }else{
                        array.push(dataBuffer);
                        query.savePictureToServer(array,function(err){
                           if(err){
                              res.send(err);
                           }else{
                             var data = {};
                             data.imagesURL = ret;
                             res.send(data);
                           }
                        });
                     }
                  });
              }
            }else{
              if(imageLocation==undefined||userid==undefined){
                res.status(403).send('parameter undefined');
              }
              var location;
              var url;
              if(imageLocation == '1'){
                location = casting.compress_frontimage;
                url = 'compress_frontimage';
                console.log('hhhhhhhhhhhhh0000000000hhhhhhhhhhhhhhhhhhh');
                console.log(casting);
                console.log('hhhhhhhhhhhhh000000000000hhhhhhhhhhhhhhhhhhh');
              }else if(imageLocation == '2'){
                location = casting.compress_leftimage45;
                url = 'compress_leftimage45';
              }else if(imageLocation == '3'){
                location = casting.compress_rightimage45;
                url = 'compress_rightimage45';
              }else if(imageLocation == '4'){
                location = casting.compress_rightimage90;
                url = 'compress_rightimage90';
              }else if(imageLocation == '5'){
                location = casting.compress_leftimage90;
                url = 'compress_leftimage90';
              }else if(imageLocation == '6'){
                location = casting.compress_frontimagewaist;
                url = 'compress_frontimagewaist';
              }else if(imageLocation == '7'){
                location = casting.compress_frontimageall;
                url = 'compress_frontimageall';
              }else if(imageLocation == '8'){
                location = casting.compress_frontimagehead;
                url = 'compress_frontimagehead';
              }else if(imageLocation == '9'){
                location = casting.compress_artimage;
                url = 'compress_artimage';
              }
              console.log(location);
              if(location.length != 0){ 
                fs.unlink(process.cwd()+'/images/'+url+'/'+location[0].filename, function(err) {
                    if (err) {
                      return console.error(err);
                    }
                      console.log("deleted");
                });
                  //delete iamge in db
                if(imageLocation == '1'){
                  casting.compress_frontimage = [];        
                }else if(imageLocation == '2'){
                  casting.compress_leftimage45 = [];               
                }else if(imageLocation == '3'){
                  casting.compress_rightimage45 = [];                
                }else if(imageLocation == '4'){
                  casting.compress_rightimage90 = [];                  
                }else if(imageLocation == '5'){
                  casting.compress_leftimage90 = [];                 
                }else if(imageLocation == '6'){
                  casting.compress_frontimagewaist = [];                 
                }else if(imageLocation == '7'){
                  casting.compress_frontimageall = [];
                }else if(imageLocation == '8'){
                  casting.compress_frontimagehead = [];              
                }else if(imageLocation == '9'){
                  casting.compress_artimage = [];
                }
                
                casting.save(function (err) {
                  if (err) console.log('delete images failed');
                  console.log('ffffffffffffffffffffffffffffffffffffs');
                 saveImage(imageLocation,userid,function(err,ret,array){
                     if(err){
                        throw new Error(err);
                     }else{
                      console.log('--------------array-------------');
                      console.log(array);
                      console.log('--------------array-------------');
                       array.push(dataBuffer);
                       query.savePictureToServer(array,function(err){
                           if(err){
                              res.send(err);
                           }else{
                             var data = {};
                             data.imagesURL = ret;
                             res.send(data);
                           }
                        });
                     }
                  });
                    
                });   
              } else{

                saveImage(imageLocation,userid,function(err,ret,array){
                     if(err){
                        throw new Error(err);
                     }else{
                      console.log('--------------array-------------');
                      console.log(array);
                      console.log('--------------array-------------');
                       array.push(dataBuffer);
                       query.savePictureToServer(array,function(err){
                           if(err){
                              res.send(err);
                           }else{
                             var data = {};
                             data.imagesURL = ret;
                             res.send(data);
                           }
                        });
                     }
                  });
              }

            }
        })

}