// Deno text: deno run --allow-net --allow-read --allow-write --watch backend.js
import { mov } from "./endMovies.js"
import { use } from "./endUsers.js"
import { serveDir } from "jsr:@std/http/file-server"


async function handler(request) {
    let url = new URL(request.url);
    const options = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    let moviesUrl = "/movies";

    let usersUrl = "/users";

    
    if (url.pathname.startsWith(moviesUrl)) {

        let dataBase = Deno.readTextFileSync("database.json");
        
        dataBase = JSON.parse(dataBase);
        let users = dataBase.userList;
        let orginMovies = dataBase.movieList;
        let movies = mov.getStartRatings(orginMovies, users);




        if (request.method == "GET") {
            if (request.headers.get("Accept") == "application/json") {
                if (url.pathname == moviesUrl) {
                    if (!url.search) {
                        return new Response(JSON.stringify(movies), options);
                    }
                    let year = url.searchParams.get("year");
                    let category = url.searchParams.get("category");
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
                let addedReview = mov.postReview(req);
                if(addedReview){
                    return new Response(JSON.stringify(null), options)
                }
                 return new Response(JSON.stringify("Not Found"), { status: 404 })
            }
            else {
                return new Response(JSON.stringify("Not Acceptable"), { status: 406 })
            }   
        }
        
    }
    if (url.pathname.startsWith(usersUrl)) {

        let dataBase = Deno.readTextFileSync("database.json");
        let url = new URL(request.url);
        dataBase = JSON.parse(dataBase);
        let users = dataBase.userList;
        let movies = dataBase.movieList;


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
                else{
                    return new Response(JSON.stringify(users), options)
                }
            }
            else {
                return new Response(JSON.stringify("Not Acceptable"), { status: 406 })
            }
        }
        if (request.method == "POST") {
            if (request.headers.get("Content-Type") == "application/json") {
                let req = await request.json();
                if (use.userControl(req)) {
                    let newUsers = use.postUser(req);
                    return new Response(JSON.stringify(newUsers), options)
                }else {
                    return new Response(JSON.stringify("Bad Request: Felaktig data"), { status: 400, headers: options.headers });
                }
            }
        }
       if (request.method == "DELETE") {
            let moviesLength = movies.length;
            let route = new URLPattern({ pathname: `${usersUrl}/:id` });
            if (route.test(request.url)) {
                let match = route.exec(request.url);
                let filteredMovies = mov.deleteReview(match.pathname.groups.id);

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

    return serveDir(request, {
        fsRoot: "frontend"
    });
}
/*
createNewDataBase();*/

Deno.serve(handler);