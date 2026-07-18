/* Overlay scrollbar thumb (see css/scrollbar.css for the why). Ported verbatim
   from Elixir Hour. Hides the native page bar and draws one fixed <div> whose
   height is the viewport/document ratio and whose offset tracks scrollY. Native
   scrolling is untouched. Fine-pointer + hover only; touch keeps its native bar;
   any failure degrades to "native scrolling, no custom indicator". */
(function () {
  "use strict";
  var mq = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)");
  if (!mq || !mq.matches) return;

  var doc = document.documentElement;
  var MIN_H = 40, PAD = 8, HOT = 24, HIDE_MS = 700;

  var thumb = document.createElement("div");
  thumb.className = "sb-thumb";
  thumb.setAttribute("aria-hidden", "true");

  var maxScroll = 0, trackH = 0, thumbH = 0;
  var raf = 0, hideTO = null, dragging = false, startY = 0, startScroll = 0;

  function refresh() {
    var vh = window.innerHeight, dh = doc.scrollHeight;
    maxScroll = dh - vh;
    if (maxScroll <= 0) { thumb.style.display = "none"; return false; }
    thumb.style.display = "";
    trackH = vh - PAD * 2;
    thumbH = Math.max(MIN_H, Math.round(trackH * (vh / dh)));
    thumb.style.height = thumbH + "px";
    return true;
  }
  function place() {
    raf = 0;
    if (maxScroll <= 0) return;
    var p = window.scrollY / maxScroll;
    if (p < 0) p = 0; else if (p > 1) p = 1;
    thumb.style.transform = "translateY(" + (PAD + p * (trackH - thumbH)) + "px)";
  }
  function schedule() { if (!raf) raf = window.requestAnimationFrame(place); }
  function show() { thumb.classList.add("on"); if (hideTO) { window.clearTimeout(hideTO); hideTO = null; } }
  function autoHide() {
    if (hideTO) window.clearTimeout(hideTO);
    hideTO = window.setTimeout(function () { if (!dragging) thumb.classList.remove("on"); }, HIDE_MS);
  }
  function onScroll() { schedule(); show(); autoHide(); }
  function onResize() { if (refresh()) schedule(); }
  function onMouseMove(e) { if (dragging) return; if (e.clientX >= window.innerWidth - HOT) { show(); autoHide(); } }

  function onPointerDown(e) {
    if (e.button !== 0 || maxScroll <= 0) return;
    dragging = true; startY = e.clientY; startScroll = window.scrollY;
    thumb.classList.add("drag"); show();
    try { thumb.setPointerCapture(e.pointerId); } catch (err) {}
    e.preventDefault();
  }
  function onPointerMove(e) {
    if (!dragging) return;
    var travel = trackH - thumbH;
    if (travel <= 0) return;
    window.scrollTo(0, startScroll + (e.clientY - startY) * (maxScroll / travel));
  }
  function onPointerUp(e) {
    if (!dragging) return;
    dragging = false; thumb.classList.remove("drag");
    try { thumb.releasePointerCapture(e.pointerId); } catch (err) {}
    autoHide();
  }

  function init() {
    doc.classList.add("sb-overlay");
    document.body.appendChild(thumb);
    refresh(); place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    thumb.addEventListener("pointerdown", onPointerDown);
    thumb.addEventListener("pointermove", onPointerMove);
    thumb.addEventListener("pointerup", onPointerUp);
    thumb.addEventListener("pointercancel", onPointerUp);
    if (window.ResizeObserver) new window.ResizeObserver(onResize).observe(document.body);
    else window.addEventListener("load", onResize);
  }

  if (document.body) init();
  else document.addEventListener("DOMContentLoaded", init);
}());
