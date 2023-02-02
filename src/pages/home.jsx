import { useStates } from "../utilities/states"
export default function Home() {
    
        let {movies} = useStates('main');

  return <>


      <div className="flex-container">
          {movies.map(movie =>
              <>
                  <div><a href="#"><img className="topcontainerimages" src={movie.images}
        width="100px"></img></a><p>{movie.title}</p></div>      
              </>
          )}
    </div>


    <div className="hottestrelease">
      <p>Hetaste just nu</p>
      <img className="hottestreleasemovie" src="/images/avatarbig.jpg"></img>
    </div>






  </>
}