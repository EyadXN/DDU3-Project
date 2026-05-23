

class movie {
    constructor(){
        this.chosenRating = 0;
    }
    nav(){
        let header = document.querySelector("header");
        const loggedInUser = localStorage.getItem("loggedInUser")
        if(loggedInUser){
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
                        <li><a href="discover.html">DISCOVER</a></li>
                        <button id="logOutBtn">Log out</button>
                    </ul>
                </nav>
            `
            this.logOut();
        }
        else{
            header.innerHTML = `
               <div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <p>Revaiew</p>
                </div>
                <nav>
                    <ul>
                        <li><a href="discover.html">DISCOVER</a></li>
                        <li id="special"><a href="login.html">SIGN IN</a></li>
                    </ul>
                </nav>
            `
        }
    }

    logOut(){
    const logOutBtn = document.getElementById("logOutBtn");
    logOutBtn.addEventListener("click", () =>{
        localStorage.removeItem("loggedInUser");
        this.nav();
        window.location.href = "login.html"
    })
}
    createMovie(movie) {
        let movieDiv = document.getElementById("movie");
        movieDiv.innerHTML = `
            <div id="left">
                <img src=${movie.Poster} alt="#">
            </div>
            <div id="right">
                <b>${movie.Title}</b>
                <h2>${movie.rating}☆</h2>
                <p>${movie.Year} - ${movie.category} - <i>${movie.description}</i> </p>
                <div id ="review">
                    <h3>Sätt ditt betyg:</h3>
                    <div id="star-container">
                        <span class="star" data-value="1">★</span>
                        <span class="star" data-value="2">★</span>
                        <span class="star" data-value="3">★</span>
                        <span class="star" data-value="4">★</span>
                        <span class="star" data-value="5">★</span>
                        <span class="star" data-value="6">★</span>
                        <span class="star" data-value="7">★</span>
                        <span class="star" data-value="8">★</span>
                        <span class="star" data-value="9">★</span>
                        <span class="star" data-value="10">★</span>
                    </div>
    
                    <p>Valt betyg: <span id="rating-text">0</span>/10</p>
                    <div id ="postTxt">
                        <textarea id="review-text" placeholder="Skriv din recension här..."></textarea>
                        <button id="post-review-btn">Post</button>
                    </div>
                      
                </div> 
            </div>
            <style>
                body {
                    background-image: url('${movie.Poster}');
                    background-position: center;
                    background-attachment: fixed;
                    backdrop-filter: blur(10px);
                    min-height: 100vh;
                }
            </style>
                  `;

    }
    setupStars(){
        let stars = document.querySelectorAll(".star");
        let ratingTxt = document.getElementById("rating-text")

        for(let star of stars){
            star.addEventListener("click", function(){
                
                this.chosenRating = star.getAttribute("data-value");
                ratingTxt.textContent = this.chosenRating;

                for(let s of stars){
                    const starValue = star.getAttribute("data-value");
                    if(starValue = this.chosenRating){
                        s.classList.add("seleceted");
                    }
                    else{
                        s.classList.remove("selected");
                    }
                }
        
            })
        }
        return
    }

    setupPostReview() {
        const postBtn = document.getElementById("post-review-btn");
        const reviewTextArea = document.getElementById("review-text");
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        let chosenRating = this.chosenRating;

        postBtn.addEventListener("click", async function(){
            const reviewComment = reviewTextArea.value;
            let movieDiv = document.getElementById("movie");

            if(chosenRating === 0){
                alert("du behöver välja en rating")
                return
            }

            const loggedInUser = localStorage.getItem("loggedInUser")

            if(!loggedInUser){
                alert("du behöver logga in inan du kan ranka filmer")
                window.location.href = "../html/login.html"
                return
            }

            const user = JSON.parse(loggedInUser);
            let movie;

            try{
                movie = await api.getMovie(id);
            }catch(error){
                movieDiv.innerHTML = "<h3>Couldn't post the movie...</h3>";
                console.log("försöke igen B")
            }
        
            const review = {
                name: movie.Title,
                imdbID: movie.imdbID,
                rating: chosenRating,
                recension: reviewComment
            }

            try{

            }catch(error){}
        })

    }

    async upLoadProduct() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        console.log("id" + id)
        let movieDiv = document.getElementById("movie");
        let movie;
        try {
            console.log("hallå")
            movie = await api.getMovie(id);
            console.log("movie:" + movie)
            this.createMovie(movie);
        }
        catch (error) {
            movieDiv.innerHTML = "<h3>Couldn't find the movie...</h3>";
            console.log("försöke igen B")
        }


    }
}
let spec = new movie();
spec.upLoadProduct();
spec.setupStars();
spec.setupPostReview();
spec.nav();
