import {
    SET_USERS

} from '../types';

const initialState = {
    usersList: []
};

export default function usersReducer (state = initialState, action) {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                usersList: [
                    ...action.payload,
                ]
            };
        default:
            return state;
    }
}
