// nanomuse.cn — the bar's switches, the star count and the demo frame. The inline script in
// each page's <head> has already set data-lang and data-theme on <html> before first paint;
// this file runs after the page is there. No framework, nothing fetched from outside except
// GitHub's API for the star count and the demo frame itself.
(function () {
  "use strict";

  var root = document.documentElement;
  var DEMO = "https://demo.nanomuse.dev";
  var frame = document.getElementById("demo-frame");
  var title = document.querySelector("title");

  function lang() {
    return root.getAttribute("data-lang") === "zh" ? "zh" : "en";
  }
  function dark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }
  function tell(msg) {
    // the showcase in the frame follows the site's language and theme (demo/showcase/README.md)
    if (frame && frame.src && frame.contentWindow) {
      try {
        frame.contentWindow.postMessage(msg, DEMO);
      } catch (e) {
        /* the frame is not there yet */
      }
    }
  }

  // ---- language -------------------------------------------------------------------------
  function applyLang(l) {
    root.setAttribute("data-lang", l);
    root.lang = l === "zh" ? "zh-CN" : "en";
    if (title) {
      var t = title.getAttribute(l === "zh" ? "data-zh" : "data-en");
      if (t) document.title = t;
    }
    tell({ type: "nanomuse:lang", lang: l });
  }
  applyLang(lang());
  var langBtn = document.getElementById("lang");
  if (langBtn) {
    langBtn.addEventListener("click", function () {
      var l = lang() === "zh" ? "en" : "zh";
      try {
        localStorage.setItem("nm-lang", l);
      } catch (e) {
        /* private mode */
      }
      applyLang(l);
    });
  }

  // ---- theme ----------------------------------------------------------------------------
  var themeBtn = document.getElementById("theme");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var t = dark() ? "light" : "dark";
      root.setAttribute("data-theme", t);
      try {
        localStorage.setItem("nm-theme", t);
      } catch (e) {
        /* private mode */
      }
      tell({ type: "nanomuse:theme", theme: t });
    });
  }

  // ---- the star count -------------------------------------------------------------------
  // GitHub's API, once an hour; without a number the link still says GitHub.
  var starsEl = document.querySelector("#stars .n");
  function fmt(n) {
    if (n < 1000) return String(n);
    var k = (n / 1000).toFixed(n < 10000 ? 1 : 0);
    return k.replace(/\.0$/, "") + "k";
  }
  function showStars(n) {
    if (starsEl && typeof n === "number" && n >= 0) starsEl.textContent = fmt(n);
  }
  if (starsEl) {
    var cached = null;
    try {
      cached = JSON.parse(localStorage.getItem("nm-stars") || "null");
    } catch (e) {
      cached = null;
    }
    var fresh = cached && typeof cached.n === "number" && Date.now() - (cached.t || 0) < 3600000;
    if (cached && typeof cached.n === "number") showStars(cached.n);
    if (!fresh && window.fetch) {
      fetch("https://api.github.com/repos/nano-muse/nanoMuse", { headers: { Accept: "application/vnd.github+json" } })
        .then(function (r) {
          return r.ok ? r.json() : null;
        })
        .then(function (j) {
          if (!j || typeof j.stargazers_count !== "number") return;
          showStars(j.stargazers_count);
          try {
            localStorage.setItem("nm-stars", JSON.stringify({ n: j.stargazers_count, t: Date.now() }));
          } catch (e) {
            /* private mode */
          }
        })
        .catch(function () {
          /* no number, still GitHub */
        });
    }
  }

  // ---- the demo frame -------------------------------------------------------------------
  // Loaded only where it can be used (from 1000 px, the width at which the showcase keeps the
  // phone and its column side by side and fits them into the height it is given); narrower
  // screens see the still and a link. The showcase starts nothing until the visitor taps the
  // phone (?embed=1).
  if (frame) {
    var wide = window.matchMedia("(min-width: 1000px)");
    var load = function () {
      if (frame.src || !wide.matches) return;
      frame.src = DEMO + "/?embed=1&lang=" + lang() + (dark() ? "&theme=dark" : "");
    };
    load();
    if (wide.addEventListener) wide.addEventListener("change", load);
    else if (wide.addListener) wide.addListener(load);
  }
})();
