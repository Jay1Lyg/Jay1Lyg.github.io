'use strict';
var 
    $outCov = $(".outImgCover"),  //最外层DIV
    $img=$('[data-img=cut]'),
    $cov = $('.cover'),
    $op1=$('.op1'),$op2=$('.op2'),$op3=$('.op3'),$op4=$('.op4'),$opt=$('.opt'),  //透明条
    ratio=1.875,// 1 宽/高
    coverWidth,coverHeight,myDelay,
    timeStart,timeEnd,Δx,Δy,vX,vY,hash=[],hashT=[],
    rate=5;//图片放大倍率
//varEnd

 window.onload=function()
{
    resert(ratio);  //初始化尺寸
    coverWidth = $cov.width();
    coverHeight = $cov.height();     //高;   
    bindtouch() //绑定touch
};

//初始化
function resert(ratio)
{
    var 
        ratio=ratio||1.875, //宽高比
        WinHei = $(window).height(),
        outWid = $outCov.width(),
        inrWid = 0.8*outWid,
        inrHei = inrWid/ratio,
        topHei = (WinHei-inrHei)/2,
        imgWid = $img.width(),
        imgHei = $img.height();
        //设置最外层div的高
        $outCov.height(WinHei);          
    //varEnd                          
    /*初始化透明条*/
    var opk = function()
    {
        $op1.css({                                          //上左
            'width':outWid*0.1,
            'height':WinHei-topHei
        })

        $op2.css({                                          //上右
            'width':outWid*0.9,
            'height':topHei
        })

        $op3.css({                                           //下右
            "width":outWid*0.1,
            "height":WinHei-topHei
        })

        $op4.css({                                          //下左
            'width':outWid*0.9,
            'height':topHei
        })
    }

    /*初始化内层边框*/
    var resCov = function()
    {
        $cov.width(inrWid); 
        $cov.height(inrHei);
    }

    var resImg = function()
    {
        $img.css({
            "top":(-(imgHei-inrHei)/2),        
            "left":(-(imgWid-inrWid)/2),
        });
    }
    resCov();
    opk();
    resImg();
  
}

// function Opt1(){
//     $opt.css('opacity',0);
// }

// function opt6(){
//     $opt.css('opacity',.6);
// }

