import { useStates } from './utilities/states.js';
import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Test from './Test'
import Navbar from './Navbar';
import Footer from './Footer';
// A React component is a function
// it will run every time a state variable changes
// thus rerendering the content you see in your Browser
export default function App() {

  /* State variables */

  let s = useStates('main',{
    movies: [],
    catImageVisible: false,
    time: new Date().toLocaleString('sv-SE'),
    menu: [
      { label: 'FILMER', path: '/movies' },  
      { label: 'OM OSS ', path: '/about'}, //, Component:
      { label: 'KONTAKT', path: '/contact' },
      { label: 'HEM', path: '/#' }

    ]
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
  return <BrowserRouter>
    <Navbar />
    <main>
      {/* <Routes>
         {s.menu.map(({ path, Component }) => <Route path={path} element={<Component />} />)}
                </Routes>               */}
            </main> 
    <Footer />
  </BrowserRouter>;
}