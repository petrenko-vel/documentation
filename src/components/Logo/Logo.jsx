import { Link } from "react-router-dom";

import './Logo.scss'
import logo from '@/assets/image/logo.svg'

export default function Logo() {
    return(
        <div className="header__logo logo">
            <Link to={"/"} className="logo__link">
                <img src={logo} className="logo__image" width={40} />
                <span>Signal-master</span>
            </Link>
        </div>
    )
}