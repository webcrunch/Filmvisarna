import { useStates } from "../utilities/states";
import { calculatingTime } from "../utilities/length-calculating";
import { Link } from 'react-router-dom';

export default function Movies() {
    let {movies, screening} = useStates('main');
    return <div className="movieList">

        <h1>Movie List</h1>
        {/*</>p>filter</p> */}
        {movies.map(movie => <>
            <div className="imagelistdiv">
                {/* <hr className="movieshr"></hr> */}
                 <Link to={"/movie/" + movie.title}><img className="imagesmovies" src={"../" + movie.images} alt={"Poster av filmen " + movie.title} /></Link>
                <div className="tidochsalong">
                    <h2 className="movietitlefilmer">{movie.title}</h2>
                    <h3 className="tidochsalongtitle">17:30, Salong 1</h3>
                    <h4 className="tidochsalongtitle">{calculatingTime(movie.length)}</h4>
                </div>
                <button className="moviebtnsitplatser" type="submit" value="Submit">Välj sittplatser</button>
            </div>
        </>)}
    </div >

    

}

