export default function Footer() {
  return <>
    <footer>
      <div className="footerleft" >
      <h3>Information:</h3>
      <p className="adress">Adress: Stortorget 11, 124 84 Småstad, Sverige</p>
      <p className="phonenumber"><a href="tel:+4733378901">Telefon: (073) 337 89 01 </a></p>
      <p className="email">Email: <a href="info@filmvisarna.com">info@filmvisarna.com</a></p>
     </div>
      
      <div className="footercenter">
        <h3 className="openinghtitle">Öppetider:</h3>
        <p className="hourweekdays">Mån-Fre: 15:00-22:00</p>
        <p className="hourweekend">Lör-Sön: 15:00-23:00</p>
      </div>

      <div className="footerright">
        <h3>Socials</h3>
          <a href="#"><img src="/images/facebook.png" alt=""facebookalt="true" width="50px" height="50px"></img></a>
          <a href="#"><img src="/images/instagram.png" alt=""facebookalt="true" width="50px" height="50px"></img></a>
          <a href="#"><img src="/images/twitter.png" alt=""facebookalt="true" width="50px" height="50px"></img></a>
          

      </div>
    


    </footer>
  </>
}