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
            
            <div className="finished">
                <div>
                    <h2>Tack för din bokning till:</h2>
                    <h2>{l.movie.title}!</h2>
                <h3>Viktig information</h3>
                <h4>{l.movie.title}</h4>
                <p>{l.screning.auditorium}</p>
                <p>{l.screning.date}</p>
                <p>{l.screning.time}</p>
                <p>{of.totalPris }kr</p>
                <ul>
                    <li>Barn biljetter: {of.numberOfChildren} st</li>
                    <li>Vuxen biljetter: { of.numberOfAdults } st</li>
                    <li>pensionär biljetter: { of.numberOfSeniors } st</li>
                </ul>
                <p>Total antal platser/biljetter: {of.calculateAll()}</p>

                <h3>Boknings information</h3>
                <p>Glöm inte att ta med bokningsnummret till biografen: <b>{of.confirmationNumber}</b> <button type="button" onClick={() => copyContent(of.confirmationNumber)}>Kopiera bokningsnummret</button></p>           
                </div>
                <div><img src={"../" + l.movie.images} alt="" /></div>
            </div>        
    </div > : null }</>
}
