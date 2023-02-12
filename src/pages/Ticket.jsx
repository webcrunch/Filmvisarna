import { useStates } from '../utilities/states';
import { useParams,Link } from 'react-router-dom';
import { calculatingTime } from '../utilities/length-calculating';


export default function TicketPage() { 
     const { moviePath } = useParams();
    
        const s = useStates('main');
    const movie = s.movies.find(movie => movie.title == moviePath);
    
    
return <>
        
       {/*  {
            movie != undefined ? <div className="detailedPageContainer">
                            <h1  className="detailedTitle">Boka platser för filmen: {movie.title}</h1>
            </div>: null    
    } */}
    <div className="ticket-container" id="ticket-pricing">
        <div className="ticket-option1">
            <h3 className="vuxen-title">Vuxen</h3>
            <p className="price-tag-name">Pris: 120Kr</p>
            <button className="add-ticket">+</button>
            <input className="quantity" type="text" value="0" disabled></input>
            <button className="remove-ticket">-</button>
        </div>
        <div className="ticket-option2">
            <h3 className="vuxen-title">Barn</h3>
            <p className="price-tag-name">Pris: 40Kr</p>
            <button className="add-ticket">+</button>
            <input className="quantity" type="text" value="0" disabled></input>
            <button className="remove-ticket">-</button>
        </div>
        <div className="ticket-option3">
            <h3 className="vuxen-title">Pensionär</h3>
            <p className="price-tag-name">Pris: 80Kr</p>
            <button className="add-ticket">+</button>
            <input className="quantity" type="text" value="0" disabled></input>
            <button className="remove-ticket">-</button>
        </div>
        <p className="total-price-css" id="total-price">Total Pris: 0Kr</p>
    </div>

</>
}
