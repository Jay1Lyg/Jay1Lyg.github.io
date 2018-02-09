		function preLook(className){
			$(document).ready(function(){
                      var dom=document.createElement("div");
                      document.body.appendChild(dom);
                      $(dom).css({
                        "width":"100%",
                        "height":"auto",
						 "position": "absolute",
						 "left":0,
						 "top":0,
						 "z-index":210,
						 "-webkit-transform":"translate(0,0)",
						" transform":"translate(0,0)",
                        "background":"none",
                        "display":"none",
                      });
                      var appimg=document.createElement("img");
                      dom.appendChild(appimg);
                      $(appimg).css({"width":"100%","height":"100%"});
                      //注意：引用此js文件时注意将类名改过来
                      $(className).each(function(index,ele){
                          var src=$(ele).attr("src");
                          if(src!==""){
                            $(ele).click(function(){
                              if($(dom).context.style.display=="none"){
                              $(dom).css({"display":"block"});
                              $(".overlay2").css("display","block");
                              $(appimg).attr("src",src);
							  //如果图片高度小于屏幕高度，就垂直居中显示。
								if($(appimg)[0].height<window.innerHeight){
									console.log(111111);
									$(dom).css({
										 "left":"50%",
										 "top":"50%",
										 "-webkit-transform":"translate(-50%,-50%)",
										 " transform":"translate(-50%,-50%)",
									});
								}else{
									$(dom).css({
										 "left":0,
										 "top":0,
										 "-webkit-transform":"translate(0,0)",
										 " transform":"translate(0,0)",
									});
								}
                              //$(".overlay1").css("display","block");
                              $(dom).click(function(){
                                $(this).css("display","none");
                                $(".overlay2").css("display","none");
                              });
                              }else{
                                $(dom).css({"display":"none"});
                                $(".overlay2").css("display","none");
                              }
                            }); 
                          }else{
                            $(dom).css("display","none");
                            $(".overlay2").css("display","none");
                          }   
                      });
                    });
				}