import { useStates } from '../utilities/states';
import { useParams, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { calculatingTime } from '../utilities/length-calculating';
import { useEffect } from "react";

export default function TicketPage() {
  const { moviePath } = useParams();
  const clickerss = useStates({
    numberofChildren: 0,
    priceChildren: 65,
    numberofAdults: 0,
    priceAdults: 85,
    numberofSenior: 0,
    priceSenior: 75,
    totalPrice: 0
  })

  useEffect(() => {
    // add the class ticketPage to the body element
    // when the page shows / the component mounts
    document.body.classList.add("ticketPage");
    // remove the class ticketPage when the page
    // unmounts..
    return () => document.body.classList.remove("ticketPage");
  }, []);


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

  return <div className="full-ticket-page">

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
            <button className="add-ticket" onClick={() => {
            clickerss.numberofAdults++;
            clickerss.totalPrice += clickerss.priceAdults;
            }}>+</button>
            <input className="quantity" type="text" value={clickerss.numberofAdults} disabled></input>

            <button className="remove-ticket" onClick={() => {
            if (clickerss.numberofAdults <= 0) { return; }
            clickerss.numberofAdults--;
            clickerss.totalPrice -= clickerss.priceAdults;
            }}>-</button>
        </div>

        <div className="ticket-option2">
            <h3 className="barn-title">Barn</h3>
            <p className="price-tag-name">Pris: {clickerss.priceChildren}Kr</p>
            <button className="add-ticket" onClick={() => {
            clickerss.numberofChildren++;
            clickerss.totalPrice += clickerss.priceChildren;
            }}>+</button>
            <input className="quantity" type="text" value={clickerss.numberofChildren} disabled></input>
            <button className="remove-ticket" onClick={() => {
            if (clickerss.numberofChildren <= 0) { return; }
            clickerss.numberofChildren--;
            clickerss.totalPrice -= clickerss.priceChildren;
            }}>-</button>
        </div>

        <div className="ticket-option3">
            <h3 className="senior-title">Pensionär</h3>
            <p className="price-tag-name">Pris: {clickerss.priceSenior}Kr</p>
            <button className="add-ticket" onClick={() => {
            clickerss.numberofSenior++;
            clickerss.totalPrice += clickerss.priceSenior;
            }}>+</button>
            <input className="quantity" type="text" value={clickerss.numberofSenior} disabled></input>
            <button className="remove-ticket" onClick={() => {
            if (clickerss.numberofSenior <= 0) { return; }
            clickerss.numberofSenior--;
            clickerss.totalPrice -= clickerss.priceSenior;
            }}>-</button>
        </div>
      <p className="total-price-css" id="total-price">Total Pris: {clickerss.totalPrice}Kr</p>
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
            <div className="seat-sold"></div>
            <p className="seat-sold-text">Såld</p>
        </li>
    </ul>
    <div className="tv-screen-container">
        <div className="tv-screen"></div>
    </div>
    <div className="row">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat-sold"></div>
        <div className="seat-sold"></div>
        <div className="seat"></div>
    </div>
    <div className="row">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat-sold"></div>
        <div className="seat-sold"></div>
        <div className="seat"></div>
    </div>
    <div className="row">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat-sold"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
    </div>

    <div className="row">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat-sold"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
    </div>

    <div className="row">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat-sold"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
    </div>
    <div className="row">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat-sold"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
    </div>
    <div className="row">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat-sold"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
    </div>
    
    <div className="row">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat-sold"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
    </div>
    <div className="row">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat-sold"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
    </div>
    <div className="row">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat-sold"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
    </div>
          </div>
    </div>
}
