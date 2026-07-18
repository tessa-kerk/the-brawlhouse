/* Scroll engine — dependency-free scrollytelling (ported from Elixir Hour).
   Each [data-scene] is a tall wrapper with a sticky pin inside. As the wrapper
   scrolls through its pinned range we compute progress 0..1 into --p on the
   wrapper; CSS maps --p to opacity/transform (GPU-safe). No scroll-jacking:
   native scroll + position:sticky only. Reduced motion / no-JS -> each scene
   shows its composed frame (--p defaults + data-static). */
(function () {
  var docEl = document.documentElement;
  var mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var reduced = mq ? mq.matches : false;
  var scenes = [].slice.call(document.querySelectorAll("[data-scene]"));
  if (!scenes.length) { docEl.classList.add("js"); return; }
  var ticking = false;

  function setStatic() {
    docEl.classList.add("reduce");
    for (var i = 0; i < scenes.length; i++) {
      scenes[i].style.setProperty("--p", scenes[i].getAttribute("data-static") || "1");
    }
  }

  function update() {
    ticking = false;
    var vh = window.innerHeight || docEl.clientHeight;
    for (var i = 0; i < scenes.length; i++) {
      var w = scenes[i];
      var span = w.offsetHeight - vh;               /* scroll distance while pinned */
      var top = w.getBoundingClientRect().top;
      var p;
      if (span > 0) p = Math.min(Math.max(-top / span, 0), 1);
      else p = top <= 0 ? 1 : 0;
      w.style.setProperty("--p", p.toFixed(4));
    }
  }

  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }

  function live() { docEl.classList.remove("reduce"); update(); }

  function apply() {
    docEl.classList.add("js");     /* capability flag; if this never runs, CSS keeps composed frames */
    if (reduced) setStatic(); else live();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () { if (reduced) setStatic(); else onScroll(); }, { passive: true });
  window.addEventListener("orientationchange", function () { if (!reduced) onScroll(); }, { passive: true });

  if (mq) {
    var onPref = function () { reduced = mq.matches; apply(); };
    if (mq.addEventListener) mq.addEventListener("change", onPref);
    else if (mq.addListener) mq.addListener(onPref);
  }

  apply();
})();
