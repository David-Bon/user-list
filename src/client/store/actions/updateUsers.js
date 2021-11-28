import {EDIT_USERS, SET_USERS} from "../types";


const editUsers = payload => ({
    type: EDIT_USERS,
    payload
})

export default editUsers
