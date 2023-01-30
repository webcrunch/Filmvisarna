import { useStates } from './utilities/states.js';
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
import Movies from './pages/movies.jsx';
// A React component is a function
// it will run every time a state variable changes
// thus rerendering the content you see in your Browser
export default function App() {

  /* State variables */

  let s = useStates('main',{
    movies: [],
    menu: [
      { label: 'FILMER', path: '/movies', Component: Movies },  
      { label: 'OM OSS ', path: '/about', Component: About}, //, Component:
      { label: 'KONTAKT', path: '/contact', Component: Contact },
      { label: 'HEM', path: '/', Component: Home }
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