import { useStates } from "../utilities/states";
import { useEffect } from 'react';


export default function Movies() {

    let s = useStates('main');


    return <div className="movieList">

        <h1>Movie List</h1>
        {/*</>p>filter</p> */}
        {s.movies.map(
            movie => <>
                {
                    <div className="imagelistdiv">
                        {/* <hr className="movieshr"></hr> */}
                        <img className="imagesmovies" src={movie.image} alt="bilden kunde ej visas"></img>
                        <div className="tidochsalong">
                            <h2 className="movietitlefilmer">{movie.title}</h2>
                            <h3 className="tidochsalongtitle">17:30, Salong 1</h3>
                        </div>
                        <button className="moviebtnsitplatser" type="submit" value="Submit">Välj sittplatser</button>
                    </div>
                }
            </>
        )}
    </div>
}