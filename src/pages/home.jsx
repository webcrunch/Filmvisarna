import { useStates } from "../utilities/states"
export default function Home() {
    
        let {movies} = useStates('main');

  return <>

    <h1 className='flexp'>Aktuella filmer på bio</h1>
      <div className="flex-container">
          {movies.map(movie =>
              <>
                  <div><a href="#"><img className="topcontainerimages" src={movie.images}
        width="100px"></img></a><p>{movie.title}</p></div>      
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