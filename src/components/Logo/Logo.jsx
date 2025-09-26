// import './Logo.scss'
import logo from '@/assets/image/logo.svg'

export default function Logo() {
    return(
        <div className="header__logo">
            <a href="#" className="haeder__logo-link">
                <img src={logo} className="header__logo-image" />
            </a>
        </div>
    )
}