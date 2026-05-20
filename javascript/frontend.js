class API{
  constructor(){
    this.baseURL = "http://localhost:8000.";
  }

  async getMovies(){
    try{
      let request = await fetch(`${this.baseURL}/movies`);
      if(!request.ok){
        throw new Error("movies response är inte ok!")
      }
    }catch(error){
      throw new Error(error + "network error")
    }
    let movies = await request.json;
    return movies;
  }
  async postUser(){
    
  }


}