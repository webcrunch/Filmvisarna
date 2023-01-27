import { useStates } from "./utilities/states"
import { useEffect } from 'react';


export default function Movies() {

    let s = useStates('movies',{
    movies: [] });

    useEffect(() => {
    // Load animal data from /json/niceAnimals.json
    (async () => {
      s.movies = await (await fetch("/json/movies.json")).json();
        })();
    }, []);
    
    
  return<>

       {/*   <p>Movie List</p>
        {s.movies.map(
            movie => <>
               <div className="movie">
                    <img src={movie.image} />
                    <p className="movie">{movie.language} tal</p>
                    <p>{movie.subtitles} text</p>
                    </div>
            </>
        )}  */}

<h1>Filter</h1>
<div className="imagelistdiv">
    <hr className="movieshr"></hr>
    <img className="imagesmovies" src="/images/avatar.jpg" alt="bilden kunde ej visas"></img>
    <hr className="movieshr"></hr>

    <img className="imagesmovies" src="/images/thewords.jpg" alt="bilden kunde ej visas"></img>
    <hr className="movieshr"></hr>

    <img className="imagesmovies" src="/images/thelionking.jpg" alt="bilden kunde ej visas"></img>
    <hr className="movieshr"></hr>

    <img className="imagesmovies" src="/images/thegraveencounters.jpg" alt="bilden kunde ej visas"></img>
    <hr className="movieshr"></hr>
    
    <img className="imagesmovies" src="/images/americanpie2.jpg" alt="bilden kunde ej visas"></img>
    <hr className="movieshr"></hr>
</div>




    </>
}