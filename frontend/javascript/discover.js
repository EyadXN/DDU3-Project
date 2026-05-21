class Movies {
  async getAllMovies() {
    let movieData;
    try {
      let movies = await api.getMovies()
      console.log("asdfs", movies)

      if (!response.ok) {
        throw new Error(response.status);
      }

      console.log(movieData);
    } catch (err) {
      throw new Error("Failed to load movies:", err);
    }
    return movies;
  }

  async displayMovies() {
    let movieContainer = document.getElementById("movie-container");

    let movies = await this.getAllMovies();
    console.log(movies)
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