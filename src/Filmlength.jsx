{/* A "loop" using the array method 'map' */}
s.movies.map
	movie => <>
		<img className='posterImg' src={movie.images[0]} alt="bild" />
		<li>
			titel: {movie.title}
		</li>
		<li>
			längd: {Math.floor(movie.length / 60)} timmar och  {movie.length % 60} minuter
		</li>
		<li>
			genre: {movie.genre}
		</li>
		{/* <video
    src="https://www.youtube.com/embed/Z9AYPxH5NTM"
     type="video/mp4"
    >   </video> */}

		<iframe width="420" height="315"
			src={s.trailes}>
		</iframe>
		{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/Z9AYPxH5NTM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
		‌</>