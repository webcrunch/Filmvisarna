import { useStates } from "../utilities/states";
import copyContent from '../utilities/copyFunction';
import { calculatingTime } from '../utilities/length-calculating';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import generate from "../utilities/random-order-confirmation"
export default function Booked() {
    const { movies } = useStates('main');
    let { bookingInfo } = useParams();
    let movie = null;
    let placesArray = [];
    bookingInfo = JSON.parse(decodeURIComponent(bookingInfo));
    for (const [key, value] of Object.entries(bookingInfo.markedChairs)) {
        let row = key.split(" ")[0];
        let chair = key.split(" ")[1];
        placesArray.push({ row: row, chair: chair })
        placesArray.sort();
    }

    useEffect(() => {
        movie = movies.find(movie => movie.path === bookingInfo.movie);
        document.body.classList.add("bookingPage");
        return () => document.body.classList.remove("bookingPage");
    }, []);
    let confirmationNumber = generate();
    return bookingInfo && (
        <div className="confirmation-container">
            < div className="doneA" >
                <div className="information">
                    <h2>Tack för din bokning:</h2>
                    <h2>Viktig information:</h2>
                    <h3>{bookingInfo.title}</h3>
                    <p>{bookingInfo.screeningsData.auditorium}</p>
                    <p>{bookingInfo.screeningsData.date}</p>
                    <p>{bookingInfo.screeningsData.time}</p>
                    <p>{bookingInfo.totalPrice}kr</p>
                    <ul>
                        <li>Biljetter:</li>
                        <li>Barn: {bookingInfo.numberofChildren} st</li>
                        <li>Vuxen: {bookingInfo.numberofAdults} st</li>
                        <li>Pensionär: {bookingInfo.numberofSenior} st</li>
                    </ul>
                    <p>Total antal platser/biljetter: {bookingInfo.totalSeats} st</p>
                    <p>Platser:</p>
                    {
                        placesArray.map(place => <p>Rad:{place.row} Stolrad: {place.chair}</p>)
                    }
                    <h3>Bokningsinformation:</h3>
                    <p>Glöm inte att ta med bokningsnummret till biografen: <b>{confirmationNumber}</b> <button type="button" onClick={() => copyContent(confirmationNumber)}>Kopiera bokningsnummret</button></p>
                </div>
                <img src="/images/bookingpage.jpg" alt="Here will be a image" />
            </div >
        </div >
    )




}

