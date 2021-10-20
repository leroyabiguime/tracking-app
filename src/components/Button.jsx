import React from 'react'
import PropsTypes from 'prop-types'

const Button = ({color, text, onClick}) => {
 
    return (
        <button
         onClick={onClick} 
         style={{backgroundColor: color}} 
         className='btn'>{text}</button>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.PropsTypes = {
    text: PropsTypes.string,
    color: PropsTypes.string,
    onClick: PropsTypes.func,
}
export default Button
