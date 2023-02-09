import { useStates } from './utilities/states';
import { useParams, Link } from 'react-router-dom';
import { calculatingTime } from './utilities/length-calculating';
import React, { useState } from 'react';

export default function DetailedInfo() {
    const { moviePath } = useParams();

    const s = useStates('main');
    const movie = s.movies.find(movie => movie.title == moviePath);
    const [isOpen, setIsOpen] = useState(false);
    const trailer = movie && movie.youtubeTrailer;

    return <>
        {
            movie != undefined ?
                <div className="detailedPageContainer">
                    <div className="leftContainerImgTrailer">
                        <img className="detailedImages" src={movie.images} />
                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${movie.youtubeTrailer}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                    <h1 className="detailedTitle">{movie.title}</h1>
                    <div className="rightContainerText">
                        <div className="rightDesc">
                            <p className="detailedDesc">{movie.description}</p> <div />
                        </div>
                        <div className="detailedInfo">
                            <p className="detailedLength">Length: <br /> {calculatingTime(movie.length)}</p>
                            <p className="detailedGenre">Genre: <br /> {movie.genre}</p>
                            <p className="detailedReleaseDate">Released: <br /> {movie.productionYear}</p>
                            <p className="detailedDirector">Director: <br /> {movie.director}</p>
                            <p className="detailedActors">Actors: <br /> </p>
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
                                <button name='btnRatings' className='buttonRatings'>Show Ratings </button>
                            </div>
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
                        </p>
                    </div>
                    <button name='screenings' className="buttonScreenings" onClick={() => alert('Screening coming soon')}>View Screenings</button>
                </div>
                : null}
    </>
}

