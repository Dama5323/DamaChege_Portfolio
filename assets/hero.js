/* =====================================================================
   Hero carousel — autoplay, manual controls, swipe and keyboard support.
   Dependencies: none.
   ===================================================================== */
(function () {
    'use strict';

    var hero = document.getElementById('home');
    var carousel = document.getElementById('hero-carousel');
    if (!hero || !carousel) return;

    var slides = Array.prototype.slice.call(carousel.querySelectorAll('.hero-slide'));
    var dots = Array.prototype.slice.call(hero.querySelectorAll('[data-slide-to]'));
    var auras = Array.prototype.slice.call(hero.querySelectorAll('.hero-aura'));
    var prevBtn = hero.querySelector('[data-hero-prev]');
    var nextBtn = hero.querySelector('[data-hero-next]');
    var toggleBtn = hero.querySelector('[data-hero-toggle]');
    var status = document.getElementById('hero-status');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var AUTOPLAY_MS = 7000;

    if (slides.length < 2) return;

    var index = 0;
    var timer = null;
    var userPaused = false;
    var hoverPaused = false;
    var focusPaused = false;

    function slideName(i) {
        var category = slides[i].querySelector('.hero-category');
        return category ? category.textContent.trim().toLowerCase() : '';
    }

    function canAutoplay() {
        return !reducedMotion.matches &&
            !userPaused &&
            !hoverPaused &&
            !focusPaused &&
            !document.hidden;
    }

    function stopTimer() {
        if (timer !== null) {
            window.clearTimeout(timer);
            timer = null;
        }
    }

    function schedule() {
        stopTimer();
        if (!canAutoplay()) return;
        timer = window.setTimeout(function () {
            timer = null;
            show((index + 1) % slides.length, false);
        }, AUTOPLAY_MS);
    }

    function updateToggle() {
        if (!toggleBtn) return;
        var paused = userPaused || reducedMotion.matches;
        toggleBtn.classList.toggle('is-paused', paused);
        toggleBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
        var label = paused ? 'Resume automatic rotation' : 'Pause automatic rotation';
        toggleBtn.setAttribute('aria-label', label);
        toggleBtn.setAttribute('title', label);
    }

    function show(nextIndex, announce) {
        index = (nextIndex + slides.length) % slides.length;

        slides.forEach(function (slide, i) {
            var active = i === index;
            slide.classList.toggle('is-active', active);
            if (active) {
                slide.removeAttribute('inert');
                slide.removeAttribute('aria-hidden');
            } else {
                slide.setAttribute('inert', '');
                slide.setAttribute('aria-hidden', 'true');
            }
        });

        dots.forEach(function (dot, i) {
            var active = i === index;
            dot.classList.toggle('is-active', active);
            if (active) {
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.removeAttribute('aria-current');
            }
        });

        auras.forEach(function (aura, i) {
            aura.classList.toggle('is-active', i === index);
        });

        hero.setAttribute('data-accent', slides[index].getAttribute('data-accent') || 'blue');
        updateToggle();

        if (announce && status) {
            status.textContent = 'Slide ' + (index + 1) + ' of ' + slides.length + ': ' + slideName(index);
        }

        schedule();
    }

    function manualShow(nextIndex) {
        // A manual choice pauses rotation so the carousel never moves under the user.
        userPaused = true;
        show(nextIndex, true);
    }

    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            manualShow(i);
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            manualShow(index - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            manualShow(index + 1);
        });
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            userPaused = !userPaused;
            if (!userPaused) {
                // An explicit play request wins over the focus pause; the
                // pointer/keyboard focus is still on this control.
                focusPaused = false;
            }
            updateToggle();
            schedule();
        });
    }

    carousel.addEventListener('mouseenter', function () {
        hoverPaused = true;
        schedule();
    });

    carousel.addEventListener('mouseleave', function () {
        hoverPaused = false;
        schedule();
    });

    hero.addEventListener('focusin', function () {
        focusPaused = true;
        schedule();
    });

    hero.addEventListener('focusout', function (event) {
        if (!hero.contains(event.relatedTarget)) {
            focusPaused = false;
            schedule();
        }
    });

    carousel.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            manualShow(index + 1);
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            manualShow(index - 1);
        } else if (event.key === 'Home') {
            event.preventDefault();
            manualShow(0);
        } else if (event.key === 'End') {
            event.preventDefault();
            manualShow(slides.length - 1);
        }
    });

    var touchStartX = 0;
    var touchStartY = 0;
    var touchActive = false;
    var SWIPE_THRESHOLD = 45;

    carousel.addEventListener('touchstart', function (event) {
        if (event.touches.length !== 1) return;
        touchActive = true;
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }, { passive: true });

    carousel.addEventListener('touchend', function (event) {
        if (!touchActive) return;
        touchActive = false;

        var touch = event.changedTouches[0];
        if (!touch) return;

        var deltaX = touch.clientX - touchStartX;
        var deltaY = touch.clientY - touchStartY;

        if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) {
            return;
        }

        manualShow(deltaX < 0 ? index + 1 : index - 1);
    }, { passive: true });

    carousel.addEventListener('touchcancel', function () {
        touchActive = false;
    }, { passive: true });

    document.addEventListener('visibilitychange', schedule);

    if (typeof reducedMotion.addEventListener === 'function') {
        reducedMotion.addEventListener('change', function () {
            updateToggle();
            schedule();
        });
    } else if (typeof reducedMotion.addListener === 'function') {
        reducedMotion.addListener(function () {
            updateToggle();
            schedule();
        });
    }

    show(0, false);
})();
