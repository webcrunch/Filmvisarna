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

                <Link to={"/movie/" + movie.title}> <img className="topcontainerimages" src={movie.images}
                  ></img></Link><p>{movie.title}</p>
                </div>      
            </div>
            </>
          )}
    </div>

<div className='undertopcontainer>'>
<p className='undertext'>Förutom våra vanliga filmvisningar har vi också en fullt licensierad bar och försäljningsstånd
 där du kan njuta av en dryck eller en måltid före eller efter filmen. 
Vi har också en rymlig lobby och gott om parkeringsplatser, vilket gör det enkelt att komma till vårt bio.

Oavsett om du är en filmentusiast eller bara letar efter en rolig kväll ute, så har vi något för alla. </p>
</div>


    <div className="snack-container">
    <img className="snackimage1" src="/images/cinemasnack1.png"></img>
      <img className="snackimage2" src="/images/cinemasnack2.png"></img>
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