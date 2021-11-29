import React from "react";
import styles from './index.module.scss'
import PropTypes from 'prop-types'

const Button = ({text, disabled, onClick}) => {
    return <button className={styles.btn} disabled={disabled} onClick={onClick}>{text}</button>
}

Button.propTypes = {
    text: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
}

export default Button
