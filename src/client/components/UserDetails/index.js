import React, {useEffect, useState} from "react";
import styles from './index.module.scss'
import {userAPI} from "../../../server/api";
import {useNavigate, useParams} from "react-router";
import Button from "../Button";
import {Link} from "react-router-dom";

const UserDetails = () => {
    const [userInfo, setUserInfo] = useState({})
    let navigate = useNavigate();
    let {id} = useParams();
    const handleDeleteUser = () => {
        userAPI.deleteUser(id)
            .then(() => navigate('/'))
    }

    const handleEditUser = () => {
        navigate(`/edit-user/${id}`)
    }

    useEffect(() => {
        userAPI.requestUser(id)
            .then((res) => {
                setUserInfo(res)
            })
    }, [])

    const {first_name, last_name, birth_date, gender, job, biography, is_active} = userInfo
    return (
        <div className={styles.root}>
            <Link to='/' className={styles.backToMain}>Back to main page</Link>
            <div>
                <p className={styles.title}>First Name:</p>
                <p className={styles.info}>{first_name}</p>
            </div>
            <div>
                <p className={styles.title}>Last Name:</p>
                <p className={styles.info}>{last_name}</p>
            </div>
            <div>
                <p className={styles.title}>Gender:</p>
                <p className={styles.info}>{gender}</p>
            </div>
            <div>
                <p className={styles.title}>Date of birth:</p>
                <p className={styles.info}>{birth_date}</p>
            </div>
            <div>
                <p className={styles.title}>Job:</p>
                <p className={styles.info}>{job}</p>
            </div>
            <div>
                <p className={styles.title}>Biography:</p>
                <p className={styles.info}>{biography}</p>
            </div>
            <div>
                <p className={styles.title}>Status:</p>
                <p className={styles.info}>{is_active ? 'Online' : 'Offline'}</p>
            </div>
            <div className={styles.btnWrap}>
                <div className={styles.btn}>
                    <Button text='Edit user' onClick={handleEditUser}/>
                </div>
                <div className={styles.btn}>
                    <Button text='Delete user' onClick={handleDeleteUser}/>
                </div>
            </div>

            </div>
    )
}

export default UserDetails
