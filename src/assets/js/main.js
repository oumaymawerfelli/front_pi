document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) return;

    if (!selectHeader.classList.contains('scroll-up-sticky') &&
        !selectHeader.classList.contains('sticky-top') &&
        !selectHeader.classList.contains('fixed-top')) return;

    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  let lastScrollTop = 0;
  window.addEventListener('scroll', function () {
    const selectHeader = document.querySelector('#header');
    if (!selectHeader || !selectHeader.classList.contains('scroll-up-sticky')) return;

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = `-${selectHeader.offsetHeight + 50}px`;
    } else if (scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = "0";
    } else {
      selectHeader.style.removeProperty('top');
      selectHeader.style.removeProperty('position');
    }
    lastScrollTop = scrollTop;
  });

  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  if (mobileNavToggleBtn) {
    function mobileNavToogle() {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active') && mobileNavToggleBtn) {
        mobileNavToggleBtn.click(); // Appel du bouton pour fermer le menu
      }
    });
  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      const dropdown = this.parentNode.nextElementSibling;
      if (dropdown) dropdown.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  let scrollTopBtn = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTopBtn) {
      window.scrollY > 100 ? scrollTopBtn.classList.add('active') : scrollTopBtn.classList.remove('active');
    }
  }
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    const carousel = carouselIndicator.closest('.carousel');
    if (!carousel) return;
    carousel.querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      const activeClass = index === 0 ? ' class="active"' : '';
      carouselIndicator.innerHTML += `<li data-bs-target="#${carousel.id}" data-bs-slide-to="${index}"${activeClass}></li>`;
    });
  });

  function initSwiper() {
    if (typeof Swiper !== 'undefined') {
      document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
        const configElement = swiperElement.querySelector(".swiper-config");
        if (!configElement) return;
        let config;
        try {
          config = JSON.parse(configElement.innerHTML.trim());
        } catch (e) {
          console.error("Invalid Swiper config", e);
          return;
        }

        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      });
    }
  }

  window.addEventListener("load", initSwiper);

  const glightbox = typeof GLightbox !== 'undefined' ? GLightbox({ selector: '.glightbox' }) : null;
});
