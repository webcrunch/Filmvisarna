import { useStates } from "../utilities/states";
import { useEffect } from "react";
import { calculatingTime } from "../utilities/length-calculating";
export default function Listing() {
  const user = useStates("user");
  const { movies, screenings } = useStates("main");
  let bookedArray = [];

  let userData =
    user.users.users != undefined
      ? user.users.users.find((userCheck) => userCheck.id === user.id)
      : null;

  if (userData) {
    userData.bookings.map((booked) =>
      bookedArray.push(screenings.find((screen) => screen.id === booked.id))
    );
    bookedArray.sort((a, b) => b.Datum - a.Datum);
  }
  useEffect(() => {
    document.body.classList.add("listings");
    return () => document.body.classList.remove("listings");
  }, []);

  const getPrice = (i) => userData.bookings[i].price + "kr";
  const getCode = (i) =>
    userData.bookings[i].code ||
    "Där finns ingen kod, Ta med all information till bokningen";
  function getMovies(name, properies) {
    let movie = movies.find((movie) => movie.title == name);
    return movie != undefined ? movie[properies] : null;
  }

  return (
    userData &&
    user.loggedin && (
      <div className="listings">
        {bookedArray.map((p, i) => (
          <ul>
            <li>Film: {p.film}</li>
            <li>Längd: {calculatingTime(getMovies(p.film, "length"))}</li>
            <li>Datum: {p.date}</li>
            <li>Sal: {p.auditorium}</li>
            <li>Tid: {p.time}</li>
            <li>Pris: {getPrice(i)}</li>
            <li>Kod: {getCode(i)}</li>
          </ul>
        ))}
      </div>
    )
  );
}
