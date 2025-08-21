function openPopup() {
  document.getElementById("popup-overlay").style.display = "block";
  document.getElementById("popup-box").style.display = "block";
}

function closePopup() {
  document.getElementById("popup-overlay").style.display = "none";
  document.getElementById("popup-box").style.display = "none";
}
/* ==========animation======= */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-left");
  const inputs = document.querySelectorAll(
    ".contact-inputs, button, #contact-home-btn"
  );

  // Animate the whole form
  form.classList.add("animate-form");

  // Animate inputs one by one
  inputs.forEach((input, index) => {
    setTimeout(
      () => {
        input.classList.add("animate-input");
      },
      (index + 1) * 200
    ); // staggered effect
  });
});
