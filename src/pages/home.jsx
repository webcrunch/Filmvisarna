import { useStates } from "../utilities/states"
import { Link } from 'react-router-dom';
import { useEffect } from "react";
export default function Home() {
    
  let { movies } = useStates('main');

  useEffect(() => {

    // add the class ticketPage to the body element
    // when the page shows / the component mounts
    document.body.classList.add("homePage");
    // remove the class ticketPage when the page
    // unmounts..
    return () => document.body.classList.remove("homePage");
  }, []);

  return <div className="home-page-container">

    <h1 className='flexp'>Aktuella filmer på bio</h1>
      <div className="flex-container">
          {movies.map(movie =>
            <>
              <div className="topcontainerimagediv">
                <div className="topcontainerimagedivv">

                <Link to={"/movie/" + movie.path}> <img className="topcontainerimages" src={"Filmvisarna/" + movie.images}
                  ></img></Link><p>{movie.title}</p>
                </div>      
            </div>
            </>
          )}
    </div>

    <div className="under-home-container">   
    <div className='undertopcontainer>'>
        <p className='undertext'>
            Förutom våra vanliga filmvisningar har vi också en fullt licensierad bar och försäljningsstånd
            där du kan njuta av en dryck eller en måltid före, under eller efter filmen. 
        </p>
        <h3 className="snack-click">
            Klicka på någon utav bilderna för att ta dig vidare
        </h3>
    </div>

    <div className="snack-container">
        <a className="snacklink" href="about">
            <img className="snackimage1" src="/images/cinemasnack1.png"></img>
       </a>
        <a className="snacklink" href="about">
            <img className="snackimage2" src="/images/cinemasnack2.png"></img>
       </a>
    </div>
    </div>  

  </div>
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