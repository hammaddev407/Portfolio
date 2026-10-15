(() => {
  const form = document.querySelector("[data-contact-form]");
  const toast = document.querySelector("[data-toast]");
  if (!form) return;
  const fields = [...form.querySelectorAll("input, select, textarea")];
  const rules = {
    name: (value) => value.trim().length >= 2 ? "" : "Please enter your name.",
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Please enter a valid email.",
    projectType: (value) => value ? "" : "Please choose a project type.",
    budget: (value) => value ? "" : "Please choose a budget range.",
    message: (value) => value.trim().length >= 20 ? "" : "Please share at least 20 characters."
  };
  const validate = (field) => {
    const message = rules[field.name]?.(field.value) || "";
    const wrapper = field.closest(".form-field");
    const error = form.querySelector(`[data-error-for="${field.name}"]`);
    wrapper?.classList.toggle("is-invalid", Boolean(message));
    if (error) error.textContent = message;
    return !message;
  };
  fields.forEach((field) => {
    field.addEventListener("input", () => validate(field));
    field.addEventListener("change", () => validate(field));
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!fields.every(validate)) return;
    form.reset();
    toast.textContent = "Thanks — your message passed validation. Connect via GitHub to continue the conversation.";
    toast.classList.add("is-visible");
    window.setTimeout(() => toast.classList.remove("is-visible"), 5000);
  });
})();
