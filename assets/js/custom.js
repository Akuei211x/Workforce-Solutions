(function ($) {
	
	"use strict";

	// Page loading animation
	$(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });


	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	})

	var width = $(window).width();
		$(window).resize(function() {
		if (width > 767 && $(window).width() < 767) {
			location.reload();
		}
		else if (width < 767 && $(window).width() > 767) {
			location.reload();
		}
	})

	const elem = document.querySelector('.trending-box');
	const filtersElem = document.querySelector('.trending-filter');
	if (elem) {
		const rdn_events_list = new Isotope(elem, {
			itemSelector: '.trending-items',
			layoutMode: 'masonry'
		});
		if (filtersElem) {
			filtersElem.addEventListener('click', function(event) {
				if (!matchesSelector(event.target, 'a')) {
					return;
				}
				const filterValue = event.target.getAttribute('data-filter');
				rdn_events_list.arrange({
					filter: filterValue
				});
				filtersElem.querySelector('.is_active').classList.remove('is_active');
				event.target.classList.add('is_active');
				event.preventDefault();
			});
		}
	}


	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});
    


})(window.jQuery);

const hero = gsap.timeline({
  defaults: {
    ease: "power3.out"
  }
});

hero
  .from(".header-text h6", {
    opacity: 0,
    y: 15,
    duration: 0.5
  })
  .from(".header-text h2", {
    opacity: 0,
    y: 20,
    duration: 0.7
  }, "-=0.25")
  .from(".header-text p", {
    opacity: 0,
    y: 15,
    duration: 0.6
  }, "-=0.35")
  .from(".search-input", {
    opacity: 0,
    y: 15,
    duration: 0.7
  }, "-=0.3")
  .from(".right-image", {
    opacity: 0,
    x: 25,
    duration: 0.9
  }, "-=0.5");
  
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".section h2").forEach((heading) => {

  // Save the original HTML
  const originalHTML = heading.innerHTML;

  // Replace text inside elements without destroying <em>, <strong>, etc.
  heading.querySelectorAll("*").forEach((element) => {
    [...element.childNodes].forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;

        const fragment = document.createDocumentFragment();

        [...text].forEach((char) => {
          const span = document.createElement("span");

          span.textContent = char === " " ? "\u00A0" : char;
          span.style.display = "inline-block";
          span.style.opacity = "0";

          fragment.appendChild(span);
        });

        node.replaceWith(fragment);
      }
    });
  });

  // Also handle text directly inside the h2
  [...heading.childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const fragment = document.createDocumentFragment();

      [...text].forEach((char) => {
        const span = document.createElement("span");

        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        span.style.opacity = "0";

        fragment.appendChild(span);
      });

      node.replaceWith(fragment);
    }
  });

  // Animate all characters
  gsap.to(heading.querySelectorAll("span"), {
    opacity: 1,
    y: 0,
    duration: 0.4,
    stagger: 0.025,
    ease: "power2.out",

    scrollTrigger: {
      trigger: heading,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });

});
gsap.to(".right-image", {
  y: -15,
  duration: 2,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true
});
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    gsap.to(item, {
      scale: 1.05,
      y: -5,
      duration: 0.35,
      ease: "power2.out"
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(item, {
      scale: 1,
      y: 0,
      duration: 0.35,
      ease: "power2.out"
    });
  });
});
/* =========================================================
   WASL STORY ANIMATIONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  if (typeof gsap === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);


  /* -----------------------------------------
     What Is Wasl
  ----------------------------------------- */

  const storySection = document.querySelector(".wasl-story");

  if (storySection) {

    const storyCards = storySection.querySelectorAll(".story-card");
    const storyContent = storySection.querySelector(".wasl-story-content");
    const storyGlow = storySection.querySelector(".story-glow");
    const storyCircle = storySection.querySelector(".story-circle");

    gsap.from(storyCards, {
      scrollTrigger: {
        trigger: storySection,
        start: "top 75%",
        toggleActions: "play none none reverse"
      },
      y: 80,
      opacity: 0,
      rotate: 3,
      duration: 1,
      stagger: 0.18,
      ease: "power3.out"
    });

    gsap.from(storyContent.children, {
      scrollTrigger: {
        trigger: storyContent,
        start: "top 78%",
        toggleActions: "play none none reverse"
      },
      y: 35,
      opacity: 0,
      duration: .8,
      stagger: .1,
      ease: "power3.out"
    });

    gsap.from(storyCircle, {
      scrollTrigger: {
        trigger: storySection,
        start: "top 75%"
      },
      scale: 0,
      rotation: -90,
      duration: 1,
      delay: .3,
      ease: "back.out(1.7)"
    });

    /* Slow floating animation */

    gsap.to(storyCards[0], {
      y: -12,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(storyCards[1], {
      y: 10,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(storyCircle, {
      y: -8,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    /* Subtle glow movement */

    gsap.to(storyGlow, {
      scale: 1.15,
      opacity: .7,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }


  /* -----------------------------------------
     Who We Are
  ----------------------------------------- */

  const teamSection = document.querySelector(".wasl-team");

  if (teamSection) {

    const heading = teamSection.querySelector(".team-heading");
    const cards = teamSection.querySelectorAll(".value-card");

    gsap.from(heading, {
      scrollTrigger: {
        trigger: teamSection,
        start: "top 75%",
        toggleActions: "play none none reverse"
      },
      x: -60,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(cards, {
      scrollTrigger: {
        trigger: teamSection,
        start: "top 70%",
        toggleActions: "play none none reverse"
      },
      x: 70,
      opacity: 0,
      duration: .8,
      stagger: .15,
      ease: "power3.out"
    });


    /* Card hover animation */

    cards.forEach(card => {

      const icon = card.querySelector(".value-icon");
      const arrow = card.querySelector(".value-arrow");

      card.addEventListener("mouseenter", () => {

        gsap.to(icon, {
          scale: 1.12,
          rotate: 5,
          duration: .25,
          ease: "power2.out"
        });

        gsap.to(arrow, {
          x: 5,
          duration: .25,
          ease: "power2.out"
        });

      });

      card.addEventListener("mouseleave", () => {

        gsap.to(icon, {
          scale: 1,
          rotate: 0,
          duration: .25,
          ease: "power2.out"
        });

        gsap.to(arrow, {
          x: 0,
          duration: .25,
          ease: "power2.out"
        });

      });

    });

  }

});

document.addEventListener("DOMContentLoaded", function () {

  gsap.registerPlugin(ScrollTrigger);

  /* ================================
     WASL STORY CARDS
  ================================= */

  const storyCards = gsap.utils.toArray(".value-card");

  if (storyCards.length) {

    // Initial state
    gsap.set(storyCards, {
      opacity: 0,
      y: 45
    });

    // Reveal cards on scroll
    gsap.to(storyCards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.18,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".wasl-values",
        start: "top 75%",
        once: true
      }
    });

    // Card hover interaction
    storyCards.forEach((card) => {

      const icon = card.querySelector(".value-icon");
      const arrow = card.querySelector(".value-arrow");

      card.addEventListener("mouseenter", () => {

        gsap.to(card, {
          y: -6,
          duration: 0.3,
          ease: "power2.out"
        });

        if (icon) {
          gsap.to(icon, {
            scale: 1.08,
            rotate: 4,
            duration: 0.3,
            ease: "power2.out"
          });
        }

        if (arrow) {
          gsap.to(arrow, {
            x: 5,
            duration: 0.25,
            ease: "power2.out"
          });
        }

      });

      card.addEventListener("mouseleave", () => {

        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });

        if (icon) {
          gsap.to(icon, {
            scale: 1,
            rotate: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }

        if (arrow) {
          gsap.to(arrow, {
            x: 0,
            duration: 0.25,
            ease: "power2.out"
          });
        }

      });

    });

  }


  /* ================================
     STORY HEADING
  ================================= */

  const teamHeading = document.querySelector(".team-heading");

  if (teamHeading) {

    gsap.from(teamHeading.children, {
      opacity: 0,
      y: 25,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".wasl-team",
        start: "top 75%",
        once: true
      }
    });

  }

});
/* =====================================
    HOW IT WORKS
======================================== */


document.addEventListener("DOMContentLoaded", function () {

  gsap.registerPlugin(ScrollTrigger);

  /* =========================================
     HOW IT WORKS
  ========================================= */

  const howSection = document.querySelector(".wasl-how");

  if (howSection) {

    const steps = gsap.utils.toArray(".process-step");
    const progress = document.querySelector(".process-line-progress");

    // Initial state
    gsap.set(steps, {
      opacity: 0,
      y: 35
    });

    gsap.set(".process-marker", {
      scale: 0.7
    });

    // Main timeline
    const howTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".wasl-process",
        start: "top 75%",
        once: true
      }
    });

    // Draw connecting line
    howTimeline.to(progress, {
      width: "100%",
      duration: 1.2,
      ease: "power2.inOut"
    });

    // Reveal steps
    howTimeline.to(steps, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.2,
      ease: "power3.out"
    }, "-=0.8");

    // Pop the markers
    howTimeline.to(".process-marker", {
      scale: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.9");


    /* -----------------------------------------
       Active step
    ----------------------------------------- */

    steps.forEach((step, index) => {

      step.addEventListener("mouseenter", () => {

        steps.forEach(item => {
          item.classList.remove("active");
        });

        step.classList.add("active");

      });

    });


    /* -----------------------------------------
       Reset active state
    ----------------------------------------- */

    const process = document.querySelector(".wasl-process");

    process.addEventListener("mouseleave", () => {

      steps.forEach(item => {
        item.classList.remove("active");
      });

    });

  }

});
gsap.from(".wasl-cta-content > *", {
  scrollTrigger: {
    trigger: ".wasl-cta",
    start: "top 80%"
  },
  y: 30,
  opacity: 0,
  duration: 0.8,
  stagger: 0.12,
  ease: "power3.out"
});

gsap.from(".wasl-cta-card", {
  scrollTrigger: {
    trigger: ".wasl-cta-actions",
    start: "top 85%"
  },
  y: 35,
  opacity: 0,
  duration: 0.7,
  stagger: 0.15,
  ease: "power3.out"
});

gsap.to(".wasl-cta-glow", {
  y: 30,
  x: -20,
  duration: 4,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});
/* =========================
   WASL INDUSTRIES GSAP
========================= */

gsap.registerPlugin(ScrollTrigger);


/* Heading reveal */

gsap.from(".industries-heading-main > *", {
  scrollTrigger: {
    trigger: ".wasl-industries",
    start: "top 80%",
    once: true
  },

  y: 35,
  opacity: 0,

  duration: 0.8,
  stagger: 0.12,

  ease: "power3.out"
});


/* Description */

gsap.from(".industries-heading > p", {
  scrollTrigger: {
    trigger: ".wasl-industries",
    start: "top 80%",
    once: true
  },

  y: 25,
  opacity: 0,

  duration: 0.8,

  delay: 0.15,

  ease: "power3.out"
});


/* Cards */

gsap.from(".industry-card", {
  scrollTrigger: {
    trigger: ".industries-grid",
    start: "top 82%",
    once: true
  },

  y: 50,
  opacity: 0,
  scale: 0.97,

  duration: 0.8,

  stagger: 0.12,

  ease: "power3.out"
});


/* Subtle image movement while scrolling */

document.querySelectorAll(".industry-card").forEach((card) => {

  const image = card.querySelector(".industry-image img");

  gsap.to(image, {
    yPercent: -5,

    ease: "none",

    scrollTrigger: {
      trigger: card,

      start: "top bottom",
      end: "bottom top",

      scrub: 1
    }
  });

});
/* Contact Form */
/* =========================
   WASL CONTACT GSAP
========================= */

gsap.registerPlugin(ScrollTrigger);


/* Left content */

gsap.from(".wasl-contact-left > *", {
  scrollTrigger: {
    trigger: ".wasl-contact",
    start: "top 80%",
    once: true
  },

  y: 35,
  opacity: 0,

  duration: 0.8,
  stagger: 0.12,

  ease: "power3.out"
});


/* Contact details */

gsap.from(".contact-detail", {
  scrollTrigger: {
    trigger: ".contact-details",
    start: "top 85%",
    once: true
  },

  x: -25,
  opacity: 0,

  duration: 0.7,
  stagger: 0.12,

  ease: "power3.out"
});


/* Form */

gsap.from(".wasl-contact-right", {
  scrollTrigger: {
    trigger: ".wasl-contact-right",
    start: "top 82%",
    once: true
  },

  y: 45,
  opacity: 0,

  duration: 0.9,

  ease: "power3.out"
});


/* Form fields */

gsap.from(".contact-field", {
  scrollTrigger: {
    trigger: ".wasl-contact-right",
    start: "top 75%",
    once: true
  },

  y: 15,
  opacity: 0,

  duration: 0.5,
  stagger: 0.08,

  delay: 0.2,

  ease: "power2.out"
});
