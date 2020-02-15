// GENRE //
const genre = [
    {id: 28,name: "Action"},
    {id: 12,name: "Adventure"},
    {id: 16,name: "Animation"},
    {id: 35,name: "Comedy"},
    {id: 80,name: "Crime"},
    {id: 99,name: "Documentary"},
    {id: 18,name: "Drama"},
    {id: 10751,name: "Family"},
    {id: 14,name: "Fantasy"},
    {id: 36,name: "History"},
    {id: 27,name: "Horror"},
    {id: 10402,name: "Music"},
    {id: 9648,name: "Mystery"},
    {id: 10749,name: "Romance"},
    {id: 878,name: "Science Fiction"},
    {id: 10770,name: "TV Movie"},
    {id: 53,name: "Thriller"},
    {id: 10752,name: "War"},
    {id: 37,name: "Western"}
];
// CONST URL //
const urlTopRated = 'https://api.themoviedb.org/3/movie/top_rated?api_key=d8bf019d0cca372bd804735f172f67e8&language=fr-BE&page=1';
const urlPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=d8bf019d0cca372bd804735f172f67e8&language=fr-BE&page=1';
const urlUpcoming = 'https://api.themoviedb.org/3/movie/upcoming?api_key=d8bf019d0cca372bd804735f172f67e8&language=fr-BE&page=1';
const urlLatest = 'https://api.themoviedb.org/3/movie/latest?api_key=d8bf019d0cca372bd804735f172f67e8&language=fr-BE';
const urlNowPlaying = 'https://api.themoviedb.org/3/movie/now_playing?api_key=d8bf019d0cca372bd804735f172f67e8&language=fr-BE&page=1';
// URL IMAGE //
const urlImage = 'https://image.tmdb.org/t/p/w500';

// GLOBAL FUNCTION //
(async() => {
    // FUNCTION FETCH //

    // TOP RATED //
    const arrayTopRated = await request(urlTopRated);
    template (arrayTopRated, '#TopRated');

    // POPULAR //
    const arrayPopular = await request(urlPopular);
    template (arrayPopular, '#Popular');

    // UPCOMING //
    const arrayUpcoming = await request(urlUpcoming);
    template (arrayUpcoming, '#Upcoming');

    // LATEST //
    const arrayLatest = await request(urlLatest);
    template (arrayLatest, '#Latest');

    // NOW PLAYING //
    const arrayNowPlaying = await request(urlNowPlaying);
    template (arrayNowPlaying, '#NowPlaying');

    // FUNCTION FETCH //

    // SEARCH GENRE //

    document.querySelector("#All").addEventListener("click",() => document.querySelector("#filter").innerHTML = template(arr,genre,4,2,2,0));
    selectByClick("#run", "#genre", genre, arr);
    selectByClick("#Action", "#Action", genre, arr);
    selectByClick("#Comedy", "#Comedy", genre, arr);
    selectByClick("#Family", "#Family", genre, arr);
    selectByClick("#Horror", "#Horror", genre, arr);
    selectByClick("#Thriller", "#Thriller", genre, arr);
    selectByClick("#Drama", "#Drama", genre, arr);

    // SEARCH GENRE //

    document.querySelector("#all").addEventListener("click",() => document.querySelector("#filter").innerHTML = template(arr,genre,4,2,2,0)); //pour revenir à l'état par défault (all)
    selectByClick("#action", "#action", genre, arr);
    selectByClick("#Thriller", "#Thriller", genre, arr);
    selectByClick("#Romance", "#Romance", genre, arr);
})()

// TEMPLATE //
const template = (getArray, selectid)=>{
    document.querySelector(selectid).innerHTML = getArray.map((element,i)=>{
        console.log(i);
        if (i<3) 
            return `
        <div class="card">
            <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" class="card-img-top" alt="${element.title}">
        <div class="card-body">
            <h5 class="card-title overflow-auto" style="height:75px">${element.original_title}</h5>
            <p class="card-text overflow-auto" style="height: 100px">${element.overview}</p>
        </div>
        <div class="card-footer">
            <small class="text-muted">${element.release_date}</small>
        </div>
        </div>`
        
    }).join("")
};

// FUNCTION REQUEST //
async function request (urlApi) {
    const reponse = await fetch(urlApi);
    const data = await reponse.json();
    const result = data.results;
    console.table(result);
    return result;
};

// FUNCTION SELECT BY CLICK //
const selectByClick = (idRun, idTarget, arrayGenre, arrayFilm) => {

    document.querySelector(idRun).addEventListener("click", () => {

        const value = document.querySelector(idTarget).value.toLowerCase();

        const filter = selectByGenre(value, arrayGenre, arrayFilm);

        document.querySelector("#filter").innerHTML = template(filter, genre,4,2,2,0);
    });
};