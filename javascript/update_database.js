
try {
  // 1. Läs in din nuvarande database.json
  const fileContent = Deno.readTextFileSync("database.json");
  const movies = JSON.parse(fileContent);

  // Dina mall-nycklar (Använd gärna "5/10" som text om du vill ha med /10 direkt)
  let updatedObjectKeys = {
    category: "Drama",
    description: "Ingen beskrivning tillgänglig ännu.",
    rating: "5"
  };

  let updatedMovies = [];

  // 2. Loopa igenom varje film i listan
  for (let movie of movies) {
    
    // Object.assign slår ihop den tomma mappen {}, dina nya nycklar, och filmen.
    // Om filmen redan har en kategori, behålls den tack vare ordningen!
    let mergedMovie = Object.assign({}, movie, updatedObjectKeys);
    
    // Lägg till den uppdaterade filmen i vår nya lista
    updatedMovies.push(mergedMovie);
  }

  // 3. Spara tillbaka till database.json
  Deno.writeTextFileSync("database.json", JSON.stringify(updatedMovies, null, 2));
  console.log(`Klart! Uppdaterade ${updatedMovies.length} filmer med nya nycklar.`);

} catch (error) {
  console.error("Fel vid uppdatering:", error);
}