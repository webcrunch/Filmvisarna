import { useStates } from "../utilities/states";
import copyContent from '../utilities/copyFunction';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { get, post, del } from '../utilities/backend-talk';

export default function Booked() {
    const user = useStates('user');
    const l = useStates('main');
    let { bookingInfo } = useParams();
    bookingInfo = JSON.parse(decodeURIComponent(bookingInfo));
    let save = useStates({
        bookedArray:[],
        id: null
    });
    let movie = null;
    let placesArray = [];
    
    let screening = null;
    for (const [key, value] of Object.entries(bookingInfo.markedChairs)) {
        let row = key.split(" ")[0];
        let chair = key.split(" ")[1];
        placesArray.push({ row: row, chair: chair })
        placesArray.sort();
    }


    const handleChairsToSave = async () => {
        
        for (let i = 0; i < bookingInfo.screeningsData.occupiedSeats.length; i++){
            save.bookedArray.push([...bookingInfo.markedChairsArray[i], ...bookingInfo.screeningsData.occupiedSeats[i]].sort());
        }
        let bookingbj = {
            id: user.id,
            booking: {
                id: bookingInfo.screeningsData.id,
                price: bookingInfo.totalPrice,
                code: bookingInfo.confnr
                // numberofChildren: bookingInfo.numberofChildren,
                // numberOfAdults: bookingInfo.numberofAdults,
                // numberOfSenior: bookingInfo.numberofSenior,
                // totalPrice: bookingInfo.totalPrice,
                // totalSeats: bookingInfo.totalSeats,
                // chairs: bookingInfo.markedChairs
            }
        }
        if (user.loggedin) {
            let resp = await post('/api/userbooking', bookingbj);
        } 
        let result = await post('/api/book', save);
        if (JSON.stringify(l.screenings) === JSON.stringify(result.data)) {
            return;
        }
        l.screenings = result.data;
        // how to add it to the useastates??
    }
    useEffect(() => {
        save.id = bookingInfo.screeningsData.id;
        handleChairsToSave();
        movie = l.movies.find(movie => movie.path === bookingInfo.movie);
        document.body.classList.add("bookingPage");
        return () => document.body.classList.remove("bookingPage");
    }, []);
    
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
                    <p>Glöm inte att ta med bokningsnummret till biografen: <b>{bookingInfo.confnr}</b> <button type="button" onClick={() => copyContent(bookingInfo.confnr)}>Kopiera bokningsnummret</button></p>
                </div>
                <img src="/images/bookingpage.jpg" alt="Here will be a image" />
            </div >
        </div >
    )




}

