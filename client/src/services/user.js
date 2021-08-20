import api from '../services/api';

const Register = async (data) => {
    return await api.post('/user/signup', data);
}

const Login = async (data) => {
    return await api.post('/user/signin', data);
}

const CreateUserProfile = async (data) => {
    return await api.patch('/user/create-profile', data)
}

const UpdateUserProfile = async (data) => {
    return await api.patch('/user/update-profile', data);
}

export {Register, Login, CreateUserProfile, UpdateUserProfile};