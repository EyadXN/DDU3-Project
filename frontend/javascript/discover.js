class Movies {
  async getAllMovies() {
    try {
      let movies = await api.getMovies()

      console.log("All movies", movies);
      return movies;
    } catch (err) {
      throw new Error("Failed to load movies:", err);
      return [];
    }
  }

  async displayMovies() {
    let movieContainer = document.getElementById("movie-container");

    let movies = await this.getAllMovies();
    console.log(movies)
    let disMovie = [];
    while (disMovie.length < 30 && disMovie.length < movies.length) {
      let ramNum = Math.floor(Math.random() * movies.length);
      let movie = movies[ramNum];
      if (!disMovie.includes(movie)) {
        let movieBox = document.createElement("div");
        movieBox.innerHTML = `<a href="movie.html" class="movieBox"><img src="${movie.Poster}"></a>`
        movieContainer.appendChild(movieBox);
        disMovie.push(movie);
      }
    }
  }
}


let mov = new Movies();
mov.displayMovies();