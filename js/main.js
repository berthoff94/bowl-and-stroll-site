/**
 * Bowl & Stroll — Site JavaScript
 *
 * 1. Mobile menu toggle
 * 2. Header scroll effect
 * 3. Menu tab switching
 * 4. Scroll animations (IntersectionObserver)
 * 5. Smooth scroll for anchor links
 * 6. Signup modal (Leat loyalty form)
 */

(function () {
    'use strict';

    /* ---- 1. Mobile Menu ---- */
    var menuBtn = document.querySelector('.mobile-menu-btn');
    var mobileMenu = document.querySelector('.mobile-menu');
    var mobileLinks = mobileMenu.querySelectorAll('a');

    menuBtn.addEventListener('click', function () {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    /* ---- 2. Header Scroll Effect ---- */
    var header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    /* ---- 3. Menu Tabs ---- */
    var tabs = document.querySelectorAll('.menu-tab');
    var grids = document.querySelectorAll('.menu-grid');

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (t) { t.classList.remove('active'); });
            grids.forEach(function (g) { g.classList.remove('active'); });
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    /* ---- 4. Scroll Animations ---- */
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
        observer.observe(el);
    });

    /* ---- 5. Smooth Scroll ---- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ---- 6. Signup Modal (Leat Loyalty) ---- */
    var signupModal = document.getElementById('signupModal');
    var openSignupBtn = document.getElementById('openSignupBtn');
    var closeModalBtn = document.getElementById('closeModal');
    var modalBackdrop = document.getElementById('modalBackdrop');
    var leatFormInitialized = false;

    function openModal() {
        signupModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (!leatFormInitialized && window.leat && window.leat.form) {
            window.leat.form.init({
                formId: '6823ddf6-b371-4969-b091-d95ac7cc38ee',
                portalId: 'leatFormContainer'
            });
            leatFormInitialized = true;
        }
    }

    function closeModal() {
        signupModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    openSignupBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && signupModal.classList.contains('active')) {
            closeModal();
        }
    });
})();
