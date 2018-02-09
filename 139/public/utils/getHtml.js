// 获得html的内容
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var getName = require("./getName");//姓名提取
var getBirth = require("./getBirth");//出生日期的提取
var getHeightWeight = require("./getHeightWeight");//身高\体重的提取
var getHometown = require("./getHometown");//籍贯的提取
var getGraduate = require("./getGraduate");//毕业院校的提取
var getTel = require("./getTel");//电话的提取
var getSkill = require("./getSkill");//技能的提取
var getProduction = require("./getProduction");//技能的提取
var getImage = require("./getImage");
var async = require("async");


var getHtml = function (x,user_id,callback) {
    http.get(x, function (res) {
        var html = '';
        res.setEncoding('utf-8');
        res.on('data', function (chunk) {
            html += chunk;
        });
        res.on('end', function () {

            var $ = cheerio.load(html);
            $("div").prepend("<p>/</p>");
            var content = $('#page-container').text();
            var arr = content.split("/");

            var nameArray = []; //第二种情况下姓名的存放
            var realname = [];   //通过两种情况获得的用户的真实姓名
            var bir;   //用户的出生年月日
            var height, weight;   //用户的身高\体重的提取
            var hometown, areacode;   //籍贯的名称和区域码
            var graduate;   //毕业院校
            var index = []; //标记符合条件的下标
            var Tel; //电话
            var skillArray = [];  //提取技能特长
            var productionList = [];//提取项目信息的数组
            var finalProject;//提取项目信息的列表
            var productionName, actorName;  //项目名、职位名称
            var imgList = $("#page-container img");
            // console.log('=========imgList==========');
            // console.log(imgList);
            // console.log('=========imgList==========');
            var dirname = process.cwd() + "/images/ProductionImageInPdf/" + user_id;//图片保存路径
           async.waterfall([
               function(callback){
                  var resumeInfo = {
                        realname: getName(arr, nameArray, realname),
                        height: getHeightWeight(arr, height, weight).height,
                        weight: getHeightWeight(arr, height, weight).weight,
                        birth: getBirth(arr, bir),
                        hometown: getHometown(arr, hometown, areacode),
                        graduate: getGraduate(arr, graduate, index),
                        Tel: getTel(arr,Tel),
                        skill:getSkill(arr, skillArray),
                        production:getProduction(arr, productionName, actorName, productionList)
                  }
                  callback(null,resumeInfo);
               },
               function(arg,callback){
                  async.eachSeries(imgList,function(item,next){
                    var data = $(item).attr('src');//获取图片链接
                    getImage(data, dirname, new Date().getTime(),user_id);
                    next();
                  },function(err){
                     if(err){
                       throw new Error(err);
                     }else{
                        callback(null,arg);
                     }
                  });
                  // for (var i = 0; i < imgList.length; i++) {
                  //       var data = $(imgList[i]).attr('src');//获取图片链接
                  //       getImage(data, dirname, new Date().getTime(),user_id);
                  //   }
               }
               // ,function(callback){
               //    var resumeInfo = {
               //          realname: getName(arr, nameArray, realname),
               //          height: getHeightWeight(arr, height, weight).height,
               //          weight: getHeightWeight(arr, height, weight).weight,
               //          birth: getBirth(arr, bir),
               //          hometown: getHometown(arr, hometown, areacode),
               //          graduate: getGraduate(arr, graduate, index),
               //          Tel: getTel(arr,Tel),
               //          skill:getSkill(arr, skillArray),
               //          production:getProduction(arr, productionName, actorName, productionList)
               //    }
               //    callback(null,resumeInfo);

               // }
            ],function(err,arg){
               if(err){
                  throw new Error(err);
               }else{
                  //console.log(resumeInfo);
                  callback(null,arg);
               }
            });
        });

    }).on('error', function (err) {
        console.log(err);
    });
}

module.exports = getHtml;