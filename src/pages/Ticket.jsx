import { useStates } from '../utilities/states';
import { useParams,Link } from 'react-router-dom';
import { calculatingTime } from '../utilities/length-calculating';


export default function TicketPage() { 
     const { moviePath } = useParams();
    
        const s = useStates('main');
    const movie = s.movies.find(movie => movie.title == moviePath);
    
    
/* 
    const ticketOptions = document.querySelectorAll(".ticket-option1,.ticket-option2, .ticket-option3") ;
    const totalPriceDisplay = document.querySelector("#total-price");
    
    ticketOptions.forEach(option => {
      const addButton = option.querySelector(".add-ticket");
      const removeButton = option.querySelector(".remove-ticket");
      const ticketCountInput = option.querySelector("input[type='text']");
    
      addButton.addEventListener("click", function() {
        ticketCountInput.value = parseInt(ticketCountInput.value) + 1;
        updateTotalPrice();
      });
    
      removeButton.addEventListener("click", function() {
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
      }  */
    
return <div className="full-ticket-page">
        
       {/*  {
            movie != undefined ? <div className="detailedPageContainer">
                            <h1  className="detailedTitle">Boka platser för filmen: {movie.title}</h1>
            </div>: null    
    } */}
    <div className="ticket-container" id="ticket-pricing">
        <div className="ticket-option1">
            <h3 className="vuxen-title">Vuxen</h3>
            <p className="price-tag-name">Pris: 120Kr</p>
            <button className="add-ticket">+</button>
            <input className="quantity" type="text" value="0" disabled></input>
            <button className="remove-ticket">-</button>
        </div>
        <div className="ticket-option2">
            <h3 className="vuxen-title">Barn</h3>
            <p className="price-tag-name">Pris: 40Kr</p>
            <button className="add-ticket">+</button>
            <input className="quantity" type="text" value="0" disabled></input>
            <button className="remove-ticket">-</button>
        </div>
        <div className="ticket-option3">
            <h3 className="vuxen-title">Pensionär</h3>
            <p className="price-tag-name">Pris: 80Kr</p>
            <button className="add-ticket">+</button>
            <input className="quantity" type="text" value="0" disabled></input>
            <button className="remove-ticket">-</button>
        </div>
        <p className="total-price-css" id="total-price">Total Pris: 0Kr</p>
    </div>

</div>



}
