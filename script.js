const words = ["WordPress Developer", "Full-Stack Developer", "Custom Website Creator"];
const typewriterElement = document.getElementById("typewriter");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setMenuOpen(isOpen) {
  if (!menuToggle || !navLinks) return;
  navLinks.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.querySelector(".sr-only").textContent = isOpen
    ? "Close navigation"
    : "Open navigation";
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    setMenuOpen(!navLinks.classList.contains("active"));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });
}

if (typewriterElement) {
  if (prefersReducedMotion) {
    typewriterElement.textContent = words[0];
  } else {
    let wordIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];
      characterIndex += isDeleting ? -1 : 1;
      typewriterElement.textContent = currentWord.substring(0, characterIndex);

      if (!isDeleting && characterIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
        return;
      }
      if (isDeleting && characterIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(typeEffect, isDeleting ? 55 : 100);
    }

    typeEffect();
  }
}

const faders = document.querySelectorAll(".fade-up");
if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  faders.forEach((fader) => fader.classList.add("visible"));
} else {
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });

  faders.forEach((fader) => appearOnScroll.observe(fader));
}
