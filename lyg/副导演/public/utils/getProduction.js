// 项目信息的提取
var list = require("./list");   //获得常量
var production = list.productionType;
var project;
var getProduction = function (arr, productionName, actorName, productionList) {
    for (var i in arr) {
        if (arr[i] != '' && (arr[i].indexOf('《') != -1) && (arr[i].indexOf('》') != -1)) {
            productionName = arr[i].match(/《(.*)》/)[0];
            if (arr[i].indexOf('饰') != -1) {
                actorName = arr[i].substring(arr[i].indexOf('饰') + 1);
            }
            var productionName;
            productionName=productionName.replace("《","");
            productionName=productionName.replace("》","");
            project = {
                name: productionName,
                rolename: actorName
            }
            productionList.push(project);
        }
    }
    return dealArray(productionList);
}

function dealArray(finalProject) {
    if (finalProject != undefined) {
        for (var i = 0; i < finalProject.length; i++) {
            for (var j = i + 1; j < finalProject.length;) {
                if (finalProject[i].name == finalProject[j].name) {
                    finalProject.splice(j, 1);
                }
                else j++;
            }
        }
        return finalProject;
    } else {
        console.log('数组为空');
    }
}

module.exports = getProduction;
