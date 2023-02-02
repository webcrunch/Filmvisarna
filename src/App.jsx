import { useStates } from './utilities/states';
import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';
import Home from './pages/home.jsx';
import Contact from './pages/contact.jsx';
import About from './pages/about.jsx';
import Movies from './pages/Movies.jsx';

// A React component is a function
// it will run every time a state variable changes
// thus rerendering the content you see in your Browser
export default function App() {

  /* State variables */

  let s = useStates('main', {
    movies: [],
    menu: [
      { label: 'Filmvisningar', path: '/movies', Component: Movies },
      { label: 'Om oss ', path: '/about', Component: About }, //, Component:
      { label: 'Kontakt', path: '/contact', Component: Contact },
      { label: 'Hem', path: '/', Component: Home }
    ],
    screening: [],
    sallons: []
  });

  /* Runs when the component App loads */
  useEffect(() => {
    // Load animal data from /json/niceAnimals.json
    (async () => {
      s.movies = await (
        await fetch('/json/movies.json')
      ).json();
      s.screening = await (
        await fetch('/json/screening.json')
      ).json();
      s.sallons = await (
        await fetch('/json/saloons.json')
      )
    })();
  }, []);


  // Return som jsx (HTML-like code with expressions inside arrow brackets)
  return <BrowserRouter>
    <Navbar />
    <main>
      <Routes>
        {s.menu.map(({ path, Component }) => <Route path={path} element={<Component />} />)}
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>;
}