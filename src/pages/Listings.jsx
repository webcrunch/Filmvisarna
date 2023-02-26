import { useStates } from "../utilities/states";
import { useEffect } from "react";
import { calculatingTime } from "../utilities/length-calculating";
import { get, post, del } from '../utilities/backend-talk';

export default function Listing() {
    const user = useStates('user');
    const { movies, screenings } = useStates('main');
    let bookedArray = [];


    async function getData(user) {
        let userWithBookings = await get('/api/user/' + user.id);
        userWithBookings.bookings.map(book => {
            let screening = screenings.find(screen => screen.id === book.id)
            bookedArray.push([screening, book]);
            
            
        });
        bookedArray.sort((a, b) => b.Datum - a.Datum)
    }

    useEffect(() => {
        getData(user); 
            // userData.bookings.map(booked => bookedArray.push(screenings.find(screen => screen.id === booked.id)));
        // bookedArray.sort((a, b) => b.Datum - a.Datum)
        
        document.body.classList.add("listings");
            return () => document.body.classList.remove("listings");
  }, []);

    
    function getMovies(name, properies) {
        let movie = movies.find(movie => movie.title == name);
        return movie != undefined ? movie[properies] : null;
     }
          

    return user.loggedin && (
        <div className="listings">
            {
                bookedArray.map(p => <ul>
                    <li>Film: {p.film}</li>
                    <li>Längd:{" "} { calculatingTime(getMovies(p.film, 'length'))}</li>
                    <li>Datum: {p.date}</li>
                    <li>Sal: {p.auditorium}</li>
                    <li>Tid: {p.time}</li>
                    <li>Pris: {p.price}</li>
                </ul>)
            }
            </div>
    )
    
}