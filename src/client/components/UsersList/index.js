import React, {useEffect, useState} from "react";
import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getUserList} from "../../store/actions/getUsersData";
import {Link} from "react-router-dom";
import {userAPI} from "../../../server/api";
import {useNavigate} from "react-router";

const UsersList = () => {
    const usersData = useSelector(({users}) => users.usersList) || [];
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const updateUsersList = () => dispatch(getUserList())
    useEffect(() => {
        updateUsersList()
    }, [])

    const handleClickProfile = (id) => {
        navigate(`/user-details/${id}`)
    }

    const handleDelete = (e, id) => {
        e.stopPropagation()
        userAPI.deleteUser(id)
            .then(() => {
                updateUsersList()
            })
    }
    return (
        <div className={styles.root}>
            <Link to='/create-user' className={styles.addUser}>Add new user</Link>
            {
                usersData.map((item, key) => {
                    return (
                        <div key={key} onClick={() => handleClickProfile(item.id)} className={styles.userWrap}>
                            <div className={styles.section}>
                                <span className={styles.title}>Name:</span>
                                <span>{item.first_name} {item.last_name}</span>
                            </div>
                            <div className={styles.section}>
                                <span className={styles.title}>Sex:</span>
                                <span>{item.gender}</span>
                            </div>
                            <div className={styles.section}>
                                <span className={styles.title}>Date of birth:</span>
                                <span>{item.birth_date}</span>
                            </div>
                            <button className={styles.btn} onClick={(e) => handleDelete(e, item.id)}>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UsersList;
