import { useStates } from "../utilities/states";
import copyContent from '../utilities/copyFunction';
import { calculatingTime } from '../utilities/length-calculating';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
        confirmationNumber: "1213344554",
        calculateAll() {
            return this.numberOfAdults + this.numberOfChildren + this.numberOfSeniors
        }
    }

    return <>{ l.movie && l.screning ? 
        < div className = "doneA" >

        <div className="container">
            <div className="image">
                <img src="/images/bookingpage.jpg" alt="En bild över popcorn och andra roliga saker" />
            </div>
        </div>


        <h2>Thank you for your order!</h2>

        <h3>Information</h3>
        <h4>Film: {l.movie.title}</h4>
        <p>Salong: {l.screning.auditorium}</p>
        <p>Datum: {l.screning.date}</p>
        <p>Tid: {l.screning.time}</p>
    {/* <p>Email:<br />{of.email}</p> */ }
        <p>telefonnummer:<br />{of.phoneNumber}</p>
        <p>Antal barn biljetter:<br />{of.numberOfChildren}</p>
        <p>Antal vuxen biljetter:<br />{of.numberOfAdults}</p>
        <p>Antal pensionär biljetter:<br />{of.numberOfSeniors}</p>
        <p>Total antal biljetter: {of.calculateAll()}</p>
        <p>Pris: {of.totalPris }kr</p>
        <h3>Boknings information</h3>
        <p>Glöm inte att ta med bokningsnummret till biografen:</p>
        <p>{of.confirmationNumber}</p>
        <button type="button" onClick={()=> copyContent(of.confirmationNumber)}>Kopiera bokningsnummret</button>
    </div > : null }</>
}
