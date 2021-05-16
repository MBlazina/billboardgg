let page = $('.wrapper');
let slider = $('.slick');
let pageEnd = false;

slider.slick({
    vertical: true,
    verticalSwiping: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    infinite: false,
    slide: 'section',
    arrows: true,
    prevArrow: $('.slick-prev'),
    nextArrow: $('.slick-next'),
    dots: true,
    appendDots: $('.slick-vertical-dots'),
});

slider.on('afterChange', function (event, slick, currentSlide, nextSlide) {
    /* console.log(currentSlide); */
    const header = document.querySelector('header');
    if (currentSlide == slick.slideCount - 1 && !pageEnd) {
        pageEnd = true;
    }
    if(currentSlide !== slick.slideCount - 1 && pageEnd){
        pageEnd = false;
        page.animate({ "top": "0px" }, "normal");
    }
    if(currentSlide == 1){
        header.classList.add('closed')
    }else if(currentSlide == 0){
        header.classList.remove('closed')
    }
});

page.on('wheel', function (e) {
    /* console.log("start", pageEnd); */
    e.preventDefault();
    if (e.originalEvent.deltaY < 0) {
        if (pageEnd) {
            page.clearQueue();
            page.animate({ "top": "0px" }, "normal");
            pageEnd = false;
            /* console.log("end", pageEnd); */
            return;
        }
        slider.slick('slickPrev');
    } else {
        if (pageEnd) {
            page.clearQueue();
            page.animate({ "top": "-" + $('footer').height() + "px" }, "normal");
            /* console.log("end", pageEnd); */
            return;
        }
        slider.slick('slickNext');
    }
    /* console.log("end", pageEnd); */
});