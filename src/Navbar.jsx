import { useStates } from './utilities/states';
import { NavLink, Link } from "react-router-dom"
import React, { useState } from "react";
export default function Navbar() {

    const s = useStates('main');
    const open = useStates('user');
    return <>
        <nav>
                {s.menu.map(({ label, path }) =>
                    label ? <NavLink className="navlinks" to={path}>{label}</NavLink> : null
            )}
            <img onClick={() => open.isOpened = !open.isOpened} src="/images/icon-login.svg" alt="Login" />
            {/* <p>Välkommen tillbaka ....</p> */}            
        </nav>
        {open.isOpened ? <div className="boxContent">
            <div>
            <p>{open.loggedin ? <Link className='linkin-park' to={"#"}><img  className='linkin-park' src={"./images/icons8-log-out-25.png"} alt={"Poster av filmen "} />  Log out</Link> : <Link to={"#"}><img  src={"./images/icons8-log-in-25.png"} alt={"Poster av filmen "} />Log in</Link>}</p>
            <p><Link className='linkin-park' to={"#"}><img className='linkin-park' src={"./images/icons8-add-user-male-24.png"} alt={"Poster av filmen "} />  Registrera sig </Link></p>
            </div>
        </div> :null}
    </>
}
