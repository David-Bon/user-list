import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://frontend-candidate.dev.sdh.com.ua/v1/contact/'
});

export const userAPI = {
    requestUsers() {
        return instance.get()
            .then(response => response.data);
    },
    requestUser(id) {
        return instance.get(`${id}`)
            .then(response => response.data);
    },
    deleteUser(id) {
        return instance.delete(`${id}`)
            .then(response => response.data);
    },
    createUser(data) {
        return instance.post(``, data)
            .then((res, rej) => {
                console.error('rejApi', rej)
                console.log('resApi', res)
            })
    },
    editUser(data) {
        const createData = JSON.parse(data);
        return instance.put(`${createData.id}`, {data})
            .then(response => console.log(response));
    },
};
