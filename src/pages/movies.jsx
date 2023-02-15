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
        possibleSorts: ['Ingen sortering', 'Sortering efter namn (↓ A-Ö)', 'Sortering efter namn (↑ Ö-A)', 'Sortering efter längd (↓ A-Ö)', 'Sortering efter längd (↑ Ö-A)'],
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
        if (l.chosenSort === l.sortDone) { return; }
        // sort according to choice
        console.log(l.chosenSort)
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

    function filterCategories(genre) {
        l.screenings = genre.includes("Alla") ? s.screenings : s.screenings.filter(movie => getMovies(movie.film, 'genre').includes(genre));
    }

    function filterMovies(film) {
        l.screenings = film.includes("Alla") ? s.screenings : s.screenings.filter(movie => movie.film === film);
    }

    function filterSaloons(auditorium) {
        l.screenings = auditorium.includes("Båda") ? s.screenings : s.screenings.filter(movie => movie.auditorium === auditorium);
    }

    return <div className="movieList">
        {
            s.movies[0] !== undefined ?
                <>
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
                    <select name="selectListCategory" onChange={e => filterCategories(e.target.value)} id="selectListCategory">
                        {
                            l.categories.map(cat => <option>{cat}</option>)
                        }
                    </select>
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
                            <Link to={"/movie/" + display.film}><img className="imagesmovies" src={"../" + getMovies(display.film, 'images')} alt={"Poster av filmen " + display.film} /></Link>
                            <div className="tidochsalong">
                                <h2 className="movietitlefilmer">{display.film}</h2>
                                <h4 className="tidochsalongtitle">Sal: {display.auditorium}. Dag: {display.date} </h4>
                                <h4 className="tidochsalongtitle">Tid: {display.time}. Längd: {calculatingTime(getMovies(display.film, 'length'))}</h4>
                            </div>
                            <Link to={"/ticket/" + display.film} state={{ from: "occupation" }}><button className="moviebtnsitplatser">Välj sittplatser</button></Link>
                        </div>
                    </>)}
                </> : null
        }
    </div>
}
