/* Swish Kabobs holiday mode, on until January 5.
   Snow falls over the page and piles up on the cards, tiles and the top book, each at its own pace.
   When a pile is full, or someone taps the snow, a little plow drives over and clears it.
   Christmas lights hang under the top bar. */
(() => {
  if (Date.now() >= new Date(2027, 0, 6).getTime()) return;                       // over after Jan 5
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Christmas lights under the top bar ---------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const st = document.createElement('style');
    st.textContent = `
      .xmas { position: absolute; left: 0; right: 0; bottom: -26px; height: 36px; pointer-events: none; z-index: 2; overflow: hidden; }
      .xmas svg { margin-top: 11px; height: 22px !important; }
      .xmas svg { width: 100%; height: 100%; overflow: visible; display: block; }
      .xmas .bulb { transform-box: fill-box; transform-origin: 50% 0; }
      .xmas .glow { animation: xmasTw var(--t) ease-in-out infinite alternate; animation-delay: var(--d); }
      @keyframes xmasTw { 0%, 35% { opacity: 1; } 100% { opacity: .25; } }
      @media (prefers-reduced-motion: reduce) { .xmas .glow { animation: none; } }`;
    document.head.appendChild(st);
    const box = document.createElement('div'); box.className = 'xmas'; box.setAttribute('aria-hidden', 'true');
    if (getComputedStyle(nav).position === 'static') nav.style.position = 'relative';
    nav.appendChild(box);
    const COLS = ['#ff3b30', '#2fd36b', '#f1b434', '#19a3a8', '#ff671f', '#5aa7ff'];
    const draw = () => {
      const w = nav.clientWidth, gap = w < 600 ? 30 : 38, n = Math.ceil(w / gap) + 1;
      let wire = 'M-10 2', bulbs = '';
      for (let i = 0; i < n; i++) {
        const x = i * gap, mx = x + gap / 2;
        wire += ` Q${mx} 12 ${x + gap} 2`;
        const by = 7, col = COLS[i % COLS.length], d = (Math.random() * 2).toFixed(2), t = (.7 + Math.random() * 1.3).toFixed(2);
        bulbs += `<g class="bulb" transform="translate(${mx} ${by}) rotate(${(Math.random() * 24 - 12).toFixed(0)})">
          <circle class="glow" style="--d:-${d}s;--t:${t}s" cx="0" cy="9" r="9" fill="${col}" opacity=".35" filter="url(#xmasBlur)"/>
          <rect x="-2.2" y="0" width="4.4" height="3.4" rx="1" fill="#2b333c"/>
          <path class="glow" style="--d:-${d}s;--t:${t}s" d="M0 3 C4 3 4.6 8 4 11 C3.4 14 1.6 15.6 0 15.6 C-1.6 15.6 -3.4 14 -4 11 C-4.6 8 -4 3 0 3 Z" fill="${col}"/>
          <ellipse cx="-1.4" cy="7.4" rx=".9" ry="2" fill="#fff" opacity=".55"/></g>`;
      }
      box.innerHTML = `<svg viewBox="0 0 ${w} 22" preserveAspectRatio="none"><defs><filter id="xmasBlur" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="3"/></filter></defs>
        <path d="${wire}" fill="none" stroke="#14301f" stroke-width="1.6"/>${bulbs}</svg>`;
    };
    draw(); let rt = 0; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(draw, 200); });
  }
  /* ---------- a Santa hat on the S of the big wordmark ---------- */
  const wm = document.querySelector('.title img');
  if (wm) {
    const wrap = document.createElement('span');
    wrap.style.cssText = 'position:relative;display:block;animation:' + getComputedStyle(wm).animation + ';transform-origin:30% 70%';
    wm.style.animation = 'none'; wm.parentNode.insertBefore(wrap, wm); wrap.appendChild(wm);   // the hat sways with the wordmark
    const hat = document.createElement('span'); hat.setAttribute('aria-hidden', 'true');
    hat.style.cssText = 'position:absolute;left:21.5%;top:42%;width:13.5%;translate:-50% -88%;rotate:12deg;pointer-events:none;filter:drop-shadow(3px 5px 0 rgba(0,0,0,.4))';
    hat.innerHTML = `<svg viewBox="0 0 120 100" style="display:block;width:100%;height:auto;overflow:visible">
      <path d="M12 76 C18 48 34 22 58 12 C76 5 92 10 102 24 C108 32 112 42 112 52 C104 44 96 40 88 40 C90 52 94 64 100 76 Z" fill="#d7262e" stroke="#14181d" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M36 32 C46 22 58 16 72 15" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round" opacity=".7"/>
      <path d="M88 40 C90 52 94 64 100 76 L92 76 C88 66 86 54 88 40 Z" fill="#a8151c"/>
      <rect x="4" y="68" width="104" height="24" rx="12" fill="#fff" stroke="#14181d" stroke-width="3.5"/>
      <path d="M16 76 q6 4 0 8 M34 74 q6 5 0 9 M52 74 q6 5 0 9 M70 74 q6 5 0 9 M88 74 q6 5 0 9" fill="none" stroke="#d6dde5" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="113" cy="54" r="12" fill="#fff" stroke="#14181d" stroke-width="3.5"/>
      <circle cx="109" cy="50" r="3.6" fill="#e8eef4"/></svg>`;
    wrap.appendChild(hat);
  }
  /* ---------- green tinsel around the Instagram posts ---------- */
  const posts = document.getElementById('posts');
  if (posts) {
    if (getComputedStyle(posts).position === 'static') posts.style.position = 'relative';
    const lay = document.createElement('div'); lay.setAttribute('aria-hidden', 'true');
    lay.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;pointer-events:none;z-index:3';   // absolute, so it takes no grid cell
    const tw = document.createElement('style');
    tw.textContent = '.tinsel-glint{position:absolute;width:10px;height:10px;margin:-5px;background:radial-gradient(circle,#fff 0 18%,rgba(220,255,225,.8) 30%,transparent 62%);clip-path:polygon(50% 0,60% 40%,100% 50%,60% 60%,50% 100%,40% 60%,0 50%,40% 40%);animation:tinselTw var(--t) ease-in-out infinite;animation-delay:var(--d);opacity:0}@keyframes tinselTw{0%,70%,100%{opacity:0;transform:scale(.4) rotate(0)}82%{opacity:1;transform:scale(1.25) rotate(45deg)}}@media (prefers-reduced-motion: reduce){.tinsel-glint{display:none}}';
    document.head.appendChild(tw);
    const GREENS = ['#0b5d2e', '#0f7a3c', '#14914a', '#1fae5b', '#2fc46c', '#49d17c', '#7be3a0'];
    const P = 16, R = 6;
    // points every step along a rounded rectangle, with the outward direction at each one
    function ring(w, h, step) {
      const pts = [], segs = [[R, 0, w - R, 0, 0, -1], [w, R, w, h - R, 1, 0], [w - R, h, R, h, 0, 1], [0, h - R, 0, R, -1, 0]];
      for (const [x0, y0, x1, y1, nx, ny] of segs) { const L = Math.hypot(x1 - x0, y1 - y0); for (let d = 0; d < L; d += step) pts.push([x0 + (x1 - x0) * d / L, y0 + (y1 - y0) * d / L, nx, ny]); }
      return pts;
    }
    function garland(w, h) {
      const cv = document.createElement('canvas'), d = Math.min(2, devicePixelRatio || 1), W = w + P * 2, H = h + P * 2;
      cv.width = W * d; cv.height = H * d; cv.style.cssText = `position:absolute;width:${W}px;height:${H}px;filter:drop-shadow(0 3px 4px rgba(0,0,0,.5))`;
      const c = cv.getContext('2d'); c.scale(d, d); c.translate(P, P); c.lineCap = 'round';
      const pts = ring(w, h, 1.1);
      c.strokeStyle = '#06401f'; c.lineWidth = 7; c.beginPath(); pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y))); c.closePath(); c.stroke();   // the core cord
      for (let pass = 0; pass < 3; pass++) for (const [x, y, nx, ny] of pts) {   // strands bristling every which way, darker underneath, brighter on top
        const a = Math.atan2(ny, nx) + (Math.random() - .5) * 3.6, L = 4 + Math.random() * (pass === 2 ? 7 : 10), o = (Math.random() - .5) * 5;
        const sx = x + nx * o, sy = y + ny * o;
        c.strokeStyle = GREENS[Math.min(GREENS.length - 1, Math.floor(Math.random() * 4) + pass * 1.5)]; c.lineWidth = .9 + Math.random() * .8;
        c.beginPath(); c.moveTo(sx, sy); c.lineTo(sx + Math.cos(a) * L, sy + Math.sin(a) * L); c.stroke();
      }
      c.globalCompositeOperation = 'lighter';                                // foil catching the light
      for (const [x, y, nx, ny] of pts) if (Math.random() < .12) { const a = Math.random() * 6.28, L = 2 + Math.random() * 4; c.strokeStyle = `rgba(200,255,215,${.35 + Math.random() * .4})`; c.lineWidth = .7; c.beginPath(); c.moveTo(x + nx * (Math.random() - .5) * 6, y + ny * (Math.random() - .5) * 6); c.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); c.stroke(); }
      return { cv, pts };
    }
    let sig = '';
    function dress() {
      const kids = [...posts.children].filter((k) => k !== lay && k.offsetWidth > 40 && k.offsetHeight > 40);
      const now = kids.map((k) => [k.offsetLeft, k.offsetTop, k.offsetWidth, k.offsetHeight].join(',')).join('|');
      if (now === sig) return; sig = now;
      lay.innerHTML = '';
      for (const k of kids) {
        const { cv, pts } = garland(k.offsetWidth, k.offsetHeight);
        cv.style.left = k.offsetLeft - P + 'px'; cv.style.top = k.offsetTop - P + 'px'; lay.appendChild(cv);
        for (let g = 0; g < 7; g++) {
          const [x, y] = pts[Math.floor(Math.random() * pts.length)], s = document.createElement('i'); s.className = 'tinsel-glint';
          s.style.cssText = `left:${k.offsetLeft + x}px;top:${k.offsetTop + y}px;--t:${(2.4 + Math.random() * 2.6).toFixed(2)}s;--d:-${(Math.random() * 4).toFixed(2)}s`; lay.appendChild(s);
        }
      }
    }
    posts.appendChild(lay);
    setInterval(dress, 800); addEventListener('resize', () => setTimeout(dress, 150)); dress();   // the embeds load late and change size, so keep checking
  }

  if (reduce) return;

  /* ---------- snow ---------- */
  const SEL = '.card, .bk-book:first-child .bk-sp, .tile, .leader, .games > *';    // only the top book: the others are covered
  const COL = 3;                                                                  // one pile column every 3px
  const PL = 90, PR = 70, PT = 64;                                                // room around each pile for the plow and its spray
  const dpr = Math.min(2, devicePixelRatio || 1);
  // falling flakes: one canvas fixed over the screen (they don't belong to anything, so scrolling can't shake them)
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:150';
  document.body.appendChild(cv);
  const c = cv.getContext('2d'); let W, H;
  const size = () => { W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0); };
  size(); addEventListener('resize', size);
  // piles: each one is its own small canvas placed in the page, so it scrolls exactly with its card. Under the top bar.
  const layer = document.createElement('div');
  layer.setAttribute('aria-hidden', 'true');
  layer.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:0;overflow:hidden;pointer-events:none;z-index:40';   // clipped to the page width
  document.body.appendChild(layer);
  if (getComputedStyle(document.body).position === 'static') document.body.style.position = 'relative';

  // every surface keeps its own pile and its own luck: some catch a lot of snow, some barely any
  const piles = new WeakMap(), live = new Set();                                  // live: surfaces whose pile has a canvas in the page
  const capOf = (w) => Math.min(20, 6 + w * .045);
  function pileOf(el, w) {
    let p = piles.get(el);
    if (!p || p.h.length !== Math.ceil(w / COL)) {
      const n = Math.ceil(w / COL), h = new Float32Array(n), start = Math.random() * .55;    // some already have a dusting
      const ph = Math.random() * 9;
      for (let i = 0; i < n; i++) h[i] = capOf(w) * start * (.6 + .4 * Math.sin(i * .21 + ph) * Math.cos(i * .07 + ph));
      if (p && p.cv) p.cv.remove();
      p = { h, rate: .15 + Math.random() * 1.9, cap: capOf(w), queued: false, dirty: true, cv: null, g: '' };
      piles.set(el, p);
    }
    return p;
  }
  const flakes = [];
  const reseed = () => { const want = Math.round(W * H / 8000); while (flakes.length < want) flakes.push(newFlake(true)); flakes.length = want; };
  const newFlake = (any) => ({ x: Math.random() * (W + 100) - 50, y: any ? Math.random() * H : -6, r: .8 + Math.random() * 2.4, v: .45 + Math.random() * .9, a: Math.random() * 6.28 });
  reseed(); addEventListener('resize', reseed);

  let T = [], t = 0, wind = .3, navB = 0;
  // each surface in its own upright frame, so tilted books get snow along their real top edge
  function frame(el) {
    const b = el.getBoundingClientRect(), w = el.offsetWidth || b.width, h = el.offsetHeight || b.height;
    let ang = 0, n = el, is3d = false;
    for (let k = 0; n && k < 3; k++, n = n.parentElement) {
      const m = getComputedStyle(n).transform; if (!m || m === 'none') continue;
      if (m.startsWith('matrix3d')) { is3d = true; continue; }                  // a card tilting under the mouse: leave its snow where it was
      const v = m.match(/-?[\d.e]+/g).map(Number); ang += Math.atan2(v[1], v[0]);
    }
    const cx = b.left + b.width / 2, cy = b.top + b.height / 2;
    return { left: cx - w / 2, right: cx + w / 2, top: cy - h / 2, bottom: cy + h / 2, width: w, height: h, cx, cy, ang, box: b, is3d };
  }
  const loc = (r, x, y) => { if (!r.ang) return [x, y]; const dx = x - r.cx, dy = y - r.cy, c0 = Math.cos(-r.ang), s0 = Math.sin(-r.ang); return [r.cx + dx * c0 - dy * s0, r.cy + dx * s0 + dy * c0]; };
  const targets = () => [...document.querySelectorAll(SEL)].map((el) => ({ el, r: frame(el) })).filter(({ r }) => r.width > 40 && r.box.bottom > -30 && r.box.top < H + 30);

  function land(f) {
    for (const { el, r } of T) {
      if (r.is3d) continue;
      const [fx, fy] = loc(r, f.x, f.y);
      if (fx < r.left + 3 || fx > r.right - 3 || r.box.top < navB + 4) continue;   // tucked under the top bar: no snow lands there
      const p = pileOf(el, r.width), i = Math.floor((fx - r.left) / COL), E = edgeOf(el, r, p), top = r.top + E.drop[i] - p.h[i];
      if (fy < top - 1 || fy > top + 6) continue;
      const amt = f.r * 1.3 * p.rate, spread = 7;
      for (let k = -spread; k <= spread; k++) {
        const j = i + k; if (j < 0 || j >= p.h.length) continue;
        p.h[j] = Math.min(p.cap * E.keep[j], p.h[j] + amt * E.keep[j] * Math.cos(k / spread * Math.PI / 2));
      }
      p.dirty = true;
      if (!p.queued && full(p)) callPlow(el, false);
      return true;
    }
    return false;
  }
  // rounded corners: the top edge drops away at each end, so the snow follows it down and thins out
  function edgeOf(el, r, p) {
    if (p.edge && p.edgeW === r.width) return p.edge;
    const cs = getComputedStyle(el), rad = (v) => { const [a, b = a] = v.split(' '); const px = (u, d) => (u.endsWith('%') ? parseFloat(u) / 100 * d : parseFloat(u) || 0); return [Math.min(px(a, r.width), r.width / 2), Math.min(px(b, r.height), r.height / 2)]; };
    const [lx, ly] = rad(cs.borderTopLeftRadius), [rx, ry] = rad(cs.borderTopRightRadius), n = p.h.length;
    const drop = new Float32Array(n), keep = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = i * COL + COL / 2; let d = 0, k = 1;
      if (lx && x < lx) { const u = (lx - x) / lx; d = ly * (1 - Math.sqrt(1 - u * u)); k = u > .8 ? 0 : 1 - u * 1.1; }
      else if (rx && x > r.width - rx) { const u = (x - (r.width - rx)) / rx; d = ry * (1 - Math.sqrt(1 - u * u)); k = u > .8 ? 0 : 1 - u * 1.1; }
      drop[i] = d; keep[i] = k;
    }
    p.edge = { drop, keep, max: Math.max(ly, ry) }; p.edgeW = r.width; return p.edge;
  }
  const full = (p) => { let s = 0; for (const v of p.h) s += v; return s / p.h.length > p.cap * .8; };

  // keep a pile's canvas sitting on its surface, in page coordinates, turned to the surface's angle
  function place(el, r, p) {
    const E = edgeOf(el, r, p), w = Math.round(r.width + PL + PR), h = Math.round(PT + E.max + 8);
    if (!p.cv) { p.cv = document.createElement('canvas'); p.cv.style.cssText = 'position:absolute;left:0;top:0;pointer-events:none'; p.ctx = p.cv.getContext('2d'); layer.appendChild(p.cv); live.add(el); }
    if (p.cv.width !== w * dpr || p.cv.height !== h * dpr) { p.cv.width = w * dpr; p.cv.height = h * dpr; p.cv.style.width = w + 'px'; p.cv.style.height = h + 'px'; p.dirty = true; }
    const x = Math.round((r.left + scrollX - PL) * 2) / 2, y = Math.round((r.top + scrollY - PT) * 2) / 2;
    const g = `${x},${y},${r.ang.toFixed(4)}`;
    if (g !== p.g) {                                      // only touch the style when the surface really moved, not on scroll
      p.g = g; p.cv.style.transformOrigin = `${PL + r.width / 2}px ${PT + r.height / 2}px`;
      p.cv.style.transform = `translate(${x}px, ${y}px)${r.ang ? ` rotate(${r.ang}rad)` : ''}`;
    }
  }
  function paintPile(el, r, p) {
    const k = p.ctx, E = edgeOf(el, r, p), L = PL, Tp = PT;
    k.setTransform(dpr, 0, 0, dpr, 0, 0); k.clearRect(0, 0, p.cv.width, p.cv.height);
    k.beginPath();
    let open = false;
    const xs = (i) => Math.min(L + r.width - 2, L + i * COL + COL / 2);
    for (let i = 0; i <= p.h.length; i++) {
      if (i < p.h.length && p.h[i] > .4) {
        const y = Tp + E.drop[i], h = p.h[i] * E.keep[i] * Math.min(1, Math.min(i, p.h.length - 1 - i) / 3 + .25);
        if (!open) { k.moveTo(xs(i), y + 1); open = true; }
        k.lineTo(xs(i), y - h);
      } else if (open) { for (let b = i - 1; b >= 0 && p.h[b] > .4; b--) k.lineTo(xs(b), Tp + E.drop[b] + 1); k.closePath(); open = false; }
    }
    const gr = k.createLinearGradient(0, Tp - p.cap, 0, Tp + 2);
    gr.addColorStop(0, '#ffffff'); gr.addColorStop(.7, '#eef4fa'); gr.addColorStop(1, '#c9d6e3');
    k.fillStyle = gr; k.shadowColor = 'rgba(0,0,0,.35)'; k.shadowBlur = 6; k.shadowOffsetY = 2; k.fill(); k.shadowColor = 'transparent';
    if (plow && plow.el === el) drawTruck(k, plow, L + plow.u, Tp + 1);
    p.dirty = false;
  }

  /* ---------- the plow ---------- */
  const queue = []; let plow = null;
  function callPlow(el, front) {
    const p = piles.get(el); if (!p || p.queued) return;
    p.queued = true; front ? queue.unshift(el) : queue.push(el);
  }
  function nextPlow() {
    while (queue.length) {
      const el = queue.shift(), r = frame(el);
      if (!el.isConnected || r.box.bottom < 0 || r.box.top > H) { const p = piles.get(el); if (p) p.queued = false; continue; }   // off screen: wait till it's back
      const s = Math.max(.55, Math.min(1, r.width / 300));
      plow = { el, s, u: -70 * s, spray: [], fade: 0 };
      return;
    }
  }
  function drawTruck(k, P, x, y) {
    const s = P.s, blink = Math.floor(t / 12) % 2;
    k.save(); k.translate(x, y); k.scale(s, s); k.globalAlpha = P.fade;
    for (const q of P.spray) { k.globalAlpha = P.fade * q.life; k.fillStyle = '#fff'; k.beginPath(); k.arc(q.x, q.y, q.r, 0, 7); k.fill(); }
    k.globalAlpha = P.fade;
    k.fillStyle = '#ff671f'; k.strokeStyle = '#14181d'; k.lineWidth = 2;
    k.beginPath(); k.roundRect(-58, -30, 40, 20, 3); k.fill(); k.stroke();
    k.beginPath(); k.roundRect(-20, -40, 26, 30, 4); k.fill(); k.stroke();
    k.fillStyle = '#bfe6f2'; k.beginPath(); k.roundRect(-14, -35, 15, 12, 2); k.fill(); k.stroke();
    k.fillStyle = '#f1b434'; k.fillRect(-56, -26, 36, 4);
    k.fillStyle = blink ? '#ffcc1a' : '#ff8a00'; k.beginPath(); k.roundRect(-14, -46, 14, 6, 2); k.fill(); k.stroke();
    if (blink) { k.fillStyle = 'rgba(255,204,26,.35)'; k.beginPath(); k.arc(-7, -43, 14, 0, 7); k.fill(); }
    k.fillStyle = '#f1b434'; k.beginPath(); k.moveTo(6, -30); k.quadraticCurveTo(22, -20, 18, -3); k.lineTo(6, -3); k.closePath(); k.fill(); k.stroke();
    k.beginPath(); k.moveTo(6, -18); k.lineTo(0, -18); k.stroke();
    for (const wx of [-46, -10]) { k.fillStyle = '#14181d'; k.beginPath(); k.arc(wx, -6, 7, 0, 7); k.fill(); k.fillStyle = '#8b96a2'; k.beginPath(); k.arc(wx, -6, 3, 0, 7); k.fill(); }
    k.restore();
  }
  function runPlow() {
    if (!plow) { nextPlow(); if (!plow) return; }
    const P = plow, r = frame(P.el), p = piles.get(P.el);
    if (r.is3d) { if (p) p.dirty = true; return; }                                 // pause while the card is tilted
    P.u += 3.4 * P.s + 1;
    const len = r.width;
    P.fade = Math.max(0, Math.min(1, (P.u + 70 * P.s) / 40, (len + 70 * P.s - P.u) / 40));
    if (p) {
      const upto = Math.floor((P.u + 18 * P.s) / COL);
      for (let i = 0; i < Math.min(upto, p.h.length); i++) if (p.h[i] > 0) {
        if (p.h[i] > 2 && Math.random() < .6) P.spray.push({ x: 20 + Math.random() * 6, y: -8 - Math.random() * 10, vx: 1 + Math.random() * 2.5, vy: -2 - Math.random() * 2.5, r: 1 + Math.random() * 2, life: 1 });
        p.h[i] = 0;
      }
      p.dirty = true;
    }
    for (const q of P.spray) { q.x += q.vx; q.y += q.vy; q.vy += .25; q.life -= .03; }
    P.spray = P.spray.filter((q) => q.life > 0);
    if (P.u > len + 80 * P.s) { if (p) { p.queued = false; p.rate = .15 + Math.random() * 1.9; p.dirty = true; } plow = null; }   // done: this one gets new luck
  }

  // tap the snow on top of something and the plow heads there next
  document.addEventListener('pointerdown', (e) => {
    for (const { el, r } of T) {
      const p = piles.get(el), [ex, ey] = loc(r, e.clientX, e.clientY); if (!p || ex < r.left || ex > r.right) continue;
      const h = p.h[Math.floor((ex - r.left) / COL)] || 0;
      if (h > 1.5 && ey > r.top - h - 12 && ey < r.top + 3) { if (plow?.el !== el) callPlow(el, true); return; }
    }
  }, { passive: true });

  function step() {
    t++; wind = .3 + Math.sin(t / 240) * .5;
    c.clearRect(0, 0, W, H);
    if (!document.hidden) {
      T = targets(); navB = nav ? nav.getBoundingClientRect().bottom + 14 : 0;
      // the pile layer is as tall as the page content (measured to the footer, not to itself, so it shrinks again when a book closes)
      const end = document.querySelector('footer') || document.body.lastElementChild, dh = Math.ceil(end.getBoundingClientRect().bottom + scrollY);
      if (layer._h !== dh) { layer._h = dh; layer.style.height = dh + 'px'; }
      for (const f of flakes) {
        f.a += .02; f.y += f.v; f.x += wind + Math.sin(f.a) * .35;
        if (f.y > H + 6 || land(f)) Object.assign(f, newFlake(false));
        if (f.x > W + 50) f.x = -40; else if (f.x < -50) f.x = W + 40;
      }
      runPlow();
      // every pile follows its surface, on screen or not, and hides when the surface does (a closed book, a hidden panel)
      for (const el of live) {
        const p = piles.get(el);
        if (!p || !el.isConnected) { if (p && p.cv) p.cv.remove(); live.delete(el); continue; }
        const shown = el.getClientRects().length > 0;
        p.cv.style.display = shown ? '' : 'none';
        if (!shown) continue;
        const r = frame(el); if (!r.is3d) place(el, r, p);
      }
      for (const { el, r } of T) {
        const p = piles.get(el); if (!p) continue;
        if (!p.cv) { if (r.is3d) continue; place(el, r, p); }                         // first snow on this surface: give it a canvas
        if (p.dirty || (plow && plow.el === el) || (plow === null && p.hadPlow)) { p.hadPlow = !!(plow && plow.el === el); paintPile(el, r, p); }
      }
      c.fillStyle = '#fff';
      for (const f of flakes) { c.globalAlpha = .5 + f.r / 6; c.beginPath(); c.arc(f.x, f.y, f.r, 0, 7); c.fill(); }
      c.globalAlpha = 1;
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
  window.skSnow = { piles, callPlow };
})();
