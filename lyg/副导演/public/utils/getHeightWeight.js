//    处理身高、体重
var getHeightWeight = function (hw, height, weight) {
    for (var i in hw) {
        if (hw[i] != '') {
            var h = hw[i].toLowerCase();   //将内容中的字母均转为小写，（kg,cm,KG,CM）
            // 第一种情况:只含有cm，不含kg
            if ((h.indexOf('cm') != -1) && (h.indexOf('围') == -1) && (h.indexOf('kg') == -1)) {
                var newHeight = JSON.stringify(parseInt(h.match(/[0-9]+/)[0]))
                if (newHeight >= 100 && newHeight <= 230) {
                    // console.log('输出身高' + newHeight);
                    height = newHeight;
                }
            }

            // 第二种情况:只含有kg，不含cm
            if ((h.indexOf('kg') != -1) && (h.indexOf('cm') == -1)) {
                var newWeight = JSON.stringify(parseInt(h.match(/[0-9]+/)[0]))
                if (newWeight >= 40 && newWeight <= 100) {     //有错误数据
                    // console.log('输出体重' + newWeight);
                    weight = newWeight;
                }
            }

            // 第三种情况:既含有kg,又含有cm
            var newList = [];
            var hall = [];
            if ((h.indexOf('kg') != -1) && (h.indexOf('cm') != -1)) {
                var list = h.replace(/[\：|\:|\u4e00-\u9fa5|\a-zA-Z|\,|，| ]/g, '-').split("-");
                for (var i in list) {
                    if (list[i] != '') {
                        hall.push(list[i]);
                        if (hall.length == 2) {

                        }
                    }

                }

                height = hall[0];
                // console.log('身高' + height);

                weight = hall[1];
                // console.log('体重' + weight);

            }
        }

    }
    // console.log('h' + height);
    // console.log('w' + weight);
    var list = {
        height:height,
        weight:weight
    }
    return list;
}
module.exports = getHeightWeight;