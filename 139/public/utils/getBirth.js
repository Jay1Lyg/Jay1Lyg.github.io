//    处理出生日期
var r = /[\d]{4}[.\ ][\d]{1,2}[.\ ][\d]{1,2}/;
var s = /[\d]{4}[年\ ][\d]{1,2}[月\ ][\d]{1,2}/;
var getBirth = function (birth, bir) {
    for (var i in birth) {
        if ((birth[i] != '') && (birth[i].match(r) != null || birth[i].match(s) != null)) {
            var a = JSON.stringify(birth[i].match(r));
            var b = JSON.stringify(birth[i].replace(/\s*/g, '').match(s));   //将内容中的空格去掉之后再进行提取
            if (a == 'null') {
                bir = b.replace(/[\u4e00-\u9fa5]+/g, escape("-"));
            }
            if (b == 'null') {
                bir = a.replace(/\./g, "-");
            }
            // console.log('a' + a);
            // console.log('b' + b);
            
        }
    }
    return bir;
}
module.exports = getBirth;