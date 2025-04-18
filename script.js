const searchInput = document.querySelector(".search-text");
const flagsContainer = document.querySelector(".flags");
function getCountryByName() {}
searchInput.addEventListener("keypress", checkIfEnter);
const flags = document.querySelectorAll(".flag");
function generateAllCountries() {
  flagsContainer.innerHTML = "";
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((countries) => {
      countries.forEach((country) => {
        if (country.name.common === "Israel") return;
        const html = `
        <div class="flag">
          <img class="flag-img" src="${country.flags.png}" alt="${
          country.name.common
        }" />
          <div class="flag-txt">
            <div class="flag-title">${country.name.common}</div>
            <div class="flag-description">
              <p class="info">Population: <span class="info-value">${
                country.population
              }</span></p>
              <p class="info">Region: <span class="info-value">${
                country.region
              }</span></p>
              <p class="info">Capital: <span class="info-value">${
                country.capital ? country.capital[0] : "N/A"
              }</span></p>
            </div>
          </div>
        </div>`;
        flagsContainer.insertAdjacentHTML("beforeend", html);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}
generateAllCountries();
function checkIfEnter(event) {
  if (event.keyCode === 13) {
    if (searchInput.value === "") generateAllCountries();
    const request = new XMLHttpRequest();
    const inputText = searchInput.value;
    request.open("GET", `https://restcountries.com/v2/name/${inputText}`);
    request.send();
    request.addEventListener("load", function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
      const html = `<div class="flag">
            <img
              class="flag-img"
              src="${data.flag}"
              alt=""
            />
            <div class="flag-txt">
              <div class="flag-title">${data.name}</div>
              <div class="flag-descripion">
                <p class="info">
                  Population: <span class="info-value">${data.population}</span>
                </p>
                <p class="info">
                  Region: <span class="info-value">${data.region}</span>
                </p>
                <p class="info">
                  Capital: <span class="info-value">${data.capital}</span>
                </p>
              </div>
            </div>
          </div>`;
      flagsContainer.innerHTML = "";
      flagsContainer.insertAdjacentHTML("beforeend", html);
    });
  }
}
flagsContainer.addEventListener("click", (event) => {
  const flag = event.target.closest(".flag");
  if (flag) {
    const countryName = flag.querySelector(".flag-title").textContent;
    location.href = `./details.html?country=${encodeURIComponent(countryName)}`;
  }
});

const getMyLocation = async function () {
  try {
    const res = await getPos();
    console.log(res);
  } catch {
    console.log("error");
  }
};
const getPos = function () {
  // return new Promise((resolve, reject) => {
  //   navigator.geolocation.getCurrentPosition(resolve, reject);
  // });
  return navigator.geolocation.getCurrentPosition((pos) => pos);
};

getMyLocation();
