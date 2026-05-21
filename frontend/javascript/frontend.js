class API {

  async getMovies() {
    try {
      let request = await fetch("/movies", {

        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        }
      }
      );
      if (!request.ok) {
        throw new Error("movies response är inte ok!")
      }
    } catch (error) {
      throw new Error(error + "network error")
    }
    let movies = await request.json();
    console.log(movies)

    return movies;
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


}
let api = new API();