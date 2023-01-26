export default function DetailedInfo(props) {
    const { movie } = props;
    return (
        <>
            <div className="movie-page">
                <h1>{movie.title}</h1>
                <img src={movie.poster} alt={movie.title} />
                <p>{movie.overview}</p>
                <p>Released: {movie.release_date}</p>
                <p>Rating: {movie.rating}</p>
                <div>
                    <h2>Trailer</h2>
                    <iframe
                        title={`Trailer for ${movie.title}`}
                        width=""
                        height=""
                        src={movie.trailer}
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>

                <button onClick={() => alert('Booking coming soon')}>Book Now</button>
            </div>
        </>
    );
}
