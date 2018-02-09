'use strict';

window.onload=function()
{
  resert();  //初始化尺寸
  bindtouch() //绑定touch
};

//初始化整体高   遮罩层宽高 
function resert(m)
{
  var 
    m=m||1.875, //宽高比
    $outCov = $(".outImgCover"),  //最外层DIV
    outWid = $outCov.width(),
    outHei = $(window).height(),
    wid = 0.8*outWid,
    topOpW = (outHei-wid/m)/2; 
    
  $outCov.height(outHei);          
                                 
  
  /*初始化透明条*/
  var opk = function()
  {
    var $op1=$('.op1'),$op2=$('.op2'),$op3=$('.op3'),$op4=$('.op4');
    $op1.css({                                          //上左
        'width':outWid*0.1,
        'height':outHei-topOpW
    })

    $op2.css({                                          //上右
        'width':outWid*0.9,
        'height':topOpW
    })

    $op3.css({                                           //下右
        "width":outWid*0.1,
        "height":outHei-topOpW
    })

    $op4.css({                                          //下左
        'width':outWid*0.9,
        'height':topOpW
    })
  }

  /*初始化内层边框*/
  var cov = function()
  {
    var $cov=$('.cover') 
    $cov.width(wid); 
    $cov.height(wid/m);
  }
  cov();
  opk();

}

//单指移动 双指放大
function bindtouch()
{
  var $img=$('[data-img=cut]');
  var img = $img[0];
  var $outCover = $(document);
  $outCover.on('touchstart',function(e)
  {
      var imgX=$img.position().left,
       imgY=$img.position().top,
       imgWid=$img.width(),
       imgHeight = $img.height(),
       fingers=e.originalEvent.targetTouches.length,
       touch1 = e.originalEvent.targetTouches[0], 
       touch2 = e.originalEvent.targetTouches[1];
       var staX1=touch1.clientX, staY1=touch1.clientY;
       //求和的平方
      var POW2 = function(x1,x2){
          var x=parseFloat(x1);
          var y=parseFloat(x2)
          return (Math.pow((x-y),2));
      }

       if(fingers==2)
      {
          var staX2=touch2.clientX,
              staY2=touch2.clientY,
              lenStart = Math.pow((POW2(staX1,staX2),POW2(staY1,staY2)),1/2);
      }
      $outCover.on('touchmove',function(e)
      {
          var touch1 = e.originalEvent.targetTouches[0];
          var touch2 = e.originalEvent.targetTouches[1];  // 第二根手指touch事件
          var fingers=e.originalEvent.targetTouches.length;
          var endX1,endY1;
          // console.log(touch1.clientX);
            endX1 = touch1.clientX;
            endY1 = touch1.clientY;
            var endImgX=imgX+(endX1-staX1),
                endImgY=imgY+(endY1-staY1);
            // console.log('dx1 : '+endX1+', dy2 : '+endY1)
            $img.css('left',endImgX); 
            $img.css("top",endImgY); 
              
           if(fingers==2){

            var key = 2,
            endX2=touch2.clientX,
            endY2=touch2.clientY;

            // console.log('x1:'+x2_1+'y1:'+y2_1+'x2'+x2_2+'y2'+y2_2);
            var lenEnd = Math.pow((POW2(endX1,endX2),POW2(endY1,endY2)),1/2);
            var k=(lenEnd-lenStart);
            var subWid=imgWid+(k)-imgWid;
            
            var natwidth = parseFloat(img.naturalWidth),        //图片自然宽度
            natHeight = parseFloat(img.naturalHeight),          //图片自然高度
            widHeiK=natwidth/natHeight,                         
            subHeit=(subWid+imgWid)/widHeiK-imgWid/widHeiK,
            $cov = $('.cover'),
            coverWidth = $cov.width(),
            coverHeight = $cov.height(),

            widthEnd = imgWid + subWid*key,
            heightEnd =  imgHeight + subHeit*key;
            
            var isS = (widthEnd > coverWidth-100) &&
            (heightEnd > coverHeight-100)&&
            (widthEnd < coverWidth * 3.8)&&
            (heightEnd < coverHeight * 3.8);

            if(isS){
                console.log(widthEnd);
                
              $img.css({'width':widthEnd
              });
            }
    
          }
      });
      $outCover.on('touchend',function()
      {
        $outCover.unbind('touchstart');
          // $(".outImgCover").unbind("touchstart")
          $outCover.unbind('touchmove');  
          var imgX,imgY
          bindtouch()
      });
      return false;
  })

  //检查边界条件
   onCheck($('[data-img=cut]'))
}

//检查边界条件
function onCheck($img) 
{      
  // 图片边界条件
  var maxN=3,//图片放大倍率
      $img = $('[data-img=cut]'),
      outWid = parseFloat($(".outImgCover").width()),
      minWid = outWid*0.8,
      minHeight = $('.cover').height();
      

  // 目前图片状态
  var nowLeft =  $img.position().left,        //左
      nowTop = $img.position().top,           //上

      nowWid=$img.width(),           //宽
      nowHeight = $img.height(),     //高

      nowN = nowWid*(nowHeight/nowWid),    
      maxWid = maxN*minWid,                //最宽

      minLeft = minWid-nowWid,             //用left来计算最右
      minTop = minHeight-nowN;             //用top计算最下


  //检查放大情况
  if(nowWid>maxWid)
  {
      $img.width(maxWid)
  }else if(nowWid<minWid)
  {
      $img.width(minWid);
  }

  if(nowHeight<minHeight)
  {
      $img.width(minHeight)
  }else if(nowHeight<minHeight)
  {
      $img.height(minHeight);
  }
  
  //检查平移情况
  if(nowLeft>0){
      $img.css('left',0);
  }else if(nowLeft<minLeft){
      $img.css('left',minLeft);
  }

  if(nowTop>0){
      $img.css('top',0);
  }else if(nowTop<minTop){
      $img.css('top',minTop)
  }
}
