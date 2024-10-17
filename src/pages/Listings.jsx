import { useStates } from "../utilities/states";
import { useEffect } from "react";
import { calculatingTime } from "../utilities/length-calculating";
export default function Listing() {
    const user = useStates('user');
    const { movies, bookings } = useStates('main');
    let bookedArray = [];
    let placesArray = [];
    let userData = user.users.users != undefined ? user.users.users.find(userCheck => userCheck.id === user.id) : null;
    if (userData) {
        userData.bookings.map(booked => bookedArray.push(bookings.find(book => book.id === booked.code)));
        console.log(bookedArray);
        bookedArray.sort((a, b) => b.Datum - a.Datum)
        // chairHandling
        
    }

    useEffect(() => {
        document.body.classList.add("listings");
        return () => document.body.classList.remove("listings");
    }, []);

    const getPrice = i => userData.bookings[i].price + "kr";

    const chairHandling = chairs => {
        placesArray.length > 0 ? placesArray = []: null;
        for (const [key, value] of Object.entries(chairs)) {
            let row = key.split(" ")[0];
            let chair = key.split(" ")[1];
            placesArray.push({ row: row, chair: chair })
            placesArray.sort();
        }
    }
    
    function getMovies(name, properies) {
        let movie = movies.find(movie => movie.title == name);
        return movie != undefined ? movie[properies] : null;
     }
          

    return userData && user.loggedin && (
        <div className="listings">
            {
                bookedArray.map( p => <ul>
                    <li>Bokningskod: {p.id}</li>
                    <li>Film: {p.screeningsData.film}</li>
                    <li>Längd:{" "} { calculatingTime(getMovies(p.screeningsData.film, 'length'))}</li>
                    <li>Datum: {p.screeningsData.date}</li>
                    <li>Tid: {p.screeningsData.time}</li>
                    <li>Sal: {p.auditorium}</li>
                    <li>Pris: {p.totalPrice} Kr</li> 
                    <li>Antal stolar: {p.totalSeats}</li>
                    {
                        p.numberofAdults > 0 ? <li>Antal Vuxna: {p.numberofAdults} </li>: null    
                    } 
                    {
                       p.numberofSenior > 0 ? <li>Antal Pensionärer: {p.numberofSenior} </li>: null
                    } 
                    {
                       p.priceChildren > 0 ? <li>Antal Barn: {p.numberofChildren} </li>: null
                    } 
                    {chairHandling(p.markedChairs)}
                    <li>Platser:</li>
                    <ul>
                    {
                        placesArray.map(place => <li>Rad:{place.row} Stolrad: {place.chair}</li>)
                    }
                    </ul>
                    <br />
                </ul>)
            }
            </div>
    )
    
}