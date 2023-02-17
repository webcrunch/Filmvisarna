import { useStates } from './utilities/states.js';
import { useEffect } from 'react';
import { kebabify } from './utilities/kebabify';

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';
import Home from './pages/home.jsx';
import Contact from './pages/contact.jsx';
import About from './pages/about.jsx';
import Movies from './pages/movies.jsx';
import Booked from './pages/booking-confirmatin.jsx';
import DetailedInfo from './detailedInfo.jsx';
import TicketPage from './pages/Ticket.jsx';
import RegisterPage from './pages/register.jsx';
// A React component is a function
// it will run every time a state variable changes
// thus rerendering the content you see in your Browser
export default function App() {

  /* State variables */

  function ScrollToTop({ children }) {
    let location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    return children
  }


  useStates('user', {
    loggedin: false
  })

  let s = useStates('main', {
    movies: [],
    menu: [
      { label: 'HEM', path: '/', Component: Home },
      { label: 'FILMER', path: '/movies', Component: Movies },
      { label: 'OM OSS ', path: '/about', Component: About }, //, Component:
      { label: 'KONTAKT', path: '/contact', Component: Contact },
      { path: '/movie/:moviePath', Component: DetailedInfo },
      { path: '/auth', Component: RegisterPage},
      { path: '/ticket/:moviePath', Component: TicketPage },
      { path: '/done/:bookingId', Component: Booked }
    ],
    screenings: [],
    saloons: []
  });

  /* Runs when the component App loads */
  useEffect(() => {
    // Load animal data from /json/niceAnimals.json
    (async () => {
      s.screenings = await (await fetch('/json/screening.json')).json();
      s.sallons = await (await fetch('/json/saloons.json')).json();
      let movies = await (await fetch('/json/movies.json')).json();
      for (let movie of movies) {
        movie.path = kebabify(movie.title)
      }
      s.movies = movies;
    })();
  }, []);


  // Return som jsx (HTML-like code with expressions inside arrow brackets)
  return <BrowserRouter>
    <ScrollToTop>
      <Navbar />
      <main>
        <Routes>
          {s.menu.map(({ path, Component }) => <Route path={path} element={<Component />} />)}
        </Routes>
      </main>
      <Footer />
    </ScrollToTop>
  </BrowserRouter>;
}