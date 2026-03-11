/**
 * Bowl & Stroll — Conversion Tracking Module
 *
 * 1. DataLayer helper
 * 2. UTM parameter reading & injection
 * 3. CTA click tracking (via data-track-* attributes)
 * 4. Scroll depth tracking
 * 5. Time on page tracking
 * 6. Menu section view tracking
 * 7. Loyalty signup modal tracking
 */

(function () {
    'use strict';

    /* ==================================================================
       1. DATALAYER HELPER
       ================================================================== */

    window.dataLayer = window.dataLayer || [];

    function pushEvent(eventName, eventData) {
        var payload = { event: eventName };
        for (var key in eventData) {
            if (eventData.hasOwnProperty(key)) {
                payload[key] = eventData[key];
            }
        }
        window.dataLayer.push(payload);
    }

    /* ==================================================================
       2. UTM PARAMETER READING & INJECTION
       ================================================================== */

    function getPageUTMParams() {
        var params = new URLSearchParams(window.location.search);
        return {
            utm_source:   params.get('utm_source')   || 'website',
            utm_medium:   params.get('utm_medium')   || 'organic',
            utm_campaign: params.get('utm_campaign') || 'direct',
            utm_content:  params.get('utm_content')  || '',
            utm_term:     params.get('utm_term')     || '',
            gclid:        params.get('gclid')        || ''
        };
    }

    var pageUTMs = getPageUTMParams();

    function buildOutboundUTM(label) {
        var params = new URLSearchParams();
        if (pageUTMs.gclid) {
            params.set('utm_source', 'google');
            params.set('utm_medium', 'cpc');
            params.set('utm_campaign', pageUTMs.utm_campaign);
            params.set('utm_content', label);
            params.set('utm_term', pageUTMs.utm_term);
        } else {
            params.set('utm_source', 'bowlandstroll_website');
            params.set('utm_medium', pageUTMs.utm_medium);
            params.set('utm_campaign', 'website_referral');
            params.set('utm_content', label);
        }
        return params.toString();
    }

    function injectUTMParams() {
        var trackedLinks = document.querySelectorAll('a[data-track-category]');
        trackedLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            if (!href || href.charAt(0) === '#' || href.indexOf('tel:') === 0) return;

            var category = link.getAttribute('data-track-category');
            var label    = link.getAttribute('data-track-label') || '';

            // Only inject UTMs into ordering platform links
            if (['storekit', 'deliveroo', 'uber_eats', 'catering'].indexOf(category) === -1) return;

            var utmString = buildOutboundUTM(label);
            var hashIndex = href.indexOf('#');

            if (href.indexOf('?') === -1) {
                if (hashIndex !== -1) {
                    link.setAttribute('href', href.substring(0, hashIndex) + '?' + utmString + href.substring(hashIndex));
                } else {
                    link.setAttribute('href', href + '?' + utmString);
                }
            } else {
                link.setAttribute('href', href + '&' + utmString);
            }
        });
    }

    /* ==================================================================
       3. CTA CLICK TRACKING
       ================================================================== */

    var eventMap = {
        'storekit':   'storekit_click',
        'deliveroo':  'deliveroo_click',
        'uber_eats':  'uber_eats_click',
        'catering':   'catering_click',
        'phone':      'phone_click',
        'loyalty':    'loyalty_signup',
        'directions': 'directions_click',
        'social':     'social_click'
    };

    function initClickTracking() {
        document.addEventListener('click', function (e) {
            var target = e.target;
            while (target && target !== document && !target.hasAttribute('data-track-category')) {
                target = target.parentElement;
            }
            if (!target || !target.hasAttribute('data-track-category')) return;

            var category = target.getAttribute('data-track-category');
            var action   = target.getAttribute('data-track-action') || 'click';
            var label    = target.getAttribute('data-track-label') || '';

            pushEvent(eventMap[category] || 'cta_click', {
                event_category: category,
                event_action:   action,
                event_label:    label,
                outbound_url:   target.getAttribute('href') || '',
                click_location: label.split('_')[0] || 'unknown'
            });
        });
    }

    /* ==================================================================
       4. SCROLL DEPTH TRACKING
       ================================================================== */

    function initScrollTracking() {
        var thresholds = [25, 50, 75, 90, 100];
        var triggered  = {};

        function getScrollPercent() {
            var h  = document.documentElement;
            var b  = document.body;
            var st = window.pageYOffset || h.scrollTop || b.scrollTop || 0;
            var sh = Math.max(h.scrollHeight, b.scrollHeight) - Math.max(h.clientHeight, b.clientHeight);
            return sh > 0 ? Math.round((st / sh) * 100) : 0;
        }

        window.addEventListener('scroll', function () {
            var pct = getScrollPercent();
            thresholds.forEach(function (t) {
                if (pct >= t && !triggered[t]) {
                    triggered[t] = true;
                    pushEvent('scroll_depth', {
                        scroll_percentage: t,
                        page_path: window.location.pathname
                    });
                }
            });
        });
    }

    /* ==================================================================
       5. TIME ON PAGE TRACKING
       ================================================================== */

    var pageLoadTime = Date.now();

    function initTimeTracking() {
        var intervals = [30, 60, 120, 180, 300];
        var fired = {};

        setInterval(function () {
            var elapsed = Math.floor((Date.now() - pageLoadTime) / 1000);
            intervals.forEach(function (s) {
                if (elapsed >= s && !fired[s]) {
                    fired[s] = true;
                    pushEvent('time_on_page', {
                        seconds_elapsed: s,
                        page_path: window.location.pathname
                    });
                }
            });
        }, 5000);
    }

    /* ==================================================================
       6. MENU SECTION VIEW TRACKING
       ================================================================== */

    function initMenuSectionTracking() {
        // Track menu tab clicks
        var tabs = document.querySelectorAll('.menu-tab');
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                pushEvent('menu_section_view', {
                    menu_section: tab.getAttribute('data-tab') || tab.textContent.trim(),
                    page_path: window.location.pathname
                });
            });
        });

        // Track when key sections scroll into view
        if (!('IntersectionObserver' in window)) return;

        var sections = document.querySelectorAll('#menu, #order, #catering, #rewards, #location');
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    pushEvent('section_view', {
                        section_id: entry.target.id,
                        page_path: window.location.pathname
                    });
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

    /* ==================================================================
       7. LOYALTY SIGNUP MODAL TRACKING
       ================================================================== */

    function initLoyaltyTracking() {
        var signupModal = document.getElementById('signupModal');
        if (!signupModal) return;

        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === 'class' && signupModal.classList.contains('active')) {
                    pushEvent('loyalty_modal_open', {
                        event_category: 'loyalty',
                        event_action: 'modal_open'
                    });
                }
            });
        });
        observer.observe(signupModal, { attributes: true });
    }

    /* ==================================================================
       INITIALIZATION
       ================================================================== */

    function init() {
        injectUTMParams();
        initClickTracking();
        initScrollTracking();
        initTimeTracking();
        initMenuSectionTracking();
        initLoyaltyTracking();

        pushEvent('tracking_initialized', {
            page_path:            window.location.pathname,
            referrer:             document.referrer,
            landing_utm_source:   pageUTMs.utm_source,
            landing_utm_medium:   pageUTMs.utm_medium,
            landing_utm_campaign: pageUTMs.utm_campaign,
            has_gclid:            !!pageUTMs.gclid
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
