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

export default function App() {

  function ScrollToTop({ children }) {
    let location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    return children;
  }

  let a = useStates('user', {
    loggedin: false,
    name: null,
    id: null,
    users: []
  });

  let s = useStates('main', {
    movies: [],
    menu: [
      { label: 'HEM', path: '/', Component: Home },
      { label: 'FILMER', path: '/movies', Component: Movies },
      { label: 'OM OSS ', path: '/about', Component: About },
      { label: 'KONTAKT', path: '/contact', Component: Contact },
      { path: '/movie/:moviePath', Component: DetailedInfo },
      { path: '/auth', Component: RegisterPage },
      { path: '/authentication', Component: LoginPage },
      { path: '/ticket/:screeningInfo', Component: TicketPage },
      { path: '/done/:bookingInfo', Component: Booked },
      { path: '/yourlist', Component: Listing }
    ],
    screenings: [],
    saloons: [],
    bookings: []
  });

  useEffect(() => {
    (async () => {
      s.screenings = await (await fetch('https://filmvisarna.vercel.app/screenings')).json();
      s.saloons = await (await fetch('https://filmvisarna.vercel.app/saloons')).json();
      a.users = await (await fetch('https://filmvisarna.vercel.app/users')).json();
      s.bookings = await (await fetch('https://filmvisarna.vercel.app/bookings_informations')).json();
      let movies = await (await fetch('https://filmvisarna.vercel.app/movies')).json();
      for (let movie of movies) {
        movie.path = kebabify(movie.title);
      }
      s.movies = movies;
    })();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Navbar />
        <main>
          <Routes>
            {s.menu.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </main>
        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  );
}