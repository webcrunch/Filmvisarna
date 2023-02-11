import { useStates } from './utilities/states';
import { NavLink } from "react-router-dom"
import { useState } from 'react';
export default function Navbar() {

    const s = useStates('main');
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <nav>
                {s.menu.map(({ label, path }) =>
                    label ? <NavLink className="navlinks" to={path}>{label}</NavLink> : null
            )}
            <img onClick={() => alert("hello")} src="/images/icon-login.svg" alt="Login" />
            {/* <p>Välkommen tillbaka ....</p> */}            
        </nav>
        
    </>
}
