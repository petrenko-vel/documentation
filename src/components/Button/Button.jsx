import './Button.scss'
import clsx from 'clsx'


export default(props) => {
    const { classColor, label, ...rest } = props

    return(
        <button 
            className={clsx('hero__button', classColor, 'btn')} 
            type="button"
            {...rest}
        >
            {label}
        </button>
    )
}