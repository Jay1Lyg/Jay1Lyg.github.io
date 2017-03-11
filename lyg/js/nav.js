function nav(a,b){
	
a.onmouseover=function(){
	b.style.left = a.offsetLeft + "px";
	slide("block")
}
a.onmouseout=function(){
	slide("none")
}
b.onmouseover=function(){
	slide("block")
}
b.onmouseout=function(){
	slide("none")
}
function slide(m){
	b.style.display = m;
			}
}

//选项卡
function TabView(btns,contents){
	var _this = this;
	this.btns = btns;
	this.contents = contents;
	this.len = this.btns.length;
	for(var i=0;i<this.len;i++){
		this.btns[i].index = i;
		this.btns[i].onmouseover = function(){
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