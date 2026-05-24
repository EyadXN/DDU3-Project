class API {

  async getMovies() {
    let request;
    let movies;
    try {
      request = await fetch("/movies", {
        headers: { "Accept": "application/json" }
      });
      if (!request.ok) {
        throw new Error("movies response är inte ok! Vincent")
      }
      movies = await request.json();
      console.log("movies:", movies)
      
    } catch (error) {
      throw new Error(error + "network error Abasin")
    }
    
    return movies;
  }
  async getMovie(id) {
    let response;
    try {
      response = await fetch("/movies/" + id, {
      headers: { "Accept": "application/json" }
      });
      if (!response.ok) {
        throw new Error("Kunde inte hämta filmen pågrund av Responsen")
      }
      
      let movie = await response.json();
      console.log("movie", movie)
      return movie;

    } catch (error) {
      console.error(error);
      throw error;
    }

  }
  async postUser(newUser) {
    try {

      const response = await fetch("/users", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(newUser)
      });
      if (!response.ok) {
        throw new Error("response är inte ok!")
      }

      const data = await response.json();
      return data;
      console.log("User created:", data);

    }
    catch (error) {

      throw new Error("Error:", error)

    }

  }

  async postReview(userId, review){
    let newReviewObj = {
      id: userId,
      review: review
    }
    try{
      const response = await fetch("/movies", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(newReviewObj)
      });
      if (!response.ok) {
        throw new Error("response är inte ok!")
      }

      const data = await response.json();
      return data;
    }catch(error){
      alert("frontend Requesten gick inte igenom", error)
      return
    }
}

async deleteReview(userId, review){
  let newReviewObj = {
      id: userId,
      review: review
    }
    try{
      const response = await fetch("/users", {

        method: "DELETE",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(newReviewObj)
      });
      if (!response.ok) {
        throw new Error("response är inte ok!")
      }

      const data = await response.json();
      return data;
    }catch(error){
      alert("frontend Requesten gick inte igenom", error)
      return
    }
}

}
let api = new API();