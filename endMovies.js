class Movies {

    getMovie(id, movies){
        for(let movie of movies){
            if(movie.id == id){
                return movie;
            }
            else{ return null}
        }
    }
    
    getStartRatings(movies, users){
        for (let movie of movies) {
        let totalRating = 0;
        let count = 0;

        for (let user of users) {
            
            
            for (let rev of user.reviews) {
                
                if (rev.id == movie.imdbID) {
                    totalRating += Number(rev.rating);
                    count++;
                }
            }
        }

        // 5. Efter att ha kollat alla användare: Räkna ut medelvärdet eller sätt 5
        if (count > 0) {
            movie.rating = totalRating / count;
        } else {
            movie.rating = 5; 
        }
    }

    // 6. Skicka tillbaka filmerna (nu har de kvar sitt imdbID!)
    return movies;
    }

    deleteReview(id){
        let data = Deno.readTextFileSync("database.json");
        data = JSON.parse(data);
        for(let user of data.userList){
           for(let rev of user.reviews){
                if(rev.id == id){
                    user.reviews.remove(rev);
                }
           }
        }
    }

    reviewControl(req){
        if(req.rating){
            return true;
        }
        else{ return false}
    }
    postReview(req){
        let data = Deno.readTextFileSync("database.json");
        data = JSON.parse(data);
        let users = data.userList;
        for(let user of users){
            if(req.id == user.id){
                
            }
        }
    }

}

export let mov = new Movies();