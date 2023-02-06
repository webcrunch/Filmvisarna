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
        "description": "Filmen utspelas i norra Italien sommaren 1983. En ung amerikansk-italienare blir förälskad i en amerikansk student som kommer för att studera och bo hos hans familj.Tillsammans upplever de en oförglömlig sommar - full av musik, mat och kärlek - som för evigt kommer att förändra dem.",
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
                "stars": 4,
                "max": 5
            },
            {
                "source": "Svenska Dagbladet",
                "quote": "en film att förälska sig i",
                "stars": 5,
                "max": 5
            },
            {
                "source": "DN",
                "quote": "en het romans i åttiotalskostym",
                "stars": 4,
                "max": 5
            }
        ]
    }
    return <>
        <div className="detailedPageContainer">
            <div className="leftContainerImgTrailer">
                <img className="detailedImages" src={movie.images} />
                <iframe className="detailedTrailer" src="https://www.youtube.com/embed/Z9AYPxH5NTM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>

            <h1 className="detailedTitle">{movie.title}</h1>
            <div className="rightContainerText">
                <div className="rightDesc">
                    <p className="detailedDesc">{movie.description}</p> <div />
                </div>
                <div className="detailedInfo">
                    <p className="detailedLength">Length: {movie.length}</p>
                    <p className="detailedGenre">Genre: {movie.genre}</p>
                    <p className="detailedReleaseDate">Released: {movie.productionYear}</p>
                    <p className="detailedDirector">Director: {movie.director}</p>
                    <p className="detailedActors">Actors:</p>
                    <ul>
                        {movie.actors.map(actor =>
                            <li>{actor}</li>
                        )}
                    </ul>
                </div>
            </div>

            <div className="detailedRatingOverwiev">
                <p>Rating: {movie.reviews.map(rate =>
                    <div className="detailedRating">
                        <p>{rate.source}</p>
                        <p>{rate.quote}</p>
                        <p>{rate.stars}</p>      
                    </div>
                )}</p>
            </div>
            <button onClick={() => alert('Booking coming soon')}>Book Now</button>

        </div>

    </>
}

