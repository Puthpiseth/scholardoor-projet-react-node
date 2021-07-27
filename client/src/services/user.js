import api from '../services/api';

async function Signup(arr) {

    const user = {
        firstname: arr[0].value,
        lastname: arr[1].value,
        username: arr[2].value,
        email: arr[3].value,
        password: arr[4].value
    }
    const response = await api.post('/signup', user);
    return response;
}

async function Signin(arr) {

    const user = {
        email: arr[3].value,
        password: arr[4].value,
    }
    const response = await api.post('/signin', user);
    return response;
}

export {Signup, Signin};