$(function() {
	$(".scene li").click(function() {
		var index = $(this).index();
		$(this).addClass('active').siblings().removeClass("active");

		$(".content li").eq(index).show().siblings().hide();
	})

	//	$(".products a").hover(function(){
	//		$(this).css("border","1px solid #476FE1");
	//	},function(){
	//		$(this).css("border","1px solid #fff");
	//	})
})