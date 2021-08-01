import api from '../services/api';

const Register = async (firstname, lastname, username, email, password) => {
    return await api.post('/signup', firstname, lastname, username, email, password);
}

const Login = async (email, password) => {
    return await api.post('/signin', email, password);
}

const UpdateUserProfile = async (avatar, position, affiliation, researchInterest, location) =>{
    return await api.patch(
        '/create-profile', 
        avatar, position, affiliation, researchInterest, location
    );
}

export {Register, Login, UpdateUserProfile};