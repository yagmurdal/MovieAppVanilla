import "./style.css";
import axios from "axios";

const api = "http://www.omdbapi.com/?apikey=780a60dd&s=";
const searchInput = document.querySelector("#search");
const resultBox = document.querySelector(".result-box .row");

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
}

searchInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    getMovies(e.target.value);
  }
});
