import { useStates } from "../utilities/states";
import { useEffect } from "react";
import { calculatingTime } from "../utilities/length-calculating";
export default function Listing() {
  const user = useStates("user");
  const { movies, screenings } = useStates("main");
  let bookedArray = [];
  let placesArray = [];
  let userData =
    user.users.users != undefined
      ? user.users.users.find((userCheck) => userCheck.id === user.id)
      : null;
  if (userData) {
    userData.bookings.map((booked) =>
      bookedArray.push(screenings.find((screen) => screen.id === booked.id))
    );
    bookedArray.sort((a, b) => b.Datum - a.Datum);
    // for (const [key, value] of Object.entries(bookedArray.bookings)) {
    //   console.log(key);
    //   //   let row = key.split(" ")[0];
    //   //   let chair = key.split(" ")[1];
    //   //   placesArray.push({ row: row, chair: chair });
    //   //   placesArray.sort();
    // }
  }

  useEffect(() => {
    document.body.classList.add("listings");
    return () => document.body.classList.remove("listings");
  }, []);

  const getPrice = (i) => userData.bookings[i].price + "kr";
  const getPlaces = (d, t) => {
    let seets_booked = userData.bookings.find((s) => {
      return s.date == d && s.time == t;
    });
    // seets_booked.chairs.map((s) => console.log(s.row));

    return seets_booked.chairs;
    // userData.bookings[i].price + "kr";
  };

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
            <p>Platser:</p>
            {getPlaces(p.date, p.time).map((place) => (
              <p>
                Rad:{place.row} Stolrad: {place.chair}
              </p>
            ))}
          </ul>
        ))}
      </div>
    )
  );
}
