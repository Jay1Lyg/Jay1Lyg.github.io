/**
 * Created by Admin on 2017/8/28.
 */
// 点击切换
function TabView(btns,contents){
    var _this = this;
    this.btns = btns;
    this.contents = contents;
    this.len = this.btns.length;
    for(var i=0;i<this.len;i++){
        this.btns[i].index = i;
        this.btns[i].onclick = function(){
            console.log(this.index);
            _this.tab(this)
        };
    }
}
TabView.prototype.tab = function(obj){
    var _index = obj.index;

    for(var j=0;j<this.len;j++){
        this.btns[j].classList.remove('active');
        this.contents[j].classList.remove('active');
    }
    obj.classList.add('active');
    this.contents[_index].classList.add('active')
}

// 点击伸缩
function toggle(btn){
    btn.click(function () {
        $(this).next().toggle();
        console.log($(this).children("p:last-child").children("img:first-child").is(":hidden"));
        var dis=$(this).children("p:last-child").children("img:first-child").is(":hidden");
        if(dis==false){
            $(this).children("p:last-child").children("img:last-child").css("display","block");
            $(this).children("p:last-child").children("img:first-child").css("display","none");
        }else if(dis==true){
            $(this).children("p:last-child").children("img:last-child").css("display","none");
            $(this).children("p:last-child").children("img:first-child").css("display","block");
        }

    })
};
//var url="http://www.901vehicle.cn";
var img_center=function (img) {
        var _allwidth=  document.body.clientWidth;
        var _allheight= document.body.clientHeight;
        console.log(_allwidth);
        var _this=this;

        this.img=img;
        this.len=this.img.length;
        console.log(this.len);
        for(var i=0;i<len;i++){
            var multiple_width;
            this.width=this.img[i].width;
            console.log(this.width)
            this.img[i].style.width="100%";
            this.height=this.img[i].height;
            var cha_height=_allheight- this.height;
            console.log();
            console.log(this.height);
//            this.img[i].style.paddingTop=cha_height/2;
            // this.img[i].style.position="fixed";
            this.img[i].style.top=cha_height/2;
        }
    };