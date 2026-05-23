
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

let tinyHorrorDatabase = [
     {
    "Title": "Wake Up Dead Man",
    "Year": "2025",
    "imdbID": "tt14364480",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BY2Q0OTA5MTEtNWU4NC00ZWFmLTg5NmYtNDFmODViYWUxZmJkXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg",
    "category": "Drama",
    "description": "Ingen beskrivning tillgänglig ännu.",
    "rating": "5"
  },
  {
    "Title": "American Horror Story",
    "Year": "2011–",
    "imdbID": "tt1844624",
    "Type": "series",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzJjZTg0ZmMtMTg0Ny00NzYxLWFjMWMtMWFiYmNkMTNjZGMyXkEyXkFqcGc@._V1_SX300.jpg",
    "category": "Drama",
    "description": "Ingen beskrivning tillgänglig ännu.",
    "rating": "5"
  },
  {
    "Title": "The Rocky Horror Picture Show",
    "Year": "1975",
    "imdbID": "tt0073629",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOTg2YzY5ZGYtNDk1My00N2Q2LWFhN2YtZWU5YTkzODIyZGRmXkEyXkFqcGc@._V1_SX300.jpg",
    "category": "Drama",
    "description": "Ingen beskrivning tillgänglig ännu.",
    "rating": "5"
  },
  {
    "Title": "The Amityville Horror",
    "Year": "2005",
    "imdbID": "tt0384806",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMzc1Njc2NDc3NV5BMl5BanBnXkFtZTYwODYyNzI3._V1_SX300.jpg",
    "category": "Drama",
    "description": "Ingen beskrivning tillgänglig ännu.",
    "rating": "5"
  },
  {
    "Title": "Nosferatu: A Symphony of Horror",
    "Year": "1922",
    "imdbID": "tt0013442",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNDg1OTI1M2MtMTVlMS00ZjFhLTgyMTAtYjIzOWUwZTkyZWE5XkEyXkFqcGc@._V1_SX300.jpg",
    "category": "Drama",
    "description": "Ingen beskrivning tillgänglig ännu.",
    "rating": "5"
  },
  {
    "Title": "The Amityville Horror",
    "Year": "1979",
    "imdbID": "tt0078767",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNWRmOTdhMWEtYmExOC00Y2E5LTkwYjEtYTAwY2Q0MTU0MTBlXkEyXkFqcGc@._V1_SX300.jpg",
    "category": "Drama",
    "description": "Ingen beskrivning tillgänglig ännu.",
    "rating": "5"
  },
]

function createMovieList(){
    let movieList = document.getElementById("movielist");
    let horrorList = tinyHorrorDatabase;


   for(let horror of horrorList){
    movieList.innerHTML += `
        <div class="movieSub">
            <img src="${horror.Poster}" alt="#">
            <p>${horror.Title}</p>
            <div class="subSub">
                <b>☆5</b>
                <p>${horror.Year}</p>
                <p>Horror</p>
            </div>
        </div>
    `;
   }

}
createMovieList();
function nav(){
        let header = document.querySelector("header");
        const loggedInUser = localStorage.getItem("loggedInUser")
        if(loggedInUser){
            header.innerHTML = `
            <div>
                <div></div>
                <div></div>
                <div></div>
                <p>Revaiew</p>
            </div>
                <nav>
                    <ul>
                        <li><a id="profile" href="profile.html"></a></li>
                        <li><a href="discover.html">DISCOVER</a></li>
                        <button id="logOutBtn">Log out</button><
                    </ul>
                </nav>
            `
        }
        else{
            header.innerHTML = `
               <div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <p>Revaiew</p>
                </div>
                <nav>
                    <ul>
                        <li><a href="discover.html">DISCOVER</a></li>
                        <li id="special"><a href="login.html">SIGN IN</a></li>
                    </ul>
                </nav>
            `
        }
    }
nav();

function logOut(){
    const logOutBtn = document.getElementById("logOutBtn");

    logOutBtn.addEventListener("click", function(){
        localStorage.removeItem("loggedInUser");
        nav();
        window.location.href = "login.html"
    })
}
logOut();
