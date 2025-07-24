/**
* Template Name: Evently
* Template URL: https://bootstrapmade.com/evently-bootstrap-events-template/
* Updated: Jul 19 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
window.mobileNav = {
    toggle: function () {
        try {
            const body = document.querySelector('body');
            const toggleBtn = document.querySelector('.mobile-nav-toggle');

            if (body) {
                body.classList.toggle('mobile-nav-active');
            }
            if (toggleBtn) {
                toggleBtn.classList.toggle('bi-list');
                toggleBtn.classList.toggle('bi-x');
            }
            return true;
        } catch (e) {
            console.error('Mobile nav toggle error:', e);
            return false;
        }
    }
};



(function () {
    "use strict";

    /**
     * Apply .scrolled class to the body as the page is scrolled down
     */
    function toggleScrolled() {
        const selectBody = document.querySelector('body');
        const selectHeader = document.querySelector('.header');
        if (!selectHeader) return;
        if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
        window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
    }

    document.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load', toggleScrolled);

    /**
     * Mobile nav toggle
     */
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

    // Make the function available to Blazor
    window.mobileNavToggleBtn = function () {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        if (mobileNavToggleBtn) {
            mobileNavToggleBtn.classList.toggle('bi-list');
            mobileNavToggleBtn.classList.toggle('bi-x');
        }
    };

    if (mobileNavToggleBtn) {
        mobileNavToggleBtn.addEventListener('click', window.mobileNavToggleBtn);
    }

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
        navmenu.addEventListener('click', () => {
            if (document.querySelector('.mobile-nav-active')) {
                mobileNavToggleBtn();
            }
        });

    });

    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
        navmenu.addEventListener('click', function (e) {
            e.preventDefault();
            this.parentNode.classList.toggle('active');
            this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
            e.stopImmediatePropagation();
        });
    });



    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove();
        });
    }

    /**
     * Scroll top button
     */
    let scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
        scrollTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    function toggleScrollTop() {
        if (scrollTop) {
            window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
        }
    }

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);

    /**
     * Countdown timer
     */
    function updateCountDown(countDownItem) {
        const timeleft = new Date(countDownItem.getAttribute('data-count')).getTime() - new Date().getTime();

        const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        const daysElement = countDownItem.querySelector('.count-days');
        const hoursElement = countDownItem.querySelector('.count-hours');
        const minutesElement = countDownItem.querySelector('.count-minutes');
        const secondsElement = countDownItem.querySelector('.count-seconds');

        if (daysElement) daysElement.innerHTML = days;
        if (hoursElement) hoursElement.innerHTML = hours;
        if (minutesElement) minutesElement.innerHTML = minutes;
        if (secondsElement) secondsElement.innerHTML = seconds;

    }

    document.querySelectorAll('.countdown').forEach(function (countDownItem) {
        updateCountDown(countDownItem);
        setInterval(function () {
            updateCountDown(countDownItem);
        }, 1000);
    });

    /**
     * Initiate Pure Counter
     */
    new PureCounter();


    window.scrollToSection = function (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    /**
     * Initiate glightbox
     */
    window.initGlightbox = function () {
        GLightbox({
            selector: '.glightbox'
        });
    };
    /*
     * Pricing Toggle
     */

    const pricingContainers = document.querySelectorAll('.pricing-toggle-container');

    pricingContainers.forEach(function (container) {
        const pricingSwitch = container.querySelector('.pricing-toggle input[type="checkbox"]');
        const monthlyText = container.querySelector('.monthly');
        const yearlyText = container.querySelector('.yearly');

        pricingSwitch.addEventListener('change', function () {
            const pricingItems = container.querySelectorAll('.pricing-item');

            if (this.checked) {
                monthlyText.classList.remove('active');
                yearlyText.classList.add('active');
                pricingItems.forEach(item => {
                    item.classList.add('yearly-active');
                });
            } else {
                monthlyText.classList.add('active');
                yearlyText.classList.remove('active');
                pricingItems.forEach(item => {
                    item.classList.remove('yearly-active');
                });
            }
        });
    });



})();

/**
* Scroll Effects Handler for Blazor
*/
window.scrollEffects = {
    // Get current scroll position
    getScrollPosition: function () {
        return window.scrollY;
    },

    // Smooth scroll to top
    smoothScrollToTop: function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // Setup scroll listener with .NET reference
    setupScrollListener: function (dotNetRef) {
        const scrollHandler = function () {
            if (dotNetRef && dotNetRef.invokeMethodAsync) {
                dotNetRef.invokeMethodAsync('HandleScroll', window.scrollY);
            }
        };

        window.addEventListener('scroll', scrollHandler);

        // Return cleanup function
        return {
            dispose: function () {
                window.removeEventListener('scroll', scrollHandler);
            }
        };
    }
};