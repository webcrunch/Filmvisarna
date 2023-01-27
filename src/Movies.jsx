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
    <div className="tidochsalong">
        <h2 className="movietitlefilmer">Avatar</h2>
        <h3 className="tidochsalongtitle">17:30, Salong 1</h3>
    </div>
    <button className="moviebtnsitplatser" type="submit" value="Submit">Välj sittplatser</button>
 </div>
 
<div className="imagelistdiv">
    <hr className="movieshr"></hr>
    <img className="imagesmovies" src="/images/amancalledotto.jpg" alt="bilden kunde ej visas"></img>
    <div className="tidochsalong">
        <h2 className="movietitlefilmer">A Man Called Otto</h2>
        <h3 className="tidochsalongtitle">18:00, Salong 2</h3>
    </div>
    <button className="moviebtnsitplatser" type="submit" value="Submit">Välj sittplatser</button>
 </div>

<div className="imagelistdiv">
    <hr className="movieshr"></hr>
    <img className="imagesmovies" src="/images/blackpanter.jpg" alt="bilden kunde ej visas"></img>
    <div className="tidochsalong">
        <h2 className="movietitlefilmer">Black Panter<br></br>Wakanda Forever</h2>
        <h3 className="tidochsalongtitle">21:00, Salong 1</h3>
    </div>
    <button className="moviebtnsitplatser" type="submit" value="Submit">Välj sittplatser</button>
 </div>
 
<div className="imagelistdiv">
    <hr className="movieshr"></hr>
    <img className="imagesmovies" src="/images/burnallmyletters.jpg" alt="bilden kunde ej visas"></img>
    <div className="tidochsalong">
        <h2 className="movietitlefilmer">Burn All My Letters</h2>
        <h3 className="tidochsalongtitle">21:30, Salong 2</h3>
    </div>
    <button className="moviebtnsitplatser" type="submit" value="Submit">Välj sittplatser</button>
 </div>
 
<div className="imagelistdiv">
    <hr className="movieshr"></hr>
    <img className="imagesmovies" src="/images/themenu.jpg" alt="bilden kunde ej visas"></img>
    <div className="tidochsalong">
        <h2 className="movietitlefilmer">The Menu</h2>
        <h3 className="tidochsalongtitle">17:05, Salong 2</h3>
    </div>
    <button className="moviebtnsitplatser" type="submit" value="Submit">Välj sittplatser</button>
    <hr className="movieshrr"></hr>
 </div>

   



    </>
}