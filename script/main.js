let page = $(".wrapper");
const slider = $(".slick.page-slider");
let pageEnd = false;
const nav = document.querySelector("nav");

/* PAGE SLIDER INIT */
slider.slick({
  vertical: true,
  verticalSwiping: true,
  slidesToScroll: 1,
  slidesToShow: 1,
  infinite: false,
  slide: "section",
  arrows: true,
  prevArrow: $(".slick-prev"),
  nextArrow: $(".slick-next"),
  dots: true,
  appendDots: $(".slick-vertical-dots"),
});

slider.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
  //console.log('next: ' + nextSlide)
});

slider.on("afterChange", function (event, slick, currentSlide, nextSlide) {
  /* console.log(currentSlide); */
  event.stopPropagation();
  if (slick.$slides[currentSlide].classList.contains("nav-black")) {
    if (!nav.classList.contains("nav-black")) {
      nav.classList.add("nav-black");
    }
  } else {
    if (nav.classList.contains("nav-black")) {
      nav.classList.remove("nav-black");
    }
  }
  const header = document.querySelector("header");
  if (currentSlide == slick.slideCount - 1 && !pageEnd) {
    pageEnd = true;
  }
  if (currentSlide !== slick.slideCount - 1 && pageEnd) {
    pageEnd = false;
    page.animate({ top: "0px" }, "normal");
  }
  if (currentSlide > 0) {
    header.classList.add("closed");
  } else if (currentSlide == 0) {
    header.classList.remove("closed");
  }
});

page.on("wheel", function (e) {
  /* console.log("start", pageEnd); */
  e.preventDefault();
  if (e.originalEvent.deltaY < 0) {
    if (pageEnd) {
      page.clearQueue();
      page.animate({ top: "0px" }, "normal");
      pageEnd = false;
      /* console.log("end", pageEnd); */
      return;
    }
    slider.slick("slickPrev");
  } else {
    if (pageEnd) {
      page.clearQueue();
      page.animate({ top: "-" + $("footer").height() + "px" }, "normal");
      /* console.log("end", pageEnd); */
      return;
    }
    slider.slick("slickNext");
  }
  /* console.log("end", pageEnd); */
});

/* LOGO LISTENER GOTO FIRST SLIDE */
const logo = document.querySelectorAll(".logo");
for (let i = 0; i < logo.length; i++) {
  logo[i].addEventListener("click", function () {
    slider.slick("slickGoTo", 0);
  });
}

/* INFOGRAPHIC SLIDER INIT */

const infographic = $('.infographic-container');
const infoSlides = document.querySelectorAll('.infographic-container .infographic-slide').length;
console.log(infoSlides)
infographic.slick({
 /*  adaptiveHeight: true, */
  /* prevArrow: $('.infographic-prev'),
  nextArrow: $('.infographic-next'), */
  slidesToShow: infoSlides,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1
      }
    }
  ]
})
infographic.on('afterChange', (event) => { event.stopPropagation() });