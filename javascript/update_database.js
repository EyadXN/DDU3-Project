export function getMovies() {
  try {
    const fileContent = Deno.readTextFileSync("database.json");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Kunde inte läsa filen", error);
    return [];
  }
}
