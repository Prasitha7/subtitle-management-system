import {Link} from "react-router-dom";
import styles from "./NavBar.module.css"

function NavBar(){
    return(
        <nav className={styles.navbar}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/media">Media</Link></li>
                <li><Link to="/publishers">Publishers</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;