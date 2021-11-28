import classNames from "classnames";
import styles from './index.module.scss'
import React, {forwardRef} from "react";
import Calendar from './images/calendar@3x.png';
import DatePicker from "react-datepicker";

const CustomInput = forwardRef(({value, onClick, errorText}, ref) => {
    return (
        <div className={classNames(styles.inputWrap, {
            [styles.isError]: errorText
        })}>
            <input className={styles.inputVal} placeholder='DD/MM/YYYY' onClick={onClick} ref={ref} value={value}
                   onChange={() => {
                   }}/>
            <img className={styles.img} onClick={onClick} src={Calendar} alt=""/>
        </div>
    );
});

const DateInput = ({value, onChange, errorText, setIsError, maxDate}) => {
    const handleChange = (e) => {
        onChange(e);
        setIsError(false);
    };
    return <div className={styles.wrapper}>
        <DatePicker
            className={classNames(styles.inputVal, {
                [styles.isError]: errorText
            })}
            onChange={(e) => handleChange(e)}
            selected={value}
            maxDate={maxDate}
            yearDropdownItemNumber={99}
            scrollableYearDropdown
            showYearDropdown
            popperClassName={styles.dateWrap}
            customInput={<CustomInput isError={errorText}/>}
        />
        {errorText && <div className={styles.error}>{errorText}</div>}
    </div>;
};

export default DateInput;
