
var getGraduate = function (school, graduate, index) {
    for (var i in school) {
        if ((school[i] != '') && ((school[i].indexOf('学院') != -1) || (school[i].indexOf('大学') != -1))) {
            index.push(parseInt(i));
            var a = Math.min.apply(null, index);

        }
    }
    graduate = school[a];
    // console.log(graduate);
    return graduate;
}










module.exports = getGraduate;