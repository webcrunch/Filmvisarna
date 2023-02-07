import { useStates } from './utilities/states';
import { useParams, Link } from 'react-router-dom';
import { calculatingTime } from './utilities/length-calculating';
import React, { useState } from 'react';

export default function DetailedInfo() {
    const { moviePath } = useParams();

    const s = useStates('main');
    const movie = s.movies.find(movie => movie.title == moviePath);
    const [isOpen, setIsOpen] = useState(false);

    return <>
        {
            movie != undefined ?
                <div className="detailedPageContainer">
                    <div className="leftContainerImgTrailer">
                        <img className="detailedImages" src={movie.images} />
                    </div>

                    <h1 className="detailedTitle">{movie.title}</h1>
                    <div className="rightContainerText">
                        <div className="rightDesc">
                            <p className="detailedDesc">{movie.description}</p> <div />
                        </div>
                        <div className="detailedInfo">
                            <p className="detailedLength">Length: {calculatingTime(movie.length)}</p>
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
                        <p>Rating:
                            <div style={{ padding: '100px 100px', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
                                <button name='btnRatings'>Show Ratings </button>
                            </div>
                            {isOpen && (
                                <div className="detailedRatingDropdown">
                                    {movie.reviews.map(rate =>
                                        <div className="detailedRating">
                                            <p>{rate.source}</p>
                                            <p>{rate.quote}</p>
                                            <p>{rate.stars}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </p>
                    </div>
                    <button name='btnBooking' onClick={() => alert('Booking coming soon')}>Book Now</button>
                </div>
                : null}
    </>
}

