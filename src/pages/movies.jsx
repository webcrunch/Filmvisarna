import { useStates } from "../utilities/states";
import { calculatingTime } from "../utilities/length-calculating";
import { Link } from 'react-router-dom';

export default function Movies() {
    let { movies, screening } = useStates('main');
    
    function getMovies(name) {
        let { images,length } = movies.find(movie => movie.title === name);
        return [images,length];
    }
    
    return <div className="movieList">
   <h1>Movie List</h1>
        {/*</>p>filter</p> */}
        {screening.map(display => <>
            <div className="imagelistdiv">
                {/* <hr className="movieshr"></hr> */}
                 <Link to={"/movie/" + movie.path}><img className="imagesmovies" src={"../" + movie.images} alt={"Poster av filmen " + movie.title} /></Link>
                <div className="tidochsalong">
                    <h2 className="movietitlefilmer">{display.film}</h2>
                    <h4 className="tidochsalongtitle">Sal: {display.auditorium}. Dag: {display.date} </h4>
                    <h4 className="tidochsalongtitle">Tid: {display.time}. Längd: {calculatingTime(getMovies(display.film)[1])}</h4>
                </div>
                <button className="moviebtnsitplatser" type="submit" value="Submit">Välj sittplatser</button>
            </div>
        </>)}
    </div >
}
