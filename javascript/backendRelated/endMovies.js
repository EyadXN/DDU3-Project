class Movies {

    getMovie(id, movies){
        for(let movie of movies){
            if(movie.id == id){
                return movie;
            }
            else{ return null}
        }
    }

    deleteRating(id, movies, users){
        
    }

}

export let mov = new Movies();