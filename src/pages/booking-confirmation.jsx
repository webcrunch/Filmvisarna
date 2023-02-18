import { useStates } from "../utilities/states";
import copyContent from '../utilities/copyFunction';
import { calculatingTime } from '../utilities/length-calculating';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import generate from "../utilities/random-order-confirmation"
export default function Booked() {
    const { bookingId } = useParams();
    const { movies, screenings } = useStates('main');
    const l = useStates({
        movie: null,
        screning: null
    });

    useEffect(() => {
        l.movie = movies.find(movie => movie.path === bookingId);
        l.screning = l.movie ? screenings.find(screen => screen.film === l.movie.title) : null;
    }, []);


    let of = {
        phoneNumber: 333333,
        numberOfChildren: 0,
        numberOfAdults: 4,
        numberOfSeniors: 2,
        totalPris: 140,
        confirmationNumber: generate(),
        calculateAll() {
            return this.numberOfAdults + this.numberOfChildren + this.numberOfSeniors
        }
    }

    return <>{l.movie && l.screning ?
        < div className="doneA" >
            <div className="information">
                <h2>Tack för din bokning:</h2>
                <h2>Viktig information:</h2>
                <h3>{l.movie.title}!</h3>

                <p>{l.screning.auditorium}</p>
                <p>{l.screning.date}</p>
                <p>{l.screning.time}</p>
                <p>{of.totalPris}kr</p>
                <ul>
                    <li>Barn biljetter: {of.numberOfChildren} st</li>
                    <li>Vuxen biljetter: {of.numberOfAdults} st</li>
                    <li>pensionär biljetter: {of.numberOfSeniors} st</li>
                </ul>
                <p>Total antal platser/biljetter: {of.calculateAll()} st</p>

                <h3>Boknings information:</h3>
                <p>Glöm inte att ta med bokningsnummret till biografen: <b>{of.confirmationNumber}</b> <button type="button" onClick={() => copyContent(of.confirmationNumber)}>Kopiera bokningsnummret</button></p>
            </div>
            <img src="/images/bookingpage.jpg" alt="Here will be a image" />
        </div > : null}</>
}

