//BubbleSort
var keystone = require('keystone');
exports = module.exports = function (req, res) {
   var array = [4,1,7,0,2,9,6,3,8];//9
   for(var i =0;i<array.length-1;i++){
     for(var j=0;j<array.length-1-i;j++){
       if(array[j]>array[j+1]){
         var temp = array[j];
         array[j] = array[j+1];
         array[j+1] = temp;
       }
     }
   }
   console.log(array);
   res.send(array);
}