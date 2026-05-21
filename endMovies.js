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
        for(let movie of movies){
            for(let user of users){
                if(movie.imdbID == user.id){
                    movie.rating = user.reviews.rating;
                }
                else{
                    movie.rating = 5;
                }
            }
        }
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