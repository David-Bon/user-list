import React from 'react';
import styles from './index.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Input = ({
                   placeHolder,
                   value,
                   onChange,
                   isError,
                   setIsError,
                   errorText,
                   description
               }) => {
    const handleChange = (e) => {
        onChange(e.target.value);
        setIsError('');
    };
    return (
        <label className={styles.root}>
            <div className={classNames(styles.inputWrap, {
                [styles.isError]: isError
            })}>
                <div className={styles.inputVal}>
                    <input
                        value={value}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder={placeHolder}
                    />
                </div>
            </div>

            {isError && <div className={styles.error}>{errorText}</div>}

            {description && !errorText && <div className={styles.description}>
                {description}
            </div>}
        </label>
    );
};

Input.propTypes = {
    inputName: PropTypes.string,
    currency: PropTypes.string,
    textAlignLeft: PropTypes.bool,
    placeHolder: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onChange: PropTypes.func,
    setIsError: PropTypes.func,
    isError: PropTypes.bool,
    errorText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    titleDescription: PropTypes.string,
    description: PropTypes.string,
    isErrorAbsolute: PropTypes.bool,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onBlur: PropTypes.func
};

Input.defaultProps = {
    value: '',
    textAlignLeft: false,
    placeHolder: '',
    onChange: () => {
    },
    onBlur: () => {
    },
    setIsError: () => {
    },
    isError: false,
    isErrorAbsolute: true,
    description: '',
    type: 'default',
    disabled: false,
    errorText: ''
};

export default Input;
