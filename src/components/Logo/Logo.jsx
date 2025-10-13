import { Link } from "react-router-dom";

import './Logo.scss'
import logo from '@/assets/image/logo.svg'

export default function Logo(props) {

    const { className, display } = props
    return(
        <div className="header__logo logo">
            <Link to={"/"} className="logo__link">
                <img src={logo} className={`logo__image ${className}`} width={40} />
                <span style={{ display: display }}>Signal-master</span>
            </Link>
        </div>
    )
}