(() => {
  const typedTarget = document.querySelector("[data-typed-text]");
  const phrases = ["I build products clients remember.", "I design interfaces users understand.", "I ship experiences built to grow."];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  const type = () => {
    if (!typedTarget) return;
    if (reducedMotion) {
      typedTarget.textContent = phrases[0];
      return;
    }
    const phrase = phrases[phraseIndex];
    typedTarget.textContent = phrase.slice(0, characterIndex);
    if (!deleting && characterIndex < phrase.length) characterIndex += 1;
    else if (deleting && characterIndex > 0) characterIndex -= 1;
    else {
      deleting = !deleting;
      if (!deleting) phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    window.setTimeout(type, deleting ? 45 : characterIndex === phrase.length ? 1800 : 75);
  };
  type();

  const canvas = document.querySelector("[data-particles]");
  const context = canvas?.getContext("2d");
  if (canvas && context && !reducedMotion) {
    const particles = Array.from({ length: 45 }, () => ({ x: Math.random(), y: Math.random(), size: Math.random() * 2 + 1, speed: Math.random() * .0007 + .0002 }));
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#007BFF";
      particles.forEach((particle) => {
        particle.y -= particle.speed;
        if (particle.y < 0) particle.y = 1;
        context.globalAlpha = .5;
        context.beginPath();
        context.arc(particle.x * canvas.width, particle.y * canvas.height, particle.size, 0, Math.PI * 2);
        context.fill();
      });
      window.requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener("resize", resize);
    draw();
  }

  const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      revealObserver.unobserve(entry.target);
    }
  }), { threshold: .12 });
  document.querySelectorAll(".section-heading, .project-card, .service-card, .skill-card").forEach((element) => {
    if (reducedMotion) return;
    element.style.opacity = "0";
    element.style.transform = "translateY(18px)";
    element.style.transition = "opacity .6s ease, transform .6s ease";
    revealObserver.observe(element);
  });

  const backToTop = document.querySelector("[data-back-to-top]");
  window.addEventListener("scroll", () => {
    if (backToTop) backToTop.hidden = window.scrollY < 300;
  }, { passive: true });
  backToTop?.addEventListener("click", () => document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" }));
  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = new Date().getFullYear();
  if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
})();
