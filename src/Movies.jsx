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
    
    
    return <>
        <p>Movie List</p>
        {s.movies.map(
            movie => <>
               <div className="movie">
                    <img src={movie.images[0]} />
                    <p className="movie">{movie.language} tal</p>
                    <p>{movie.subtitles} text</p>
                    </div>
            </>
        )}
    </>
}