import api from '../services/api';

const Register = async (firstname, lastname, username, email, password) => {
    return await api.post('/signup', firstname, lastname, username, email, password);
}

const Login = async (email, password) => {
    return await api.post('/signin', email, password);
}

export {Register, Login};