//touch
function bindtouch()
{   
  var img = $img[0];
  var $document = $(".outImgCover");
  $document.on('touchstart',function(e)
  {
    // Opt1();
    
    e.stopPropagation()
    var 
       imgX=$img.position().left,
       imgY=$img.position().top,
       imgWid=$img.width(),           //宽
       imgHei = $img.height(),
       fingers=e.originalEvent.touches.length,
       touch1 = e.originalEvent.touches[0], 
       touch2 = e.originalEvent.touches[1],
       staX1=touch1.clientX, staY1=touch1.clientY ,
       centX,centY,lenSta;
    //varEnd

   
             
      //求和的平方
    var POW2 = function(x1,x2){
        var x=parseFloat(x1);
        var y=parseFloat(x2)
        return (Math.pow((x-y),2));
    }

       if(fingers==2)
      {
            var staX2=touch2.clientX,
                staY2=touch2.clientY;
              
            centX=(staX2-staX1)/2+staX1;
            centY=(staY2-staY1)/2+staY1;
            lenSta = Math.pow((POW2(staX1,staX2)+POW2(staY1,staY2)),1/2);
            //   console.log(lenSta);
      }
      $document.on('touchmove',function(e)
      {
        e.stopPropagation()
          var
              touch1 = e.originalEvent.touches[0],
              touch2 = e.originalEvent.touches[1],  // 第二根手指touch事件
              MoveFigs=e.originalEvent.touches.length,
              endX1 = touch1.clientX,
              endY1 = touch1.clientY,
              endImgX=imgX+(endX1-staX1),
              endImgY=imgY+(endY1-staY1);
          //varEnd    
          // console.log(touch1.clientX);
            
            // console.log('dx1 : '+endX1+', dy2 : '+endY1)

            if(MoveFigs==1)
            {
                $img.css('left',endImgX);
                $img.css("top",endImgY);
            }else if(MoveFigs==2)
            {
                // if(!lenSta)
                // {
                //     var lenSta = Math.pow((POW2(endX1,endX2)+POW2(endY1,endY2)),1/2);
                // }
                // if(!fingers==MoveFigs){
                //     (lenSta)&&(lenSta=Math.pow((POW2(endX1,endX2)+POW2(endY1,endY2)),1/2))
                // }
                // console.log(lenSta)
                var
                    endX2=touch2.clientX,
                    endY2=touch2.clientY,
                    lenEnd = Math.pow((POW2(endX1,endX2)+POW2(endY1,endY2)),1/2),
                    difRate = lenEnd/lenSta,
                    lastWid = imgWid*difRate,

                    difVal=(lenEnd-lenSta),
                    // natwidth = parseFloat(img.naturalWidth),        //图片自然宽度
                    // natHeight = parseFloat(img.naturalHeight),          //图片自然高度
                    // widHeiK=natwidth/natHeight,    

                    // subHeit=(difVal+imgWid)/widHeiK-imgWid/widHeiK,
                    dx=(lastWid>=coverWidth*rate)?0:$cov.offset().left,
                    dy=(lastWid>=coverWidth*rate)?0:$cov.offset().top,
                    // heightEnd =  imgHei + subHeit,
                    isS = (lastWid > coverWidth*0.5)
                    // &&(heightEnd > coverHeight*0.8)
                    // &&(heightEnd < coverHeight * 5.5),                
                        &&(lastWid < coverWidth * rate),
                    sizeRate = lastWid/imgWid,
                    
                    centXEnd=(endX2-endX1)/2+endX1,
                    centYEnd=(endY2-endY1)/2+endY1;
                    
                    endImgX = centXEnd-(centX-imgX)*sizeRate-dx*(1-sizeRate);
                    endImgY = centYEnd-(centY-imgY)*sizeRate-dy*(1-sizeRate);
                //varEnd  
                //console.log(lenSta);                
                
                if(isS&&difRate){
                    $img.css({
                        'width':lastWid,
                        "left":endImgX,
                        "top":endImgY
                    });
                }
            }

            Δx=endImgX-imgX;
            Δy=endImgY-imgY;
            timeStart = (new Date())/1000;
            hash.unshift(Δx);
            hash.unshift(Δy);
            hashT.unshift(timeStart);
            hash.length=4;
            hashT.length=2;
            
      });
      $document.on('touchend',function()
      {
        timeEnd = new Date();
        
        var Δt2 = Math.pow((timeEnd - timeStart)/1000,2);
        // console.log(hash);
        // console.log(hashT);
        
        vX = (hash[2]-hash[0])/((hashT[1]-hashT[0]))
        vY = (hash[3]-hash[1])/((hashT[1]-hashT[0]))
        function moveA(){
           var timer = setInterval(function(){
                var imgX =  $img.position().left,imgY = $img.position().top;
                vX-=10;vY-=10;
                imgX+=vX/10;
                imgY+=vY/10;
                $img.css({'left':imgX,'top':imgY});
                console.log(imgX)
                if(vX<20||vY<20){
                    clearInterval(timer)
                }
            },100)
        }
        // moveA();
        
        e.stopPropagation();
        $document.unbind("touchstart");
        $document.unbind('touchmove');
        $document.unbind('touchend');
        // myDelay=setTimeout(function ()
        //     {
        //         opt6();
        //     },1000);
        // opt6();
      
        // var timer = setInterval(function(){
        //     ax=ax*0.8;
        //     if(ax<100);
        //     clearInterval(timer);
        //     // console.log(ax);
        // },100)
        onCheck();  
        bindtouch();
      });   
      return false;
  })
}

//检查
function onCheck() 
{      
  // 图片边界条件
    var 
        outWid = $outCov.width(),
        minWid = coverWidth;
       
    //varEnd
    var    
        //目前图片状态
        imgX =  $img.position().left,//左
        imgY = $img.position().top,//上
        imgHei = $img.height(), //每次检查重新赋值 
        imgWid = $img.width(),
        pxRate=imgWid/imgHei,

        maxWid = rate*minWid,//最宽
        minTop =  coverHeight-imgHei,
        minLeft = coverWidth-imgWid;//用left来计算最右
    //varEnd
    pxRate>ratio&&
        (minWid = coverWidth*pxRate);

    pxRate>ratio&&
        (maxWid = coverWidth*rate*pxRate);
        
    // console.log(imgHei)
    // console.log(maxWid)

    function checkSize(){
        //检查放大情况
        if(imgWid>maxWid)
        {
            $img.width(maxWid)
        }else if(imgWid<minWid)
        {
            $img.width(minWid);
        }

    }

    function checkCoor(){
        //检查平移情况
        if(imgX>0){
            $img.css('left',0);
        }else if(imgX<minLeft){
            $img.css('left',minLeft);
        }

        if(imgY>0){
            $img.css('top',0);
        }else if(imgY<minTop){
            // console.log(-minTop)
            $img.css('top',minTop)
        }
    }

    checkSize();
    checkCoor();
}
