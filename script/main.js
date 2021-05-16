const slider = $(".slick");

//document.addEventListener('scroll', throttle(detectScroll, 0));

//Throttle function
/* function throttle(func, timeFrame) {
    var lastTime = 0;
    return function () {
        var now = new Date();
        if (now - lastTime >= timeFrame) {
            func();
            lastTime = now;
        }
    };
} */

//Slider navigation on scroll
slider.on('afterChange', function (event, slick, currentSlide) {
    let body = document.body.classList;
    const header = document.querySelector('header');
    var sumSlides = slick.$slides.length - 1;
    if (sumSlides == currentSlide) {
        body.add('slide-last');
        body.remove('scroll')
    }
    if(currentSlide == 1 ){
        header.classList.add('closed')
    }else if (currentSlide == 0){
        header.classList.remove('closed')
    }

});

var scrollCount = null;
var scroll= null;
slider.on('wheel', (function (e) {
    let wrappSize = document.querySelector('.wrapper').getBoundingClientRect().height;
    console.log($('.slick').slick)
    if(wrappSize > 1900){
        console.log("double wrapper")
        
    }
    console.log(wrappSize)
    const body = document.body.classList;
    //console.log(window.pageYOffset)
    if (body.contains('scroll')) {
        e.preventDefault();

        clearTimeout(scroll);
    scroll = setTimeout(function(){scrollCount=0;}, 200);
    if(scrollCount) return 0;
    scrollCount=1;

        if (e.originalEvent.deltaY < 0) {
            $(this).slick('slickPrev');
        } else {
            $(this).slick('slickNext');
        }
    } else if (body.contains('slide-last') && body.contains('footer-closed')) {
        if (e.originalEvent.deltaY < 0) {
            $(this).slick('slickPrev');
            body.remove('footer-closed');
            body.remove('slide-last')
            body.add('scroll')
        } else {
            body.remove('footer-closed');
        }
    }
    let endScroll = (window.innerHeight + window.scrollY) >= document.body.scrollHeight;
    if (body.contains('slide-last') && endScroll) {
        if (e.originalEvent.deltaY < 0) {
            body.add('footer-closed')
        } else {
        }
    } else if (body.contains('slide-last') && !body.contains('scroll') && !endScroll) {
        if (e.originalEvent.deltaY < 0) {
            $(this).slick('slickPrev');
            body.remove('slide-last')
            body.add('scroll')
        }
    }
}));



