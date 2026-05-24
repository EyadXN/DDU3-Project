class Movies {

    getMovie(id, movies){
        console.log("apiMovies: "+ movies)
        for(let movie of movies){
            if(movie.imdbID == id){
                return movie;
            }
        }
       return null 
    }
    
    getStartRatings(movies, users){
        for (let movie of movies) {
        let totalRating = 0;
        let count = 0;

        for (let user of users) {
            
            
            for (let rev of user.reviews) {
                
                if (rev.imdbID == movie.imdbID) {
                    totalRating += Number(rev.rating);
                    count++;
                }
            }
        }

        
        if (count > 0) {
            movie.rating = totalRating / count;
        } else {
            movie.rating = Math.floor(Math.random() * 10); 
        }
    }

    return movies;
    }

    

    postReview(req){
        let data = Deno.readTextFileSync("database.json");
        data = JSON.parse(data);
        let review = req.review;
        let user;
        let reviewLength;
        for(user of data.userList){
            if(req.id == user.id){
                reviewLength = user.reviews.length;
                user.reviews.push(review);
                break;
            }
        }
        
        Deno.writeTextFileSync("./database.json", JSON.stringify(data,null, 2));
        if(user.reviews.length === reviewLength){
            return false
        }
        return true;
    }

}

export let mov = new Movies();