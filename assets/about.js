/* =====================================================================
   Damaris Chege — About section scroll reveal
   Progressive enhancement: content stays visible without JS.
   ===================================================================== */

(function () {
    'use strict';

    var section = document.getElementById('about');
    if (!section) return;

    var items = Array.prototype.slice.call(section.querySelectorAll('[data-about-reveal]'));
    if (!items.length) return;

    var reduceMotion =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
        items.forEach(function (item) {
            item.classList.add('is-visible');
        });
        return;
    }

    document.documentElement.classList.add('reveal-ready');

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    items.forEach(function (item, index) {
        item.style.setProperty('--reveal-delay', Math.min(index, 4) * 70 + 'ms');
        observer.observe(item);
    });
})();
