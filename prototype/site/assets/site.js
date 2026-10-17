window.PAGE_INITS = [];

(function () {
  var NOTES = [
    { id: "n-logo", target: "logo", title: "Logo", text: "Emblem plus “Darwish & Co.” wordmark is a placeholder until a clean consulting-only vector arrives." },
    { id: "n-g360", target: "g360", title: "Growth 360 partners", text: "Name the second joint partner and approve the wording. The profile says Growth 360 is “strategically led by Darwish & Co.”" },
    { id: "n-arms", target: "g360", title: "Logic Arrow and Business Learning House", text: "Outside partners, or the new names of Darwish’s former Smart Solutions and Training businesses?" },
    { id: "n-partners", target: "partners", title: "Partner confirmations", text: "Logo use approved for this prototype on 8 Oct 2026; icons are cropped from each partner's logo. Still needed: written confirmation of each partner relationship, especially Cornerstone OnDemand and Keheilan." },
    { id: "n-people", target: "people", title: "Expert network", text: "Photos, bios and LinkedIn links for all eight people. Staff or network?" },
    { id: "n-cases", target: "work", title: "Case studies", text: "Both are “illustrative” in the profile. Confirm they are real and consented. Case 1 needs a measured result, and it is GEO work, which now sits with Growthino in Growth 360." },
    { id: "n-clients", target: "clients", title: "Client names and logos", text: "Permission to name and show the logos of all eight organizations, with explicit confirmation from the Ministry. The logos are cut from the supplied client sheet; white or monochrome versions would sit better on navy." },
    { id: "n-work-photos", target: "work", title: "Engagement card photos", text: "The organizational development card uses a stand-in boardroom image until its own photo arrives. The furniture card uses the supplied living-room photo." },
    { id: "n-illustrative", target: "case-3", title: "Illustrative engagement card", text: "The market-entry card is a concept placeholder, labelled “Illustrative example”. It names no client, makes no delivery claim and has no case-study link. Replace or remove it once a real, consented engagement is available." },
    { id: "n-insights", target: "insights", title: "Insights", text: "Hub topic and title still to decide. The featured Delegation of Authority article needs approved text and a named reviewer before publishing. Its Fouad Darwish author credit and one-line description are provisional until confirmed. The card and topics link to the Insights listing until article and topic pages exist." },
    { id: "n-founder-photo", target: "founder", title: "Founder portrait", text: "The contact section uses the portrait from the Founder’s Message page of the profile deck. It differs from the headshot saved in the website project as fouad-darwish.webp, so please confirm it is Fouad Darwish and approved for the website." },
    { id: "n-contact-photo", target: "contact", title: "Contact photo", text: "The contact section shows a placeholder until a real photograph of the office meeting table is supplied (founder report, Marker 9)." },
    { id: "n-form", target: "contact", title: "Contact form", text: "The form validates and shows the approved confirmation message, but sending is simulated in this prototype. Phase 3 connects it to the real contact system and tests a live enquiry." },
    { id: "n-social", target: "contact", title: "Social and portal links", text: "LinkedIn, Facebook, Instagram and X links are placeholders until the official account addresses are confirmed; hide any platform without an active account. Confirm the client portal address." },
    { id: "n-photos", target: "work", title: "Photography", text: "Real photos of Egyptian or MENA work settings to fill the labelled image slots." },
    { id: "n-stats", target: "challenges", title: "Challenge statistics", text: "The 42%, 32% and 81% figures come from McKinsey, PwC and PMI. Check each figure and wording against its linked source before launch. They are international research findings, not Darwish results." },
    { id: "n-ch-photos", target: "challenges", title: "Challenge photographs", text: "The photographs are illustrative, not real clients, staff or projects. The port and interchange are AI-generated; the strategy photo is a stock-style image, so confirm its licence. Consider real photography over time." },
    { id: "n-video", target: "hero", title: "Hero video", text: "The background clip shows a generic international skyline. The brand guide asks for credible Egyptian or MENA settings, so consider a Cairo or New Cairo clip. It is trimmed to 10 seconds at 720p for this preview." }
  ];

  window.PAGE_INITS.push(function () {
  // Moving rows in "Our work". Each row keeps its original items in the middle of the track with inert,
  // aria-hidden copies on both sides, and drifts at a fixed px/s. Hover or keyboard focus pauses it;
  // dragging, touch and horizontal wheel/trackpad move it by hand. Reduced motion keeps only the manual part.
  (function () {
    var reduce = matchMedia("(prefers-reduced-motion: reduce)");
    Array.prototype.forEach.call(document.querySelectorAll(".mq"), function (vp) {
      var track = vp.querySelector(".mq-track");
      var originals = Array.prototype.slice.call(track.children);
      var speed = parseFloat(vp.dataset.speed) || 16, dir = parseFloat(vp.dataset.dir) || 1;
      var setWidth = 0, offset = 0, last = 0, raf = 0;
      var hovering = false, focused = false, dragging = false, onScreen = false;

      function makeClone(node) {
        var c = node.cloneNode(true);
        c.setAttribute("aria-hidden", "true");
        c.setAttribute("inert", "");
        c.querySelectorAll("[id]").forEach(function (el) { el.removeAttribute("id"); });
        c.querySelectorAll("a").forEach(function (a) { a.setAttribute("tabindex", "-1"); });
        c.querySelectorAll("img").forEach(function (img) { img.alt = ""; img.loading = "eager"; });
        return c;
      }
      function build() {
        track.querySelectorAll(":scope > [aria-hidden='true']").forEach(function (n) { n.remove(); });
        // one full set before the originals...
        originals.slice().reverse().forEach(function (n) { track.insertBefore(makeClone(n), track.firstChild); });
        // ...and enough after them to cover the widest screen twice
        originals.forEach(function (n) { track.appendChild(makeClone(n)); });
        setWidth = originals[0].offsetLeft - track.children[0].offsetLeft;
        var copies = Math.ceil((vp.clientWidth * 2) / Math.max(setWidth, 1));
        for (var i = 0; i < copies; i++) originals.forEach(function (n) { track.appendChild(makeClone(n)); });
        render();
      }
      function wrap() { if (!focused && setWidth) { offset = ((offset % setWidth) + setWidth) % setWidth; } }
      function render() { track.style.transform = "translate3d(" + (-(setWidth + offset)) + "px,0,0)"; }
      function moving() { return !reduce.matches && !hovering && !focused && !dragging; }
      function tick(t) {
        var dt = last ? Math.min((t - last) / 1000, .05) : 0; last = t;
        if (moving()) { offset += speed * dir * dt; wrap(); render(); }
        raf = requestAnimationFrame(tick);
      }
      function start() { if (!raf && onScreen && !document.hidden) { last = 0; raf = requestAnimationFrame(tick); } }
      function stop() { if (raf) cancelAnimationFrame(raf); raf = 0; }
      function sync() { (onScreen && !document.hidden) ? start() : stop(); }

      vp.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") hovering = true; });
      vp.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") hovering = false; });

      // Keyboard focus pauses the row and brings the focused card fully into view.
      vp.addEventListener("focusin", function (e) {
        focused = true; vp.scrollLeft = 0;
        var item = e.target.closest(".wcard"); if (!item) return;
        var left = item.offsetLeft - track.children[0].offsetLeft - setWidth;   // position within the original set
        var target = left - (vp.clientWidth - item.offsetWidth) / 2;
        offset = Math.max(-setWidth, target); render();
      });
      vp.addEventListener("focusout", function (e) { if (!vp.contains(e.relatedTarget)) { focused = false; wrap(); render(); } });

      // Drag with mouse, pen or touch; a drag never fires the card link.
      var startX = 0, startOffset = 0, moved = false;
      vp.addEventListener("pointerdown", function (e) {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        dragging = true; moved = false; startX = e.clientX; startOffset = offset;
      });
      window.addEventListener("pointermove", function (e) {
        if (!dragging) return;
        var dx = e.clientX - startX;
        if (!moved && Math.abs(dx) > 6) { moved = true; vp.classList.add("is-dragging"); try { vp.setPointerCapture(e.pointerId); } catch (_) {} }
        if (moved) { offset = startOffset - dx; wrap(); render(); }
      });
      function endDrag() { if (!dragging) return; dragging = false; vp.classList.remove("is-dragging"); }
      window.addEventListener("pointerup", endDrag);
      window.addEventListener("pointercancel", endDrag);
      vp.addEventListener("click", function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
      vp.addEventListener("dragstart", function (e) { e.preventDefault(); });

      // Horizontal wheel or trackpad browsing; vertical scrolling passes through to the page.
      vp.addEventListener("wheel", function (e) {
        if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
        e.preventDefault(); offset += e.deltaX; wrap(); render();
      }, { passive: false });

      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) { onScreen = entries[0].isIntersecting; sync(); }).observe(vp);
      } else { onScreen = true; }
      document.addEventListener("visibilitychange", sync);
      window.addEventListener("pagehide", stop);
      var resizeTimer;
      window.addEventListener("resize", function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(build, 200); });
      build(); sync();
    });
  })();

  });
  window.PAGE_INITS.push(function () {
  // Growth 360 headline: a new word every 1000 ms (700 ms readable, 300 ms flip). 360 stays put.
  // The word folds flat around its horizontal centre, swaps at the midpoint, then unfolds; it never passes 90 degrees,
  // so mirrored text is never visible. Stops offscreen or in a hidden tab; never runs with reduced motion.
  (function () {
    var root = document.getElementById("g360");
    var el = root && root.querySelector(".flip-word");
    if (!el || !el.animate) return;
    var WORDS = ["Growth", "Diagnose", "Understand", "Strategy", "Activate", "Optimize"];
    var HOLD = 700, HALF = 150;
    var reduce = matchMedia("(prefers-reduced-motion: reduce)");
    var index = 0, timer = null, flipping = false, onScreen = false;
    var P = "perspective(500px) ";

    function flip() {
      flipping = true;
      var out = el.animate(
        [{ transform: P + "rotateX(0deg)", opacity: 1 }, { transform: P + "rotateX(88deg)", opacity: .6 }],
        { duration: HALF, easing: "cubic-bezier(.45, 0, .85, .55)", fill: "forwards" });
      out.onfinish = function () {
        index = (index + 1) % WORDS.length;
        el.textContent = WORDS[index];
        var inn = el.animate(
          [{ transform: P + "rotateX(-88deg)", opacity: .6 }, { transform: P + "rotateX(0deg)", opacity: 1 }],
          { duration: HALF, easing: "cubic-bezier(.15, .45, .55, 1)", fill: "forwards" });
        out.cancel();
        inn.onfinish = function () { inn.cancel(); flipping = false; schedule(); };
      };
    }
    function running() { return !reduce.matches && onScreen && !document.hidden; }
    function schedule() { clearTimeout(timer); timer = running() ? setTimeout(flip, HOLD) : null; }
    function sync() {
      if (reduce.matches) { clearTimeout(timer); timer = null; index = 0; el.textContent = WORDS[0]; return; }
      if (!flipping) schedule();
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) { onScreen = entries[0].isIntersecting; sync(); });
      io.observe(root);
    } else { onScreen = true; }
    document.addEventListener("visibilitychange", sync);
    if (reduce.addEventListener) reduce.addEventListener("change", sync);
    window.addEventListener("pagehide", function () { clearTimeout(timer); if (io) io.disconnect(); });
    sync();
  })();

  });
  window.PAGE_INITS.push(function () {
  // Contact form (prototype): checks the four fields, then simulates sending. On success the form is replaced by the
  // founder's confirmation message; on failure the visitor's text stays in place. Real delivery is wired up in Phase 3.
  (function () {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var ok = document.getElementById("cf-success");
    var status = form.querySelector(".cf-status");
    var btn = form.querySelector('button[type="submit"]');
    var rules = {
      "cf-name": function (v) { return v ? "" : "Please enter your name."; },
      "cf-company": function (v) { return v ? "" : "Please enter your company or organization."; },
      "cf-contact": function (v) {
        if (!v) return "Please enter an email address or phone number.";
        var email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), phone = /^\+?[\d\s()-]{7,}$/.test(v);
        return email || phone ? "" : "Enter a valid email address or a phone number with at least 7 digits.";
      },
      "cf-challenge": function (v) { return v.length >= 10 ? "" : "Please describe your challenge in a sentence or two."; }
    };
    function check(id) {
      var el = document.getElementById(id), err = document.getElementById(id + "-err");
      var msg = rules[id](el.value.trim());
      el.setAttribute("aria-invalid", msg ? "true" : "false");
      err.textContent = msg; err.hidden = !msg;
      return !msg;
    }
    Object.keys(rules).forEach(function (id) {
      document.getElementById(id).addEventListener("blur", function () { if (this.getAttribute("aria-invalid")) check(id); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = null;
      Object.keys(rules).forEach(function (id) { if (!check(id) && !firstBad) firstBad = document.getElementById(id); });
      if (firstBad) { status.className = "cf-status is-error"; status.textContent = "Please check the highlighted fields."; firstBad.focus(); return; }
      btn.disabled = true; status.className = "cf-status"; status.textContent = "Sending…";
      setTimeout(function () {
        btn.disabled = false;
        if (navigator.onLine === false) {
          status.className = "cf-status is-error";
          status.textContent = "We couldn’t send your request. Please check your connection and try again. Your details are still in the form.";
          return;
        }
        status.textContent = "";
        form.hidden = true; ok.hidden = false; ok.focus();
      }, 900);
    });
  })();

  });
  window.PAGE_INITS.push(function () {
  // Hero video: plays muted on loop; visitors who prefer reduced motion see the still poster instead.
  var video = document.querySelector(".hero-media");
  if (video && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
  }
  });
  // Social links are placeholders until the official account addresses are confirmed (delegated, so swapped footers work too).
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-pending]");
    if (!a) return;
    e.preventDefault();
    var t = document.querySelector(".toast");
    t.textContent = "The official " + a.dataset.pending + " link will be added once the account address is confirmed.";
    t.hidden = false; clearTimeout(t._timer); t._timer = setTimeout(function () { t.hidden = true; }, 3500);
  });
  var list = document.getElementById("notes");
  function flash(el) { el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash"); }
  NOTES.forEach(function (n) {
    var li = document.createElement("li");
    li.id = n.id;
    li.innerHTML = "<h3></h3><p></p><button type='button'>Show on page</button>";
    li.querySelector("h3").textContent = n.title;
    li.querySelector("p").textContent = n.text;
    li.querySelector("button").addEventListener("click", function () {
      closeReview(false);
      var el = document.getElementById(n.target);
      if (!el) return;
      el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
      flash(el);
    });
    list.appendChild(li);
  });
  document.querySelector(".review-fab .count").textContent = NOTES.length;

  var drawer = document.querySelector(".drawer"), scrim = document.querySelector(".scrim"), lastFocus = null;
  function openReview(noteId) {
    lastFocus = document.activeElement;
    drawer.hidden = false; scrim.hidden = false;
    var t = noteId && document.getElementById(noteId);
    if (t) { t.scrollIntoView({ block: "nearest" }); flash(t); }
    drawer.querySelector("[data-close-review]").focus();
  }
  function closeReview(restore) {
    drawer.hidden = true; scrim.hidden = true;
    if (restore !== false && lastFocus) lastFocus.focus();
  }
  document.querySelectorAll("[data-open-review]").forEach(function (b) { b.addEventListener("click", function () { openReview(); }); });
  document.querySelectorAll("button.pending[data-note]").forEach(function (b) {
    b.setAttribute("aria-label", "Pending: " + b.textContent + ". Open review note");
    b.addEventListener("click", function () { openReview(b.getAttribute("data-note")); });
  });
  drawer.querySelector("[data-close-review]").addEventListener("click", function () { closeReview(); });
  scrim.addEventListener("click", function () { closeReview(); });

  // Header state: transparent over the hero, navy glass after 64px, opaque navy while the mobile menu is open.
  // Re-evaluated on load, scroll, resize, back/forward restore and anchor jumps.
  var header = document.querySelector(".site-header");
  var hasDarkHero = !!document.querySelector(".hero, .page-hero");
  var queued = false;
  function updateHeader() {
    queued = false;
    hasDarkHero = !!document.querySelector(".hero, .page-hero");
    header.classList.toggle("is-solid", !hasDarkHero);
    if (!hasDarkHero) return;
    header.classList.toggle("is-scrolled", window.scrollY > 64);
  }
  function queueHeader() { if (!queued) { queued = true; requestAnimationFrame(updateHeader); } }
  window.addEventListener("scroll", queueHeader, { passive: true });
  window.addEventListener("resize", queueHeader);
  window.addEventListener("pageshow", updateHeader);
  window.addEventListener("hashchange", updateHeader);
  window.addEventListener("load", updateHeader);
  // A 1px marker 64px down the page: an observer reports whenever it leaves or re-enters the viewport,
  // including scroll positions restored without a scroll event.
  if ("IntersectionObserver" in window) {
    var marker = document.createElement("div");
    marker.setAttribute("aria-hidden", "true");
    marker.style.cssText = "position:absolute;top:64px;left:0;width:1px;height:1px;pointer-events:none;";
    document.body.prepend(marker);
    new IntersectionObserver(function () { updateHeader(); }).observe(marker);
  }
  updateHeader();

  var toggles = Array.prototype.slice.call(document.querySelectorAll(".nav-toggle"));
  function setMenu(btn, open) {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    document.getElementById(btn.getAttribute("aria-controls")).hidden = !open;
  }
  toggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") !== "true";
      toggles.forEach(function (t) { if (t !== btn) setMenu(t, false); });
      setMenu(btn, open);
    });
    btn.parentElement.addEventListener("focusout", function (e) {
      if (!btn.parentElement.contains(e.relatedTarget)) setMenu(btn, false);
    });
  });
  document.addEventListener("click", function (e) {
    toggles.forEach(function (t) { if (!t.parentElement.contains(e.target)) setMenu(t, false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!drawer.hidden) { closeReview(); return; }
    toggles.forEach(function (t) { if (t.getAttribute("aria-expanded") === "true") { setMenu(t, false); t.focus(); } });
  });

  var menuBtn = document.querySelector(".menu-button"), mobileNav = document.getElementById("mobile-nav");
  var menuLabel = menuBtn.lastChild;   // the text node after the icon
  function setMobileMenu(open, returnFocus) {
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    mobileNav.hidden = !open;
    menuLabel.textContent = open ? " Close" : " Menu";
    header.classList.toggle("is-menu-open", open);
    if (!open) { updateHeader(); if (returnFocus) menuBtn.focus(); }
  }
  menuBtn.addEventListener("click", function () { setMobileMenu(menuBtn.getAttribute("aria-expanded") !== "true"); });
  // Escape closes the mobile menu; widening to the desktop layout closes it too.
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !mobileNav.hidden) setMobileMenu(false, true); });
  var desktopNav = matchMedia("(min-width: 1080px)");
  var onDesktop = function () { if (desktopNav.matches && !mobileNav.hidden) setMobileMenu(false); };
  if (desktopNav.addEventListener) desktopNav.addEventListener("change", onDesktop);
  document.querySelectorAll(".m-acc").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      document.getElementById(btn.getAttribute("aria-controls")).hidden = !open;
    });
  });

  var toast = document.querySelector(".toast"), timer;
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href^='/']");
    if (!a) return;
    e.preventDefault();
    var href = a.getAttribute("href");
    if (href === "/") { window.scrollTo({ top: 0 }); return; }
    toast.innerHTML = "This prototype does not include this page. On the live site it opens <code></code>";
    toast.querySelector("code").textContent = "darwish-co.com" + href;
    toast.hidden = false;
    clearTimeout(timer);
    timer = setTimeout(function () { toast.hidden = true; }, 3500);
    if (!mobileNav.hidden) setMobileMenu(false);
    toggles.forEach(function (t) { setMenu(t, false); });
  });

  // In-viewer navigation (prototype only). Active only inside the claude.ai artifact frame.
  if (/claudeusercontent\.com$/.test(location.hostname) && window.fetch && window.DOMParser) {
    var internal = /^(\.\/|[\w-]+\.html)(#[\w-]*)?$/;
    function swapTo(href, push) {
      var parts = href.split("#"), path = parts[0] || "./", hash = parts[1] || "";
      fetch(path, { credentials: "same-origin" }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); }).then(function (text) {
        var doc = new DOMParser().parseFromString(text, "text/html");
        var newMain = doc.querySelector("main"), oldMain = document.querySelector("main");
        if (!newMain || !oldMain) throw new Error("no main");
        oldMain.replaceWith(document.importNode(newMain, true));
        var nf = doc.querySelector(".site-footer"), of = document.querySelector(".site-footer");
        if (nf && of) of.innerHTML = nf.innerHTML;
        var t = doc.querySelector("title"); if (t) document.title = t.textContent;
        // carry over the current-section markers in the header
        document.querySelectorAll(".site-header .nav-link").forEach(function (a) {
          var twin = doc.querySelector('.site-header .nav-link[href="' + a.getAttribute("href") + '"]');
          if (twin && twin.hasAttribute("aria-current")) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
        });
        document.querySelectorAll(".site-header .nav-toggle").forEach(function (b) {
          var twin = doc.querySelector('.site-header .nav-toggle[aria-controls="' + b.getAttribute("aria-controls") + '"]');
          b.classList.toggle("is-current", !!(twin && twin.classList.contains("is-current")));
        });
        if (!mobileNav.hidden) setMobileMenu(false);
        toggles.forEach(function (tg) { setMenu(tg, false); });
        window.__routeHash = hash;
        window.PAGE_INITS.forEach(function (f) { try { f(); } catch (err) { console.error(err); } });
        var target = hash && document.getElementById(hash);
        if (target && !document.querySelector(".topic-filter")) { target.scrollIntoView(); } else { window.scrollTo(0, 0); }
        var h1 = document.querySelector("main h1");
        if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
        updateHeader();
        if (push) { try { history.pushState({ href: href }, ""); } catch (err) {} }
      }).catch(function () {
        toast.textContent = "This page could not be loaded in the preview.";
        toast.hidden = false; clearTimeout(timer); timer = setTimeout(function () { toast.hidden = true; }, 3500);
      });
    }
    try { history.replaceState({ href: "./" }, ""); } catch (err) {}
    window.addEventListener("popstate", function (e) { if (e.state && e.state.href) swapTo(e.state.href, false); });
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || a.target === "_blank") return;
      var href = a.getAttribute("href");
      if (!internal.test(href)) return;
      e.preventDefault();
      swapTo(href, true);
    });
  }
})();

