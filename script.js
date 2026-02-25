(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- i18n ---
  const i18n = {
    en: {
      subtitle: "Python-first developer • Linux power user • Web & automation",
      btn_contact: "Contact (Telegram)",
      btn_shop: "AZ Shop",
      btn_english: "Easy Peasy English",
      btn_website: "Website",

      about_title: "About",
      about_text:
        "I’m a software developer with hands-on experience since 2021. My main language is Python — I use it for automation, tooling, backend tasks, and building practical apps. I’m also confident in Linux environments: I can set up systems, work comfortably in terminal, and troubleshoot issues efficiently.",

      focus_title: "Focus",
      focus_1: "Clean, maintainable engineering",
      focus_2: "Automation, bots, internal tools",
      focus_3: "Backend logic, APIs, integrations",
      focus_4: "Performance & fundamentals",

      strengths_title: "Strengths",
      strength_1: "Analytical thinking & fast learning",
      strength_2: "Problem solving under time pressure",
      strength_3: "Comfortable with debugging and profiling",
      strength_4: "Shipping projects end-to-end",

      skills_title: "Skills",
      skill_python: "Python (main)",
      skill_linux: "Linux (confident)",
      skill_bash: "Bash scripting",
      skill_git: "Git / GitHub",
      skill_cpp: "C++ (fundamentals + practice)",
      skill_algo: "Algorithms & data structures",
      skill_web: "Web: HTML / CSS / JS (basic)",
      skill_api: "REST APIs",
      skill_sql: "SQL basics",
      skill_automation: "Automation & parsers",
      skill_bots: "Telegram bots",
      skill_cli: "CLI tools",
      skill_docker: "Docker (basic)",
      skill_sec: "Cybersecurity tooling (labs)",
      skill_langs: "English / Russian",
      skill_video: "DaVinci Resolve (basic)",

      note_github: "Open-source projects and examples are available on my GitHub.",

      cert_title: "Certification",
      cert_sub: "Anthropic • Online",
      cert_desc:
        "API usage, advanced prompting, tool integration, workflow patterns, and building AI-powered features (including RAG and multimodal processing).",

      footer_brand: "MEDOFF / medovi40k"
    },

    ru: {
      subtitle: "Python-разработчик • Linux • Веб и автоматизация",
      btn_contact: "Связаться со мной (Telegram)",
      btn_shop: "AZ Shop",
      btn_english: "Easy Peasy English",
      btn_website: "Сайт",

      about_title: "Обо мне",
      about_text:
        "Я разработчик опытом в разработке с 2021 года. Мой основной язык — Python: использую его для автоматизации, инструментов, бэкенда и прикладных проектов. Уверенно пользуюсь Linux'ом: настраиваю окружение, комфортно работаю в терминале и быстро разбираюсь с проблемами.",

      focus_title: "Фокус",
      focus_1: "Чистый и поддерживаемый код",
      focus_2: "Автоматизация, боты, внутренние инструменты",
      focus_3: "Бэкенд-логика, API, интеграции",
      focus_4: "Производительность и сильная база",

      strengths_title: "Сильные стороны",
      strength_1: "Аналитическое мышление и быстрое обучение",
      strength_2: "Решение задач под дедлайны",
      strength_3: "Уверенный дебаг, поиск причин, профилирование",
      strength_4: "Довожу проекты до результата",

      skills_title: "Навыки",
      skill_python: "Python (основной)",
      skill_linux: "Linux (уверенно)",
      skill_bash: "Bash-скрипты",
      skill_git: "Git / GitHub",
      skill_cpp: "C++ (база + практика)",
      skill_algo: "Алгоритмы и структуры данных",
      skill_web: "Веб: HTML / CSS / JS (база)",
      skill_api: "REST API",
      skill_sql: "SQL (база)",
      skill_automation: "Автоматизация и парсеры",
      skill_bots: "Telegram-боты",
      skill_cli: "CLI-инструменты",
      skill_docker: "Docker (база)",
      skill_sec: "Инструменты безопасности (лабы)",
      skill_langs: "Английский / Русский",
      skill_video: "DaVinci Resolve (база)",

      note_github: "Проекты и примеры кода — на моём GitHub.",

      cert_title: "Сертификация",
      cert_sub: "Anthropic • Онлайн",
      cert_desc:
        "Работа с API, продвинутый prompting, интеграция инструментов, паттерны воркфлоу и создание AI-фич (включая RAG и мультимодальность).",

      footer_brand: "MEDOFF / medovi40k"
    }
  };

  function detectDefaultLang() {
    // UA -> RU (based on browser locale)
    const navLang = (navigator.language || "").toLowerCase();
    const navLangs = (navigator.languages || []).map(s => (s || "").toLowerCase());
    const all = [navLang, ...navLangs].filter(Boolean).join(" | ");

    if (all.startsWith("uk") || all.includes(" uk") || all.includes("uk-")) return "ru";
    if (all.startsWith("ru") || all.includes(" ru") || all.includes("ru-")) return "ru";
    return "en";
  }

  const switchEl = document.querySelector(".lang-switch");

  function applyLang(lang) {
    const dict = i18n[lang] || i18n.en;

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    // update slider position
    if (switchEl) switchEl.setAttribute("data-lang", lang);

    localStorage.setItem("lang", lang);
  }

  // init language
  const saved = localStorage.getItem("lang");
  const initial = saved === "ru" || saved === "en" ? saved : detectDefaultLang();
  applyLang(initial);

  // click handlers
  document.querySelectorAll(".lang-opt").forEach(btn => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });

  // keyboard support (left/right)
  if (switchEl) {
    switchEl.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const current = switchEl.getAttribute("data-lang") || initial;
      const next = current === "en" ? "ru" : "en";
      applyLang(next);
    });
  }

  // --- Typewriter ---
  const target = document.getElementById("typedName");
  const fullText = "Daniil Medov";

  function finishLoad() {
    document.body.classList.add("loaded");
  }

  function typeText() {
    if (!target) { finishLoad(); return; }
    if (prefersReduced) { target.textContent = fullText; finishLoad(); return; }

    let i = 0;
    const step = () => {
      target.textContent = fullText.slice(0, i);
      i++;
      if (i <= fullText.length) setTimeout(step, 42);
      else setTimeout(finishLoad, 120);
    };
    step();
  }

  typeText();

  // --- Background particles (subtle) ---
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

    const g = ctx.createRadialGradient(w * 0.2, h * 0.15, 0, w * 0.2, h * 0.15, Math.max(w, h) * 0.6);
    g.addColorStop(0, "rgba(124, 92, 255, 0.08)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.y > h + 20) { p.y = -20; p.x = Math.random() * w; }
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${p.a})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

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

  function onMove(e) { mouse.x = e.clientX; mouse.y = e.clientY; }
  function onLeave() { mouse.x = null; mouse.y = null; }

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("mouseleave", onLeave);

  resize();
  if (!prefersReduced) draw();
})();