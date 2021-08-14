import api from '../services/api';

const Register = async (data) => {
    return await api.post('/signup', data);
}

const Login = async (data) => {
    return await api.post('/signin', data);
}

const UpdateUserProfile = async (data) => {
    return await api.patch('/update-profile', data);
}

export {Register, Login, UpdateUserProfile};