// Insights listing: topic buttons filter the article cards; the address hash (#governance) preselects a topic.
window.PAGE_INITS.push(function () {
  var bar = document.querySelector(".topic-filter");
  if (!bar) return;
  var buttons = Array.prototype.slice.call(bar.querySelectorAll("button"));
  var cards = Array.prototype.slice.call(document.querySelectorAll(".in-card[data-topic]"));
  var empty = document.getElementById("topic-empty"), count = document.getElementById("topic-count");
  var known = (bar.getAttribute("data-topics") || "").split(" ");
  function apply(topic) {
    var shown = 0, label = "";
    buttons.forEach(function (b) { var on = b.dataset.value === topic; b.setAttribute("aria-pressed", on ? "true" : "false"); if (on && topic !== "all") label = b.textContent; });
    cards.forEach(function (c) { var on = topic === "all" || c.dataset.topic === topic; c.hidden = !on; if (on) shown++; });
    empty.hidden = shown > 0;
    if (!label && topic !== "all") label = topic.charAt(0).toUpperCase() + topic.slice(1);
    count.textContent = shown + (shown === 1 ? " article" : " articles") + (label ? " in " + label : "");
  }
  buttons.forEach(function (b) { b.addEventListener("click", function () { apply(b.dataset.value); }); });
  var reset = document.querySelector("[data-reset]");
  if (reset) reset.addEventListener("click", function () { apply("all"); bar.querySelector('[data-value="all"]').focus(); });
  var start = (window.__routeHash || location.hash || "").slice(1); window.__routeHash = "";
  apply(known.indexOf(start) > -1 ? start : "all");
});

