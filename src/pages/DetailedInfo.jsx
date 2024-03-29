import { useStates } from '../utilities/states';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { calculatingTime } from '../utilities/length-calculating';
import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom'
import Trailer from './trailer';
// import Trailer from ''
export default function DetailedInfo() {
    const { moviePath } = useParams();

    const s = useStates('main');
    const movie = s.movies.find(movie => movie.path == moviePath);
    const [showRatings, setShowRatings] = useState(false);
    const [showScreenings, setShowScreenings] = useState(false);
    const trailer = movie && movie.youtubeTrailer;
    const screening = useStates({ date: "null" })
    const navigate = useNavigate();
    const screenings = movie != undefined ? s.screenings.filter(screen => screen.film === movie.title) : null;
    let dateArray = movie != undefined ? screenings.map(screen => screen.date) : null;

    const toTicket = (screening, moviePath) => {
        navigate("/ticket/" + encodeURIComponent(JSON.stringify({ id: screening.id, auditorium: screening.auditorium, moviePath: moviePath })));
    }

    useEffect(() => {
        document.body.classList.add("detailedInfo");
        return () => document.body.classList.remove("detailedInfo");
    }, []);
    const filterByDate = (s) => screening.date === "null" || s.date === screening.date;
    return <>
        {
            movie != undefined ?
                <div className="detailedPageContainer">
                    <div className='detailedLeftContainer'>
                        <img className="detailedImages" src={movie.images} />
                        <Trailer className="detailedTrailer" embedId={trailer} />
                    </div>
                    <div className="detailedRightContainer">
                        <h1 className="detailedTitle">{movie.title}</h1>
                        <div className="detailedInfo">
                            <p className="detailedDesc">{movie.description}</p>
                            <p className="detailedLength infoPart">Längd: <br /> {calculatingTime(movie.length)}</p>
                            <p className="detailedGenre infoPart">Genre: <br /> {movie.genre.replace(/,/g, ', ')}</p>
                            <div className="clearBoth"></div>
                            <p className="detailedReleaseDate infoPart">Premiär: <br /> {movie.productionYear}</p>
                            <p className="detailedDirector infoPart">Regi: <br /> {movie.director}</p>
                            <div className="clearBoth"></div>
                            <div className='allActorsList'>
                                <p className="detailedActors">Skådespelare: <br /> </p>
                                <ul>
                                    {movie.actors.map(actor =>
                                        <li>{actor}</li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        <div className="buttonsUnderText">
                            <button name="btnRatings" className="buttonRatings" onClick={() => setShowRatings(!showRatings)}>{showRatings ? "Göm recensioner" : "Visa recensioner"}</button>
                            <button name="btnScreenings" className="buttonScreenings" onClick={() => setShowScreenings(!showScreenings)}>{showScreenings ? "Göm visningar" : "Visa visningar"}</button>
                            {showRatings && (
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
                            {showScreenings && (
                                <div className="detailedScreeningsDropdown">
                                    <div className="detailedScreening">
                                        <select name="" {...screening.bind("date")} >
                                            <option value="null">Alla tider</option>
                                            {[...new Set(dateArray)].map(cat => <option>{cat}</option>)}
                                        </select>
                                        {screenings.filter(filterByDate).map(screen => (
                                            <p className="detailedScreeningsInfo" onClick={() => toTicket(screen, movie.path)}>
                                                Datum: {screen.date} Tid: {screen.time} Salong: {screen.auditorium}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>

                    </div>
                </div>
                : null}
    </>
}

