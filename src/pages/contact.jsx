import {useEffect } from "react";

export default function Contact() {

    useEffect(() => {
        document.body.classList.add("contactPage");
        return() => document.body.classList.remove("contactPage");
    }, []);

    return <div className="contact">


       

        <div className="contact-img-container">
        <img src="images/cinema-contact.png" alt="Here will be a image" />
        </div>
       
        <div className="contact-details">
            <h4>För information om biljettköp och bokning till Filmvisarna.</h4>
            <p className="Adress">Adress: Stortorget 11, 124 84 Småstad, Sverige</p>
            <p className="Telefon"><a href="tel:+46733378904">Telefon: (+46)73 337 89 01 </a></p>
            <p className="E-post">E-post: <a href="info@cinema-net4flix.com">info@filmvisarna.com</a></p>
        
            <p>För biljettbokning och övriga ärenden, vänd dig i första hand till någon av biograferna.</p>
            <p>För att kontakta någon av personerna nedan skicka e-post till: förnamn@filmvisarna.com</p>
            <p>För frågor angående programsättning och uthyrningar skicka e-post till: program@filmvisarna.com</p>
            
            <div className="contact-person">
            <h4>Personal</h4>
            <p><b>Armin Fazli Khan</b></p>
            <p>Biografansvarig, kontaktperson </p>
            <p className="E-post">E-post: <a href="info@filmvisarna.com">arminfazlikhan@gmail.com</a></p>
            <p className="Hemsida">Hemsida: <a href="www.filmvisarna.com">www.cinema-net4flix.arminfazlikhan.com</a></p>
            </div>
            
        </div>

      
        </div>
}
