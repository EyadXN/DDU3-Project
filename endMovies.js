class Movies {

    getMovie(id, movies){
        for(let movie of movies){
            if(movie.id == id){
                return movie;
            }
            else{ return null}
        }
    }
    
    getRatings(movies, users){
        for(let movie of movies){
            for(let user of users){
                if(movie.imdbId == user.id){
                    movie.rating = user.reviews.rating;
                }
            }
        }
        return movies;
    }

    deleteRating(id){
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

}

export let mov = new Movies();