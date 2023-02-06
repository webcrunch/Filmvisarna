import { useStates } from "../utilities/states";
import { calculatingTime } from "../utilities/length-calculating";

export default function Movies() {
    let s = useStates('main');
    let movieTitles = s.movies.map(movie => movie.title);
    
    function getMovies(name) {
        let { images,length } = s.movies.find(movie => movie.title === name);
        return [images,length];
    }

    function filterMovie(film) {
        s.screening = s.screening.filter(movie => movie.film === film);
    }

    function filterSallons(auditorium) {
        s.screening = s.screening.filter(movie => movie.auditorium === auditorium);
    }
    
    return <div className="movieList">
        <h1>Movie List</h1>
        <p>Salonger:</p>
        <select onChange={e => filterSallons(e.target.value)} name="selectList" id="selectList">
            <optgroup label="Movies">
                <option value="All">All</option>
                <option value="Stora Salongen">Stora Salongen</option>
                <option value="Lilla SAlongen">Lilla Salongen</option>
                </optgroup>
        </select>
        <p>Movies:</p>
        <select onChange={e => filterMovie(e.target.value)} name="selectList" id="selectList">
            <optgroup label="Movies">
                <option value="All">All</option>
            {movieTitles.map(title => <option value={title}>{title}</option> )}
                </optgroup>
        </select>
        {/*</>p>filter</p> */}
        {s.screening.map(display => <>
            <div className="imagelistdiv">
                {/* <hr className="movieshr"></hr> */}
                <img className="imagesmovies" src={"../" + movie.images} alt={"Poster av filmen " + movie.title} />
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

