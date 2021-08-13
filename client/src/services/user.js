import api from '../services/api';

const Register = async (data) => {
    return await api.post('/signup', data);
}

const Login = async (data) => {
    console.log(data)
    return await api.post('/signin', data);
   
}

const UpdateUserProfile = async (
    avatar, position, affiliation, researchInterest, location
) =>
{
    return await api.patch('/update-profile',
        avatar, position, affiliation, researchInterest, location
    );
}

export {Register, Login, UpdateUserProfile};