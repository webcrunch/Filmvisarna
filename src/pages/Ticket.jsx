import { useStates } from "../utilities/states";
import { useParams, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { calculatingTime } from "../utilities/length-calculating";
import { useEffect } from "react";

export default function TicketPage() {
  const { moviePath,id } = useParams();
  const location = useLocation();
  let largest = 0;
  const s = useStates('main');
  const saloonData = s.saloons.find(saloon => saloon.name == location.state.from[0]);
  const screeningsData = s.screenings.find(screen => screen.id === location.state.from[4]);
  const clickerss = useStates({
    numberofChildren: 0,
    priceChildren: 65,
    numberofAdults: 0,
    priceAdults: 85,
    numberofSenior: 0,
    priceSenior: 75,
    totalPrice: 0,
  });

  useEffect(() => {
    // add the class ticketPage to the body element
    // when the page shows / the component mounts
    document.body.classList.add("ticketPage");
    // remove the class ticketPage when the page
    // unmounts..
    return () => document.body.classList.remove("ticketPage");
  }, []);


  const occupied = (row, chair) => {
    let test = false;
    
    screeningsData.occupiedSeats.forEach(s => {
      let a = s.split(",");
      let row = Number(a[0]);
      console.log(row);
    //   
    //   // start with check the index 
    //   if (row == a[0]) {
    //     console.log(a[1]);
    //   }
    //   // console.log(chair, a[1]);
    //   // if (a[0] == row, a[1] == chair) console.log("change", row, chair);
    //   // test = row == a[0] && chair == a[1]  ? true : false;
    })
    return test;
  }
  
  const getSeats = (numberOfSeatsPerRow,index) => {
    const list = [];
    console.log("______________",index, numberOfSeatsPerRow);
    for (let i = 1; i <= numberOfSeatsPerRow; i++){
      occupied(index, i);
      let check_occupied_seat = true;
      list.push(<div key={i} onClick={() => something(i)} className={ check_occupied_seat ? "seat-sold" : "seat"}></div>)
    //   
    //   // console.log(test);
    //   // console.log("inside the loop", "index:", index, "seat:", i);
    //   let check_occupied_seat = false;
    //   // occupied(index, i);
    //   // console.log(check_occupied_seat, i, index);
    //   list.push(<div key={i} onClick={() => something(i)} className={ check_occupied_seat ? "seat-sold" : "seat"}></div>)
    }
    console.log("______________");
    return  list;
  }

  function something(i) {
    alert(i);
  }

  // updatePrice(){
  //   let childrenPrice = numberOfChildren * priceChildren;
  //   let adultPrice = number
  // }

  /*
    const ticketOptions = document.querySelectorAll(".ticket-option1,.ticket-option2, .ticket-option3");
    const totalPriceDisplay = document.querySelector("#total-price");
  
    ticketOptions.forEach(option => {
      const addButton = option.querySelector(".add-ticket");
      const removeButton = option.querySelector(".remove-ticket");
      const ticketCountInput = option.querySelector("input[type='text']");
  
      addButton.addEventListener("click", function () {
        ticketCountInput.value = parseInt(ticketCountInput.value) + 1;
        updateTotalPrice();
      });
  
      removeButton.addEventListener("click", function () {
        if (ticketCountInput.value > 0) {
          ticketCountInput.value = parseInt(ticketCountInput.value) - 1;
          updateTotalPrice();
        }
      });
    });
  
    function updateTotalPrice() {
      let totalPrice = 0;
  
      ticketOptions.forEach(option => {
        const ticketCount = parseInt(option.querySelector("input[type='text']").value);
        const ticketPriceString = option.querySelector("p").textContent.split("Kr")[0];
        const ticketPrice = parseInt(ticketPriceString.split(":")[1].trim());
        totalPrice += ticketCount * ticketPrice;
      });
  
      totalPriceDisplay.textContent = `Total Pris: ${totalPrice} Kr`;
    }*/

  /*
 numberOfChildren: 0,
priceChildren: 65,
numberofAdults: 0,
priceAdults: 85,
numberOfSenior: 0,
priceSenior: 75,
totalPrice: 0
*/

  return (
    <div className="full-ticket-page">
      {/*  {
export default function TicketPage() { 
    const { moviePath } = useParams();
      const location = useLocation()

        const s = useStates('main');
    const movie = s.movies.find(movie => movie.title == moviePath);
    
    
    return <>
        
        {
            movie != undefined ? <div className="detailedPageContainer">
                            <h1  className="detailedTitle">Boka platser för filmen: {movie.title}</h1>
            </div>: null    
    } */}

      <div className="ticket-container" id="ticket-pricing">
        <div className="ticket-option1">
          <h3 className="vuxen-title">Vuxen</h3>
          <p className="price-tag-name">Pris: {clickerss.priceAdults}Kr</p>
          <button
            className="add-ticket"
            onClick={() => {
              clickerss.numberofAdults++;
              clickerss.totalPrice += clickerss.priceAdults;
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
            }}
          >
            -
          </button>
        </div>
        <p className="total-price-css" id="total-price">
          Total Pris: {clickerss.totalPrice}Kr
        </p>
      </div>
      <div className="seat-option-container">
        <ul className="ul-seat">
          <li className="li-avaliable">
            <div className="seat-available"></div>
            <p className="seat-available-text">Lediga</p>
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
      <div className="tv-screen-container">
        <div className="tv-screen"></div>
      </div>
      <div className="seat-selector-container">
      {!saloonData ? null : saloonData.seatsPerRow.map((s,i) => 
        <div className="row">
            {getSeats(s,i+1)}
        </div>)}
         <p className="total-seats">
          Du har valt <span id="count">0</span> platser.
        </p>
               </div>
    </div>
  );
}
