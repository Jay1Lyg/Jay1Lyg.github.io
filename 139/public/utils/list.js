// 姓氏
var nameList = ['李', '王', '张', '刘', '陈', '杨', '黄', '赵', '吴', '周', '徐', '孙', '马', '朱', '胡', '郭', '何', '高', '林', '罗', '郑', '梁', '谢', '宋', '唐',
    '许', '韩', '冯', '邓', '曹', '彭', '曾', '萧', '田', '董', '潘', '袁', '于', '杜', '叶', '程', '苏', '魏', '吕', '丁', '任', '沈', '姚', '卢', '姜', '崔', '钟',
    '谭', '陆', '汪', '范', '金', '石', '廖', '贾', '夏', '韦', '傅', '方', '白', '邹', '孟', '熊', '秦', '邱', '江', '尹', '薛', '阎', '段', '雷', '侯', '龙', '史',
    '陶', '黎', '贺', '顾', '毛', '郝', '龚', '邵', '万', '钱', '严', '覃', '河', '戴', '莫', '孔', '向', '汤', '季'];

// 技能特长
var skill = [{ name: "足球" }, { name: "篮球" }, { name: "乒乓球" }, { name: "网球" }, { name: "羽毛球" },
    { name: "跑步" }, { name: "竞走" }, { name: "登山" }, { name: "攀岩" }, { name: "滑雪" }, { name: "棒球" },
    { name: "高尔夫" }, { name: "台球" }, { name: "保龄球" }, { name: "健美" }, { name: "体操" },
    { name: "潜水" }, { name: "冲浪" }, { name: "拳击" }, { name: "摔跤" }, { name: "滑板" },
    { name: "滑冰" }, { name: "游泳" }, { name: "跳水" }, { name: "长跑" }, { name: "短跑" }, { name: "英语" },
    { name: "日语" }, { name: "法语" }, { name: "韩语" }, { name: "俄语" }, { name: "德语" },
    { name: "西班牙语" }, { name: "阿拉伯语" }, { name: "葡萄牙语" }, { name: "泰语" }, { name: "意大利语" },
    { name: "街舞" }, { name: "芭蕾" }, { name: "肚皮舞" }, { name: "爵士舞" }, { name: "印度舞" },
    { name: "民族舞" }, { name: "古典舞" }, { name: "机械舞" }, { name: "现代舞" }, { name: "桑巴舞" },
    { name: "唱歌" }, { name: "琵琶" }, { name: "古筝" }, { name: "二胡" }, { name: "钢琴" },
    { name: "架子鼓" }, { name: "吉他" }, { name: "提琴" }, { name: "萨克斯" }, { name: "手风琴" },
    { name: "笛" }, { name: "口琴" }, { name: "格斗" }, { name: "剑术" },
    { name: "跆拳道" }, { name: "武术" }, { name: "柔道" }, { name: "柔术" }, { name: "双截棍" },
    { name: "表演" }, { name: "杂技" }, { name: "摩托车" }, { name: "驾驶" }, { name: "帆船" }, { name: "小品" }, { name: "相声" },
    { name: "口技" }, { name: "主持" }, { name: "瑜伽" }, { name: "魔术" }, { name: "闽南语" }, { name: "马来语" }, { name: "美术" },
    { name: "配音" }, { name: "摄影" }, { name: "绘画" }, { name: "音乐剧" }, { name: "美声" }, { name: "书法" }, { name: "骑马" },
    { name: "射击" }, { name: "射箭" }
]

// 籍贯
var province = [{ "_id": "58d8dd818b74bc1ec8c00d6e", "name": "北京", "areacode": "110000", "fullname": "北京", "parencode": "110000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d86", "name": "天津", "areacode": "120000", "fullname": "天津", "parencode": "120000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d75", "name": "河北省", "areacode": "130000", "fullname": "河北省", "parencode": "130000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d82", "name": "山西省", "areacode": "140000", "fullname": "山西省", "parencode": "140000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d7e", "name": "内蒙古自治区", "areacode": "150000", "fullname": "内蒙古自治区", "parencode": "150000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d7d", "name": "辽宁省", "areacode": "210000", "fullname": "辽宁省", "parencode": "210000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d7a", "name": "吉林省", "areacode": "220000", "fullname": "吉林省", "parencode": "220000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d77", "name": "黑龙江省", "areacode": "230000", "fullname": "黑龙江省", "parencode": "230000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d84", "name": "上海", "areacode": "310000", "fullname": "上海", "parencode": "310000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d7b", "name": "江苏省", "areacode": "320000", "fullname": "江苏省", "parencode": "320000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d8a", "name": "浙江省", "areacode": "330000", "fullname": "浙江省", "parencode": "330000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d6d", "name": "安徽省", "areacode": "340000", "fullname": "安徽省", "parencode": "340000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d6f", "name": "福建省", "areacode": "350000", "fullname": "福建省", "parencode": "350000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d7c", "name": "江西省", "areacode": "360000", "fullname": "江西省", "parencode": "360000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d81", "name": "山东省", "areacode": "370000", "fullname": "山东省", "parencode": "370000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d76", "name": "河南省", "areacode": "410000", "fullname": "河南省", "parencode": "410000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d78", "name": "湖北省", "areacode": "420000", "fullname": "湖北省", "parencode": "420000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d79", "name": "湖南省", "areacode": "430000", "fullname": "湖南省", "parencode": "430000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d71", "name": "广东省", "areacode": "440000", "fullname": "广东省", "parencode": "440000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d72", "name": "广西壮族自治区", "areacode": "450000", "fullname": "广西壮族自治区", "parencode": "450000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d74", "name": "海南省", "areacode": "460000", "fullname": "海南省", "parencode": "460000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d8b", "name": "重庆", "areacode": "500000", "fullname": "重庆", "parencode": "500000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d85", "name": "四川省", "areacode": "510000", "fullname": "四川省", "parencode": "510000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d73", "name": "贵州省", "areacode": "520000", "fullname": "贵州省", "parencode": "520000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d89", "name": "云南省", "areacode": "530000", "fullname": "云南省", "parencode": "530000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d87", "name": "西藏自治区", "areacode": "540000", "fullname": "西藏自治区", "parencode": "540000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d83", "name": "陕西省", "areacode": "610000", "fullname": "陕西省", "parencode": "610000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d70", "name": "甘肃省", "areacode": "620000", "fullname": "甘肃省", "parencode": "620000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d80", "name": "青海省", "areacode": "630000", "fullname": "青海省", "parencode": "630000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d7f", "name": "宁夏回族自治区", "areacode": "640000", "fullname": "宁夏回族自治区", "parencode": "640000", "level": "100" }, { "_id": "58d8dd818b74bc1ec8c00d88", "name": "新疆维吾尔自治区", "areacode": "650000", "fullname": "新疆维吾尔自治区", "parencode": "650000", "level": "100" }];




module.exports = {
    nameList: nameList,
    skill: skill,
    province: province
};