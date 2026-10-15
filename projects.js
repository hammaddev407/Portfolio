(() => {
  const cards = [...document.querySelectorAll(".project-card")];
  const filters = [...document.querySelectorAll("[data-filter]")];
  const modal = document.querySelector("[data-project-modal]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalBody = document.querySelector("[data-modal-body]");
  const projectDetails = {
    1: { title: "Hammad Bites", problem: "A food platform needed a polished ordering experience with room for AI-assisted product features.", solution: "I shaped the Flutter experience around clear product discovery, branded UI, and a scalable full-stack direction.", results: "AI-ready food platform", image: "img/projects/food-delivery.svg" },
    2: { title: "Gym_website", problem: "A fitness brand needed a focused web presence to present its offer clearly.", solution: "I created a responsive page structure with visual hierarchy and clear content sections.", results: "Responsive fitness website", image: "img/projects/gym-website.svg" },
    3: { title: "Cosmatic-Website", problem: "A cosmetics storefront needed a polished visual direction.", solution: "I designed the storefront with a visual-first layout and responsive styling.", results: "Visual storefront concept", image: "img/projects/cosmatic-website.svg" },
    4: { title: "Pixel-Tracking", problem: "A tracking concept needed a simple interface for understanding user activity.", solution: "I built a lightweight web application around tracking-focused content and interactions.", results: "Tracking-focused web app", image: "img/projects/pixel-tracking.svg" },
  };

  filters.forEach((filter) => filter.addEventListener("click", () => {
    filters.forEach((item) => {
      const active = item === filter;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    const selected = filter.dataset.filter;
    cards.forEach((card) => card.classList.toggle("is-hidden", selected !== "all" && !card.dataset.category.split(" ").includes(selected)));
  }));

  const closeModal = () => {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("is-modal-open");
  };

  cards.forEach((card) => card.querySelector(".project-card__trigger")?.addEventListener("click", () => {
    const detail = projectDetails[card.dataset.project];
    if (!detail || !modal || !modalTitle || !modalBody) return;
    modalTitle.textContent = detail.title;
    modalBody.innerHTML = `<img src="${detail.image}" alt="${detail.title} case study screenshot" loading="lazy"><h3>Problem</h3><p>${detail.problem}</p><h3>Solution</h3><p>${detail.solution}</p><h3>Results</h3><p class="project-modal__metric">${detail.results}</p>`;
    modal.hidden = false;
    document.body.classList.add("is-modal-open");
    modal.querySelector(".project-modal__close")?.focus();
  }));
  modal?.querySelectorAll("[data-modal-close]").forEach((element) => element.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
})();
