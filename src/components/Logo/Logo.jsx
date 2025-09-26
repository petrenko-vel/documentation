import './Logo.scss'
import logo from '@/assets/image/logo.svg'

export default function Logo() {
    return(
        <div className="header__logo logo">
            <a href="#" className="logo__link">
                <img src={logo} className="logo__image" />
                <span>Signal-master</span>
            </a>
        </div>
    )
}