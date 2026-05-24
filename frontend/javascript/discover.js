class Movies {
    async getAllMovies() {
        try {
            let movies = await api.getMovies()

            console.log("All movies", movies);
            return movies;

        } catch (error) {
            console.error("Det faktiska felet i frontend:", error); // <-- Lägg till denna för att se krocken i konsolen!
            throw new Error(`Network error Abasin: ${error.message}`);
        }
    }

    async displayMovies() {
        let movieContainer = document.getElementById("movie-container");

        let movies = await this.getAllMovies();
        console.log(movies)
        let disMovie = [];
        while (disMovie.length < 30 && disMovie.length < movies.length) {
            let ranNum = Math.floor(Math.random() * movies.length);
            let movie = movies[ranNum];
            if (!disMovie.includes(movie)) {
                let movieBox = document.createElement("div");
                movieBox.setAttribute('class', 'movie')
                movieBox.innerHTML = `<a href="movie.html?id=${movie.imdbID}" class="moviePic">
                <img src="${movie.Poster}">
                <p>${movie.Title}</p>
                <p>${movie.category}</p>
                <p>${movie.Title}</p>
                <p>${movie.rating}</p>
                </a>`
                movieContainer.appendChild(movieBox);
                disMovie.push(movie);
            }
        }
    }


    nav() {
        let header = document.querySelector("header");
        const loggedInUser = localStorage.getItem("loggedInUser")
        if (loggedInUser) {
            header.innerHTML = `
            <div>
                <div></div>
                <div></div>
                <div></div>
                <p>Revaiew</p>
            </div>
                <nav>
                    <ul>
                        <li><a id="profile" href="profile.html"></a></li>
                        <li><a href="start.html">HOME</a></li>
                        <button id="logOutBtn">Log out</button>
                    </ul>
                </nav>
            `
            mov.logOut();
        }
        else {
            header.innerHTML = `
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <p>Revaiew</p>
                </div>
                <nav>
                    <ul>
                        <li><a href="start.html">HOME</a></li>
                        <li id="special"><a href="login.html">SIGN IN</a></li>
                    </ul>
                </nav>
            `
        }
    }
    logOut() {
        const logOutBtn = document.getElementById("logOutBtn");

        logOutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            nav();
            window.location.href = "login.html"
        })
    }
}


let mov = new Movies();
mov.displayMovies();
mov.nav();
