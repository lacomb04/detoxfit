document.querySelectorAll(".faq-question").forEach((item) => {
  item.addEventListener("click", () => {
    const parent = item.closest(".faq-item");
    parent.classList.toggle("open");
  });
});
