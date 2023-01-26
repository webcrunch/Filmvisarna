import { useStates } from './utilities/states.js';
import { useEffect } from 'react';
import Test from './Test.jsx';

// A React component is a function
// it will run every time a state variable changes
// thus rerendering the content you see in your Browser
export default function App() {

  /* State variables */
  let s = useStates({
    movies: [],
    catImageVisible: false,
    time: new Date().toLocaleString('sv-SE')
  });

  /* Runs when the component App loads */
  useEffect(() => {
    // Load animal data from /json/niceAnimals.json
    (async () => {
      s.movies = await (
        await fetch('/json/movies.json')
      ).json();
    })();
    // Run an anonymous arrow functions that changes
    // the state variable s.time once a second
    // (using an interval)
    let timeInterval = setInterval(
      () => s.time = new Date().toLocaleString('sv-SE'),
      1000
    );
    // Return an anonymous that will run when/if
    // the component unloads (we leave the page)
    // - it will stop/clear the interval
    return () => clearInterval(timeInterval);
  }, []);


  // Return som jsx (HTML-like code with expressions inside arrow brackets)
  return <>
    <header>
      jag heter stig i laget
    </header>
    <main>
      {/* Some normal HTML */}
      <h1>Hello world!</h1>
      <p>Animals are nice and so is React as a frontend development framework!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ullam ex reiciendis amet consequuntur voluptatem temporibus, illum quaerat reprehenderit pariatur voluptatibus a natus modi aspernatur mollitia rem voluptate repudiandae aperiam.</p>
      <p>The local time right now is: <b>{s.time}</b></p>
      <h2>Movie:</h2>
      <ul>
        {/* A "loop" using the array method 'map' */}
        {s.movies.map(
          movie => <>
            <img className='posterImg' src={movie.images[0]} alt="bild" />
            <li>
              titel: {movie.title}
            </li>
            <li>
              längd: {Math.floor(movie.length / 60)} timmar och  {movie.length % 60} minuter
            </li>
            <li>
              genre: {movie.genre}
            </li>
            {/* <video
            src="https://www.youtube.com/embed/Z9AYPxH5NTM"
             type="video/mp4" 
            >   </video> */}

            <iframe width="420" height="315"
              src="https://www.youtube.com/embed/Z9AYPxH5NTM">
            </iframe>
            {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/Z9AYPxH5NTM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}




          </>
        )}
      </ul>
      <p>
        {/* A button with an onClick event */}
        <button onClick={() => s.catImageVisible = !s.catImageVisible}>
          {s.catImageVisible ? 'Hide the' : 'Show a'} cat image
        </button>
      </p>
      <p>
        {/* Show the cat image if s.catImageVisible is true */}
        {s.catImageVisible && <img src="/images/cat.jpg" />}
      </p>
    </main>
    <footer>
      hej alla ni
    </footer>
  </>;
}