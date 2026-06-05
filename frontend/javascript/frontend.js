class API {

  async getMovies() {
    let response;
    let movies;
    try {
      response = await fetch("/movies", {
        headers: { "Accept": "application/json" }
      });
      if (!response.ok) {
        throw new Error("movies response är inte ok! Vincent")
      }
      movies = await response.json();
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

  async deleteAccount(userId) {
    try {
      let response = await fetch(`/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });
      if (!response.ok) throw new Error("Gick inte att ta bort kontot");
      return await response.json();
    } catch (error) {
      console.log("Nätverksfel vid radering av konto:", error);
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
      console.log("User created:", data);
      return data;

    }
    catch (error) {

      throw new Error("Error:", error)

    }

  }

  async loginUser(credentials) {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      })
      return response.ok
    }catch(error){
      throw new Error("network error")
    }
  }

  async logOutUser(){
    try{
      const response = await fetch("/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if(!response.ok){
        throw new Error("requesten gick inte igenom för logout");
      }
      return response.ok
    }catch(error){
      throw new Error("networks error for logout Request")
    }
  }
  async getCategories() {
    let response;
    let categories;
    try {
      response = await fetch("/movies/categories", {
        headers: { "Accept": "application/json" }
      });
      if (!response.ok) {
        throw new Error("movies response är inte ok! Vincent")
      }
      categories = await response.json();
      console.log("categories:", categories)

    } catch (error) {
      throw new Error(error + "network error Abasin")
    }

    return categories;
  }

  async filterSearch(querystring, userReviewedMovies) {
    try {
      let response = await fetch(`/movies?${querystring}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
      })
      if (!response.ok) throw new Error("Gick inte att filtrera");
      let movies = await response.json();

      const params = new URLSearchParams(querystring);
      const category = params.get("category");
      const choices = params.get("choices");
      const releasedbefore = params.get("releasedbefore");
      const releasedafter = params.get("releasedafter");

      if (category && category !== "") {
        let temp = [];
        for (let m of movies) {
          if (m.category === category) {
            temp.push(m);
          }
        }
        movies = temp;
      }

      if (releasedbefore && releasedbefore !== "") {
        let temp = [];
        for (let m of movies) {
          if (parseInt(m.Year) <= parseInt(releasedbefore)) {
            temp.push(m);
          }
        }
        movies = temp;
      }

      if (releasedafter && releasedafter !== "") {
        let temp = [];
        for (let m of movies) {
          if (parseInt(m.Year) >= parseInt(releasedafter)) {
            temp.push(m);
          }
        }
        movies = temp;
      }

      if (choices === "1") {
        movies.sort(function (a, b) {
          return parseFloat(a.rating) - parseFloat(b.rating);
        });
      } else if (choices === "0") {
        movies.sort(function (a, b) {
          return parseFloat(b.rating) - parseFloat(a.rating);
        });
      }

      return movies;

    } catch (error) {
      alert("nätvärkserror" + error);
      console.log("nätvärkserror" + error)
    }
  }
  async postReview(userId, review) {
    let reviewBody = {
      id: userId,
      review: review
    }
    try {
      const response = await fetch("/movies", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(reviewBody)
      });
      if (!response.ok) {
        throw new Error("response är inte ok!")
      }

      const data = await response.json();
      return data;
    } catch (error) {
      alert("frontend Requesten gick inte igenom", error)
      return
    }
  }

  async deleteReview(userId, review) {
    let reviewBody = {
      id: userId,
      review: review
    }
    try {
      const response = await fetch("/users", {

        method: "DELETE",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(reviewBody)
      });
      if (!response.ok) {
        throw new Error("response är inte ok!")
      }
      if (response.status === 204) {
        return true;
      }
      else {
        return false;
      }


    } catch (error) {
      alert("frontend Requesten gick inte igenom", error)
      return
    }
  }

}
let api = new API();