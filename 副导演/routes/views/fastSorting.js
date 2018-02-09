var keystone = require('keystone');
exports = module.exports = function (req, res) {
   var array = [4,1,7,0,2,9,6,3,8];
   var left = 0;
   var right = array.length-1;
   var result = quickSort(array, left, right);
   console.log(result);
   res.send(result);
   function quickSort(array, left, right) {
    if (left < right) {//0<8
        let x = array[right], i = left - 1;
        for (let j = left; j <= right; j++) {
            if (array[j] <= x) {
	            i++;
	            const temp = array[i];
	            array[i] = array[j];
	            array[j] = temp;
            }
        }
        quickSort(array, left, i - 1);
        quickSort(array, i + 1, right);
    }
    return array;
   }
}