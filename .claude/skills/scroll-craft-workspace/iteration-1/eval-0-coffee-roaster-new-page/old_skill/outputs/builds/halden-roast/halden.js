/* ============================================================================
   Halden Roast: bespoke page behaviour. The engine is untouched.

   1. The collapse. The close act publishes --sc-p; this maps it onto
      --hr-split, which every side-dependent thing (grounds, divider, close
      plates, close copy) reads from CSS. Under reduced motion it cuts instead
      of gliding.
   2. The trier (signature move). A spoon of beans rides the divider and roasts
      as the page is scrolled: colour, swell, crease, phase label. "Drop" lands
      exactly where the divider finishes collapsing.
   3. Pointer lean on the hero planes, fine pointers only.
   4. data-sc-verify-state on the two stages whose motion the harness cannot
      read on its own (parallax offsets, divider position), and an honest
      verify-hold only while the close is actually resolved.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)');

  var heroAct = document.getElementById('hero');
  var closeAct = document.getElementById('subscribe');
  if (!heroAct || !closeAct) return;
  var heroStage = heroAct.querySelector('[data-sc-stage]');
  var closeStage = closeAct.querySelector('[data-sc-stage]');
  var trier = document.querySelector('.hr-trier');
  var phaseEl = trier && trier.querySelector('.hr-trier__phase');

  var clamp01 = function (x) { return x < 0 ? 0 : x > 1 ? 1 : x; };
  var easeInOut = function (x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  var lerp = function (a, b, t) { return a + (b - a) * t; };

  // Collapse window in close-act progress. The divider starts moving a little
  // after the stage pins and is fully home at DROP, where the beans drop.
  var COLLAPSE_FROM = 0.10, DROP = 0.62;

  // Bean colour stops: green, straw, cinnamon, brown, roasted.
  var STOPS = [
    [0.00, [143, 163, 122]],
    [0.30, [201, 178, 122]],
    [0.55, [154, 95, 53]],
    [0.80, [91, 58, 34]],
    [1.00, [58, 36, 23]]
  ];
  var PHASES = [
    [0.12, 'green'], [0.34, 'drying'], [0.55, 'browning'],
    [0.66, 'first crack'], [0.96, 'development'], [1.01, 'drop']
  ];
  function beanColor(r) {
    for (var i = 1; i < STOPS.length; i++) {
      if (r <= STOPS[i][0]) {
        var a = STOPS[i - 1], b = STOPS[i];
        var t = (r - a[0]) / Math.max(b[0] - a[0], 0.001);
        return 'rgb(' + Math.round(lerp(a[1][0], b[1][0], t)) + ',' +
                        Math.round(lerp(a[1][1], b[1][1], t)) + ',' +
                        Math.round(lerp(a[1][2], b[1][2], t)) + ')';
      }
    }
    var last = STOPS[STOPS.length - 1][1];
    return 'rgb(' + last.join(',') + ')';
  }
  function phaseFor(r) {
    for (var i = 0; i < PHASES.length; i++) if (r < PHASES[i][0]) return PHASES[i][1];
    return 'drop';
  }

  var base = 0.5;
  function measure() {
    base = parseFloat(getComputedStyle(root).getPropertyValue('--hr-base')) || 0.5;
    root.style.setProperty('--hr-vw', root.clientWidth + 'px');
  }

  var lastPhase = '', lastState = {};
  function set(name, v) {
    if (lastState[name] === v) return;
    lastState[name] = v;
    root.style.setProperty(name, v);
  }

  function frame() {
    var y = scrollY || pageYOffset;
    var vh = innerHeight;

    // Close geometry, same arithmetic as the engine's pinned progress.
    var cRect = closeAct.getBoundingClientRect();
    var cTop = cRect.top + y;
    var travel = Math.max(closeAct.offsetHeight - vh, 1);
    var cp = clamp01((y - cTop) / travel);

    // 1. The collapse.
    var k = clamp01((cp - COLLAPSE_FROM) / (DROP - COLLAPSE_FROM));
    var split = reduce ? (cp >= 0.35 ? 0 : base) : base * (1 - easeInOut(k));
    set('--hr-split', split.toFixed(4));

    // 2. The trier. Roast progress runs from the top of the page to the drop.
    var dropY = cTop + travel * DROP;
    var r = clamp01(y / Math.max(dropY, 1));
    set('--hr-prog', r.toFixed(4));
    set('--hr-bean', beanColor(r));
    set('--hr-swell', (1 + 0.16 * clamp01((r - 0.45) / 0.45)).toFixed(3));
    set('--hr-crease', clamp01((r - 0.5) / 0.2).toFixed(3));
    var ph = phaseFor(r);
    if (ph !== lastPhase && phaseEl) {
      lastPhase = ph;
      phaseEl.textContent = ph;
      trier.classList.toggle('is-dropped', ph === 'drop');
    }

    // 4. Verify-state: the values that actually paint, rounded.
    var hp = parseFloat(heroAct.style.getPropertyValue('--sc-p')) || 0;
    if (reduce) {
      heroStage.setAttribute('data-sc-verify-state', 'static');
      heroStage.setAttribute('data-sc-verify-hold', 'true');
    } else {
      heroStage.setAttribute('data-sc-verify-state',
        'bg:' + Math.round(-1.2 * (hp - 0.5) * 100) + '|fg:' + Math.round(0.45 * (hp - 0.5) * 100));
    }
    closeStage.setAttribute('data-sc-verify-state',
      'split:' + split.toFixed(2) + '|glow:' + (0.25 + cp * 0.75).toFixed(2));
    closeStage.setAttribute('data-sc-verify-hold', cp >= 0.8 ? 'true' : 'false');
  }

  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; frame(); });
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', function () { measure(); schedule(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  measure();
  frame();
  // The engine lays out on load; read once more after it has.
  setTimeout(function () { measure(); frame(); }, 60);
  addEventListener('load', function () { measure(); frame(); });

  // 3. Pointer lean on the hero planes. The environment shifts slightly as the
  //    visitor moves, the way a room does when you lean. Fine pointers only,
  //    never under reduced motion, and never the only way to see the depth.
  if (fine.matches && !reduce && heroStage) {
    var planes = Array.prototype.map.call(heroStage.querySelectorAll('.hr-plane'), function (el) {
      var rate = parseFloat(el.getAttribute('data-sc-parallax')) || 0;
      return { el: el.querySelector('.hr-plane__in'), depth: -rate, x: 0, y: 0, tx: 0, ty: 0 };
    });
    var tx = 0, ty = 0, leaning = false, raf = null;
    heroStage.addEventListener('pointermove', function (e) {
      var w = innerWidth, h = innerHeight;
      tx = (e.clientX / w - 0.5); ty = (e.clientY / h - 0.5);
      if (!raf) raf = requestAnimationFrame(lean);
    });
    heroStage.addEventListener('pointerleave', function () { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(lean); });
    function lean() {
      raf = null;
      var settled = true;
      for (var i = 0; i < planes.length; i++) {
        var p = planes[i];
        p.x += (tx * p.depth * 14 - p.x) * 0.12;
        p.y += (ty * p.depth * 9 - p.y) * 0.12;
        if (Math.abs(p.x - p.tx) > 0.05 || Math.abs(p.y - p.ty) > 0.05) settled = false;
        p.tx = p.x; p.ty = p.y;
        if (p.el) p.el.style.transform = 'translate3d(' + p.x.toFixed(2) + 'px,' + p.y.toFixed(2) + 'px,0)';
      }
      if (!settled || Math.abs(tx * 14) > 0.05) raf = requestAnimationFrame(lean);
    }
  }
})();
