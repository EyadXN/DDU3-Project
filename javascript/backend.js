// Requests som behöver göras
// 
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
                    let inStock = url.searchParams.get("inStock");
                    console.log("du är inne")

                    let filtered = pro.filterSearch(products, category, minPrice, maxPrice, inStock);
                    console.log("filtered", filtered)
                    return new Response(JSON.stringify(filtered), options);
          
                }
            }
        }
    }
}

Deno.serve(handler);