/* =========================================================
   TURTLE DATABASE — shared site script
   Injects the SVG sprite, nav and footer, then runs page features.
   ========================================================= */
(function(){
  const body = document.body;
  const page = body.dataset.page || '';

  /* ---------- SVG sprite (original artwork, colored via currentColor) ---------- */
  const SPRITE = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <radialGradient id="shellFill" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#0f4a55"/><stop offset="70%" stop-color="#062430"/><stop offset="100%" stop-color="#021219"/>
    </radialGradient>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0c3a44"/><stop offset="100%" stop-color="#04161e"/>
    </linearGradient>
    <symbol id="turtle" viewBox="0 0 200 240">
      <g stroke="currentColor" stroke-width="1.4" fill="url(#skin)" stroke-linejoin="round">
        <path class="flip fl" d="M70 98 C42 70 16 70 4 92 C24 100 48 112 72 118 Z"/>
        <path class="flip fr" d="M130 98 C158 70 184 70 196 92 C176 100 152 112 128 118 Z"/>
        <path class="flip rl" d="M80 172 C62 186 54 204 60 216 C74 206 86 194 90 180 Z"/>
        <path class="flip rr" d="M120 172 C138 186 146 204 140 216 C126 206 114 194 110 180 Z"/>
        <path d="M96 186 L100 204 L104 186 Z"/>
        <ellipse cx="100" cy="46" rx="14" ry="19"/>
        <ellipse cx="100" cy="130" rx="42" ry="60" fill="url(#shellFill)" stroke-width="1.8"/>
      </g>
      <circle cx="94" cy="40" r="1.8" fill="currentColor"/><circle cx="106" cy="40" r="1.8" fill="currentColor"/>
      <g class="scute" fill="none" stroke="currentColor" stroke-width="1.1" opacity=".85">
        <path d="M84 88 L100 78 L116 88 L116 104 L100 110 L84 104 Z"/>
        <path d="M84 104 L80 124 L84 144 L100 150 L116 144 L120 124 L116 104"/>
        <path d="M84 144 L86 164 L100 174 L114 164 L116 144"/>
        <path d="M84 104 L62 100 M80 124 L58 126 M84 144 L64 154 M86 164 L74 176"/>
        <path d="M116 104 L138 100 M120 124 L142 126 M116 144 L136 154 M114 164 L126 176"/>
      </g>
    </symbol>
    <symbol id="river" viewBox="0 0 120 120">
      <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round">
        <path d="M20 70 C20 40 45 26 66 26 C88 26 104 42 104 66 Z" fill="#163019"/>
        <path d="M40 66 L50 42 L70 38 L86 48 L90 66 M50 42 L58 66 M70 38 L72 66"/>
        <path d="M104 62 C112 58 118 60 118 66 C118 72 110 72 104 68" fill="#163019"/>
        <path d="M30 70 L26 82 M50 70 L50 82 M76 70 L78 82 M96 68 L100 80"/>
        <path d="M0 90 Q15 84 30 90 T60 90 T90 90 T120 90" opacity=".6"/>
        <path d="M0 100 Q15 94 30 100 T60 100 T90 100 T120 100" opacity=".35"/>
      </g>
    </symbol>
    <symbol id="land" viewBox="0 0 120 120">
      <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round">
        <path d="M14 76 C14 34 40 18 62 18 C86 18 108 36 108 76 Z" fill="#3a2412"/>
        <path d="M46 30 L54 22 L70 22 L78 30 L74 44 L50 44 Z M50 44 L44 60 L52 76 M74 44 L80 60 L72 76 M44 60 L22 58 M80 60 L102 58 M46 30 L30 40 M78 30 L94 40 M52 76 L72 76 M44 60 L80 60"/>
        <path d="M108 66 C116 60 120 64 120 72 C120 80 112 80 108 76" fill="#3a2412"/>
        <path d="M26 76 L24 92 L34 92 L36 76 M88 76 L88 92 L98 92 L98 76" fill="#3a2412"/>
        <path d="M0 96 H120" opacity=".5"/>
      </g>
    </symbol>
    <symbol id="ancient" viewBox="0 0 120 120">
      <g fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round">
        <circle cx="60" cy="60" r="50" opacity=".3"/>
        <circle cx="60" cy="60" r="40" stroke-dasharray="2 5" opacity=".6"/>
        <path d="M28 66 C28 40 44 30 60 30 C78 30 92 42 92 66 Z" fill="#241d30"/>
        <path d="M40 66 V48 M52 66 V36 M66 66 V36 M80 66 V48 M32 54 H88" opacity=".8"/>
        <path d="M92 60 C100 56 106 58 106 64 C106 70 98 70 92 66"/>
        <path d="M36 66 L32 80 M50 66 L48 80 M72 66 L74 80 M86 66 L90 80"/>
        <path d="M20 90 L30 86 L42 92 L56 86 L68 92 L82 86 L100 92" opacity=".7"/>
        <path d="M60 4 V12 M60 108 V116 M4 60 H12 M108 60 H116" opacity=".6"/>
      </g>
    </symbol>
  </defs>
</svg>`;
  body.insertAdjacentHTML('afterbegin', SPRITE);

  /* ---------- Nav ---------- */
  const LINKS = [
    ['index.html#realms','Realms','realms'],
    ['titans.html','Titans','titans'],
    ['archive.html','Archive','archive'],
    ['field-notes.html','Field Notes','notes'],
    ['conservation.html','Conservation','conservation'],
    ['about.html','About','about']
  ];
  const navEl = document.createElement('nav');
  navEl.className = 'site';
  navEl.innerHTML = `
    <a href="index.html" class="brand" aria-label="Turtle Database home">
      <svg viewBox="0 0 200 240"><use href="#turtle"/></svg>TURTLE DATABASE
    </a>
    <div class="nav-links" id="navLinks">
      ${LINKS.map(([h,t,k]) => `<a href="${h}"${k===page?' class="active" aria-current="page"':''}>${t}</a>`).join('')}
    </div>
    <a href="archive.html" class="nav-cta">Enter Archive</a>
    <button class="menu-btn" aria-label="Open menu" aria-expanded="false">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
    </button>`;
  const veil = document.querySelector('.veil');
  (veil ? veil : body.querySelector('svg')).after(navEl);

  const menuBtn = navEl.querySelector('.menu-btn'), links = navEl.querySelector('#navLinks');
  menuBtn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  links.addEventListener('click', e => { if (e.target.tagName === 'A') links.classList.remove('open'); });
  const onScroll = () => navEl.classList.toggle('scrolled', scrollY > 40);
  addEventListener('scroll', onScroll, {passive:true}); onScroll();

  /* ---------- Footer ---------- */
  const foot = document.createElement('footer');
  foot.className = 'site';
  foot.innerHTML = `
    <div class="foot">
      <div>
        <a href="index.html" class="brand"><svg viewBox="0 0 200 240"><use href="#turtle"/></svg>TURTLE DATABASE</a>
        <p>The ultimate archive of the world's turtles and tortoises — living, lost, and legendary.</p>
      </div>
      <ul><li>Realms</li><li><a href="oceans.html">Oceans</a></li><li><a href="rivers.html">Rivers &amp; Swamps</a></li><li><a href="lands.html">Lands</a></li><li><a href="ancients.html">Ancients</a></li></ul>
      <ul><li>Archive</li><li><a href="archive.html">Species Index</a></li><li><a href="titans.html">Titans</a></li><li><a href="conservation.html">Conservation</a></li><li><a href="field-notes.html">Field Notes</a></li><li><a href="submit.html">Submit a Sighting</a></li></ul>
      <ul><li>Realm</li><li><a href="about.html">About</a></li><li><a href="contact.html">Contact</a></li><li><a href="newsletter.html">Newsletter</a></li></ul>
    </div>
    <div class="legal"><span>© ${new Date().getFullYear()} TurtleDatabase.com</span><span>Slow and steady, since the Triassic.</span></div>`;
  body.appendChild(foot);

  /* ---------- Helpers ---------- */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arrow = '<svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M0 5h15M11 1l4 4-4 4"/></svg>';

  function cardHTML(s){
    const st = window.STATUS[s.status], r = window.REALMS[s.realm];
    return `<a class="sp-card c-${s.realm} reveal" href="species.html?id=${encodeURIComponent(s.id)}">
      <div class="sp-top"><svg class="sp-art" viewBox="${s.realm==='ocean'?'0 0 200 240':'0 0 120 120'}"><use href="#${r.art}"/></svg></div>
      <div class="sp-body">
        <small>${esc(r.label)}</small>
        <h3>${esc(s.name)}</h3>
        <em>${esc(s.sci)}</em>
        <div class="sp-foot"><span class="pill ${st.cls}">${esc(st.label)}</span><span>${esc(s.size)}</span></div>
      </div>
    </a>`;
  }
  window.TD = { cardHTML, esc };

  /* ---------- Reveal on scroll + count-up ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll('.count').forEach(el => {
        const to = +el.dataset.to, start = performance.now(), dur = 1800;
        const tick = t => {
          const p = Math.min((t - start) / dur, 1);
          el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString();
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      e.target.querySelectorAll('.bar').forEach(b => b.style.width = b.dataset.w + '%');
      io.unobserve(e.target);
    });
  }, {threshold:.15});
  function observe(root){
    (root || document).querySelectorAll('.reveal:not(.in)').forEach((el, i) => {
      if (el.classList.contains('realm') || el.classList.contains('sp-card')) el.style.transitionDelay = (i % 4) * 0.08 + 's';
      io.observe(el);
    });
  }
  window.TD.observe = observe;

  /* ---------- Live counts from the data file ---------- */
  if (window.SPECIES) {
    document.querySelectorAll('[data-total]').forEach(el => el.dataset.to = window.SPECIES.filter(s => s.status !== 'EX').length);
    document.querySelectorAll('[data-total-all]').forEach(el => el.dataset.to = window.SPECIES.length);
    document.querySelectorAll('[data-total-threat]').forEach(el => el.dataset.to = window.SPECIES.filter(s => ['CR','EN','VU'].includes(s.status)).length);
  }

  /* ---------- Realm species grids ---------- */
  document.querySelectorAll('.sp-grid[data-realm]').forEach(grid => {
    const list = window.SPECIES.filter(s => s.realm === grid.dataset.realm);
    grid.innerHTML = list.map(cardHTML).join('');
    const n = document.querySelector('[data-realm-count]');
    if (n) n.dataset.to = list.length;
  });

  /* ---------- Archive page ---------- */
  if (page === 'archive') {
    const grid = document.getElementById('archiveGrid');
    const q = document.getElementById('q'), sel = document.getElementById('status'), sort = document.getElementById('sort');
    const countLine = document.getElementById('countLine');
    const params = new URLSearchParams(location.search);
    let realm = params.get('realm') || 'all';
    q.value = params.get('q') || '';
    if (params.get('status')) sel.value = params.get('status');

    const chips = document.querySelectorAll('[data-filter]');
    const setChip = () => chips.forEach(c => c.classList.toggle('active', c.dataset.filter === realm));
    chips.forEach(c => c.addEventListener('click', () => { realm = c.dataset.filter; setChip(); render(); }));

    function render(){
      const term = q.value.trim().toLowerCase();
      let list = window.SPECIES.filter(s =>
        (realm === 'all' || s.realm === realm) &&
        (sel.value === 'all' || s.status === sel.value) &&
        (!term || [s.name, s.sci, s.range, s.diet, s.desc].join(' ').toLowerCase().includes(term))
      );
      if (sort.value === 'az') list.sort((a,b) => a.name.localeCompare(b.name));
      if (sort.value === 'threat') list.sort((a,b) => window.STATUS[b.status].level - window.STATUS[a.status].level || a.name.localeCompare(b.name));
      grid.innerHTML = list.length ? list.map(cardHTML).join('') : '<p class="empty">No shells match that search. Try a broader term.</p>';
      countLine.textContent = `${list.length} of ${window.SPECIES.length} species`;
      const u = new URLSearchParams();
      if (term) u.set('q', term); if (realm !== 'all') u.set('realm', realm); if (sel.value !== 'all') u.set('status', sel.value);
      history.replaceState(null, '', location.pathname + (u.toString() ? '?' + u : ''));
      observe(grid);
    }
    q.addEventListener('input', render); sel.addEventListener('change', render); sort.addEventListener('change', render);
    document.getElementById('archiveForm').addEventListener('submit', e => { e.preventDefault(); render(); });
    setChip(); render();
  }

  /* ---------- Species profile page ---------- */
  if (page === 'species') {
    const id = new URLSearchParams(location.search).get('id');
    const s = window.SPECIES.find(x => x.id === id);
    const root = document.getElementById('profile');
    if (!s) {
      document.title = 'Species not found — Turtle Database';
      root.innerHTML = `<section class="lost"><div class="inner"><div class="eyebrow">Lost at Sea</div><h2>That species isn't in the archive — yet.</h2><p class="lede" style="margin:20px auto 34px">Try searching the full index.</p><a class="btn btn-primary" href="archive.html">Open the Archive</a></div></section>`;
    } else {
      const st = window.STATUS[s.status], r = window.REALMS[s.realm];
      body.classList.add('theme-' + s.realm);
      document.title = `${s.name} (${s.sci}) — Turtle Database`;
      const meta = document.querySelector('meta[name="description"]'); if (meta) meta.content = s.desc;
      const scale = s.status === 'EX' || st.level === 0 ? '' : `
        <div style="margin-top:28px">
          <h3>Threat level</h3>
          <div class="status-scale ${st.cls}">${[1,2,3,4,5].map(i => `<span class="${i <= st.level ? 'on' : ''}"></span>`).join('')}</div>
          <div class="status-labels"><span>LC</span><span>NT</span><span>VU</span><span>EN</span><span>CR</span></div>
        </div>`;
      const related = window.SPECIES.filter(x => x.realm === s.realm && x.id !== s.id).slice(0, 4);
      root.innerHTML = `
        <header class="page-hero">
          <svg class="hero-art" viewBox="${s.realm==='ocean'?'0 0 200 240':'0 0 120 120'}" aria-hidden="true"><use href="#${r.art}"/></svg>
          <div class="inner">
            <a class="back" href="${r.page}">← ${esc(r.name)}</a><br>
            <div class="eyebrow">${esc(s.sci)}</div>
            <h1><span class="w">${esc(s.name)}</span></h1>
            <p class="tagline">${esc(s.fact)}</p>
          </div>
        </header>
        <section class="tight bg-2">
          <div class="wrap profile-grid">
            <div class="reveal">
              <div class="kicker">Field Record</div>
              <p class="lede" style="max-width:none">${esc(s.desc)}</p>
              <dl class="spec">
                <div><dt>Size</dt><dd>${esc(s.size)}</dd></div>
                <div><dt>Realm</dt><dd>${esc(r.name)}</dd></div>
                <div><dt>Range</dt><dd>${esc(s.range)}</dd></div>
                <div><dt>Diet</dt><dd>${esc(s.diet)}</dd></div>
              </dl>
              <div class="fact-box"><small>Did you know</small><p>${esc(s.fact)}</p></div>
            </div>
            <aside class="profile-side reveal">
              <h3>Status</h3>
              <span class="pill ${st.cls}" style="font-size:11px;padding:8px 12px">${esc(st.label)}</span>
              ${scale}
              <p style="font-size:13px;color:var(--mist);line-height:1.7;margin-top:26px">${s.status==='EX' ? 'Known only from the fossil record.' : 'IUCN Red List category at time of writing. Assessments change — check iucnredlist.org for the latest.'}</p>
              <a class="btn btn-ghost" style="width:100%;margin-top:24px" href="submit.html?species=${encodeURIComponent(s.name)}">Report a Sighting</a>
            </aside>
          </div>
        </section>
        ${related.length ? `<section class="bg-3 divider"><div class="wrap"><div class="kicker">Same Realm</div><h2 class="reveal">More from ${esc(r.name)}</h2><div class="sp-grid">${related.map(cardHTML).join('')}</div></div></section>` : ''}`;
    }
    observe(root);
  }

  /* ---------- Prefill sighting form from ?species= ---------- */
  const spField = document.getElementById('sp-name');
  if (spField) {
    const v = new URLSearchParams(location.search).get('species');
    if (v) spField.value = v;
    const dl = document.getElementById('species-list');
    if (dl && window.SPECIES) dl.innerHTML = window.SPECIES.filter(s => s.status !== 'EX').map(s => `<option value="${esc(s.name)}">`).join('');
  }

  /* ---------- Forms ----------
     Set data-endpoint on a <form class="js-form"> (e.g. a Formspree or Netlify URL)
     to send submissions. Without one, the form just shows its success message. */
  document.querySelectorAll('form.js-form').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const ep = form.dataset.endpoint;
      const btn = form.querySelector('[type=submit]');
      if (ep) {
        btn.disabled = true; btn.textContent = 'Sending…';
        try {
          const res = await fetch(ep, {method:'POST', body:new FormData(form), headers:{Accept:'application/json'}});
          if (!res.ok) throw new Error(res.status);
        } catch (err) {
          btn.disabled = false; btn.textContent = 'Try Again';
          alert('Something went wrong sending your message. Please try again.');
          return;
        }
      }
      form.classList.add('sent');
      form.nextElementSibling?.scrollIntoView({behavior:'smooth', block:'center'});
    });
  });

  observe();

  /* ---------- Ocean particle canvas ---------- */
  document.querySelectorAll('canvas.ocean').forEach(c => {
    const ctx = c.getContext('2d');
    const hex = (getComputedStyle(body).getPropertyValue('--accent').trim() || '#3ef0cf').replace('#','');
    const [R,G,B] = [0,2,4].map(i => parseInt(hex.substr(i,2),16));
    let W, H, parts = [], mouse = {x:-999, y:-999};
    const dpr = Math.min(devicePixelRatio || 1, 2);
    function size(){
      W = c.clientWidth; H = c.clientHeight;
      c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
      const n = Math.round(W * H / 9000);
      parts = Array.from({length:n}, () => ({x:Math.random()*W, y:Math.random()*H, r:Math.random()*1.8+.3, vy:-(Math.random()*.25+.05), vx:(Math.random()-.5)*.15, p:Math.random()*Math.PI*2, glow:0}));
    }
    addEventListener('resize', size); size();
    const host = c.parentElement;
    host.addEventListener('pointermove', e => { const b = c.getBoundingClientRect(); mouse.x = e.clientX - b.left; mouse.y = e.clientY - b.top; });
    host.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let visible = true;
    new IntersectionObserver(([e]) => { const was = visible; visible = e.isIntersecting; if (visible && !was && !still) requestAnimationFrame(frame); }).observe(c);
    function frame(){
      ctx.clearRect(0,0,W,H);
      for (const p of parts){
        p.p += .02; p.x += p.vx + Math.sin(p.p)*.12; p.y += p.vy;
        if (p.y < -5){ p.y = H + 5; p.x = Math.random()*W; }
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y) || 1;
        p.glow += ((d < 140 ? 1 - d/140 : 0) - p.glow) * .08;
        if (d < 140){ p.x += (p.x - mouse.x) / d * .6; p.y += (p.y - mouse.y) / d * .6; }
        const a = .25 + Math.sin(p.p)*.15 + p.glow*.7;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r + p.glow*2.5, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${R},${G},${B},${a})`;
        ctx.shadowBlur = 6 + p.glow*20; ctx.shadowColor = `rgba(${R},${G},${B},.9)`;
        ctx.fill();
      }
      if (!still && visible) requestAnimationFrame(frame);
    }
    frame();
  });
})();
