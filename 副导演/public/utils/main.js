var fs = require('fs');
var getHtml = require("./getHtml");  //获得html的内容
var url = "http://192.168.1.173/new/";
//初始url 

var fileDirectory = "E:\\testApp\\new";

if (fs.existsSync(fileDirectory)) {
    fs.readdir(fileDirectory, function (err, files) {
        for (var i = 0; i < files.length; i++) {
            getHtml(url + files[i]);
           
        }
    });
}
else {
    console.log(fileDirectory + "  Not Found!");
}

 

