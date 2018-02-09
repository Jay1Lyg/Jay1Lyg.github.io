function replaceStr(str){ // 正则法
 str = str.toLowerCase();
 var reg = /\b(\w)|\s(\w)/g; //  \b判断边界\s判断空格
 return str.replace(reg,function(m){ 
  return m.toUpperCase()
 });
}
 
function replaceStr1(str){
 str = str.toLowerCase();
 var strTemp = ""; //新字符串
 for(var i=0;i<str.length;i++){
  if(i == 0){
   strTemp += str[i].toUpperCase(); //第一个
   continue;
  }
  if(str[i] == " " && i< str.length-1){ //空格后
   strTemp += " ";
   strTemp += str[i+1].toUpperCase();
   i++;
   continue;
  }
  strTemp += str[i];
 }
  return strTemp;
 }