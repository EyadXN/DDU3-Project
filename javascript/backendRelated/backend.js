// Requests som behöver göras
// Deno text: deno run --allow-net --allow-read --watch backendRelated/backend.js.
async function handler(request){
    
    let dataBase = readTextFileSync("database.json");
    let url = new URL(request.url);
    dataBase = JSON.parse(dataBase);
    const options = {
        headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        }
    }
    let moviesUrl = "http://localhost:8000/movies";

    if (url.pathname.startsWith(moviesUrl)){
        if (request.method == "GET"){
            if (request.headers.get("Accept") == "application/json"){
                if(url.pathname == moviesUrl){
                    if(!url.search){
                        return new Response(JSON.stringify(dataBase), options);
                    }
                    let year = url.searchParams.get("year");
                    let category = url.searchParams.get("cateogry"); 
                    let rating = url.searchParams.get("rating");
                    console.log("du är inne")

                    let filtered = pro.filterSearch(dataBase, year, category, rating);
                    console.log("filtered", filtered)
                    return new Response(JSON.stringify(filtered), options);
                }
              let route = new URLPattern({pathname: `${moviesUrl}/:id`});
              if(route.test(request.url)){
                let match = route.exec(request.url);
                let movie = mov.getMovie(match.pathname.groups.id, dataBase);

                if(movie == null){
                    return new Response(JSON.stringify("Not Found"), { status: 404 })
                }
                return new Response(JSON.stringify(movie), options);
              }
            }
            else {
                return new Response(JSON.stringify("Not Acceptable"), { status: 406 })
            }
        }
        if(request.method == "POST"){
            if (request.headers.get("Content-Type") == "application/json"){
                let req = await request.json();
            }
        }
    }
}

Deno.serve(handler);