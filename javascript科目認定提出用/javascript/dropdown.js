document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".dropdown-btn");
  const dropdown = document.querySelector(".dropdown");

  btn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });
});
