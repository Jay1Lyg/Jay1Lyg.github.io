var keystone = require('keystone');
var path = require('path');
module.exports=function(req,res){
  //console.log(path.basename('/home/dongjia/project/keystone_project/assistantdirector_project/package.json'));//获取文件名,即package.json
  //console.log(path.basename('/home/dongjia/project/keystone_project/assistantdirector_project/package.json','.json'));//获取文件名(不含后缀)，即package
  //console.log(process.env.PATH.split(path.delimiter));//在linux下以‘:’进行分割
  // console.log(path.dirname('/home/dongjia/project/keystone_project/assistantdirector_project/package.json'));//返回目录名，即/home/dongjia/project/keystone_project/assistantdirector_project
  // console.log(path.extname('/home/dongjia/project/keystone_project/assistantdirector_project/package.json'));//返回扩展名，即.json
  // console.log(path.join('/home','dongjia','project/keystone_project'));//拼接路径
  // console.log(path.join('/home','dongjia','project/keystone_project','..'));//拼接路径
  //console.log(path.normalize('/home/dongjia/project/keystone_project/assistantdirector_project'));//规范化给定的路径
  console.log(path.parse('/home/dongjia/project/keystone_project/assistantdirector_project'));//返回一个对象，对象的属性表示 path 的元素
  //path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径
  res.send('success');
}
