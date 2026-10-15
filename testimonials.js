(() => {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll("[data-slide]")];
  const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
  let current = 0;
  let timer;

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.hidden = !active;
      slide.classList.toggle("is-active", active);
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === current;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", String(active));
    });
  };
  const start = () => { timer = window.setInterval(() => showSlide(current + 1), 5000); };
  const reset = () => { window.clearInterval(timer); start(); };
  carousel.querySelector("[data-carousel-prev]")?.addEventListener("click", () => { showSlide(current - 1); reset(); });
  carousel.querySelector("[data-carousel-next]")?.addEventListener("click", () => { showSlide(current + 1); reset(); });
  dots.forEach((dot) => dot.addEventListener("click", () => { showSlide(Number(dot.dataset.carouselDot)); reset(); }));
  carousel.addEventListener("mouseenter", () => window.clearInterval(timer));
  carousel.addEventListener("mouseleave", start);
  showSlide(0);
  start();
})();
