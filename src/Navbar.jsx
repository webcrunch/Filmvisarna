import { useStates } from './utilities/states';
import { NavLink, Link } from "react-router-dom"
import React, { useState } from "react";
export default function Navbar() {

    const s = useStates('main');
    const open = useStates('user');
    const l = useStates({ opened: false, hamburgerOpened: false});
    // Maybe set this to a utility function
    function logout() {
        open.loggedin = false;
        // will have some nice api call here
    }
    return <div className='navbar'>
      <nav>
                {s.menu.map(({ label, path }) =>
                    label ? <NavLink className="navlinks" to={path}>{label}</NavLink> : null
            )}
            <img className='img' onClick={() => l.opened = !l.opened} src="/images/icon-login.svg" alt="Login" />
            {/* <p>Välkommen tillbaka ....</p> */}     
            <img  className='hambugerImg' src={"./images/burger-menu24.png"} alt="meny val" />
         <div className={"boxContent " + (l.opened ? 'shown' : 'hidden')}>
            <div>
            <p>{open.loggedin ? <Link onClick={() => logout()}  to={"#"}><img src={"./images/icons8-log-out-25.png"} alt={""} />Logga ut</Link> : <Link to={"/authentication"}><img  src={"./images/icons8-log-in-25.png"} alt={""} />Logga in</Link>}</p>
            <p><Link  to={"/auth"}><img  src={"./images/icons8-add-user-male-24.png"} alt={""} />  Registrera sig </Link></p>
            </div>
            </div>
            
        </nav>
    </div>
}
