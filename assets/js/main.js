//  AOS js
$(window).on("scroll", function () {
  AOS.init();
});

// sticky header color

const header = document.querySelector("header");

if (header) {
  window.addEventListener("scroll", () => {
    //     let headerTag = document.getElementsByTagName("header");
    // console.log(headerTag);
    console.log(header.id);

    let headerTwo = document.getElementById("HomeTwo-heder");
    if (
      (window.scrollY > 10 && header.id === "sticky-header") ||
      header.className === "sticky-header"
    ) {
      header.classList.add("bg-blue-dark_medical");
    } else if (window.scrollY > 10 && header.id === "HomeTwo-heder") {
      return header.classList.add("bg-white")((header.style.top = "-58px"));
    } else if (header.id === "HomeTwo-heder") {
      header.classList.remove("bg-white");
      header.style.top = "0px";
    } else {
      header.classList.remove("bg-blue-dark_medical");
     
    }
  });
}
let dropdownMenulan = document.getElementsByClassName("dropmenuLan");
if (dropdownMenulan) {
  let menuBTn = document.getElementById("menu-button");
  if (menuBTn) {
    menuBTn.addEventListener("click", function () {
      document.querySelector('[role="menu"]').classList.toggle("hidden");
    });
  }
  document.querySelectorAll('[role="menuitem"]').forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      var selectedLanguage = event.target.getAttribute("data-lang");
      document.getElementById("selected-language").textContent =
        selectedLanguage;
      document.querySelector('[role="menu"]').classList.add("hidden");
    });
  });
}
// slide btn
const slideBtns = document.querySelectorAll(".slide-btn");
if (slideBtns) {
  slideBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.target.classList.toggle("slide-btn-active");
    });
  });
}

// faq

const faqsWrapper = document.querySelectorAll(".faq-wrapper");
if (faqsWrapper) {
  faqsWrapper.forEach((element) => {
    const faqs = element.querySelectorAll(".faq-toggler");
    window.addEventListener("load", (event) => {
      faqs.forEach((item, index) => {
        for (let index = 0; index < item.children.length; index++) {
          item.children[index].classList.add("pointer-events-none");
        }
        if (index !== 0) {
          item.classList.remove("active-faq");
          item.style.height = item.children[0].clientHeight + 1 + "px";
        } else {
          item.classList.add("active-faq");
        }
      });
    });
  });

  faqsWrapper.forEach((element) => {
    const faqs = element.querySelectorAll(".faq-toggler");
    faqs.forEach((item) => {
      item.addEventListener("click", (e) => {
        for (let i = 0; i < e.target.parentElement.children.length; i++) {
          if (e.target.parentElement.children[i] === e.target) {
            e.target.parentElement.children[i].classList.add("active-faq");
            e.target.parentElement.children[i].style.height =
              e.target.parentElement.children[i].children[0].clientHeight +
              e.target.parentElement.children[i].children[1].clientHeight +
              1 +
              "px";
          } else {
            e.target.parentElement.children[i].classList.remove("active-faq");
            e.target.parentElement.children[i].style.height =
              e.target.parentElement.children[i].children[0].clientHeight +
              1 +
              "px";
          }
        }
      });
    });
  });
}

// type writer
function typeWriter(
  selector_target,
  text_list,
  placeholder = false,
  i = 0,
  text_list_i = 0,
  delay_ms = 130
) {
  if (!i) {
    if (placeholder) {
      Array.from(document.querySelectorAll(selector_target)).forEach(
        (element) => (element.placeholder = "")
      );
      // document.querySelectorAll(selector_target).placeholder = "";
    } else {
      Array.from(document.querySelectorAll(selector_target)).forEach(
        (element) => (element.innerHTML = "")
      );
      // document.querySelectorAll(selector_target).innerHTML = "";
    }
  }
  txt = text_list[text_list_i];
  if (i < txt.length) {
    if (placeholder) {
      // document.querySelectorAll(selector_target).placeholder +=
      //   txt.charAt(i);

      Array.from(document.querySelectorAll(selector_target)).forEach(
        (element) => (element.placeholder += txt.charAt(i))
      );
    } else {
      // document.querySelectorAll(selector_target).innerHTML +=
      //   txt.charAt(i);

      Array.from(document.querySelectorAll(selector_target)).forEach(
        (element) => (element.innerHTML += txt.charAt(i))
      );
    }
    i++;
    setTimeout(
      typeWriter,
      delay_ms,
      selector_target,
      text_list,
      placeholder,
      i,
      text_list_i
    );
  } else {
    text_list_i++;
    if (typeof text_list[text_list_i] === "undefined") {
      setTimeout(
        typeWriter,
        delay_ms * 5,
        selector_target,
        text_list,
        placeholder
      );
    } else {
      i = 0;
      setTimeout(
        typeWriter,
        delay_ms * 3,
        selector_target,
        text_list,
        placeholder,
        i,
        text_list_i
      );
    }
  }
}

