

class movie{
     createMovie(movie){
        let movieDiv = document.getElementById("movie"); 
        i
            movieDiv.innerHTML = `
            <div id="left">
                <img src=${movie.posterl} alt="#">
            </div>
            <div id="right">
                <b>${movie.title}</b>
                <p>${movie.category} - <i>${product.description}</i></p>
                <p>${movie.rating}$</p>    
                <input type="rating">                
                <div class ="tStock">In Stock</div>
            </div>    `;

        }     
        

    async upLoadProduct(){
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        
        let movie;   
        try{
            console.log("hallå")
            movie = await api.getMovie(id);
            console.log(movie)
            this.createMovie(movie);
        }
        catch(error){
            box.innerHTML = "<h3>Didn't work</h3>";
            console.log("försöke igen B")
        }
        
    }
}
let spec = new movie();
spec.upLoadProduct();