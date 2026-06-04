async function getLoggedInUser() {
    let userId = null;
    let cookies = document.cookie.split(";");
    for (let cookie of cookies) {
        let i = 0;
        while (cookie[i] === " ") {
            i++;
        }
        cookie = cookie.slice(i);
        if (cookie.slice(0, 8) === "user_id=") {
            userId = cookie.slice(8);
        }
    }

    if (!userId) return null;

    const response = await fetch("/users/" + userId, {
        headers: { "Accept": "application/json" }
    });
    if (!response.ok) return null;

    return await response.json();
}


function logOut() {
    const logOutBtn = document.getElementById("logOutBtn");
    if (!logOutBtn) return;
    logOutBtn.addEventListener("click", async function () {
         try {
            await api.logOutUser();
            nav();
            window.location.href = "login.html"
        } catch (error) {
            console.log("logout Failed" + error)
        }
    })
}


function nav() {
    let header = document.querySelector("header");
    let main = document.querySelector("main");
    let welcomeTitle = document.getElementById("welcomeMessage");
    const loggedInUser = document.cookie.includes("user_id=");


    header.innerHTML = `
            <div>
                <div></div>
                <div></div>
                <div></div>
                <p>Revaiew</p>
            </div>
                <nav>
                    <ul>
                        <li><a id="profile" href="start.html"></a></li>
                        <li><a href="discover.html">DISCOVER</a></li>
                        <button id= "logOutBtn">Log out</button>
                    </ul>
                </nav>
            `;

    welcomeTitle.innerHTML = `
            <div>Welcome ${loggedInUser.name}!</div>
            `;

    logOut();

}

async function upLoadTheseMovies(movies, user) {
    let movieList = document.getElementById("movieList");
    movieList.innerHTML = "";
    for (let mov of movies) {

        let movieElement = document.createElement("div");
        movieElement.className = "movie";

        movieElement.innerHTML = `
            <div class="poster-container">
                <img class="poster" src="${mov.Poster}" alt="">
                <div class="mRev">${mov.mRev}</div>
                <div class="oRev">${mov.rating}</div>
            </div>  
            <div>
                <b>${mov.Title}</b>
                <p>${mov.Year} - ${mov.category}</p>
            </div>
            <button type ="button" class="remove">Remove</button>
        `;

        movieList.appendChild(movieElement);

        movieElement.querySelector(".remove").addEventListener("click", async function (e) {
            e.preventDefault();
            try {
                let removeRev = await api.deleteReview(user.id, mov);
                movieElement.remove();
            } catch (error) {
                console.log("Kunde inte ta bort review", error);
            }
        });
    }
}

async function uploadMovieList() {
    const user = await getLoggedInUser();
    let movies;
    let myList = [];

    try {
        movies = await api.getMovies();
    } catch (error) {
        alert("couldn't get movies");
        return;
    }

    for (let rev of user.reviews) {
        for (let movie of movies) {
            if (rev.imdbID == movie.imdbID) {
                let matchedMovie = {
                    ...movie,
                    mRev: rev.rating,
                    oRev: movie.rating.avgRating
                };
                myList.push(matchedMovie);
            }
        }
    }

    if (myList.length !== 0) {
        await upLoadTheseMovies(myList, user);
    }
}

const filterForm = document.getElementById("my-form")

async function getCategories() {
    let categories;

    try {
        categories = await api.getCategories();
    } catch (error) {
        alert("couldn't get categories" + error)
        console.log("consol:" + error);
    }

    const filterCategory = document.getElementById("category")
    for (let cat of categories) {
        let option = document.createElement("option");
        option.textContent = cat;
        option.value = cat;
        filterCategory.appendChild(option);
    }

}
getCategories();



filterForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const params = new URLSearchParams();

    const category = filterForm.elements.category.value;
    const releaseB = filterForm.elements.releasedbefore.value;
    const releaseA = filterForm.elements.releasedafter.value;

    if (category) {
        params.append("category", category);
    }

    if (releaseB) {
        params.append("releaseB", releaseB);
    }
    if (releaseA) {
        params.append("releaseA", releaseA);
    }

    const queryString = params.toString();

    const user = await getLoggedInUser()
    let allMovies;
    try {
        allMovies = await api.getMovies();
    } catch (err) {
        console.log("Kunde inte hämta filmer");
        return;
    }

    let userReviewedMovies = [];
    for (let rev of user.reviews) {
        for (let movie of allMovies) {
            if (rev.imdbID == movie.imdbID) {
                movie.mRev = rev.rating;
                movie.oRev = movie.rating;
                userReviewedMovies.push(movie);
            }
        }
    }

    let filteredMovies = [];

    for (let movie of userReviewedMovies) {
        if (category && movie.category !== category) {
            continue;
        }
        if (releaseB && Number(movie.Year) > Number(releaseB)) {
            continue;
        }
        if (releaseA && Number(movie.Year) < Number(releaseA)) {
            continue;
        }
        filteredMovies.push(movie);
    }
    upLoadTheseMovies(filteredMovies, user)
})

window.addEventListener("load", uploadMovieList);

nav();