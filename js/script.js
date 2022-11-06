$(document).ready(function () {
  $("#menu-bar").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });

  $(window).on("load scroll", function () {
    $("#menu-bar").removeClass("fa-times");
    $(".navbar").removeClass("nav-toggle");

    $("section").each(function () {
      let top = $(window).scrollTop();
      let height = $(this).height();
      let id = $(this).attr("id");
      let offset = $(this).offset().top - 200;

      if (top > offset && top < offset + height) {
        $(".navbar ul li a").removeClass("active");
        $(".navbar").find(`[href="#${id}"]`).addClass("active");
      }
    });
  });
});

$(window).on("scroll", function () {
  if ($(window).scrollTop()) {
    $("header").addClass("sticky");
  } else {
    $("header").removeClass("sticky");
  }
});

// parallax 01 scroll

$(function () {
  $("a[href*=#]:not([href=#])").click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html,body").animate(
          {
            scrollTop: target.offset().top,
          },
          700
        );
        return false;
      }
    }
  });
});

/*
  Back to top scroll button. The following code is from
  http://jsfiddle.net/gilbitron/Lt2wH/
*/
if ($("#back-to-top").length) {
  var scrollTrigger = 100, // px
    backToTop = function () {
      var scrollTop = $(window).scrollTop();
      if (scrollTop > scrollTrigger) {
        $("#back-to-top").addClass("show");
      } else {
        $("#back-to-top").removeClass("show");
      }
    };
  backToTop();
  $(window).on("scroll", function () {
    backToTop();
  });
  $("#back-to-top").on("click", function (e) {
    e.preventDefault();
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      700
    );
  });
}

// sec 02

$(".img-parallax").each(function () {
  var img = $(this);
  var imgParent = $(this).parent();
  function parallaxImg() {
    var speed = img.data("speed");
    var imgY = imgParent.offset().top;
    var winY = $(this).scrollTop();
    var winH = $(this).height();
    var parentH = imgParent.innerHeight();

    // The next pixel to show on screen
    var winBottom = winY + winH;

    // If block is shown on screen
    if (winBottom > imgY && winY < imgY + parentH) {
      // Number of pixels shown after block appear
      var imgBottom = (winBottom - imgY) * speed;
      // Max number of pixels until block disappear
      var imgTop = winH + parentH;
      // Porcentage between start showing until disappearing
      var imgPercent = (imgBottom / imgTop) * 100 + (50 - speed * 50);
    }
    img.css({
      top: imgPercent + "%",
      transform: "translate(-50%, -" + imgPercent + "%)",
    });
  }
  $(document).on({
    scroll: function () {
      parallaxImg();
    },
    ready: function () {
      parallaxImg();
    },
  });
});

// slide in animation

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

// Contact form

$(".js-input").keyup(function () {
  if ($(this).val()) {
    $(this).addClass("not-empty");
  } else {
    $(this).removeClass("not-empty");
  }
});

const tabs = document.querySelector(".tabs");
const btns = document.querySelectorAll(".bt");
const articles = document.querySelectorAll(".content");
tabs.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  if (id) {
    // remove selected from other buttons
    btns.forEach(function (btn) {
      btn.classList.remove("live");
    });
    e.target.classList.add("live");
    // hide other articles
    articles.forEach(function (article) {
      article.classList.remove("live");
    });
    const element = document.getElementById(id);
    element.classList.add("live");
  }
});

// Slider

const slideContainer = document.querySelector(".slide-container");
const slide = document.querySelector(".slides");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const interval = 3000;

let slides = document.querySelectorAll(".slide");
let index = 1;
let slideId;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].clientWidth;

slide.style.transform = `translateX(${-slideWidth * index}px)`;

console.log(slides);

const startSlide = () => {
  slideId = setInterval(() => {
    moveToNextSlide();
  }, interval);
};

const getSlides = () => document.querySelectorAll(".slide");

slide.addEventListener("transitionend", () => {
  slides = getSlides();
  if (slides[index].id === firstClone.id) {
    slide.style.transition = "none";
    index = 1;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  if (slides[index].id === lastClone.id) {
    slide.style.transition = "none";
    index = slides.length - 2;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

const moveToNextSlide = () => {
  slides = getSlides();
  if (index >= slides.length - 1) return;
  index++;
  slide.style.transition = ".7s ease-out";
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};

const moveToPreviousSlide = () => {
  if (index <= 0) return;
  index--;
  slide.style.transition = ".7s ease-out";
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};

slideContainer.addEventListener("mouseenter", () => {
  clearInterval(slideId);
});

slideContainer.addEventListener("mouseleave", startSlide);
nextBtn.addEventListener("click", moveToNextSlide);
prevBtn.addEventListener("click", moveToPreviousSlide);

startSlide();
