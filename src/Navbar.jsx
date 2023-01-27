import { useStates } from './utilities/states';
import { NavLink } from "react-router-dom"
export default function Navbar() {

  const s = useStates('main');
    // console.log(!useStates ? null : s);
    return <>
        <nav className="navbar">
            <nav>
                {s.menu.map(({ label, path }) =>
                label ? <NavLink className="navlinks" to={path}>{label}</NavLink> : null
    )}
            </nav>
            {/* <ul>
            <li><a className="navlinks" href="#">FILMER</a></li>
            <li><a className="navlinks" href="#">OM OSS</a></li>
            <li><a className="navlinks" href="#">HEM</a></li>
            <li><a className="navlinks" href="#">KONTAKT</a></li>
        </ul> */}
</nav>
    
    </>}
   