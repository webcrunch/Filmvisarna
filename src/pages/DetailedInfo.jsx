import { useStates } from '../utilities/states';
import { useParams, Link } from 'react-router-dom';
import { calculatingTime } from '../utilities/length-calculating';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function DetailedInfo() {
    const { moviePath } = useParams();
    const s = useStates('main');
    const movie = s.movies.find(movie => movie.path == moviePath);
    const [showRatings, setShowRatings] = useState(false);
    const [showScreenings, setShowScreenings] = useState(false);
    const trailer = movie && movie.youtubeTrailer;
    const screening = useStates({ screenings: "null", categories: "null" });
    const screenings = movie != undefined ? s.screenings.filter(screen => screen.film === movie.title) : null;
    let dateArray = movie != undefined ? s.screenings.map(screen => screen.date) : null;

    useEffect(() => {
        document.body.classList.add("ticketPage");
        return () => document.body.classList.remove("ticketPage");
    }, []);

    const filterByDate = (s) => screening.categories === "null" || s.date === screening.categories;

    const handleButtonClick = (button) => {
        if (button === 'ratings') {
            setShowRatings(!showRatings);
            setShowScreenings(false);
        } else {
            setShowScreenings(!showScreenings);
            setShowRatings(false);
        }
    };

    return (
        movie != undefined ? 
            <div className="detailedPageContainer">
                <h1 className="detailedTitle">{movie.title}</h1>
                
                
                <div className="detailed-inner-containers">

                    <div className='detailedLeftContainer'>
                        <img className="detailedImages" src={movie.images} />
                    </div>
                    <div className="detailedRightContainer">
                    
                    <p className="detailedDesc">{movie.description}</p>
                        <div className="detailedInfo">
                           
                            <p className="detailedLength infoPart"><p><b>Längd:</b>{" - "} </p> {" - "}{calculatingTime(movie.length)}</p>
                            <p className="detailedGenre infoPart"><p><b>Genre:</b> {" - "}</p> {" - "}{movie.genre}</p>

                            <p className="detailedReleaseDate infoPart"><p><b>Premiär:</b>{" - "}</p> {" - "} {movie.productionYear} </p>
                        
                        </div>
                        
                        <div className="infoPart detailedDirector"><p><b>Regisör:</b>{" - "}</p>
                            
                        {" - "} {movie.director} </div>
                        
                        <div className="info-part-bottom">

                                <div className="infoPart ratings detailedActors"><p>{<b>Skådespelare:</b>}</p> 
                                        <ul>
                                            {movie.actors.map(actor => 
                                                <li key={actor}>{" | "}{actor}{" | "}</li>
                                            )}
                                        </ul>
                                </div>

                            <div className="buttonsUnderText">
                                    <button name="btnRatings" className="buttonRatings" onClick={() => handleButtonClick('ratings')}>Show Ratings</button>
                                    <button name="btnScreenings" className="buttonScreenings" onClick={() => handleButtonClick('screenings')}>View Screenings</button>
                            </div>
                                    
                                    {showRatings && (
                                        <div className="detailedRatingDropdown">
                                            {movie.reviews.map(rate => 
                                                <div key={rate.source} className="detailedRating">
                                                    <p>{rate.source}</p>
                                                    <p>{rate.quote}</p>
                                                    <p>
                                                        {Array.from({ length: 5 }, (_, i) => i < rate.stars ? "⭐" : "☆")}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {showScreenings && (
                                        <div className="detailedScreeningsDropdown">
                                            <div className="detailedScreening">
                                                <select {...screening.bind("categories")} id="categories">{dateArray.map((cat, index) => <option key={index}>{cat}</option>)}</select>
                                                {screenings.filter(filterByDate).map(screen => <p key={screen.film}>{<b>Filmen: </b>}{screen.film}{" "}{<b>visas på bio - </b>}{screen.date}</p>)}
                                                
                                            </div>
                                        </div>
                                    )}
                          
                                    
                           
                        </div>

                        
                        
                    
                            <div className="clearBoth"></div>
                            
                            <div className="clearBoth"></div>

                        </div>

                </div>
                


                </div>
          
        : null
    );
}
