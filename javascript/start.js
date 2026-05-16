//* Börja med att skapa en variabel som har värdet av #movie,
//* sedan s
let picPlaysimg = [
    {
        name: "Dune",
        id: "0",
        category: "Adventure/Drama",
        release:"2021",
        rating: "☆5",
        imgUrl: "../img/movieimg/picplay1.jpeg",
        description:"Paul Atreides anländer till ökenplaneten Arrakis där kampen om den värdefulla kryddan melange leder till krig, förräderi och profetior. Efter att hans familj attackeras tvingas Paul överleva i öknen och upptäcka sitt möjliga öde som ledare för Fremenfolket."
    },
    {
        name: "Se7en",
        id: "1",
        category: "Drama/Thriller",
        release:"1995",
        rating: "☆5",
        imgUrl: "../img/movieimg/picplay2.jpeg",
        description: "Två kriminalpoliser jagar en seriemördare som baserar sina brutala mord på de sju dödssynderna. Utredningen blir allt mörkare och leder till ett chockerande slut som testar deras moral, tålamod och mänsklighet."
    },
    {
        name: "Spider-Man: Into the Spider-Verse",
        id:"2",
        category: "Action",
        release:"2018",
        rating: "☆5",
        imgUrl: "../img/movieimg/picplay3.jpeg",
        description: "Tonåringen Miles Morales blir Spider-Man när flera universum kolliderar och olika versioner av hjälten möts. Tillsammans måste de stoppa ett hot som riskerar att förstöra verkligheten samtidigt som Miles lär sig vad det innebär att vara hjälte. "
    },
    {
        name: "Arrival",
        id: "3",
        category: "Mysterie",
        release:"2016",
        rating: "☆5",
        imgUrl: "../img/movieimg/picplay4.jpeg",
        description: "När mystiska rymdskepp anländer till jorden försöker språkforskaren Louise Banks kommunicera med besökarna. Genom deras språk förändras hennes förståelse av tid, minnen och mänskliga relationer på ett djupt och oväntat sätt."
    },
    {
        name: "Nightcrawler",
        id: "4",
        category: "Drama/Thriller",
        release:"2014",
        rating: "☆5",
        imgUrl: "../img/movieimg/picplay5.jpeg",
        description: "Lou Bloom börjar filma olyckor och brott för lokala nyheter i Los Angeles. Driven av ambition och brist på moral blir han allt farligare i jakten på sensationella bilder och framgång."
    }
]
let movie = document.getElementById("movie");
let currentIndex = 0;
function renderMovie(thisMovie){
    movie.innerHTML = `
    <b>${thisMovie.name}</b>
    <div id="movieInfo">
        <div id="rating">${thisMovie.rating}</div>
        <div id="release">${thisMovie.release}</div>  
        <div id="category">${thisMovie.category}</div>
    </div>
    <div id="description"> ${thisMovie.description}</div>

    <div class="map">
        <button id="left">❰</button>
        <div class ="dot"></div>
        <div class ="dot"></div>
        <div class ="dot"></div>
        <div class ="dot"></div>
        <div class ="dot"></div>
        <button id="right">❱</button>
    </div>
`;
movie.style.backgroundImage = `url(${thisMovie.imgUrl})`;
let rightButton = document.getElementById("right");
let leftButton = document.getElementById("left");

rightButton.addEventListener("click", nextMovie)
leftButton.addEventListener("click", previousMovie)

let dots = document.querySelectorAll(".dot");
dots[currentIndex].classList.add("activeDot");
}
renderMovie(picPlaysimg[0]);



function nextMovie(){
    currentIndex++;
    if(currentIndex > 4){
        currentIndex = 0;
        renderMovie(picPlaysimg[currentIndex]);
    }
    else{ 
        renderMovie(picPlaysimg[currentIndex]);
    }
}
function previousMovie(){
    currentIndex--;
    if(currentIndex < 0){
        currentIndex = 4;
        renderMovie(picPlaysimg[currentIndex]);
    }
    else{
        renderMovie(picPlaysimg[currentIndex])
    }
}
