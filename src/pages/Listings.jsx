import { useStates } from "../utilities/states";
import { useEffect } from "react";
import { calculatingTime } from "../utilities/length-calculating";
export default function Listing() {
    const user = useStates('user');
    const { movies, screenings } = useStates('main');
    let bookedArray = [];
    
    let userData = user.users.users != undefined ? user.users.users.find(userCheck => userCheck.id === user.id) : null;
    if (userData) {
        userData.bookings.map(booked => bookedArray.push(screenings.find(screen => screen.id === booked.id)));
        bookedArray.sort((a, b) => b.Datum - a.Datum)
    }

    useEffect(() => {
        document.body.classList.add("listings");
        return () => document.body.classList.remove("listings");
  }, []);

    
    function getMovies(name, properies) {
        let movie = movies.find(movie => movie.title == name);
        return movie != undefined ? movie[properies] : null;
     }
          

    return userData && user.loggedin && (
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