import './Social.scss'

import tg from '@/assets/icons/social/telegram.svg'
import github from '@/assets/icons/social/github.svg'

export default function Search() {
    return(
        <div className="header__soc1al social">
            <div className="social__icons">
                <div className="social__icon">
                    <img src={tg} alt="телеграм" className="social" />
                </div>
                <div className="social__icon">
                    <img src={github} alt="гитхаб" className="social" />
                </div>
            </div>
        </div>
    )
}