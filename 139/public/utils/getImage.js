var fs = require('fs');
var join = require('path').join;
var path = require('path');
var keystone = require('keystone');
var PDF_User = keystone.list('PDF_User');

var getImage = function (data, dirname, filename_time,user_id) {
    mkdir(dirname);  //调用该方法，将照片存入对应的文件夹
    var path = dirname + '/' + filename_time + '.png';//从app.js级开始找--在我的项目工程里是这样的
    var base64 = data.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
    var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
    console.log('dataBuffer是否是Buffer对象：' + Buffer.isBuffer(dataBuffer));
    fs.writeFile(path, dataBuffer, function (err) {//用fs写入文件
        if (err) {
            console.log(err);
        } else {
            console.log('写入成功！');
            console.log(user_id);
            PDF_User.model.findById(user_id)
            .exec(function(err,result){
                if(err){
                    throw new Error('err');

                }else{
                    console.log('------------result-----------');
                    console.log(result);
                    console.log('------------result-----------');
                    if(result==null){
                       console.log('result is null');
                    }else{
                        var img = {};
                        img.filename = user_id+'/'+filename_time + '.png';
                        img.originalname = filename_time + '.png';
                        img.path = 'images/ProductionImageInPdf/';
                        result.ProductionImageInPdf.push(img);
                        result.save(function(err){
                            if(err){
                                throw new Error("err in save"+err.message);
                                console.log(err);
                            }

                        });
                        console.log('剧照');
                        console.log(result.ProductionImageInPdf);
                        console.log('剧照');
                    }

                }

            });

        }
    })
    return findSync(dirname);
}



//动态创建文件夹
function mkdir(dirpath, dirname) {//第二个参数可以忽略
    //判断是否是第一次调用  
    if (typeof dirname === "undefined") {
        if (fs.existsSync(dirpath)) {//同步判断文件是否存在：true表示存在，false表示不存在
            return;
        } else {

            mkdir(dirpath, path.dirname(dirpath));
        }
    } else {
        //判断第二个参数是否正常，避免调用时传入错误参数  
        if (dirname !== path.dirname(dirpath)) {
            mkdir(dirpath);
            return;
        }
        if (fs.existsSync(dirname)) {
            fs.mkdirSync(dirpath)
        } else {
            mkdir(dirname, path.dirname(dirname));
            fs.mkdirSync(dirpath);
        }
    }
}


// 读取文件目录下的图片文件
    function findSync(startPath) {
        //let result = [];
        var result = [];
        function finder(path) {
            //let files = fs.readdirSync(path);
            var files = fs.readdirSync(path);
            files.forEach((val, index) => {
                // let fPath = join(path, val);
                // let stats = fs.statSync(fPath);
                var fPath = join(path, val);
                var stats = fs.statSync(fPath);
                if (stats.isDirectory()) finder(fPath);
                if (stats.isFile()) result.push(fPath);
            });

        }
        finder(startPath);
        return result;
    }
            
module.exports = getImage;