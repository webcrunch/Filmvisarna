import { useStates } from './utilities/states';
import { useParams, Link } from 'react-router-dom';
import { calculatingTime } from './utilities/length-calculating';
import React, { useState } from 'react';
// import Trailer from ''
export default function DetailedInfo() {
    const { moviePath } = useParams();

    const s = useStates('main');
    const movie = s.movies.find(movie => movie.title == moviePath);
    const [isOpen, setIsOpen] = useState(true);
    const trailer = movie && movie.youtubeTrailer;

    return <>
        {
            movie != undefined ?
                <div className="detailedPageContainer">
                    <div className='detailedLeftContainer'>
                        <img className="detailedImages" src={movie.images} />
                        {/* <Trailer className="someting" embedId="xjDjIWPwcPU" /> */}
                        <iframe className="movieTrailer" width="350px" height="315px" src={"https://www.youtube.com/embed/" + movie.youtubeTrailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    {/* <h1 className="detailedTitle">{movie.title}</h1> */}
                    <div className="detailedRightContainer">
                        <h1 className="detailedTitle">{movie.title}</h1>
                        <div className="detailedInfo">
                            <p className="detailedDesc">{movie.description}</p>
                            <p className="detailedLength infoPart">Length: <br /> {calculatingTime(movie.length)}</p>
                            <p className="detailedGenre infoPart">Genre: <br /> {movie.genre}</p>
                            <div className="clearBoth"></div>
                            <p className="detailedReleaseDate infoPart">Released: <br /> {movie.productionYear}</p>
                            <p className="detailedDirector infoPart">Director: <br /> {movie.director}</p>
                            <div className="clearBoth"></div>
                            <div className='allActorsList'>
                                <p className="detailedActors">Actors: <br /> </p>
                                <ul>
                                    {movie.actors.map(actor =>
                                        <li>{actor}</li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        <div className="buttonsUnderText">
                            <button name='btnRatings' className='buttonRatings' onClick={() => setIsOpen(!isOpen)}>Show Ratings </button>
                            <button name='screenings' className="buttonScreenings" onClick={() => alert('Screening coming soon')}>View Screenings</button>
                            {isOpen && (
                                <div className="detailedRatingDropdown">
                                    {movie.reviews.map(rate =>
                                        <div className="detailedRating">
                                            <p>{rate.source}</p>
                                            <p>{rate.quote}</p>
                                            <p>
                                                {Array.from({ length: 5 }, (_, i) => {
                                                    return i < rate.stars
                                                        ? <span role="img" aria-label="full-color star">⭐</span>
                                                        : <span role="img" aria-label="hollow star">☆</span>;
                                                })}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>

                    </div>
                </div>
                : null}
    </>
}

