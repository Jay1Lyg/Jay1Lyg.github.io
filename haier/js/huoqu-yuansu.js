function $(str){
			var reg = /^(\s+)|(\s+)$/g;
			var str = str.replace(reg,"");
			if(str.substring(0,1)==="#"){
				return document.getElementById(str.substring(1));
			}else if(str.substring(0,1)==="."){
				if(document.getElementsByClassName){
					return document.getElementsByClassName(str.substring(1));
				}else{
					var arr = [];
					var all = document.getElementsByTagName("*");
					for(var i=0;i<all.length;i++){
						if(all[i].className === str.substring(1)){
							arr[arr.length] = all[i];
						}
					}
					return arr;
				}
			}else{
				return document.getElementsByTagName(str);
			}
		}