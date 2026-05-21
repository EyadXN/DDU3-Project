class Movies {
  async getMovies() {
    let movieData;
    try {
      const response = await fetch("../javascript/database.json");
      movieData = await response.json();


      if (!response.ok) {
        throw new Error(response.status);
      }

      console.log(movieData);
    } catch (err) {
      console.log("Failed to load movies:", err);
    }
    return movieData;
  }

  async displayMovies() {
    let movieContainer = document.getElementById("movie-container");

    let movies = await this.getMovies();

    let disMovie = [];
    for (let i = 0; i < 30; i++) {
      let movieBox = document.createElement("div");
      let ramNum = Math.floor(Math.random() * 30);
      let movie = movies[ramNum];
      if (disMovie.includes(movie)) {
        continue;
      }
      movieBox.innerHTML = `<div class="movieBox"><img src="${movie.Poster}"></div>`
      movieContainer.appendChild(movieBox);
      disMovie.push(movie);
    }
  }
}


let mov = new Movies();
mov.displayMovies();