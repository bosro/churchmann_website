//  home one client slider
if (document.getElementsByClassName("h1-partner_slider")) {
  new Swiper(".h1-partner_slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    // centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: false,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 50,
      },
    },
  });
}

if (document.getElementsByClassName("h5-testimonials")) {
  new Swiper(".h5-testimonials", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".btn-next1",
      prevEl: ".btn-prev1",
    },
  });
}
if (document.getElementsByClassName("one-testimonials")) {
  new Swiper(".one-testimonials", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: ".swiper-pagination1",
      clickable: true,
    },
    navigation: {
      nextEl: ".btn-next1",
      prevEl: ".btn-prev1",
    },
  });
}
//
if (document.getElementsByClassName("testimonialsSwiper2")) {
  var swiper = new Swiper(".testimonialsSwiper2", {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 3,
    autoplay: {
      delay: 2000,
    },
    speed: 1000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".btn-next",
      prevEl: ".btn-prev",
    },
    breakpoints: {
      375: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
}
if (document.getElementsByClassName("testimonialsSwiper3")) {
  var swiper = new Swiper(".testimonialsSwiper3", {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 3,
    autoplay: {
      delay: 1500,
    },
    speed: 1000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".btn-next2",
      prevEl: ".btn-prev2",
    },
    breakpoints: {
      375: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,

        spaceBetween: 20,
      },
    },
  });
}
if (document.getElementsByClassName("testimonialsSwiper7")) {
  var swiper = new Swiper(".testimonialsSwiper7", {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 3,
    autoplay: {
      delay: 2000,
    },
    speed: 1000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".btn-next5",
      prevEl: ".btn-prev5",
    },
  
    breakpoints: {
		320: {
			slidesPerView: 1,
			
		},
		640: {
			slidesPerView: 2,
		},
	
		1200:{
			slidesPerView: 3,
		},
		1400:{
			slidesPerView: 3,
			
		},
	},
  });
}
if (document.getElementsByClassName("testimonialsSwiper10")) {
  var swiper = new Swiper(".testimonialsSwiper10", {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 3,
    autoplay: {
      delay: 2000,
    },
    speed: 1000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // navigation: {
    //   nextEl: ".btn-next",
    //   prevEl: ".btn-prev",
    // },
    breakpoints: {
      375: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  });
}
if (document.getElementsByClassName("testimonialsSwiper11")) {
  var swiper = new Swiper(".testimonialsSwiper11", {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 3,
    autoplay: {
      delay: 2000,
    },
    speed: 1000,
    pagination: {
      el: ".swiper-pagination2",
      clickable: true,
    },
    // navigation: {
    //   nextEl: ".btn-next",
    //   prevEl: ".btn-prev",
    // },
    breakpoints: {
      375: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  });
}
