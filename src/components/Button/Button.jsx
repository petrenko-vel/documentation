
import './Button.scss'
import { Link } from 'react-router-dom'
import clsx from 'clsx';


export default function Button(props) {
    const { className, href, ...rest } = props

    return(
        <Link 
            className={clsx(`${className} button`)}
            to={href}
            {...rest}
        >
            {props.children}
        </Link>
    )
}