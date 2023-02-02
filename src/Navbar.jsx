import { useStates } from './utilities/states';
import { NavLink } from "react-router-dom"
export default function Navbar() {

    const s = useStates('main');

    return <>
        <nav className="navbar">
            <nav>
                {s.menu.map(({ label, path }) =>
                    label ? <NavLink className="navlinks" to={path}>{label}</NavLink> : null
                )}
            </nav>
        </nav>

    </>
}
