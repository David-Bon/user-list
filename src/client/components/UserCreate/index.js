import React, {useEffect, useState} from "react";
import styles from './index.module.scss'
import Input from "../Input";
import "react-datepicker/dist/react-datepicker.css";
import {userAPI} from "../../../server/api";
import {format} from 'date-fns'
import pathOr from '@tinkoff/utils/object/pathOr'
import DateInput from "../DateInput";
import {useNavigate, useParams} from "react-router";
import Button from "../Button";
import {Link} from "react-router-dom";

const UserCreate = () => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [surname, setSurname] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [gender, setGender] = useState({value: 'male'});
    const [birthDate, setBirthDate] = useState(new Date());
    const [birthDateError, setBirthDateError] = useState('');
    const [job, setJob] = useState('');
    const [jobError, setJobError] = useState('');
    const [biography, setBiography] = useState('');
    const [biographyError, setBiographyError] = useState('');
    const [isActiveCheck, setIsActiveCheck] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const {editId} = useParams();
    let navigate = useNavigate();
    useEffect(() => {
        if (editId) {
            userAPI.requestUser(editId)
                .then((res) => {
                    setBirthDate(new Date(res.birth_date))
                    setBiography(res.biography)
                    setJob(res.job)
                    setSurname(res.last_name)
                    setName(res.first_name)
                    setIsActiveCheck(res.is_active)
                })
        }
    }, [])

    const handleRequest = () => {
        setIsFetching(true);
        const requestSubmit = editId ? userAPI.editUser : userAPI.createUser;
        requestSubmit({
            first_name: name,
            last_name: surname,
            birth_date: format(birthDate, 'yyyy-MM-dd'),
            gender: gender.value,
            job: job,
            biography: biography,
            is_active: isActiveCheck,
            ...(editId ? {id: editId} : {})
        })
            .then(() => {
                if (editId) {
                    navigate(`/user-details/${editId}`)
                } else {
                    alert('New user is created')
                    setBirthDate(new Date())
                    setBiography('')
                    setJob('')
                    setSurname('')
                    setName('')
                    setIsActiveCheck(false)
                }
            })
            .catch((error) => {
                const errObj = error.response.data;
                setBiographyError(pathOr(['biography'], [''], errObj)[0])
                setJobError(pathOr(['job'], [''], errObj)[0])
                setSurnameError(pathOr(['last_name'], [''], errObj)[0])
                setNameError(pathOr(['first_name'], [''], errObj)[0])
                setBirthDateError(pathOr(['birth_date'], [''], errObj)[0])
            })
            .finally(() => {
                setIsFetching(false)
            })
    }

    return (
        <div className={styles.root}>
            <Link to='/' className={styles.backToMain}>Back to main page</Link>
            {editId && <div>Please enter new data for user with {editId} id</div>}
            <div className={styles.inputWrap}>
                <Input
                    placeHolder='Enter name'
                    value={name}
                    onChange={setName}
                    errorText={nameError}
                    setIsError={setNameError}/>
            </div>
            <div className={styles.inputWrap}>
                <Input
                    placeHolder='Enter surname'
                    value={surname}
                    onChange={setSurname}
                    errorText={surnameError}
                    setIsError={setSurnameError}/>
            </div>
            <div className={styles.inputWrap}>
                <p className={styles.title}>Select date of birth:</p>
                <DateInput
                    value={birthDate}
                    onChange={setBirthDate}
                    errorText={birthDateError}
                    setIsError={setBirthDateError}
                    maxDate={new Date()}/>
            </div>
            <div className={styles.inputWrap}>
                <p className={styles.title}>Select a gender:</p>
                <select
                    className={styles.dropdown}
                    value={gender.value}
                    onChange={e => setGender({value: e.target.value})}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className={styles.inputWrap}>
                <Input
                    placeHolder='Enter your job'
                    value={job}
                    onChange={setJob}
                    errorText={jobError}
                    setIsError={setJobError}
                    description='max length 256'/>
            </div>
            <div className={styles.inputWrap}>
                <Input
                    placeHolder='Enter your biography'
                    value={biography}
                    onChange={setBiography}
                    errorText={biographyError}
                    setIsError={setBiographyError}
                    description='max length 1024'/>
            </div>
            <label className={styles.checkboxWrap}>
                <input type="checkbox" checked={isActiveCheck} onChange={() => setIsActiveCheck(!isActiveCheck)}/>
                Enabled
            </label>
            <div className={styles.btn}>
                <Button text={editId ? 'Update' : 'Submit'} onClick={handleRequest} disabled={isFetching}/>
            </div>
        </div>
    )
}

export default UserCreate;
