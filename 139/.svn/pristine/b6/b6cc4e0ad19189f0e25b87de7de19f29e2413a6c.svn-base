'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by Carry on 12/25/2017.
 */
var widthAll = 0,
    c2Width = 0,
    clikI = -1; //
var widbili = 0.04533333333333334; //百分比图标width百分比
var px = void 0;
var wuLeft = 0; //左侧偏差
//参数 各项参数百分比数组
var atr = [0.4, 0.3, 0.2, 0.1],
    colors = ['#91b7ff', '#b7c0fe', '#97e9e7', '#feccae'];

function change() {
    widthAll = $('html').css("width");
    px = parseInt(widthAll) / 750;
    var c2Width = parseFloat(widthAll) * 0.89866666666;

    $('.percs span').css('width', c2Width * widbili).css('backgroundColor');

    wuLeft = parseFloat(widthAll) * 0.05066666667000003;
    $('#c2').css('width', c2Width).css('left', wuLeft).css('height', c2Width * 0.14836795252225518).css('marginTop', c2Width * 0.2);

    $('.starss').css('left', -c2Width * 0.05);

    //确定五角星大小

    var $stars = $('.starss img');

    $stars.each(function (index, e) {
        $(e).css('width', c2Width * 0.1).css('height', c2Width * 0.09666666666).css('top', c2Width * 0.025850642931127592).css('left', Perc(atr)[index]);
    });
}
//计算百分比换宽度
function Perc(arr, key) {
    c2Width = parseFloat(widthAll) * 0.89866666666;
    var Arra = [],
        wid = void 0,
        widnow = 0;
    if ((typeof arr === 'undefined' ? 'undefined' : _typeof(arr)) != "object") {
        console.error('请传入一个数组');
        return [];
    }

    for (var i = 0; i < arr.length; i++) {
        wid = arr[i] * parseFloat(c2Width);

        if (!key) {
            widnow += wid;
        } else {
            widnow = wid;
        }

        Arra.push(widnow);
    }
    return Arra;
}

function renderSome() {
    var str = '<span>&nbsp;0%</span>';

    for (var i = 1; i <= 10; i++) {

        str += '<span>' + i + '0%</span>';
    }

    $('.percDe').html(str).css('width', widthAll).css('marginTop', 20 * px);
    $('.percDe span').addClass('perc').css('fontSize', 0.03 * parseFloat(widthAll));
    $('.color_block').css({ 'margin': 30 * px });
    $('.color_block i').css({ 'width': 22 * px, 'height': 22 * px }).each(function (i, e) {
        $(e).css('background', colors[i]);

        //                $(e).next().append(Math.ceil(atr[i].toFixed(2)*100)+'%');
    });
    $('.ps').css('fontSize', 26 * px).css('margin', 30 * px);
    $('.btns').css({ 'marginTop': 264 * px, 'fontSize': 28 * px, 'marginLeft': 80 * px, 'marginRight': 80 * px });
    $('.btn').css({ 'height': 80 * px, 'textAlign': 'center', 'borderRadius': 10 * px, 'width': 255 * px, 'lineHeight': 80 * px + 'px' });
    $('.btn2').css({ 'lineHeight': 40 * px + 'px' });
    $('.btn span').css('fontSize', 20 * px);
    $('.yan').css({ 'fontSize': 40 * px + 'px', 'marginTop': 80 * px });
}

(function () {
    change();
    shangse(atr, colors);
    renderSome();
})();

//屏幕改变大小的时候调整整个屏幕大小
window.onresize = function () {
    change();
    //换算单位 自适应手机屏幕
    widthAll = $('html').css("width");

    shangse(atr, colors);
    renderSome();
};

function shangse(atr, colors) {

    //得到 宽度数组
    var widths = Perc(atr, true);
    var lefts = Perc(atr);
    lefts.unshift(0);

    for (var i = 0; i < widths.length; i++) {
        $('.scan' + (i + 1)).css('backgroundColor', colors[i]).css('width', widths[i]).css('left', lefts[i]);
    }

    huanzi();
}

/***
 * 鼠标在移动的时候
 * ***/
