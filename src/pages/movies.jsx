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
    possibleSorts: ['Sort by name (A-Z)','Sort by name (Z-A)'], //, 'Sort by length (A-Z)', 'Sort by length (Z-A)'
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
    
    function createCategories() {
        // let categories = [];
        for (let movie of l.movies) {
            l.categories = [...l.categories, ...movie.genre.split(",")];
        }
    }



    // createCategories();
    // l.movies.forEach(cat => {
    //     let checkLength = cat.genre.split(",").length;
        
    //     if (checkLength > 1) {
    //         // let divideArray = ;
    //         cat.genre.split(",").forEach(arr => !l.category.includes(arr) ? l.category = arr : null) // !l.category.includes(arr) ? l.category.push(cat.genre) : null
    //     }   
    //     else {
    //         null;
    //     //!l.category.includes(cat.genre) ? l.category.push(cat.genre) : null;    
    //     }
    // })
    
    useEffect(() => { // Runs when l.chosenSort changes
    // to avoid endless loop
        if (l.chosenSort === l.sortDone) {return; }
    // sort according to choice
        if (l.chosenSort === 'Sort by name (A-Z)') { sortByName(0); }
        if (l.chosenSort === 'Sort by name (Z-A)') { sortByName(1); }
        // if (l.chosenSort === 'Sort by length (A-Z)') { sortByLength(0); }
        // if (l.chosenSort === 'Sort by length (Z-A)') { sortByLength(1); }
    l.sortDone = l.chosenSort;
  }, [l.chosenSort]);

//     function sortByLength(order) {
//         l.movies.sort((a, b) => {
//             if (order) {
//                 console.log(a.length < b.length);
//                 return a.length < b.length ? 1 : -1;
//             } else {
//                 console.log(a.length > b.length, a.length,b.length, b.title, a.title);
//                 return a.length > b.length ? 1 : -1;
//             }
//     });
//   }

    function clearFilter() {
        l.startDate = '';
        l.screenings = l.screenings;
    }

    function handleDateChange(dayOrTime) {
        l.startDate = dayOrTime;
        l.screenings = s.screenings.filter(movie => movie.date === dayOrTime);
    }

    function sortByName(order) {
      l.screenings.sort((a, b) => {
        //   console.log(a.film.toLowerCase().replace(/ /g, '').replace(/^the/, '').charAt(0), ' ' , b.film.toLowerCase().replace(/ /g, '').replace(/^the/, '').charAt(0));
        // compare case-insensitive 
        // + omit beginning 'The' in comparison and omit spaces
        if(order){
                   return a.film.toLowerCase().replace(/ /g, '').replace(/^the/, '')
            < b.film.toLowerCase().replace(/ /g, '').replace(/^the/, '') ? 1 : -1;           
          }
        else {
        return a.film.toLowerCase().replace(/ /g, '').replace(/^the/, '')
            > b.film.toLowerCase().replace(/ /g, '').replace(/^the/, '') ? 1 : -1;    
          }
      });
    }
    
    function getMovies(name) {
        let { images,length } = s.movies.find(movie => movie.title === name);
        return [images,length];
    }

    function filterMovies(film) {
         l.screenings = film.includes("Alla") ? s.screenings : s.screenings.filter(movie => movie.film === film);
    }

    function filterSaloons(auditorium) {
        l.screenings =  auditorium.includes("Båda") ? s.screenings : s.screenings.filter(movie => movie.auditorium === auditorium);
    }   
    
    return <div className="movieList">  
        <h1>Movie List</h1>
        {/*</>p>filter</p> */}
        {/* Filter by Name */}
        <select name="selectListName" onChange={e => filterMovies(e.target.value)} id="selectListName">
            <option>Alla filmerna</option>
            {
                l.movies.map(movie => <option>{movie.title}</option>)
            }
        </select>   
        {/* Filter by Category */}
        {/* <select name="selectListCategory" onChange={e => filterMovies(e.target.value)} id="selectListCategory">
            {
                l.categories.map(cat => <option>{cat}</option>)
            }
        </select>    */}
        {/* Filter by Saloons */}
         <select name="selectList" onChange={e => filterSaloons(e.target.value)} id="selectList">
            <option>Båda Salongerna</option>
            <option >Stora Salongen</option>
            <option >Lilla Salongen</option>
        </select>          
        <div>
            <input value={l.startDate} onChange={(e) => handleDateChange(e.target.value)} type="date" />
            <button onClick={() => clearFilter()} type="button">Clear date</button>
        {/* <input onChange={(e) => handleDateChange(e.target.value)}  type="time" id="appt" name="appt"
       min="09:00" max="18:00"></input> */}
        </div>
        {/* Sort by Name/length */}
         <select {...l.bind('chosenSort')}>
          {l.possibleSorts.map(x => <option>
            {x}
          </option>)}
        </select>
        {l.screenings.map(display => <>
            <div className="imagelistdiv">
                {/* <hr className="movieshr"></hr> */}
                 <Link to={"/movie/" + display.film}><img className="imagesmovies" src={"../" + getMovies(display.film)[0]} alt={"Poster av filmen " + display.title} /></Link>
                <div className="tidochsalong">
                    <h2 className="movietitlefilmer">{display.film}</h2>
                    <h4 className="tidochsalongtitle">Sal: {display.auditorium}. Dag: {display.date} </h4>
                    <h4 className="tidochsalongtitle">Tid: {display.time}. Längd: {calculatingTime(getMovies(display.film)[1])}</h4>
                </div>
                {/* <button className="moviebtnsitplatser" type="submit" value="Submit">Välj sittplatser</button> */}
            </div>
        </>)}
    </div >
}
