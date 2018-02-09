// 判断有无经纪人  提取手机号
var tel = /1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}/;
var getAgentTel = function (agent, agentTel) {
    for (var i in agent) {
        if ((agent[i] != '') && (agent[i].indexOf('经') != -1) && (agent[i].indexOf('纪') != -1)) {
            var nowTel = JSON.stringify(parseInt(agent[i].match(tel)));
            agentTel = nowTel;
            // console.log('经纪人电话' + agentTel);
            if (agentTel == 'null') {
                var t = parseInt(i) + 1;
                var nextTel = JSON.stringify(parseInt(agent[t].match(tel)));
                agentTel = nextTel;
                // console.log('下一个' + agentTel);
            }
        } else {
            // 可能是个人也可能是其他领导者的联系方式
            if (nextTel == 'null' && (JSON.stringify(parseInt(agent[i].match(tel))) != 'null')) {
                agentTel = JSON.stringify(parseInt(agent[i].match(tel)));
                // console.log('其他' + agentTel);
            }
        }
    }
    return agentTel;
}










module.exports = getAgentTel;