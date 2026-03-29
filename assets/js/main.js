/**
* Template Name: Personal - v4.9.0 (modified for scrollable layout)
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Header: collapse to sticky bar when scrolled past the hero.
   * A spacer div fills the space the header occupied so content
   * doesn't jump when the header becomes position:fixed.
   */
  const header = select('#header')
  const spacer = select('#header-spacer')
  let heroHeight = header ? header.offsetHeight : 0
  let isFixed = false

  function updateHeader() {
    if (!header || !spacer) return

    if (window.scrollY >= heroHeight - 80) {
      if (!isFixed) {
        isFixed = true
        header.classList.add('header-top')
        spacer.style.height = heroHeight + 'px'
      }
    } else {
      if (isFixed) {
        isFixed = false
        header.classList.remove('header-top')
        spacer.style.height = '0px'
      }
    }

    updateActiveNav()
  }

  // Recalculate hero height on resize
  window.addEventListener('resize', () => {
    if (!isFixed) {
      heroHeight = header ? header.offsetHeight : 0
    }
  })

  window.addEventListener('scroll', updateHeader)
  window.addEventListener('load', updateHeader)

  /**
   * Scroll-spy: highlight the nav link for whichever section is in view
   */
  function updateActiveNav() {
    const sections = select('section', true)
    const navlinks = select('#navbar .nav-link', true)
    let currentSection = ''

    if (window.scrollY < heroHeight - 200) {
      currentSection = '#header'
    } else {
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120
        if (window.scrollY >= sectionTop) {
          currentSection = '#' + section.getAttribute('id')
        }
      })
    }

    navlinks.forEach((link) => {
      link.classList.remove('active')
      if (link.getAttribute('href') === currentSection) {
        link.classList.add('active')
      }
    })
  }

  /**
   * Nav link click: smooth scroll to section
   */
  on('click', '#navbar .nav-link', function(e) {
    let targetHash = this.hash
    let target = targetHash === '#header' ? header : select(targetHash)

    if (target) {
      e.preventDefault()

      let navbar = select('#navbar')

      // Close mobile nav if open
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (targetHash === '#header') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, true)

  /**
   * Handle hash links on page load
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let target = select(window.location.hash)
      if (target) {
        setTimeout(function() {
          target.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  })

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      1200: { slidesPerView: 3, spaceBetween: 20 }
    }
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

})()
