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
   * Header state management.
   *
   * The hero header is 100vh and in normal flow. When the user scrolls
   * past it (or clicks a nav link), it collapses to a fixed 80px bar
   * and a spacer fills the vacated space so content doesn't jump.
   *
   * `navClicked` prevents the scroll listener from fighting with
   * nav-click-initiated transitions.
   */
  const header = select('#header')
  const spacer = select('#header-spacer')
  let heroHeight = header ? header.offsetHeight : 0
  let isFixed = false
  let navClicked = false  // true while a nav-click scroll is in progress

  function fixHeader() {
    if (isFixed) return
    isFixed = true
    spacer.style.height = heroHeight + 'px'
    header.classList.add('header-top')
  }

  function unfixHeader() {
    if (!isFixed) return
    isFixed = false
    header.classList.remove('header-top')
    spacer.style.height = '0px'
  }

  function onScroll() {
    if (!header || !spacer) return

    // Don't interfere while a nav click is scrolling us to a section
    if (navClicked) return

    if (window.scrollY >= heroHeight - 80) {
      fixHeader()
    } else if (window.scrollY < 80) {
      unfixHeader()
    }

    updateActiveNav()
  }

  window.addEventListener('resize', () => {
    if (!isFixed) {
      heroHeight = header ? header.offsetHeight : 0
    }
  })

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('load', onScroll)

  /**
   * Scroll-spy: highlight the nav link for whichever section is in view
   */
  function updateActiveNav() {
    const sections = select('section', true)
    const navlinks = select('#navbar .nav-link', true)
    let currentSection = ''

    if (window.scrollY < 80) {
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
   * Nav link click: smooth scroll to section.
   *
   * When clicking from the hero, we fix the header first, then scroll.
   * `navClicked` stays true until the scroll finishes so the scroll
   * listener doesn't undo the fix.
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
        // Going home — scroll to top, then unfix
        navClicked = true
        unfixHeader()
        window.scrollTo({ top: 0, behavior: 'smooth' })
        // Release navClicked after scroll settles
        setTimeout(() => { navClicked = false }, 600)
      } else {
        // Going to a section — fix header first, then scroll
        navClicked = true
        fixHeader()

        // Calculate where the section sits now that the spacer is in place
        const targetTop = target.offsetTop - 90  // 90px offset for sticky header
        window.scrollTo({ top: targetTop, behavior: 'smooth' })

        // Release navClicked after scroll animation completes
        setTimeout(() => { navClicked = false }, 800)
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
          navClicked = true
          fixHeader()
          const targetTop = target.offsetTop - 90
          window.scrollTo({ top: targetTop, behavior: 'smooth' })
          setTimeout(() => { navClicked = false }, 800)
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
