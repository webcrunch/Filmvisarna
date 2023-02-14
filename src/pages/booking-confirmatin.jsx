import generate from "../utilities/random-order-confirmation"
export default function Booked() {
    let of = {
        phoneNumber: 333333,
        numberOfChildren: 0,
        numberOfAdults: 4,
        numberOfSeniors: 2,
        confirmationNumber: generate(),
        calculateAll() {
            return this.numberOfAdults + this.numberOfChildren + this.numberOfSeniors
        }
    }


    return <div className="doneA">
        <div className="information">
            <h2>Thank you for your order!</h2>
            <h3>Info</h3>
            <p>The Movie:{ }</p>
            <p>Your email:<br />{of.email}</p>
            <p>Your phone number:<br />{of.phoneNumber}</p>
            <p>Number of child tickets.<br />{of.numberOfChildren}</p>
            <p>Number of adult tickets.<br />{of.numberOfAdults}</p>
            <p>Number of senior tickets.<br />{of.numberOfSeniors}</p>
            <p>Total: {of.calculateAll()}</p>
            <h3>Booking confirmation</h3>
            <p>Don't forget to bring this number to the cinema:</p>
            <p>{of.confirmationNumber}</p>
        </div>
        <img src="/images/bookingpage.jpg" alt="Here will be a image" />
    </div>;
}