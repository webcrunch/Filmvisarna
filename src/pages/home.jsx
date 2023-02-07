import { useStates } from "../utilities/states"
import { Link } from 'react-router-dom';
export default function Home() {
    
        let {movies} = useStates('main');

  return <>

    <h1 className='flexp'>Aktuella filmer på bio</h1>
      <div className="flex-container">
          {movies.map(movie =>
            <>
              <div className="topcontainerimagediv">
                <div className="topcontainerimagedivv">
                <a href="#"><img className="topcontainerimages" src={movie.images}
                  ></img></a><p>{movie.title}</p>
                </div>      
            </div>
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
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }
}