text_list = ["Email Address...", " "];
// text_list = ["Type your prompt", " "];
return_value = typeWriter("#h1_search_input", text_list, true);
return_value = typeWriter("#h1_search_input1", text_list, true);

// mobile nav dropdown

const activeNavMenu = () => {
  document.querySelector("#mobile-nav-section").classList.add("mobile-sub-nav");
  document
    .querySelector("#mobile-nav-div-overlay")
    .classList.add("overlay-active");
  document
    .querySelector("#mobile-nav-div")
    .classList.add("mobile-nav-div-active");
  document
    .querySelector("#mobile_nav_toggle_menu")
    .firstElementChild.classList.add("hidden");
  document
    .querySelector("#mobile_nav_toggle_menu")
    .lastElementChild.classList.remove("hidden");
};
const deActiveNavMenu = () => {
  document
    .querySelector("#mobile-nav-section")
    .classList.remove("mobile-sub-nav");
  document
    .querySelector("#mobile-nav-div-overlay")
    .classList.remove("overlay-active");
  document
    .querySelector("#mobile-nav-div")
    .classList.remove("mobile-nav-div-active");
  document
    .querySelector("#mobile_nav_toggle_menu")
    .firstElementChild.classList.remove("hidden");
  document
    .querySelector("#mobile_nav_toggle_menu")
    .lastElementChild.classList.add("hidden");
};
const mobileNav = document.querySelector("#mobile_nav_toggle_menu");

if (mobileNav) {
  mobileNav.addEventListener("click", () => {
    if (
      document
        .querySelector("#mobile-nav-section")
        .classList.value.includes("mobile-sub-nav")
    ) {
      deActiveNavMenu();
    } else {
      activeNavMenu();
    }
  });
}

if (document.querySelector("#mobile-nav-div-overlay")) {
  document
    .querySelector("#mobile-nav-div-overlay")
    .addEventListener("click", () => {
      deActiveNavMenu();
    });
}

const mobileSubNav = document.querySelectorAll("#mobile-sub-nav");
if (mobileSubNav) {
  mobileSubNav.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.clientHeight === 20) {
        element.style.height = `${
          element.lastElementChild.clientHeight +
          element.firstElementChild.clientHeight
        }px`;
      } else {
        element.style.height = "20px";
      }
    });
  });
}

const homeFiveBanner = document.querySelector("#hero-banner");
const homeFiveImag = document.querySelector("#hero-banner .img");
let perspectiveValue = 10; // Initial perspective value
if (homeFiveBanner) {
  document.addEventListener("scroll", (e) => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    if (homeFiveImag) {
      if (top > 500) {
        homeFiveImag.style.transform = "none";
      } else {
        const calcValue = perspectiveValue + top / 2;
        homeFiveImag.style.transform = `perspective(${calcValue}px) rotateX(1deg)`;
      }
    }
  });
}


// counter-------------------->
let running = [];
const scrollAnimate = (event) => {
	const allData = document.querySelectorAll("[data-scroll-qs='scroll']");
	if (allData) {
		allData.forEach((item) => {
			const rect = item.getBoundingClientRect()?.y;
			if (rect - window.innerHeight <= 0 && rect >= 0) {
				if (running.indexOf(item) < 0) {
					if (item.getAttribute("data-progress-qs")) {
						let countdown = null;
						const count = Number(item.getAttribute("data-progress-qs"));
						const speed = Number(item.getAttribute("data-speed-qs"));
						let startNumber = 0;
						clearInterval(countdown);
						countdown = setInterval(function () {
							console.log(item);
							item.style = `width:${startNumber}%`;
							startNumber++;
							if (startNumber > count) {
								clearInterval(countdown);
							}
						}, speed / count);
					}
					if (item.getAttribute("data-count-qs")) {
						let countdown = null;
						const count = Number(item.getAttribute("data-count-qs"));
						const valueType = item.getAttribute("data-type-qs");
						const speed = Number(item.getAttribute("data-speed-qs"));
						let startNumber = 0;
						clearInterval(countdown);
						countdown = setInterval(function () {
							item.innerText = startNumber + valueType;
							startNumber++;
							if (startNumber > count) {
								clearInterval(countdown);
							}
						}, speed / count);
					}
					running.push(item);
				}
			} else {
				running = running.filter((value) => value != item);
			}
		});
	}
};
window.addEventListener("load", (event) => {
	scrollAnimate(event);
});
window.addEventListener("scroll", (event) => {
	scrollAnimate(event);
});