import React from 'react';
import styles from './index.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Input = ({
                   placeHolder,
                   value,
                   onChange,
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
                [styles.isError]: errorText
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

            {errorText && <div className={styles.error}>{errorText}</div>}

            {description && !errorText && <div className={styles.description}>
                {description}
            </div>}
        </label>
    );
};

Input.propTypes = {
    placeHolder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    setIsError: PropTypes.func,
    errorText: PropTypes.string,
    description: PropTypes.string
};

export default Input;
