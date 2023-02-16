import { useStates } from "../utilities/states";
import { useEffect } from "react";
import { calculatingTime } from "../utilities/length-calculating";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function Movies() {
    let s = useStates('main');

    const l = useStates({
    startDate: '',
    chosenCategory: 'Choose a category',
    possibleSorts: ['Ingen sortering','Sortering efter namn (↓ A-Ö)','Sortering efter namn (↑ Ö-A)', 'Sortering efter längd (↓ A-Ö)', 'Sortering efter längd (↑ Ö-A)'], 
    chosenSort: '',
    sortDone: '',
    // note: copying the movies array from main
    // - slice() copies an array
    // this means when we sort the copy in the local state
    // of this compoenent, and this does not
    // trigger a re-mount of the component
    // (which we otherwise would happen if changing
    // a higer level state variable),
    movies: s.movies.slice(),
    categories: [],
    screenings: s.screenings.slice()
    });

    const filterVars = useStates({
        movie: 'null',
        category: 'null',
        auditorium: 'null',
        date: l.startDate
    });
    

    function createCategories() {
        let categories = ['Alla Kategorier'];
        for (let movie of l.movies) {
            categories = [...categories, ...movie.genre.split(",")];
        }
        l.categories = [...new Set(categories)];
    }

    useEffect(() => {
        createCategories();
    }, []);
        
    useEffect(() => { // Runs when l.chosenSort changes
    // to avoid endless loop
        if (l.chosenSort === l.sortDone) {return; }
    // sort according to choice
        if (l.chosenSort === 'Ingen sortering') { l.screenings = s.screenings; }
        if (l.chosenSort === 'Sortering efter namn (↓ A-Ö)') { sortByName(0); }
        if (l.chosenSort === 'Sortering efter namn (↑ Ö-A)') { sortByName(1); }
        if (l.chosenSort === 'Sortering efter längd (↓ A-Ö)') { sortByLength(0); }
        if (l.chosenSort === 'Sortering efter längd (↑ Ö-A)') { sortByLength(1); }
    l.sortDone = l.chosenSort;
  }, [l.chosenSort]);

    function sortByLength(order) {
          l.screenings.sort((a, b) => {
              return order > 0 ?
                  getMovies(a.film, 'length') < getMovies(b.film, 'images') ? 1 : -1 :
                  getMovies(a.film, 'images') > getMovies(b.film, 'images') ? 1 : -1; 
    });
  }

    function sortByName(order) {
     l.screenings.sort((a, b) => {
      // compare case-insensitive 
      // + omit beginning 'The' in comparison and omit spaces
      return order ? a.film.toLowerCase().replace(/ /g, '').replace(/^the/, '')
          < b.film.toLowerCase().replace(/ /g, '').replace(/^the/, '') ? 1 : -1 : 
        a.film.toLowerCase().replace(/ /g, '').replace(/^the/, '')
        > b.film.toLowerCase().replace(/ /g, '').replace(/^the/, '') ? 1 : -1;
    });
  }
  
       function getMovies(name, property) {
         return s.movies.find(movie => movie.title === name)[property];
        
    }


    
    const filterByCategory = screening => filterVars.category === 'null' || getMovies(screening.film, 'genre').split(',').includes(filterVars.category);
    const filterByMovie = screening => filterVars.movie === 'null' || screening.film === filterVars.movie;
    const filterByAuditorium = screening => filterVars.auditorium === 'null' || screening.auditorium === filterVars.auditorium;
    const filterByDate = screening => filterVars.date === '' || screening.date === filterVars.date;
    const filterByAll = s => filterByCategory(s) && filterByMovie(s) && filterByAuditorium(s) && filterByDate(s);


    const clearDate = () => filterVars.date = '';

          {l.screenings.filter(filterByAll).map((display) => (
            <>
              <div className="imagelistdiv">
                {/* <hr className="movieshr"></hr> */}
                <Link to={"/movie/" + display.film}>
                  <img
                    className="imagesmovies"
                    src={"../" + getMovies(display.film, "images")}
                    alt={"Poster av filmen " + display.film}
                  />
                </Link>
                <div className="tidochsalong">
                  <h2 className="movietitlefilmer">{display.film}</h2>
                  <h4 className="tidochsalongtitle">
                    Sal: {display.auditorium}. Dag: {display.date}{" "}
                  </h4>
                  <h4 className="tidochsalongtitle">
                    Tid: {display.time}. Längd:{" "}
                    {calculatingTime(getMovies(display.film, "length"))}
                  </h4>
                </div>
                <Link
                  to={"/ticket/" + display.film}
                  state={{ from: "occupation" }}
                >
                  <button className="moviebtnsitplatser">
                    Välj sittplatser
                  </button>
                </Link>
              </div>

              <div className="card">
                <Link to={"/movie/" + getMovies(display.film, "path")}>
                  <img
                    src={"../" + getMovies(display.film, "images")}
                    alt={"Poster av filmen " + display.film}
                  />
                </Link>
                <div className="container">
                  <h2 className="movietitlefilmer">{display.film}</h2>
                  <div className="tidochsalong ">
                    <h4 className="tidochsalongtitle">
                      Sal: {display.auditorium} <br /> Längd:{" "}
                      {calculatingTime(getMovies(display.film, "length"))}
                    </h4>
                    <h4 className="tidochsalongtitle">
                      {" "}
                      Dag: {display.date} <br />
                      Tid: {display.time}
                    </h4>
                  </div>
                  <h4 className="tidochsalongtitle">
                    Genre: {getMovies(display.film, "genre")}
                  </h4>
                  <Link
                    to={"/ticket/" + getMovies(display.film, "path")}
                    state={{ from: "occupation" }}
                  >
                    <button className="moviebtnsitplatser_small tidochsalongtitle">
                      Välj sittplatser
                    </button>
                  </Link>
                </div>
              </div>
            </>
          ))}
        </>
      ) : null}
    </div>
  );
}
