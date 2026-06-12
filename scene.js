/* ============================================================
   BREAKEVENFX — scene.js
   One continuous particle field (~22k GPU-rendered glow points),
   fully scroll-SCRUBBED: the scrollbar drags every particle
   between forms — stop scrolling and the morph freezes mid-flight.

     hero      →  structured wave terrain
     stats     →  a market chart that PLOTS ITSELF left→right
     mission   →  a globe that wraps into existence by longitude
     impact+   →  INDIA, built gradually: the gold coastline
                  traces itself around the border, the interior
                  fills south→north (Kanyakumari to Kashmir),
                  then city lights ignite and the camera zooms in.

   Particles glow brighter while travelling, so each transition
   reads as energy moving — not dots teleporting.
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

(() => {
  const canvas = document.getElementById("scene-canvas");
  if (!canvas) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth < 768;
  const COUNT = isMobile ? 9000 : 22000;
  const clamp01 = (v) => THREE.MathUtils.clamp(v, 0, 1);
  const smooth = (v) => v * v * (3 - 2 * v);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas, antialias: false, alpha: true, powerPreference: "high-performance",
    });
  } catch (e) {
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    55, window.innerWidth / window.innerHeight, 0.1, 600
  );
  const BASE_Z = isMobile ? 50 : 42;
  camera.position.set(0, 0, BASE_Z);

  /* ---------------- Palette ---------------- */
  const BLUE = new THREE.Color(0x5b9dff);
  const VIOLET = new THREE.Color(0x7c5cff);
  const CYAN = new THREE.Color(0x4cc9ff);
  const GOLD = new THREE.Color(0xffc24b);
  const tmpC = new THREE.Color();

  /* ---------------- Render buffers ---------------- */
  const pos = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  const sizes = new Float32Array(COUNT);
  const wigglePhase = new Float32Array(COUNT);
  const shell = new Float32Array(COUNT * 3); // intro scatter

  for (let i = 0; i < COUNT; i++) {
    sizes[i] = 0.16 + Math.random() * 0.34;
    wigglePhase[i] = Math.random() * Math.PI * 2;
    const a = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    const r = 55 + Math.random() * 30;
    shell[i * 3] = r * Math.sin(ph) * Math.cos(a);
    shell[i * 3 + 1] = r * Math.cos(ph);
    shell[i * 3 + 2] = -20 - Math.random() * 40;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
  geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute("aPhase", new THREE.BufferAttribute(wigglePhase, 1));

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPx: { value: renderer.getPixelRatio() },
      uCalm: { value: 0 }, // damps wiggle when the India map is in focus
    },
    vertexShader: `
      attribute vec3 aColor;
      attribute float aSize;
      attribute float aPhase;
      uniform float uTime;
      uniform float uPx;
      uniform float uCalm;
      varying vec3 vColor;
      void main() {
        vColor = aColor;
        vec3 p = position;
        float amp = 0.16 * (1.0 - uCalm * 0.7);
        p.x += sin(uTime * 0.6 + aPhase) * amp;
        p.y += cos(uTime * 0.8 + aPhase * 1.3) * amp * 0.8;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = aSize * uPx * (320.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.04, d);
        gl_FragColor = vec4(vColor, a * 0.85);
      }
    `,
  });

  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  scene.add(points);

  /* ---------------- Distant star backdrop ---------------- */
  function makeGlowTexture() {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.3, "rgba(255,255,255,0.5)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }
  const glowTex = makeGlowTexture();

  const STAR_COUNT = 700;
  const starPos = new Float32Array(STAR_COUNT * 3);
  for (let i = 0; i < STAR_COUNT; i++) {
    starPos.set([
      (Math.random() - 0.5) * 260,
      (Math.random() - 0.5) * 150,
      -70 - Math.random() * 110,
    ], i * 3);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
    size: 1.5, sizeAttenuation: false, map: glowTex, color: 0xbcd2ff,
    transparent: true, opacity: 0.4, depthWrite: false,
    blending: THREE.AdditiveBlending,
  }));
  scene.add(stars);

  /* ---------------- India geometry ---------------- */
  // Simplified India boundary (lon, lat), clockwise from Kashmir.
  const INDIA = [
    [73.9, 34.6], [74.9, 35.9], [76.8, 35.5], [78.2, 34.6], [78.9, 33.4],
    [78.7, 32.0], [79.5, 31.0], [80.5, 30.4], [81.5, 29.8], [83.0, 28.9],
    [84.6, 27.9], [86.3, 27.0], [88.0, 26.4], [88.3, 27.3], [89.3, 26.9],
    [90.7, 26.8], [92.1, 26.9], [93.0, 27.2], [94.4, 27.6], [95.6, 28.3],
    [97.3, 28.3], [96.8, 27.4], [95.5, 26.8], [94.8, 25.7], [94.4, 24.5],
    [93.4, 23.4], [92.8, 22.2], [92.4, 23.3], [92.0, 24.4], [91.2, 24.2],
    [90.2, 25.2], [89.1, 25.3], [88.5, 26.3], [88.0, 25.5], [88.6, 24.6],
    [88.05, 23.9], [88.7, 23.0], [89.0, 22.1], [87.3, 21.7], [86.5, 20.7],
    [85.4, 19.8], [84.0, 18.4], [82.4, 17.2], [80.7, 16.0], [80.2, 15.0],
    [80.4, 13.4], [80.0, 12.0], [79.8, 10.8], [79.0, 9.5], [77.5, 8.1],
    [76.6, 8.9], [76.1, 10.3], [75.4, 11.7], [74.7, 13.2], [74.1, 14.8],
    [73.5, 16.4], [73.0, 18.0], [72.7, 19.7], [72.8, 21.1], [72.0, 21.2],
    [70.9, 20.7], [69.5, 21.7], [68.6, 22.4], [68.2, 23.5], [69.0, 24.0],
    [70.3, 24.4], [71.0, 25.2], [70.2, 26.0], [69.7, 27.0], [70.6, 27.9],
    [71.9, 28.1], [73.0, 29.5], [73.9, 30.8], [74.6, 31.9], [74.0, 32.8],
  ];

  function project(lon, lat) {
    return [(lon - 80.5) * 0.66 - 1.2, (lat - 22.5) * 0.72];
  }
  const POLY = INDIA.map(([lon, lat]) => project(lon, lat));

  function inPoly(x, y) {
    let inside = false;
    for (let i = 0, j = POLY.length - 1; i < POLY.length; j = i++) {
      const [xi, yi] = POLY[i];
      const [xj, yj] = POLY[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
        inside = !inside;
      }
    }
    return inside;
  }

  const segLen = [];
  let outlineLen = 0;
  for (let i = 0; i < POLY.length; i++) {
    const [x1, y1] = POLY[i];
    const [x2, y2] = POLY[(i + 1) % POLY.length];
    const l = Math.hypot(x2 - x1, y2 - y1);
    segLen.push(l);
    outlineLen += l;
  }
  function outlinePoint(t) {
    let d = t * outlineLen;
    for (let i = 0; i < POLY.length; i++) {
      if (d <= segLen[i]) {
        const [x1, y1] = POLY[i];
        const [x2, y2] = POLY[(i + 1) % POLY.length];
        const k = segLen[i] === 0 ? 0 : d / segLen[i];
        return [x1 + (x2 - x1) * k, y1 + (y2 - y1) * k];
      }
      d -= segLen[i];
    }
    return POLY[0];
  }

  const bbox = { x0: 99, x1: -99, y0: 99, y1: -99 };
  POLY.forEach(([x, y]) => {
    bbox.x0 = Math.min(bbox.x0, x); bbox.x1 = Math.max(bbox.x1, x);
    bbox.y0 = Math.min(bbox.y0, y); bbox.y1 = Math.max(bbox.y1, y);
  });

  /* ============================================================
     Shape keyframes. Each shape stores positions + colors for
     every particle; per-segment stagger values choreograph HOW
     the next shape assembles (chart plots, globe wraps, India
     traces its coast then fills south→north).
     ============================================================ */
  const shapes = Array.from({ length: 4 }, () => ({
    pos: new Float32Array(COUNT * 3),
    col: new Float32Array(COUNT * 3),
  }));
  // stag[s][i]: when (0..1, within segment s) particle i starts flying
  const stag = [
    new Float32Array(COUNT),
    new Float32Array(COUNT),
    new Float32Array(COUNT),
  ];
  const SEG_W = [0.45, 0.45, 0.16]; // per-particle flight window per segment

  function setP(arr, i, x, y, z) {
    arr[i * 3] = x; arr[i * 3 + 1] = y; arr[i * 3 + 2] = z;
  }
  function setC(arr, i, color, brightness) {
    arr[i * 3] = color.r * brightness;
    arr[i * 3 + 1] = color.g * brightness;
    arr[i * 3 + 2] = color.b * brightness;
  }

  /* --- 0: structured wave terrain (hero) --- */
  (function buildWave() {
    const { pos: P, col: C } = shapes[0];
    const ROWS = 70;
    const COLS = Math.ceil(COUNT / ROWS);
    for (let i = 0; i < COUNT; i++) {
      const cI = Math.floor(i / ROWS);
      const rI = i % ROWS;
      const x = (cI / (COLS - 1) - 0.5) * 78 + (Math.random() - 0.5) * 0.5;
      const z = (rI / (ROWS - 1) - 0.5) * 30 + (Math.random() - 0.5) * 0.4;
      const crest = Math.sin(x * 0.18) * 1.7 + Math.cos(z * 0.3) * 1.3;
      const y = -8.5 + crest + Math.random() * 0.25;
      setP(P, i, x, y, z);
      tmpC.copy(BLUE).lerp(VIOLET, clamp01((x + 39) / 78));
      if (rI % 7 === 0) tmpC.lerp(CYAN, 0.5); // glowing scanlines in the mesh
      const crestGlow = clamp01((crest + 3) / 6);
      setC(C, i, tmpC, 0.12 + crestGlow * 0.34 + Math.random() * 0.08);
    }
  })();

  /* --- 1: market chart that plots itself left→right (stats) --- */
  (function buildChart() {
    const { pos: P, col: C } = shapes[1];
    for (let i = 0; i < COUNT; i++) {
      const u = Math.random();
      const lineY = -7.5 + 14.5 * u + Math.sin(u * 14) * 1.1 + Math.sin(u * 33) * 0.5;
      const depthMax = lineY + 10;
      const depth = Math.pow(Math.random(), 2.2) * depthMax;
      setP(P, i, -27 + 54 * u, lineY - depth, (Math.random() - 0.5) * 3.5);
      const nearLine = 1 - depth / depthMax;
      if (u > 0.965 && nearLine > 0.85) {
        // gold leading tip — the "live" end of the chart
        setC(C, i, GOLD, 0.9);
      } else {
        if (u < 0.5) tmpC.copy(VIOLET).lerp(BLUE, u * 2);
        else tmpC.copy(BLUE).lerp(CYAN, (u - 0.5) * 2);
        setC(C, i, tmpC, 0.1 + nearLine * nearLine * 0.85);
      }
      stag[0][i] = u; // the chart draws in x-order as you scroll
    }
  })();

  /* --- 2: globe wrapping into existence by longitude (mission) --- */
  (function buildGlobe() {
    const { pos: P, col: C } = shapes[2];
    for (let i = 0; i < COUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      const r = 9.5 + (Math.random() - 0.5) * 0.5;
      setP(P, i,
        4 + r * Math.sin(ph) * Math.cos(a),
        r * Math.cos(ph),
        -2 + r * Math.sin(ph) * Math.sin(a)
      );
      tmpC.copy(BLUE).lerp(CYAN, Math.random() * 0.7);
      if (Math.random() < 0.015) tmpC.copy(GOLD);
      setC(C, i, tmpC, 0.18 + Math.random() * 0.5);
      stag[1][i] = a / (Math.PI * 2); // globe wraps around by longitude
    }
  })();

  /* --- 3: INDIA — coast traces, fill sweeps south→north (impact+) --- */
  (function buildIndia() {
    const { pos: P, col: C } = shapes[3];
    const outlineCount = Math.floor(COUNT * 0.16);
    const fillCount = Math.floor(COUNT * 0.76);
    for (let i = 0; i < COUNT; i++) {
      if (i < outlineCount) {
        const along = i / outlineCount;
        const [x, y] = outlinePoint(along);
        setP(P, i,
          x + (Math.random() - 0.5) * 0.22,
          y + (Math.random() - 0.5) * 0.22,
          (Math.random() - 0.5) * 0.7
        );
        setC(C, i, GOLD, 0.55 + Math.random() * 0.45);
        stag[2][i] = along * 0.5; // the coastline TRACES itself in order
      } else if (i < outlineCount + fillCount) {
        let x, y, tries = 0;
        do {
          x = bbox.x0 + Math.random() * (bbox.x1 - bbox.x0);
          y = bbox.y0 + Math.random() * (bbox.y1 - bbox.y0);
          tries++;
        } while (!inPoly(x, y) && tries < 40);
        if (tries >= 40) { x = -1.2; y = 0; }
        setP(P, i, x, y, (Math.random() - 0.5) * 1.4);
        const vNorm = clamp01((y - bbox.y0) / (bbox.y1 - bbox.y0));
        tmpC.copy(VIOLET).lerp(BLUE, vNorm);
        if (Math.random() < 0.05) tmpC.copy(CYAN);
        setC(C, i, tmpC, 0.16 + Math.random() * 0.5);
        // fill sweeps Kanyakumari → Kashmir after the coast is traced
        stag[2][i] = 0.52 + vNorm * 0.46;
      } else {
        const a = Math.random() * Math.PI * 2;
        const r = 14 + Math.random() * 16;
        setP(P, i, Math.cos(a) * r - 1.2, Math.sin(a) * r * 0.8, -6 - Math.random() * 10);
        setC(C, i, BLUE, 0.06 + Math.random() * 0.12);
        stag[2][i] = Math.random() * 0.3;
      }
    }
  })();

  /* ---------------- City lights (gold pulses on the map) ---------------- */
  const CITIES = [
    [77.2, 28.6], [75.8, 26.9], [80.9, 26.8], [85.1, 25.6], [88.4, 22.6],
    [91.7, 26.1], [77.4, 23.3], [78.5, 17.4], [80.3, 13.1], [72.9, 19.1],
    [77.6, 13.0],
  ];
  const cityGroup = new THREE.Group();
  const citySprites = CITIES.map(([lon, lat]) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex, color: 0xffc24b, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    const [x, y] = project(lon, lat);
    s.position.set(x, y, 1.2);
    s.scale.set(1.6, 1.6, 1);
    cityGroup.add(s);
    return s;
  });
  scene.add(cityGroup);

  /* ============================================================
     Scroll scrubbing: t maps to a "shape coordinate" f ∈ [0,3]
     with plateaus where each form holds fully assembled.
       0.00–0.06  wave holds          (hero)
       0.06–0.20  wave → chart        (chart plots left→right)
       0.20–0.32  chart holds         (stats)
       0.32–0.48  chart → globe       (wraps by longitude)
       0.48–0.56  globe holds         (mission/programs)
       0.56–0.78  globe → INDIA       (coast traces, fill sweeps north)
       0.78–1.00  India holds — cities ignite, camera zooms in
     ============================================================ */
  function shapeCoord(t) {
    if (t <= 0.06) return 0;
    if (t <= 0.20) return (t - 0.06) / 0.14;
    if (t <= 0.32) return 1;
    if (t <= 0.48) return 1 + (t - 0.32) / 0.16;
    if (t <= 0.56) return 2;
    if (t <= 0.78) return 2 + (t - 0.56) / 0.22;
    return 3;
  }

  /* ---------------- Scroll + mouse ---------------- */
  let scrollT = 0;
  let smoothT = 0;
  let mouseX = 0, mouseY = 0;

  function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollT = max > 0 ? window.scrollY / max : 0;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mat.uniforms.uPx.value = renderer.getPixelRatio();
    if (prefersReduced) renderOnce();
  });

  /* ---------------- Frame loop ---------------- */
  const clock = new THREE.Clock();
  let introK = prefersReduced ? 1 : 0;

  function composite(t, time) {
    const f = shapeCoord(t);
    const s = Math.min(2, Math.floor(f));
    const u = clamp01(f - s);
    const A = shapes[s], B = shapes[s + 1];
    const st = stag[s];
    const W = SEG_W[s];
    const introBlend = introK < 1 ? smooth(introK) : 1;

    for (let i = 0; i < COUNT; i++) {
      // per-particle flight: starts at its stagger value, flies for W
      let up = (u - st[i] * (1 - W)) / W;
      up = up < 0 ? 0 : up > 1 ? 1 : up;
      const e = up * up * (3 - 2 * up);
      const boost = 1 + up * (1 - up) * 2.8; // glow while travelling

      const i3 = i * 3;
      let x = A.pos[i3] + (B.pos[i3] - A.pos[i3]) * e;
      let y = A.pos[i3 + 1] + (B.pos[i3 + 1] - A.pos[i3 + 1]) * e;
      let z = A.pos[i3 + 2] + (B.pos[i3 + 2] - A.pos[i3 + 2]) * e;
      if (introBlend < 1) {
        x = shell[i3] + (x - shell[i3]) * introBlend;
        y = shell[i3 + 1] + (y - shell[i3 + 1]) * introBlend;
        z = shell[i3 + 2] + (z - shell[i3 + 2]) * introBlend;
      }
      pos[i3] = x; pos[i3 + 1] = y; pos[i3 + 2] = z;

      col[i3] = (A.col[i3] + (B.col[i3] - A.col[i3]) * e) * boost * introBlend;
      col[i3 + 1] = (A.col[i3 + 1] + (B.col[i3 + 1] - A.col[i3 + 1]) * e) * boost * introBlend;
      col[i3 + 2] = (A.col[i3 + 2] + (B.col[i3 + 2] - A.col[i3 + 2]) * e) * boost * introBlend;
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.aColor.needsUpdate = true;

    // camera: still while reading, zooming in for the India finale
    const zoom = smooth(clamp01((t - 0.72) / 0.28));
    camera.position.x = mouseX * 1.3 * (1 - zoom * 0.5) + Math.sin(time * 0.05) * 0.6;
    camera.position.y = -mouseY * 0.7 * (1 - zoom * 0.5);
    camera.position.z = BASE_Z - (isMobile ? 14 : 17) * zoom;
    camera.lookAt(0, 0, 0);
    mat.uniforms.uCalm.value = zoom;

    // gentle drift; an extra slow spin while the globe is centre-stage
    const globeW = clamp01(1 - Math.abs(f - 2));
    points.rotation.y =
      Math.sin(time * 0.06) * 0.05 * (1 - zoom) +
      Math.sin(time * 0.22) * 0.16 * globeW;

    // city lights ignite only once the map has fully assembled
    const cityOp = clamp01((t - 0.8) / 0.08);
    citySprites.forEach((sp, i) => {
      sp.material.opacity = cityOp * (0.5 + 0.3 * Math.sin(time * 2.4 + i * 1.7));
      const sc = 1.4 + 0.5 * Math.sin(time * 2.4 + i * 1.7);
      sp.scale.set(sc, sc, 1);
    });

    stars.rotation.z = time * 0.003;
  }

  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const time = clock.elapsedTime;
    if (introK < 1) introK = Math.min(1, introK + dt / 2.2);
    smoothT += (scrollT - smoothT) * (1 - Math.exp(-4 * dt));
    composite(clamp01(smoothT), time);
    renderer.render(scene, camera);
  }

  function renderOnce() {
    scrollT = 0.9;
    smoothT = 0.9;
    composite(0.9, 0);
    citySprites.forEach((s) => (s.material.opacity = 0.6));
    renderer.render(scene, camera);
  }

  if (prefersReduced) {
    renderOnce();
    return;
  }
  renderer.setAnimationLoop(frame);
})();
