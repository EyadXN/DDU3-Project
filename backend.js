
import { mov } from "./endMovies.js"
import { use } from "./endUsers.js"
import { serveDir } from "jsr:@std/http/file-server"


async function getLoggedInUserId(request) {
    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) return null;

    if (cookieHeader.includes("user_id=")) {
        let parts = cookieHeader.split("user_id=");
        let idPart = parts[1].split(";")[0];
        return Number(idPart);
    }
    return null;
}

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
        if (request.method == "GET") {

            let dataBase = JSON.parse(Deno.readTextFileSync("database.json"));
            let movies = mov.getStartRatings(dataBase.movieList, dataBase.userList);

            if (request.headers.get("Accept") == "application/json") {

                if (url.pathname == "/movies/categories") {
                    let categories = mov.getCategories();
                    return new Response(JSON.stringify(categories), options)
                }
                if (url.pathname == moviesUrl) {
                    if (!url.search) {
                        return new Response(JSON.stringify(movies), options);
                    }

                    let releasedbefore = url.searchParams.get("releasedbefore");
                    let releasedafter = url.searchParams.get("releasedafter");
                    let category = url.searchParams.get("category");
                    let choices = url.searchParams.get("choices");



                    let filtered = mov.filterSearch(movies, releasedbefore, releasedafter, category, choices)
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
                if (addedReview) {
                    return new Response(JSON.stringify(null), options)
                }
                return new Response(JSON.stringify("Not Found"), { status: 404 })
            }
            else {
                return new Response(JSON.stringify("Not Acceptable"), { status: 406 })
            }
        }

    }
    if (url.pathname.startsWith(usersUrl) || url.pathname == "/login") {
        if (url.pathname == "/login" && request.method == "POST") {
            let credentials = await request.json();
            let dataBase = JSON.parse(Deno.readTextFileSync("database.json"))

            let foundUser = null;
            for (let user of dataBase.userList) {
                if (user.name === credentials.name && user.password === credentials.password) {
                    foundUser = user;
                    break;
                }
            }
            if (foundUser) {
                const randomSession = crypto.randomUUID();

                dataBase.sessions.push({
                    sessionId: randomSession,
                    userId: foundUser.id
                })
                Deno.writeTextFileSync("database.json", JSON.stringify(dataBase, null, 2));

                let loginHeaders = new Headers()
                loginHeaders.set("Content-Type", "application/json");
                loginHeaders.append("Set-Cookie", `session_id=${randomSession}; Max-Age=86400; Path=/; HttpOnly`);
                loginHeaders.append("Set-Cookie", `user_id=${foundUser.id}; Max-Age=86400; Path=/`);

                return new Response(JSON.stringify("Welcome!"), { headers: loginHeaders });

            }
            return new Response(JSON.stringify("Unauthorized"), {
                status: 401,
                headers: { "Content-Type": "application/json" }
            });

        }
        if (url.pathname == "/logout" && request.method == "POST") {
            let logoutHeaders = new Headers();
            logoutHeaders.set("Content-Type", "application/json");
            logoutHeaders.append("Set-Cookie", "session_id=borta; Max-Age=0; Path=/; HttpOnly");
            logoutHeaders.append("Set-Cookie", "user_id=borta; Max-Age=0; Path=/");

            return new Response(JSON.stringify("Logged out"), { headers: logoutHeaders });
        }


        if (request.method == "GET") {

            let dataBase = JSON.parse(Deno.readTextFileSync("database.json"));

            let loggedInId = getLoggedInUserId(request);

            if (request.headers.get("Accept") == "application/json") {

                let route = new URLPattern({ pathname: `${usersUrl}/:id` });

                if (route.test(request.url)) {

                    let match = route.exec(request.url);
                    let user = use.findUser(match.pathname.groups.id, dataBase.userList)
                    if (user == null) {
                        return new Response(JSON.stringify("Not Found"), { status: 404 })
                    }
                    return new Response(JSON.stringify(user), options)
                }
                else {
                    return new Response(JSON.stringify(dataBase.userList), options)
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
                } else {
                    return new Response(JSON.stringify("Bad Request: Felaktig data"), { status: 400, headers: options.headers });
                }
            }
        }
        if (request.method == "DELETE") {
            if (request.headers.get("Content-Type") == "application/json") {
                let dataBase = JSON.parse(Deno.readTextFileSync("database.json"));
                let route = new URLPattern({ pathname: `${usersUrl}/:id` });

                if (route.test(request.url)) {

                    let match = route.exec(request.url);
                    let userId = match.pathname.groups.id;

                    let updatedUsers = use.deleteUser(userId, dataBase.userList);

                    if (updatedUsers == null) {
                        return new Response(JSON.stringify("Not Found"), { status: 404 });
                    }

                    return new Response(JSON.stringify(updatedUsers), options);

                }
                let req = await request.json();

                let review = use.deleteReview(req.id, req.review);

                if (!review) {
                    return new Response(JSON.stringify("Not Found"), { status: 404 })
                }
                else {
                    return new Response(null, {
                        status: 204,
                        headers: options.headers
                    })

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