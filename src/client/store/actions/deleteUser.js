import {userAPI} from "../../../server/api";
import setUsersData from "./setUsersData";

export const deleteUser = () => (dispatch) => {
    userAPI.deleteUser()
        .then(res => {
            dispatch()
        })
        .catch(() => {
        });
}
