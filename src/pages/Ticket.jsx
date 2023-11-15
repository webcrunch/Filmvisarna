import { useStates } from "../utilities/states";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import generate from "../utilities/random-order-confirmation";
import { get, post,put } from '../utilities/backend-talk';

export default function TicketPage() {
  let { screeningInfo } = useParams();
  const s = useStates('main');
  const [data, setData] = useState(null)
  const [width, setWidth] = useState(0);  
  const movie = data != undefined && s.movies != undefined ? s.movies.find(movie => movie.path == data.moviePath) : null;
  const saloonData =  data != undefined ? s.saloons.find(saloon => saloon.name == data.auditorium): null;
  const screeningsData = data != undefined ? s.screenings.find(screen => screen.id === data.screen_id) : null;
  const clickerss = useStates({
    numberofChildren: 0,
    priceChildren: 65,
    numberofAdults: 0,
    priceAdults: 85,
    numberofSenior: 0,
    priceSenior: 75,
    totalPrice: 0,
    totalSeats: 0
  });

  const seats = useStates({
    markedChairs: {},
    markedChairsArray: [[], [], [], [], [], [], [], []],
    confnr:screeningInfo
  });

  if (Object.keys(seats.markedChairs).length > clickerss.totalSeats) {
    delete seats.markedChairs[Object.keys(seats.markedChairs).pop()];
  }

  useEffect(() => {
    // add the class ticketPage to the body element
    // when the page shows / the component mounts
    document.body.classList.add("ticketPage");
    (async () => {
      await get(`/api/bookings_information/${screeningInfo}`).then((response) => setData(response)) 
    })();
    // remove the class ticketPage when the page
    // unmounts..
    

    return () => document.body.classList.remove("ticketPage");
  }, []);


  const numberOfMarked = Object.keys(seats.markedChairs).length;

  const getSeats = (numberOfSeatsPerRow, index) => {
    const list = [];
    for (let i = 1; i <= numberOfSeatsPerRow; i++) {
      let check_occupied_seat = screeningsData.occupiedSeats[index] !== undefined ? screeningsData.occupiedSeats[index].find(element => element === i) : undefined;
      list.push(<div key={i} onClick={() => !check_occupied_seat && clickOnSeat([index + 1, i])} className={
        (check_occupied_seat !== undefined ? "seat-sold" : "seat")
        + (seats.markedChairs[(index + 1) + ' ' + i] ? "-marked" : "")
      } ></div>);
    }
    return list;
  }


  function clickOnSeat([row, chair]) {
    let key = row + ' ' + chair;
    if (seats.markedChairs[key]) {
      delete seats.markedChairs[key];
    }
    else if (numberOfMarked < clickerss.totalSeats) {
      seats.markedChairs[key] = true;
    }
  }

  // adding new booked seats to the right index per same schema as in screanings json
  const insertSeats = markedSeats => {
     for (const [key, value] of Object.entries(markedSeats)) {
        let row = key.split(" ")[0];
       let chair = key.split(" ")[1];
       seats.markedChairsArray[row-1].push(Number(chair))
    }
    return true;
  }

  const navigate = useNavigate();

  async function book() {
    await  insertSeats(seats.markedChairs);
    let updateobj = { ...clickerss, ...seats, screeningsData, movie: movie.path, bnr: screeningInfo.bnr };
    let updateBooking  = await post(`/api/handle_booking/${screeningInfo}`, updateobj);
    
    navigate(`/done/${screeningInfo}`);
  }


  return movie && (
    <div className="full-ticket-page">
      {
        movie != undefined ?

          <h1 className="detailedTitle">Boka platser för filmen: {movie.title}</h1>
          : null}
      <div className="ticket-container" id="ticket-pricing">
        <div className="ticket-option1">
          <h3 className="vuxen-title">Vuxen</h3>
          <p className="price-tag-name">Pris: {clickerss.priceAdults}Kr</p>
          <button
            className="add-ticket"
            onClick={() => {
              clickerss.numberofAdults++;
              clickerss.totalPrice += clickerss.priceAdults;
              clickerss.totalSeats++;
            }}
          >
            +
          </button>
          <input
            className="quantity"
            type="text"
            value={clickerss.numberofAdults}
            disabled
          ></input>

          <button
            className="remove-ticket"
            onClick={() => {
              if (clickerss.numberofAdults <= 0) {
                return;
              }
              clickerss.numberofAdults--;
              clickerss.totalPrice -= clickerss.priceAdults;
              clickerss.totalSeats--;
            }}
          >
            -
          </button>
        </div>

        <div className="ticket-option2">
          <h3 className="barn-title">Barn</h3>
          <p className="price-tag-name">Pris: {clickerss.priceChildren}Kr</p>
          <button
            className="add-ticket"
            onClick={() => {
              clickerss.numberofChildren++;
              clickerss.totalPrice += clickerss.priceChildren;
              clickerss.totalSeats++;
            }}
          >
            +
          </button>
          <input
            className="quantity"
            type="text"
            value={clickerss.numberofChildren}
            disabled
          ></input>
          <button
            className="remove-ticket"
            onClick={() => {
              if (clickerss.numberofChildren <= 0) {
                return;
              }
              clickerss.numberofChildren--;
              clickerss.totalPrice -= clickerss.priceChildren;
              clickerss.totalSeats--;
            }}
          >
            -
          </button>
        </div>


        <div className="ticket-option3">
          <h3 className="senior-title">Pensionär</h3>
          <p className="price-tag-name">Pris: {clickerss.priceSenior}Kr</p>
          <button
            className="add-ticket"
            onClick={() => {
              clickerss.numberofSenior++;
              clickerss.totalPrice += clickerss.priceSenior;
              clickerss.totalSeats++;
            }}
          >
            +
          </button>
          <input
            className="quantity"
            type="text"
            value={clickerss.numberofSenior}
            disabled
          ></input>
          <button
            className="remove-ticket"
            onClick={() => {
              if (clickerss.numberofSenior <= 0) {
                return;
              }
              clickerss.numberofSenior--;
              clickerss.totalPrice -= clickerss.priceSenior;
              clickerss.totalSeats--;
            }}
          >
            -
          </button>
        </div>
        <p className="total-price-css" id="total-price">
          Total Pris: {clickerss.totalPrice}Kr
        </p>
      </div>
      
      <div className="tv-section">
        <div className="tv-outer-red">
          <div className="tv-middle-red">
            <div className="tv-inner-red">
              <div className="tv-screen-container">
                <div className="tv-screen"></div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="seat-option-container">
        <ul className="ul-seat">
          <li className="li-avaliable">
            <div className="seat-available"></div>
            <p className="seat-available-text">Ledig</p>
          </li>
          <li className="li-selected">
            <div className="seat-selected"></div>
            <p className="seat-selected-text">Vald</p>
          </li>
          <li className="li-sold">
            <div className="seat-sold-display"></div>
            <p className="seat-sold-text">Såld</p>
          </li>
        </ul>
      </div>

      <div className="seat-selector-container">
        {!saloonData ? null : saloonData.seatsPerRow.map((s, i) =>
          <div className="row">
            {getSeats(s, i)}
          </div>)}
        <p className="total-seats">
          Du har valt {clickerss.totalSeats < 1 ? null :clickerss.totalSeats } {clickerss.totalSeats < 1 ? "inga platser än": clickerss.totalSeats === 1 ? "plats" : "platser"}.
        </p>
        <button className="bokabtnbiljett" onClick={book}>
          Boka
        </button>
      </div>
    </div>
  );
}
