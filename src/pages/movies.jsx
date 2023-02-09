import { useStates } from "../utilities/states";
import { calculatingTime } from "../utilities/length-calculating";
export default function Movies() {
    let { movies, screening } = useStates('main');
    
    function getMovies(name) {
        let { images,length } = s.movies.find(movie => movie.title === name);
        return [images,length];
    }
    function filterSaloons(auditorium) {
        l.screenings =  auditorium.includes("Båda") ? s.screenings : s.screenings.filter(movie => movie.auditorium === auditorium);
    }   
    
    return <div className="movieList">
   <h1>Movie List</h1>
        {/*</>p>filter</p> */}
        {/* Filter by Saloons */}
         <select name="selectList" onChange={e => filterSaloons(e.target.value)} id="selectList">
            <option>Båda Salongerna</option>
            <option >Stora Salongen</option>
            <option >Lilla Salongen</option>
        </select>          
        {l.screenings.map(display => <>
            <div className="imagelistdiv">
                {/* <hr className="movieshr"></hr> */}
                <img className="imagesmovies" src={"../" + getMovies(display.film)[0]} alt={"Poster av filmen " + display.film} />                 
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
