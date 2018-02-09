// function nav(mySwiper,topNav){
    var mySwiper = new Swiper('#topNav', {
        freeMode: true,
        freeModeMomentumRatio: 0.5,
        slidesPerView: 'auto',

    });

    swiperWidth = mySwiper.container[0].clientWidth;
    maxTranslate = mySwiper.maxTranslate();
    maxWidth = -maxTranslate + swiperWidth / 2

    $(".swiper-container").on('touchstart', function(e) {
        e.preventDefault()
    })

    mySwiper.on('tap', function(swiper, e) {

//	e.preventDefault()

        slide = swiper.slides[swiper.clickedIndex]
        slideLeft = slide.offsetLeft
        slideWidth = slide.clientWidth
        slideCenter = slideLeft + slideWidth / 2
        // 被点击slide的中心点

        mySwiper.setWrapperTransition(300)

        if (slideCenter < swiperWidth / 2) {

            mySwiper.setWrapperTranslate(0)

        } else if (slideCenter > maxWidth) {

            mySwiper.setWrapperTranslate(maxTranslate)

        } else {

            nowTlanslate = slideCenter - swiperWidth / 2

            mySwiper.setWrapperTranslate(-nowTlanslate)

        }
        // topNav.find(".active").removeClass('active')
        // topNav.find(".swiper-slide").removeClass('active').eq(swiper.clickedIndex).addClass('active')
        $("#topNav  .active").removeClass('active');
        $("#topNav .swiper-slide").eq(swiper.clickedIndex).addClass('active')
        console.log($("#topNav  .active").attr("id"))
        // console.log("ll")

    })

   // leixing--------------------------------------------=======================================
var mySwiper1 = new Swiper('#topNav1', {
    freeMode: true,
    freeModeMomentumRatio: 0.5,
    slidesPerView: 'auto',

});

swiperWidth = mySwiper1.container[0].clientWidth;
maxTranslate = mySwiper1.maxTranslate();
maxWidth = -maxTranslate + swiperWidth / 2



mySwiper1.on('tap', function(swiper, e) {

//	e.preventDefault()

    slide = swiper.slides[swiper.clickedIndex]
    slideLeft = slide.offsetLeft
    slideWidth = slide.clientWidth
    slideCenter = slideLeft + slideWidth / 2
    // 被点击slide的中心点

    mySwiper1.setWrapperTransition(300)

    if (slideCenter < swiperWidth / 2) {

        mySwiper1.setWrapperTranslate(0)

    } else if (slideCenter > maxWidth) {

        mySwiper1.setWrapperTranslate(maxTranslate)

    } else {

        nowTlanslate = slideCenter - swiperWidth / 2

        mySwiper1.setWrapperTranslate(-nowTlanslate)

    }
    // topNav.find(".active").removeClass('active')
    // topNav.find(".swiper-slide").removeClass('active').eq(swiper.clickedIndex).addClass('active')
    $("#topNav1  .active").removeClass('active')

    $("#topNav1 .swiper-slide").eq(swiper.clickedIndex).addClass('active')

});
// ------------------------------------------认证----------------------------------



