/* BhaavBook explainer — tiny interactions, no dependencies. */
(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- 1. Sticky-nav shadow on scroll ---- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- 2. Smooth scroll for in-page links (respects reduced motion) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      history.replaceState(null, "", id);
    });
  });

  /* ---- 3. Signature: the nudge ladder ticks out when the hero is in view ---- */
  var bubbles = Array.prototype.slice.call(document.querySelectorAll(".wa"));
  function revealLadder() {
    bubbles.forEach(function (b, i) {
      setTimeout(function () {
        b.classList.add("is-in");
      }, reduceMotion ? 0 : 500 + i * 900);
    });
  }
  if (bubbles.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealLadder();
    } else {
      var stage = document.querySelector(".slip-stage");
      var seen = false;
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting && !seen) {
              seen = true;
              revealLadder();
              io.disconnect();
            }
          });
        },
        { threshold: 0.35 }
      );
      if (stage) io.observe(stage);
    }
  }

  /* ---- 4. Animated KPI counter on the dashboard preview ---- */
  function animateCount(el, to, opts) {
    opts = opts || {};
    var dur = 1100;
    var start = null;
    var prefix = opts.prefix || "";
    var suffix = opts.suffix || "";
    var group = opts.group || false;

    function fmt(n) {
      if (!group) return String(n);
      // Indian grouping: last 3 digits, then pairs.
      var s = String(n);
      var last3 = s.slice(-3);
      var rest = s.slice(0, -3);
      if (rest) last3 = "," + last3;
      rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
      return rest + last3;
    }
    function ease(t) {
      return 1 - Math.pow(1 - t, 3);
    }
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var val = Math.round(ease(p) * to);
      el.textContent = prefix + fmt(val) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var kpiValue = document.getElementById("kpi-value");
  var kpiConv = document.getElementById("kpi-conv");
  var kpiFollow = document.getElementById("kpi-follow");
  var screen = document.querySelector(".screen");

  function runKPIs() {
    if (kpiValue) animateCount(kpiValue, 482400, { prefix: "Rs ", group: true });
    if (kpiConv) animateCount(kpiConv, 41, { suffix: "%" });
    if (kpiFollow) animateCount(kpiFollow, 4, {});
  }

  if (screen) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      // Leave the pre-rendered HTML values as-is (already correct).
    } else {
      var seenKpi = false;
      var io2 = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting && !seenKpi) {
              seenKpi = true;
              runKPIs();
              io2.disconnect();
            }
          });
        },
        { threshold: 0.4 }
      );
      io2.observe(screen);
    }
  }
})();
