/* Hero ambience — a few warm motes drifting up through the night (like dust in
   lantern light). Canvas, capped particle count, DPR-aware. Stands down under
   prefers-reduced-motion and when the hero scrolls out of view. Purely
   decorative: aria-hidden canvas, no layout impact. */
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var cv = document.getElementById("hero-fx");
  if (!cv || reduce) return;
  var ctx = cv.getContext("2d");
  var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  var N = 26, motes = [], running = true, raf = 0;

  function size() {
    var r = cv.getBoundingClientRect();
    W = r.width; H = r.height;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function seed() {
    motes = [];
    for (var i = 0; i < N; i++) {
      motes.push({
        x: Math.random() * W, y: Math.random() * H,
        r: 0.6 + Math.random() * 1.8,
        vy: -(4 + Math.random() * 10) / 60,
        vx: (Math.random() - 0.5) * 0.25,
        a: 0.15 + Math.random() * 0.4,
        tw: Math.random() * Math.PI * 2
      });
    }
  }
  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < motes.length; i++) {
      var m = motes[i];
      m.y += m.vy; m.x += m.vx; m.tw += 0.03;
      if (m.y < -6) { m.y = H + 6; m.x = Math.random() * W; }
      var flick = m.a * (0.65 + 0.35 * Math.sin(m.tw));
      ctx.beginPath();
      ctx.fillStyle = "rgba(245,200,110," + flick.toFixed(3) + ")";
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = window.requestAnimationFrame(frame);
  }
  function start() { if (!running) { running = true; frame(); } }
  function stop() { running = false; if (raf) window.cancelAnimationFrame(raf); }

  size(); seed(); frame();
  window.addEventListener("resize", function () { size(); seed(); }, { passive: true });
  // pause when the hero leaves the viewport (saves battery down-page)
  if (window.IntersectionObserver) {
    new IntersectionObserver(function (es) {
      es[0].isIntersecting ? start() : stop();
    }, { threshold: 0.02 }).observe(cv);
  }
})();
