/**
 * Created by Carry on 12/26/2017.
 */
$(".list").on("click",".jiji",function(e){
    var erjilist=$(e.target).children(".erjilist");
    if($(erjilist).css("display")=="none"){
        $(erjilist).show();
        $(e.target).children().children(".img").attr("src","imags/jian1.png");
        $(e.target).css("color","#4ea2ad");
        (()=>{
            var expansion = null; //是否存在展开的list
        var container = document.querySelectorAll('.erjilist li a');
        for(var i = 0; i < container.length; i++){
            var x, y, X, Y, swipeX, swipeY;
            container[i].addEventListener('touchstart', function(event) {
                x = event.changedTouches[0].pageX;
                y = event.changedTouches[0].pageY;
                swipeX = true;
                swipeY = true ;
                if(expansion){   //判断是否展开，如果展开则收起
                    expansion.className = "";
                }
            });
            container[i].addEventListener('touchmove', function(event){

                X = event.changedTouches[0].pageX;
                Y = event.changedTouches[0].pageY;
                // 左右滑动
                if(swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0){
                    // 阻止事件冒泡
                    event.stopPropagation();
                    if(X - x > 10){   //右滑
                        event.preventDefault();
                        this.className = "";    //右滑收起
                    }
                    if(x - X > 10){   //左滑
                        event.preventDefault();
                        this.className = "swipeleft";   //左滑展开
                        expansion = this;
                    }
                    swipeY = false;
                }
                // 上下滑动
                if(swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
                    swipeX = false;
                }
            });
        }
    })();
    }else{
        $(erjilist).hide();
        $(e.target).children().children(".img").attr("src","imags/jian2.png");
        $(e.target).css("color","#000");
    }
});