export default function DetailedInfo() {
    const movie = {
        "title": "Call me by your name",
        "productionCountries": [
            "Italien",
            "USA"
        ],
        "productionYear": 2017,
        "length": 132,
        "genre": "Drama",
        "distributor": "UIP",
        "language": "engelska",
        "subtitles": "svenska",
        "director": "Luca Guadagnino",
        "actors": [
            "Armie Hammer  ",
            "Timothée Chalamet  ",
            "Michael Stuhlbarg  "
        ],
        "description": "<p>Filmen utspelas i norra Italien sommaren 1983. En ung amerikansk-italienare blir förälskad i en amerikansk student som kommer för att studera och bo hos hans familj.</p><p>Tillsammans upplever de en oförglömlig sommar - full av musik, mat och kärlek - som för evigt kommer att förändra dem.</p>",
        "images": [
            "https://m.media-amazon.com/images/M/MV5BNDk3NTEwNjc0MV5BMl5BanBnXkFtZTgwNzYxNTMwMzI@._V1_.jpg",
            "https://m.media-amazon.com/images/M/MV5BMzBlMWQ4MDMtMWEzNy00MWJiLWI2ZDgtZjBkOTkwMTFlOTNhXkEyXkFqcGdeQTNwaW5nZXN0._V1_.jpg",
            "ttps://static.metacritic.com/images/products/movies/6/33ef47117e90c768a4632c77ed16da3e-2400.jpg",
            "call-me-poster1.jpg",
            "call-me-poster2.jpg"
        ],
        "youtubeTrailers": [
            "Z9AYPxH5NTM"
        ],
        "trailer": "https://www.youtube.com/watch?v=Z9AYPxH5NTM?autoplay=1&mute=1",
        "reviews": [
            {
                "source": "Sydsvenskan",
                "quote": "ett drama berättat med stor ömhet",
                "stars1": 4 / 5,
                "max": 5
            },
            {
                "source": "Svenska Dagbladet",
                "quote": "en film att förälska sig i",
                "stars": 5 / 5,
                "max": 5
            },
            {
                "source": "DN",
                "quote": "en het romans i åttiotalskostym",
                "stars": 4 / 5,
                "max": 5
            }
        ]
    }
    return <>
        <div className="movie-page">
            <img className="detailedImages" src={movie.images} />
            <h1 className="detailedTitle">{movie.title}</h1>
            <div className="movie-info">
                <p className="detailedDesc">{movie.description}</p>
                <p className="detailedLength">Length: {movie.length}</p>
                <p className="detailedGenre">Genre: {movie.genre}</p>
                <p className="detailedReleaseDate">Released: {movie.productionYear}</p>
                <p className="detailedActors">Actors:</p>
                <ul>
                    {movie.actors.map(actor => 
                    <li>{actor}</li>
                )}
                </ul>                
                <p className="detailedDirector">Director: </p>
                <ul>
                    {movie.director.map(director => 
                    <li>{director}</li>
                )}
                </ul>
                <p className="detailedRating">Rating: {movie.stars}</p>
            </div>
            <div>
                <h2>Trailer</h2>
                {/* <iframe
                    title={`Trailer for ${movie.title}`}
                    width=""
                    height=""
                    src={movie.trailer}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe> */}
            </div>

            <button onClick={() => alert('Booking coming soon')}>Book Now</button>
        </div>
    </>
}

