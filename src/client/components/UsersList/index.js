import React, {useEffect} from "react";
import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getUserList} from "../../store/actions/getUsersData";
import {Link} from "react-router-dom";

const UsersList = () => {
    const usersData = useSelector(({users}) => users.usersList) || [];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserList())
    }, [])
    return (
        <div className={styles.root}>
            <Link to='/create-user' className={styles.addUser}>Add new user</Link>
            {
                usersData.length && usersData.map((item, key) => {
                    return (
                        <div key={key} className={styles.userWrap}>
                            <div><span className={styles.title}>Name:</span>
                                <span>{item.first_name} {item.last_name}</span></div>
                            <div><span className={styles.title}>Sex:</span> <span>{item.gender}</span></div>
                            <div><span className={styles.title}>Date of birth:</span> <span>{item.birth_date}</span>
                            </div>
                            <button>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}


export default UsersList;
