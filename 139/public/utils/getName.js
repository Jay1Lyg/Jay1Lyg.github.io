// 姓名的提取
var list = require("./list");   //获得常量
var label; //用于标记名字与其他字段对比时出现的位置
var surname = list.nameList;

var getName = function (n, nameArray, realname) {
    for (var i in n) {
        // 第一种情况
        if ((n[i] != '') && (n[i].indexOf('姓') != -1) && (n[i].indexOf('名') != -1)) {
            var name = (n[i].replace(/\s*/g, '')).replace(/[\：|\:]/g, "-");  //将中文冒号与英文冒号统一替换为-
            var nameContent = name.replace(/[^-]*-([^-]*)/, "$1");  //提取'-'后面的内容
            realname.push(nameContent);
            // console.log('第一种' + nameContent);
        }


        // 第二种情况
        if ((n[i] != '') && (n[i].indexOf('姓') == -1) && (n[i].indexOf('名') == -1) && (n[i].indexOf('饰') == -1)) {
            if (((n[i].toLowerCase()).indexOf('cm') != -1) || (n[i].indexOf('籍') != -1)) {
                label = i;
            }
        }
    }

    for (var l in n) {
        if (label != undefined) {
            for (var s in surname) {
                if ((n[l] != '') && (n[l].indexOf(surname[s]) != -1) && (n[l].indexOf('姓') == -1) && (n[l].indexOf('名') == -1) && (n[l].indexOf('身') == -1) && (n[l].indexOf('籍') == -1) && (n[l].indexOf('座') == -1)) {
                    if (parseInt(label) > parseInt(l)) {
                        nameArray.push(n[l]);
                    }
                }
            }
        }
    }
    realname.push(nameArray[0]);

    // console.log(realname[0]);

    return realname[0];
}
module.exports = getName;
