/* =====================================================================
   Professional Certifications — carousel navigation.
   Scroll-snap track with prev/next, dots and keyboard support.
   ===================================================================== */
(function () {
    "use strict";

    var viewport = document.getElementById("cert-viewport");
    var track = document.getElementById("cert-track");
    if (!viewport || !track) return;

    var slides = Array.prototype.slice.call(track.querySelectorAll(":scope > .cert-card"));
    if (slides.length < 2) return;

    var prevBtn = document.querySelector(".cert-prev");
    var nextBtn = document.querySelector(".cert-next");
    var dotsContainer = document.getElementById("cert-dots");
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    var dots = slides.map(function (_, i) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cert-dot";
        btn.setAttribute("aria-label", "Go to certification " + (i + 1));
        btn.addEventListener("click", function () {
            scrollToIndex(i);
        });
        if (dotsContainer) dotsContainer.appendChild(btn);
        return btn;
    });

    function stepSize() {
        if (slides.length < 2) return slides[0].getBoundingClientRect().width;
        var step = slides[1].offsetLeft - slides[0].offsetLeft;
        return step > 0 ? step : slides[0].getBoundingClientRect().width;
    }

    function currentIndex() {
        var step = stepSize();
        if (!step) return 0;
        return Math.round(viewport.scrollLeft / step);
    }

    function scrollToIndex(i) {
        i = Math.max(0, Math.min(slides.length - 1, i));
        var step = stepSize();
        viewport.scrollTo({
            left: i * step,
            behavior: reducedMotion.matches ? "auto" : "smooth"
        });
    }

    function updateDots() {
        var i = currentIndex();
        dots.forEach(function (dot, idx) {
            dot.classList.toggle("is-active", idx === i);
        });
    }

    var ticking = false;
    viewport.addEventListener("scroll", function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
            updateDots();
            ticking = false;
        });
    }, { passive: true });

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            scrollToIndex(currentIndex() - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            scrollToIndex(currentIndex() + 1);
        });
    }

    viewport.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollToIndex(currentIndex() + 1);
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollToIndex(currentIndex() - 1);
        } else if (event.key === "Home") {
            event.preventDefault();
            scrollToIndex(0);
        } else if (event.key === "End") {
            event.preventDefault();
            scrollToIndex(slides.length - 1);
        }
    });

    window.addEventListener("resize", function () {
        updateDots();
    });

    updateDots();
})();