export default function Footer() {
  return <>
    <footer>
      <div className="adressdiv" >
      <p className="adresstitle">INFORMATION:</p>
      <p className="adress">Stortorget 11, Småstad, 23837</p>
      <p className="adress">Tel: <a href="tel:+4733378901">+47 333 78 901</a></p>
      <p className="email">Email: <a href="#">info@filmvisarna.com</a></p>
     </div>
      
      <div className="openinghdiv">
        <p className="hoursopentitle">
          OPENING HOURS:
        </p>
        <pre className="hours"> 
        Monday - Friday   : 15:00 - 23:00<br></br>
        Saturday - Sunday : 17:00 - 23:00</pre>
      </div>

      <div className="socialsdiv">
        <p className="cr"> ©Filmvisarna AB</p>
        <p className="socialstitle">SOCIALS:</p>
        
        

      
      </div>



    </footer>
  </>
}