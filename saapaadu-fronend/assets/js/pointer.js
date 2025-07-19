// frontend/assets/js/pointer.js
const cursor = document.getElementById("cursor");

document.addEventListener("pointermove", (e) => {
  cursor.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
});
