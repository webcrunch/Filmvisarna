import { useStates } from './utilities/states.js';
import { useEffect } from 'react';
import { kebabify } from './utilities/kebabify';
import movieData from '../public/json/movies.json'
import bookings from "../public/json/bookings.json"
import users from "../public/json/users.json"

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Movies from './pages/Movies.jsx';
import Booked from './pages/BookingConfirmation.jsx';
import DetailedInfo from './pages/DetailedInfo.jsx';
import TicketPage from './pages/Ticket.jsx';
import RegisterPage from './pages/register.jsx';
import LoginPage from './pages/login.jsx';
import Listing from './pages/Listings.jsx';
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


  let a = useStates('user', {
    loggedin: false,
    name: null,
    id: null,
    users: []
  })

  let s = useStates('main', {
    movies: [],
    menu: [
      { label: 'HEM', path: '/', Component: Home },
      { label: 'FILMER', path: '/movies', Component: Movies },
      { label: 'OM OSS ', path: '/about', Component: About }, //, Component:
      { label: 'KONTAKT', path: '/contact', Component: Contact },
/*       { label: 'LOGIN', path: '/authentication', Component: LoginPage  },
      { label: 'REGISTER', path: '/auth', Component: RegisterPage }, */
      { path: '/movie/:moviePath', Component: DetailedInfo },
      { path: '/auth', Component: RegisterPage },
      { path: '/authentication', Component: LoginPage },
      { path: '/ticket/:screeningInfo', Component: TicketPage },
      { path: '/done/:bookingInfo', Component: Booked },
      { path: '/yourlist', Component: Listing}
    ],
    screenings: [],
    saloons: [],
    bokings: []
  });

  /* Runs when the component App loads */
  useEffect(() => {
    // Load animal data from /json/niceAnimals.json
    (async () => {
      s.screenings = await (await fetch('/api/screenings')).json();
      s.saloons = await (await fetch('/api/saloons')).json();
      a.users = users//users//await (await fetch('/api/users')).json();
      s.bookings = bookings//await (await fetch('/api/bookings_informations')).json();
      let movies = movieData //await (await fetch('/api/movies')).json();
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
