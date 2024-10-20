import { useStates } from "../utilities/states";
import copyContent from '../utilities/copyFunction';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { get, post, del } from '../utilities/backend-talk';

export default function Booked() {
    const user = useStates('user');
    const l = useStates('main');
    let { bookingInfo } = useParams();
    const [data, setData] = useState(null);
    let save = useStates({
        bookedArray: [],
        id: null
    });
    let movieName = useStates({
        movieTitle: null
    });
    let placesArray = [];

    const handleChairsToSave = async () => {
        for (let i = 0; i < data.screeningsData.occupiedSeats.length; i++) {
            save.bookedArray.push([...data.markedChairsArray[i], ...data.screeningsData.occupiedSeats[i]].sort());
        }

        let bookingbj = {
            id: user.id,
            booking: {
                id: data.screeningsData.id,
                price: data.totalPrice,
                code: data.confnr
            }
        };

        let result = await post('/api/book', save);
        if (JSON.stringify(l.screenings) === JSON.stringify(result.data)) {
            return;
        }

        if (user.loggedin) {
            await post('/api/userbooking', bookingbj);
        }

        l.screenings = result.data;
        l.bookings = await get('/api/bookings_informations');
    };

    useEffect(() => {
        if (data && !save.id) {
            save.id = data.screeningsData.id;
            handleChairsToSave();
            const movie = l.movies.find(movie => movie.path === data.movie);
            if (movie) {
                movieName.movieTitle = movie.title;
            }
        }
    }, [data, save, l.movies, movieName]);

    useEffect(() => {
        (async () => {
            const response = await get(`/api/bookings_information/${bookingInfo}`);
            setData(response);
        })();

        document.body.classList.add("bookingPage");
        return () => document.body.classList.remove("bookingPage");
    }, [bookingInfo]);

    if (data !== null) {
        for (const [key, value] of Object.entries(data.markedChairs)) {
            let row = key.split(" ")[0];
            let chair = key.split(" ")[1];
            placesArray.push({ row: row, chair: chair });
        }
        placesArray.sort();
    }

    return data && (
        <div className="confirmation-container">
            <div className="doneA">
                <div className="information">
                    <h2>Tack för din bokning:</h2>
                    <h2>Viktig information:</h2>
                    <h3>Film: {movieName.movieTitle}</h3>
                    <p>Sal: {data.screeningsData.auditorium}</p>
                    <p>Datum: {data.screeningsData.date}</p>
                    <p>Tid: {data.screeningsData.time}</p>
                    <p>Pris: {data.totalPrice}kr</p>
                    <ul>
                        <li>Biljetter:</li>
                        <li>Barn: {data.numberofChildren} st</li>
                        <li>Vuxen: {data.numberofAdults} st</li>
                        <li>Pensionär: {data.numberofSenior} st</li>
                    </ul>
                    <p>Total antal platser/biljetter: {data.totalSeats} st</p>
                    <p>Platser:</p>
                    {placesArray.map(place => <p>Rad: {place.row} Stolrad: {place.chair}</p>)}
                    <h3>Bokningsinformation:</h3>
                    <p>Glöm inte att ta med bokningsnummret till biografen: <b>{data.confnr}</b> <button type="button" onClick={() => copyContent(data.confnr)}>Kopiera bokningsnummret</button></p>
                </div>
                <img src="/images/bookingpage.jpg" alt="Here will be a image" />
            </div>
        </div>
    );
}
