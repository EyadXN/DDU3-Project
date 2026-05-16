async function getMovies(){
    const apiKey = "35a75874";
    const searchKeyWord = "batman";
    const url =`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchKeyword}`;

    try{
        response = await fetch(url);

        if(!response.ok){
            throw new Error(`HTTP-fel! Status: ${response.status}`);
        }

        const data = await response.json;
    }catch(error){

    }
}