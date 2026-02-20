(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Typewriter
  const target = document.getElementById("typedName");
  const fullText = "Daniil Medov";

  function finishLoad() {
    document.body.classList.add("loaded");
  }

  function typeText() {
    if (!target) {
      finishLoad();
      return;
    }

    if (prefersReduced) {
      target.textContent = fullText;
      finishLoad();
      return;
    }

    let i = 0;
    const step = () => {
      target.textContent = fullText.slice(0, i);
      i++;
      if (i <= fullText.length) {
        setTimeout(step, 42);
      } else {
        // small pause then reveal
        setTimeout(finishLoad, 120);
      }
    };
    step();
  }

  typeText();

  // Background particles (subtle)
  const canvas = document.getElementById("bg");
  const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx) return;

  let w = 0, h = 0, dpr = 1;
  let particles = [];
  const mouse = { x: null, y: null };
  const baseCount = 85;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = Math.floor(window.innerWidth);
    h = Math.floor(window.innerHeight);

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(55, Math.floor(baseCount * (w / 900)));
    particles = Array.from({ length: count }, () => makeParticle(true));
  }

  function makeParticle(randomY = false) {
    return {
      x: Math.random() * w,
      y: randomY ? Math.random() * h : -10,
      r: 1 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.25,
      vy: 0.25 + Math.random() * 0.55,
      a: 0.20 + Math.random() * 0.35
    };
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // soft haze
    const g = ctx.createRadialGradient(w * 0.2, h * 0.15, 0, w * 0.2, h * 0.15, Math.max(w, h) * 0.6);
    g.addColorStop(0, "rgba(124, 92, 255, 0.08)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.y > h + 20) {
        p.y = -20;
        p.x = Math.random() * w;
      }
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${p.a})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // connections near mouse
    if (!prefersReduced && mouse.x !== null && mouse.y !== null) {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dist < 140) {
          const alpha = (1 - dist / 140) * 0.10;
          ctx.strokeStyle = `rgba(124, 92, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  function onMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }
  function onLeave() {
    mouse.x = null;
    mouse.y = null;
  }

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("mouseleave", onLeave);

  resize();
  if (!prefersReduced) draw();
})();