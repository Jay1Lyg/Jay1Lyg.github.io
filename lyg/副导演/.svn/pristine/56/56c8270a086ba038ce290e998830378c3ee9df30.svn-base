$(function(){
    $('.container-tab').on('click', function () {
         $(this)
            .children('p')
            .addClass('tab-active')
            .parent()
            .siblings('div')
            .children('.tab-active')
            .removeClass('tab-active');
        var $index = $(this).index();
        $(".contain-page>div")
            .eq($index)
            .addClass("page-select")
            .siblings('.page-select')
            .removeClass("page-select");
     });
});