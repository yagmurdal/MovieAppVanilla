import "./style.css";
import axios from "axios";

const api = "http://www.omdbapi.com/?apikey=780a60dd&s=";
const searchInput = document.querySelector("#search");
const resultBox = document.querySelector(".result-box .row");
const paginationBox = document.querySelector(".pagination");

async function getMovies(title, pageNumber) {
  let { data } = await axios.get(`${api}${title}&page=${pageNumber}`);
  resultBox.innerHTML = "";
  data.Search.forEach((element) => {
    resultBox.innerHTML += `
        <div class="col-xl-3 col-md-6 col-sm-12 mb-3">
        <div class="card">
        <img src="${element.Poster}" class="card-img-top" alt="...">
        <div class="card-body">
          <div style="min-height: 104px">
            <h5 class="card-title">${element.Title}</h5>
            <p class="card-text">${element.Year}</p>
          </div>
          <a href="https://www.imdb.com/title/${element.imdbID}" target="_blank" class="btn btn-primary">Go Details</a>
        </div>
      </div>
        </div>
      `;
  });
  let pageCount = data.totalResults / 10;
  paginationBox.innerHTML = "";
  for (let i = 0; i < pageCount; i++) {
    const button = document.createElement("button");
    button.innerText = i + 1;
    button.id = "button-" + (i + 1);
    button.setAttribute("index", i + 1);
    button.addEventListener("click", buttonClicked(i));
    paginationBox.appendChild(button);
  }

  function buttonClicked(index) {
    return function () {
      getMovies(searchInput.value, index + 1);
    };
  }
}

searchInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    getMovies(e.target.value);
  }
});

function myfunc() {
  console.log(1);
}

// TO-DO'S
// searh-inputa tıklandığında içerisindeki değer silenecek.
// çıkacak bug'ı çöz. silindikten sonra boş string döneceği için pag. patlayabilir
// pag. işleminden sonra sayfanın yukarıya scrool edilmesi
// pag.'nın ui'nın düzenlenmesi
