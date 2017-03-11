(function(d) {
				var btns = d.querySelectorAll('footer li'),
					len = btns.length,
					contents = d.querySelectorAll('.content'),
					wraps = d.querySelectorAll('.content>div');
//					console.log(wraps)
				for(var i = 0; i < len; i++) {
					btns[i].index = i;
					btns[i].onclick = function() {
						var _index = this.index;
						for(var j = 0; j < len; j++) {
							btns[j].classList.remove('active');
							//contents[j].style.zIndex = "-1";
							wraps[j].style.zIndex = "-1";
						}
						//contents[_index].style.zIndex = "1";
						wraps[_index].style.zIndex = "1";
						this.classList.add('active');
					}
				}
			})(document)