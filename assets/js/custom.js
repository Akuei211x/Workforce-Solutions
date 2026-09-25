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
