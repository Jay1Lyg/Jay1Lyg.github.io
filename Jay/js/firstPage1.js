//切换图片位置

var newCustomer = document.querySelector(".newCustomer");
var virtual = document.querySelector(".virtual");
var meeting = document.querySelector(".meeting");
var online = document.querySelector(".online");
var li0 = document.querySelector("#new").querySelectorAll("li")[0];
var li1 = document.querySelector("#new").querySelectorAll("li")[1];
var li2 = document.querySelector("#new").querySelectorAll("li")[2];
var li3 = document.querySelector("#new").querySelectorAll("li")[3];
var span0 = document.querySelectorAll(".new")[0].querySelector("span");
var span1 = document.querySelectorAll(".new")[1].querySelector("span");
var span2 = document.querySelectorAll(".new")[2].querySelector("span");
var span3 = document.querySelectorAll(".new")[3].querySelector("span");
li0.onmouseover = function () {
    newCustomer.style.backgroundPosition = "0 -825px";
    span0.style.color = "blue";
}
li0.onmouseout = function () {
    newCustomer.style.backgroundPosition = "0 -751px"
    span0.style.color = "#222";
}

li1.onmouseover = function () {
    span1.style.color = "blue";
    virtual.style.backgroundPosition = "0 -219px"
}
li1.onmouseout = function () {
    span1.style.color = "#222";
    virtual.style.backgroundPosition = "0 -142px"
}

li2.onmouseover = function () {
    span2.style.color = "blue";
    meeting.style.backgroundPosition = "0 -374px"
}
li2.onmouseout = function () {
    span2.style.color = "#222";
    meeting.style.backgroundPosition = "0 -298px"
}

li3.onmouseover = function () {
    span3.style.color = "blue";
    online.style.backgroundPosition = "0 -525px"
}
li3.onmouseout = function () {
    span3.style.color = "#222";
    online.style.backgroundPosition = "0 -449px"
}


//选项卡
window.onload = function () {
    var btns = document.querySelector(".sketch").querySelectorAll("li"),
        contents = document.querySelector(".leading").querySelectorAll(".content"),
        len = btns.length;
    for (var i = 0; i < len; i++) {
        btns[i].index = i;
        btns[i].onclick = function () {
            var _index = this.index;
            for (var j = 0; j < len; j++) {
                btns[j].classList.remove('active');
                contents[j].classList.remove('active');
            }
            this.classList.add('active');
            contents[_index].classList.add('active')
        }
    }
}

function change() {
    var btns = document.querySelector("#item").querySelectorAll("li"),
        contents = document.querySelector(".slide").querySelectorAll("li"),
        len = btns.length;
    for (var i = 0; i < len; i++) {
        btns[i].index = i;
        btns[i].onclick = function () {
            var _index = this.index;
            for (var j = 0; j < len; j++) {
                btns[j].classList.remove('active');
                contents[j].classList.remove('active');
            }
            this.classList.add('active');
            contents[_index].classList.add('active')
        }
    }
}
change();

//	轮播
function carousel() {
    var num = 0;
    var index = 0;
    var a = document.querySelector("#container").querySelectorAll("a");
    var content = document.querySelector("#container").querySelectorAll(".content");
    var parent = document.querySelector("#container");
    var left = document.querySelector("#left");
    var right = document.querySelector("#right");

    var timer = setInterval(autoMove, 1000);

    function autoMove() {
        index = num + 1;
        if (index == content.length) {
            index = 0;
        }
        move();
    }

    for (var i = 0; i < content.length; i++) {
        a[i].index = i;
        a[i].onmouseover = move;
    }

    function move() {
        // 把这里的this.index 替换为index
        a[num].className = "";
        a[index].className = "pointShow";
        content[num].className = "content";
        content[index].className = "show";
        num = index;
    }

    parent.onmouseover = function () {
        clearInterval(timer);
    }
    parent.onmouseout = function () {
        timer = setInterval(autoMove, 1000)
    }

    left.onclick = function () {
        index = num - 1;
        if (index < 0) {
            index = content.length - 1
        }
        move();
    }
    right.onclick = autoMove;
}
carousel();

