import {useEffect } from "react";

export default function Contact() {

    useEffect(() => {
        document.body.classList.add("contactPage");
        return() => document.body.classList.remove("contactPage");
    }, []);

    return <div className="contact">


        <h2 className="contact_header">Kontakta oss</h2>
        <img src="Filmvisarna/images/kontakt.jpg" alt="Here will be a image" />
        <p>För information om biljettköp och -bokning till Filmvisarna.</p>
        <p className="Adress">Adress: Stortorget 11, 124 84 Småstad, Sverige</p>
        <p className="Telefon"><a href="tel:+4733378901">Telefon: (073) 337 89 01 </a></p>
        <p className="E-post">E-post: <a href="info@filmvisarna.com">info@filmvisarna.com</a></p>

        <p>För biljettbokning och övriga ärenden, vänd dig i första hand till någon av biograferna.</p>
        <p>För att kontakta någon av personerna nedan skicka e-post till: förnamn@filmvisarna.com</p>
        <p>För frågor angående programsättning och uthyrningar skicka e-post till: program@filmvisarna.com</p>
        <p><b>Thomas Frank</b></p>
        <p>Biografansvarig, kontaktperson </p>
        <p className="E-post">E-post: <a href="info@filmvisarna.com">thomas@filmvisarna.com</a></p>
        <p className="Hemsida">Hemsida: <a href="www.filmvisarna.com">www.filmvisarna.com</a></p>
        </div>
}