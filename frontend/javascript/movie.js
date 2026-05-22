

class movie {
    constructor(){
        this.chosenRating = 0;
    }
    createMovie(movie) {
        let movieDiv = document.getElementById("movie");
        movieDiv.innerHTML = `
            <div id="left">
                <img src=${movie.Poster} alt="#">
            </div>
            <div id="right">
                <b>${movie.Title}</b>
                <p class="red">${movie.rating}☆</p>
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

                    <textarea id="review-text" placeholder="Skriv din recension här..."></textarea>
                    <button id="post-review-btn">Posta recension</button>  
                </div> 
            </div>
                  `;

    }
    setupStars(){

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
            movieDiv.innerHTML = "<h3>Didn't work</h3>";
            console.log("försöke igen B")
        }


    }
}
let spec = new movie();
spec.upLoadProduct();