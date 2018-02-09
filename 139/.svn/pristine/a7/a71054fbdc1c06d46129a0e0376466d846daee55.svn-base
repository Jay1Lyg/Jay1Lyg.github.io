// 技能特长的提取
var list = require("./list");   //获得常量
var skill = list.skill;

// 对数组中的元素去重
function unique(arr) {
    // 遍历arr，把元素分别放入tmp数组(不存在才放)
    var tmp = new Array();
    for (var i in arr) {
        //该元素在tmp内部不存在才允许追加
        if (tmp.indexOf(arr[i]) == -1) {
            tmp.push(arr[i]);
        }
    }
    // console.log('---' + tmp + '---');
    return tmp;
}

var getSkill = function (arr, skillArray) {
    for (var i in arr) {
        for (var s in skill) {
            if ((arr[i] != '') && (arr[i].indexOf(skill[s].name) != -1)) {
                // console.log('---' + arr[i] + '---');
                // console.log(skill[s].name);
                skillArray.push(skill[s].name);
            }
        }
    }
    skillArray.concat(skillArray);
    return unique(skillArray);
}
module.exports = getSkill;
