let state = "light";
const darkMode = document.querySelector(".dark-mode");
const body = document.querySelector("body");
darkMode.addEventListener("click", () => {
  if (state === "light") {
    body.style.backgroundColor = "#2B3844";
    state = "dark";
  } else {
    body.style.backgroundColor = "#f2f2f2";
    state = "light";
  }
});
