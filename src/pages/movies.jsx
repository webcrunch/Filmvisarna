import { useStates } from "../utilities/states";
// import { calculatingTime } from "../utilities/length-calculating";
export default function Movies() {
    let { movies, screening } = useStates('main');
    
    function getMovies(name) {
        let { images } = movies.find(movie => movie.title === name);
        return images;
    }
    
    return <div className="movieList">
   <h1>Movie List</h1>
        {/*</>p>filter</p> */}
        {screening.map(display => <>
            <div className="imagelistdiv">
                {/* <hr className="movieshr"></hr> */}
                <img className="imagesmovies" src={"../" + getMovies(display.film)} alt={"Poster av filmen " + display.film} />
                 
                <div className="tidochsalong">
                    <h2 className="movietitlefilmer">{display.film}</h2>
                    <h3 className="tidochsalongtitle">{display.auditorium}</h3>
                    <h3 className="tidochsalongtitle">{display.date} : {display.time}</h3>
                </div>
                <button className="moviebtnsitplatser" type="submit" value="Submit">Välj sittplatser</button>
            </div>
        </>)}
    </div >
}