/*
 $('.starss').on('mousemove',function(e){

 let leftX=e.clientX;

 let $el= $(e.target);
 let a = parseFloat($el.css('left'));

 let b = parseFloat($el.next().css('left'));
 let c = parseFloat($el.prev().css('left'));

 $el.addClass('zIndex').siblings().removeClass('zIndex');

 if(b){
 if(c){
 if(c<a&&a<b){
 $el.css('left',leftX-wuLeft);
 //console.log('1自己的left:'+a+'。 左边的left:'+c+'。 右边的left:'+b);
 }
 //                            a>=b||$el.next().addClass('zIndex').siblings().removeClass('zIndex');
 //                            a<=c||$el.prev().addClass('zIndex').siblings().removeClass('zIndex');
 if(a<b){
 $el.css('left',leftX-wuLeft);
 // console.log('2自己的left:'+a+'。 左边的left:'+c+'。 右边的left:'+b);
 }
 $el.css('left',leftX-wuLeft);

 }
 }else{
 $el.css('left',leftX-wuLeft);

 if(a>c){
 $el.css('left',leftX-wuLeft);
 //console.log('这是最后一个的元素')
 //console.log('4自己的left:'+a+'。 左边的left:'+c+'。 右边的left:'+b);
 }
 $el.css('left',leftX-wuLeft);

 }

 console.log(wuLeft);
 let cssLeft=$el.css('left');


 let index=parseInt($el.attr('data-index'));
 chan(index,atr)
 });
 */

(function () {
    function move(obj) {
        obj.addEventListener('touchmove', function (event) {
            // 如果这个元素的位置内只有一个手指的话
            if (event.targetTouches.length == 1) {
                event.preventDefault(); // 阻止浏览器默认事件，重要
                var touch = event.targetTouches[0];
                // 把元素放在手指所在的位置

                //这里写移动的逻辑
                var this_left = parseFloat(touch.clientX - wuLeft);
                //获取上一个和下一个的left 和 此前 比较
                var next = parseFloat($(obj).next().css('left'));
                var pre = parseFloat($(obj).prev().css('left'));
                //获取 下一个的下一个
                var next_next = parseFloat($(obj).next().next().css('left'));
                var pre_pre = parseFloat($(obj).prev().prev().css('left'));
                //获取上一个的上一个

                if (this_left >= 0 && this_left <= parseFloat(widthAll) - 2 * wuLeft) {

                    if (next < this_left) {
                        $(obj).next().css('left', this_left);
                    }
                    if (pre > this_left) {
                        $(obj).prev().css('left', this_left);
                    }
                    if (next_next < this_left) {
                        $(obj).next().next().css('left', this_left);
                        $(obj).next().css('zIndex', 1);
                    }
                    if (pre_pre > this_left) {
                        $(obj).prev().prev().css('left', this_left);
                    }
                    $(obj).css("left", this_left);
                }

                $(obj).addClass('zIndex').siblings().removeClass('zIndex');
                var index = parseInt($(obj).attr('data-index'));
                chan(2, atr);
                chan(0, atr);
                chan(1, atr);
            }

            clikI = parseInt($(obj).attr('data-index'));
        }, false);
    }
    var key = document.getElementById('star1');
    move(key);
    key = document.getElementById('star2');
    move(key);
    key = document.getElementById('star3');
    move(key);
})();

//已知第i个元素 改变atr中的百分比
/*****
 * 1.获取元素距左边的距离 mar_left
 * 2.元素为第i个
 * 3.根据mar_left 改变 atr 中 i 以及 i+1位置的百分比
 * 4.根据百分比重新 画图片
 * *****/
function chan(i, arr) {
    var name = "star" + (i + 1);
    var mar_left = $('.' + name).css('left');
    var k = parseFloat(arr[i]) + parseFloat(arr[i + 1]);
    var val = parseFloat(mar_left) / parseFloat(c2Width);

    //求和
    var result = 0;
    for (var m = 0; m < i; m++) {
        result += arr[m];
    }

    if (i == 0) {
        arr[0] = val;
        arr[1] = k - val;
    } else {
        arr[i] = val - result;
        arr[i + 1] = k - arr[i];
    }

    shangse(arr, colors);
}

function huanzi() {

    var sum = 0,
        percs = [];

    $('.pec').each(function (i, e) {
        percs[i] = Math.ceil(atr[i].toFixed(2) * 100);
        sum += percs[i];
    });

    percs[clikI] = percs[clikI] - (sum - 100);
    $('.pec').each(function (i, e) {
        $(e).html(percs[i] + '%');
    });
}