// Service-detail template: tabs (journey stages, engagement examples), disclosure buttons and the contact form.
window.PAGE_INITS.push(function () {
  var root = document.querySelector(".sx");
  if (!root) return;
  root.querySelectorAll("[data-tabs]").forEach(function (box) {
    var tabs = Array.prototype.slice.call(box.querySelectorAll('[role="tab"]'));
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        // data-stack: every panel stays in the page (stacked on phones); desktop CSS hides the inactive ones
        if (box.hasAttribute("data-stack")) panel.classList.toggle("is-off", !on); else panel.hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t, false); });
      t.addEventListener("keydown", function (e) {
        var n = null, k = e.key, last = tabs.length - 1;
        if (k === "ArrowRight" || k === "ArrowDown") n = tabs[i === last ? 0 : i + 1];
        else if (k === "ArrowLeft" || k === "ArrowUp") n = tabs[i === 0 ? last : i - 1];
        else if (k === "Home") n = tabs[0];
        else if (k === "End") n = tabs[last];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
  });
  root.querySelectorAll("[data-disclose]").forEach(function (b) {
    b.addEventListener("click", function () {
      var open = b.getAttribute("aria-expanded") === "true";
      b.setAttribute("aria-expanded", open ? "false" : "true");
      document.getElementById(b.getAttribute("aria-controls")).hidden = open;
      var label = b.querySelector(".sx-dl");
      if (label && b.dataset.open) label.textContent = open ? b.dataset.closed : b.dataset.open;
    });
  });
  // Contact forms (prototype): validate, then state plainly that nothing was sent. Real delivery is a production task.
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, PHONE = /^\+?[\d\s()-]{7,}$/;
  function problem(el) {
    var v = el.value.trim(), r = el.dataset.rule;
    if (!v) return el.required ? el.dataset.empty : "";
    if (r === "email") return EMAIL.test(v) ? "" : "Enter an email address like name@company.com.";
    if (r === "phone") return PHONE.test(v) ? "" : "Enter a phone number with at least 7 digits, or leave it blank.";
    if (r === "long") return v.length >= 10 ? "" : el.dataset.empty;
    return "";
  }
  root.querySelectorAll(".sx-form").forEach(function (form) {
    var status = form.querySelector(".sx-status");
    var fields = Array.prototype.slice.call(form.querySelectorAll("[data-rule]"));
    function check(el) {
      var msg = problem(el), err = document.getElementById(el.id + "-err");
      el.setAttribute("aria-invalid", msg ? "true" : "false");
      err.textContent = msg; err.hidden = !msg;
      return !msg;
    }
    fields.forEach(function (el) { el.addEventListener("blur", function () { if (el.hasAttribute("aria-invalid")) check(el); }); });
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var first = null;
      fields.forEach(function (el) { if (!check(el) && !first) first = el; });
      status.hidden = false;
      if (first) {
        status.className = "sx-status is-error";
        status.textContent = "Please check the highlighted fields.";
        first.focus();
        return;
      }
      status.className = "sx-status";
      status.innerHTML = "<strong>Preview only: no message was sent.</strong> This form is not connected yet. To reach Darwish &amp; Co. now, email <a href=\"mailto:info@darwish-co.com\">info@darwish-co.com</a> or call <a href=\"tel:+201101101090\">+20 110 110 1090</a>. Your details are still in the form.";
      status.focus();
    });
  });
});
// Homepage figures count up from zero when they scroll into view (once). Reduced motion or no observer: final numbers stay.
window.PAGE_INITS.push(function () {
  var figs = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
  if (!figs.length || !("IntersectionObserver" in window)) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  function run(el, delay) {
    var out = el.querySelector(".count"), end = parseInt(el.getAttribute("data-count"), 10), dur = 1600, t0 = null;
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
      out.textContent = String(Math.round(end * eased));
      if (p < 1) requestAnimationFrame(step); else finish();
    }
    function finish() { if (el.classList.contains("is-counted")) return; out.textContent = String(end); el.classList.add("is-counted"); }
    setTimeout(function () { requestAnimationFrame(step); }, delay);
    setTimeout(finish, delay + dur + 400);   // the true number always lands, even if frames are throttled
  }
  var io = new IntersectionObserver(function (entries) {
    var shown = entries.filter(function (en) { return en.isIntersecting; });
    shown.forEach(function (en, i) { io.unobserve(en.target); run(en.target, i * 150); });
  }, { threshold: 0.5 });
  figs.forEach(function (el) { el.querySelector(".count").textContent = "0"; io.observe(el); });
});
// Run this page's interactive parts once on load (the router re-runs them after each swap).
window.PAGE_INITS.forEach(function (f) { try { f(); } catch (err) { console.error(err); } });
