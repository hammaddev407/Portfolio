  const words = ["WordPress Developer", "Full‑Stack Developer", "Custom Website Creator"];
  let i = 0;
  let j = 0;
  let currentWord = "";
  let isDeleting = false;
  const typewriterElement = document.getElementById("typewriter");
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}
  function typeEffect() {
    currentWord = words[i];
    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, j-1);
      j--;
      if (j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
      }
    } else {
      typewriterElement.textContent = currentWord.substring(0, j+1);
      j++;
      if (j === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
        return;
      }
    }
    setTimeout(typeEffect, 100);
  }
  typeEffect();

  // Intersection Observer for fade-up
  const faders = document.querySelectorAll('.fade-up');
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };
  const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));