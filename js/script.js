const searchForm = document.querySelector("#search-form");

const moviList = document.querySelector(".row");

function apiSearch(e) {
  e.preventDefault();

  const searchText = document.querySelector(".form-control").value,
    url = `https://api.themoviedb.org/3/search/multi?api_key=fa9396caaff48fdbfe275115fa4f5860&language=en-US&query=${searchText}`;
  moviList.innerHTML = ` <div class="spinner"></div>`;

  fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject(new Error(response.status));
      }
      return response.json();
    })
    .then((json) => {
      moviList.innerHTML = "";
      if (json.results.length === 0) {
        moviList.innerHTML = `<h2 class='col-12 text-center text-danger'>Movie not found</h2>`;
      }
      json.results.forEach((item) => {
        const film = createFilm(item);
        moviList.append(film);
      });
      const clickFilm = document.querySelectorAll(".film");
      clickFilm.forEach((elem) => {
        elem.addEventListener("click", showFilm);
      });
    })
    .catch((reject) => {
      console.error(reject || reject.status);
      if (searchText.trim().length === 0) {
        moviList.innerHTML = `<h2 class='col-12 text-center text-danger'>Enter what you are looking for</h2>`;
      }
    });
}

const createFilm = (item) => {
  const url = "https://image.tmdb.org/t/p/w500";
  const filName = item.name || item.original_title;
  const poster = item.poster_path
    ? url + item.poster_path
    : "../images/noMovie.png";
  let photo;
  if (item.poster_path) {
    photo = url + item.profile_path;
  } else {
    photo = "../images/noMovie.png";
  }
  let dataInfo =
    item.media_type === "person"
      ? ""
      : `data-id='${item.id}' data-type ='${item.media_type}'`;

  const film = document.createElement("div");
  film.classList.add("film");
  item.media_type !== "person"
    ? (film.style.cursor = "pointer")
    : (film.style.cursor = "not-allowed");
  film.innerHTML = `

<div class="col-12 col-md-4 col-xl-3 item">
   <img src= '${
     item.media_type === "person" ? photo : poster
   }' alt = '${filName}'
   ${dataInfo} class= 'fil'/> 
   <p class="name">${filName}</p>
 


   <p class="phone"></p>
   
</div>
`;
  return film;
};

function showFilm() {
  const img = this.querySelector("img");
  let url;
  let urlVid;
  console.log(img.dataset.id);
  if (img.dataset.type === "movie") {
    url = `https://api.themoviedb.org/3/movie/${img.dataset.id}?api_key=fa9396caaff48fdbfe275115fa4f5860&language=en-US`;
    urlVid = `https://api.themoviedb.org/3/movie/${img.dataset.id}/videos?api_key=fa9396caaff48fdbfe275115fa4f5860&language=en-US`;
  } else if (img.dataset.type === "tv") {
    url = `https://api.themoviedb.org/3/tv/${img.dataset.id}?api_key=fa9396caaff48fdbfe275115fa4f5860&language=en-US`;
    urlVid = `https://api.themoviedb.org/3/tv/${img.dataset.id}/videos?api_key=fa9396caaff48fdbfe275115fa4f5860&language=en-US`;
  }

  moviList.innerHTML = "";

  //about
  fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject(new Error(response.status));
      }
      return response.json();
    })
    .then((json) => {
      const film = aboutTheMovie(json);
      moviList.append(film);
      getVideo(urlVid);
    })
    .catch((reject) => {
      console.error(reject || reject.status);
    });
}

const aboutTheMovie = (item) => {
  const url = "https://image.tmdb.org/t/p/w500";
  const filName = item.original_title || item.name || item.original_title;
  const data = item.release_date || item.first_air_date;
  const poster = item.poster_path
    ? url + item.poster_path
    : "../images/noMovie.png";
  const film = document.createElement("div");
  film.classList.add("mov");
  film.innerHTML = `

<div class="col-12 about">
   <img src= '${poster}' alt = '${filName}'/> 
   <div class = 'info'>
   <p class="name">${filName}</p>
   <p>date of release: <span>${data}</span></p>
   <p class="lang">Original language:<span> ${item.original_language}</span></p>
   <p class="stat">Status:<span> ${item.status}</span></p>
   <p class="view">${item.overview}</p>
  
${
  item.last_episode_to_air
    ? `<p class = 'season'>
      ${item.number_of_seasons} season 
      ${item.last_episode_to_air.episode_number} episodes
    </p>`
    : ""
}
   <p><a href = '${item.homepage}' target ='_blank'>Movie official page</a></p>
   <p><a class ="imdb" href = 'https://imdb.com/title/${
     item.imdb_id
   }' target ='_blank'>Link to imdb </a></p>
   </div>
   
</div>
<div class ='trailer'></div>
`;

  return film;
};
const getVideo = (urlVid) => {
  console.log(urlVid);
  let trailer = document.querySelector(".trailer");
  trailer.innerHTML = "";
  let vidfr = "<h3>Trailers</h3>";
  fetch(urlVid)
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject(new Error(response.status));
      }
      return response.json();
    })
    .then((json) => {
      if (json.results.length === 0) {
        vidfr = "<h3>NO trailers</h3>";
      }
      json.results.forEach((item) => {
        vidfr += `<iframe width="560" height="315" src="https://www.youtube.com/embed/${item.key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      });
      trailer.innerHTML = vidfr;
    })
    .catch((reject) => {
      console.error(reject || reject.status);
    });
};
searchForm.addEventListener("submit", apiSearch);
document.addEventListener("DOMContentLoaded", () => {
  const url =
    "https://api.themoviedb.org/3/trending/all/day?api_key=fa9396caaff48fdbfe275115fa4f5860";
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      moviList.innerHTML = ` <h2 class="pop">Popular now</h2>`;
      if (json.results.length === 0) {
        moviList.innerHTML = `<h2 class='col-12 text-center text-danger'>Movie not found</h2>`;
      }
      json.results.forEach((item) => {
        const film = createFilm(item);
        moviList.append(film);
      });
      const clickFilm = document.querySelectorAll(".film");
      clickFilm.forEach((elem) => {
        elem.addEventListener("click", showFilm);
      });
    })
    .catch((reject) => {
      console.error(reject.status);
      if (searchText.trim().length === 0) {
        moviList.innerHTML = `<h2 class='col-12 text-center text-danger'>Enter what you are looking for</h2>`;
      }
    });
});
