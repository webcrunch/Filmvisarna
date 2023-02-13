import { useStates } from '../utilities/states';
import { useParams, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { calculatingTime } from '../utilities/length-calculating';


export default function TicketPage() { 
    const { moviePath } = useParams();
      const location = useLocation()

        const s = useStates('main');
    const movie = s.movies.find(movie => movie.title == moviePath);
    
    
    return <>
        
        {
            movie != undefined ? <div className="detailedPageContainer">
                            <h1  className="detailedTitle">Boka platser för filmen: {movie.title}</h1>
            </div>: null
    }
    </>
}
