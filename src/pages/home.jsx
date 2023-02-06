import { useStates } from "../utilities/states"
import { Link } from 'react-router-dom';
export default function Home() {
    
        let {movies} = useStates('main');

  return <>

    <h1 className='flexp'>Aktuella filmer på bio</h1>
      <div className="flex-container">
          {movies.map(movie =>
              <>
                  <div> <Link to={"/movie/" + movie.title}><img className="topcontainerimages" src={movie.images}
        width="100px"></img></Link><p>{movie.title}</p></div>      
              </>
          )}
    </div>

<div className='flexppp>'>
<h1 className='flexp'>Hetaste just nu</h1><p className='felxpp'>Avatar: The Way of water</p>
</div>
   
    
    <div className="hottestrelease">
      <img className="hottestreleasemovie" src="/images/avatarbig2.jpg"></img>
    </div>






  </>
}