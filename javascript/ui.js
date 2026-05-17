async function getMovies() {
  try {
    const response = await fetch("../javascript/database.json");
    const movieData = await response.json();

    if (!response.ok) {
      throw new Error(response.status);
    }

    console.log(movieData);
  } catch (err) {
    console.log("Failed to load movies:", err);
  }
}

function displayMovies() {
  let movieContainer = document.getElementById("movie-container");

  for (let i = 0; i < 100; i++) {
    let movieBox = document.createElement("div");

  }
}

getMovies();