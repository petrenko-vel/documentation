import { Link } from "react-router-dom";

import './Logo.scss'
import logo from '@/assets/image/logo.svg'

export default function Logo(props) {

    const { divClassName, classNameImage, classNameLink, display } = props
    return(
        <div className={`${divClassName} logo`}>
            <Link to={"/"} className={classNameLink}>
                <img src={logo} className={classNameImage} width={40} />
                <span style={{ display: display }}>Signal-master</span>
            </Link>
        </div>
    )
}