import { useStates } from "../utilities/states";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import generate from "../utilities/random-order-confirmation";
import { get, post } from '../utilities/backend-talk';

export default function TicketPage() {
    let { screeningInfo } = useParams();
    const s = useStates('main');
    const [data, setData] = useState(null);
    const movie = data && s.movies ? s.movies.find(movie => movie.path === data.moviePath) : null;
    const saloonData = data ? s.saloons.find(saloon => saloon.name === data.auditorium) : null;
    const screeningsData = data ? s.screenings.find(screen => screen.id === data.screen_id) : null;
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
        markedChairsArray: Array(8).fill([]),
        confnr: screeningInfo
    });

    useEffect(() => {
        document.body.classList.add("ticketPage");
        (async () => {
            const response = await get(`/api/bookings_information/${screeningInfo}`);
            setData(response);
        })();
        return () => document.body.classList.remove("ticketPage");
    }, [screeningInfo]);

    const numberOfMarked = Object.keys(seats.markedChairs).length;

    const getSeats = (numberOfSeatsPerRow, index) => {
        const list = [];
        for (let i = 1; i <= numberOfSeatsPerRow; i++) {
            const check_occupied_seat = screeningsData?.occupiedSeats[index]?.find(element => element === i);
            list.push(
                <div
                    key={i}
                    onClick={() => !check_occupied_seat && clickOnSeat([index + 1, i])}
                    className={(check_occupied_seat ? "seat-sold" : "seat") + (seats.markedChairs[`${index + 1} ${i}`] ? "-marked" : "")}
                ></div>
            );
        }
        return list;
    };

    const clickOnSeat = ([row, chair]) => {
        const key = `${row} ${chair}`;
        if (seats.markedChairs[key]) {
            delete seats.markedChairs[key];
        } else if (numberOfMarked < clickerss.totalSeats) {
            seats.markedChairs[key] = true;
        }
    };

    const insertSeats = markedSeats => {
        for (const [key, value] of Object.entries(markedSeats)) {
            const [row, chair] = key.split(" ");
            seats.markedChairsArray[row - 1].push(Number(chair));
        }
    };

    const navigate = useNavigate();
    const book = async () => {
        await insertSeats(seats.markedChairs);
        const updateobj = { ...clickerss, ...seats, screeningsData, movie: movie.path, bnr: screeningInfo.bnr };
        await post(`/api/handle_booking/${screeningInfo}`, updateobj);
        navigate(`/done/${screeningInfo}`);
    };

    const TicketOption = ({ title, price, count, increment, decrement }) => (
        <div className="ticket-option">
            <h3>{title}</h3>
            <p>Pris: {price}Kr</p>
            <button onClick={increment}>+</button>
            <input type="text" value={count} disabled />
            <button onClick={decrement}>-</button>
        </div>
    );

    return movie && (
        <div className="full-ticket-page">
            <h1 className="detailedTitle">Boka platser för filmen: {movie.title}</h1>
            <div className="ticket-container" id="ticket-pricing">
                <TicketOption
                    title="Vuxen"
                    price={clickerss.priceAdults}
                    count={clickerss.numberofAdults}
                    increment={() => {
                        clickerss.numberofAdults++;
                        clickerss.totalPrice += clickerss.priceAdults;
                        clickerss.totalSeats++;
                    }}
                    decrement={() => {
                        if (clickerss.numberofAdults > 0) {
                            clickerss.numberofAdults--;
                            clickerss.totalPrice -= clickerss.priceAdults;
                            clickerss.totalSeats--;
                        }
                    }}
                />
                <TicketOption
                    title="Barn"
                    price={clickerss.priceChildren}
                    count={clickerss.numberofChildren}
                    increment={() => {
                        clickerss.numberofChildren++;
                        clickerss.totalPrice += clickerss.priceChildren;
                        clickerss.totalSeats++;
                    }}
                    decrement={() => {
                        if (clickerss.numberofChildren > 0) {
                            clickerss.numberofChildren--;
                            clickerss.totalPrice -= clickerss.priceChildren;
                            clickerss.totalSeats--;
                        }
                    }}
                />
                <TicketOption
                    title="Pensionär"
                    price={clickerss.priceSenior}
                    count={clickerss.numberofSenior}
                    increment={() => {
                        clickerss.numberofSenior++;
                        clickerss.totalPrice += clickerss.priceSenior;
                        clickerss.totalSeats++;
                    }}
                    decrement={() => {
                        if (clickerss.numberofSenior > 0) {
                            clickerss.numberofSenior--;
                            clickerss.totalPrice -= clickerss.priceSenior;
                            clickerss.totalSeats--;
                        }
                    }}
                />
                <p className="total-price-css" id="total-price">Total Pris: {clickerss.totalPrice}Kr</p>
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
                    <li className="li-available">
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
                {saloonData?.seatsPerRow.map((s, i) => (
                    <div key={i} className="row">
                        {getSeats(s, i)}
                    </div>
                ))}
                <p className="total-seats">Du har valt {clickerss.totalSeats < 1 ? "inga platser än" : clickerss.totalSeats === 1 ? "plats" : "platser"}.</p>
                <button className="bokabtnbiljett" onClick={book}>Boka</button>
            </div>
        </div>
    );
}
