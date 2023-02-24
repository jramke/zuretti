// TODO check if scrolltrigger plugin needed

// smooth scroll
(function () {
	const lenis = new Lenis();

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);

	// https://github.com/studio-freight/lenis/issues/93
	let af;
	const scrollFn = (time) => {
		lenis.raf(time);
		af = requestAnimationFrame(scrollFn);
	};

	af = requestAnimationFrame(scrollFn);

	window.onfocus = function () {
		af = requestAnimationFrame(scrollFn);
	};
	window.onblur = function () {
		cancelAnimationFrame(af);
	};
})();

// calc free space from bs containers
(function () {
	let resizeTimeout;
	setHorizontalContainerSpace();
	window.onresize = function () {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function () {
			setHorizontalContainerSpace();
		}, 100);
	};

	function setHorizontalContainerSpace() {
		document.documentElement.style.setProperty('--horizontal-container-space', calcHorizontalContainerSpace() + 'px');
	}
	function calcHorizontalContainerSpace() {
		return (window.innerWidth - document.querySelector('.container').getBoundingClientRect().width) / 2
	}
})();


// nav canvas
(function () {
	const navcanvas = document.getElementById('nav-canvas');
	const canvaslinks = navcanvas.querySelectorAll('a');
	const nav = document.querySelector('#page-header');
	const navcanvasObj = new bootstrap.Offcanvas(navcanvas);

	canvaslinks.forEach(e => e.addEventListener('click', (e) => {
		let targetPage = e.target.closest('a').href.split('/');
		targetPage = targetPage[targetPage.length - 1].split('#')[0];
		if ('/' + targetPage === this.location.pathname) {
			navcanvasObj.hide();
		}
	}));
	// navcanvas.addEventListener('show.bs.offcanvas', (e) => nav.style.paddingRight = '15px')
	// navcanvas.addEventListener('hidden.bs.offcanvas', (e) => nav.style.paddingRight = '0')
})();



// nav transition
(function () {
	const hasHero = document.querySelector('.hero');
	const nav = document.querySelector('#page-header');
	const transitionScrollPos = hasHero ? window.innerHeight - 50 : 100;
	if (hasHero) {
		document.body.style.marginTop = 'calc(-1 * var(--nav-height))';
	}
	setNavClass();
	window.addEventListener('scroll', setNavClass)
	function setNavClass() {
		// if (hasHero) {
		// 	nav.classList.add('absolute');
		// }
		if (window.scrollY > transitionScrollPos) {
			nav.classList.add(hasHero ? 'navbar-white' : null, 'border-bottom');
		} else {
			nav.classList.remove(hasHero ? 'navbar-white' : null, 'border-bottom');
		}
	}
})();

//swiper
(function () {
	const swiper = new Swiper('.swiper', {
		speed: 400,
		// loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
})();

// horizontal scroll
(function () {
	gsap.registerPlugin(ScrollTrigger);
	ScrollTrigger.matchMedia({
		// only create horizontal scroll above lg breakpoint 
		"(min-width: 992px)": function () {
			let hSections = gsap.utils.toArray('.section-horizontal');
			if (hSections.length > 0) {
				hSections.forEach((hSection) => {
					let progressbar = hSection.querySelector('[role="progressbar"]');
					//calc width of all items inside the section
					let hSectionInner = hSection.querySelector('.section-horizontal-inner');
					let hSectionItems = hSection.querySelectorAll(".section-horizontal-inner > *");
					let hSectionsAllItemsWidth = 0;
					Array.from(hSectionItems).forEach((item) => {
						hSectionsAllItemsWidth = hSectionsAllItemsWidth + item.offsetWidth;
					});
					let hSectionScrollLength = hSectionsAllItemsWidth - hSectionInner.offsetWidth;
					tl = gsap.timeline();
					tl.to(hSectionInner, {
						x: -hSectionScrollLength,
						ease: "none", // <-- IMPORTANT!
						scrollTrigger: {
							trigger: hSection,
							start: 'center 55%',
							// start: 'bottom 85%',
							pin: hSection.querySelector('.pin-wrap'), //  -->cooler effekt, dann hat man den hintergrund von .section-horizontal über ganze bildschirm beim scroll
							pinSpacing: true,
							scrub: true,
							end: '=+' + hSectionsAllItemsWidth, // ohne =+ funktionieren mehrere Sections nicht, keine ahnung was das aber bedeutet
							onUpdate: (e) => {
								gsap.set(progressbar, {
									width: `${e.progress * 100}%`
								})

							}
						}
					})
				})
			}
		}
	});
})();




// animations
(function () {
	document.addEventListener("DOMContentLoaded", () => {
		const AOS_SELECTOR = "[data-aos]";
		const AOS_PARENT_SELECTOR = "[aos-parent]";
		const AOS_ANIMATION_CLASS = 'aos-animate';

		const aosObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				// toggle class only once
				if (entry.isIntersecting) {
					entry.target.classList.add(AOS_ANIMATION_CLASS)
				}
			})
		})
		document.querySelectorAll(AOS_SELECTOR).forEach((el) => aosObserver.observe(el));

		const aosParentObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const aosChilds = entry.target.querySelectorAll(AOS_SELECTOR);
				aosChilds.forEach(child => aosObserver.unobserve(child));
				if (entry.isIntersecting) {
					aosChilds.forEach(child => child.classList.add(AOS_ANIMATION_CLASS));
				}
				if (entry.target.getAttribute('aos-always') !== null) {
					aosChilds.forEach(child => child.classList.toggle(AOS_ANIMATION_CLASS, entry.isIntersecting));
				}
			})
		}, { threshold: 0.5 })
		document.querySelectorAll(AOS_PARENT_SELECTOR).forEach((el) => aosParentObserver.observe(el));
	});

})();

// splitting
(function () {

	Splitting({
		// target: target, 
		// by: 'custom',
	});

})();