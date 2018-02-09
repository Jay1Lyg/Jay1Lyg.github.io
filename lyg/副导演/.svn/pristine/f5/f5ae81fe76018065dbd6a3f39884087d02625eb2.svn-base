$(function(){
        $('.nav-tab').on('click', function () {
         $(this)
            .addClass('tab-active')
            .siblings('div')
            .removeClass('tab-active');
        var $index = $(this).index();
        $(".manage-main>div")
            .eq($index)
            .addClass("main-select")
            .siblings('.main-select')
            .removeClass("main-select");
     });
})