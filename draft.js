//<img src = '${url + item.backdrop_path}' />

/* function requestApi(method, url) {
  const request = new XMLHttpRequest();
  request.open(method, url);

  request.send();
  request.addEventListener("readystatechange", () => {
    if (request.readyState !== 4) {
      moviList.innerHTML = "Load";
    }
    if (request.status !== 200) {
      moviList.innerHTML = "don t load";
      console.error(request.status);
      return;
    }
    moviList.innerHTML = "";
    const result = JSON.parse(request.responseText);
    console.log(result);
  });
} */
/* function requestApi(method, url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.addEventListener("load", () => {
      if (request.status !== 200) {
        reject({ status: request.status });
        return;
      }

      resolve(request.response);
    });
    request.addEventListener("error", () => {
      reject({ status: request.status });
    });
    request.send();
  });
} */
{
  /* <p class="average">${
    item.media_type === "person"
      ? `Rating ${item.popularity} `
      : `Vote average ${item.vote_average}`
  }</p>
  <p class="email">${item.media_type}</p>
  const clickFilm = document.querySelectorAll(".fil");
  clickFilm.forEach((elem) => {
    elem.addEventListener("click", function () {
      moviList.innerHTML = "";
     
    });
  });



  const aboutTheMovie = (item) => {
    const url = "https://image.tmdb.org/t/p/w500";
    const filName = item.name || item.original_title;
    const poster = item.poster_path
      ? url + item.poster_path
      : "../images/noMovie.png";
    const film = document.createElement("div");
    film.classList.add("film");
    film.innerHTML = `
  
  <div class="col-12 about">
     <img src= '${poster}' alt = '${filName}'/> 
     <div>
     <p class="name">${filName}</p>
     <p class="average">Vote average ${item.vote_average}</p>
     <p class="email">${item.overview}</p>
     
     </div>
  </div>
  `;
    return film;
  }; */
}
