// Deno text: deno run --allow-net --allow-read --allow-write --watch backend.js
import { mov } from "./endMovies.js"
import { use } from "./endUsers.js"
import { serveFile } from "jsr:@std/http/file-server"


async function handler(request) {

    let dataBase = readTextFileSync("../database.json");
    let url = new URL(request.url);
    dataBase = JSON.parse(dataBase);
    let users = dataBase.users;
    let movies = dataBase.movies;
    const options = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }
    }
    let moviesUrl = "http://localhost:8000/movies";

    let usersUrl = "http://localhost:8000/users";


    if (url.pathname.startsWith(moviesUrl)) {
        if (request.method == "GET") {
            if (request.headers.get("Accept") == "application/json") {
                if (url.pathname == moviesUrl) {
                    if (!url.search) {
                        return new Response(JSON.stringify(movies), options);
                    }
                    let year = url.searchParams.get("year");
                    let category = url.searchParams.get("cateogry");
                    let rating = url.searchParams.get("rating");
                    console.log("du är inne")

                    let filtered = pro.filterSearch(movies, year, category, rating);
                    console.log("filtered", filtered)
                    return new Response(JSON.stringify(filtered), options);
                }
                let route = new URLPattern({ pathname: `${moviesUrl}/:id` });
                if (route.test(request.url)) {
                    let match = route.exec(request.url);
                    let movie = mov.getMovie(match.pathname.groups.id, movies);

                    if (movie == null) {
                        return new Response(JSON.stringify("Not Found"), { status: 404 })
                    }
                    return new Response(JSON.stringify(movie), options);
                }
            }
            else {
                return new Response(JSON.stringify("Not Acceptable"), { status: 406 })
            }
        }
        if (request.method == "POST") {
            if (request.headers.get("Content-Type") == "application/json") {
                let req = await request.json();
            }
        }
        else {
            return new Response(JSON.stringify("Not Acceptable"), { status: 406 })
        }
        if (request.method == "DELETE") {
            let moviesLength = movies.length;
            let route = new URLPattern({ pathname: `${moviesUrl}/:id` });
            if (route.test(request.url)) {
                let match = route.exec(request.url);
                let filteredMovies = mov.deleteRating(match.pathname.groups.id, movies, users);

                if (moviesLength === filteredMovies.length) {
                    return new Response(JSON.stringify("Not Found"), { status: 404 })
                }
                else {
                    options.status = 204;
                    return new Response(null, options)
                }
            }
        }
    }
    if (url.pathname.startsWith(usersUrl)) {
        if (request.method == "GET") {
            if (request.headers.get("Accept") == "application/json") {

                let route = new URLPattern({ pathname: `${usersUrl}/:id` });

                if (route.test(request.url)) {

                    let match = route.exec(request.url);
                    let user = use.findUser(match.pathname.groups.id, users)
                    if (user == null) {
                        return new Response(JSON.stringify("Not Found"), { status: 404 })
                    }
                    return new Response(JSON.stringify(user), options)
                }
            }
            else {
                return new Response(JSON.stringify("Not Acceptable"), { status: 406 })
            }
        }
        if (request.method == "POST") {
            if (request.headers.get("Content-Type") == "application/json") {
                let req = await request.json();
                if (use.createUserControl(req)) {
                    let newUsers = use.postUser(req);
                    return new Response(JSON.stringify(newUsers), options)
                }
            }
        }
        if (request.method == "DELETE") {
            let usersLength = users.length;
            let route = new URLPattern({ pathname: `${usersUrl}/:id` });
            if (route.test(request.url)) {
                let match = route.exec(request.url);
                let filteredUsers = use.deleteUser(match.pathname.groups.id, users);

                if (usersLength === filteredUsers.length) {
                    return new Response(JSON.stringify("Not Found"), { status: 404 })
                }
                else {
                    options.status = 204;
                    return new Response(null, options)
                }
            }
        }

    }
}
/*function createNewDataBase(){
    let formerDataBase =  Deno.readTextFileSync("../database.json");
    let movies = formerDataBase.movieList;
    let movieList = [];
    for(let movie of movies){
        movie.rating = {
            avgRating: 5,
            allRatings: []
        };
        movieList.push(movie);
    }
    let dataBase = {
        movieList: movieList,
        userList: []
    }
    Deno.writeTextFileSync("../database.json", JSON.stringify(dataBase, null, 2));
}
createNewDataBase();*/

Deno.serve(handler);