const backBtn = document.querySelector(".back");
const flagCountainer = document.querySelector("main");

// Get country name from the URL
const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get("country");

if (countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response) => {
      if (!response.ok) throw new Error("Country not found!");
      return response.json();
    })
    .then((data) => {
      const country = data[0];
      console.log(country);
      let html = `<img class="flag-img" src="${country.flags.png}" alt="flag-img" />
        <div class="flag-details">
          <p class="flag-title">${country.name.common}</p>
          <div class="flag-info">
            <div class="info">Population: <span class="info-value">${country.population}</span></div>
            <div class="info">Region: <span class="info-value">${country.region}</span></div>
            <div class="info">Sub Region: <span class="info-value">${country.subregion}</span></div>
            <div class="info">Capital: <span class="info-value">${country.capital}</span></div>
            <div class="info">Top Level Domain: <span class="info-value">${country.tld}</span></div>
          </div>
          <div class="borders">
            <span class="boarder-countries">Border Countries:</span>
            <div class="countries">`;

      if (country.borders) {
        changeToName(country.borders).then((bordersArr) => {
          console.log("Border countries:", bordersArr);
          for (let i = 0; i < bordersArr.length; i++) {
            if (bordersArr[i] === "Israel") bordersArr[i] = "Palestine";
            html += `<div class="country">${bordersArr[i]}</div>`;
          }

          html += `</div></div></div>`;
          flagCountainer.innerHTML = html;
        });
      } else {
        html += `<div class="country">No border countries</div>`;
        html += `</div></div></div>`;
        flagCountainer.innerHTML = html;
      }
    })
    .catch((err) => console.log(err));
} else {
  document.body.innerHTML = "<p>No country selected.</p>";
}

backBtn.addEventListener("click", () => {
  location.href = "./index.html";
});

function changeToName(arr) {
  const requests = arr.map((code) =>
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((response) => response.json())
      .then((data) => data[0].name.common)
  );

  return Promise.all(requests);
}

flagCountainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("country")) {
    const request = new XMLHttpRequest();
    const countryName = event.target.textContent;

    request.open("GET", `https://restcountries.com/v3.1/name/${countryName}`);
    request.send();

    request.addEventListener("load", function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);

      let html = `<img class="flag-img" src="${data.flags.png}" alt="flag-img" />
        <div class="flag-details">
          <p class="flag-title">${data.name.common}</p>
          <div class="flag-info">
            <div class="info">Population: <span class="info-value">${data.population}</span></div>
            <div class="info">Region: <span class="info-value">${data.region}</span></div>
            <div class="info">Sub Region: <span class="info-value">${data.subregion}</span></div>
            <div class="info">Capital: <span class="info-value">${data.capital}</span></div>
            <div class="info">Top Level Domain: <span class="info-value">${data.tld}</span></div>
          </div>
          <div class="borders">
            <span class="boarder-countries">Border Countries:</span>
            <div class="countries">`;

      if (data.borders) {
        changeToName(data.borders).then((bordersArr) => {
          console.log("Border countries:", bordersArr);
          if (data.alpha3Code === "PSE") bordersArr.shift();
          for (let i = 0; i < bordersArr.length; i++) {
            if (bordersArr[i] === "Israel") bordersArr[i] = "Palestine";
            html += `<div class="country">${bordersArr[i]}</div>`;
          }

          html += `</div></div></div>`;
          flagCountainer.innerHTML = html;
        });
      } else {
        html += `<div class="country">No border countries</div>`;
        html += `</div></div></div>`;
        flagCountainer.innerHTML = html;
      }
    });
  }
});
