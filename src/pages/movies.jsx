export default function Movies() {
    return <h1> An movies page that will handle things.</h1>
}

let s = useStates('main');


return <div className="movieList">

    <h1>Movie List</h1>
    {/*</>p>filter</p> */}
    {s.movies.map(movie => <>
        <div className="imagelistdiv">
            {/* <hr className="movieshr"></hr> */}
            <img className="imagesmovies" src={"../" + movie.images} alt={"Poster av filmen " + movie.title} />
            <div className="tidochsalong">
                <h2 className="movietitlefilmer">{movie.title}</h2>
                <h3 className="tidochsalongtitle">17:30, Salong 1</h3>
            </div>
            <button className="moviebtnsitplatser" type="submit" value="Submit">Välj sittplatser</button>
        </div>
    </>)}
</div >

    

}
