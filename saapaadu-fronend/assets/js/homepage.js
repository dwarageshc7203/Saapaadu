// frontend/assets/js/homepage.js
window.addEventListener("DOMContentLoaded", () => {
  gsap.to(".title", { duration: 1, y: 0, opacity: 1, ease: "power3.out" });
  gsap.to(".subtitle", { duration: 1, y: 0, opacity: 1, delay: 0.4, ease: "power3.out" });
  gsap.to(".buttons", { duration: 1, y: 0, opacity: 1, delay: 0.8, ease: "power3.out" });
});
