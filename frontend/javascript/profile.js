function logOut(){
    const logOutBtn = document.getElementById("logOutBtn");
    if(!logOutBtn) return;
    logOutBtn.addEventListener("click", function(){
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html"
    })
}
function nav(){
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
            
            welcomeTitle.innerHTML=`
            <div>Welcome ${loggedInUser.name}!</div>
            `;
            logOut();
        
}

async function uploadMovieList(){
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    let movies;
    let myList = [];
    try{
        movies = await api.getMovies();
    }catch(error){
        alert("couldn't get movies");
    }
    for(let rev of user.reviews){
        for(let movie of movies){
            if(rev.imdbID == movie.imdbID){
                myList.push(movie);
            }
        }
    }
    let movieList = document.getElementById("movieList");
    if(myList.length !== 0){
        
        for(let mov of myList){
            movieList.innerHTML+=`
            <div class="movie">
                <img class="poster" src="${mov.Poster}" alt="">
                <div>
                    <b>${mov.Title}</b>
                    <p>${mov.Year} - ${mov.category}</p>
                </div>
            </div>
            `;
        }

    }

}
uploadMovieList();
nav();