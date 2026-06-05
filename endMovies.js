class Movies {

    getMovie(id, movies) {
        console.log("apiMovies: " + movies)
        for (let movie of movies) {
            if (movie.imdbID == id) {
                return movie;
            }
        }
        return null
    }

    getStartRatings(movies, users) {
        for (let movie of movies) {
            let totalRating = 0;
            let count = 0;

            for (let user of users) {


                for (let review of user.reviews) {

                    if (review.imdbID == movie.imdbID) {

                        totalRating += Number(review.rating);
                        count++;
                    }
                }
            }


            if (count > 0) {
                movie.rating = Math.floor(totalRating / count);
            } else {
                movie.rating = Math.floor(Math.random() * 10);
            }
        }

        return movies;
    }

    postReview(req) {
        let data = Deno.readTextFileSync("database.json");
        data = JSON.parse(data);
        let review = req.review;
        let user;
        let reviewLength;
        for (user of data.userList) {
            if (req.id == user.id) {
                reviewLength = user.reviews.length;
                user.reviews.push(review);
                break;
            }
        }

        Deno.writeTextFileSync("./database.json", JSON.stringify(data, null, 2));
        if (user.reviews.length === reviewLength) {
            return false
        }
        return true;
    }

    getCategories() {
        let data = Deno.readTextFileSync("database.json");
        data = JSON.parse(data);
        let categories = [];
        for (let movie of data.movieList) {
            if (categories.includes(movie.category)) {
                continue;
            }
            else {
                categories.push(movie.category);
            }
        }
        return categories;
    }

    filterSearch(movies, releasedbefore, releasedafter, category, choices) {
        let filteredMovies = [];

        for (let movie of movies) {
            if (category) {
                if (movie.category !== category) {
                    continue;
                }
            }
            if (releasedbefore) {
                if (Number(movie.Year) > Number(releasedbefore)) {
                    continue;
                }
            }
            if (releasedafter) {
                if (Number(movie.Year) < Number(releasedafter)) {
                    continue;
                }
            }
            filteredMovies.push(movie);
        }

        if (choices === "1") {
            filteredMovies.sort(function (a, b) {
                return Number(a.rating) - Number(b.rating);
            });
        } else if (choices === "0") {
            filteredMovies.sort(function (a, b) {
                return Number(b.rating) - Number(a.rating);
            });
        }

        return filteredMovies;
    }

}

export let mov = new Movies();