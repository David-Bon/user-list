import {userAPI} from "../../../server/api";
import setUsersData from "./setUsersData";

export const getUserList = () => (dispatch) => {
    userAPI.requestUsers()
        .then(res => {
            dispatch(setUsersData(res))
        })
}
