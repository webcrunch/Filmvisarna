import { useStates } from '../utilities/states';
import { useParams, Link } from 'react-router-dom';
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
    const screening = useStates({ screenings: "null", categories: "null" })

    const screenings = movie != undefined ? s.screenings.filter(screen => screen.film === movie.title) : null;
    // let dateArray =[];
    let dateArray = movie != undefined ? s.screenings.map(screen => screen.date) : null;
    // const testBlock = screenings.filter((screen,index) => {
    //     if(index < 4) return screen;
    // })

    function createDates() {
        let categories = [];
        for (let screen of screenings) {
            console.log(screen);
            categories = [...categories, ...movie.genre.split(",")];
        }
        l.categories = [...new Set(categories)];
    }


    useEffect(() => {
        /*   createDates(); */
        document.body.classList.add("detailedInfo");
        return () => document.body.classList.remove("detailedInfo");
    }, []);
    const filterByDate = (s) => screening.categories === "null" || s.date === screening.categories;
    return <>
        {
            movie != undefined ?
                <div className="detailedPageContainer">
                    <div className='detailedLeftContainer'>
                        <img className="detailedImages" src={movie.images} />
                        <Trailer className="detailedTrailer" embedId={trailer} />
                        {/* <iframe className="movieTrailer" width="350px" height="315px" src={"https://www.youtube.com/embed/" + movie.youtubeTrailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                    </div>
                    <div className="detailedRightContainer">
                        <h1 className="detailedTitle">{movie.title}</h1>
                        <div className="detailedInfo">
                            <p className="detailedDesc">{movie.description}</p>
                            <p className="detailedLength infoPart">Längd: <br /> {calculatingTime(movie.length)}</p>
                            <p className="detailedGenre infoPart">Genre: <br /> {movie.genre}</p>
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
                            <button name="btnRatings" className="buttonRatings" onClick={() => setShowRatings(!showRatings)}>Show Ratings</button>
                            <button name="btnScreenings" className="buttonScreenings" onClick={() => setShowScreenings(!showScreenings)}>View Screenings</button>
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
                                        <select name="" {...screening.bind("categories")} id="">
                                            {dateArray.map(cat => <option>{cat}</option>)}
                                        </select>
                                        {screenings.filter(filterByDate).map(screen => (
                                            <Link to={"/ticket/" + movie.path} state={{
                                                from: [
                                                    screen.auditorium,
                                                    screen.film,
                                                    screen.date,
                                                    screen.time,
                                                ],
                                            }} className="detailedScreeningsInfo">
                                                <p>
                                                    {screen.film} - {screen.date} - {screen.time} - in {screen.auditorium}
                                                </p>
                                            </Link>
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

