function logOut() {
    const logOutBtn = document.getElementById("logOutBtn");
    if (!logOutBtn) return;
    logOutBtn.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html"
    })
}
function nav() {
    let header = document.querySelector("header");
    let main = document.querySelector("main");
    let welcomeTitle = document.getElementById("welcomeMessage");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));


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
            <button class="remove">Remove</button>
        `;

        movieList.appendChild(movieElement);

        movieElement.querySelector(".remove").addEventListener("click", async function () {
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
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    let movies;
    let myList = [];

    try {
        movies = await api.getMovies();
    } catch (error) {
        alert("couldn't get movies");
        return; // Avbryt funktionen om vi inte får några filmer
    }

    for (let rev of user.reviews) {
        for (let movie of movies) {
            if (rev.imdbID == movie.imdbID) {
                // Skapa en kopia av filmen och klistra in mRev och oRev direkt på objektet!
                let matchedMovie = {
                    ...movie,
                    mRev: rev.rating,
                    oRev: movie.rating.avgRating // eller bara movie.rating beroende på hur ditt JSON ser ut
                };
                myList.push(matchedMovie);
            }
        }
    }

    if (myList.length !== 0) {
        // Skicka med både listan och user in i funktionen
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
        try {
            const filteredProducts = await api.filterSearch(queryString)
        } catch (error) {
            console.log("nätvärkserror")
            alert("nätvärkserror profile.js 156")
        }
    })

window.addEventListener("load", uploadMovieList);

nav();