//    处理籍贯
var list = require("./list");   //获得常量
var province = list.province;
var getHometown = function (home, hometown, areacode) {
    for (var i in home) {
        if ((home[i] != '') && (home[i].indexOf('籍') != -1)) {
            var a = home[i].replace(/\s*/g, '');   //删除所有空格
            var b = a.replace(/[\：|\:]/g, "-");  //将中文冒号与英文冒号统一替换为-
            var c = b.replace(/[^-]*-([^-]*)/, "$1");  //提取'-'后面的内容
            for (var i in province) {
                if (c.substring(0, 2) != '') {
                    if ((province[i].name).indexOf(c.substring(0, 2)) != -1) {
                        hometown = province[i].name;
                        areacode = province[i].areacode;
                    }
                }
            }
        }
    }
    var Hometown = {
        hometown:hometown,
        areacode:areacode
    }
    return Hometown;
}
module.exports = getHometown;