/* Ahmad Adil Irfan — portfolio */
(() => {
  // ---------- data ----------
  // media: "video" = looping clip in media/<id>.mp4, "image" = still in media/<id>.jpg, otherwise an animated title card.
  const PROJECTS = [
    { id: "shopback", title: "Shopback Stopfest Ads", client: "Shopback", role: "Producer", cat: "Advertising", media: "video", links: ["yt:UFjzMxvCmJU", "yt:gamxeoZtza0", "yt:rYQvNahbjRw", "yt:XtgLj0FpZtM", "yt:Rp41imkvyOA", "yt:57hRxAvpC0o"], eps: "Spot" },
    { id: "mcd-curry", title: "McDonald's Curry Burger Ad", client: "McDonald's", role: "Producer / Assistant Director", cat: "Advertising", media: "video", links: ["yt:HxonOg6PnsU"] },
    { id: "pokka", title: "Pokka Hojicha Ad", client: "Pokka", role: "Producer", cat: "Advertising", media: "video", links: ["fb:https://www.facebook.com/273815096028264/videos/477199456255420/"] },
    { id: "mccy", title: "MCCY SG Cares App", client: "MCCY", role: "Assistant Producer", cat: "Advertising", media: "video", links: ["yt:2Yh4UkfHoeQ"] },
    { id: "far-east", title: "Far East Hospitality: Roam with Rendezvous", client: "Far East Hospitality", role: "Writer / Director", cat: "Corporate", media: "video", links: ["yt:8Te_XxJ_7Es", "yt:IQ99wA6cD3k", "yt:fbjWgZVYqbo"], eps: "Ep." },
    { id: "marigold", title: "Marigold Peel Fresh Taste Test Ad", client: "Marigold", role: "Producer", cat: "Advertising", media: "video", links: ["yt:4jzzNz4wxxo"] },
    { id: "pdpc", title: "PDPC 5th Year Anniversary Milestones Video", client: "PDPC", role: "Director", cat: "Corporate", media: "video", links: ["yt:2X6j869ggU8"] },
    { id: "mcd-kitty", title: "McDonald's Hello Kitty Carrier", client: "McDonald's", role: "Producer", cat: "Advertising", media: "video", links: ["yt:A9LwUqneM10"] },
    { id: "nyc-asean", title: "National Youth Council: ASEAN Youth Fellowship 2019", client: "National Youth Council", role: "Producer", cat: "Corporate", media: "video", links: ["yt:4vWzSNAPTlk"] },
    { id: "emirates-spotify", title: "Emirates × Spotify Jazz in Singapore", client: "Emirates × Spotify", role: "DOP", cat: "Corporate", media: "image", links: ["vm:242720087"] },
    { id: "sentosa", title: "Sentosa Bright Nights Ad", client: "Sentosa", role: "Producer", cat: "Advertising", media: "image", links: ["vm:237548779"] },
    { id: "robinsons", title: "Robinsons Family Portrait", client: "Robinsons", role: "DOP", cat: "Corporate", media: "image", links: ["vm:268001234"] },
    { id: "visa-soweto", title: "Visa Merchant Stories: Soweto Bicycle Tours", client: "Visa", role: "Producer / Camera Operator", cat: "Corporate", links: ["vm:211190573"], hue: 225 },
    { id: "visa-abseil", title: "Visa Merchant Stories: Abseil Africa", client: "Visa", role: "Producer / Camera Operator", cat: "Corporate", links: ["vm:209088434"], hue: 215 },
    { id: "google-jakarta", title: "Google Mobile Jakarta", client: "Google", role: "Director / Producer", cat: "Corporate", links: ["vm:204319692"], hue: 140 },
    { id: "grab-mitha", title: "Grab Indonesia: Kartini Stories — Mitha", client: "Grab", role: "Producer / Director", cat: "Corporate", links: ["vm:281597461"], hue: 150 },
    { id: "grab-aang", title: "Grab Indonesia: Driver Stories — Pak Aang", client: "Grab", role: "Producer / Director", cat: "Corporate", links: ["vm:272157596"], hue: 160 },
    { id: "muji", title: "Muji: Christmas with Children's Cancer Foundation", client: "Muji", role: "Writer / Director", cat: "Corporate", links: ["vm:243090186"], hue: 0 },
    { id: "mvisa-kenya", title: "mVisa Kenya Onboarding Video", client: "Visa", role: "Director / Producer", cat: "Corporate", links: ["vm:281596365"], hue: 35 },
    { id: "samsung-nx", title: "Samsung NX Traveller Korea", client: "Samsung", role: "Producer", cat: "Corporate", links: ["vm:207284726"], hue: 205 },
    { id: "motul-lemas", title: "Motul Lemas Documentary", client: "Motul", role: "Producer", cat: "Corporate", links: ["vm:205503932"], hue: 355 },
    { id: "motul-stunt", title: "Motul Stunt City", client: "Motul", role: "2nd Camera Operator", cat: "Corporate", links: ["vm:207284664"], hue: 10 },
    { id: "dbs", title: "DBS: Live Your Dream", client: "DBS", role: "2nd Camera Operator", cat: "Corporate", links: ["vm:188817440"], hue: 350 },
    { id: "skoda", title: "Skoda Activation Video", client: "Skoda", role: "2nd Camera Operator", cat: "Corporate", links: ["vm:285776747"], hue: 120 },
    { id: "paragon", title: "Paragon × Tell Your Children: Monkey Business", client: "Paragon", role: "Producer / Camera Operator", cat: "Corporate", links: ["vm:157136674"], hue: 280 },
  ];
  const FEATURED = PROJECTS.filter((p) => p.media);

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const pad = (n, l = 2) => String(n).padStart(l, "0");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = typeof window.gsap !== "undefined";

  // ---------- media builders ----------
  function mediaHTML(p, { eager = false } = {}) {
    if (p.media === "video") {
      return `<video data-src="media/${p.id}.mp4" poster="media/${p.id}.jpg" muted loop playsinline preload="none"${eager ? " data-eager" : ""}></video>`;
    }
    if (p.media === "image") {
      return `<img class="kb" src="media/${p.id}.jpg" alt="" loading="lazy">`;
    }
    return `<div class="tcard" style="--h:${p.hue ?? 20}"><span>${p.client}</span></div>`;
  }

  // ---------- featured reel ----------
  const reel = $(".js-reel");
  reel.innerHTML = FEATURED.map((p, i) => `
    <article class="card" data-play="${p.id}" tabindex="0" role="button" aria-label="Play ${p.title}">
      <div class="card__media">
        ${mediaHTML(p)}
        <span class="card__no mono">${pad(i + 1)} / ${pad(FEATURED.length)}</span>
        <span class="card__tag mono">${p.cat}</span>
      </div>
      <div class="card__info">
        <h3 class="card__title">${p.title}</h3>
        <span class="card__role mono">${p.role}</span>
      </div>
    </article>`).join("");

  // ---------- index ----------
  const list = $(".js-index");
  list.innerHTML = PROJECTS.map((p, i) => `
    <li class="row" data-play="${p.id}" data-cat="${p.cat}" tabindex="0" role="button" aria-label="Play ${p.title}">
      <span class="row__no mono">${pad(i + 1)}</span>
      <span class="row__title">${p.title}</span>
      <span class="row__client">${p.client}</span>
      <span class="row__role mono">${p.role}</span>
      <span class="row__type mono">${p.cat}</span>
    </li>`).join("");
  $(".js-count-all").textContent = PROJECTS.length;
  ["Corporate", "Advertising"].forEach((c) => ($(`.js-count-${c}`).textContent = PROJECTS.filter((p) => p.cat === c).length));

  $$(".filter").forEach((btn) => btn.addEventListener("click", () => {
    $$(".filter").forEach((b) => b.classList.toggle("is-active", b === btn));
    const f = btn.dataset.filter;
    $$(".row").forEach((r) => r.classList.toggle("is-hidden", f !== "all" && r.dataset.cat !== f));
    if (hasGsap) {
      gsap.fromTo($$(".row:not(.is-hidden)"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.03, duration: 0.5, ease: "power3.out" });
      ScrollTrigger.refresh();
    }
  }));

  // ---------- lazy loop playback ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target: v, isIntersecting }) => {
      if (isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        v.play().catch(() => {});
      } else v.pause();
    });
  }, { rootMargin: "200px 0px" });
  $$("video[data-src]").forEach((v) => io.observe(v));

  // ---------- peek (hover preview in index) ----------
  const peek = $(".peek"), peekInner = $(".js-peek");
  const canHover = matchMedia("(hover: hover)").matches;
  if (canHover) {
    let px = 0, py = 0, cx = 0, cy = 0;
    window.addEventListener("mousemove", (e) => { px = e.clientX; py = e.clientY; });
    (function loop() {
      cx += (px - cx) * 0.14; cy += (py - cy) * 0.14;
      peek.style.translate = `${cx}px ${cy}px`;
      requestAnimationFrame(loop);
    })();
    $$(".row").forEach((row) => {
      row.addEventListener("mouseenter", () => {
        const p = PROJECTS.find((x) => x.id === row.dataset.play);
        peekInner.innerHTML = mediaHTML(p).replace('data-src=', 'autoplay src=').replace(' preload="none"', "");
        const v = $("video", peekInner); if (v) v.play().catch(() => {});
        peek.classList.add("is-on");
      });
      row.addEventListener("mouseleave", () => peek.classList.remove("is-on"));
    });
  }

  // ---------- player ----------
  const player = $(".player"), screen = $(".js-p-screen"), eps = $(".js-p-eps"), ext = $(".js-p-ext");
  let lastFocus = null;
  function embed(link) {
    const [type, ...rest] = link.split(":"); const id = rest.join(":");
    if (type === "yt") return { src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`, url: `https://www.youtube.com/watch?v=${id}` };
    if (type === "vm") return { src: `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1&title=0&byline=0`, url: `https://vimeo.com/${id}` };
    return { src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(id)}&show_text=false&autoplay=true`, url: id };
  }
  function show(link) {
    const e = embed(link);
    screen.innerHTML = `<iframe src="${e.src}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen title="Video"></iframe>`;
    ext.href = e.url;
    ext.textContent = link.startsWith("vm:") ? "Password protected? Watch on Vimeo / request access ↗" : "Open original ↗";
  }
  function openPlayer(id) {
    const p = PROJECTS.find((x) => x.id === id); if (!p) return;
    lastFocus = document.activeElement;
    $(".js-p-title").textContent = p.title;
    $(".js-p-meta").textContent = `${p.client} — ${p.role}`;
    eps.innerHTML = p.links.length > 1 ? p.links.map((l, i) => `<button data-l="${l}" class="${i ? "" : "is-active"}">${p.eps || "Part"} ${i + 1}</button>`).join("") : "";
    $$("button", eps).forEach((b) => b.addEventListener("click", () => {
      $$("button", eps).forEach((x) => x.classList.toggle("is-active", x === b)); show(b.dataset.l);
    }));
    show(p.links[0]);
    player.hidden = false;
    lenis && lenis.stop();
    if (hasGsap) gsap.fromTo(".player__frame", { y: 40, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" });
    $(".player__close").focus();
  }
  function closePlayer() {
    player.hidden = true; screen.innerHTML = "";
    lenis && lenis.start();
    lastFocus && lastFocus.focus();
  }
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-play]"); if (t && !dragMoved) openPlayer(t.dataset.play);
    if (e.target.closest(".js-close")) closePlayer();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !player.hidden) closePlayer();
    if (e.key === "Enter" && e.target.matches("[data-play]")) openPlayer(e.target.dataset.play);
  });

  // ---------- statement words ----------
  const st = $(".js-words");
  st.innerHTML = st.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(" ");

  // ---------- hero timecode ----------
  const heroVid = $(".hero__video"), tc = $(".js-tc");
  (function tick() {
    const t = heroVid.currentTime || 0;
    tc.textContent = `00:${pad(Math.floor(t / 60))}:${pad(Math.floor(t % 60))}:${pad(Math.floor((t % 1) * 24))}`;
    requestAnimationFrame(tick);
  })();

  // ---------- cursor ----------
  const cursor = $(".cursor");
  if (canHover && hasGsap) {
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
    window.addEventListener("mousemove", (e) => { xTo(e.clientX); yTo(e.clientY); });
    document.addEventListener("mouseover", (e) => {
      const play = e.target.closest(".card");
      const link = !play && e.target.closest("a, button, .row");
      cursor.classList.toggle("is-play", !!play);
      cursor.classList.toggle("is-link", !!link);
    });
  }

  // ---------- smooth scroll ----------
  let lenis = null;
  if (!reduced && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    if (hasGsap) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })();
    }
    $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
      const el = $(a.getAttribute("href")); if (!el) return;
      e.preventDefault(); lenis.scrollTo(el, { offset: 0, duration: 1.6 });
    }));
  }

  // ---------- drag the reel (desktop) ----------
  let dragMoved = false;

  // ---------- intro + scroll choreography ----------
  function finishLoading() {
    document.body.classList.remove("is-loading");
  }

  if (!hasGsap || reduced) {
    $(".loader").remove(); finishLoading();
    $$(".statement__text .w").forEach((w) => (w.style.opacity = 1));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Loader
  gsap.set(".split", { yPercent: 115 });
  gsap.set(".reveal-up", { y: 30, opacity: 0 });
  gsap.set(".hero__hud", { opacity: 0 });
  const counter = { v: 0 }, count = $(".js-count");
  const ready = new Promise((res) => {
    if (heroVid.readyState >= 3) res();
    heroVid.addEventListener("canplay", res, { once: true });
    setTimeout(res, 2200);
  });
  gsap.timeline()
    .to(counter, { v: 100, duration: 1.8, ease: "power2.inOut", onUpdate: () => (count.textContent = pad(Math.round(counter.v), 3)) })
    .add(() => ready.then(intro));

  function intro() {
    const tl = gsap.timeline({ onComplete: () => { $(".loader").remove(); finishLoading(); } });
    tl.to(".loader__inner", { opacity: 0, duration: 0.3 })
      .to(".loader__bar--top", { yPercent: -100, duration: 1.2, ease: "expo.inOut" }, "<0.1")
      .to(".loader__bar--bottom", { yPercent: 100, duration: 1.2, ease: "expo.inOut" }, "<")
      .fromTo(".hero__video", { scale: 1.35 }, { scale: 1.15, duration: 2.2, ease: "expo.out" }, "<0.2")
      .to(".hero .split", { yPercent: 0, duration: 1.3, stagger: 0.12, ease: "expo.out" }, "<0.35")
      .to(".hero .reveal-up", { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "expo.out" }, "<0.3")
      .to(".hero__hud", { opacity: 1, duration: 0.8 }, "<0.2");
  }

  // Hero parallax out
  gsap.to(".hero__video", { yPercent: 18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero__content", { yPercent: -30, opacity: 0.2, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

  // Statement words light up
  gsap.to(".statement__text .w", {
    opacity: 1, stagger: 0.08, ease: "none",
    scrollTrigger: { trigger: ".statement", start: "top 75%", end: "bottom 60%", scrub: true },
  });

  // Section titles + generic reveals
  $$(".display, .label, .about__photo").forEach((el) => {
    if (el.closest(".hero, .player")) return;
    gsap.from(el, { y: 50, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
  });
  $$(".about .reveal-up, .contact .reveal-up").forEach((el) => {
    gsap.to(el, { y: 0, opacity: 1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } });
  });
  ScrollTrigger.batch(".row", {
    start: "top 92%",
    onEnter: (els) => gsap.from(els, { y: 24, opacity: 0, stagger: 0.04, duration: 0.8, ease: "expo.out" }),
    once: true,
  });

  // Contact headline
  gsap.fromTo(".contact .split", { yPercent: 115 }, { yPercent: 0, duration: 1.3, stagger: 0.12, ease: "expo.out", scrollTrigger: { trigger: ".contact__big", start: "top 85%" } });

  // Horizontal reel (desktop)
  const mm = gsap.matchMedia();
  mm.add("(min-width: 861px)", () => {
    const track = $(".js-reel");
    const dist = () => track.scrollWidth - window.innerWidth;
    const tween = gsap.to(track, {
      x: () => -dist(), ease: "none",
      scrollTrigger: {
        trigger: ".reel", pin: ".reel__pin", start: "top top", end: () => "+=" + dist(),
        scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: (self) => gsap.set(".js-reel-progress", { scaleX: self.progress }),
      },
    });
    // cards tilt + media parallax as they cross the viewport
    $$(".card").forEach((card) => {
      const m = $(".card__media > video, .card__media > img, .card__media > .tcard", card);
      gsap.fromTo(m, { xPercent: -8 }, { xPercent: 8, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
      gsap.from(card, { rotate: 2.5, y: 40, opacity: 0.3, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 105%", end: "left 60%", scrub: true } });
    });
    // drag to scroll the reel
    let down = false, sx = 0, sy = 0;
    const onDown = (e) => { down = true; dragMoved = false; sx = e.clientX; sy = window.scrollY; };
    const onMove = (e) => {
      if (!down) return; const dx = e.clientX - sx;
      if (Math.abs(dx) > 6) dragMoved = true;
      if (dragMoved) { lenis ? lenis.scrollTo(sy - dx * 1.6, { immediate: true }) : window.scrollTo(0, sy - dx * 1.6); }
    };
    const onUp = () => { down = false; setTimeout(() => (dragMoved = false), 0); };
    track.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => { track.removeEventListener("pointerdown", onDown); window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
