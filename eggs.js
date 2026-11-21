/* Swish Kabobs: long-press easter eggs on the roster jerseys.
   Hold a player's card for about two thirds of a second. Eric Lee's lives in court.html; the rest are here. */
(() => {
  const SK = window.SK; if (!SK) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- sound: a few tiny synths, no files ---------- */
  let ac = null;
  const A = () => (ac = ac || new (window.AudioContext || window.webkitAudioContext)());
  const env = (g, t, a, v, d) => { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + d); };
  function tone(at, dur, f0, f1, type = 'sine', vol = .18) {
    try { const c = A(), t = c.currentTime + at, o = c.createOscillator(), g = c.createGain();
      o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
      env(g, t, .01, vol, dur); o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + .05); } catch (e) {}
  }
  function noise(at, dur, f, q = 2, vol = .35, type = 'bandpass', f1) {
    try { const c = A(), t = c.currentTime + at, n = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate), d = n.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const s = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain();
      s.buffer = n; fl.type = type; fl.frequency.setValueAtTime(f, t); if (f1) fl.frequency.exponentialRampToValueAtTime(f1, t + dur); fl.Q.value = q;
      env(g, t, .005, vol, dur); s.connect(fl).connect(g).connect(c.destination); s.start(t); } catch (e) {}
  }
  function rev(at, dur, f0, f1, vol = .12) {                     // engine: a sawtooth through a low-pass
    try { const c = A(), t = c.currentTime + at, o = c.createOscillator(), o2 = c.createOscillator(), fl = c.createBiquadFilter(), g = c.createGain();
      o.type = 'sawtooth'; o2.type = 'square'; [o, o2].forEach((x, i) => { x.frequency.setValueAtTime(f0 * (i ? .5 : 1), t); x.frequency.exponentialRampToValueAtTime(f1 * (i ? .5 : 1), t + dur * .6); x.frequency.exponentialRampToValueAtTime(f0 * 1.1 * (i ? .5 : 1), t + dur); });
      fl.type = 'lowpass'; fl.frequency.value = 900; env(g, t, .05, vol, dur);
      o.connect(fl); o2.connect(fl); fl.connect(g).connect(c.destination); o.start(t); o2.start(t); o.stop(t + dur + .05); o2.stop(t + dur + .05); } catch (e) {}
  }
  function meow(at) {
    try { const c = A(), t = c.currentTime + at, o = c.createOscillator(), fl = c.createBiquadFilter(), g = c.createGain(), lfo = c.createOscillator(), lg = c.createGain();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(520, t); o.frequency.linearRampToValueAtTime(880, t + .18); o.frequency.linearRampToValueAtTime(600, t + .5);
      lfo.frequency.value = 7; lg.gain.value = 14; lfo.connect(lg).connect(o.frequency);
      fl.type = 'bandpass'; fl.frequency.setValueAtTime(900, t); fl.frequency.linearRampToValueAtTime(1600, t + .2); fl.frequency.linearRampToValueAtTime(1000, t + .5); fl.Q.value = 3;
      env(g, t, .06, .22, .55); o.connect(fl).connect(g).connect(c.destination); o.start(t); lfo.start(t); o.stop(t + .6); lfo.stop(t + .6); } catch (e) {}
  }
  const ding = (at, f = 1568, vol = .2) => { tone(at, 1.1, f, f, 'sine', vol); tone(at, .8, f * 2.01, f * 2, 'sine', vol * .35); };
  const thud = (at, vol = .35) => { tone(at, .22, 150, 50, 'sine', vol); noise(at, .06, 400, 1, vol * .5, 'lowpass'); };
  const buzz = (ms) => { if (navigator.vibrate) navigator.vibrate(ms); };

  /* ---------- artwork ---------- */
  const BALL = (cls = '') => `<svg class="${cls}" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#ff671f" stroke="#14181d" stroke-width="2"/><path d="M2 20h36M20 2v36M7 7c7 7 7 19 0 26M33 7c-7 7-7 19 0 26" fill="none" stroke="#14181d" stroke-width="1.8"/></svg>`;
  const OUT = '#1b1f24';
  const CUFF = (x, y, w) => `<path d="M${x} ${y + 4} q${w / 2} -10 ${w} 0 l0 14 q${-w / 2} 10 ${-w} 0 z" fill="#fff" stroke="${OUT}" stroke-width="3" stroke-linejoin="round"/><path d="M${x + 3} ${y + 9} q${w / 2 - 3} -8 ${w - 6} 0" fill="none" stroke="#c9d1d9" stroke-width="2"/>`;
  const ONE = (parts, fill = '#fff') => parts.map((d) => `<path d="${d}" fill="${OUT}" stroke="${OUT}" stroke-width="6" stroke-linejoin="round"/>`).join('') + parts.map((d) => `<path d="${d}" fill="${fill}"/>`).join('');
  const cap = (x, y0, y1, w) => `M${x - w / 2} ${y1} V${y0 + w / 2} a${w / 2} ${w / 2} 0 0 1 ${w} 0 V${y1} Z`;   // a finger: a capsule
  const GLOVE = `<svg viewBox="0 0 100 132">${ONE([
      'M14 58 C8 52 8 44 14 42 C20 40 26 48 32 58 L32 72 Z',
      cap(33, 22, 66, 15), cap(46.5, 12, 66, 15), cap(60, 14, 66, 15), cap(72.5, 26, 66, 14),
      'M24 62 C24 52 40 50 54 50 C70 50 82 54 82 66 C82 86 72 100 52 100 C34 100 24 88 24 62 Z'])}
      <path d="M39.8 36 V50 M53.3 30 V50 M66.4 38 V50" stroke="${OUT}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M43 74 v11 M53 72 v13 M63 74 v11" stroke="#c9d1d9" stroke-width="3" stroke-linecap="round"/>
      ${CUFF(30, 96, 44)}</svg>`;
  const POINT = `<svg viewBox="0 0 100 132">${ONE([
      cap(49, 4, 60, 16),
      'M24 66 C24 52 36 48 52 48 C70 48 80 54 80 68 C80 86 72 100 52 100 C34 100 24 88 24 66 Z'])}
      <path d="M58 60 C66 58 74 60 76 66 M58 72 C66 70 74 72 76 78 M58 84 C64 82 70 84 72 88" fill="none" stroke="${OUT}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M28 66 C36 60 46 62 50 70 C52 76 44 80 36 78" fill="#fff" stroke="${OUT}" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"/>
      ${CUFF(31, 96, 42)}</svg>`;
  const STAR = (c = '#f1b434') => `<svg viewBox="0 0 20 20"><path d="M10 0l2.4 7.6L20 10l-7.6 2.4L10 20l-2.4-7.6L0 10l7.6-2.4z" fill="${c}"/></svg>`;


  /* the cat: everything drawn once as a dark outline, then again filled, so it reads as one smooth shape */
  const CATP = {
    tail: 'M70 70 C52 66 40 50 44 20',
    body: 'M62 72 C60 54 82 46 114 48 C144 50 160 54 166 66 C172 80 164 96 146 98 L82 98 C66 98 62 86 62 72 Z',
    head: 'M152 58 C152 40 166 32 180 32 C196 32 206 42 206 56 C206 72 194 80 180 80 C164 80 152 72 152 58 Z',
    ears: 'M160 44 L164 20 L180 34 Z M182 34 L198 20 L202 46 Z',
    legs: [['l1', 'M84 88 L74 128'], ['l2', 'M146 88 L156 128'], ['l3', 'M98 88 L104 128'], ['l4', 'M132 88 L126 128']]
  };
  const CAT = (() => {
    const O = '#5a2c06', F = '#f19a46', D = '#d77a2a';
    const leg = (c, d, sw, col) => `<path class="c-leg ${c}" d="${d}" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" fill="none"/>`;
    const paw = (c, d) => { const m = d.match(/L(\d+) (\d+)/); return `<g class="c-leg ${c}"><path d="${d}" stroke="transparent" stroke-width="1"/><ellipse cx="${m[1]}" cy="${+m[2] - 1}" rx="9" ry="6" fill="#fff6ea" stroke="${O}" stroke-width="2.5"/></g>`; };
    let o = '';
    // outline pass
    o += `<path class="c-tail" d="${CATP.tail}" stroke="${O}" stroke-width="19" stroke-linecap="round" fill="none"/>`;
    CATP.legs.forEach(([c, d]) => (o += leg(c, d, 21, O)));
    o += `<path d="${CATP.body}" fill="${O}" stroke="${O}" stroke-width="5"/>`;
    o += `<g class="c-head"><path d="${CATP.ears}" fill="${O}" stroke="${O}" stroke-width="5" stroke-linejoin="round"/><path d="${CATP.head}" fill="${O}" stroke="${O}" stroke-width="5"/></g>`;
    // fill pass
    o += `<path class="c-tail" d="${CATP.tail}" stroke="${F}" stroke-width="14" stroke-linecap="round" fill="none"/>`;
    o += `<path class="c-tail" d="M48 44 l10 2 M46 32 l9 0" stroke="${D}" stroke-width="3.5" stroke-linecap="round"/>`;
    CATP.legs.forEach(([c, d], k) => (o += leg(c, d, 16, k > 1 ? F : D)));
    CATP.legs.forEach(([c, d]) => (o += paw(c, d)));
    o += `<path d="${CATP.body}" fill="${F}"/>`;
    o += `<path d="M90 50 q6 10 2 22 M110 48 q6 12 2 24 M130 50 q6 10 2 22 M150 56 q4 8 0 16" fill="none" stroke="${D}" stroke-width="4" stroke-linecap="round"/>`;
    o += `<path d="M92 94 C104 86 124 86 136 94 Z" fill="#fff6ea"/>`;
    o += `<g class="c-head"><path d="${CATP.ears}" fill="${F}" stroke-linejoin="round"/><path d="M165 38 L166 26 L175 34 Z M186 34 L195 26 L197 40 Z" fill="#f7b9be"/>
      <path d="${CATP.head}" fill="${F}"/>
      <path d="M172 34 l1 8 M180 33 v9 M188 34 l-1 8" stroke="${D}" stroke-width="3" stroke-linecap="round"/>
      <path d="M178 70 C186 74 196 72 202 64 C200 58 190 60 186 60 Z" fill="#fff6ea"/>
      <g class="c-eyes"><circle cx="190" cy="54" r="4" fill="#1b1f24"/><circle cx="191.4" cy="52.6" r="1.3" fill="#fff"/></g>
      <path d="M203 60 l3 -1" stroke="#e3647a" stroke-width="3" stroke-linecap="round"/>
      <path d="M196 64 l14 -3 M196 67 l14 2" stroke="${O}" stroke-width="1.2" stroke-linecap="round"/></g>`;
    return o;
  })();
  /* each egg: dur (ms), html(), sound(), optional steps [[ms, fn(el, card)]] */
  const say = (words) => `<div class="eg-say">${words.map(([t, k, d]) => `<span class="${k}" style="--d:${d}s">${t}</span>`).join('')}</div>`;
  const EGGS = {
    /* Jules: the bike revs, puffs smoke and wheelies off */
    'jules gammad': { dur: 3900, html: () => `
      <div class="eg-moto"><svg viewBox="0 0 200 120">
        <g class="m-shake">
          <path d="M14 80 L52 80" stroke="#8b96a2" stroke-width="7" stroke-linecap="round"/>
          <path d="M45 90 L80 64 L122 64 L150 44" stroke="#2b333c" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M160 90 L144 38" stroke="#8b96a2" stroke-width="7" stroke-linecap="round"/>
          <path d="M134 34 L156 30" stroke="#14181d" stroke-width="6" stroke-linecap="round"/>
          <path d="M138 64 Q160 58 180 74" stroke="#ff671f" stroke-width="6" fill="none" stroke-linecap="round"/>
          <path d="M76 62 Q82 38 112 38 L134 44 Q136 60 122 64 Z" fill="#ff671f" stroke="#14181d" stroke-width="2.5"/>
          <path d="M98 44 L124 47" stroke="#f1b434" stroke-width="4" stroke-linecap="round"/>
          <path d="M44 60 Q54 46 80 50 L80 62 Z" fill="#14181d"/>
          <rect x="80" y="66" width="34" height="22" rx="5" fill="#5a6672" stroke="#14181d" stroke-width="2.5"/>
          <path d="M86 72h22M86 78h22" stroke="#2b333c" stroke-width="2"/>
          <circle cx="152" cy="50" r="7" fill="#f1b434" stroke="#14181d" stroke-width="2.5"/>
        </g>
        <g class="m-wh" style="transform-origin:45px 90px"><circle cx="45" cy="90" r="24" fill="#14181d"/><circle cx="45" cy="90" r="13" fill="none" stroke="#8b96a2" stroke-width="3"/><path d="M45 77v26M32 90h26M36 81l18 18M54 81L36 99" stroke="#8b96a2" stroke-width="1.6"/></g>
        <g class="m-wh" style="transform-origin:160px 90px"><circle cx="160" cy="90" r="24" fill="#14181d"/><circle cx="160" cy="90" r="13" fill="none" stroke="#8b96a2" stroke-width="3"/><path d="M160 77v26M147 90h26M151 81l18 18M169 81l-18 18" stroke="#8b96a2" stroke-width="1.6"/></g>
      </svg></div>
      ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<i class="eg-puff" style="--i:${i}"></i>`).join('')}
      ${say([['Vroom', 'w', .7], ['vroom', 'w', 1.05]])}`,
      sound: () => { rev(.45, .55, 70, 190); rev(1.05, .6, 75, 230); rev(1.9, 1.4, 90, 320, .14); buzz([40, 120, 40, 120, 220]); } },

    /* Spencer: a cat strolls across the screen, stops at his jersey, meows, keeps going */
    'spencer healy': { dur: 4600, html: () => `
      <div class="eg-cat"><div class="eg-cat-in"><svg viewBox="0 0 220 140">${CAT}</svg><b class="eg-bubble">meow</b></div></div>`,
      sound: () => { meow(1.9); },
      steps: [[1700, (el) => el.classList.add('stop')], [2800, (el) => el.classList.remove('stop')]] },

    /* Harjap: a turban drops on and bounces, to a dhol beat */
    'harjap singh': { dur: 3800, html: () => `
      <div class="eg-turban"><svg viewBox="0 0 140 120">
        <defs><clipPath id="egPag"><path d="M40 107 A56 56 0 1 1 100 107 Q82 84 70 56 Q58 84 40 107 Z"/></clipPath><clipPath id="egPagL"><path d="M40 107 A56 56 0 0 1 66 4 C80 18 82 38 70 56 Q58 84 40 107 Z"/></clipPath></defs>
        <path d="M60 84 L70 60 L80 84 Q70 80 60 84 Z" fill="#ffd7a6"/>
        <path d="M40 107 A56 56 0 1 1 100 107 Q82 84 70 56 Q58 84 40 107 Z" fill="#e07500"/>
        <g clip-path="url(#egPag)" fill="none">
          ${[0, 1, 2, 3, 4, 5, 6, 7].map((k) => `<circle cx="40" cy="78" r="${30 + k * 9}" stroke="${k % 2 ? '#cf6a00' : '#e47c08'}" stroke-width="9"/>`).join('')}
        </g>
        <g clip-path="url(#egPagL)" fill="none">
          <path d="M40 107 A56 56 0 0 1 66 4 C80 18 82 38 70 56 Q58 84 40 107 Z" fill="#f39a24"/>
          ${[0, 1, 2, 3, 4, 5, 6, 7].map((k) => `<circle cx="100" cy="80" r="${34 + k * 9}" stroke="${k % 2 ? '#ea8a14' : '#f9a332'}" stroke-width="9"/>`).join('')}
        </g>
        <path d="M66 4 C80 18 82 38 70 56" fill="none" stroke="#ffc26b" stroke-width="3" stroke-linecap="round" opacity=".9"/>
        <path d="M71 5 C84 20 85 40 73 57" fill="none" stroke="#a85200" stroke-width="2" opacity=".6"/>
        <path d="M40 107 A56 56 0 1 1 100 107 Q82 84 70 56 Q58 84 40 107 Z" fill="none" stroke="#7a3d00" stroke-width="2.5" stroke-linejoin="round" opacity=".7"/>
      </svg></div>
      ${say([["I'm a", 's', .75], ['MF', 'w', 1.05], ['Gabru', 'w', 1.35]])}`,
      sound: () => { thud(.42, .45); [1.05, 1.3, 1.45, 1.7].forEach((t, i) => thud(t, i === 3 ? .4 : .28)); buzz([30, 600, 30, 200, 30]); } },

    /* Gurjot: from the far corner of the screen, nothing but net, and it rains money */
    'gurjot mann': { dur: 6200, html: () => `
      <div class="eg-dim"></div>
      <div class="eg-hoop"><svg viewBox="0 0 120 110">
        <rect x="14" y="2" width="92" height="62" rx="4" fill="rgba(255,255,255,.92)" stroke="#14181d" stroke-width="3"/>
        <rect x="42" y="26" width="36" height="28" fill="none" stroke="#ff671f" stroke-width="3"/>
        <g class="h-net"><path d="M34 66 L42 100 L60 104 L78 100 L86 66 M42 66 L48 100 M54 66 L56 104 M66 66 L64 104 M78 66 L72 100 M36 76 H84 M39 88 H81" fill="none" stroke="#f4ecd8" stroke-width="2"/></g>
        <ellipse cx="60" cy="66" rx="28" ry="5" fill="none" stroke="#ff671f" stroke-width="4.5"/>
      </svg></div>
      <div class="eg-shot"><div class="eg-shot-y">${BALL('eg-ball spin')}</div></div>
      <i class="eg-flash"></i><b class="eg-plus3">+3</b>
      ${Array.from({ length: 44 }, (_, k) => { const R = Math.random;
        return `<i class="eg-bill" style="--x:${(R() * 100).toFixed(1)}vw;--d:${(1.25 + R() * 2.6).toFixed(2)}s;--t:${(2.2 + R() * 1.4).toFixed(2)}s;--r:${(R() * 360).toFixed(0)}deg;--sw:${(18 + R() * 40).toFixed(0)}px;--z:${(.7 + R() * .6).toFixed(2)}"><i><svg viewBox="0 0 64 30"><rect x="1" y="1" width="62" height="28" rx="2" fill="#7fb35a" stroke="#2f5a1c" stroke-width="2"/><rect x="5" y="5" width="54" height="20" rx="1" fill="none" stroke="#c9e6b0" stroke-width="1.2"/><ellipse cx="32" cy="15" rx="9" ry="8" fill="#a8d38a" stroke="#2f5a1c" stroke-width="1.2"/><text x="32" y="19.5" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="12" fill="#2f5a1c">$</text><text x="9" y="13" font-family="Anton, Impact, sans-serif" font-size="7" fill="#2f5a1c">17</text><text x="49" y="25" font-family="Anton, Impact, sans-serif" font-size="7" fill="#2f5a1c">17</text></svg></i></i>`; }).join('')}
      ${say([['Bang!', 'w bang', 1.3]])}
      <b class="eg-cash">Cash money</b>`,
      sound: () => { noise(1.18, .45, 2400, .6, .3, 'highpass', 6000); tone(1.2, .5, 900, 600, 'triangle', .05);
        noise(1.25, 2.6, 900, .5, .12, 'bandpass', 1500);                                   // the crowd
        ding(1.55, 2093, .14); ding(1.68, 2637, .14); noise(1.5, .08, 3000, 3, .25);         // cha-ching
        [1.9, 2.2, 2.5, 2.9, 3.3].forEach((t) => noise(t, .05, 5000, 2, .06));               // bills fluttering
        buzz([30, 1100, 80, 80, 80, 80, 160]); } },

    /* Jack: a hard hat lands on the hanger with a clunk */
    'jack healy': { dur: 3600, html: () => `
      <div class="eg-hat"><svg viewBox="0 0 140 86">
        <path d="M20 62 Q20 10 70 8 Q120 10 120 62 Z" fill="#ffcc1a" stroke="#6b4e00" stroke-width="3" stroke-linejoin="round"/>
        <path d="M70 8 L70 62 M56 10 Q50 30 52 62 M84 10 Q90 30 88 62" fill="none" stroke="#e0a800" stroke-width="5" stroke-linecap="round"/>
        <path d="M4 64 Q70 54 136 64 Q138 74 128 76 Q70 68 12 76 Q2 74 4 64 Z" fill="#ffcc1a" stroke="#6b4e00" stroke-width="3" stroke-linejoin="round"/>
        <circle cx="38" cy="40" r="8" fill="#006269"/><path d="M34 40h8M38 36v8" stroke="#f1b434" stroke-width="2"/>
        <path d="M36 22 Q46 14 58 14" fill="none" stroke="#fff6c4" stroke-width="4" stroke-linecap="round" opacity=".8"/>
      </svg></div>
      <div class="eg-sign"><b>Under construction</b></div>`,
      sound: () => { tone(.5, .18, 320, 180, 'square', .08); noise(.5, .12, 1800, 4, .25); tone(.62, .12, 260, 200, 'square', .05); buzz([60]); } },

    /* Joshua Jeyamohan: Kareem goggles slide on, the lenses catch the light */
    'joshua jeyamohan': { dur: 3200, html: () => `
      <div class="eg-gog"><svg viewBox="0 0 160 64">
        <defs><clipPath id="egLens"><rect x="22" y="10" width="54" height="40" rx="16"/><rect x="84" y="10" width="54" height="40" rx="16"/></clipPath></defs>
        <path d="M0 30 H24 M136 30 H160" stroke="#14181d" stroke-width="9" stroke-linecap="round"/>
        <rect x="22" y="10" width="54" height="40" rx="16" fill="rgba(190,232,255,.55)" stroke="#14181d" stroke-width="6"/>
        <rect x="84" y="10" width="54" height="40" rx="16" fill="rgba(190,232,255,.55)" stroke="#14181d" stroke-width="6"/>
        <path d="M74 24 Q80 18 86 24" fill="none" stroke="#14181d" stroke-width="6"/>
        <g clip-path="url(#egLens)"><rect class="g-glint" x="-40" y="0" width="22" height="64" fill="#fff" opacity=".9" transform="skewX(-25)"/></g>
      </svg></div>`,
      sound: () => { tone(1.0, .9, 2637, 2637, 'sine', .12); tone(1.0, .6, 3951, 3951, 'sine', .05); } },

    /* Gurkamal: off the glass, into his hands, and he gets paid */
    'gurkamal bahga': { dur: 4000, html: () => `
      <div class="eg-board"><svg viewBox="0 0 120 80"><rect x="6" y="2" width="108" height="66" rx="4" fill="rgba(255,255,255,.92)" stroke="#14181d" stroke-width="3"/><rect x="42" y="28" width="36" height="26" fill="none" stroke="#ff671f" stroke-width="3"/><ellipse cx="60" cy="70" rx="24" ry="5" fill="none" stroke="#ff671f" stroke-width="4.5"/></svg></div>
      <div class="eg-reb">${BALL('eg-ball spin')}</div>
      <div class="eg-hand">${GLOVE}</div>
      ${Array.from({ length: 14 }, (_, i) => `<i class="eg-coin" style="--a:${(-160 + i * 140 / 13).toFixed(0)}deg;--r:${(110 + (i % 4) * 26)}px;--i:${i}">$</i>`).join('')}
      ${say([['Board man', 'w', 1.5], ['gets', 's', 1.8], ['paid', 'w', 2.0]])}`,
      sound: () => { thud(.78, .5); noise(1.18, .07, 1500, 1, .35, 'lowpass'); ding(1.4, 2093, .14); ding(1.52, 2637, .14); [1.45, 1.55, 1.62, 1.72].forEach((t) => tone(t, .12, 3200 + Math.random() * 800, 3000, 'triangle', .04)); buzz([40, 380, 40, 60, 40]); } },

    /* Ranjit: red, yellow, green, green light */
    'ranjit brar': { dur: 3600, html: () => `
      <div class="eg-light"><svg viewBox="0 0 60 150">
        <rect x="26" y="130" width="8" height="24" fill="#2b333c"/>
        <rect x="4" y="4" width="52" height="132" rx="12" fill="#1d232a" stroke="#0a0c0f" stroke-width="3"/>
        <circle class="lt r" cx="30" cy="30" r="15"/><circle class="lt y" cx="30" cy="70" r="15"/><circle class="lt g" cx="30" cy="110" r="15"/>
      </svg></div>
      ${say([['Green', 'w gr', 1.45], ['light', 'w gr', 1.7]])}`,
      sound: () => { tone(.45, .14, 660, 660, 'square', .05); tone(.9, .14, 660, 660, 'square', .05); tone(1.35, .55, 990, 990, 'square', .06); } },

    /* Andrew: a bounce pass across the screen right into his hands */
    'andrew lam': { dur: 3200, html: () => `
      <div class="eg-pass"><div class="eg-pass-y">${BALL('eg-ball spin')}</div></div>
      ${[0, 1, 2, 3, 4].map((i) => `<i class="eg-sparkle" style="--i:${i}">${STAR()}</i>`).join('')}
      ${say([['Dimes', 'w', 1.05]])}`,
      sound: () => { thud(.52, .35); noise(.95, .05, 1800, 1, .3, 'lowpass'); ding(1.05, 2349, .08); } },

    /* Kuljap: the ball spinning on one finger */
    'kuljap singh': { dur: 3600, html: () => `
      <div class="eg-spin"><div class="eg-spin-ball">${BALL('eg-ball')}<i class="eg-seam"></i></div>
        <div class="eg-finger">${POINT}</div></div>
      ${say([['smooth', 's big', .9]])}`,
      sound: () => { noise(.5, 1.6, 600, 1.5, .08, 'bandpass', 1400); } },

    /* Sanelli: a fresh pair of kicks and the debut loading */
    'joshua sanelli': { dur: 3800, html: () => `
      <div class="eg-kicks">${[0, 1].map((k) => `<svg class="kick k${k}" viewBox="0 0 120 60">
        <path d="M6 44 Q6 22 22 20 L44 18 Q56 6 70 12 L84 26 Q110 30 114 42 L114 50 L6 50 Z" fill="#fff" stroke="#14181d" stroke-width="3" stroke-linejoin="round"/>
        <path d="M30 34 Q62 22 96 36" fill="none" stroke="#006269" stroke-width="6" stroke-linecap="round"/><path d="M52 20l8 8M58 16l8 8M64 14l8 8" stroke="#14181d" stroke-width="2"/>
        <rect x="4" y="48" width="112" height="9" rx="4" fill="#f1b434" stroke="#14181d" stroke-width="2.5"/></svg>`).join('')}</div>
      <div class="eg-load"><i></i><b>0%</b></div>`,
      sound: () => { thud(.38, .3); thud(.55, .25); tone(2.35, .12, 880, 880, 'sine', .1); tone(2.48, .3, 1320, 1320, 'sine', .1); },
      steps: Array.from({ length: 21 }, (_, i) => [800 + i * 75, (el) => { const b = el.querySelector('.eg-load b'); if (b) b.textContent = (i * 5) + '%'; }]) },

    /* Ganaden: the big man sends it back */
    'john ganaden': { dur: 3600, html: () => `
      <div class="eg-in">${BALL('eg-ball spin')}</div>
      <div class="eg-swat">${GLOVE}</div>
      <div class="eg-pow"><svg viewBox="0 0 100 100"><path d="M50 0l10 30 30-14-14 30 24 10-26 10 14 32-32-16-6 18-8-20-28 12 12-28L0 54l26-12L10 14l30 14z" fill="#f1b434" stroke="#14181d" stroke-width="3" stroke-linejoin="round"/></svg></div>
      ${say([['Get that', 'w', .95], ['outta', 's', 1.2], ['here', 'w', 1.4]])}`,
      sound: () => { noise(.72, .12, 900, .8, .55, 'lowpass'); thud(.72, .45); buzz([70]); } },

    /* Morales: the padlock snaps shut */
    'joshua morales': { dur: 3400, html: () => `
      <div class="eg-lock"><svg viewBox="0 0 100 120">
        <path class="l-shackle" d="M26 58 V34 a24 24 0 0 1 48 0 V58" fill="none" stroke="#9aa5b1" stroke-width="12" stroke-linecap="round"/>
        <rect x="10" y="52" width="80" height="64" rx="12" fill="#f1b434" stroke="#6b4e00" stroke-width="3"/>
        <rect x="16" y="58" width="68" height="8" rx="4" fill="#ffe08a" opacity=".7"/>
        <circle cx="50" cy="80" r="8" fill="#14181d"/><path d="M46 84 h8 l-2 16 h-4 z" fill="#14181d"/>
      </svg></div>
      ${say([['Lockdown', 'w', .9]])}`,
      sound: () => { noise(.62, .05, 3500, 2, .4); tone(.62, .06, 1200, 800, 'square', .06); thud(.66, .25); buzz([50]); } },

    /* Adejobi: microwave, three seconds, ding, the jersey comes out hot */
    'malcom adejobi': { dur: 4000, html: () => `
      <div class="eg-micro"><svg viewBox="0 0 160 100">
        <rect x="4" y="6" width="152" height="88" rx="8" fill="#d7dde3" stroke="#3a434d" stroke-width="3"/>
        <rect x="14" y="16" width="98" height="68" rx="5" fill="#1d232a" stroke="#3a434d" stroke-width="2.5"/>
        <rect class="mw-glow" x="18" y="20" width="90" height="60" rx="3" fill="#ff8a3d"/>
        <ellipse cx="63" cy="70" rx="34" ry="5" fill="rgba(0,0,0,.25)"/>
        <rect x="120" y="16" width="28" height="16" rx="2" fill="#0e1114"/><text class="mw-t" x="134" y="29" text-anchor="middle" font-family="monospace" font-size="13" fill="#5df07c">0:03</text>
        <g fill="#8b96a2"><rect x="121" y="40" width="7" height="6" rx="1"/><rect x="131" y="40" width="7" height="6" rx="1"/><rect x="141" y="40" width="7" height="6" rx="1"/><rect x="121" y="50" width="7" height="6" rx="1"/><rect x="131" y="50" width="7" height="6" rx="1"/><rect x="141" y="50" width="7" height="6" rx="1"/></g>
        <rect x="122" y="64" width="24" height="10" rx="3" fill="#ff671f"/>
      </svg><b class="eg-dingtxt">DING!</b></div>
      ${say([['Instant', 'w', 2.15], ['offense', 'w', 2.4]])}`,
      sound: () => { tone(.4, 1.5, 118, 120, 'sawtooth', .025); ding(1.95, 1568, .22); },
      steps: [[800, (el) => { const t = el.querySelector('.mw-t'); if (t) t.textContent = '0:02'; }], [1300, (el) => { const t = el.querySelector('.mw-t'); if (t) t.textContent = '0:01'; }],
        [1850, (el, card) => { const t = el.querySelector('.mw-t'); if (t) t.textContent = 'END'; card.classList.add('eg-hot'); }], [3900, (el, card) => card.classList.remove('eg-hot')]] }
  };

  /* ---------- styles ---------- */
  const css = `
  .card.eg-card { -webkit-touch-callout: none; -webkit-user-select: none; user-select: none; }
  .card.eg-card.charging canvas.jz { animation: eggShake .09s linear infinite; }
  .card.eg-hot { box-shadow: 0 0 0 2px #ff671f, 0 0 40px 8px rgba(255,103,31,.55); animation: egHot .5s ease-in-out 3 alternate; }
  .card.eg-hot canvas.jz { filter: sepia(.4) saturate(2.2) hue-rotate(-12deg) brightness(1.08); }
  @keyframes egHot { to { box-shadow: 0 0 0 2px #f1b434, 0 0 64px 18px rgba(255,103,31,.75); } }
  .eg { position: fixed; inset: 0; z-index: 300; pointer-events: none; overflow: hidden; animation: egOut .35s ease-in forwards; animation-delay: calc(var(--dur) - .35s); }
  .eg > * { position: absolute; }
  .eg svg { display: block; width: 100%; height: auto; overflow: visible; }
  @keyframes egOut { to { opacity: 0; } }
  .eg-say { left: var(--tx); top: calc(var(--ct) + var(--cw) * .98); translate: -50% 0; display: flex; align-items: baseline; justify-content: center; gap: .22em; white-space: nowrap; width: max-content; }
  .eg-say span { display: inline-block; opacity: 0; animation: egWord .45s cubic-bezier(.2,1.7,.4,1) both; animation-delay: var(--d); }
  .eg-say .w { font-family: var(--display); text-transform: uppercase; font-size: clamp(32px, 9vw, 56px); line-height: 1; color: var(--gold); -webkit-text-stroke: 3px var(--teal); paint-order: stroke fill; text-shadow: 0 5px 0 rgba(0,0,0,.45); }
  .eg-say .w.gr { color: #48e27a; -webkit-text-stroke-color: #0b3d1c; }
  .eg-say .s { font-family: var(--script); font-size: clamp(26px, 7.5vw, 38px); color: #fff; text-shadow: 0 3px 0 rgba(0,0,0,.5); transform: rotate(-6deg); animation-name: egWordS; }
  .eg-say .w.bang { font-size: clamp(56px, 17vw, 88px); }
  .eg-say .s.big { font-size: clamp(44px, 13vw, 64px); }
  @keyframes egWord { from { opacity: 0; transform: translateY(24px) scale(.3); } to { opacity: 1; transform: none; } }
  @keyframes egWordS { from { opacity: 0; transform: translateY(24px) scale(.3) rotate(-6deg); } to { opacity: 1; transform: rotate(-6deg); } }
  .eg .spin { animation: egRot .5s linear infinite; transform-box: fill-box; transform-origin: center; }
  @keyframes egRot { to { transform: rotate(360deg); } }
  @keyframes egPop { from { opacity: 0; transform: translateY(40px) scale(.2); } to { opacity: 1; transform: none; } }
  @keyframes egDrop { 0% { opacity: 1; transform: translateY(calc(-1 * var(--vh))); } 60% { transform: translateY(0) scaleY(.82) scaleX(1.1); } 75% { transform: translateY(-14px); } 88% { transform: translateY(0) scaleY(.95); } 100% { opacity: 1; transform: none; } }

  /* gurjot: the screen rains money */
  .eg-dim { inset: 0; background: radial-gradient(ellipse at 50% 40%, rgba(6,8,10,.35), rgba(6,8,10,.7)); opacity: 0; animation: egDim 6.2s ease both; }
  @keyframes egDim { 18% { opacity: 0; } 26%, 86% { opacity: 1; } 100% { opacity: 0; } }
  .eg-flash { inset: 0; background: radial-gradient(circle at var(--cx) calc(var(--ct) + var(--s) * 80px), rgba(255,226,150,.85), rgba(241,180,52,0) 55%); opacity: 0; animation: egFlash .7s ease-out both 1.15s; }
  @keyframes egFlash { 15% { opacity: 1; } 100% { opacity: 0; } }
  .eg-plus3 { left: var(--cx); top: calc(var(--ct) + var(--s) * 70px); translate: -50% 0; font-family: var(--display); font-weight: 400; font-size: calc(var(--s) * 46px); color: #fff; -webkit-text-stroke: 2px var(--teal); paint-order: stroke fill; opacity: 0; animation: egPlus 1.2s ease-out both 1.2s; }
  @keyframes egPlus { 0% { opacity: 0; transform: scale(.4); } 20% { opacity: 1; transform: scale(1.15); } 100% { opacity: 0; transform: translateY(calc(var(--s) * -90px)); } }
  .eg-bill { left: var(--x); top: -50px; width: calc(46px * var(--z)); animation: egFall var(--t) linear both; animation-delay: var(--d); }
  .eg-bill > i { display: block; transform: rotate(var(--r)); animation: egFlutter .9s ease-in-out infinite alternate; }
  @keyframes egFall { from { transform: translateY(0); } to { transform: translateY(calc(var(--vh) + 100px)); } }
  @keyframes egFlutter { from { transform: translateX(calc(var(--sw) * -1)) rotate(var(--r)) rotateX(0deg); } to { transform: translateX(var(--sw)) rotate(calc(var(--r) + 50deg)) rotateX(60deg); } }
  .eg-cash { left: var(--tx); top: calc(var(--ct) + var(--cw) * .98 + clamp(58px, 17.5vw, 92px)); translate: -50% 0; font-family: var(--script); font-weight: 400; font-size: clamp(30px, 8.5vw, 44px); color: #9be07a; text-shadow: 0 3px 0 rgba(0,0,0,.6); white-space: nowrap; opacity: 0; transform: rotate(-6deg); animation: egWordS .5s cubic-bezier(.2,1.7,.4,1) both 2.1s; }

  /* jules */
  .eg-moto { width: calc(var(--s) * 210px); left: calc(var(--cx) - var(--s) * 105px); top: calc(var(--jc) - var(--s) * 50px); transform-origin: 22% 75%; animation: egMoto 3.6s cubic-bezier(.45,0,.4,1) both; }
  @keyframes egMoto { 0% { opacity: 0; transform: translateY(40px) scale(.2); } 9% { opacity: 1; transform: none; } 47% { transform: none; } 55% { transform: rotate(-24deg); } 92%, 100% { transform: translateX(calc(var(--vw) + 40px)) rotate(-24deg); } }
  .eg-moto .m-shake { animation: egRev .06s linear 22 .45s; }
  @keyframes egRev { 50% { transform: translate(1.5px, -1.5px); } }
  .eg-moto .m-wh { animation: egRot .35s linear infinite 1.75s; }
  .eg-puff { width: calc(var(--s) * 26px); height: calc(var(--s) * 26px); left: calc(var(--cx) - var(--s) * 108px); top: calc(var(--jc) - var(--s) * 4px); border-radius: 50%; background: radial-gradient(circle, rgba(220,225,230,.85), rgba(220,225,230,0) 70%); opacity: 0; animation: egPuff .9s ease-out both; animation-delay: calc(.45s + var(--i) * .2s); }
  @keyframes egPuff { 0% { opacity: .9; transform: scale(.4); } 100% { opacity: 0; transform: translate(calc(var(--s) * -70px), calc(var(--s) * -24px)) scale(2.4); } }

  /* spencer */
  .eg-cat { width: calc(var(--s) * 200px); left: 0; top: calc(var(--ct) + var(--cw) * 1.3 - var(--s) * 124px); animation: egCat 4.3s linear both; }
  @keyframes egCat { 0% { transform: translateX(calc(var(--s) * -200px)); } 37% { transform: translateX(calc(var(--cx) - var(--s) * 110px)); } 62% { transform: translateX(calc(var(--cx) - var(--s) * 110px)); } 100% { transform: translateX(calc(var(--vw) + 20px)); } }
  .eg-cat-in { position: relative; animation: egBob .3s ease-in-out infinite alternate; }
  .eg-cat.stop .eg-cat-in { animation: none; }
  @keyframes egBob { to { transform: translateY(-3px); } }
  .eg-cat .c-leg { transform-box: fill-box; transform-origin: 50% 0; animation: egLeg .3s ease-in-out infinite alternate; }
  .eg-cat .l2, .eg-cat .l3 { animation-direction: alternate-reverse; }
  .eg-cat.stop .c-leg { animation: none; }
  @keyframes egLeg { from { transform: rotate(18deg); } to { transform: rotate(-18deg); } }
  .eg-cat .c-tail { transform-box: fill-box; transform-origin: 100% 100%; animation: egTail .8s ease-in-out infinite alternate; }
  @keyframes egTail { to { transform: rotate(14deg); } }
  .eg-cat .c-head { transform-box: view-box; transform-origin: 160px 72px; transition: transform .3s; }
  .eg-cat.stop .c-head { transform: rotate(-12deg) translateY(-3px); }
  .eg-cat .c-eyes { transform-box: fill-box; transform-origin: center; }
  .eg-cat.stop .c-eyes { animation: egBlink 1s .4s; }
  @keyframes egBlink { 0%, 40%, 60%, 100% { transform: none; } 50% { transform: scaleY(.1); } }
  .eg-bubble { position: absolute; right: -10%; top: -30%; font-family: var(--script); font-weight: 400; font-size: calc(var(--s) * 26px); color: #14181d; background: #fff; padding: .1em .55em .2em; border-radius: 1em; opacity: 0; transform: scale(.3); transition: opacity .2s, transform .3s cubic-bezier(.2,1.6,.4,1); }
  .eg-bubble::after { content: ""; position: absolute; left: 22%; bottom: -8px; border: 8px solid transparent; border-top-color: #fff; border-bottom: 0; }
  .eg-cat.stop .eg-bubble { opacity: 1; transform: none; transition-delay: .2s; }

  /* harjap + jack: something lands where a head would be */
  .eg-turban, .eg-hat { width: calc(var(--s) * 124px); left: calc(var(--cx) - var(--s) * 62px); top: calc(var(--jn) - var(--s) * 92px); transform-origin: 50% 100%; animation: egDrop .75s cubic-bezier(.5,0,.6,1) both .1s; }
  .eg-hat { width: calc(var(--s) * 112px); left: calc(var(--cx) - var(--s) * 56px); top: calc(var(--jn) - var(--s) * 62px); }
  .eg-sign { left: var(--tx); top: calc(var(--ct) + var(--cw) * .98); translate: -50% 0; padding: 8px; border-radius: 8px; opacity: 0; width: max-content;
    background: repeating-linear-gradient(-45deg, #14181d 0 14px, #ffcc1a 14px 28px); box-shadow: 0 8px 18px rgba(0,0,0,.5); animation: egPop .5s cubic-bezier(.2,1.6,.4,1) both .85s; }
  .eg-sign b { display: block; background: #ffcc1a; color: #14181d; font-family: var(--display); font-weight: 400; text-transform: uppercase; font-size: clamp(22px, 6.4vw, 36px); line-height: 1; padding: 8px 14px; border-radius: 4px; }

  /* gurjot */
  .eg-hoop { width: calc(var(--s) * 110px); left: calc(var(--cx) - var(--s) * 55px); top: calc(var(--ct) + var(--s) * 30px); animation: egPop .4s cubic-bezier(.2,1.5,.4,1) both; }
  .eg-hoop .h-net { transform-box: fill-box; transform-origin: 50% 0; animation: egNet .5s ease-out 1.2s; }
  @keyframes egNet { 40% { transform: scaleY(1.35) scaleX(.85); } }
  .eg-shot { width: calc(var(--s) * 34px); left: calc(var(--cx) - var(--s) * 17px); top: calc(var(--ct) + var(--s) * 58px); animation: egShotX 1.2s linear both; }
  .eg-shot-y { animation: egShotY 1.2s both; }
  @keyframes egShotX { from { transform: translateX(calc(-1 * var(--cx) - 40px)); } to { transform: none; } }
  @keyframes egShotY { 0% { transform: translateY(calc(var(--vh) - var(--ct))); animation-timing-function: cubic-bezier(.2,.7,.5,1); } 58% { transform: translateY(calc(var(--s) * -170px)); animation-timing-function: cubic-bezier(.5,0,.85,.5); } 88% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(calc(var(--s) * 60px)); opacity: 0; } }

  /* joshua j */
  .eg-gog { width: calc(var(--s) * 150px); left: calc(var(--cx) - var(--s) * 75px); top: calc(var(--jn) + var(--s) * 4px); animation: egGog .7s cubic-bezier(.2,1.3,.4,1) both .15s; }
  @keyframes egGog { from { opacity: 0; transform: translateX(calc(-1 * var(--cx) - 140px)) rotate(-20deg); } to { opacity: 1; transform: none; } }
  .eg-gog .g-glint { animation: egGlint .55s ease-in-out 1s both; }
  @keyframes egGlint { from { transform: skewX(-25deg) translateX(0); } to { transform: skewX(-25deg) translateX(220px); } }

  /* gurkamal */
  .eg-board { width: calc(var(--s) * 110px); left: calc(var(--cx) - var(--s) * 55px); top: calc(var(--ct) + var(--s) * 10px); animation: egPop .35s cubic-bezier(.2,1.5,.4,1) both; }
  .eg-reb { width: calc(var(--s) * 34px); left: calc(var(--cx) - var(--s) * 17px); top: calc(var(--ct) + var(--s) * 26px); animation: egReb 1.25s both; }
  @keyframes egReb { 0% { transform: translate(calc(var(--vw) - var(--cx) + 40px), calc(var(--s) * 60px)); animation-timing-function: cubic-bezier(.3,.2,.6,1); }
    62% { transform: translate(calc(var(--s) * 8px), 0); animation-timing-function: cubic-bezier(.4,0,.8,.6); }
    100% { transform: translate(calc(var(--s) * -4px), calc(var(--jc) - var(--ct) - var(--s) * 10px)); } }
  .eg-hand { width: calc(var(--s) * 70px); left: calc(var(--cx) - var(--s) * 35px); top: calc(var(--jc) - var(--s) * 6px); animation: egHand .35s cubic-bezier(.2,1.4,.4,1) both 1s; }
  @keyframes egHand { from { opacity: 0; transform: translateY(calc(var(--s) * 140px)); } to { opacity: 1; transform: none; } }
  .eg-coin { left: var(--cx); top: calc(var(--jc) - var(--s) * 4px); width: calc(var(--s) * 22px); height: calc(var(--s) * 22px); margin: calc(var(--s) * -11px); border-radius: 50%; background: radial-gradient(circle at 35% 30%, #ffe8a3, #f1b434 55%, #a8740c); border: 2px solid #7a5300;
    display: grid; place-items: center; font: 700 calc(var(--s) * 13px)/1 var(--cond); color: #6b4800; font-style: normal; opacity: 0; animation: egCoin .9s cubic-bezier(.15,.7,.4,1) both; animation-delay: calc(1.35s + var(--i) * 25ms); }
  @keyframes egCoin { 0% { opacity: 1; transform: rotate(var(--a)) translateX(0) rotate(calc(-1 * var(--a))) scale(.4); } 80% { opacity: 1; } 100% { opacity: 0; transform: rotate(var(--a)) translateX(calc(var(--r) * var(--s))) rotate(calc(-1 * var(--a) + 200deg)) scale(1); } }

  /* ranjit */
  .eg-light { width: calc(var(--s) * 54px); left: calc(var(--cx) - var(--s) * 27px); top: calc(var(--jn) - var(--s) * 4px); animation: egPop .4s cubic-bezier(.2,1.5,.4,1) both; }
  .eg-light .lt { fill: #2b333c; }
  .eg-light .r { animation: egLR 3.6s step-end both; } .eg-light .y { animation: egLY 3.6s step-end both; } .eg-light .g { animation: egLG 3.6s step-end both; }
  @keyframes egLR { 12% { fill: #ff3b30; filter: drop-shadow(0 0 8px #ff3b30); } 25% { fill: #2b333c; filter: none; } }
  @keyframes egLY { 25% { fill: #ffcc1a; filter: drop-shadow(0 0 8px #ffcc1a); } 37% { fill: #2b333c; filter: none; } }
  @keyframes egLG { 37%, 100% { fill: #48e27a; filter: drop-shadow(0 0 12px #48e27a); } }

  /* andrew */
  .eg-pass { width: calc(var(--s) * 34px); left: calc(var(--cx) - var(--s) * 17px); top: calc(var(--jc) - var(--s) * 17px); animation: egPassX .95s linear both .1s; }
  .eg-pass-y { animation: egPassY .95s both .1s; }
  @keyframes egPassX { from { transform: translateX(calc(-1 * var(--cx) - 40px)); } to { transform: none; } }
  @keyframes egPassY { 0% { transform: translateY(calc(var(--s) * -30px)); animation-timing-function: cubic-bezier(.5,0,1,.6); } 45% { transform: translateY(calc(var(--ct) + var(--cw) * 1.3 - var(--jc) - var(--s) * 20px)) scale(1.1, .85); animation-timing-function: cubic-bezier(0,.4,.5,1); } 100% { transform: none; } }
  .eg-sparkle { left: var(--cx); top: var(--jc); width: calc(var(--s) * 22px); margin: calc(var(--s) * -11px); opacity: 0; animation: egSpark .7s ease-out both; animation-delay: calc(1.05s + var(--i) * 60ms); }
  .eg-sparkle:nth-of-type(1) { --x: -50px; --y: -40px; } .eg-sparkle:nth-of-type(2) { --x: 50px; --y: -46px; } .eg-sparkle:nth-of-type(3) { --x: -60px; --y: 20px; } .eg-sparkle:nth-of-type(4) { --x: 58px; --y: 18px; } .eg-sparkle:nth-of-type(5) { --x: 0px; --y: -64px; }
  @keyframes egSpark { 0% { opacity: 0; transform: scale(.2); } 40% { opacity: 1; } 100% { opacity: 0; transform: translate(calc(var(--x) * var(--s)), calc(var(--y) * var(--s))) scale(1.3) rotate(90deg); } }

  /* kuljap */
  .eg-spin { width: calc(var(--s) * 70px); left: calc(var(--cx) - var(--s) * 35px); top: calc(var(--jn) - var(--s) * 10px); animation: egPop .45s cubic-bezier(.2,1.5,.4,1) both; }
  .eg-spin-ball { position: relative; width: calc(var(--s) * 60px); margin: 0 auto calc(var(--s) * -8px); animation: egWob 1.1s ease-in-out infinite alternate; }
  .eg-spin-ball .eg-ball { width: 100%; }
  .eg-seam { position: absolute; left: 6%; right: 6%; top: 44%; height: 12%; border: 2.5px solid #14181d; border-radius: 50%; animation: egSeam .28s linear infinite; }
  @keyframes egSeam { 0% { transform: scaleX(1); } 50% { transform: scaleX(.1); } 100% { transform: scaleX(1); } }
  @keyframes egWob { from { transform: rotate(-4deg) translateX(-2px); } to { transform: rotate(4deg) translateX(2px); } }
  .eg-finger { width: calc(var(--s) * 64px); margin: 0 auto; }

  /* sanelli */
  .eg-kicks { left: calc(var(--cx) - var(--s) * 80px); top: calc(var(--jc) - var(--s) * 20px); width: calc(var(--s) * 160px); height: calc(var(--s) * 60px); }
  .eg-kicks .kick { position: absolute; width: calc(var(--s) * 88px) !important; animation: egDrop .6s cubic-bezier(.5,0,.6,1) both; }
  .eg-kicks .k0 { left: 0; top: 0; animation-delay: .1s; } .eg-kicks .k1 { left: calc(var(--s) * 70px); top: calc(var(--s) * 14px); animation-delay: .28s; }
  .eg-load { left: calc(var(--cx) - var(--s) * 80px); top: calc(var(--jc) + var(--s) * 58px); width: calc(var(--s) * 160px); height: calc(var(--s) * 20px); border: 2px solid var(--gold); border-radius: 999px; background: rgba(0,0,0,.6); overflow: hidden; opacity: 0; animation: egPop .3s ease-out both .65s; }
  .eg-load i { position: absolute; left: 0; top: 0; bottom: 0; width: 0; background: linear-gradient(90deg, var(--teal), var(--gold)); animation: egFill 1.5s cubic-bezier(.4,0,.6,1) both .8s; }
  .eg-load b { position: absolute; inset: 0; display: grid; place-items: center; font: 700 calc(var(--s) * 13px)/1 var(--cond); letter-spacing: .1em; color: #fff; text-shadow: 0 1px 2px #000; }
  @keyframes egFill { to { width: 100%; } }

  /* ganaden */
  .eg-in { width: calc(var(--s) * 34px); left: calc(var(--cx) - var(--s) * 17px); top: calc(var(--jc) - var(--s) * 30px); animation: egIn 1.6s both; }
  @keyframes egIn { 0% { transform: translate(calc(var(--vw) - var(--cx) + 40px), calc(var(--s) * 40px)); animation-timing-function: linear; } 45% { transform: none; animation-timing-function: cubic-bezier(.1,.7,.3,1); } 100% { transform: translate(calc(-1 * var(--cx) - 80px), calc(-1 * var(--jc) - 80px)) rotate(-900deg); } }
  .eg-swat { width: calc(var(--s) * 74px); left: calc(var(--cx) - var(--s) * 20px); top: calc(var(--jc) - var(--s) * 40px); transform-origin: 50% 100%; animation: egSwat .75s cubic-bezier(.3,0,.3,1) both; }
  @keyframes egSwat { 0% { opacity: 0; transform: translateY(calc(var(--s) * 150px)) rotate(30deg); } 55% { opacity: 1; transform: translateY(calc(var(--s) * 20px)) rotate(25deg); } 75% { transform: rotate(-28deg); } 100% { opacity: 1; transform: rotate(-20deg); } }
  .eg-pow { width: calc(var(--s) * 80px); left: calc(var(--cx) - var(--s) * 40px); top: calc(var(--jc) - var(--s) * 70px); opacity: 0; animation: egPow .5s ease-out both .7s; }
  @keyframes egPow { 0% { opacity: 1; transform: scale(.2) rotate(-20deg); } 60% { opacity: 1; transform: scale(1.1); } 100% { opacity: 0; transform: scale(1.4) rotate(10deg); } }

  /* morales */
  .eg-lock { width: calc(var(--s) * 78px); left: calc(var(--cx) - var(--s) * 39px); top: calc(var(--jc) - var(--s) * 52px); animation: egDrop .55s cubic-bezier(.5,0,.6,1) both .05s; }
  .eg-lock .l-shackle { animation: egShackle .25s cubic-bezier(.6,0,.8,1) both .5s; }
  @keyframes egShackle { from { transform: translateY(-18px); } to { transform: none; } }

  /* adejobi */
  .eg-micro { width: calc(var(--s) * 150px); left: calc(var(--cx) - var(--s) * 75px); top: calc(var(--jc) - var(--s) * 50px); animation: egPop .45s cubic-bezier(.2,1.5,.4,1) both; }
  .eg-micro .mw-glow { opacity: .2; animation: egGlowMw .5s ease-in-out .4s 3 alternate; }
  @keyframes egGlowMw { to { opacity: .85; } }
  .eg-dingtxt { position: absolute; right: -8%; top: -30%; font-family: var(--display); font-weight: 400; font-size: calc(var(--s) * 30px); color: #fff; -webkit-text-stroke: 1.5px #14181d; paint-order: stroke fill; transform: rotate(10deg); opacity: 0; animation: egPop .35s cubic-bezier(.2,1.8,.4,1) both 1.95s; }
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- play one ---------- */
  let open = null;
  function play(card, egg) {
    if (open) return;
    const r = card.getBoundingClientRect(), cw = r.width, s = cw / 200;
    const half = Math.min(200, innerWidth * .46);
    const v = { '--cx': r.left + cw / 2, '--ct': r.top, '--cw': cw, '--jn': r.top + cw * .155, '--jc': r.top + cw * .43,
      '--tx': Math.min(innerWidth - half, Math.max(half, r.left + cw / 2)), '--vw': innerWidth, '--vh': innerHeight };
    const el = document.createElement('div'); el.className = 'eg'; el.setAttribute('aria-hidden', 'true');
    for (const k in v) el.style.setProperty(k, v[k] + 'px');
    el.style.setProperty('--s', s.toFixed(3)); el.style.setProperty('--dur', egg.dur / 1000 + 's');
    el.innerHTML = egg.html(); document.body.appendChild(el);
    const tag = el.querySelector('.eg-say, .eg-sign');                // keep the words fully on screen
    if (tag) { const hw = tag.offsetWidth / 2 + 8; el.style.setProperty('--tx', Math.min(innerWidth - hw, Math.max(hw, r.left + cw / 2)) + 'px'); }
    const timers = (egg.steps || []).map(([ms, fn]) => setTimeout(() => fn(el, card), ms));
    try { egg.sound && egg.sound(); } catch (e) {}
    const done = () => { timers.forEach(clearTimeout); clearTimeout(t); card.classList.remove('eg-hot'); el.remove(); open = null; removeEventListener('pointerdown', skip, true); };
    const t = setTimeout(done, egg.dur);
    const born = performance.now(), skip = () => { if (performance.now() - born > 400) done(); };   // a tap anywhere ends it early
    addEventListener('pointerdown', skip, true);
    open = { el, done };
  }
  window.skEgg = (name) => { const p = SK.players.find((q) => q.name.toLowerCase() === name.toLowerCase()); const card = p && document.querySelector(`.card[data-n="${p.num}"]`); if (card && EGGS[name.toLowerCase()]) { if (open) open.done(); play(card, EGGS[name.toLowerCase()]); } };

  /* ---------- the long press ---------- */
  function wire() {
    SK.players.forEach((p) => {
      const egg = EGGS[(p.name || '').trim().toLowerCase()]; if (!egg) return;
      const card = document.querySelector(`.card[data-n="${p.num}"]`); if (!card || card.dataset.eg) return;
      card.dataset.eg = '1'; card.classList.add('eg-card');
      let timer = 0, warm = 0, x0 = 0, y0 = 0, fired = false;
      const stop = () => { clearTimeout(timer); clearTimeout(warm); card.classList.remove('charging'); };
      card.addEventListener('pointerdown', (e) => {
        if (e.button) return; fired = false; x0 = e.clientX; y0 = e.clientY;
        warm = setTimeout(() => card.classList.add('charging'), 250);
        timer = setTimeout(() => { stop(); fired = true; if (reduce) return; play(card, egg); }, 700);
      });
      card.addEventListener('pointermove', (e) => { if (Math.hypot(e.clientX - x0, e.clientY - y0) > 10) stop(); });
      ['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) => card.addEventListener(ev, stop));
      card.addEventListener('contextmenu', (e) => e.preventDefault());
      card.addEventListener('click', (e) => { if (fired) { fired = false; e.stopImmediatePropagation(); e.preventDefault(); } }, true);   // the hold doesn't also flip the card
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire); else wire();
})();
