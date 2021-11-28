import React, {useState} from "react";
import styles from './index.module.scss'
import Input from "../Input";
import "react-datepicker/dist/react-datepicker.css";
import {userAPI} from "../../../server/api";
import {format} from 'date-fns'
import pathOr from '@tinkoff/utils/object/pathOr'
import DateInput from "../DateInput";

const UserCreate = () => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [surname, setSurname] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [gender, setGender] = useState({value: 'male'});
    const [birthDate, setBirthDate] = useState(0);
    const [birthDateError, setBirthDateError] = useState('');
    const [job, setJob] = useState('');
    const [jobError, setJobError] = useState('');
    const [biography, setBiography] = useState('');
    const [biographyError, setBiographyError] = useState('');
    const [isActiveCheck, setIsActiveCheck] = useState(false);

    const handleRequest = () => {
        userAPI.createUser({
            first_name: name,
            last_name: surname,
            birth_date: format(birthDate, 'yyyy-MM-dd'),
            gender: gender.value,
            job: job,
            biography: biography,
            is_active: isActiveCheck
        })
            .then(() => {
            })
            .catch((error) => {
                const errObj = error.response.data;
                setBiographyError(pathOr(['biography'], [''], errObj)[0])
                setJobError(pathOr(['job'], [''], errObj)[0])
                setSurnameError(pathOr(['last_name'], [''], errObj)[0])
                setNameError(pathOr(['first_name'], [''], errObj)[0])
                setBirthDateError(pathOr(['birth_date'], [''], errObj)[0])
            })
    }

    return (
        <div className={styles.root}>
            <div className={styles.inputWrap}>
                <Input placeHolder='Enter name' value={name} onChange={setName} errorText={nameError}
                       isError={!!nameError}
                       setIsError={setNameError}/>
            </div>
            <div className={styles.inputWrap}>
                <Input placeHolder='Enter surname' value={surname} onChange={setSurname} errorText={surnameError}
                       isError={!!surnameError} setIsError={setSurnameError}/>
            </div>
            <div className={styles.inputWrap}>
                Select date of birth:
                <DateInput value={birthDate} onChange={setBirthDate} errorText={birthDateError}
                           setIsError={setBirthDateError} maxDate={new Date()}/>
            </div>
            <div className={styles.inputWrap}>
                Select a gender:
                <select value={gender.value} onChange={e => setGender({value: e.target.value})}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className={styles.inputWrap}>
                <Input placeHolder='Enter your job' value={job} onChange={setJob} errorText={jobError}
                       isError={!!jobError}
                       setIsError={setJobError} description='max length 256'/>
            </div>
            <div className={styles.inputWrap}>
                <Input placeHolder='Enter your biography' value={biography} onChange={setBiography}
                       errorText={biographyError} isError={!!biographyError} setIsError={setBiographyError}
                       description='max length 1024'/>
            </div>
            <label className={styles.checkboxWrap}>
                <input type="checkbox" checked={isActiveCheck} onChange={() => setIsActiveCheck(!isActiveCheck)}/>
                Enabled
            </label>

            <button onClick={handleRequest}>Submit</button>

        </div>
    )
}

export default UserCreate;
